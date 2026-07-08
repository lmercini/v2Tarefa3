import React, { useContext, useState } from 'react';
import Styles from '../exampleDetail/exampleDetailStyles'; // Importing the styles from the second snippet
import Typography from '@mui/material/Typography';
import { ExampleModuleContext, IExampleModuleContext } from '../../exampleContainer';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon'; // Assuming you have a SysIcon component for icons
import  IconButton  from '@mui/material/IconButton';
import ExampleDetailContext, { IExampleDetailContext } from '../exampleDetail/exampleDetailContext';
import Box from '@mui/material/Box';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { exampleSch } from '../../api/exampleSch'; // Assuming you have a schema for the form
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import Button from '@mui/material/Button';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';

import { Meteor } from 'meteor/meteor';

import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';

interface IExampleListModalProps {
    modalObj: any;
}

const ExampleListModal: React.FC<IExampleListModalProps> = ({modalObj}) => {

    

    const { showNotification } = useContext(AppLayoutContext);
    const userId = Meteor.userId();
    const context = useContext<IExampleDetailContext>(ExampleDetailContext);
    const [isPersonal, setIsPersonal] = useState(false)
    const doc = context.document
    const author = doc?.username
    const authorId = doc?.createdby
 
       

    return (
       
         
       <Styles.container>

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
                            Descrição (pcional)
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
                            {modalObj?.createby || '-'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Tarefa Pessoal {modalObj?.statusToggle} TE
                        </Typography>
                    </div>


                 
                </Styles.formColumn>

        </Styles.body>

        

       

        </Styles.container>
    )
}

export default ExampleListModal;
