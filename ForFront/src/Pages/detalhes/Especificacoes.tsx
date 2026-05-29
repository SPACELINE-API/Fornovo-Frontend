import { useState, useEffect } from 'react';
import styles from '../../Styles/paginas/Calculo.module.css';
import { FileText, Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import api from '../../Services/apiService';
import { useParams } from 'react-router-dom';

function Especificacoes() {

    const { id } = useParams();
    const [temEspecificacao, setTemEspecificacao] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [gerando, setGerando] = useState(false);
    const [dataGeracao, setDataGeracao] = useState<string | null>(null);
    const [notificacao, setNotificacao] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

    useEffect(() => {
        verificarStatus();
    }, [id]);

    function mostrarNotificacao(tipo: 'sucesso' | 'erro', mensagem: string) {
        setNotificacao({ tipo, mensagem });
        setTimeout(() => setNotificacao(null), 3500);
    }

    async function verificarStatus() {
        if (!id) return;
        setCarregando(true);
        try {
            const response = await api.get('dados-ia/status-especificacao/', {
                params: { projeto_id: id },
            });
            if (response.data.status === 'concluido') {
                setTemEspecificacao(true);
                setDataGeracao(new Date().toLocaleDateString());
            } else {
                setTemEspecificacao(false);
            }
        } catch (error) {
            setTemEspecificacao(false);
        } finally {
            setCarregando(false);
        }
    }

    async function gerarEspecificacoes() {
        if (!id) return;
        setGerando(true);
        try {
            const resLevantamento = await api.get(`calculos/form-levantamento/${id}`);
            const dadosLevantamento = resLevantamento.data;

            let dadosDXF = {};
            try {
                const resIA = await api.get(`dados-ia/dados-processados/${id}`);
                dadosDXF = resIA.data.dados_dxf || {};
            } catch {
                // DXF pode não existir — prossegue com dados vazios
            }

            const dataSalvar = new FormData();
            dataSalvar.append('arquivo', JSON.stringify(dadosLevantamento));
            dataSalvar.append('dxf', JSON.stringify(dadosDXF));
            dataSalvar.append('projeto_id', id);

            await api.post('dados-ia/salvar-especificacao', dataSalvar);
            await verificarStatus();
            mostrarNotificacao('sucesso', 'Especificação técnica gerada com sucesso!');
        } catch (error: any) {
            console.error('Erro na geração da especificação:', error);
            const msg = error.response?.data?.erro || 'Erro ao gerar. Tente novamente.';
            mostrarNotificacao('erro', msg);
        } finally {
            setGerando(false);
        }
    }

    function baixar() {
        const url = `${api.defaults.baseURL}dados-ia/salvar-especificacao?projeto_id=${id}`;
        window.open(url, '_blank');
    }

    if (carregando) {
        return (
            <div className={styles.container}>
                <h2 className={styles.tituloPagina}>Especificações técnicas</h2>
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
            </div>
        );
    }

    return (
        <div className={styles.container}>

            {notificacao && (
                <div
                    className={`${styles.toast} ${notificacao.tipo === 'sucesso' ? styles.toastSucesso : styles.toastErro}`}
                >
                    {notificacao.tipo === 'sucesso' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {notificacao.mensagem}
                </div>
            )}

            <h2 className={styles.tituloPagina}>Especificações técnicas</h2>

            <div className={styles.card}>
                <div className={styles.cardBody}>

                    <div className={styles.docRow}>
                        <div className={`${styles.docIcon} ${!temEspecificacao ? styles.docIconEmpty : ''}`}>
                            <FileText size={20} color={temEspecificacao ? '#3b6d11' : '#aaa'} />
                        </div>
                        <div className={styles.docMeta}>
                            <p className={styles.docName}>Especificação técnica</p>
                            <p className={styles.docDate}>
                                {temEspecificacao ? `Gerado em ${dataGeracao}` : 'Nenhuma versão gerada ainda'}
                            </p>
                        </div>

                        {temEspecificacao ? (
                            <span className={`${styles.badge} ${styles.badgeOk}`}>
                                <span className={styles.badgeDotOk}></span>
                                Disponível
                            </span>
                        ) :
                            (
                                <span className={`${styles.badge} ${styles.badgeEmpty}`}>
                                    <span className={styles.badgeDotEmpty}></span>
                                    Não gerada
                                </span>
                            )
                        }
                    </div>

                    {temEspecificacao && (
                        <>
                            <div className={styles.divider} />
                            <div className={styles.acoes}>
                                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={baixar}>
                                    <Download size={15} />
                                    Baixar
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {temEspecificacao ? (
                    <div className={styles.generateSection}>
                        <p className={styles.generateLabel}>
                            Gerar uma nova versão?
                            <strong> O arquivo atual será substituído.</strong>
                        </p>

                        <button
                            className={styles.btnGerar}
                            onClick={gerarEspecificacoes}
                            disabled={gerando}
                        >
                            <RefreshCw size={14} className={gerando ? styles.girando : ''} />
                            {gerando ? 'Gerando...' : 'Gerar novamente'}
                        </button>
                    </div>
                ) : (
                    <div className={`${styles.generateSection} ${styles.generateSectionCentered}`}>
                        <button
                            className={`${styles.btn} ${styles.btnPrimario}`}
                            onClick={gerarEspecificacoes}
                            disabled={gerando}
                        >
                            <RefreshCw size={15} className={gerando ? styles.girando : ''} />
                            {gerando ? 'Gerando...' : 'Gerar especificações'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Especificacoes; 