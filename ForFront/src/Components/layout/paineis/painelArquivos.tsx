import styles from './Painel.module.css';
import { Paperclip } from 'lucide-react';

function PainelArquivos() {
    return (
        <div className={styles.painelArquivos}>
            <div className={styles.tituloArquivo}>
                <Paperclip />
                <p>Arquivo CAD</p>
            </div>
            <div className={styles.botoesArquivo}>
                <button className={styles.btnArquivo}>Visualizar</button>
                <button className={styles.btnArquivo}>Download</button>
            </div>
            <div className={styles.tituloArquivo}>
                <Paperclip />
                <p>Memorial de cálculo </p>
            </div>
            <div className={styles.botoesArquivo}>
                <button className={styles.btnArquivo}>Visualizar</button>
                <button className={styles.btnArquivo}>Download</button>
            </div>
        </div>
    )
}

export default PainelArquivos;