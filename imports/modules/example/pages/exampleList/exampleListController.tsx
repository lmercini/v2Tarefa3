import React, { useCallback, useMemo, useContext,  useState, useEffect } from 'react';
import ExampleListView from './exampleListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IExample } from '../../api/exampleSch';
import { exampleApi } from '../../api/exampleApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { Meteor } from 'meteor/meteor';
import  { ConcludedButton } from './exampleListContext';




interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean }[];
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IExampleListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IExample[];
	todoListWithoutButtons: any[];
	schema: ISchema<any>;
	loading: boolean;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	total:number;

	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	navigateToHome: () => void;
}





export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>(
	{} as IExampleListContollerContext
);

const initialConfig = {
	sortProperties: [{ field: 'statusConcluded', sortAscending: false },{ field: 'updatedate', sortAscending: false }],
	filter: {},
	searchBy: null,
	viewComplexTable: false
};



const ExampleListController = () => {

	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);

	const [total,setTotal] = useState(0)
	
/* 	const reloadPagination = useLocation() 
 */
 	const onChangeStatus = useCallback((row:any) => {

		const newStatusConcluded =  row.statusConcluded === 'Concluída'? 'Não Concluída':'Concluída'

		const docStatus = {...row, statusConcluded : newStatusConcluded}



	
        exampleApi.update(docStatus, (error: any) =>{

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


	const { title, type, typeMulti, statusConcluded } = exampleApi.getSchema();

	

	const exampleSchReduzido = { 	
		columnButton: { label: 'Concluída', type: String },
		title, 
		type, 
		typeMulti, 
		createdat: { type: Date, label: 'Criado em' },
		//updatedate: {type: Date, label: 'Ùltima Atualização'} 
	};
		

	useEffect(()=>{
		Meteor.call('example.totalCount',(err: any, result: number) => {
			if (err) {
					console.log("Erro ao contar as tarefas", err.message || err);
			} else {
				setTotal(result);
			}
		})
	},[/* reloadPagination.pathname */])





	const navigate = useNavigate();
 
	
		const navigateToHome = () => {
				navigate(`/example/home`)
			}


	const { sortProperties, filter } = config;

	const sort = sortProperties.reduce((arr, prop) => {
        arr[prop.field] = prop.sortAscending ? 1 : -1;
        return arr;
    }, {} as Record<string, number>);

	const [page,setPage] = useState(1)

	const { loading, examples } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort,
			page,
		});

		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length
		};
	}, [config,page]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/example/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		exampleApi.remove({ _id: row._id });	
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

		return examples.map((row: any) => ({
			...row, 
			columnButton: (
				<ConcludedButton
					isConcluded={(row.statusConcluded === 'Concluída')? true:false}
					onClick={(event) => {
                        event.stopPropagation(); 
                        onChangeStatus(row);   
                    }}
				/>
			)
		}));
		}, [examples, onChangeStatus]);
	
	

	
		

	const providerValues: IExampleListContollerContext = useMemo(
		() => ({
			onClickConcluded: onChangeStatus,
			onAddButtonClick,
			onDeleteButtonClick,
			todoList:todoListButton ,
			todoListWithoutButtons:examples,
			schema: exampleSchReduzido,
			loading,
			page: page,
			setPage: setPage,

			total:total,

			onChangeTextField,
			onChangeCategory: onSelectedCategory,
            navigateToHome: navigateToHome
			

		}),
		[todoListButton, examples,
			onDeleteButtonClick, loading]
	);

	

	
	

// PARA VERIFICAR O QUE ESTOU RECEBENDO NO FRONT 
	console.log("DADOS QUE CHEGARAM DA API:", examples);

	return (
		<ExampleListControllerContext.Provider value={providerValues}>
			<ExampleListView />
		</ExampleListControllerContext.Provider>
	);
};

export default ExampleListController;
