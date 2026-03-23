import styles from './dashCss/barraPesquisa.module.css';
import { Filter } from "lucide-react";

interface BarraPesquisaProps {
    busca : string,
    setBusca : React.Dispatch<React.SetStateAction<string>>
}

function BarraPesquisa({busca, setBusca} : BarraPesquisaProps) {
    return (
        <div className={styles.containerBarraPesquisa}>
            <input value={busca} onChange={(e) => setBusca(e.target.value)} className={styles.barraPesquisa} type='text' placeholder='Pesquisar'></input>
            <button className={styles.btnFiltro}><Filter className={styles.iconePesquisa} /></button>
        </div>
    )
}

export default BarraPesquisa;