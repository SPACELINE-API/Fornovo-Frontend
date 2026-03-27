import styles from './Painel.module.css';
import { SquareUser } from 'lucide-react';

interface Responsavel {
    nome: string,
    funcao: string
}

interface PainelResponsaveisProps {
    dados: Responsavel[];
}

function PainelResponsaveis({ dados }: PainelResponsaveisProps) {
    return (
        <div className={styles.painelResponsaveis}>
            <h4>RESPONSÁVEIS</h4>
            <div className={styles.dadoContainer}>
                {dados.map((pessoa, index) => (
                    <div key={index}>
                        <div className={styles.dadoTitulo}>
                            <SquareUser size={'20px'} />
                            <p><strong>{pessoa.nome}</strong></p>
                        </div>
                        <p className={styles.dado}>{pessoa.funcao}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PainelResponsaveis;