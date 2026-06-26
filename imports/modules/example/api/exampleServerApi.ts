// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { Meteor } from 'meteor/meteor';

// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});


		const self = this;

		// PAREI AQUI

		this.addTransformedPublication(
            'exampleDetail',
            (filter = {}) => {
                return this.defaultDetailCollectionPublication(filter, {
                    projection: {
                        contacts: 1,
                        title:1,
                        description: 1,
                        type: 1,
                        typeMulti: 1,
                        date: 1,
                        files: 1,
                        chip: 1,
                        statusRadio: 1,
                        statusToggle: 1,
                        slider: 1,
                        check: 1,
                        address: 1,
                        statusConcluded: 1,
                        nome: 1,
                        author: 1,
                        createdby: 1,
                        createdat: 1, 
                    }
                });
            },
            async (doc: Partial<IExample>) : Promise<Partial<IExample>> => {
                if (!doc.createdby) {
                    return { ...doc, username: "Sem Autor" };
                }
                const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync(
                    { _id: doc.createdby }, 
                    { fields: { username: 1 } }
                );
                return { ...doc, username: user?.username || "Desconhecido" };           
            }
        );
		


    this.addTransformedPublication(
      'exampleList',
      (filter = {}) => {

      const userId = Meteor.userId();
      console.log(userId)
        const personalFilter = {
          ...filter,
        $or:[
        {statusToggle: false},
        {createdby: userId}
        
        ]
          
        };

      
        return this.defaultListCollectionPublication(personalFilter, {
          projection: {
            title:1,
            type: 1,
            typeMulti: 1,
            createdat: 1,
            statusConcluded: 1,
            nome: 1,
            check: 1,
            statusToggle: 1,
            author: 1,
            updatedate: 1,
            },
          });
        },
        async (doc: IExample & { nomeUsuario: string }) => {
          const userProfileDoc =
            await userprofileServerApi.getCollectionInstance().findOneAsync({
              _id: doc.createdby,
            });

          return { ...doc };
        }
      );


    this.addTransformedPublication(
        'exampleHome',
        (filter = {}) => {

        const userId = Meteor.userId();
          const personalFilter = {
            ...filter,
          $or:[
          {statusToggle: false},
          {createdby: userId}
          
          ]
            
          };

        
          return this.defaultListCollectionPublication(personalFilter, {
            projection: {
              title:1,
              type: 1,
              typeMulti: 1,
              createdat: 1,
              statusConcluded: 1,
              nome: 1,
              check: 1,
              statusToggle: 1,
              author: 1,
            },
          
            sort:{
              updatedate:1

            },
            limit: 5
          });
        },
        async (doc: IExample & { nomeUsuario: string }) => {
          const userProfileDoc =
            await userprofileServerApi.getCollectionInstance().findOneAsync({
              _id: doc.createdby,
            });

          return { ...doc };
        }
      );



	}

  beforeInsert(docObj: Partial<IExample>, context: any) {
        docObj.updatedate = new Date(); 

        return super.beforeUpdate(docObj, context); 
    }

  beforeUpdate(docObj: Partial<IExample>, context: any) {
        docObj.updatedate = new Date(); 

        return super.beforeUpdate(docObj, context); 
    }
}

export const exampleServerApi = new ExampleServerApi();
