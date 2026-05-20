import styles from '../../Styles/paginas/Resumo.module.css';
import PainelProjeto from '../../Components/layout/paineis/painelProjeto';
import { useState, useEffect } from 'react';
import { Modal, ScrollArea } from '@mantine/core';
import PainelArquivos from '../../Components/layout/paineis/painelArquivos';
import PainelResponsaveis from '../../Components/layout/paineis/painelResponsaveis';
import type { LevantamentoDados, Ambiente } from '../../types/resumo';
import TabelaLevantamento from '../../Components/layout/paineis/tabelaLevantamento';
import api from '../../Services/apiService';
import { useParams } from 'react-router-dom';
import { capitalizar, formatarData, capitalizarNome } from '../../utils/formatos';
import { IconPencilCheck } from '@tabler/icons-react';
import ModalLevCampo from '../pagProjetos/CriarLevCampo';

interface Projeto {
  id_projeto: string;
  nome_projeto: string;
  status: string;
  engenheiro_nome: string;
  engenheiro_nivel: string;
  data_inicio: string;
  data_fim: string;
  cliente: string;
  localizacao: string;
}

function Resumo() {
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [levantamento, setLevantamento] = useState<LevantamentoDados | null>(null);
  const [vazio, setVazio] = useState(true);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState<Ambiente | null>(null);
  const [recarregar, setRecarregar] = useState(0);
  const [editar, setEditar] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function buscarProjeto() {
      try {
        const response = await api.get(`projetos/buscarProjeto/${id}`);
        setProjeto(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCarregando(false);
      }
    }
    if (id) buscarProjeto();
  }, [id]);

 useEffect(() => {
  async function dadosLevantamento() {
    try {
      const response = await api.get(`calculos/form-levantamento/${id}`);
      const data = response.data;
      const ambientes = Array.isArray(data) ? data : [data];

      if (ambientes.length === 0) {
        setVazio(true);
      } else {
        setLevantamento({ ambientes });
        setVazio(false);
      }
    } catch (error) {
      console.log(error);
      setVazio(true);
    } finally {
      setCarregando(false);
    }
  }
  if (id) dadosLevantamento();
}, [id, recarregar]);

useEffect(() => {
  const handler = () => setRecarregar(r => r + 1);
  window.addEventListener('levantamentoCampo', handler);
  return () => window.removeEventListener('levantamentoCampo', handler);
}, []);

  if (carregando || !projeto) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingDot} />
        <div className={styles.loadingDot} style={{ animationDelay: '0.15s' }} />
        <div className={styles.loadingDot} style={{ animationDelay: '0.3s' }} />
      </div>
    );
  }
  
  const statusMap: Record<string, string> = {
    pendente: styles.statusPendente,
    'em andamento': styles.statusEmAndamento,
    'em revisão': styles.statusRevisao,
    ativo: styles.statusAtivo,
    concluido: styles.statusConcluido,
    concluído: styles.statusConcluido,
  };
  const statusClass = statusMap[projeto.status?.toLowerCase()] ?? styles.statusPendente;

  return (
    <div className={styles.containerDetalhes}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.titulo}>{capitalizar(projeto.nome_projeto)}</h1>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            <span className={styles.statusDot} />
            {capitalizar(projeto.status)}
          </span>
        </div>
      </div>

      <div className={styles.containerConteudo}>
        <div className={styles.containerEsquerdo}>
          <p className={styles.sectionLabel}>Informações gerais</p>
          {projeto && (
            <PainelProjeto
              cliente={capitalizar(projeto.cliente)}
              localizacao={capitalizar(projeto.localizacao)}
              dataInicio={formatarData(projeto.data_inicio)}
              prazo={formatarData(projeto.data_fim)}
            />
          )}
          <PainelResponsaveis
            dados={[{ nome: capitalizarNome(projeto.engenheiro_nome), funcao: capitalizar(projeto.engenheiro_nivel) }]}
          />
        </div>

        <div className={styles.containerDireito}>
          <p className={styles.sectionLabel}>Arquivos associados</p>
          <PainelArquivos projeto_id={id} />
      </div>
    </div>
    <p className={styles.sectionLabel} style={{ marginTop: '2rem' }}>Levantamento de campo</p>
    {vazio ? (
      <div className={styles.levVazioCard}>
        <p className={styles.levVazio}>Nenhum levantamento de campo registrado.</p>
      </div>
    ) : (
      <div className={styles.cardList}>
    {!vazio && levantamento?.ambientes?.map((ambiente, index) => (
      <div key={index} className={styles.card}>
        <div className={styles.cardLev}>
          <span className={styles.tituloLev}>{capitalizar(ambiente.nome)}</span>
          <span className={styles.levBadge}><IconPencilCheck size={18} /></span>
        </div>
        <hr className={styles.divisaoLev} />
        <div className={styles.preenchidoLev}>
          <span>Preenchido em:</span>
          <span className={styles.dataLev}>{formatarData(ambiente.created_at ?? '')}</span>
        </div>
        <div className={styles.actionsLev}>
          <button className={styles.btnVisualizarEditar} onClick={() => { setAmbienteSelecionado(ambiente); setAberto(true)}} >
            Visualizar
          </button>
          <button className={styles.btnVisualizarEditar} onClick={() => { setAmbienteSelecionado(ambiente); setEditar(true)}} >
            Editar
          </button>
          
        </div>
      </div>
    ))}
    
  </div>  
)}
  <Modal
    opened={aberto}
    onClose={() => { setAberto(false); setAmbienteSelecionado(null); }}
    title={ambienteSelecionado ? capitalizar(ambienteSelecionado.nome) : ""}
    size="xl"
    scrollAreaComponent={ScrollArea.Autosize}
    >
    {ambienteSelecionado && <TabelaLevantamento ambiente={ambienteSelecionado} />}
  </Modal> 
  <ModalLevCampo
    openedAmbiente={editar}
    onClose={() => { setEditar(false); setAmbienteSelecionado(null); }}
    onSuccess={() => setRecarregar(r => r + 1)}
    initialData={ambienteSelecionado}
/>
</div> 
  );
}

export default Resumo;