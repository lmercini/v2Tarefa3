import React, { useContext, useState } from 'react';
import Styles from './toDosDetailStyles'; // Importing the styles from the second snippet
import Typography from '@mui/material/Typography';
import { ToDosModuleContext, IToDosModuleContext } from '../../toDosContainer';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon'; // Assuming you have a SysIcon component for icons
import  IconButton  from '@mui/material/IconButton';
import ToDosDetailContext, { IToDosDetailContext } from './toDosDetailContext';
import Box from '@mui/material/Box';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { toDosSch } from '../../api/toDosSch'; // Assuming you have a schema for the form
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import Button from '@mui/material/Button';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';

import { Meteor } from 'meteor/meteor';
import { toDosApi } from '../../api/toDosApi';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';



const ToDosDetailView: React.FC = () => {

		
	const { showNotification } = useContext(AppLayoutContext);
	const userId = Meteor.userId();
	const {state} = useContext<IToDosModuleContext>(ToDosModuleContext); 
	const context = useContext<IToDosDetailContext>(ToDosDetailContext);
	const [isPersonal, setIsPersonal] = useState(false)
	const doc = context.document
	const author = doc?.username
	const authorId = doc?.createdby

	/*const onChangePersonal = (e: React.ChangeEvent<HTMLInputElement>) =>{
		const newPersonal = e.target.checked;
		const docUpdate = {...doc, statusToggle: newPersonal};
		console.log(docUpdate)

		 toDosApi.update(docUpdate, (error: any) =>{
			if (error) {
					console.error("Motivo da recusa do servidor:", error);
					showNotification({
						type: 'error',
						title: 'Erro ao salvar',
						message: error.reason || 'Ocorreu um erro no campo Pessoal.'
					});
				}
			}); 
		};
*/
   
/*     if(context.loading) return <SysLoading />
 */    

	return (
		<Styles.container>

			<Styles.header>
				{state == 'view' && 
					<IconButton onClick={context.closePage} > 
						<SysIcon name='arrowBack'/>
					</IconButton>
				 
				}
				<Typography variant="h5">
					{state === 'view' ? ` Item ${context.document?.title}`: `${state === 'edit' ? 'Editar' : 'Adicionar'} item`}
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<IconButton onClick={state == 'view' && !doc?.statusToggle ? context.navigateToEdit : context.closePage} >
					<SysIcon name={state === 'view' && !doc?.statusToggle/*  userId === authorId */ ? 
						 'edit' : 'close'} />
				</IconButton>
			</Styles.header>


		<SysForm 
			schema={toDosSch}
			doc = {context.document}
			mode={state as 'view' | 'edit' | 'create'    }
			onSubmit={context.onSubmit}
		>



		<Styles.body>   
				<Styles.formColumn>
					<SysTextField name='title' />

					<SysSelectField name='type'  />

					<SysRadioButton name='typeMulti' childrenAlignment='row'/>

					
					

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

				 

					<SysSelectField name='statusConcluded'  />
					
					
				   
					{author && (
					<SysTextField 
						name='author'                                                                       
						defaultValue={author}
						readOnly={true} 
						showLabelAdornment=  {false}
						/>
					)}

					<SysSwitch name= "statusToggle" 
					label='Tarefa Pessoal'/>

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

export default ToDosDetailView;
