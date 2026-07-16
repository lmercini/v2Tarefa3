import React, { useCallback, useMemo, useContext } from 'react';
import ToDosHomeView from './toDosHomeView';
import { nanoid } from 'nanoid';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IToDos } from '../../api/toDosSch';
import { toDosApi } from '../../api/toDosApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { useNavigate } from 'react-router-dom';
import { ToDosModuleContext, IToDosModuleContext } from '../../toDosContainer';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';




interface IInitialConfig {
    sortProperties: { field: string; sortAscending: boolean }[];
    filter: Object;
    searchBy: string | null;
    viewComplexTable: boolean;
}

interface IToDosHomeContollerContext {
    onAddButtonClick: () => void;
    navigateToList?: () => void;

    onDeleteButtonClick: (row: any) => void;
    todoList: IToDos[];
    schema: ISchema<any>;
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    
}

const teste = 0

export const ToDosHomeControllerContext = React.createContext<IToDosHomeContollerContext>(
    {} as IToDosHomeContollerContext
);

const initialConfig = {
    sortProperties: [{ field: 'statusConcluded', sortAscending: false },{ field: 'updatedate', sortAscending: false }],
    filter: {},
    searchBy: null,
    viewComplexTable: false
};

const ToDosHomeController = () => {

    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    const { showNotification } = useContext(AppLayoutContext);
    const {id, state} = useContext<IToDosModuleContext>(ToDosModuleContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   
    const navigate = useNavigate(); 

    const navigateToList = () => {
            navigate(`/toDos`)
        }
    
    const navigateToEdit = () => {
            navigate(`/toDos/edit/${id}`)
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

    const { title, type, typeMulti, statusConcluded, statusIcon } = toDosApi.getSchema();

    const toDosSchReduzido = { 
        title, 
        
        statusIcon, 
               
    };
     
    const { sortProperties, filter } = config;
    const sort = sortProperties.reduce((arr, prop) => {
        arr[prop.field] = prop.sortAscending ? 1 : -1;
        return arr;
    }, {} as Record<string, number>);

    const { loading, toDoss } = useTracker(() => {
        const subHandle = toDosApi.subscribe('toDosHome', filter, {
            sort
        });

        const toDoss = subHandle?.ready() ? toDosApi.find(filter, { sort }).fetch() : [];
        return {
            toDoss,
            loading: !!subHandle && !subHandle.ready(),
            total: subHandle ? subHandle.total : toDoss.length
        };
    }, [config]);

    const toDossWithIcon = toDoss.map(task=>{
        const statusIcon2 = task.statusConcluded === 'Concluída'?   <SysIcon name = {'task'} color ='success'/>: <SysIcon name = {'draft'} color ='primary'/>
        return {
            ...task,
            statusIcon: statusIcon2
        
        };
    })  

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/toDos/create/${newDocumentId}`);
    }, []);

    const onDeleteButtonClick = useCallback((row: any) => {
        toDosApi.remove(row);
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

              
    const providerValues: IToDosHomeContollerContext = useMemo(
        () => ({
            onClickConcluded: onChangeStatus,
            onAddButtonClick,
            onDeleteButtonClick,
            todoList: toDossWithIcon,
            schema: toDosSchReduzido,
            loading,
            onChangeTextField,                     
            onClickArrowBack: onClickArrowBack,
            closePage: closePage,
            navigateToList:navigateToList,
            navigateToEdit: navigateToEdit
            
        }),
        [toDossWithIcon, loading]
    );

    return (
        <ToDosHomeControllerContext.Provider value={providerValues}>
            <ToDosHomeView />
        </ToDosHomeControllerContext.Provider>
    );
};

export default ToDosHomeController;
