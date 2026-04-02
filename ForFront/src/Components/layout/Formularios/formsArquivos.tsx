import React, { useState, useEffect } from 'react';
import { Box, Group, Button, Text, Paper, Stack, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { CloudUpload, FileText, Trash } from 'lucide-react';
import styles from './formsCss/formsArq.module.css';
import api from '../../../Services/apiService';
import { useParams } from 'react-router-dom';

export interface ArquivoNormData {
  nome: string;
  caminho: string;
  tipo: string;
  hash: string;
  projeto_id: string;
}

interface FormularioArquivosProps {
  onSubmitSuccess: (arquivo: ArquivoNormData) => void;
  onCancel: () => void;
  initialArquivo?: ArquivoNormData | null;
  onIniciarIA?: () => void;
  onIAconcluida?: () => void;
  onIAerro?: () => void;
}

const MIME_DXF_DWG = {
  'application/dxf': ['.dxf'],
  'application/acad': ['.dwg'],
  'image/vnd.dwg': ['.dwg'],
  'application/x-autocad': ['.dwg', '.dxf'],
  'application/octet-stream': ['.dxf', '.dwg'],
  'image/dxf': ['.dxf'],
  'application/dwg': ['.dwg'],
};

function extensaoValida(arquivo: File): boolean {
  const extensao = arquivo.name.split('.').pop()?.toLowerCase();
  return extensao === 'dxf' || extensao === 'dwg';
}

const FormularioArquivos: React.FC<FormularioArquivosProps> = ({
  onSubmitSuccess,
  onCancel,
  initialArquivo,
  onIniciarIA,
  onIAconcluida,
  onIAerro,
}) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [arquivoExistente, setArquivoExistente] = useState<ArquivoNormData | null>(
    initialArquivo || null,
  );
  const [removerArquivo, setRemoverArquivo] = useState(false);
  const [erroArquivo, setErroArquivo] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (initialArquivo) {
      setArquivoExistente(initialArquivo);
      setArquivo(null);
      setRemoverArquivo(false);
    }
  }, [initialArquivo]);

  const { id } = useParams();

  const handleDrop = (files: File[]) => {
    setErroArquivo(null);
    const arquivoSelecionado = files[0];
    if (extensaoValida(arquivoSelecionado)) {
      setArquivo(arquivoSelecionado);
      setArquivoExistente(null);
      setRemoverArquivo(false);
      return;
    }
    setErroArquivo('Arquivo inválido. Apenas arquivos no formato DXF e DWG são aceitos.');
  };

  const handleRemove = () => {
    if (arquivo) {
      setArquivo(null);
    } else if (arquivoExistente) {
      setRemoverArquivo(true);
      setArquivoExistente(null);
      setErroArquivo('O arquivo atual será removido ao salvar.');
    }
  };

  const handleSubmit = async () => {
    if (!arquivo && !arquivoExistente && !removerArquivo) {
      setErroArquivo('Selecione ao menos um arquivo DXF ou DWG antes de continuar.');
      return;
    }
    if (!id) {
      setErroArquivo('Projeto não cadastrado.');
      return;
    }

    setCarregando(true);
    try {
      const data = new FormData();
      if (arquivo) data.append('arquivo', arquivo);
      if (removerArquivo) data.append('remover_arquivo', 'true');
      data.append('projeto_id', id);

      const response = await api.post('projetos/upload-arquivo', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onSubmitSuccess(response.data);

      if (arquivo && !removerArquivo) {
        onIniciarIA?.();

        api
          .post('dados-ia/processar-ia', { projeto_id: id })
          .then(() => {
            onIAconcluida?.();
          })
          .catch((err) => {
            console.error(err);
            onIAerro?.();
          });
      }
    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Erro', message: 'Falha ao subir arquivo', color: 'red' });
    } finally {
      setCarregando(false);
    }
  };


  return (
    <Box>
      <Title fz="md">
        Arquivo CAD (DXF / DWG)
        <span style={{ color: 'red' }}>*</span>
      </Title>

      <Stack>
        <Dropzone
          onDrop={handleDrop}
          onReject={() =>
            setErroArquivo('Arquivo inválido. Apenas arquivos no formato DXF e DWG são aceitos.')
          }
          accept={MIME_DXF_DWG}
          multiple={false}
          loading={carregando}
          className={styles.dropContainer}
        >
          <div className={styles.arquivoContainer}>
            <CloudUpload className={styles.icone} size={20} strokeWidth={2.5} />
            <Text ta="center" fw="500" fz="md" mt="5px">
              Pesquise ou arraste seu arquivo DXF/DWG aqui
            </Text>
            <Text ta="center" fw="200" fz="sm">
              Clique ou arraste seu arquivo aqui
            </Text>
          </div>

          <Group grow>
            {arquivo || arquivoExistente ? (
              <Paper p="sm">
                <div className={styles.arquivoSelecionado}>
                  <div className={styles.listaArquivo}>
                    <FileText size={20} />
                    <Text fw="500" size="sm">
                      {arquivo ? arquivo.name : arquivoExistente?.nome}
                    </Text>
                  </div>
                  <div className={styles.iconeExcluir} onClick={handleRemove}>
                    <Trash size={18} color="#ff00009f" />
                  </div>
                </div>
              </Paper>
            ) : (
              <Paper p="sm">
                <div className={styles.arquivoSelecionado}>
                  <Group justify="space-between">
                    <div className={styles.listaArquivo}>
                      <FileText color="#adb5bd" size={20} />
                      <Text fw="500" color="#adb5bd" size="sm">
                        Nenhum arquivo selecionado
                      </Text>
                    </div>
                  </Group>
                </div>
              </Paper>
            )}
          </Group>

          {erroArquivo && (
            <Text color="red" size="sm" mt={5} ta="center">
              {erroArquivo}
            </Text>
          )}
        </Dropzone>

        <Group justify="flex-end" style={{ marginTop: '20px' }}>
          <Button variant="default" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: '#34623f' }}
            onClick={handleSubmit}
            disabled={!arquivo && !arquivoExistente}
            loading={carregando}
          >
            Salvar
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default FormularioArquivos;
