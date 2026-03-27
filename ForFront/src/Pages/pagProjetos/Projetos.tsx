import { useState } from 'react';
import { Button, Group, Title } from '@mantine/core';
import ModalCriarProjeto from './CriarProjeto';
import styles from '../../Styles/paginas/Projetos.module.css';
import BarraPesquisa from '../../Components/layout/dashboard/BarraPesquisa';
import CardProjetos from '../../Components/layout/dashboard/CardProjetos';
import Dropdown from '../../Components/layout/dashboard/Dropdown';

const projetos = [
  {
    nome: 'Manutenção do sistema elétrico',
    descricao: 'Verificar os cabos da rede',
    status: 'PENDENTE',
    responsavel: 'Luiz Garcia',
    data: '13/04/2026',
  },
  {
    nome: 'Construção de alojamento',
    descricao: 'Alojamento novo no setor A',
    status: 'CONCLUÍDO',
    responsavel: 'Luiz Garcia',
    data: '13/04/2026',
  },
  {
    nome: 'Reestruturação do pátio',
    descricao: 'Ampliar o acesso ao pátio',
    status: 'EM ANDAMENTO',
    responsavel: 'Luiz Garcia',
    data: '13/04/2026',
  },
  {
    nome: 'Reforma do refeitório',
    descricao: 'Ampliação da área total',
    status: 'CONCLUÍDO',
    responsavel: 'Luiz Garcia',
    data: '13/04/2026',
  },
  {
    nome: 'Reforma do laboratório',
    descricao: 'Adicionar espaços maiores',
    status: 'EM REVISÃO',
    responsavel: 'Luiz Garcia',
    data: '13/04/2026',
  },
];

export default function Projetos() {
  const [opened, setOpened] = useState(false);
  //   const [listaProjetos, setListaProjetos] = useState([]);
  //   const carregarProjetos = () => {
  //     const dados = JSON.parse(localStorage.getItem("@Fornovo:projetos") || "[]");
  //     setListaProjetos(dados);
  //   };

  //   useEffect(() => {
  //     carregarProjetos();
  //   }, []);

  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('');

  const projetosFiltrados = projetos.filter(
    (projeto) =>
      projeto.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (filtro === '' || projeto.status === filtro),
  );

  return (
    <div style={{ padding: '24px' }}>
      <Group justify="space-between" mb="xl">
        <Title order={2} className="">
          Projetos
        </Title>
        <Button
          color="#34623F"
          onClick={() => {
            setOpened(true);
          }}
        >
          + Novo Projeto
        </Button>
      </Group>

      <ModalCriarProjeto
        opened={opened}
        onClose={() => {
          setOpened(false);
          //   carregarProjetos();
        }}
      />

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
    </div>
  );
}