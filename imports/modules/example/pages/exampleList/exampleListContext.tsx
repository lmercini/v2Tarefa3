

import React, { useContext } from 'react';
import { Button } from "node_modules/@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface ButtonConcludedprops{
    isConcluded: Boolean;
    onClick:()=>void;
}

const ButtonConcluded = ({ isConcluded, onClick}: ButtonConcludedprops) =>{
    return (
        <Button
        variant= {isConcluded? 'contained':'outlined'}
        color = {isConcluded? 'success': 'primary'}
        startIcon = {isConcluded? <CheckCircleIcon />: <RadioButtonUncheckedIcon/>}
        onClick={onClick}
        />
    )
}