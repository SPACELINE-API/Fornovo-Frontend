import {Box, Button, Group, Table,Tabs, Text, ActionIcon, Tooltip, Badge} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Plus, Check, UserRoundCheck, UserRoundMinus, User, Edit } from 'lucide-react';
import Styles from '../../Styles/paginas/Normas.module.css';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import api from '../../Services/apiService';
import ModalNovoFunc from './criarFuncionario';
import ModalEditarFunc from './editarFuncionario';

type StatusFunc = 'Ativo' | 'Inativo';

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  nivelUsuario: string;
  status: StatusFunc;
}

export default function Funcionarios() {
  const [opened, setOpened] = useState(false);
  const [funcionario, setFuncionario] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [funcSelecionado, setFuncSelecionado] = useState<Funcionario | null>(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const carregarFuncionarios = async () => {
    try {
      const response = await api.get('usuarios/listarUsuario');
      setFuncionario(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    } finally {
      setCarregando(false);
    }
  };
  useEffect(() => {
  carregarFuncionarios();
}, []);


  const funcionariosAtivos = funcionario.filter(
    (f) => f.status === 'Ativo'
  );

  const funcionariosInativos = funcionario.filter(
    (f) => f.status === 'Inativo'
  );

  const alterarStatusFuncionario = async (
  id: string,
  novoStatus: StatusFunc
) => {
  try {
    await api.patch(`usuarios/status/${id}`, {
      status: novoStatus,
    });

    notifications.show({
      title: 'Sucesso',
      message:
        novoStatus === 'Ativo'
          ? 'Funcionário reativado'
          : 'Funcionário desativado',
      color: 'green',
      position: 'bottom-left',
      autoClose: 3500,
      icon: <Check size={16} />,
    });
    carregarFuncionarios(); 

  } catch (error: any) {
    const mensagem =
      error?.response?.data?.erro ||
      'Erro ao alterar status';

    notifications.show({
      title: 'Erro',
      message: mensagem,
      color: 'red',
      position: 'bottom-left',
      autoClose: 3500,
    });
  }
};
  const confirmarTrocaStatus = (
    id: string,
    tipo: 'ativar' | 'desativar'
  ) => {
    const isAtivo = tipo === 'ativar';
    const func = funcionario.find((f) => f.id === id);

    modals.openConfirmModal({
      title: isAtivo
        ? 'Reativar Funcionário'
        : 'Desativar Funcionário',
      centered: true,
      classNames: {
        root: Styles.modalRoot,
        header: Styles.modalHeader,
        title: Styles.modalTitle,
        body: Styles.modalBody,
      },
      labels: {
        confirm: isAtivo ? 'Reativar' : 'Desativar',
        cancel: 'Cancelar',
      },
      confirmProps: {
        color: isAtivo ? 'green' : 'red',
        className: Styles.btnConfirm,
      },
      cancelProps: {
        className: Styles.btnCancel,
      },
      children: (
        <Text size="sm">
          Tem certeza que deseja {tipo} o funcionário{' '}
          <b>{func?.nome}</b>?
        </Text>
      ),
      onConfirm: () =>
        alterarStatusFuncionario(
          id,
          isAtivo ? 'Ativo' : 'Inativo'
        ),
    });
  };
  const getCorNivel = (nivel: string) => {
    const nivelLower = nivel.toLowerCase();
    switch (nivelLower) {
        case 'administrador':
        return 'red';
        case 'revisor':
        return 'blue';
        case 'projetista':
        return 'green';
        default:
        return 'gray';
    }
    };
  if (carregando) {
    return (
      <Box p="md">
        <Text>Carregando funcionários...</Text>
      </Box>
    );
  }

  return (
  <Box p="md">
  <Group justify="flex-end" mb="md">
    <Button
      leftSection={<Plus size={18} />}
      className={Styles.uploadButton}
      onClick={() => setOpened(true)}
    > Cadastrar Novo Funcionário
    </Button>
    <ModalNovoFunc
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmitSuccess={() => {
        setOpened(false);
        carregarFuncionarios();
          }}
        />
    <ModalEditarFunc
            opened={modalEditarAberto}
            onClose={() => setModalEditarAberto(false)}
            func={funcSelecionado}
            onSubmitSuccess={() => {
            setModalEditarAberto(false);
            carregarFuncionarios();
              }}
            />
  </Group>
  <Tabs defaultValue="ativas" color="#0C5F20">
    <Tabs.List mb="sm">
      <Tabs.Tab value="ativas" leftSection={<UserRoundCheck size={20}/>} className={Styles.tabsTitulo}>
        Funcionários Ativos
      </Tabs.Tab>
      <Tabs.Tab value="inativas" leftSection={<UserRoundMinus size={20}/>} className={Styles.tabsTitulo}>
        Funcionários Inativos
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="ativas">
      <div className={Styles.tableContainer}>
        <Table highlightOnHover verticalSpacing="md" className={Styles.stickyHeader}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Nível</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {funcionariosAtivos.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text c="dimmed" ta="center">
                    Nenhum funcionário ativo
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              funcionariosAtivos.map((f) => (
                <Table.Tr key={f.id}>
                  <Table.Td>
                     <Group gap="xs" align="center">
                        <User size={17} />
                        <Text fw={600}>{f.nome}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{f.email}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge styles={{root: {fontSize: '12px',padding: '4px 8px',},}} color={getCorNivel(f.nivelUsuario)} variant="light">{f.nivelUsuario}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                    <Tooltip label="Desativar">
                        <ActionIcon variant="light" color="red" onClick={() => confirmarTrocaStatus(f.id, 'desativar')}>
                        <UserRoundMinus size={20} />
                    </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Editar">
                        <ActionIcon variant="light" color="blue" 
                          onClick={() => {setFuncSelecionado(f); setModalEditarAberto(true);}}>
                          <Edit size={14} />
                        </ActionIcon>
                    </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </div>
    </Tabs.Panel>
    <Tabs.Panel value="inativas">
      <div className={Styles.tableContainer}>
        <Table highlightOnHover verticalSpacing="md"className={Styles.stickyHeader}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nome</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Nível</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {funcionariosInativos.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text c="dimmed" ta="center">
                    Nenhum funcionário inativo
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              funcionariosInativos.map((f) => (
                <Table.Tr key={f.id}>
                  <Table.Td>
                     <Group gap="xs" align="center">
                        <User size={17} />
                        <Text fw={600}>{f.nome}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{f.email}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge styles={{root: {fontSize: '12px',padding: '4px 8px',},}} color={getCorNivel(f.nivelUsuario)} variant="light">{f.nivelUsuario}</Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                    <Tooltip label="Ativar">
                        <ActionIcon variant="light" color="green" onClick={() => confirmarTrocaStatus(f.id, 'ativar')}>
                        <UserRoundCheck size={20}/>
                    </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Editar">
                        <ActionIcon variant="light" color="blue" 
                          onClick={() => {setFuncSelecionado(f); setModalEditarAberto(true);}}>
                          <Edit size={14} />
                        </ActionIcon>
                    </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </div>
    </Tabs.Panel>
  </Tabs>
</Box>
);
};