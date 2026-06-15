import React, {ElementType} from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonProps } from 'node_modules/@mui/x-data-grid/models/gridBaseSlots';
import { sysSizing } from '/imports/ui/materialui/styles';


interface IStyles{
    container: ElementType<BoxProps>;
    customButton: ElementType<ButtonProps>;
    header: ElementType<BoxProps>;
    body: ElementType<BoxProps>;
    formColumn: ElementType<BoxProps>;
    footer: ElementType<BoxProps>;


}

const ExampleDetailStyles: IStyles = {
        container: styled(Box)({
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        paddingBottom: `${sysSizing.contentPb}`,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: sysSizing.spacingFixedMd



    }),
    customButton: styled(Button)({



    }),
    header: styled(Box)({ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: sysSizing.spacingRemSm

    }),

    body: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        gap: '64px',
        minHeight: '400px',
        alignItems: 'stretch',
    }),

    formColumn: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: sysSizing.spacingFixedLg,
        flex: 1,

    }),

    footer : styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: sysSizing.spacingRemMd
}  )

}

export default ExampleDetailStyles;