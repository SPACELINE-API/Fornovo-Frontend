import styles from '../../Styles/paginas/Calculo.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileSpreadsheet, Download, RefreshCw } from 'lucide-react';
import api from '../../Services/apiService';

function Relatorio() {

    const { id } = useParams();
    const [carregando, setCarregando] = useState(true);
    const [statusRelatorio, setStatusRelatorio] = useState(false);
    const [dataGeracao, setDataGeracao] = useState<string | null>(null);
    const [atualizando, setAtualizando] = useState(false);

    useEffect(() => {
        verificarStatusRelatorio();
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
                setDataGeracao(new Date().toLocaleDateString());
                setStatusRelatorio(true);
            }
            else {
                setStatusRelatorio(false);
            }
        }
        catch (error) {
            console.log(error)
            setStatusRelatorio(false);
        }
        finally {
            setCarregando(false);
            setAtualizando(false)
        }
    }

    function downloadRelatorio() {
        const url = `${api.defaults.baseURL}dados-ia/download-relatorio?projeto_id=${id}`;
        window.open(url, '_blank');
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
                                {statusRelatorio ? `Gerado em ${dataGeracao}` : 'Nenhuma versão gerada ainda'}
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

                    {statusRelatorio ? (
                        <>
                            <div className={styles.divider} />
                            <div className={styles.acoes}>
                                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={downloadRelatorio}>
                                    <Download size={15} />
                                    Baixar
                                </button>
                            </div>
                        </>
                    ) :
                        <>
                            <div className={styles.divider} />
                            <div className={styles.acoes}>
                                <button className={`${styles.btn} ${styles.btnGerar}`} onClick={() => verificarStatusRelatorio(false)}>
                                    <RefreshCw size={15} className={atualizando ? styles.girando : ''} />
                                    Atualizar status
                                </button>
                            </div>
                        </>
                    }
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
        </div>

    )
}

export default Relatorio;