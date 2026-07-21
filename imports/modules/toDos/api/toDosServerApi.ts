// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { Meteor } from 'meteor/meteor';

// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
		});

	
   

		const self = this;

  this.registerMethod('totalCount', async ()=> 
		{
		  const filter ={
			$or:[
			{statusToggle: false},
			{createdby: Meteor.userId()}        
		   ]}
		  const total =  await this.collectionInstance.find(filter).countAsync();
		  
		  return total;
	  })    

		this.addTransformedPublication(
			'toDosDetail',
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
						address: 1,
						statusConcluded: 1,
						nome: 1,
						author: 1,
						createdby: 1,
						createdat: 1, 
					}
				});
			},
			async (doc: Partial<IToDos>) : Promise<Partial<IToDos>> => {
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
		
	const taskPerPage = 4;

	this.addTransformedPublication(
	  'toDosList' ,

	  (filter = {}, pages:{ page?: number, sort?: any}={} ) => {

	  const userId = Meteor.userId();
	  
		const personalFilter = {
		  ...filter,
		$or:[
		{statusToggle: false},
		{createdby: Meteor.userId()} 
		]
		  
		};
	  const currentPage = pages.page || 1 
	  const skipPages = (currentPage - 1)*taskPerPage;
	  
		return this.defaultListCollectionPublication(personalFilter, {
		  projection: {
			title:1,
			type: 1,
			typeMulti: 1,
			createdat: 1,
			statusConcluded: 1,
			nome: 1,
			statusToggle: 1,
			author: 1,
			updatedate: 1,
			createdby: 1,
			},
		  limit: taskPerPage,
		  skip: skipPages,
		  sort: {updatedate : -1},

		  });
	  },

	  async (doc: IToDos & { nomeUsuario: string }) => {
		  const userProfileDoc =
			await userprofileServerApi.getCollectionInstance().findOneAsync({
			  _id: doc.createdby,
			});
		  return { ...doc, username: userProfileDoc ? userProfileDoc.username : "Desconhecido" };
		}
	  
	  );

	this.addTransformedPublication(
		'toDosHome',
		(filter = {}) => {

		const userId = Meteor.userId();
		  const personalFilter = {
			...filter,
		  $or:[
		  {statusToggle: false},
		   {createdby: Meteor.userId()} 
		  
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
			  statusToggle: 1,
			  author: 1,
			  statusIcon:1,
			  createby: 1,
			},
		  
			sort:{
			  updatedate:-1

			},
			limit: 5
		  });
		},
		async (doc: IToDos & { nomeUsuario: string }) => {
		  const userProfileDoc =
			await userprofileServerApi.getCollectionInstance().findOneAsync({
			  _id: doc.createdby,
			});

		  return { ...doc };
		}
	  );

	}
  beforeInsert(docObj: Partial<IToDos>, context: any) {
		docObj.updatedate = new Date(); 

		return super.beforeUpdate(docObj, context); 
	}

  beforeUpdate(docObj: Partial<IToDos>, context: any) {
		docObj.updatedate = new Date(); 

		return super.beforeUpdate(docObj, context); 
	}
}

export const toDosServerApi = new ToDosServerApi();
