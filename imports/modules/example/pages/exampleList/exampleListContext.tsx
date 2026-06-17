
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import React, {createContext} from 'react';

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
        <Button
        variant= {isConcluded ? 'contained':'outlined'}
        color= {isConcluded ? 'success':'primary'}
        startIcon= {isConcluded ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        onClick={onClick}
        />
    )

}

export default ExampleListContext;
export type { IExampleListContext };