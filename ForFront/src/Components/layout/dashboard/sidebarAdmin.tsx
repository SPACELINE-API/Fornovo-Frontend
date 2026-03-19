import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./dashCss/Sidebar.module.css";
import { Clock, FileText, House, PanelRightClose, PanelRightOpen, PencilRuler, User } from "lucide-react";


function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
  
    if (path.includes("/recentes")) return "recentes";
    if (path.includes("/projetos")) return "projetos";
    if (path.includes("/normas")) return "normas";
    if (path.includes("/funcionarios")) return "funcionarios";
    if (path === "/" || path.includes("/home")) return "home";
    return "";
  };

  const activeItem = getActiveItem();
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.sidebarHeader}>
        <button onClick={toggleSidebar} className={styles.toggleBtn}>
            {collapsed ? <PanelRightOpen size={24} /> : <PanelRightClose size={24} />}
        </button>
      </div>

      <nav className={styles.sidebarNav} style={{ cursor: "pointer" }}>
        <button
          className={`${styles.sidebarItem} ${activeItem === "home" ? styles.active : ""}`}
          onClick={() => navigate("/")}
        >
          <House size={24} />
          {!collapsed && <span className={styles.navEscrito}>Home</span>}
        </button>

        <button
          className={`${styles.sidebarItem} ${activeItem === "recentes" ? styles.active : ""}`}
          onClick={() => navigate("/recentes")}
        >
          <Clock size={24} />
          {!collapsed && <span className={styles.navEscrito}>Recentes</span>}
        </button>

        <button
          className={`${styles.sidebarItem} ${activeItem === "projetos" ? styles.active : ""}`}
          onClick={() => navigate("/projetos")}
        >
          <PencilRuler size={24} />
          {!collapsed && <span className={styles.navEscrito}>Projetos</span>}
        </button>
  
        <button
          className={`${styles.sidebarItem} ${activeItem === "normas" ? styles.active : ""}`}
          onClick={() => navigate("/normas")}>

          <FileText size={24} />
          {!collapsed && <span className={styles.navEscrito}>Nbr's</span>}

        </button>

        <button
          className={`${styles.sidebarItem} ${activeItem === "funcionarios" ? styles.active : ""}`}
          onClick={() => navigate("/funcionarios")}>

          <User size={24} />
          {!collapsed && <span className={styles.navEscrito}>Funcionários</span>}

        </button>
      </nav>
    </div>
  );
}

export default SidebarAdmin;
