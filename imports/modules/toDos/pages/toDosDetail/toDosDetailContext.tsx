import {createContext} from 'react';
import { IToDos } from '../../api/toDosSch';

interface IToDosDetailContext {

    document?: Partial<IToDos >;
    loading: boolean;

    onClickArrowBack?: () => void;
    closePage?: () => void;
    navigateToEdit?: () => void;
    onSubmit?: (doc: Partial<IToDos>) => void;
   

}

const ToDosDetailContext = createContext<IToDosDetailContext>({} as IToDosDetailContext);

export default ToDosDetailContext;
export type { IToDosDetailContext };