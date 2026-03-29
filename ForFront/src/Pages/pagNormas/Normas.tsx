import { useEffect, useState } from 'react';
import {
  Table,
  Tabs,
  TextInput,
  Button,
  Badge,
  Group,
  ActionIcon,
  Tooltip,
  Text,
  Divider,
  Menu,
  Box,
  Popover,
  Skeleton,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  Search,
  Plus,
  Power,
  PowerOff,
  FileText,
  Ellipsis,
  Download,
  Edit,
  Check,
  Eye,
} from 'lucide-react';
import Styles from '../../Styles/paginas/Normas.module.css';
import ModalNovaNorma from './criarNorms';
import api from '../../Services/apiService';
import ModalEditarNorma from './editarNorma';
import type { NormaFormData } from '../../Components/layout/Formularios/formsNormas';

type StatusNorma = 'ativo' | 'inativo';

interface Norma {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  descricao: string;
  status: StatusNorma;
  url_arquivo?: string | null;
}

export default function Normas() {
  const [opened, setOpened] = useState(false);
  const [normas, setNormas] = useState<Norma[]>([]);
  const [busca, setBusca] = useState('');
  const [normaSelecionada, setNormaSelecionada] =
  useState<NormaFormData | null>(null);
  const [modalEditarOpened, setModalEditarOpened] = useState(false);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    const normasSalvas = localStorage.getItem('normas');

    if (normasSalvas) {
      setNormas(JSON.parse(normasSalvas));
      setCarregando(false);
    }

    carregarNormas();
  }, []);

  const abrirEditarNorma = (norma: Norma) => {
    const normaForm = {
      id: norma.id,
      codigo: norma.codigo,
      nome: norma.nome,
      ano: norma.ano,
      descricao: norma.descricao,
      arquivo: null,
      url_arquivo: norma.url_arquivo || null,
    };

    setNormaSelecionada(normaForm);
    setModalEditarOpened(true);
  };


  const carregarNormas = async () => {
    try {
      const response = await api.get('/normas/listarNormas');

      const listaFormatada: Norma[] = response.data.map((norma: any) => ({
        id: norma.id_norma,
        codigo: norma.codigo,
        nome: norma.nome,
        ano: norma.ano,
        status: norma.status,
        descricao: norma.descricao,
        url_arquivo: norma.url_arquivo,
      }));

      setNormas(listaFormatada);
      localStorage.setItem('normas', JSON.stringify(listaFormatada));
      
    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Erro ao carregar normas',
        color: 'red',
        position: 'bottom-left',
        autoClose: 3500,
      });
    } finally {
      setCarregando(false);
    }
  };

  const visualizarNorma = (id: number) => {
    const url = `${api.defaults.baseURL}normas/buscar/${id}?download=0`;

    window.open(url, '_blank');
  };

  const baixarNorma = (id: number) => {
    const url = `${api.defaults.baseURL}normas/buscar/${id}?download=1`;

    window.open(url, '_blank');
  };


  const alterarStatusNorma = async (id: number, novoStatus: StatusNorma) => {
    try {
      await api.patch(`/normas/status/${id}`, {
        status: novoStatus,
      });

      notifications.show({
        title: 'Sucesso',
        message: novoStatus === 'ativo' ? 'Norma reativada' : 'Norma desativada',
        color: 'green',
        position: 'bottom-left',
        autoClose: 3500,
        icon: <Check size={16} />,
      });

      carregarNormas();
    } catch (error: any) {
      const mensagem = error?.response?.data?.erro || 'Erro ao alterar status';

      notifications.show({
        title: 'Erro',
        message: mensagem,
        color: 'red',
        position: 'bottom-left',
        autoClose: 3500,
      });
    }
  };


  const confirmarTrocaStatus = (id: number, tipo: 'ativar' | 'desativar') => {
    const isAtivando = tipo === 'ativar';
    const norma = normas.find((n) => n.id === id);

    modals.openConfirmModal({
      title: isAtivando ? 'Reativar Norma' : 'Desativar Norma',
      centered: true,
      classNames: {
        root: Styles.modalRoot,
        header: Styles.modalHeader,
        title: Styles.modalTitle,
        body: Styles.modalBody,
      },
      labels: { confirm: isAtivando ? 'Reativar' : 'Desativar', cancel: 'Cancelar' },
      confirmProps: {
        color: isAtivando ? 'green' : 'red',
        className: Styles.btnConfirm,
      },
      cancelProps: {
        className: Styles.btnCancel,
      },
      children: (
        <Text size="sm">
          Tem certeza que deseja {tipo} a norma <b>{norma?.codigo}</b>?
          {isAtivando ? ' Ela voltará para a lista ativa.' : ' Ela será movida para as inativas.'}
        </Text>
      ),
      onConfirm: () => alterarStatusNorma(id, isAtivando ? 'ativo' : 'inativo'),
    });
  };

  const normasFiltradas = normas.filter(
    (n) =>
      n.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      n.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const normasAtivas = normasFiltradas.filter((n) => n.status === 'ativo');
  const normasInativas = normasFiltradas.filter((n) => n.status === 'inativo');

  const EmptyState = ({ mensagem }: { mensagem: string }) => (
    <Table.Tr>
      <Table.Td colSpan={4}>
        <Box
          py={40}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PowerOff size={40} color="#adb5bd" />
          <Text c="dimmed" mt="sm" fw={500}>
            {mensagem}
          </Text>
        </Box>
      </Table.Td>
    </Table.Tr>
  );

  if (carregando && normas.length === 0) {
    return (
      <Box p="md">
        <Text fw={600} mb="md">
          Carregando normas...
        </Text>

        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={60} mb="sm" radius="md" />
        ))}
      </Box>
    );
  }


  return (
    <Box p="md">
      <Group justify="space-between" mb="lg">
        <TextInput
          placeholder="Pesquisar norma..."
          leftSection={<Search size={16} />}
          style={{ width: '80%' }}
          value={busca}
          onChange={(e) => setBusca(e.currentTarget.value)}
        />
        <Button
          leftSection={<Plus size={18} />}
          className={Styles.uploadButton}
          onClick={() => setOpened(true)}
        >
          Upload de Norma
        </Button>
      </Group>

      <ModalNovaNorma
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmitSuccess={() => {
          setOpened(false);
          carregarNormas();
        }}
      />
      <ModalEditarNorma
        opened={modalEditarOpened}
        onClose={() => setModalEditarOpened(false)}
        norma={normaSelecionada}
        onSubmitSuccess={() => {
          setModalEditarOpened(false);
          carregarNormas();
        }}
      />

      <Tabs defaultValue="ativas" color="#0C5F20">
        <Tabs.List mb="sm">
          <Tabs.Tab value="ativas" leftSection={<Power size={14} />} className={Styles.tabsTitulo}>
            Ativas
          </Tabs.Tab>
          <Tabs.Tab
            value="inativas"
            leftSection={<PowerOff size={14} />}
            className={Styles.tabsTitulo}
          >
            Inativas
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ativas">
          <div className={Styles.tableContainer}>
            <Table highlightOnHover verticalSpacing="md" className={Styles.stickyHeader}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Código/Nome</Table.Th>
                  <Table.Th>Resumo</Table.Th>
                  <Table.Th>Ano de Publicação</Table.Th>
                  <Table.Th>Ações</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {normasAtivas.length === 0 ? (
                  <EmptyState mensagem="Nenhuma norma ativa encontrada." />
                ) : (
                  normasAtivas.map((norma) => (
                    <Table.Tr key={norma.id}>
                      <Table.Td>
                        <Group gap="sm">
                          <FileText size={20} color="#0C5F20" />
                          <div>
                            <Text size="sm" fw={700}>
                              {norma.codigo}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {norma.nome}
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <PreviewPopover norma={norma} />
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{norma.ano}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="Desativar">
                            <ActionIcon
                              variant="light"
                              color="red"
                              onClick={() => confirmarTrocaStatus(norma.id, 'desativar')}
                            >
                              <PowerOff size={15} />
                            </ActionIcon>
                          </Tooltip>
                          <Menu shadow="md" width={180} position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray">
                                <Ellipsis size={18} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<Download size={14} />}
                                onClick={() => baixarNorma(norma.id)}
                              >
                                Baixar Norma
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<Eye size={14} />}
                                onClick={() => visualizarNorma(norma.id)}
                              >
                                Visualizar Norma
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<Edit size={14} />}
                                onClick={() => abrirEditarNorma(norma)}
                              >
                                Editar Detalhes
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
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
            <Table highlightOnHover verticalSpacing="md" className={Styles.stickyHeader}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Código/Nome</Table.Th>
                  <Table.Th>Resumo</Table.Th>
                  <Table.Th>Ano de Publicação</Table.Th>
                  <Table.Th>Ações</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {normasInativas.length === 0 ? (
                  <EmptyState mensagem="Nenhuma norma inativa encontrada." />
                ) : (
                  normasInativas.map((norma) => (
                    <Table.Tr key={norma.id}>
                      <Table.Td>
                        <Group gap="sm">
                          <FileText size={20} color="#0C5F20" />
                          <div>
                            <Text size="sm" fw={700}>
                              {norma.codigo}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {norma.nome}
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <PreviewPopover norma={norma} />
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{norma.ano}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="Reativar">
                            <ActionIcon
                              variant="light"
                              color="green"
                              onClick={() => confirmarTrocaStatus(norma.id, 'ativar')}
                            >
                              <Power size={15} />
                            </ActionIcon>
                          </Tooltip>
                          <Menu shadow="md" width={180} position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray">
                                <Ellipsis size={18} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<Download size={14} />}
                                onClick={() => baixarNorma(norma.id)}
                              >
                                Baixar Norma
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<Eye size={14} />}
                                onClick={() => visualizarNorma(norma.id)}
                              >
                                Visualizar Norma
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
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
}

function PreviewPopover({ norma }: { norma: Norma }) {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      width={320}
      position="right"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Badge
          variant="light"
          color="green"
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
        >
          Ver Preview
        </Badge>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="xs" fw={700} mb={5}>
          Descrição da {norma.codigo}
        </Text>
        <Divider mb={8} />
        <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
          {norma.descricao || 'Sem descrição disponível.'}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
