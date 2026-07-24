import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToDosHomeControllerContext } from './toDosHomeController';
import { useNavigate } from 'react-router-dom';
import ToDosHomeStyles from './toDosHomeStyles';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ToDosHomeWrapper } from './toDosHomeWrapper';

const ToDosHomeView = () => {

    const user = useTracker(() => {
    return Meteor.user(); 
  }, []);

    const userName = user?.username
    const controller = React.useContext(ToDosHomeControllerContext);
    const navigate = useNavigate();
    const { Container, LoadingContainer } = ToDosHomeStyles;
    return (
        <Container>
            <Typography variant="h3" sx={{ mb: 1 }} align='right'>Bem Vindo, {userName} </Typography>
            <Typography variant="body1" sx={{ mb: 1 }} align='right'>Visualize, edite e crie suas Tarefas aqui!</Typography>
            {controller.loading ? (
                <LoadingContainer>
                    <CircularProgress />
                    <Typography variant="body1">Aguarde, carregando informações...</Typography>
                </LoadingContainer>
                 ) : (
                    <Box
                  
                     sx={{
                        mx: 'auto',
                        px: {xs:0, md: 'auto'},
                        width: {xs: '110%',md:'50%'},
                        height: {xs: 'fit-content', md:'max-content'}

                       }}
                
                    >                   
                    <Typography variant="h2" sx={{ mb: 4 }} align="center">Atividades Recentes</Typography>

                    <ToDosHomeWrapper
                        data={controller.todoList}
                        schema={controller.schema}
    
                        onRowClick={(row) => navigate('/toDos/view/' + row.id)}
 
                    />                                  
                </Box>
                
                )}

                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' , width: '100%'}} >

                <SysFab
                    variant="extended"
                    text="Lista de Tarefas"
                    
                    startIcon={<SysIcon name={'task'} />}
                    fixed={false}
                    onClick={controller.navigateToList}
                    />
            
                </Box>

        </Container>
    );
};

export default ToDosHomeView;
