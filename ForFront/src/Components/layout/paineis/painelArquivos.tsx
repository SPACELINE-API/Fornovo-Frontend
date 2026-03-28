import styles from './Painel.module.css';
import { Paperclip } from 'lucide-react';

function PainelArquivos() {
    return (
        <div className={styles.painelArquivos}>
            <div className={styles.bloco}>
                <div className={styles.tituloArquivo}>
                    <Paperclip size={'17px'} />
                    <p>Arquivo CAD</p>
                </div>
                <div className={styles.botoesArquivo}>
                    <button className={styles.btnArquivo}>Visualizar</button>
                </div>
            </div>
            <div className={styles.bloco}>
                <div className={styles.tituloArquivo}>
                    <Paperclip size={'17px'} />
                    <p>Memorial de cálculo </p>
                </div>
                <div className={styles.botoesArquivo}>
                    <button className={styles.btnArquivo}>Visualizar</button>
                    <button className={styles.btnArquivo}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default PainelArquivos;