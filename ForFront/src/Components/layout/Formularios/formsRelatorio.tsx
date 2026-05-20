import { Box, Stack, Text, Title, Group, Paper, Button } from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import { CloudUpload, FileText, Trash } from "lucide-react";
import styles from './formsCss/formsArq.module.css';
import { useState } from "react";
import api from "../../../Services/apiService";
import { useParams } from "react-router-dom";

interface FormsRelatorioProps {
    onClose: () => void;
    onSuccess?: () => void;
}

function FormsRelatorio({ onClose, onSuccess }: FormsRelatorioProps) {

    const { id } = useParams();
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erroArquivo, setErroArquivo] = useState<string | false>(false);

    const handleDrop = (arquivos: File[]) => {
        const arquivo = arquivos[0];
        if (!arquivo) return;

        if (arquivo.type !== 'application/pdf') {
            setErroArquivo('Apenas arquivos PDF são permitidos.');
            return;
        }
        setArquivo(arquivo);
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setArquivo(null);
        setErroArquivo(false);
    }

    const handleSubmit = async () => {
        if (!arquivo || !id) return;

        setCarregando(true);
        try {
            const formData = new FormData();
            formData.append('projeto_id', id);
            formData.append('arquivo', arquivo);

            await api.post(`dados-ia/historico-relatorio`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            onSuccess?.();
            onClose();
        }
        catch (error) {
            console.log(error);
            setErroArquivo("Erro ao enviar o arquivo.")
        }
        finally {
            setCarregando(false);
        }
    }

    return (
        <Box>
            <Title fz="md">Arquivo PDF
                <span style={{ color: "red" }}>*</span>
            </Title>

            <Stack>
                <Dropzone
                    onDrop={handleDrop}
                    className={styles.dropContainer}
                    accept={PDF_MIME_TYPE}
                    multiple={false}
                    loading={carregando}
                >
                    <div className={styles.arquivoContainer}>
                        <CloudUpload className={styles.icone} size={20} strokeWidth={2.5} />
                        <Text ta="center" fw="500" fz="md" mt="5px">
                            Pesquise ou arraste seu arquivo PDF
                        </Text>
                        <Text ta="center" fw="200" fz="sm">
                            Clique ou arraste seu arquivo aqui
                        </Text>
                    </div>

                    <Group grow>
                        {arquivo ? (
                            <Paper p="sm">
                                <div className={styles.arquivoSelecionado}>
                                    <div className={styles.listaArquivo}>
                                        <FileText size={20} />
                                        <Text fw="500" size="sm">
                                            {arquivo.name}
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
                    <Button variant="default" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        style={{ backgroundColor: '#34623f' }}
                        onClick={handleSubmit}
                        disabled={!arquivo}
                        loading={carregando}
                    >
                        Salvar
                    </Button>
                </Group>
            </Stack>
        </Box >
    )
}

export default FormsRelatorio;