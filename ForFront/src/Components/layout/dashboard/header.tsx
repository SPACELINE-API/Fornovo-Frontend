import styles from "./dashCss/Header.module.css";
import { ChevronDown, LogOut, Bell } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/imagens/Logofnv.png";

interface HeaderProps {
    userName: string;
    userAvatar?: string;
}
function Header({ userName, userAvatar }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    const getInitials = (name: string) => {
        if (!name) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

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
                                {getInitials(userName)}
                            </div>
                        )}
                    </div>
                    <span className={`${styles.arrow} ${open ? styles.open : ""}`}>
                        <ChevronDown size={18} />
                    </span>
                    {open && (
                        <div className={styles.dropdownMenu}>
                            <button className={styles.dropdownItem} onClick={handleLogout}>
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