
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React, {createContext} from 'react';
import ToDosListStyles from './toDosListStyles';


interface IToDosListContext {
    onClickConcluded?: (row:any) => void; 
    navigateToHome?: () => void;
    navigateToEdit?: () => void; 

}

const ToDosListContext = createContext<IToDosListContext>({} as IToDosListContext);

interface ConcludedButtonProps {
    isConcluded:  boolean,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ConcludedButton = ({isConcluded, onClick }:ConcludedButtonProps) => {


    return(
            <ToDosListStyles.ConcludedButtonStyle
            color= {isConcluded ? 'success':'primary'}
            onClick={onClick}
            >
                {isConcluded ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </ToDosListStyles.ConcludedButtonStyle>
        
    )

}

export default ToDosListContext;
export type { IToDosListContext };