import React, { useContext } from 'react';
import Styles from './exampleDetailStyles'; // Importing the styles from the second snippet
import Typography from '@mui/material/Typography';
import { ExampleModuleContext, IExampleModuleContext } from '../../exampleContainer';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon'; // Assuming you have a SysIcon component for icons
import  IconButton  from '@mui/material/IconButton';
import ExampleDetailContext, { IExampleDetailContext } from './exampleDetailContext';
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

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const ExampleDetailView: React.FC = () => {

    const {state} = useContext<IExampleModuleContext>(ExampleModuleContext); 
    const context = useContext<IExampleDetailContext>(ExampleDetailContext);
    const author = context.document?.username
    const [isPersonal, setIsPersonal] = useState<boolean>();

   
/*     if(context.loading) return <SysLoading />
 */    
    return (
        <Styles.container>

            <Styles.header>
                {state == 'view' && 
                    <IconButton onClick={context.onClickArrowBack} > 
                        <SysIcon name='arrowBack'/>
                    </IconButton>
                 
                }
                <Typography variant="h5">
                    {state === 'view' ? ` Item ${context.document?.title}`: `${state === 'edit' ? 'Editar' : 'Adicionar'} item`}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton onClick={state == 'view' ? context.navigateToEdit : context.closePage} >
                    <SysIcon name={state === 'view' ? 'edit' : 'close'} />
                </IconButton>
            </Styles.header>

        {/*  {JSON.stringify(context.document)}  */}

        <SysForm 
            schema={exampleSch}
            doc = {context.document}
            mode={state as 'view' | 'edit' | 'create'    }
            onSubmit={context.onSubmit}
        >



        <Styles.body>   
                <Styles.formColumn>
                    <SysTextField name='title' />

                    <SysSelectField name='type'  />

                    <SysRadioButton name='typeMulti' childrenAlignment='row'/>

                    <SysCheckBox name='check' childrenAlignment='row' />
					
					

                </Styles.formColumn>

                <Styles.formColumn>
                    

                    <SysTextField 
                    name='description'
                    placeholder='Acrescente uma descrição para o item'
                    multiline
                    rows= {3}
                    showNumberCharactersTyped
                    max={200} 
                    />

                    <SysLocationField name="address" />

                    <SysSelectField name='statusConcluded'  />
                    
                   
                    {author && (
                    <SysTextField 
                        name='author'                                                                       
                        defaultValue={author}
                        readOnly={true} 
                        />
                    )}

                     <FormControlLabel
                        disabled = {state === 'view'}
                        control={
                            <Switch 
                            checked={isPersonal} 
                            onChange={(e) => setIsPersonal(e.target.checked)} 
                            />
                        }
                        label={isPersonal?"Pessoal": "Pública"}
                        />
				

                </Styles.formColumn>
        </Styles.body>

        <Styles.footer>

            {state != 'view' && (<Button
            variant='outlined'
            startIcon={<SysIcon name='close' />}
            onClick={context.closePage}
            >
                Cancelar
            </Button>)}
            <SysFormButton
            startIcon={<SysIcon name='check' />}
            >
                Salvar
            </SysFormButton>
        </Styles.footer>

        </SysForm>
        {JSON.stringify(context.document)}
        </Styles.container>
    )
}

export default ExampleDetailView;
