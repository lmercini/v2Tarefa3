import React, { useCallback, useMemo, useContext,  useState, useEffect } from 'react';
import ToDosListView from './toDosListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDos } from '../../api/toDosSch';
import { toDosApi } from '../../api/toDosApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { Meteor } from 'meteor/meteor';
import  { ConcludedButton } from './toDosListContext';




interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean }[];
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IToDosListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IToDos[];
	todoListWithoutButtons: Object[];
	schema: ISchema<any>;
	loading: boolean;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	total:number;

	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	navigateToHome: () => void;
	navigateToEdit?: (id:string) => void; 
	

	

}





export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const initialConfig = {
	sortProperties: [{ field: 'statusConcluded', sortAscending: false },{ field: 'updatedate', sortAscending: false }],
	filter: {},
	searchBy: null,
	viewComplexTable: false
};



const ToDosListController = () => {

	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);

	const [total,setTotal] = useState(0)
	

	const onChangeStatus = useCallback((row:any) => {

		const newStatusConcluded =  row.statusConcluded === 'Concluída'? 'Não Concluída':'Concluída'

		const docStatus = {...row, statusConcluded : newStatusConcluded}



	
		toDosApi.update(docStatus, (error: any) =>{

			error? showNotification({
				type: 'error',
				title: 'Erro ao salvar',
				message: error.reason || 'Ocorreu um erro na validação.'
			}): showNotification({
				type: (row.statusConcluded === 'Concluída') ? 'default' : 'success',
				title: 'Tarefa Atualizada!',
				message: `Situação da Tarefa: ${newStatusConcluded}`
			});


		})

		


	}

, [showNotification]); 


	const { title, type, typeMulti} = toDosApi.getSchema();

	

	const toDosSchReduzido = { 	
		columnButton: { label: 'Concluída', type: String },
		title, 
		type, 
		typeMulti, 
		createdat: { type: Date, label: 'Criado em' },
		
		
	
	};
		

	useEffect(()=>{
		Meteor.call('toDos.totalCount',(err: Meteor.Error | null, result: number) => {
			if (err) {
					console.log("Erro ao contar as tarefas", err.message || err);
			} else {
				setTotal(result);
			}
		})
	},[])





	const navigate = useNavigate();
 
	

	const navigateToHome = () => {
		navigate(`/toDos/home`)
	}

	const navigateToEdit = (id:string) => {
		navigate(`/toDos/edit/${id}`)
	}


	const { sortProperties, filter } = config;

	const sort = sortProperties.reduce((arr, prop) => {
		arr[prop.field] = prop.sortAscending ? 1 : -1;
		return arr;
	}, {} as Record<string, number>);

	const [page,setPage] = useState(1)

	const { loading, toDoss } = useTracker(() => {
		const subHandle = toDosApi.subscribe('toDosList', filter, {
			sort,
			page,
		});

		const toDoss = subHandle?.ready() ? toDosApi.find(filter, { sort }).fetch() : [];
		return {
			toDoss,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : toDoss.length
		};
	}, [config,page]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/toDos/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		toDosApi.remove({ _id: row._id });
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 2000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);


	const todoListButton= useMemo(() => {

		return toDoss.map((row: any) => ({
			...row, 
			columnButton: (
				<ConcludedButton
					isConcluded={(row.statusConcluded === 'Concluída')? true:false}
					onClick={(event) => {
						event.stopPropagation(); 
						if (row.createdby === Meteor.userId()){
							onChangeStatus(row)
						}else{
							showNotification({
									type: 'error',
									title: 'Erro ao Concluir Tarefa',
									message: 'Você não tem permissão para alterar a situação do item.'
								})

						};   
					}}
				/>
			)
		}));
		}, [toDoss, onChangeStatus]);
					
	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
			onClickConcluded: onChangeStatus,
			onAddButtonClick,
			onDeleteButtonClick,
			todoList:todoListButton ,
			todoListWithoutButtons:toDoss,
			schema: toDosSchReduzido,
			loading,
			page: page,
			setPage: setPage,
			total:total,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			navigateToHome: navigateToHome,
			navigateToEdit: navigateToEdit,


		}),
		[todoListButton, toDoss,
			onDeleteButtonClick, loading]
	);
	
	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
