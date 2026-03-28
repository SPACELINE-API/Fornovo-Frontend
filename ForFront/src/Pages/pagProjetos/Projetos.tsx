import { useState, useEffect } from "react";
import { Button, Group, Title } from "@mantine/core";
import ModalCriarProjeto from "./CriarProjeto";
import styles from '../../Styles/paginas/Projetos.module.css';
import BarraPesquisa from "../../Components/layout/dashboard/BarraPesquisa";
import CardProjetos from "../../Components/layout/dashboard/CardProjetos";
import Dropdown from "../../Components/layout/dashboard/Dropdown";
import api from "../../Services/apiService";
import { capitalizar, capitalizarNome, formatarData, maiusculas } from "../../utils/formatos";

interface Projeto {
  id_projeto : string,
  nome_projeto: string,
  descricao: string,
  status: string,
  engenheiro_nome: string,
  data_fim: string
}

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

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState();

  useEffect(() => {
    const buscarProjetos = async () => {
      try {
        const response = await api.get('projetos/listarProjetos');
        setProjetos(response.data)
        console.log(response.data)
      } catch (error: any) {
        console.log(error);
        setErro(error);
      } finally {
        setCarregando(false);
      }
    };

    buscarProjetos();

  }, []);

  const projetosFiltrados = projetos.filter((projeto) =>
    projeto.nome_projeto.includes(busca.toLowerCase()) &&
    (filtro === "" || projeto.status === filtro)
  );

  if (carregando) {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className="">Projetos</Title>
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
          <p>Carregando projetos...</p>
        </div>
      </div>
    )
  }
  if (projetos.length == 0) {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className="">Projetos</Title>
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
          <p>Nenhum projeto cadastrado.</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className="">Projetos</Title>
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
          {projetosFiltrados.map((projeto) => (
            <CardProjetos
              key={projeto.id_projeto}
              id={projeto.id_projeto}
              nome={capitalizar(projeto.nome_projeto)}
              descricao={capitalizar(projeto.descricao)}
              status={maiusculas(projeto.status)}
              responsavel={capitalizarNome(projeto.engenheiro_nome)}
              data={formatarData(projeto.data_fim)}
            />
          ))}
        </div>
      </div>
    );
  }
}