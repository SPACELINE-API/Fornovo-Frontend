import Header from "./header";
import SidebarAdmin from "./sidebarAdmin";
import styles from "./dashCss/dashboardLayout.module.css";
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    const userName = usuario?.nome || 'Usuário';

    return (
        <div className={styles.container}>
            <Header userName={userName} />

            <div className={styles.layoutBody}>
                <SidebarAdmin />

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}