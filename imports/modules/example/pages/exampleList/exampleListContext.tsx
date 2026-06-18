
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React, {createContext} from 'react';
import ExampleListStyles from './exampleListStyles';


interface IExampleListContext {
    onClickConcluded?: (row:any) => void;   
}

const ExampleListContext = createContext<IExampleListContext>({} as IExampleListContext);

interface ConcludedButtonProps {
    isConcluded:  boolean,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ConcludedButton = ({isConcluded, onClick }:ConcludedButtonProps) => {


    return(
            <ExampleListStyles.ConcludedButtonStyle
            color= {isConcluded ? 'success':'primary'}
            onClick={onClick}
            >
                {isConcluded ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </ExampleListStyles.ConcludedButtonStyle>
        
    )

}

export default ExampleListContext;
export type { IExampleListContext };