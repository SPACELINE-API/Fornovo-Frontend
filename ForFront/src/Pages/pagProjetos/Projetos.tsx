import { useState, useEffect } from 'react';
import { Button, Divider, Group, Title, Skeleton } from '@mantine/core';
import ModalCriarProjeto from './CriarProjeto';
import styles from '../../Styles/paginas/Projetos.module.css';
import BarraPesquisa from '../../Components/layout/dashboard/BarraPesquisa';
import CardProjetos from '../../Components/layout/dashboard/CardProjetos';
import Dropdown from '../../Components/layout/dashboard/Dropdown';
import api from '../../Services/apiService';
import { capitalizar, capitalizarNome, maiusculas } from '../../utils/formatos';
import ModalEditarProjeto from './editarProjeto';
import type { ProjetoFormsData } from '../../types/projeto';

export interface Projeto {
  id_projeto: string;
  nome_projeto: string;
  descricao: string;
  status: string;
  engenheiro_nome: string;
  data_fim: string;
  localizacao: string;
}

export default function Projetos() {
  const [opened, setOpened] = useState(false);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('');
  const [projetoSelecionado, setProjetoSelecionado] = useState<ProjetoFormsData | null>(null);
  const [modalEditarOpened, setModalEditarOpened] = useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarProjetos = async () => {
    try {
      const response = await api.get('projetos/listarProjetos');
      setProjetos(response.data);

      localStorage.setItem('projetos', JSON.stringify(response.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      setCarregando(false);
    }
  };

  const abrirEditarProjeto = (projeto: Projeto) => {
    let bairro = '';
    let cidade = '';
    let estado = '';
    let numero = '';

    if (projeto.localizacao) {
      const partes = projeto.localizacao.split(', ');
      bairro = partes[0] || '';
      if (partes[1]) {
        const cidadeEstado = partes[1].split(' - ');
        cidade = cidadeEstado[0] || '';
        estado = cidadeEstado[1] || '';
      }

      numero = partes[2] || '';
    }

    const projetoConvertido: any = {
      ...projeto,
      id: projeto.id_projeto,
      nome_projeto: projeto.nome_projeto,
      descricao: projeto.descricao,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      numero: numero,
      responsavel: projeto.engenheiro_nome ? [projeto.engenheiro_nome] : [],
      data_inicio: null, 
      data_fim: projeto.data_fim ? new Date(projeto.data_fim + 'T00:00:00') : null,
      status: projeto.status,
    };

    setProjetoSelecionado(projetoConvertido);
    setModalEditarOpened(true);
  };

  useEffect(() => {
    const projetosSalvos = localStorage.getItem('projetos');

    if (projetosSalvos) {
      setProjetos(JSON.parse(projetosSalvos));
      setCarregando(false);
    }

    buscarProjetos();
  }, []);

  const normalizarStatus = (status: string) => {
    return status
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');
  };

  const projetosFiltrados = projetos.filter((projeto) => {
    const nomeMatch = projeto.nome_projeto.toLowerCase().includes(busca.toLowerCase());

    const statusMatch =
      filtro === '' || normalizarStatus(projeto.status) === normalizarStatus(filtro);

    return nomeMatch && statusMatch;
  });

  if (carregando && projetos.length === 0) {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className={styles.titulo}>
            Projetos
          </Title>

          <Group>
            <BarraPesquisa busca={busca} setBusca={setBusca} />
            <Dropdown filtro={filtro} setFiltro={setFiltro} />
          </Group>

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
          }}
          atualizarProjetos={buscarProjetos}
        />

        <ModalEditarProjeto
          opened={modalEditarOpened}
          onClose={() => setModalEditarOpened(false)}
          atualizarProjetos={buscarProjetos}
          projeto={projetoSelecionado}
        />

        <div className={styles.containerProjetos}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={220} radius="md" />
          ))}
        </div>
      </div>
    );
  }
  if (projetos.length == 0) {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className={styles.titulo}>
            Projetos
          </Title>

          <Group>
            <BarraPesquisa busca={busca} setBusca={setBusca} />
            <Dropdown filtro={filtro} setFiltro={setFiltro} />
          </Group>

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
          }}
          atualizarProjetos={buscarProjetos}
        />

        <div className={styles.containerProjetos}>
          <p>Nenhum projeto cadastrado.</p>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: '24px' }}>
        <Group justify="space-between" mb="xl">
          <Title order={2} className={styles.titulo}>
            Projetos
          </Title>

          <Group className={styles.containerBarraPesquisa}>
            <BarraPesquisa busca={busca} setBusca={setBusca} />
            <Dropdown filtro={filtro} setFiltro={setFiltro} />
          </Group>

          <Button
            color="#34623F"
            onClick={() => {
              setOpened(true);
            }}
          >
            + Novo Projeto
          </Button>
        </Group>

        <Divider />

        <ModalCriarProjeto
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          atualizarProjetos={buscarProjetos}
        />
        <ModalEditarProjeto
          opened={modalEditarOpened}
          onClose={() => setModalEditarOpened(false)}
          atualizarProjetos={buscarProjetos}
          projeto={projetoSelecionado}
        />

        <div className={styles.containerProjetos}>
          {projetosFiltrados.map((projeto) => (
            <CardProjetos
              key={projeto.id_projeto}
              id={projeto.id_projeto}
              nome={capitalizar(projeto.nome_projeto)}
              descricao={capitalizar(projeto.descricao)}
              status={maiusculas(projeto.status)}
              responsavel={capitalizarNome(projeto.engenheiro_nome)}
              data={projeto.data_fim}
              atualizarProjetos={buscarProjetos}
              projeto={projeto}
              abrirEditarProjeto={abrirEditarProjeto}
            />
          ))}
        </div>
      </div>
    );
  }
}
