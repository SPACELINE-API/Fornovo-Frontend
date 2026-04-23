import React, { useState } from 'react';
import {Box, TextInput, SimpleGrid, Stack, Group, Button, PasswordInput, Text} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import api from '../../../Services/apiService';

export interface FuncFormData{
    id:string,
    nome:string,
    email:string,
    senha:string,
    nivelUsuario: string,
}

const funcionarioSchema = (isEdit:boolean) => z.object({
  nome: z.string().min(1, 'O nome do funcionário é obrigatório'),
  email: z.string().min(1, 'O email do funcionário é obrigatório'),
  senha: isEdit
      ? z.string().optional()
      : z.string().min(1, 'Senha obrigatória'),
  confirmarSenha: isEdit
  ? z.string().optional()
  : z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => {
    if (isEdit && !data.senha) return true;
    return data.senha === data.confirmarSenha;
  }, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'], 
});

interface FormFuncionarioProps{
    onSubmitSuccess: () => void;
    onCancel: () => void;
    initialData?: FuncFormData;
}

const FormularioFunc: React.FC<FormFuncionarioProps> = ({
  onSubmitSuccess,
  onCancel,
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const formFunc = useForm({
        initialValues: {
          nome: initialData?.nome || '',
          email: initialData?.email || '',
          senha: initialData?.senha || '',
          confirmarSenha: '',
          nivelUsuario: initialData?.nivelUsuario || '',          
        },
        validate: zodResolver(funcionarioSchema(!!initialData)),
      });
    
 const handleSubmit = async (values: typeof formFunc.values) => {
  setLoading(true);
    try {
      const payload = {
        nome: values.nome,
        email: values.email,
        senha: values.senha || undefined,
        nivelUsuario: values.nivelUsuario,
      };
        const response = initialData
    ? await api.patch(`usuarios/editarUsuario/${initialData.id}`, payload)
    : await api.post('usuarios/criarUsuario', payload);
      notifications.show({
        title: initialData ? 'Funcionário atualizado!' : 'Funcionário cadastrado!',
        message: response.data.mensagem,
        color: 'teal',
        position: 'bottom-left',
      });

    

    setTimeout(() => {
      onSubmitSuccess();
    }, 2000);
    } catch (error: any) {
      const mensagem = error?.response?.data?.erro || 'Erro ao salvar funcionário';

      notifications.show({
        title: 'Erro',
        message: mensagem,
        color: 'red',
        position: 'bottom-left',
      });
    } finally {
      setLoading(false);
    }
 };
    return(
    <Box component="form" onSubmit={formFunc.onSubmit(handleSubmit)} noValidate p="sm">
      <Stack gap="lg">
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <TextInput
        label="Nome do Funcionário"
        {...formFunc.getInputProps('nome')}/>
    </SimpleGrid>
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <TextInput
        label="Email"
        {...formFunc.getInputProps('email')}/>
      <PasswordInput
        label="Senha"
        {...formFunc.getInputProps('senha')}
        visibilityToggleButtonProps={{
          style: { width: 30, height: 30, color: 'black' },}}/>
    </SimpleGrid>
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <PasswordInput
        label="Confirmar senha"
        {...formFunc.getInputProps('confirmarSenha')}
      />
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Text size="sm" fw={500}>Nível do Usuário</Text>
      <select
        value={formFunc.values.nivelUsuario}
        style={{marginTop: 4, padding: 6, borderRadius: 4, borderColor: '#ccc', width: '100%',}}
        onChange={(event) =>
          formFunc.setFieldValue('nivelUsuario', event.currentTarget.value)
        }>
        <option value="">Selecione</option>
        <option value="Administrador">Administrador</option>
        <option value="Projetista">Projetista</option>
        <option value="Revisor">Revisor</option>
      </select>
    </div>
    </SimpleGrid>
    <Group gap="md" justify="flex-end">
      <Button variant="subtle" color="gray" onClick={onCancel} disabled={loading}>
        Cancelar
      </Button>
      <Button type="submit" loading={loading} color="#34623F" size="sm" radius="md">
        {initialData ? 'Salvar Alterações' : 'Cadastrar Funcionário'}
      </Button>
    </Group>
  </Stack>
</Box>
);
    
};
export default FormularioFunc;