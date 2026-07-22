import  {createContext} from 'react';
import { IToDos } from '../../api/toDosSch';

interface IToDosHomeContext {

    document?: Partial<IToDos >;
    loading: boolean;

    onClickArrowBack?: () => void;
    closePage?: () => void;
    navigateToEdit?: () => void;
    onSubmit?: (doc: Partial<IToDos>) => void;
    navigateToList?: () => void;

}

const ToDosHomeContext = createContext<IToDosHomeContext>({} as IToDosHomeContext);

export default ToDosHomeContext;
export type { IToDosHomeContext };