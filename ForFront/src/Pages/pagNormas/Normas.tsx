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
} from 'lucide-react';
import Styles from '../../Styles/paginas/Normas.module.css';
import ModalNovaNorma from './criarNorms';

type StatusNorma = 'Ativa' | 'Inativa';

interface Norma {
  id: number;
  codigo: string;
  nome: string;
  data: string;
  status: StatusNorma;
}

export default function Normas() {
  const [opened, setOpened] = useState(false);
  const [normas, setNormas] = useState<Norma[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const normasSalvas = localStorage.getItem('normas');
    if (normasSalvas) {
      setNormas(JSON.parse(normasSalvas));
    } else {
      const normasIniciais: Norma[] = [
        {
          id: 1,
          codigo: 'NR-10',
          nome: 'Segurança em Eletricidade',
          data: '20/05/2024',
          status: 'Ativa',
        },
        {
          id: 2,
          codigo: 'NR-12',
          nome: 'Segurança em Máquinas',
          data: '15/04/2024',
          status: 'Ativa',
        },
        {
          id: 3,
          codigo: 'NR-18',
          nome: 'Indústria da Construção',
          data: '10/03/2024',
          status: 'Ativa',
        },
      ];
      setNormas(normasIniciais);
      localStorage.setItem('normas', JSON.stringify(normasIniciais));
    }
  }, []);

  const salvar = (lista: Norma[]) => {
    setNormas(lista);
    localStorage.setItem('normas', JSON.stringify(lista));
  };

  const desativarNorma = (id: number) => {
    const novaLista = normas.map((n) =>
      n.id === id ? { ...n, status: 'Inativa' as StatusNorma } : n,
    );
    salvar(novaLista);
    notifications.show({
      title: 'Sucesso',
      message: 'Norma desativada',
      color: 'green',
      icon: <Check size={16} />,
    });
  };

  const ativarNorma = (id: number) => {
    const novaLista = normas.map((n) =>
      n.id === id ? { ...n, status: 'Ativa' as StatusNorma } : n,
    );
    salvar(novaLista);
    notifications.show({
      title: 'Sucesso',
      message: 'Norma reativada',
      color: 'green',
      icon: <Check size={16} />,
    });
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
      onConfirm: () => (isAtivando ? ativarNorma(id) : desativarNorma(id)),
    });
  };

  const normasFiltradas = normas.filter(
    (n) =>
      n.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      n.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const normasAtivas = normasFiltradas.filter((n) => n.status === 'Ativa');
  const normasInativas = normasFiltradas.filter((n) => n.status === 'Inativa');

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

      <ModalNovaNorma opened={opened} onClose={() => setOpened(false)} />

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
                  <Table.Th>Data Upload</Table.Th>
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
                        <Text size="sm">{norma.data}</Text>
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
                              <Menu.Item leftSection={<Download size={14} />}>Baixar PDF</Menu.Item>
                              <Menu.Item leftSection={<Edit size={14} />}>
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
                  <Table.Th>Data Upload</Table.Th>
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
                        <Text size="sm">{norma.data}</Text>
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
          Esta norma regulamentadora estabelece os requisitos mínimos para a prevenção de acidentes
          e doenças do trabalho.
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
