import { useEffect, useState } from 'react';
import styles from '../../Styles/paginas/Calculo.module.css';
import { FileSpreadsheet, Download, RefreshCw, Plus } from 'lucide-react';
import api from '../../Services/apiService';
import { useParams } from 'react-router-dom';

export default function Calculo() {
  const { id } = useParams();
  const [temMemorial, setTemMemorial] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [gerando, setGerando] = useState(false);
  const [dataGeracao, setDataGeracao] = useState<string | null>(null);

  useEffect(() => {
    verificarStatus();
  }, [id]);

  async function verificarStatus() {
    if (!id) return;

    setCarregando(true);

    try {
      const response = await api.get('dados-ia/status-memorial/', {
        params: {
          projeto_id: id,
        },
      });

      if (response.data.status === 'concluido') {
        setTemMemorial(true);

        setDataGeracao(new Date().toLocaleDateString());
      } else {
        setTemMemorial(false);
      }
    } catch (error) {
      setTemMemorial(false);
    } finally {
      setCarregando(false);
    }
  }

  async function gerarMemorial() {
    if (!id) return;
    setGerando(true);

    try {
      const resLevantamento = await api.get(`calculos/form-levantamento/${id}`);
      const dadosLevantamento = resLevantamento.data;
      const resIA = await api.get(`dados-ia/dados-processados/${id}`);
      const dadosDXF = resIA.data.dados_dxf;

      const dataGerar = new FormData();
      dataGerar.append('arquivo', JSON.stringify(dadosLevantamento));
      dataGerar.append('dxf', JSON.stringify(dadosDXF));

      const dataSalvar = new FormData();
      dataSalvar.append('arquivo', JSON.stringify(dadosLevantamento));
      dataSalvar.append('dxf', JSON.stringify(dadosDXF));
      dataSalvar.append('projeto_id', id);

      await api
        .post('dados-ia/salvar-memorial', dataSalvar)
        .catch((e) => console.log('Erro ao persistir no banco, mas download feito.', e));

      await verificarStatus();
    } catch (error) {
      console.error('Erro na geração do memorial:', error);
    } finally {
      setGerando(false);
    }
  }

  function baixar() {
    const url = `${api.defaults.baseURL}` + `dados-ia/salvar-memorial?projeto_id=${id}`;

    window.open(url, '_blank');
  }

  if (carregando) {
    return (
      <div className={styles.container}>
        <h2 className={styles.tituloPagina}>Memorial de Cálculo</h2>

        <div className={styles.card}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.tituloPagina}>Memorial de Cálculo</h2>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.docRow}>
            <div className={`${styles.docIcon} ${!temMemorial ? styles.docIconEmpty : ''}`}>
              <FileSpreadsheet size={20} color={temMemorial ? '#3b6d11' : '#aaa'} />
            </div>

            <div className={styles.docMeta}>
              <p className={styles.docName}>Memorial de cálculo</p>

              <p className={styles.docDate}>
                {temMemorial ? `Gerado em ${dataGeracao}` : 'Nenhuma versão gerada ainda'}
              </p>
            </div>

            {temMemorial ? (
              <span className={`${styles.badge} ${styles.badgeOk}`}>
                <span className={styles.badgeDotOk} />
                Disponível
              </span>
            ) : (
              <span className={`${styles.badge} ${styles.badgeEmpty}`}>
                <span className={styles.badgeDotEmpty} />
                Não gerado
              </span>
            )}
          </div>

          {temMemorial && (
            <>
              <div className={styles.divider} />

              <div className={styles.acoes}>

                <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={baixar}>
                  <Download size={15} />
                  Baixar
                </button>
              </div>
            </>
          )}
        </div>

        {temMemorial ? (
          <div className={styles.generateSection}>
            <p className={styles.generateLabel}>
              Gerar uma nova versão?
              <strong>O arquivo atual será substituído.</strong>
            </p>

            <button className={styles.btnGerar} onClick={gerarMemorial} disabled={gerando}>
              <RefreshCw size={14} />

              {gerando ? 'Gerando...' : 'Gerar novamente'}
            </button>
          </div>
        ) : (
          <div className={`${styles.generateSection} ${styles.generateSectionCentered}`}>
            <button className={`${styles.btn} ${styles.btnPrimario}`} onClick={gerarMemorial}>
              <Plus size={15} />
              Gerar memorial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
