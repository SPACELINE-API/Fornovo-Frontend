import styles from '../Styles/paginas/Projetos.module.css';
import BarraPesquisa from '../Components/layout/dashboard/BarraPesquisa';
import CardProjetos from '../Components/layout/dashboard/CardProjetos';
import { useState } from 'react';
import Dropdown from '../Components/layout/dashboard/Dropdown';

const projetos = [
    { nome: "Manutenção do sistema elétrico", descricao: "Verificar os cabos da rede", status: "PENDENTE", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Construção de alojamento", descricao: "Alojamento novo no setor A", status: "CONCLUÍDO", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reestruturação do pátio", descricao: "Ampliar o acesso ao pátio", status: "EM ANDAMENTO", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reforma do refeitório", descricao: "Ampliação da área total", status: "CONCLUÍDO", responsavel: "Luiz Garcia", data: "13/04/2026" },
    { nome: "Reforma do laboratório", descricao: "Adicionar espaços maiores", status: "EM REVISÃO", responsavel: "Luiz Garcia", data: "13/04/2026" }
]

export default function Projetos() {

    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("");

    const projetosFiltrados = projetos.filter((projeto) =>
        projeto.nome.toLowerCase().includes(busca.toLowerCase()) &&
        (filtro === "" || projeto.status === filtro)
    );

    return (
        <>
            <h1>Projetos</h1>
            <div className={styles.containerBarraPesquisa}>
                <BarraPesquisa busca={busca} setBusca={setBusca} />
                <Dropdown filtro={filtro} setFiltro={setFiltro} />
            </div>
            <div className={styles.containerProjetos}>
                {projetosFiltrados.map((projeto, index) => (
                    <CardProjetos
                        key={index}
                        nome={projeto.nome}
                        descricao={projeto.descricao}
                        status={projeto.status}
                        responsavel={projeto.responsavel}
                        data={projeto.data}
                    />
                ))}
            </div>
        </>
    );
}