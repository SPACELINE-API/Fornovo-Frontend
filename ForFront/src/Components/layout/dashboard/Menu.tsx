import styles from './dashCss/Menu.module.css';
import { Globe, Pen, File, TableCellsSplit } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Menu() {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const selecionado = () => {
        if (path.includes("/resumo")) return "resumo";
        if (path.includes("/especificacoes")) return "especificacoes";
        if (path.includes("/relatorio")) return "relatorio";
        if (path.includes("/calculo")) return "calculo";
    };

    const aba = selecionado();

    return (
        <div className={styles.menu}>
            <button
                onClick={() => navigate('resumo')}
                className={`${styles.menuBtn} ${aba === "resumo" ? styles.ativo : ""}`}
            >
                <Globe size={"20px"} />
                <p>Resumo</p>
            </button>
            <button 
                onClick={() => navigate('especificacoes')} 
                className={`${styles.menuBtn} ${aba === "especificacoes" ? styles.ativo : ""}`}
            >
                <Pen size={"20px"} />
                <p>Especificações técnicas</p>
            </button>
            <button 
                onClick={() => navigate('relatorio')} 
                className={`${styles.menuBtn} ${aba === "relatorio" ? styles.ativo : ""}`}
            >
                <File size={"20px"} />
                <p>Relatório</p>
            </button>
            <button 
                onClick={() => navigate('calculo')} 
                className={`${styles.menuBtn} ${aba === "calculo" ? styles.ativo : ""}`}
            >
                <TableCellsSplit size={"20px"} />
                <p>Cálculo memorial</p>
            </button>
        </div>
    )
}

export default Menu;