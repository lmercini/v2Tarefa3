import React, { JSX } from "react";
import {
    DataGrid,
    GridRenderCellParams,
    GridRowIdGetter,
    GridRowParams,
    MuiEvent
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { ptBR } from '@mui/x-data-grid/locales';
import { ComplexTableRenderImg, ComplexTableRowText } from '/imports/ui/components/ComplexTable/ComplexTableStyle';
import { hasValue } from '/imports/libs/hasValue';




interface ISchema {
    [key: string]: any;
}

interface IToDosHomeWrapperProps {

    schema: ISchema;
    data: any[];
    onRowClick?: (row: GridRowParams) => void;
    loading?: boolean;
    autoHeight?: boolean;
    disableSorting?: boolean;
    getId?: GridRowIdGetter<any>;
    
    // Customizações opcionais de células
    renderCellModified?: (params: GridRenderCellParams) => JSX.Element;
    fieldsRenderCellModified?: { [key: string]: any };
    fieldsMinWidthColumnModified?: { [key: string]: number };
    fieldsMaxWidthColumnModified?: { [key: string]: number };
}

export const ToDosHomeWrapper = (props: IToDosHomeWrapperProps) =>{
    const {
        data,
        schema,		
        loading,		
        onRowClick,		
        getId,
        autoHeight,
        renderCellModified,
        fieldsRenderCellModified,
        disableSorting,
        fieldsMinWidthColumnModified,
        fieldsMaxWidthColumnModified,
        
    } = props;

    const transformData = (
            value: any,
            type: Function,
            renderKey?: string,
            arrayOptions?: Array<{ label: string; value: any }>
        ) => {
            if (hasValue(arrayOptions) && Array.isArray(arrayOptions))
                value = arrayOptions.find((option) => option.value === value)?.label;
            if (!hasValue(value)) return '-';
            else if (Array.isArray(value)) return value.join();
            else if (type === Object) {
                const data = Object.keys(value).reduce((prev: string, curr: string) => {
                    if (!!renderKey) return value[renderKey];
                    return !!value[curr] ? `${prev}\n` + `${curr}: ${value[curr]}\n` : prev + '\n';
                }, '');
                return data;
            } else if (type === Date) return value.toLocaleDateString();
            else return value;
        };


    const columns: any = Object.keys(schema).map((key: string) => {
            return {
                field: key,
                headerName: schema[key]?.label || '',
                flex: 1,
                align: 'left',
                headerAlign: 'left',
                sortable: disableSorting ? false : true,
                minWidth: fieldsMinWidthColumnModified?.hasOwnProperty(key) ? fieldsMinWidthColumnModified[key] : 150,
                maxWidth: fieldsMaxWidthColumnModified?.hasOwnProperty(key) ? fieldsMaxWidthColumnModified[key] : 'auto',

                renderCell: !fieldsRenderCellModified?.hasOwnProperty(key)
                    ? (params: GridRenderCellParams) => {
                            if (schema[key].isImage || schema[key].isAvatar) {
                                return (
                                    <ComplexTableRenderImg
                                        src={params.value}
                                        onError={(e: React.BaseSyntheticEvent) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/wireframe/imagem_default.png';
                                        }}
                                    />
                                );
                            } else {
                                const paramsValue = !params.value || params.value === 'undefined - undefined' ? '-' : params.value;
                                const value = transformData(
                                    paramsValue,
                                    schema[key].type,
                                    schema[key].renderKey,
                                    schema[key]?.options?.(params.row)
                                );
                                const variant = params.field === 'atividade' ? 'labelMedium' : 'bodyMedium';
                                return (
                                    <ComplexTableRowText variant="h6" sx={{ textAlign: 'left' }}>
                                        <Tooltip title={value} arrow={true}>
                                            {value}
                                        </Tooltip>
                                    </ComplexTableRowText>
                                );
                            }
                        }
                    : renderCellModified
            };
        });

        

    

    
    return (
        <Box sx={{ width: '100%', cursor: !!onRowClick ? 'pointer' : 'default' }}>    
                <DataGrid
                    rows={data}
                    columns={columns}

                    columnHeaderHeight={0}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                display: 'none',
                            },
                             
                        }}

                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}

                    getRowId={!!getId ? getId : (row) => row._id}
                    
                    onRowClick={
                        !!onRowClick
                            ? (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
                                    event.stopPropagation();
                                    onRowClick(params);
                                }
                            : undefined
                    }
                    getRowHeight={() => 'auto'}
                    
                    
                    
                    loading={loading ?? undefined}
                    disableRowSelectionOnClick 
                    hideFooter={true}
                    
                />
            </Box>
        );

}
