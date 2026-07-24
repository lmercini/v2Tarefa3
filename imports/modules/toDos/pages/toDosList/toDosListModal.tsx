import React from 'react';
import Styles from '../toDosDetail/toDosDetailStyles'; 
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import  {IModal} from './toDosListView';

interface IToDosListModalProps {
    modalObj: IModal | null;
}

const ToDosListModal: React.FC<IToDosListModalProps> = ({modalObj}) => {

    return (
       <Box
        sx={{
            flexDirection: {xs: 'column', md:'row'}
        }}>
            <Styles.header sx={{ mb: 3 }}>      

                    <Typography variant="h5">
                        Item {modalObj?.title}
                    </Typography>
                                            
            </Styles.header> 
            
            <Styles.body>   
                    
                    <Styles.formColumn>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Nome
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.title || '-'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Categoria
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.type || '-'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Prioridade
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.typeMulti === 'alta' ? 'Alta': modalObj?.typeMulti === 'media'? 'Média': 'Baixa' }
                            </Typography>
                        </Box>
                    
                    </Styles.formColumn>

                    <Styles.formColumn>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Descrição (opcional)
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.description || '-'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Situação
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.statusConcluded || '-'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Autor
                            </Typography>
                            <Typography variant="body1">
                                {modalObj?.username || '-'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Tarefa Pessoal
                            </Typography>
                        </Box>

                        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                            
                                <Switch
                                checked={modalObj?.statusToggle}
                                disabled
                                size='medium'
                                />

                                <Typography variant="body2" color="textSecondary">
                                    {modalObj?.statusToggle? 'Sim':'Não'} 
                                </Typography>

                        </Box>
                
                    </Styles.formColumn>

            </Styles.body>
        
       </Box>
         
     
    )
}

export default ToDosListModal;
