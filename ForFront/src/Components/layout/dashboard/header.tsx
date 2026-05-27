import styles from "./dashCss/Header.module.css";
import { Combobox, Badge, ScrollArea, useCombobox } from "@mantine/core";
import { ChevronDown, LogOut, Bell, Hourglass, AlertCircle, CircleCheck, BellOff } from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/imagens/Logofnv.png";
import api from "../../../Services/apiService";
import type { TipoNotificacao } from "../../../types/dashboard";

interface HeaderProps {
    userName: string;
    userAvatar?: string;
}

interface Notificacao {
    id: number,
    mensagem: string,
    tipo: TipoNotificacao,
    data: string,
    usuario: string,
    lida: boolean
}

function Header({ userName, userAvatar }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const [naoLidas, setNaoLidas] = useState<number>(0);
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const combobox = useCombobox();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        listarNotificacoes();
        notificacoesNaoLidas();
    }, []);

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

    const tiposBadge: Record<TipoNotificacao, { color: string; label: string, icon: ReactNode }> = {
        info: { color: 'blue', label: 'Info', icon: <AlertCircle size={13} /> },
        alerta: { color: 'yellow', label: 'Alerta', icon: <Hourglass size={13} /> },
        sucesso: { color: 'green', label: 'Sucesso', icon: <CircleCheck size={13} /> },
        erro: { color: 'red', label: 'Erro', icon: <AlertCircle size={13} /> }
    };

    async function listarNotificacoes() {
        try {
            const resposta = await api.get(`projetos/notificacoes`);
            setNotificacoes(resposta.data);
        }
        catch (error) {
            console.log(`Erro ao listar notificações ${error}`);
        }
    }

    async function notificacoesNaoLidas() {
        try {
            const resposta = await api.get(`projetos/notificacoes/contagem`);
            setNaoLidas(resposta.data.nao_lidas);
        }
        catch (error) {
            console.log(`Erro ao buscar novas notificações ${error}`);
        }
    }

    async function marcarComolida() {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            await api.patch(`projetos/notificacoes/alterarStatus`);
            setNaoLidas(0);
        }
        catch (error) {
            console.log(`Erro ao mudar o status da notificação ${error}`);
        }
    }

    return (

        <header className={styles.header}>
            <div className={styles.headerConteudo}>
                <div className={styles.brand}>
                    <img src={logoImg} alt="Logo Fornovo" className={styles.logo} />
                    <h2 className={styles.headerTitulo}>Fornovo</h2>
                </div>

                <div className={styles.acoes}>
                    <Combobox store={combobox} width={300} position="bottom-end">
                        <Combobox.Target>
                            {naoLidas === 0 ?
                                <div className={styles.notis}>
                                    <button
                                        className={styles.btnNotis}
                                        onClick={() => {
                                            combobox.toggleDropdown();
                                            marcarComolida();
                                            listarNotificacoes();
                                        }}>
                                        <Bell />
                                    </button>
                                </div>
                                :
                                <div className={styles.notis}>
                                    <button
                                        className={styles.btnNotis}
                                        onClick={() => {
                                            combobox.toggleDropdown();
                                            marcarComolida();
                                            listarNotificacoes();
                                        }}>
                                        <div className={styles.circuloNotificacoes}></div>
                                        <Bell />
                                    </button>
                                </div>
                            }
                        </Combobox.Target>
                        <Combobox.Dropdown
                            h={250}
                            style={{
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                borderRadius: 8
                            }}>
                            {notificacoes.length === 0 ? (
                                <div className={styles.containerNotificacoes}>
                                    <BellOff color="lightgray" size={50} />
                                    <p>Você não tem notificações</p>
                                </div>
                            ) : (
                                <ScrollArea h={240}>
                                    <div className={styles.listaNotificacoes}>
                                        {notificacoes.map((notificacao) => {
                                            const tipo = tiposBadge[notificacao.tipo];
                                            const status = notificacao.lida

                                            return (
                                                <div
                                                    className={styles.containerNotificacao}
                                                    key={notificacao.id}
                                                    style={{ padding: '6px 8px' }}
                                                >
                                                    {status ? (
                                                        <div className={styles.notificacaoItemVisualizado}>
                                                            <Badge className={styles.badge} color={tipo.color} variant="light">
                                                                <div className={styles.badgeContainer}>
                                                                    {tipo.icon}
                                                                    {tipo.label}
                                                                </div>
                                                            </Badge>

                                                            <p className={styles.notificacaoMensagem}>
                                                                {notificacao.mensagem}
                                                            </p>

                                                            <p className={styles.notificacaoMensagem}>
                                                                {notificacao.data}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className={styles.notificacaoItem}>
                                                            <div className={styles.notificacaoTopo}>
                                                                <Badge className={styles.badge} color={tipo.color} variant="light">
                                                                    <div className={styles.badgeContainer}>
                                                                        {tipo.icon}
                                                                        {tipo.label}
                                                                    </div>
                                                                </Badge>
                                                                <p className={styles.novaNotificacao}>Novo!</p>
                                                            </div>

                                                            <p className={styles.notificacaoMensagem}>
                                                                {notificacao.mensagem}
                                                            </p>

                                                            <p className={styles.notificacaoMensagem}>
                                                                {notificacao.data}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            )}

                        </Combobox.Dropdown>
                    </Combobox>

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