import React, { useCallback, useMemo, useContext } from 'react';
import ExampleListView from './exampleListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IExample } from '../../api/exampleSch';
import { exampleApi } from '../../api/exampleApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

import  { ConcludedButton } from './exampleListContext';




interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IExampleListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IExample[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const teste = 0



export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>(
	{} as IExampleListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};



const ExampleListController = () => {

	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);

//////////////////////////////////////////////// BOTÂO
/*
	 const onChangeStatus = useCallback((row: any) => {
    // 1. Definimos o novo texto
    const isCurrentlyDone = row.statusConcluded === 'Concluída';
    const novoStatusTexto = isCurrentlyDone ? 'Não Concluída' : 'Concluída';

    // 2. Montamos o documento com a linha INTEIRA (que agora inclui o 'nome' e o '_id')
    const docAtualizado = {
        ...row,
        statusConcluded: novoStatusTexto
    };

    // 3. Enviamos para a API e aguardamos a resposta real do servidor
    exampleApi.update(docAtualizado, (error: any) => {
        if (error) {
            // Se o back-end recusar, mostra notificação vermelha de erro
            console.error("Erro no servidor:", error);
            showNotification({
                type: 'error',
                title: 'Erro ao salvar',
                message: error.reason || 'Ocorreu um erro na validação.'
            });
        } else {
            // Se o back-end aceitar, mostra notificação de sucesso
            showNotification({
                type: isCurrentlyDone ? 'default' : 'success',
                title: 'Tarefa Atualizada!',
                message: `Situação da Tarefa: ${novoStatusTexto}`
            });
        }
    });

}, [showNotification]); 



//////////////////////////////////// BOTÂO CONCLUIDO 
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


/////////////////////////////////////////
	const { title, type, typeMulti, statusConcluded } = exampleApi.getSchema();

	const exampleSchReduzido = { 	
		columnButton: { label: 'Concluída', type: String },
		title, 
		type, 
		typeMulti, 
		createdat: { type: Date, label: 'Criado em' } 
	};
		


	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, examples } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort
		});

		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/example/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		exampleApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
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

			todoList: todoListButton,
			schema: exampleSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory
			

		}),
		[examples, loading]
	);


	

// APAGAR DEPOIS 
	console.log("DADOS QUE CHEGARAM DA API:", examples);

	return (
		<ExampleListControllerContext.Provider value={providerValues}>
			<ExampleListView />
		</ExampleListControllerContext.Provider>
	);
};

export default ExampleListController;
