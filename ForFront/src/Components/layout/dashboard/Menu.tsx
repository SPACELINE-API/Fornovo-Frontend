import styles from './dashCss/Menu.module.css';
import { Globe, Pen, File, TableCellsSplit } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ModalLevCampo from "../../../Pages/pagProjetos/CriarLevCampo";
import ModalArquivos from '../../../Pages/pagProjetos/UploadArquivo';

function Menu() {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [openedAmbiente, setOpenedAmbiente] = useState(false);
    const [openedArquivo, setOpenedArquivo] = useState(false);

    const selecionado = () => {
        if (path.includes("/resumo")) return "resumo";
        if (path.includes("/especificacoes")) return "especificacoes";
        if (path.includes("/relatorio")) return "relatorio";
        if (path.includes("/calculo")) return "calculo";
    };

    const aba = selecionado();

    return (
        <div className={styles.containerMenu}>
             <ModalLevCampo
                openedAmbiente={openedAmbiente}
                onClose={() => setOpenedAmbiente(false)}
            />
            <ModalArquivos
                openedArquivo={openedArquivo}
                onClose={() => setOpenedArquivo(false)}
            />
            <div className={styles.menu}>
                <button
                    onClick={() => navigate('resumo')}
                    className={`${styles.menuBtn} ${aba === "resumo" ? styles.ativo : ""}`}
                >
                    <Globe size={"18px"} />
                    <p>Resumo</p>
                </button>
                <button
                    onClick={() => navigate('especificacoes')}
                    className={`${styles.menuBtn} ${aba === "especificacoes" ? styles.ativo : ""}`}
                >
                    <Pen size={"18px"} />
                    <p>Especificações técnicas</p>
                </button>
                <button
                    onClick={() => navigate('relatorio')}
                    className={`${styles.menuBtn} ${aba === "relatorio" ? styles.ativo : ""}`}
                >
                    <File size={"18px"} />
                    <p>Relatório</p>
                </button>
                <button
                    onClick={() => navigate('calculo')}
                    className={`${styles.menuBtn} ${aba === "calculo" ? styles.ativo : ""}`}
                >
                    <TableCellsSplit size={"18px"} />
                    <p>Cálculo memorial</p>
                </button>

                <div className={styles.btnContainer}>
                     <button className={styles.btnLevantamento} onClick={() => setOpenedArquivo(true)}>+ Arquivos</button>
                     <button className={styles.btnLevantamento} onClick={() => setOpenedAmbiente(true)}>+ Levantamento de Campo</button>
                </div>

            </div>
        </div>
    )
    
}
export default Menu;