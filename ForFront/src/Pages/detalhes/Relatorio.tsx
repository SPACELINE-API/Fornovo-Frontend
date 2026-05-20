import styles from '../../Styles/paginas/Calculo.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Plus, Info } from 'lucide-react';
import api from '../../Services/apiService';
import { Table, Text, Tooltip, ActionIcon, Alert } from '@mantine/core';
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
    const [relatorio, setRelatorio] = useState<Relatorio[]>([]);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        buscarHistorico();
    }, [id]);

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

            setRelatorio(relatorios.data);
            setCarregando(false);
        }
        catch (error) {
            console.log(error)
        }
    }

    if (carregando) {
        return (
            <>
                <div className={styles.container}>
                    <h2 className={styles.tituloPagina}>Relatórios</h2>

                    <div className={styles.containerHistorico}>

                        <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={() => setOpened(true)}>
                            <Plus size={'15px'} />Adicionar versão
                        </button>

                        <ModalRelatorio
                            opened={opened}
                            onClose={() => setOpened(false)}
                            onSuccess={() => {
                                setOpened(false)
                                buscarHistorico();
                            }} />

                        <Alert mt="md" variant="light" color="lime" title="Geração automática" icon={<Info />}>
                            Um relatório é gerado de forma automática após o upload do arquivo CAD.
                            Sempre que você enviar novos arquivos, o sistema irá gerar uma nova versão. Esse processo pode
                            levar alguns minutos.
                        </Alert>

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

            <h2 className={styles.tituloPagina}>Relatórios</h2>

            <div className={styles.containerHistorico}>

                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={() => setOpened(true)}>
                    <Plus size={'15px'} />Adicionar versão
                </button>

                <ModalRelatorio
                    opened={opened}
                    onClose={() => setOpened(false)}
                    onSuccess={() => {
                        setOpened(false)
                        buscarHistorico();
                    }} />

                <Alert mt="md" variant="light" color="lime" title="Geração automática" icon={<Info />}>
                    Um relatório é gerado de forma automática após o upload do arquivo CAD.
                    Sempre que você enviar novos arquivos, o sistema irá gerar uma nova versão. Esse processo pode
                    levar alguns minutos.
                </Alert>

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
                                                Nenhum relatório gerado
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