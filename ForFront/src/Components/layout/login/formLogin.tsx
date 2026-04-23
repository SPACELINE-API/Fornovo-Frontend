import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
  Fieldset,
  TextInput,
  Button,
  PasswordInput,
  Box,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../../schemas/loginSchema';
import styles from './loginLyt.module.css';
// import { jwtDecode } from 'jwt-decode';
// import type { DecodedToken } from '../../../types/auth';

type LoginFormData = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

    //   const handleLogin = async (values: LoginFormData) => {
    //     try {
    //       const result = await authService.login(values.email, values.password);
    //       const decodedToken: DecodedToken = jwtDecode(result.access);

    //       localStorage.setItem('user_role', decodedToken.role_usuario);
    //       localStorage.setItem('access_token', result.access);
    //       localStorage.setItem('refresh_token', result.refresh);

    //       const usuario = {
    //         nome: decodedToken.nome,
    //         email: decodedToken.email,
    //         role: decodedToken.role_usuario,
    //       };
    //       localStorage.setItem('usuario', JSON.stringify(usuario));
        
    //       navigate('/');
    //     } catch (error: any) {
    //       console.error('Erro ao logar', error.response?.data || error.message);

    //       form.setFieldError('email', 'E-mail ou senha incorretos!');
    //       form.setFieldError('password', ' ');
    //     }
    //   };

    const handleLogin = (values: LoginFormData) => {
      console.log('Login data:', values);
      navigate('/');
    };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleLogin)}
      noValidate
      className={styles.loginWrapper}
    >
      <Fieldset className={styles.loginFieldset} legend="Login" variant="unstyled">
        <TextInput
          label="E-mail"
          placeholder="SeuEmail@email.com"
          size="md"
          withAsterisk
          classNames={{
            label: styles.loginInputLabel,
            input: styles.loginInputField,
            wrapper: styles.loginInputWrapper,
            error: styles.loginInputError,
          }}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Senha"
          placeholder="Sua senha"
          size="md"
          withAsterisk
          visible={visible}
          onVisibilityChange={toggle}
          classNames={{
            label: styles.loginInputLabel,
            input: styles.loginInputField,
            wrapper: styles.loginInputWrapper,
            error: styles.loginInputError,
          }}
          {...form.getInputProps('password')}
        />

        <Button type="submit" fullWidth size="md" className={styles.loginButton}>
          Entrar
        </Button>
      </Fieldset>
    </Box>
  );
}
