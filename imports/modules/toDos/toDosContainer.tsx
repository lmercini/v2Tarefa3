import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import ToDosListController from '../../modules/toDos/pages/toDosList/toDosListController';
import ToDosHomeController from '../../modules/toDos/pages/toDosHome/toDosHomeController';
import ToDosDetailController from '../../modules/toDos/pages/toDosDetail/toDosDetailContoller';

export interface IToDosModuleContext {
	state?: string;
	id?: string;
}

export const ToDosModuleContext = React.createContext<IToDosModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, toDosId } = useParams();
	let state = screenState ?? props.screenState;
	const id = toDosId ?? props.id;

	const validState = ['view', 'edit', 'create','home'];

	const renderPage = () => {
			if (!state || !validState.includes(state)) return <ToDosListController />;
			
			if (state === 'home') return <ToDosHomeController />; 
			
			return <ToDosDetailController />;
			};

	const providerValue = {
		state,
		id
	};
	return <ToDosModuleContext.Provider value={providerValue}>{renderPage()}</ToDosModuleContext.Provider>;
};
