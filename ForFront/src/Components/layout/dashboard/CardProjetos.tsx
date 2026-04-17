import styles from './dashCss/cardProjetos.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, ActionIcon, Modal, TextInput, Button, Group, Text, Popover } from '@mantine/core';
import { Edit, Ellipsis, Trash2 } from 'lucide-react';
import logo from '../../../assets/imagens/Logofnv.png';
import api from '../../../Services/apiService';
import type { Projeto } from '../../../Pages/pagProjetos/Projetos';

interface CardProps {
  nome: string;
  id: string;
  descricao: string;
  responsavel: string;
  status: string;
  data: string | null;
  atualizarProjetos?: () => void;
  projeto: Projeto;
  abrirEditarProjeto: (projeto: Projeto) => void;
}

const STATUS_OPTIONS = [
  { label: 'Pendente', cor: '#c50205', bg: '#fff8f8', classe: 'Pendente' },
  { label: 'Em andamento', cor: '#d39607', bg: '#fdf8ee', classe: 'Em andamento' },
  { label: 'Em revisão', cor: '#03668d', bg: '#f0f8fc', classe: 'Em revisão' },
  { label: 'Concluído', cor: '#34623f', bg: '#f2f8f4', classe: 'Concluído' },
];

function CardProjetos({
  id,
  nome,
  descricao,
  responsavel,
  status: statusInicial,
  data,
  atualizarProjetos,
  projeto,
  abrirEditarProjeto,
}: CardProps) {
  const navigate = useNavigate();

  const [status, setStatus] = useState(statusInicial);
  const [popoverAberto, setPopoverAberto] = useState(false);
  const [salvandoStatus, setSalvandoStatus] = useState(false);

  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [confirmacao, setConfirmacao] = useState('');
  const [carregandoExclusao, setCarregandoExclusao] = useState(false);

  const normalizarStatus = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');

  const formatarData = (data?: string | null) => {
    if (!data || data === 'null' || data === '0000-00-00') return 'Sem prazo definido';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return data;
    if (data.includes('-')) {
      const partes = data.split('T')[0].split('-');
      if (partes.length === 3) {
        const [ano, mes, dia] = partes;
        return `${dia}/${mes}/${ano}`;
      }
    }
    const dateObj = new Date(data);
    return isNaN(dateObj.getTime()) ? 'Sem prazo definido' : dateObj.toLocaleDateString('pt-BR');
  };

  const mudarStatus = async (novoStatus: string) => {
    if (novoStatus === status || salvandoStatus) return;
    try {
      setSalvandoStatus(true);
      await api.patch(`projetos/atualizarStatus/${id}`, { status: novoStatus });
      setStatus(novoStatus);
      setPopoverAberto(false);
      if (atualizarProjetos) atualizarProjetos();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setSalvandoStatus(false);
    }
  };

  const excluirProjeto = async () => {
    try {
      setCarregandoExclusao(true);
      await api.delete(`projetos/deletarProjeto/${id}`);
      setModalExcluirAberto(false);
      setConfirmacao('');
      if (atualizarProjetos) atualizarProjetos();
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

        <Group mb="sm" justify="center">
          <span className={styles.textoConfirmacao}>'Excluir'</span>
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

      <div className={styles.cardProjetos} onClick={() => navigate(`/detalhe/${id}/resumo`)}>
        <div className={`${styles.cardBarraLateral} ${styles[normalizarStatus(status)]}`} />

        <img src={logo} alt="Logo" className={styles.cardLogo} />

        <div className={styles.cardContainer}>
          <div className={styles.cardTitulo}>
            <h3 className={styles.tituloProjeto}>{nome}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Popover
                opened={popoverAberto}
                onChange={setPopoverAberto}
                position="right-start"
                offset={10}
                shadow="md"
                withArrow
              >
                <Popover.Target>
                  <button
                    className={styles.cardStatus}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopoverAberto((o) => !o);
                    }}
                    title="Clique para mudar o status"
                  >
                    {status}
                    <svg
                      width="7"
                      height="7"
                      viewBox="0 0 10 10"
                      fill="none"
                      style={{ marginLeft: 4, flexShrink: 0 }}
                    >
                      <path
                        d="M2 3.5L5 6.5L8 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Popover.Target>

                <Popover.Dropdown
                  onClick={(e) => e.stopPropagation()}
                  className={styles.statusDropdown}
                >
                  <Text
                    size="0.65rem"
                    c="dimmed"
                    mb={4}
                    style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
                  >
                    Mudar status
                  </Text>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {STATUS_OPTIONS.filter((opt) => {
                      const statusAtualNormal = normalizarStatus(status);
                      const optNormal = normalizarStatus(opt.label);

                      if (statusAtualNormal !== 'pendente' && optNormal === 'pendente')
                        return false;
                      if (statusAtualNormal === 'concluido' && optNormal !== 'concluido')
                        return false;

                      return true;
                    }).map((opt) => {
                      const ativo = normalizarStatus(status) === normalizarStatus(opt.label);
                      return (
                        <button
                          key={opt.label}
                          disabled={salvandoStatus}
                          className={`${styles.cardStatusBotao} ${ativo ? styles.cardStatusBotaoAtivo : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            mudarStatus(opt.label);
                          }}
                          style={{
                            color: ativo ? opt.cor : '#475569',
                            backgroundColor: ativo ? `${opt.cor}15` : 'transparent',
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: opt.cor,
                              flexShrink: 0,
                            }}
                          />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {normalizarStatus(status) !== 'pendente' && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: '6px 8px',
                        borderTop: '1px solid #f1f5f9',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0 0 4px 4px',
                      }}
                    >
                      <Text size="0.65rem" c="dimmed" style={{ lineHeight: 1.3 }} w={150}>
                        {normalizarStatus(status) === 'concluido'
                          ? ' Este projeto foi finalizado e não permite mais alterações de status.'
                          : " O status 'Pendente' não está mais disponível pois o projeto já foi iniciado."}
                      </Text>
                    </div>
                  )}
                </Popover.Dropdown>
              </Popover>

              <Menu trigger="click-hover" shadow="md" width={200} position="right-start">
                <Menu.Target>
                  <ActionIcon className={styles.acIcone} onClick={(e) => e.stopPropagation()}>
                    <Ellipsis size={18} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Ações</Menu.Label>

                  <Menu.Item
                    leftSection={<Edit size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirEditarProjeto(projeto);
                    }}
                  >
                    Editar
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalExcluirAberto(true);
                    }}
                  >
                    <Trash2 size={16} style={{ marginRight: 8 }} />
                    Excluir Projeto
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>

          <h3 className={styles.descricaoProjeto}>{descricao}</h3>

          <div className={styles.cardLinha} />

          <div>
            <p className={styles.cardDetalhe}>
              <strong>Responsável:</strong> {responsavel}
            </p>
            <p className={styles.cardDetalhe}>
              <strong>Prazo:</strong> {formatarData(data)}
            </p>
            <div className={styles.cardLinha} />
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
