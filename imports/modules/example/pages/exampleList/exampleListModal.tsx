import React, { useContext, useState } from 'react';
import Styles from '../exampleDetail/exampleDetailStyles'; // Importing the styles from the second snippet
import Typography from '@mui/material/Typography';
import ExampleDetailContext, { IExampleDetailContext } from '../exampleDetail/exampleDetailContext';
import { Meteor } from 'meteor/meteor';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import Switch from '@mui/material/Switch';
import Box, { BoxProps } from '@mui/material/Box';


interface IExampleListModalProps {
    modalObj: any;
}

const ExampleListModal: React.FC<IExampleListModalProps> = ({modalObj}) => {

    const context = useContext<IExampleDetailContext>(ExampleDetailContext);
    const doc = context.document
  

    return (
       <Box>
            <Styles.header sx={{ mb: 3 }}>      

                <Typography variant="h5">
                    Item {modalObj.title}
                </Typography>
                                           
            </Styles.header> 

             <Styles.body>   
                
                <Styles.formColumn>
                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Nome
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.title || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Categoria
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.type || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Prioridade
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.typeMulti === 'alta' ? 'Alta': modalObj?.typeMulti === 'media'? 'Média': 'Baixa' }
                        </Typography>
                    </div>

                 
                </Styles.formColumn>

                <Styles.formColumn>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Descrição (opcional)
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.description || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Situação
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.statusConcluded || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Autor
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.username || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Tarefa Pessoal
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                           
                            <Switch
                            checked={modalObj?.statusToggle}
                            disabled
                            size='medium'
                            />

                            <Typography variant="body2" color="textSecondary">
                                 {modalObj?.statusToggle? 'Sim':'Não'} 
                            </Typography>

                    </div>


                 
                </Styles.formColumn>

        </Styles.body>
            
       </Box>
         
      /*  <Styles.container>

            <Styles.header>      
                <Typography variant="h5">
                    Item {modalObj.title}
                </Typography>
                                           
            </Styles.header> 

        


        <Styles.body>   
                
                <Styles.formColumn>
                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Nome
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.title || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Categoria
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.type || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Prioridade
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.typeMulti || '-'}
                        </Typography>
                    </div>

                 
                </Styles.formColumn>

                <Styles.formColumn>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Descrição (opcional)
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.description || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Situação
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.statusConcluded || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Autor
                        </Typography>
                        <Typography variant="body1">
                            {modalObj?.username || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Tarefa Pessoal
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                           
                            <Switch
                            checked={modalObj?.statusToggle}
                            disabled
                            size='medium'
                            />

                            <Typography variant="body2" color="textSecondary">
                                 {modalObj?.statusToggle? 'Sim':'Não'} 
                            </Typography>

                    </div>


                 
                </Styles.formColumn>

        </Styles.body>

        

       

        </Styles.container> */
    )
}

export default ExampleListModal;
