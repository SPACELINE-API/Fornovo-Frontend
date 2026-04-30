import React, { useState } from 'react';
import {
  Box,
  TextInput,
  Textarea,
  Group,
  Button,
  Text,
  SimpleGrid,
  Paper,
  Stack,
  ActionIcon,
  rem,
  NumberInput,
} from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { CloudUpload, FileText, Trash2 } from 'lucide-react';
import Styles from './formsCss/norms.module.css';
import api from '../../../Services/apiService';

export interface NormaFormData {
  id: number;
  codigo: string;
  nome: string;
  ano: number;
  serie?: string;
  descricao: string;
  arquivo: File | null;
  url_arquivo?: string | null;
}

const normaSchema = (isEdit: boolean) => z.object({
  codigo: z.string().min(1, 'O código da norma é obrigatório'),
  nome: z.string().min(1, 'O nome da norma é obrigatório'),
  ano: z
    .number({
      required_error: 'O ano de publicação é obrigatório',
      invalid_type_error: 'O ano de publicação deve ser um número',
    })
    .int()
    .min(1900, 'O ano de publicação deve ser maior ou igual a 1900')
    .max(2100, 'O ano de publicação deve ser menor ou igual a 2100'),
  serie: z.string().optional(),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  arquivo: isEdit
    ? z.any().optional().nullable()
    : z.any().refine((file) => file !== null, { message: 'Selecione um arquivo PDF' }),
  url_arquivo: z.string().optional().nullable(),
});

interface FormularioNormaProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
  initialData?: NormaFormData;
}

const FormularioNorma: React.FC<FormularioNormaProps> = ({
  onSubmitSuccess,
  onCancel,
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const [erroBackend, setErroBackend] = useState<string | null>(null);
  const [sucessoBackend, setSucessoBackend] = useState<string | null>(null);
  const [removerArquivo, setRemoverArquivo] = useState(false);

  const form = useForm({
    initialValues: {
      codigo: initialData?.codigo || '',
      nome: initialData?.nome || '',
      ano: initialData?.ano || undefined,
      serie: initialData?.serie || '',
      descricao: initialData?.descricao || '',
      arquivo: initialData?.arquivo || (null as File | null),
      url_arquivo: initialData?.url_arquivo || null,
    },
    validate: zodResolver(normaSchema(!!initialData)),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setErroBackend(null);
    setSucessoBackend(null);
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('codigo', values.codigo);
      formData.append('nome', values.nome);
      formData.append('ano', String(values.ano));

      if (values.serie) {
        formData.append('serie', values.serie);
      }

      formData.append('descricao', values.descricao);

      if (values.arquivo) {
        formData.append('arquivo_pdf', values.arquivo);
      }

      if (removerArquivo) {
        formData.append('remover_arquivo', 'true');
      }

      let response;

      if (initialData) {
        
        response = await api.patch(`/normas/editarDetalhes/${initialData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        notifications.show({
          title: 'Norma atualizada!',
          message: response.data.mensagem,
          color: 'teal',
          position: 'bottom-left',
        });
      } else {
        response = await api.post('/normas/cadastrar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        notifications.show({
          title: 'Norma cadastrada!',
          message: response.data.mensagem,
          color: 'teal',
          position: 'bottom-left',
        });

        response = await api.post('/dados-ia/inserir-norma', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }

      setSucessoBackend(response.data.mensagem);

      setTimeout(() => {
        onSubmitSuccess();
      }, 2000);
    } catch (error: any) {
      const mensagem = error?.response?.data?.erro || 'Erro ao salvar norma';

      setErroBackend(mensagem);

      notifications.show({
        title: 'Erro',
        message: mensagem,
        color: 'red',
        position: 'bottom-left',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate p="sm">
      <Stack gap="lg">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label="Código da Norma"
            placeholder="Ex: NBR 12345"
            required
            size="md"
            {...form.getInputProps('codigo')}
          />
          <TextInput
            label="Nome da Norma"
            placeholder="Ex: Qualificação de pintores"
            required
            size="md"
            {...form.getInputProps('nome')}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label="Série (opcional)"
            placeholder="Ex: Revisão 2024"
            size="md"
            {...form.getInputProps('serie')}
          />

          <Box style={{ maxWidth: rem(250) }}>
            <Text size="sm" fw={500} mb={4}>
              Ano de Publicação <span style={{ color: 'red' }}>*</span>
            </Text>

            <NumberInput
              size="md"
              min={1900}
              max={2100}
              allowDecimal={false}
              hideControls
              placeholder="Ex: 2024"
              {...form.getInputProps('ano')}
            />
          </Box>
        </SimpleGrid>

        <Textarea
          label="Descrição"
          placeholder="Descreva resumidamente os pontos principais desta norma..."
          required
          minRows={3}
          size="md"
          autosize
          {...form.getInputProps('descricao')}
        />

        <Box>
          <Text size="sm" fw={500} mb={8}>
            Documento da Norma (PDF) <span style={{ color: 'red' }}>*</span>
          </Text>

          <Paper withBorder p="md" radius="md" className={Styles.formCard}>
            <Dropzone
              onDrop={(files) => {
                form.setFieldValue('arquivo', files[0]);
                setRemoverArquivo(false);
              }}
              onReject={() =>
                notifications.show({
                  title: 'Erro',
                  message: 'Apenas PDFs são aceitos',
                  color: 'red',
                })
              }
              maxFiles={1}
              accept={PDF_MIME_TYPE}
              className={Styles.dropzoneRoot}
            >
              <div className={Styles.uploadIconCircle}>
                <CloudUpload size={30} strokeWidth={2.5} />
              </div>
              <Text size="md" fw={600} c="dark.4" ta="center">
                Arquivos PDF apenas
              </Text>
              <Text size="xs" c="dimmed" ta="center">
                Clique ou arraste seu arquivo aqui
              </Text>
            </Dropzone>

            <div className={Styles.fileListContainer}>
              <Group gap="sm">
                <FileText size={20} color={form.values.arquivo ? '#34623F' : '#adb5bd'} />
                <Text size="sm" fw={500} c={form.values.arquivo ? 'dark.7' : 'dimmed'}>
                  {form.values.arquivo
                    ? form.values.arquivo.name
                    : !removerArquivo && form.values.url_arquivo
                      ? form.values.url_arquivo.split('/').pop()
                      : 'Nenhum arquivo selecionado'}
                </Text>
                {form.values.arquivo && (
                  <Text size="xs" c="dimmed">
                    ({(form.values.arquivo.size / 1024).toFixed(1)} KB)
                  </Text>
                )}
              </Group>

              {(form.values.arquivo || (!removerArquivo && form.values.url_arquivo)) && (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => {
                    if (form.values.arquivo) {
                      form.setFieldValue('arquivo', null);
                    } else {
                      setRemoverArquivo(true);
                    }
                  }}
                >
                  <Trash2 size={18} color="#ff00009f" />
                </ActionIcon>
              )}
            </div>
          </Paper>

          {form.errors.arquivo && (
            <Text color="red" size="xs" mt={5}>
              {String(form.errors.arquivo)}
            </Text>
          )}
        </Box>

        <Group align="center" gap="md">
          <Box style={{ flex: 1, minHeight: 20 }}>
            {erroBackend && (
              <Text size="sm" c="red.7" fw={500}>
                {erroBackend}
              </Text>
            )}

            {sucessoBackend && (
              <Text size="sm" c="teal.7" fw={500}>
                {sucessoBackend}
              </Text>
            )}
          </Box>

          <Group gap="md">
            <Button variant="subtle" color="gray" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading} color="#34623F" size="md" px={40} radius="md">
              {initialData ? 'Salvar Alterações' : 'Salvar Norma'}
            </Button>
          </Group>
        </Group>
      </Stack>
    </Box>
  );
};

export default FormularioNorma;