import styles from './Painel.module.css';
import { Paperclip } from 'lucide-react';

interface ArquivoProps {
    projeto_id: string | undefined
}

function PainelArquivos({ projeto_id }: ArquivoProps) {
       async function handleDownload() {
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(
            `http://localhost:8000/api/projetos/buscarArquivo/${projeto_id}?download=1`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
       
        if (!response.ok) {
            const erro = await response.text(); 
            console.error('Erro do backend:', erro);
            return;
        }
            const disposition = response.headers.get('Content-Disposition');
            const nomeArquivo = disposition
                ? disposition.split('filename=')[1]?.replace(/"/g, '')
                : `arquivo_${projeto_id}`;

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = nomeArquivo ?? `arquivo_${projeto_id}`;
            a.click();

            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Erro no download:', error);
        }
    }
    return (
        <div className={styles.painelArquivos}>
            <div className={styles.bloco}>
                <div className={styles.tituloArquivo}>
                    <Paperclip size={'17px'} />
                    <p>Arquivo CAD</p>
                </div>
                <div className={styles.botoesArquivo}>
                    <button className={styles.btnArquivo}
                        onClick={(handleDownload)}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default PainelArquivos;