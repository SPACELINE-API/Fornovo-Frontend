import React, { useState } from 'react';
import { Box, Group, Button, Text, Paper, Stack, ActionIcon, Badge, Title } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { CloudUpload } from 'lucide-react';
import styles from './formsCss/formsArq.module.css';

export interface Arquivo {
    nome: string;
    caminho: string;
    tipo: string;
    hash: string;
}

interface FormularioArquivosProps {
    onSubmitSuccess: (dados: Arquivo[]) => void;
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

async function calcularHash(arquivo: File): Promise<string> {
    const buffer = await arquivo.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function extensaoValida(file: File): boolean {
    const extensao = file.name.split('.').pop()?.toLowerCase();
    return extensao === 'dxf' || extensao === 'dwg';
}

const FormularioArquivos: React.FC<FormularioArquivosProps> = ({ onSubmitSuccess, onCancel }) => {
    const [arquivos, setArquivos] = useState<File[]>([]);
    const [erroArquivo, setErroArquivo] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const handleDrop = (files: File[]) => {
        setErroArquivo(null);

        const validos = files.filter(extensaoValida);

        setArquivos(prev => [...prev, ...validos]);
    };

    const handleRemover = (index: number) => {
        setArquivos(prev => prev.filter((_, i) => i !== index));
        setErroArquivo(null);
    };

    const handleSubmit = async () => {
        if (arquivos.length === 0) {
            setErroArquivo('Selecione ao menos um arquivo DXF ou DWG antes de continuar.');
            return;
        }

        setCarregando(true);
        try {
            const resultados: Arquivo[] = await Promise.all(
                arquivos.map(async (arquivo) => {
                    const hash = await calcularHash(arquivo);
                    return {
                        nome: arquivo.name,
                        caminho: arquivo.webkitRelativePath || arquivo.name,
                        tipo: arquivo.type || `.${arquivo.name.split('.').pop()}`,
                        hash,
                    };
                })
            );

            notifications.show({
                title: 'Arquivos enviados!',
                message: `${resultados.length} arquivo(s) enviado(s) com sucesso.`,
            });

            onSubmitSuccess(resultados);
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
            <Title style={{ fontSize: '0.9rem' }}>
                Arquivo CAD (DXF / DWG)
                <span style={{ color: 'red' }}>*</span>
            </Title>
            <Stack>
                <Dropzone
                    onDrop={handleDrop}
                    onReject={() => setErroArquivo('Arquivo não aceito. Use .dxf ou .dwg.')}
                    accept={MIME_DXF_DWG}
                    multiple={true}
                    loading={carregando}
                    className={styles.dropContainer}
                >
                    <div className={styles.arquivoContainer}>
                        <CloudUpload className={styles.icone} size={20} strokeWidth={2.5} />
                        <Text ta="center" style={{ marginTop: '5px', fontWeight: '500', fontSize: '1rem' }}>Pesquise ou arraste seus arquivos DXF/DWG aqui</Text>
                        <Text ta="center" style={{ fontWeight: '200', fontSize: '0.8rem' }}>Clique ou arraste seu arquivo aqui</Text>
                    </div>
                </Dropzone>

                <Group justify="flex-end" style={ { marginTop: '20px'} }>
                    <Button variant="default" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={arquivos.length === 0}
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