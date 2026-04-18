import styles from '../../Styles/paginas/Calculo.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileSpreadsheet, Download, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

const STATUS = 'relatorio_status'
const URL = 'relatorio_url'

const arquivoRelatorio = {
    name: 'Relatório',
    type: 'DOCX'
}

function Relatorio() {

    const { id } = useParams();
    const [carregando, setCarregando] = useState(true);
    const [statusRelatorio, setStatusRelatorio] = useState<string | null>(null);
    const [gerando, setGerando] = useState(false);
    const [notificacao, setNotificacao] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

    useEffect(() => {
        verificarStatus();
    }, [id]);

    function mostrarNotificacao(tipo: 'sucesso' | 'erro', mensagem: string) {
        setNotificacao({ tipo, mensagem });
        setTimeout(() => setNotificacao(null), 3500);
    }

    async function verificarStatus() {
        setCarregando(true)

        try {
            const statusSalvo = localStorage.getItem(STATUS)
            if (statusSalvo) {
                const { status, data } = JSON.parse(statusSalvo);
                if (status == 'gerado') {
                    setStatusRelatorio(data);
                    return
                }
            }
            setStatusRelatorio(null);
        }
        catch (error) {
            console.log(error)
            setStatusRelatorio(null)
        }
        finally {
            setCarregando(false)
        }
    }

    async function gerarRelatorio() {
        if (!id) return;
        setGerando(true);
        try {
            const conteudo = `Relatório do projeto ${id}`
            const blob = new Blob([conteudo], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });

            const base64 = await converterBlob(blob);
            const data = new Date().toLocaleDateString();

            localStorage.setItem(URL, base64);
            localStorage.setItem(STATUS, JSON.stringify({ status: 'gerado', data }));

            await verificarStatus();
            mostrarNotificacao('sucesso', 'Relatório gerado com sucesso!');
        }
        catch (error) {
            console.log(error)
            mostrarNotificacao('erro', 'Erro ao gerar. Tente novamente');
        }
        finally {
            setGerando(false);
        }
    }

    function downloadRelatorio() {
        const base64 = localStorage.getItem(URL);
        if (!base64) {
            mostrarNotificacao('erro', 'Arquivo não encontrado.')
        }
        else {
            const link = document.createElement('a');
            link.href = base64;
            link.download = `relatorio_projeto_${id}.docx`;
            link.click();
        }
    }

    function converterBlob(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Erro ao converter blob'));
            reader.readAsDataURL(blob);
        });
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

            {notificacao && (
                <div
                    className={`${styles.toast} ${notificacao.tipo === 'sucesso' ? styles.toastSucesso : styles.toastErro}`}
                >
                    {notificacao.tipo === 'sucesso' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {notificacao.mensagem}
                </div>
            )}

            <h2 className={styles.tituloPagina}>Relatório</h2>

            <div className={styles.card}>
                <div className={styles.cardBody}>

                    <div className={styles.docRow}>
                        <div className={`${styles.docIcon} ${!statusRelatorio ? styles.docIconEmpty : ''}`}>
                            <FileSpreadsheet size={20} color={statusRelatorio ? '#3b6d11' : '#aaa'} />
                        </div>
                        <div className={styles.docMeta}>
                            <p className={styles.docName}>{arquivoRelatorio.name}</p>
                            <p className={styles.docDate}>
                                {statusRelatorio ? `Gerado em ${statusRelatorio}` : 'Nenhuma versão gerada ainda'}
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

                    {statusRelatorio && (
                        <>
                            <div className={styles.divider} />
                            <div className={styles.acoes}>
                                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={downloadRelatorio}>
                                    <Download size={15} />
                                    Baixar
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {statusRelatorio ? (
                    <div className={styles.generateSection}>
                        <p className={styles.generateLabel}>
                            Gerar uma nova versão?
                            <strong> O arquivo atual será substituído.</strong>
                        </p>

                        <button
                            className={styles.btnGerar}
                            onClick={gerarRelatorio}
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
                            onClick={gerarRelatorio}
                            disabled={gerando}
                        >
                            <RefreshCw size={15} className={gerando ? styles.girando : ''} />
                            {gerando ? 'Gerando...' : 'Gerar relatório'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Relatorio;