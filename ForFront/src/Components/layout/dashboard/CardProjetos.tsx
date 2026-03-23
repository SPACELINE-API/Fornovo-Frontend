import styles from './dashCss/cardProjetos.module.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    nome: string,
    responsavel: string,
    status: string,
    data: string
}

function CardProjetos({ nome, responsavel, status, data }: CardProps) {

    const navigate = useNavigate();

    return (
        <div className={styles.cardProjetos}>
            <div className={`${styles.cardBarraLateral} ${styles[status]}`}></div>
            <div className={styles.cardContainer}>
                <div className={styles.cardTitulo}>
                    <h3 className={styles.tituloProjeto}>{nome}</h3>
                    <p className={styles.cardStatus}>{status}</p>
                </div>
                <div className={styles.cardLinha}></div>
                <div>
                    <p><strong>Responsável:</strong> {responsavel}</p>
                    <p><strong>Prazo:</strong> {data}</p>
                    <div className={styles.cardLinha}></div>
                </div>
                <div className={styles.cardBotoes}>
                    <button onClick={() => navigate('/detalhe/calculo')} className={styles.cardBotao}>Cálculo memorial</button>
                    <button onClick={() => navigate('/detalhe/relatorio')} className={styles.cardBotao}>Relatório</button>
                    <button onClick={() => navigate('/detalhe/resumo')} className={styles.cardBotao}>Resumo geral</button>
                </div>
            </div>
        </div>
    )
}

export default CardProjetos;