import { Outlet } from 'react-router-dom';
import Menu from '../Components/layout/dashboard/Menu';
import styles from '../Styles/paginas/ProjetoDetalhe.module.css';

function ProjetoDetalhe() {
    return (
        <div className={styles.containerDetalhes}>
            <Menu />
            <Outlet />
        </div>
    )
}

export default ProjetoDetalhe;