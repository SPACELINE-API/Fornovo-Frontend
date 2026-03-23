import styles from '../Styles/paginas/Projetos.module.css';
import BarraPesquisa from '../Components/layout/dashboard/BarraPesquisa';
import CardProjetos from '../Components/layout/dashboard/CardProjetos';
import { useState } from 'react';

const projetos = [
    { nome: "Manutenção do sistema elétrico", status: "pendente", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Construção de novo alojamento", status: "aprovado", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reestruturação do pátio logístico", status: "pendente", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reforma do refeitório", status: "aprovado", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reforma do laboratório", status: "aprovado", responsavel: "Luiz Garcia", data: "13/04/2026" }
]

export default function Projetos() {

    const [busca, setBusca] = useState("");

    const nomesBuscados = projetos.filter((projeto) => projeto.nome.toLowerCase().includes(busca.toLowerCase()));

    return (
        <>
            <h1>Projetos</h1>
            <BarraPesquisa busca={busca} setBusca={setBusca} />
            <div className={styles.containerProjetos}>
                {nomesBuscados.map((projeto, index) => (
                    <CardProjetos
                        key={index}
                        nome={projeto.nome}
                        status={projeto.status}
                        responsavel={projeto.responsavel}
                        data={projeto.data}
                    />
                ))}
            </div>
        </>
    );
}