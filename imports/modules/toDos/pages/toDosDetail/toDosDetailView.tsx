import React, { useContext } from 'react';
import Styles from './toDosDetailStyles'; 
import Typography from '@mui/material/Typography';
import { ToDosModuleContext, IToDosModuleContext } from '../../toDosContainer';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon'; 
import  IconButton  from '@mui/material/IconButton';
import ToDosDetailContext, { IToDosDetailContext } from './toDosDetailContext';
import Box from '@mui/material/Box';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { toDosSch } from '../../api/toDosSch'; 
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import Button from '@mui/material/Button';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { Meteor } from 'meteor/meteor';
import SysSwitch from '/imports/ui/components/sysFormFields/sysSwitch/sysSwitch';
import { PageStatus } from '../../config/recursos';


const ToDosDetailView: React.FC = () => {

	const {state} = useContext<IToDosModuleContext>(ToDosModuleContext); 
	const context = useContext<IToDosDetailContext>(ToDosDetailContext);
	const doc = context.document
	const author = doc?.username
	const currentUser = Meteor.userId()

	return (
		
		<Styles.container>

			<Styles.header>
				{state == PageStatus.VIEW && 
					<IconButton onClick={context.closePage} > 
						<SysIcon name='arrowBack'/>
					</IconButton>
				}
				<Typography variant="h5">
					{state === PageStatus.VIEW ? ` Item ${context.document?.title}`: `${state === PageStatus.EDIT ? 'Editar' : 'Adicionar'} item`}
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<IconButton onClick={state == PageStatus.VIEW && doc?.createdby === currentUser ? context.navigateToEdit : context.closePage} >
					<SysIcon name={state === PageStatus.VIEW && doc?.createdby === currentUser ? 
						 'edit' : 'close'} />
				</IconButton>
			</Styles.header>

		<SysForm 
			schema={toDosSch}
			doc = {context.document}
			mode={state as PageStatus.VIEW | PageStatus.EDIT | PageStatus.CREATE}
			onSubmit={context.onSubmit}
		>
					<Styles.body>
					
					<Styles.formColumn>
					<SysTextField name='title' placeholder='Digite o nome do item' />

					<SysSelectField name='type' placeholder='Selecione uma categoria' />

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
				 
					<SysSelectField name='statusConcluded' placeholder='Selecione uma opção' />
														   
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

			{state != PageStatus.VIEW && (<Button
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
		</Styles.container>
	)
}

export default ToDosDetailView;
