import Header from "./header";
import SidebarAdmin from "./sidebarAdmin";
import styles from "./dashCss/dashboardLayout.module.css";
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
    return (
        <div className={styles.container}>
            <Header userName="Leticia" /> 

            <div className={styles.layoutBody}>
                <SidebarAdmin />

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}