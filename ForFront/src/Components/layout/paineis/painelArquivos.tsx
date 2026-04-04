import styles from './Painel.module.css';
import { Paperclip } from 'lucide-react';

interface ArquivoProps {
    projeto_id: string | undefined
}

function PainelArquivos({ projeto_id }: ArquivoProps) {
    return (
        <div className={styles.painelArquivos}>
            <div className={styles.bloco}>
                <div className={styles.tituloArquivo}>
                    <Paperclip size={'17px'} />
                    <p>Arquivo CAD</p>
                </div>
                <div className={styles.botoesArquivo}>
                    <button className={styles.btnArquivo}
                        onClick={() => {
                            window.open(`http://localhost:8000/api/projetos/buscarArquivo/${projeto_id}`);
                        }}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default PainelArquivos;