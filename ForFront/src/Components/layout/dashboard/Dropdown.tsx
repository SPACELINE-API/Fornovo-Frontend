import styles from './dashCss/Dropdown.module.css';
import { Filter } from "lucide-react";

interface DropdownProps {
    filtro: string,
    setFiltro: React.Dispatch<React.SetStateAction<string>>
}

function Dropdown({ filtro, setFiltro }: DropdownProps) {
    return (
        <div className={styles.dropdown}>
            <button className={styles.btnFiltro}><Filter className={styles.iconePesquisa} /></button>
            <div className={styles.dropdownOpcoes}>
                <button onClick={() => setFiltro("")} className={styles.btnDropdown}>Todos</button>
                <button onClick={() => setFiltro("CONCLUÍDO")} className={styles.btnDropdown}>Concluído</button>
                <button onClick={() => setFiltro("PENDENTE")} className={styles.btnDropdown}>Pendente</button>
                <button onClick={() => setFiltro("EM ANDAMENTO")} className={styles.btnDropdown}>Em andamento</button>
                <button onClick={() => setFiltro("EM REVISÃO")} className={styles.btnDropdown}>Em revisão</button>            
            </div>
        </div>
    )
}

export default Dropdown;