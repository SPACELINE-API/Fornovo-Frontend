import { Outlet } from 'react-router-dom';
import Menu from '../Components/layout/dashboard/Menu';

function ProjetoDetalhe() {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )
}

export default ProjetoDetalhe;