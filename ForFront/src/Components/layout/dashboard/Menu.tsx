import styles from './dashCss/Menu.module.css';
import {
  Globe,
  Pen,
  File,
  TableCellsSplit,
  Plus,
  ArrowUpFromLine,
  Lock,
  Check,
} from 'lucide-react';

import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Tooltip, Loader } from '@mantine/core';
import ModalEditarArquivo from '../../../Pages/pagProjetos/editarArquivo';
import type { ArquivoNormData } from '../../layout/Formularios/formsArquivos';
import ModalLevCampo from '../../../Pages/pagProjetos/CriarLevCampo';
import ModalArquivos from '../../../Pages/pagProjetos/UploadArquivo';
import api from '../../../Services/apiService';

interface MenuProps {
  iaEstado: 'idle' | 'processando' | 'concluida' | 'erro';
  onIniciarIA: () => void;
  onIAconcluida: () => void;
  onIAerro: () => void;
}


function Menu({ iaEstado, onIniciarIA, onIAconcluida, onIAerro }: MenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const path = location.pathname;

  const [openedAmbiente, setOpenedAmbiente] = useState(false);
  const [openedArquivo, setOpenedArquivo] = useState(false);

  const [temLevantamento, setTemLevantamento] = useState(false);
  const [temArquivo, setTemArquivo] = useState(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<ArquivoNormData | null>(null);
  const [openedEditarArquivo, setOpenedEditarArquivo] = useState(false);

  const [verificandoLevantamento, setVerificandoLevantamento] = useState(true);
  const [verificandoArquivo, setVerificandoArquivo] = useState(true);

  const selecionado = () => {
    if (path.includes('/resumo')) return 'resumo';
    if (path.includes('/especificacoes')) return 'especificacoes';
    if (path.includes('/relatorio')) return 'relatorio';
    if (path.includes('/calculo')) return 'calculo';
  };

  const aba = selecionado();

  async function verificarLevantamento() {
    if (!id) return;

    setVerificandoLevantamento(true);

    try {
      await api.get(`calculos/form-levantamento/${id}`);
      setTemLevantamento(true);
    } catch {
      setTemLevantamento(false);
    } finally {
      setVerificandoLevantamento(false);
    }
  }

  async function verificarArquivo() {
    if (!id) return;

    setVerificandoArquivo(true);

    try {
      const response = await api.get(`projetos/verificarArquivo/${id}`);

      if (response.data.existe) {
        setTemArquivo(true);

        setArquivoSelecionado({
          nome: response.data.nome_arquivo,
          caminho: response.data.caminho_arquivo || response.data.caminho,
          tipo: response.data.tipo_arquivo,
          hash: response.data.hash_arquivo,
          projeto_id: response.data.projeto_id,
        });
      } else {
        setTemArquivo(false);
        setArquivoSelecionado(null);
      }
    } catch (error) {
      console.error('Erro ao verificar arquivo:', error);
      setTemArquivo(false);
      setArquivoSelecionado(null);
    } finally {
      setVerificandoArquivo(false);
    }
  }

  useEffect(() => {
    verificarLevantamento();
    verificarArquivo();
  }, [id]);

  const getLevantamentoIcon = () => {
    if (verificandoLevantamento) return <Loader size={14} />;
    if (temLevantamento) return <Check size={14} />;
    return <Plus size={14} />;
  };

  const getArquivoIcon = () => {
    if (verificandoArquivo) return <Loader size={14} />;
    if (!temLevantamento) return <Lock size={14} />;
    if (temArquivo) return <Check size={14} />;
    return <ArrowUpFromLine size={14} />;
  };

  const abrirModalArquivo = () => {
    if (temArquivo) {
      setOpenedEditarArquivo(true);
    } else {
      setOpenedArquivo(true);
    }
  };

  return (
    <div className={styles.containerMenu}>
      <ModalLevCampo
        openedAmbiente={openedAmbiente}
        onClose={() => {
          setOpenedAmbiente(false);
          verificarLevantamento();
        }}
      />

      <ModalArquivos
        openedArquivo={openedArquivo}
        onClose={() => {
          setOpenedArquivo(false);
          verificarArquivo();
        }}
        onIniciarIA={onIniciarIA}
        onIAconcluida={onIAconcluida}
        onIAerro={onIAerro}
      />

      <ModalEditarArquivo
        opened={openedEditarArquivo}
        onClose={() => setOpenedEditarArquivo(false)}
        arquivo={arquivoSelecionado}
        onSubmitSuccess={() => {
          verificarArquivo();
          setOpenedEditarArquivo(false);
        }}
        onIniciarIA={onIniciarIA}
        onIAconcluida={onIAconcluida}
        onIAerro={onIAerro}
      />

      <div className={styles.menu}>
        <div className={styles.tabs}>
          <button
            onClick={() => navigate('resumo')}
            className={`${styles.menuBtn} ${aba === 'resumo' ? styles.ativo : ''}`}
          >
            <Globe size={15} />
            <span>Resumo</span>
          </button>

          <button
            onClick={() => navigate('especificacoes')}
            className={`${styles.menuBtn} ${aba === 'especificacoes' ? styles.ativo : ''}`}
          >
            <Pen size={15} />
            <span>Especificações técnicas</span>
          </button>

          <button
            onClick={() => navigate('relatorio')}
            className={`${styles.menuBtn} ${aba === 'relatorio' ? styles.ativo : ''}`}
          >
            <File size={15} />
            <span>Relatório</span>
          </button>

          <button
            onClick={() => navigate('calculo')}
            className={`${styles.menuBtn} ${aba === 'calculo' ? styles.ativo : ''}`}
          >
            <TableCellsSplit size={15} />
            <span>Memorial de Cálculo</span>
          </button>
        </div>

        <div className={styles.btnContainer}>
          <Tooltip
            label={
              temLevantamento
                ? 'Clique para editar o levantamento'
                : 'Preencha o levantamento de campo'
            }
          >
            <Button
              variant={temLevantamento ? 'light' : 'default'}
              color={temLevantamento ? '#448d67' : undefined}
              leftSection={getLevantamentoIcon()}
              onClick={() => setOpenedAmbiente(true)}
              loading={verificandoLevantamento}
            >
              Levantamento de Campo
            </Button>
          </Tooltip>

          <Tooltip
            label={
              !temLevantamento
                ? 'Preencha o levantamento antes de subir arquivos'
                : temArquivo
                  ? 'Clique para alterar o arquivo'
                  : 'Suba um arquivo para o projeto'
            }
          >
            <Button
              variant={temArquivo ? 'light' : 'filled'}
              color={temArquivo ? '#448d67' : '#1b5e3b'}
              leftSection={getArquivoIcon()}
              onClick={abrirModalArquivo}
              disabled={!temLevantamento || verificandoArquivo || iaEstado === 'processando'}
              loading={verificandoArquivo || iaEstado === 'processando'}
            >
              {iaEstado === 'processando'
                ? 'Analisando...'
                : verificandoArquivo
                  ? 'Verificando...'
                  : temArquivo
                    ? 'Arquivo Salvo'
                    : 'Subir Arquivos'}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Menu;
