import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ExampleHomeControllerContext } from './exampleHomeController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '../../../../ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import ExampleHomeStyles from './exampleHomeStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import ExampleHomeContext, { IExampleHomeContext } from './exampleHomeContext';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';




const ExampleHomeView = () => {

    const context = useContext<IExampleHomeContext>(ExampleHomeContext);
      
    const user = useTracker(() => {
    return Meteor.user(); 
  }, []);

    const userName = user?.username


    const controller = React.useContext(ExampleHomeControllerContext);
    const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
    const navigate = useNavigate();
    const { Container, LoadingContainer, SearchContainer } = ExampleHomeStyles;

    const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.type.options?.() ?? [])];

    return (
        <Container>
            <Typography variant="h2" align='right'>Bem Vindo, {userName} </Typography>
            
            {controller.loading ? (
                <LoadingContainer>
                    <CircularProgress />
                    <Typography variant="body1">Aguarde, carregando informações...</Typography>
                </LoadingContainer>
            ) : (
                <Box sx={{ width: '100%', mb: 1 }}>
                    
                    <Typography variant="h5">Tarefas mais recentes</Typography>

                    <ComplexTable
                        data={controller.todoList}
                        schema={controller.schema}
                        hidePagination = {true}
                        onRowClick={(row) => navigate('/example/view/' + row.id)}
                        searchPlaceholder={'Pesquisar exemplo'}
                        onEdit={(row) => navigate('/example/edit/' + row._id)}
                        onDelete={(row) => {
                            DeleteDialog({
                                showDialog: sysLayoutContext.showDialog,
                                closeDialog: sysLayoutContext.closeDialog,
                                title: `Excluir dado ${row.title}`,
                                message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
                                onDeleteConfirm: () => {
                                    controller.onDeleteButtonClick(row);
                                    sysLayoutContext.showNotification({
                                        message: 'Excluído com sucesso!'
                                    });
                                }
                            });
                        }}
                    />

                
                     
                </Box>
                
            )}

            <Box sx={{ mt: 2 }}>

            <SysFab
                variant="extended"
                text="Lista de Tarefas"
                startIcon={<SysIcon name={'task'} />}
                fixed={false}
                onClick={controller.navigateToList}
                />
           
            </Box>

            {JSON.stringify(context.document)}
        </Container>
    );
};

export default ExampleHomeView;
