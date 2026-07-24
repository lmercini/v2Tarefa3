import React, { useContext } from 'react';
import ToDosDetailView from './toDosDetailView';
import Context , { IToDosDetailContext } from './toDosDetailContext';
import { useNavigate } from 'react-router-dom';
import { ToDosModuleContext, IToDosModuleContext } from '../../toDosContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi'; 
import { IToDos } from '../../api/toDosSch';
import { IMeteorError } from '/imports/typings/IMeteorError';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { PageStatus } from '../../config/recursos';

const ToDosDetailController: React.FC = () => {

	const {id, state} = useContext<IToDosModuleContext>(ToDosModuleContext);
	const { showNotification } = useContext(AppLayoutContext);

	const navigate = useNavigate(); 

	const navigateToEdit = () => {
		navigate(`/toDos/edit/${id}`)
	}
	const onClickArrowBack = () => { 
		navigate(`/toDos`)
	}
	const closePage = () => {
		navigate(-1)
	}

	const onSubmit = (doc: Partial<IToDos>) => {
		toDosApi[state == PageStatus.CREATE ? 'insert' : 'update'](doc, (error: IMeteorError) => {
			if(error) return showNotification({
				type: 'error',
				title: 'Não foi possível registrar o item',
				message: error.message
			});
		showNotification({
			type: 'success',
			title: `Solicitação Registrada!`,
			message: `${state == PageStatus.CREATE ? 'Tarefa Criada' : 'Tarefa Atualizada'} com sucesso.`

		})
		navigate('/toDos/view');

		})
	}
	const {document, loading} = useTracker(() => {
		if(!!!id) closePage();
		const handleSubscribe = toDosApi.subscribe("toDosDetail", { _id:id });
		const document = toDosApi.findOne({_id:id});
		return {
			document,
			loading: !handleSubscribe || !handleSubscribe.ready()
		}
	}, [id ])

	const contextValue: IToDosDetailContext = {
		document: document,
		loading: loading,
		onSubmit: onSubmit,
		onClickArrowBack: onClickArrowBack,
		closePage: closePage,
		navigateToEdit: navigateToEdit
	} 

	return (
		<Context.Provider value={contextValue}>
			<ToDosDetailView />
		</Context.Provider>
	)}

	export default ToDosDetailController;

