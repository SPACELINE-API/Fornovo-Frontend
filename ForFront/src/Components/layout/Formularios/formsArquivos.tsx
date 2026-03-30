import React, { useState } from 'react';
import { Box, Group, Button, Text, Paper, Stack, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { CloudUpload, FileText, Trash } from 'lucide-react';
import styles from './formsCss/formsArq.module.css';
import api from '../../../Services/apiService';
import { useParams } from 'react-router-dom';

export interface Arquivo {
    nome: string;
    caminho: string;
    tipo: string;
    hash: string;
    projeto_id: string;
}

interface FormularioArquivosProps {
    onSubmitSuccess: (arquivo: Arquivo) => void;
    onCancel: () => void;
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

const FormularioArquivos: React.FC<FormularioArquivosProps> = ({ onSubmitSuccess, onCancel }) => {
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [erroArquivo, setErroArquivo] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const { id } = useParams();

    const handleDrop = (arquivo: File[]) => {
        setErroArquivo(null);

        const arquivoSelecionado = arquivo[0];

        if (extensaoValida(arquivoSelecionado)) {
            setArquivo(arquivoSelecionado);
            return;
        }

        setErroArquivo("Arquivo inválido. Apenas arquivos no formato DXF e DWG são aceitos.")
    };

    const handleRemove = () => {
        setArquivo(null);
        setErroArquivo(null);
    };

    const handleSubmit = async () => {
        if (!arquivo) {
            setErroArquivo('Selecione ao menos um arquivo DXF ou DWG antes de continuar.');
            return;
        }

        if (!id) {
            setErroArquivo('Projeto não cadastrado.');
            return;
        }

        setCarregando(true);
        try {
            const formData = new FormData();

            formData.append('arquivo', arquivo as File);
            formData.append('projeto_id', id);

            const response = await api.post('projetos/upload-arquivo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: (data) => data
            });

            notifications.show({
                title: 'Arquivo enviado!',
                message: 'Arquivo enviado com sucesso.',
            });

            onSubmitSuccess(response.data);
        } catch (err) {
            notifications.show({
                title: 'Erro ao processar arquivo',
                message: 'Não foi possível processar o arquivo.',
                color: 'red',
            });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Box>
            <Title fz="md">
                Arquivo CAD (DXF / DWG)
                <span color='red'>*</span>
            </Title>
            <Stack>
                <Dropzone
                    onDrop={handleDrop}
                    onReject={() => setErroArquivo('Arquivo inválido. Apenas arquivos no formato DXF e DWG são aceitos.')}
                    accept={MIME_DXF_DWG}
                    multiple={false}
                    loading={carregando}
                    className={styles.dropContainer}
                >
                    <div className={styles.arquivoContainer}>
                        <CloudUpload className={styles.icone} size={20} strokeWidth={2.5} />
                        <Text ta="center" fw="500" fz="md" mt="5px">Pesquise ou arraste seu arquivo DXF/DWG aqui</Text>
                        <Text ta="center" fw="200" fz="sm">Clique ou arraste seu arquivo aqui</Text>
                    </div>

                    <Group grow>
                        {arquivo ? (
                            <Paper p="sm">
                                <div className={styles.arquivoSelecionado}>
                                    <div className={styles.listaArquivo}>
                                        <FileText size={20} />
                                        <Text fw="500" size="sm">{arquivo.name}</Text>
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
                                            <Text fw="500" color="#adb5bd" size="sm" >Nenhum arquivo selecionado</Text>
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
                        style={{
                            backgroundColor: "#34623f"
                        }}
                        onClick={handleSubmit}
                        disabled={!arquivo}
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