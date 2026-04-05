import styles from "./dashCss/Header.module.css";
import { ChevronDown, LogOut, Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoImg from "../../../assets/imagens/Logofnv.png";

interface HeaderProps {
    userName: string;
    userAvatar?: string;
}
function Header({ userName, userAvatar }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 
    useEffect(() => {        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }   
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (

        <header className={styles.header}>
            <div className={styles.headerConteudo}>
                <div className={styles.brand}>
                    <img src={logoImg} alt="Logo Fornovo" className={styles.logo} />
                    <h2 className={styles.headerTitulo}>Fornovo</h2>
                </div>

                <div className={styles.acoes}>

                    <span className={styles.notis}><Bell /></span>

                    <div 
                    ref={dropdownRef}
                    className={styles.userMenu} 
                    onClick={() => setOpen(!open)}
                >
                    <div className={styles.userAvatar}>
                        {userAvatar ? (
                            <img src={userAvatar} alt={userName} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                {userName.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <span className={`${styles.arrow} ${open ? styles.open : ""}`}>
                        <ChevronDown size={18} />
                    </span>
                    {open && (
                        <div className={styles.dropdownMenu}>
                            <button className={styles.dropdownItem}>
                                <LogOut />  Logout
                            </button>
                        </div>
                    )}
                </div>
                                       
                </div>

                
            </div> 
        </header>
    );
}

export default Header;