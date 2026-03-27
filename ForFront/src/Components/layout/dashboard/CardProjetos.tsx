import styles from './dashCss/cardProjetos.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, ActionIcon, Modal, TextInput, Button, Group, Text } from '@mantine/core';
import { Ellipsis, Trash2 } from 'lucide-react';
import logo from '../../../assets/imagens/Logofnv.png';
import api from '../../../Services/apiService';

interface CardProps {
  nome: string;
  id: string;
  descricao: string;
  responsavel: string;
  status: string;
  data: string | null;
  atualizarProjetos?: () => void;
}

function CardProjetos({
  id,
  nome,
  descricao,
  responsavel,
  status,
  data,
  atualizarProjetos,
}: CardProps) {
  const navigate = useNavigate();

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [confirmacao, setConfirmacao] = useState('');
  const [carregandoExclusao, setCarregandoExclusao] = useState(false);

  const normalizarStatus = (status: string) => {
    return status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');
  };

  const formatarData = (data?: string | null) => {
    if (!data) return 'Sem prazo definido';

    if (data === '' || data === '0000-00-00' || data === 'Invalid Date' || data === 'null') {
      return 'Sem prazo definido';
    }

    if (data.includes('-')) {
      const partes = data.split('-');

      if (partes.length === 3) {
        const [ano, mes, dia] = partes;

        if (ano === '0000') return 'Sem prazo definido';

        return `${dia}/${mes}/${ano}`;
      }
    }

    const dateObj = new Date(data);

    if (isNaN(dateObj.getTime())) {
      return 'Sem prazo definido';
    }

    return dateObj.toLocaleDateString('pt-BR');
  };

  const excluirProjeto = async () => {
    try {
      setCarregandoExclusao(true);

      await api.delete(`projetos/deletarProjeto/${id}`);

      setModalExcluirAberto(false);
      setConfirmacao('');

      if (atualizarProjetos) {
        atualizarProjetos();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCarregandoExclusao(false);
    }
  };

  return (
    <>
      <Modal
        opened={modalExcluirAberto}
        onClose={() => {
          setModalExcluirAberto(false);
          setConfirmacao('');
        }}
        title="Excluir projeto"
        centered
        classNames={{
          content: styles.modalExcluirRoot,
          header: styles.modalExcluirHeader,
          title: styles.modalExcluirTitle,
        }}
      >
        <div className={styles.alertaExcluir}>
          <Text size="sm" fw={500}>
            Atenção: Esta ação é permanente e todos os dados do projeto serão perdidos
            imediatamente.
          </Text>
        </div>

        <Text size="sm" mb="xs">
          Para confirmar a exclusão, digite a palavra abaixo:
        </Text>

        <Group mb="sm">
          <span className={styles.textoConfirmacao}>excluir</span>
        </Group>

        <TextInput
          placeholder="Digite aqui..."
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          autoFocus
        />

        <Group justify="flex-end" mt="xl">
          <Button
            variant="default"
            className={styles.botaoCancelar}
            onClick={() => {
              setModalExcluirAberto(false);
              setConfirmacao('');
            }}
          >
            Cancelar
          </Button>

          <Button
            color="red"
            className={styles.botaoExc}
            loading={carregandoExclusao}
            disabled={confirmacao.toLowerCase() !== 'excluir'}
            onClick={excluirProjeto}
          >
            Excluir Projeto
          </Button>
        </Group>
      </Modal>

      <div className={styles.cardProjetos} onClick={() => navigate(`/detalhe/resumo/${id}`)}>
        <div className={`${styles.cardBarraLateral} ${styles[normalizarStatus(status)]}`}></div>

        <img src={logo} alt="Logo" className={styles.cardLogo} />

        <div className={styles.cardContainer}>
          <div className={styles.cardTitulo}>
            <h3 className={styles.tituloProjeto}>{nome}</h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p className={styles.cardStatus}>{status}</p>

              <Menu trigger="click-hover" shadow="md" width={200} position="right-start">
                <Menu.Target>
                  <ActionIcon className={styles.acIcone} onClick={(e) => e.stopPropagation()}>
                    <Ellipsis size={18} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Ações</Menu.Label>

                  <Menu.Item>Editar</Menu.Item>

                  <Menu.Sub openDelay={120} closeDelay={150}>
                    <Menu.Sub.Target>
                      <Menu.Sub.Item>Mudar Status</Menu.Sub.Item>
                    </Menu.Sub.Target>

                    <Menu.Sub.Dropdown>
                      <Menu.Item>Pendente</Menu.Item>
                      <Menu.Item>Em Andamento</Menu.Item>
                      <Menu.Item>Em Revisão</Menu.Item>
                      <Menu.Item>Concluído</Menu.Item>
                    </Menu.Sub.Dropdown>
                  </Menu.Sub>

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalExcluirAberto(true);
                    }}
                  >
                    <Trash2
                      size={16}
                      style={{
                        marginRight: 8,
                      }}
                    />
                    Excluir Projeto
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>

          <h3 className={styles.descricaoProjeto}>{descricao}</h3>

          <div className={styles.cardLinha}></div>

          <div>
            <p className={styles.cardDetalhe}>
              <strong>Responsável:</strong> {responsavel}
            </p>

            <p className={styles.cardDetalhe}>
              <strong>Prazo:</strong> {formatarData(data)}
            </p>

            <div className={styles.cardLinha}></div>
          </div>

          <div className={styles.cardBotoes}>
            <button
              className={styles.cardBotao}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detalhe/calculo/${id}`);
              }}
            >
              Cálculo
            </button>

            <button
              className={styles.cardBotao}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detalhe/relatorio/${id}`);
              }}
            >
              Relatório
            </button>

            <button
              className={styles.cardBotao}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detalhe/resumo/${id}`);
              }}
            >
              Resumo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProjetos;
