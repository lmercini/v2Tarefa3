import React, { useCallback, useMemo, useContext } from 'react';
import ExampleHomeView from './exampleHomeView';
import { nanoid } from 'nanoid';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IExample } from '../../api/exampleSch';
import { exampleApi } from '../../api/exampleApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { useNavigate } from 'react-router-dom';
import { ExampleModuleContext, IExampleModuleContext } from '../../exampleContainer';





interface IInitialConfig {
    sortProperties: { field: string; sortAscending: boolean }[];
    filter: Object;
    searchBy: string | null;
    viewComplexTable: boolean;
}

interface IExampleHomeContollerContext {
    onAddButtonClick: () => void;
    navigateToList?: () => void;

    onDeleteButtonClick: (row: any) => void;
    todoList: IExample[];
    schema: ISchema<any>;
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const teste = 0



export const ExampleHomeControllerContext = React.createContext<IExampleHomeContollerContext>(
    {} as IExampleHomeContollerContext
);

const initialConfig = {
	sortProperties: [{ field: 'statusConcluded', sortAscending: false },{ field: 'updatedate', sortAscending: false }],
    filter: {},
    searchBy: null,
    viewComplexTable: false
};



const ExampleHomeController = () => {

    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    const { showNotification } = useContext(AppLayoutContext);
    const {id, state} = useContext<IExampleModuleContext>(ExampleModuleContext);


    
    const navigate = useNavigate(); 

    const navigateToList = () => {
            navigate(`/example`)
        }
    
    const navigateToEdit = () => {
            navigate(`/example/edit/${id}`)
        }
    const onClickArrowBack = () => { 
            navigate(-1)
        }
    const closePage = () => {
            navigate(-1)
        }

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
        title, 
        typeMulti, 
        type, 
        createdat: { type: Date, label: 'Criado em' } 
    };
        


   

    const { sortProperties, filter } = config;
    const sort = sortProperties.reduce((arr, prop) => {
        arr[prop.field] = prop.sortAscending ? 1 : -1;
        return arr;
    }, {} as Record<string, number>);


    const { loading, examples } = useTracker(() => {
        const subHandle = exampleApi.subscribe('exampleHome', filter, {
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


   
        
    const providerValues: IExampleHomeContollerContext = useMemo(
        () => ({
            onClickConcluded: onChangeStatus,
            onAddButtonClick,
            onDeleteButtonClick,

            todoList: examples,
            schema: exampleSchReduzido,
            loading,
            onChangeTextField,
            onChangeCategory: onSelectedCategory,
           
            onClickArrowBack: onClickArrowBack,
            closePage: closePage,
            navigateToList:navigateToList,
            navigateToEdit: navigateToEdit
            

        }),
        [examples, loading]
    );


    

// APAGAR DEPOIS 
    console.log("DADOS QUE CHEGARAM DA API:", examples);

    return (
        <ExampleHomeControllerContext.Provider value={providerValues}>
            <ExampleHomeView />
        </ExampleHomeControllerContext.Provider>
    );
};

export default ExampleHomeController;
