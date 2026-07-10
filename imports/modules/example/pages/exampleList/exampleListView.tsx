import React, { useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ExampleListControllerContext } from './exampleListController';
import { ExampleModuleContext, IExampleModuleContext } from '../../exampleContainer';
import { Dialog, DialogTitle, DialogContent, DialogActions,} from '@mui/material';
import Styles from '../exampleDetail/exampleDetailStyles'; // Importing the styles from the second snippet


import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '../../../../ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '../../../../ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import ExampleListStyles from './exampleListStyles';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import { SysFab } from '../../../../ui/components/sysFab/sysFab';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import  IconButton  from '@mui/material/IconButton';
import { Meteor } from 'meteor/meteor';

import Pagination from '@mui/material/Pagination';
import ExampleDetailView from '../exampleDetail/exampleDetailView';
import ExampleListModal from './exampleListModal';




const ExampleListView = () => {
	const controller = React.useContext(ExampleListControllerContext);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const {state} = useContext<IExampleModuleContext>(ExampleModuleContext); 
	const { showNotification } = useContext(AppLayoutContext);

	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = ExampleListStyles;

	const [openModal, setOpenModal] = useState(false);
	const [modal, setModal] =  useState<any>(null) ;


	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.type.options?.() ?? [])];

	const taskPerPage = 4
	
	const totalPages = Math.ceil(controller.total / taskPerPage)
// teste commit
	return (
		<Container>
			<Typography variant="h3">Lista de Itens </Typography>
			<SearchContainer>
				<SysTextField
					name="search"
					label="Nome do Item"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
				<SysSelectField
					name="Category"
					label="Categoria"
					options={options}
					placeholder="Selecionar"
					onChange={controller.onChangeCategory}
				/>	

				<IconButton onClick={controller.navigateToHome} > 
					<SysIcon name='home'/>
				</IconButton>

			</SearchContainer>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }} >
					<ComplexTable
						data={controller.todoList}
						schema={controller.schema}
						onRowClick={(event) => {setOpenModal(true);
							setModal(event.row);

							console.log("OBJETO DA LINHA: ", event.row);
						}}

						searchPlaceholder={'Pesquisar exemplo'}
						

						conditionalActions={[
							{
								condition: (row) => !row.statusToggle,
								if:{
									label:"Editar",
									icon: <SysIcon name={'edit'}/>,
									onClick: (row) => navigate('/example/edit/' + row._id)

								},
								else:{
									label:"Editar",
									icon: (<span style={{ opacity: 0.3, cursor: 'not-allowed' }}>
										<SysIcon name={'edit'}/>
        							</span>
									),
									onClick: () => showNotification({
									type: 'error',
									title: 'Erro ao Editar Tarefa',
									message: 'Você não tem permissão para Editar esse item, comunique o autor do item'
								})

								}
							},

							{
								condition: (row) => !row.statusToggle,
								if:{
									label:"Excluir",
									icon: <SysIcon name={'delete'}/>,
									onClick: (row) => {
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
						}

								},
								else:{
									label:"Excluir",
									icon: (<span style={{ opacity: 0.3, cursor: 'not-allowed' }}>
										<SysIcon name={'delete'}/>
        							</span>
									),
									onClick: () => showNotification({
									type: 'error',
									title: 'Erro ao Excluir Tarefa',
									message: 'Você não tem permissão para Excluir esse item, comunique o autor do item'
								})

								}
							}


						]}


/* 						 {row.createdby === Meteor.userId()} }
 */
						


					/>
				<Box  display ='flex' justifyContent='center'>
					<Pagination
						count={totalPages}
						page={controller.page}
						onChange={(e: React.ChangeEvent<unknown>, value: number)=>{
							controller.setPage(value)
						}} 
					
						color='primary'
						size='medium'
						/> 
				</Box>	
					 
					 
				</Box>

			)}

			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>


			<Dialog
				open={openModal}
				onClose={() => setOpenModal(false)} 
				fullWidth 
				maxWidth="md">
				
				<DialogContent>
						<Styles.header>

								<IconButton onClick={() => setOpenModal(false)} > 
									<SysIcon name='arrowBack'/>
								</IconButton>
								
								<Box sx={{ flexGrow: 1 }} />
								
								
								{!modal?.statusToggle ?
									<IconButton onClick={()=>{controller.navigateToEdit?.(modal._id)}} >
												<SysIcon name={ 'edit'} />
									</IconButton> :
									<IconButton onClick={() => setOpenModal(false)} > 
														<SysIcon name='close'/>
									</IconButton>
								}
								

						</Styles.header>

						<ExampleListModal modalObj={modal}/>

					

						
				</DialogContent> 
			</Dialog>

		</Container>

		
	);
};

export default ExampleListView;
