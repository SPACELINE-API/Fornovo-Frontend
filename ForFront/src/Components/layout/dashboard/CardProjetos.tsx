import styles from './dashCss/cardProjetos.module.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    nome: string,
    descricao: string,
    responsavel: string,
    status: string,
    data: string
}

function CardProjetos({ nome, descricao, responsavel, status, data }: CardProps) {

    const navigate = useNavigate();

    const normalizarStatus = (status: string) => {
        return status
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "");
    };

    return (
        <div className={styles.cardProjetos} onClick={() => navigate('/detalhe/resumo')}>
            <div className={`${styles.cardBarraLateral} ${styles[normalizarStatus(status)]}`}></div>
            <div className={styles.cardContainer}>
                <div className={styles.cardTitulo}>
                    <h3 className={styles.tituloProjeto}>{nome}</h3>
                    <p className={styles.cardStatus}>{status}</p>
                </div>
                <h3 className={styles.descricaoProjeto}>{descricao}</h3>
                <div className={styles.cardLinha}></div>
                <div>
                    <p className={styles.cardDetalhe}><strong>Responsável:</strong> {responsavel}</p>
                    <p className={styles.cardDetalhe}><strong>Prazo:</strong> {data}</p>
                    <div className={styles.cardLinha}></div>
                </div>
                <div className={styles.cardBotoes}>
                    <button
                        className={styles.cardBotao}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/detalhe/calculo');
                        }}
                    >Cálculo</button>
                    <button
                        className={styles.cardBotao}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/detalhe/relatorio');
                        }}
                    >Relatório</button>
                    <button
                        className={styles.cardBotao}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate('/detalhe/resumo');
                        }}
                    >Resumo</button>
                </div>
            </div>
        </div>
    )
}

export default CardProjetos;