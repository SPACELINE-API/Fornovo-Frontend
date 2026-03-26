import styles from './Painel.module.css';
import { MapPin } from 'lucide-react';
import { User } from 'lucide-react';
import { Calendar } from 'lucide-react';


interface PainelProjetoProps {
    cliente : string,
    localizacao : string,
    dataInicio : string,
    prazo : string
}

function PainelProjeto({cliente, localizacao, dataInicio, prazo} : PainelProjetoProps) {
    return (
        <div className={styles.painelInfos}>
            <div>
                <h4>DADOS PROJETO</h4>
                <div className={styles.coluna}>
                    <div className={styles.dadoContainerProjeto}>
                        <div className={styles.dadoTitulo}>
                            <User size={'20px'} />
                            <p><strong>Cliente</strong></p>
                        </div>
                        <p className={styles.dado}>{cliente}</p>
                    </div>
                    <div className={styles.dadoContainerProjeto}>
                        <div className={styles.dadoTitulo}>
                            <MapPin size={'20px'} />
                            <p><strong>Localização</strong></p>
                        </div>
                        <p className={styles.dado}>{localizacao}</p>
                    </div>
                    <div className={styles.dadoContainerProjeto}>
                        <div className={styles.dadoTitulo}>
                            <Calendar size={'20px'} />
                            <p><strong>Data de início</strong></p>
                        </div>
                        <p className={styles.dado}>{dataInicio}</p>
                    </div>
                    <div className={styles.dadoContainerProjeto}>
                        <div className={styles.dadoTitulo}>
                            <Calendar size={'20px'} />
                            <p><strong>Prazo</strong></p>
                        </div>
                        <p className={styles.dado}>{prazo}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PainelProjeto;