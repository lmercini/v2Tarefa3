// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';

// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;


		// PAREI AQUI
		/*
		this.addTransformedPublication(
			'exampleDetail',
			async (filter = {}) =>{
				return this.find(
					filter,{
						fields:{
							title :1,
							type : 1,
							description: 1,
							typeMulti:1,
							check:1, 
							createdby: 1,
							author: 1,
							statusConcluded:1,
							statusToggle: 1,
				
						}

					});
			},
			async (doc: Partial<IExample>) : Promise<Partial<IExample>> =>{
				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
					_id: doc.createdby}, 
					{
					fields:{username: 1 }
				})
				return {...doc, username : user?.username || "Erro"};			
			}
		)*/
		

		this.addTransformedPublication(
			'exampleList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, typeMulti: 1, 
						createdat: 1, statusConcluded: 1, nome: 1, check: 1, author: 1, statusToggle: 1 
						}
				});
			},
			async (doc: IExample & { nomeUsuario: string }) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addTransformedPublication(
			'exampleDetail',
			async (filter = {}) => {
				return this.find(filter, {
					fields: {
						title: 1, type: 1, description: 1, typeMulti: 1, check: 1, 
						createdby: 1, author: 1, statusConcluded: 1, statusToggle: 1,
						contacts: 1, date: 1, files: 1, chip: 1, statusRadio: 1, 
						slider: 1, address: 1, nome: 1
					}
				});
			},
			async (doc: Partial<IExample>) : Promise<Partial<IExample>> => {
				const user: IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync(
					{ _id: doc.createdby }, 
					{ fields: { username: 1 } }
				);
				return { ...doc, username: user?.username || "Desconhecido" };          
    }
);
	
	}
}

export const exampleServerApi = new ExampleServerApi();
