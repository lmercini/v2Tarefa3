import React, {createContext} from 'react';
import { IExample } from '../../api/exampleSch';

interface IExampleHomeContext {

    document?: Partial<IExample >;
    loading: boolean;

    onClickArrowBack?: () => void;
    closePage?: () => void;
    navigateToEdit?: () => void;
    onSubmit?: (doc: Partial<IExample>) => void;
    navigateToList?: () => void;

}

const ExampleHomeContext = createContext<IExampleHomeContext>({} as IExampleHomeContext);

export default ExampleHomeContext;
export type { IExampleHomeContext };