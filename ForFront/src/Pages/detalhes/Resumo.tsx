import styles from '../../Styles/paginas/Resumo.module.css';
import PainelProjeto from '../../Components/layout/paineis/painelProjeto';
import { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import PainelArquivos from '../../Components/layout/paineis/painelArquivos';
import PainelResponsaveis from '../../Components/layout/paineis/painelResponsaveis';
import type { LevantamentoDados } from '../../types/resumo';
import TabelaLevantamento from '../../Components/layout/paineis/tabelaLevantamento';
import { FileText } from 'lucide-react';
import api from '../../Services/apiService';
import { useParams } from 'react-router-dom';
import { capitalizar, formatarData, capitalizarNome } from '../../utils/formatos';

interface Projeto {
  id_projeto: string;
  nome_projeto: string;
  status: string;
  engenheiro_nome: string;
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

  console.log(levantamento);

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
        setLevantamento(response.data);
        setVazio(false);
      } catch (error) {
        console.log(error);
        setVazio(true);
      } finally {
        setCarregando(false);
      }
    }
    if (id) dadosLevantamento();
  }, [id]);

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
            dados={[{ nome: capitalizarNome(projeto.engenheiro_nome), funcao: 'Engenheiro' }]}
          />
        </div>

        <div className={styles.containerDireito}>
          <p className={styles.sectionLabel}>Arquivos associados</p>
          <PainelArquivos projeto_id={id} />

          <div className={styles.containerLevantamento}>
            <div className={styles.levHeader}>
              <div className={styles.levTitulo}>
                <FileText size={18} strokeWidth={1.75} style={{ marginRight: 3 }} />
                <span className={styles.sectionLabel}>Levantamento de campo</span>
              </div>
              {!vazio && <span className={styles.levBadge}>Preenchido</span>}
            </div>

            {vazio ? (
              <p className={styles.levVazio}>Ainda não cadastrado.</p>
            ) : (
              <button className={styles.btnVisualizar} onClick={() => setAberto(true)}>
                Visualizar
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        opened={aberto}
        onClose={() => setAberto(false)}
        size="60%"
        centered
        title="Levantamento de campo"
        styles={{
          title: { fontWeight: 500, fontSize: '0.95rem' },
          header: { borderBottom: '1px solid #eee', paddingBottom: '12px' },
        }}
      >
        {vazio ? (
          <p style={{ color: '#888', fontSize: '0.875rem' }}>
            Levantamento de campo ainda não cadastrado.
          </p>
        ) : levantamento ? (
          <TabelaLevantamento dados={levantamento} />
        ) : (
          <p style={{ color: '#888', fontSize: '0.875rem' }}>Carregando...</p>
        )}
      </Modal>
    </div>
  );
}

export default Resumo;