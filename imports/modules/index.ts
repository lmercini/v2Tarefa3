import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Example from './example/config';
import UserProfile from './userprofile/config';
import Todos from './toDos/config';

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
	...Todos.pagesRouterList,
	...UserProfile.pagesRouterList,
	
];

const menuItens: Array<IAppMenu | null> = [
	...Example.pagesMenuItemList, 
	...Todos.pagesMenuItemList,
	...UserProfile.pagesMenuItemList,
	
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
