import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import { userprofileApi } from '/imports/modules/userprofile/api/userProfileApi';


const SignInNewPage: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const { user, signIn } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();
    const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

    /* const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>(''); */

    /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
        Accounts.createUser({ email, password }, (error?: Meteor.Error | Error | undefined) => {
            if (error){
                showNotification({type: 'error',
						title: 'Problema na criação do usuário!',
						message: 'Erro ao fazer registro em nossa base de dados!'
					});
            
            } else{
                 showNotification({type: 'success',
						title: 'Usuário criado com sucesso!',
						message: 'Você pode agora fazer login no sistema!'
					});
            }
        })
    }; */

    const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;

		userprofileApi.insertNewUser({ email, username: email, password }, (err) => {
			if (err){
                showNotification({type: 'error',
						title: 'Problema na criação do usuário!',
						message: 'Erro ao fazer registro em nossa base de dados!'
					});
            
            } else{
                 showNotification({type: 'success',
						title: 'Usuário criado com sucesso!',
						message: 'Você pode agora fazer login no sistema!'
					});
            }
		});
	};

    const handleForgotPassword = () => navigate('/signin');

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <Container>
            <Content>
                <Typography variant="h1" display={'inline-flex'} gap={1}>
                    
                    Boilerplate
                   
                </Typography>

                <FormContainer >
                            <SimpleForm
                            schema={{email: {
                                    type: String,
                                    label: 'Email',
                                    optional: false
                                },
                                    password: {
                                    type: String,
                                    label: 'Senha',
                                    optional: false
                                }
                            }}
                            
                            onSubmit={handleSubmit}>  
                        
                    <Typography variant="h5">Cadastro de Novo Usuário</Typography>
                        <FormWrapper>
                            <TextField 
                            name = 'email' label="Email" variant="outlined" type="email" fullWidth placeholder="Digite seu email" />

                            <TextField 
                            name = 'password' label="Senha" variant="outlined" type="password" fullWidth placeholder="Digite sua senha" />

                            <Button variant="text" sx={{ alignSelf: 'flex-end' }} onClick={handleForgotPassword}>
                                
                                <Typography variant="link">Já possui Cadastro? Fazer Login</Typography>
                            </Button>
                            <Box />
                            <Button variant="contained" color="primary" type="submit" endIcon={<SysIcon name={'arrowForward'} />}>
                                Entrar
                            </Button>
                            
                        </FormWrapper>


                    </SimpleForm>

                </FormContainer>

            </Content>
        </Container>
    );
};

export default SignInNewPage;
