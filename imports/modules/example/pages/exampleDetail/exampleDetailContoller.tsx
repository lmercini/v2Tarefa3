import React, { useContext } from 'react';
import ExampleDetailView from './exampleDetailView';
import Context , { IExampleDetailContext } from './exampleDetailContext';
import { useNavigate } from 'react-router-dom';
import { ExampleModuleContext, IExampleModuleContext } from '../../exampleContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { exampleApi } from '../../api/exampleApi'; 
import { IExample } from '../../api/exampleSch';
import { IMeteorError } from '/imports/typings/IMeteorError';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import ExampleDetailContext from './exampleDetailContext';

const ExampleDetailController: React.FC = () => {

	const {id, state} = useContext<IExampleModuleContext>(ExampleModuleContext);
	const { showNotification } = useContext(AppLayoutContext);
	const context = useContext<IExampleDetailContext>(ExampleDetailContext);

	const navigate = useNavigate(); 

	const navigateToEdit = () => {
		navigate(`/example/edit/${id}`)
	}
	const onClickArrowBack = () => { 
		navigate(-1)
	}
	const closePage = () => {
		navigate(-1)
	}

	const onSubmit = (doc: Partial<IExample>) => {
		exampleApi[state == "create" ? 'insert' : 'update'](doc, (error: IMeteorError) => {
			if(error) return showNotification({
				type: 'error',
				title: 'Não foi possível registrar o item',
				message: error.message
			});
		showNotification({
			type: 'success',
			title: `Solicitação Registrada!`,
			message: `${state == "create" ? 'Tarefa Criada' : 'Tarefa Atualizada'} com sucesso.`

		})
		navigate('/example');

		})
	}
	const {document, loading} = useTracker(() => {
		if(!!!id) closePage();
		const handleSubscribe = exampleApi.subscribe("exampleDetail", { _id:id });
		const document = exampleApi.findOne({_id:id});
		return {
			document,
			loading: !handleSubscribe || !handleSubscribe.ready()
		}
	}, [id ])

	const contextValue: IExampleDetailContext = {
		document: document,
		loading: loading,
		onSubmit: onSubmit,
		onClickArrowBack: onClickArrowBack,
		closePage: closePage,
		navigateToEdit: navigateToEdit
	} 
	

	

	return (

		<Context.Provider value={contextValue}>
			<ExampleDetailView />

		</Context.Provider>
			
	

	)}

	export default ExampleDetailController;

