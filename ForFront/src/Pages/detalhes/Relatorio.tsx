import styles from '../../Styles/paginas/Calculo.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileSpreadsheet, Download, RefreshCw, Plus } from 'lucide-react';
import api from '../../Services/apiService';
import { Table, Text, Tooltip, ActionIcon } from '@mantine/core';
import ModalRelatorio from '../pagProjetos/CriarRelatorio';

interface Relatorio {
    id: number;
    nome_arquivo: string;
    criado_em: string;
    responsavel: string,
    geracao_manual: boolean;
}

function Relatorio() {

    const { id } = useParams();
    const [carregando, setCarregando] = useState(true);
    const [statusRelatorio, setStatusRelatorio] = useState(false);
    const [dataGeracao, setDataGeracao] = useState<string | null>(null);
    const [atualizando, setAtualizando] = useState(false);
    const [relatorio, setRelatorio] = useState<Relatorio[]>([]);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        verificarStatusRelatorio();
        buscarHistorico();
    }, [id]);

    async function verificarStatusRelatorio(mostrarCarregando = true) {
        if (!id) return;

        if (mostrarCarregando) {
            setCarregando(true);
        }
        setAtualizando(true);

        try {
            const response = await api.get(`dados-ia/status-relatorio`, {
                params: { projeto_id: id }
            });
            if (response.data.status == "concluido") {
                console.log(response.data)
                setStatusRelatorio(true);
            }
            else {
                setStatusRelatorio(false);
            }
            buscarHistorico();
        }
        catch (error) {
            console.log(error)
            setStatusRelatorio(false);
        }
        finally {
            setCarregando(false);
            setAtualizando(false);
        }
    }

    function downloadRelatorio(relatorioID: number) {
        const url = `${api.defaults.baseURL}dados-ia/download-relatorio?projeto_id=${id}&relatorio_id=${relatorioID}`;
        window.open(url, '_blank');
    }

    function formatarData(data: string) {
        return new Date(data).toLocaleDateString('pt-BR')
    }

    async function buscarHistorico() {
        try {
            const relatorios = await api.get(`dados-ia/historico-relatorio`, {
                params: { projeto_id: id }
            });
            const dados: Relatorio[] = relatorios.data;
            setRelatorio(relatorios.data);

            const ultimo = dados[0];
            setDataGeracao(ultimo ? new Date(ultimo.criado_em).toLocaleDateString('pt-BR') : null);
        }
        catch (error) {
            console.log(error)
        }
    }

    if (carregando) {
        return (
            <>
                <div className={styles.container}>
                    <h2 className={styles.tituloPagina}>Relatório</h2>
                    <div className={styles.card}>
                        <div className={styles.cardBody}>
                            <div className={styles.docRow}>
                                <div className={`${styles.docIcon} ${styles.skeleton}`} />
                                <div className={styles.docMeta}>
                                    <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
                                    <div className={`${styles.skeletonLine} ${styles.skeletonSubtitle}`} />
                                </div>
                                <div className={`${styles.skeletonBadge} ${styles.skeleton}`} />
                            </div>
                        </div>
                        <div className={`${styles.generateSection} ${styles.skeleton}`} style={{ height: 56 }} />
                    </div>

                    <div className={styles.containerHistorico}>
                        <h2 className={styles.tituloPagina}>Histórico de versões</h2>

                        <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={() => setOpened(true)}>
                            <Plus size={'15px'} />Adicionar versão
                        </button>

                        <section className={styles.containerTabela}>
                            <div className={styles.card}>
                                <Table highlightOnHover verticalSpacing="md" className={styles.stickyHeader}>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Nome</Table.Th>
                                            <Table.Th>Data de geração</Table.Th>
                                            <Table.Th>Tipo de geração</Table.Th>
                                            <Table.Th>Responsável</Table.Th>
                                            <Table.Th>Ações</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        <Table.Tr>
                                            <Table.Td colSpan={5}>
                                                <Text c="dimmed" ta="center">
                                                    Carregando dados...
                                                </Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={styles.container}>

            <h2 className={styles.tituloPagina}>Relatório</h2>

            <div className={styles.card}>
                <div className={styles.cardBody}>

                    <div className={styles.docRow}>
                        <div className={`${styles.docIcon} ${!statusRelatorio ? styles.docIconEmpty : ''}`}>
                            <FileSpreadsheet size={20} color={statusRelatorio ? '#3b6d11' : '#aaa'} />
                        </div>
                        <div className={styles.docMeta}>
                            <p className={styles.docName}>Relatório</p>
                            <p className={styles.docDate}>
                                {statusRelatorio ? `Última versão gerada em ${dataGeracao}` : 'Nenhuma versão gerada ainda'}
                            </p>
                        </div>

                        {statusRelatorio ? (
                            <span className={`${styles.badge} ${styles.badgeOk}`}>
                                <span className={styles.badgeDotOk}></span>
                                Disponível
                            </span>
                        ) :
                            (
                                <span className={`${styles.badge} ${styles.badgeEmpty}`}>
                                    <span className={styles.badgeDotEmpty}></span>
                                    Não gerado
                                </span>
                            )
                        }
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.acoes}>
                        <button className={`${styles.btn} ${styles.btnGerar}`} onClick={() => verificarStatusRelatorio(false)}>
                            <RefreshCw size={15} className={atualizando ? styles.girando : ''} />
                            Atualizar status
                        </button>
                    </div>
                </div>

                {statusRelatorio ? (
                    <div className={styles.generateSection}>
                        <p className={styles.generateLabel}>
                            Sempre que você enviar novos arquivos
                            <strong> uma nova versão do relatório será gerada automaticamente.</strong>
                        </p>
                    </div>
                ) : (
                    <div className={`${styles.generateSection} ${styles.generateSectionCentered}`}>
                        <p className={styles.generateLabel}>
                            Após preencher o levantamento de campo e enviar os arquivos, o relatório será gerado e ficará disponível para download. Esse processo pode levar alguns minutos.
                        </p>
                    </div>
                )}
            </div>


            <div className={styles.containerHistorico}>
                <h2 className={styles.tituloPagina}>Histórico de versões</h2>

                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={() => setOpened(true)}>
                    <Plus size={'15px'} />Adicionar versão
                </button>

                <ModalRelatorio
                    opened={opened}
                    onClose={() => setOpened(false)}
                    onSuccess={() => {setOpened(false)
                        buscarHistorico();
                    }} />


                <section className={styles.containerTabela}>
                    <div className={styles.card}>
                        <Table highlightOnHover verticalSpacing="md" className={styles.stickyHeader}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nome</Table.Th>
                                    <Table.Th>Data de geração</Table.Th>
                                    <Table.Th>Tipo de geração</Table.Th>
                                    <Table.Th>Responsável</Table.Th>
                                    <Table.Th>Ações</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {relatorio.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={5}>
                                            <Text c="dimmed" ta="center">
                                                Nenhum relatório cadastrado
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>

                                ) : (
                                    relatorio.map((r) => (
                                        <Table.Tr key={r.id}>
                                            <Table.Td>
                                                {r.nome_arquivo}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatarData(r.criado_em)}
                                            </Table.Td>
                                            <Table.Td>{r.geracao_manual ? "Manual" : "Automática"}</Table.Td>
                                            <Table.Td>{r.responsavel ? r.responsavel : "-"}</Table.Td>
                                            <Table.Td>
                                                <Tooltip label="Baixar">
                                                    <ActionIcon
                                                        variant="light"
                                                        color="green"
                                                        onClick={() => downloadRelatorio(r.id)}
                                                    >
                                                        <Download size={15} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                )
                                }
                            </Table.Tbody>
                        </Table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Relatorio;