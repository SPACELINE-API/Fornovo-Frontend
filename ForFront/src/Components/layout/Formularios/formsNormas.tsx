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
} from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { CloudUpload, FileText, Trash2, Check } from 'lucide-react';
import Styles from './formsCss/norms.module.css'

export interface Norma {
  id: number;
  nome: string;
  data_publicacao: string;
  serie?: string;
  descricao: string;
  arquivo: File | null;
}

const normaSchema = z.object({
  nome: z.string().min(1, 'O nome da norma é obrigatório'),
  data_publicacao: z.string().min(1, 'A data é obrigatória'),
  serie: z.string().optional(),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  arquivo: z.any().refine((file) => file !== null, { message: 'Selecione um arquivo PDF' }),
});

interface FormularioNormaProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
  initialData?: Norma;
}

const FormularioNorma: React.FC<FormularioNormaProps> = ({ onSubmitSuccess, onCancel, initialData }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      nome: initialData?.nome || '',
      data_publicacao: initialData?.data_publicacao || '',
      serie: initialData?.serie || '',
      descricao: initialData?.descricao || '',
      arquivo: initialData?.arquivo || null as File | null,
    },
    validate: zodResolver(normaSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Dados prontos para o Backend:', values);
      notifications.show({
        title: 'Norma Salva!',
        message: `${values.nome} foi cadastrada com sucesso.`,
        color: 'teal',
        icon: <Check size={18} />,
      });
      setLoading(false);
      onSubmitSuccess();
    }, 1500);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate p="sm">
      <Stack gap="lg">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput
            label="Nome da Norma"
            placeholder="Ex: NBR 5410"
            required
            size="md"
            {...form.getInputProps('nome')}
          />
          <TextInput
            label="Série (opcional)"
            placeholder="Ex: Revisão 2024"
            size="md"
            {...form.getInputProps('serie')}
          />
        </SimpleGrid>

        <Box style={{ maxWidth: rem(250) }}>
          <Text size="sm" fw={500} mb={4}>
            Data de Publicação <span style={{ color: 'red' }}>*</span>
          </Text>
          <TextInput type="date" size="md" {...form.getInputProps('data_publicacao')} />
        </Box>

        <Textarea
          label="Descrição"
          placeholder="Descreva resumidamente os pontos principais desta norma..."
          required
          minRows={3}
          size="md"
          {...form.getInputProps('descricao')}
        />
        <Box>
          <Text size="sm" fw={500} mb={8}>
            Documento da Norma (PDF) <span style={{ color: 'red' }}>*</span>
          </Text>

          <Paper withBorder p="md" radius="md" className={Styles.formCard}>
            <Dropzone
              onDrop={(files) => form.setFieldValue('arquivo', files[0])}
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
              <Text size="xs" c="dimmed">
                Clique ou arraste seu arquivo aqui
              </Text>
            </Dropzone>

            <div className={Styles.fileListContainer}>
              <Group gap="sm">
                <FileText size={20} color={form.values.arquivo ? '#34623F' : '#adb5bd'} />
                <Text size="sm" fw={500} c={form.values.arquivo ? 'dark.7' : 'dimmed'}>
                  {form.values.arquivo ? form.values.arquivo.name : 'Nenhum arquivo selecionado'}
                </Text>
                {form.values.arquivo && (
                  <Text size="xs" c="dimmed">
                    ({(form.values.arquivo.size / 1024).toFixed(1)} KB)
                  </Text>
                )}
              </Group>

              {form.values.arquivo && (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => form.setFieldValue('arquivo', null)}
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

        <Group justify="flex-end" gap="md">
          <Button variant="subtle" color="gray" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} color="#34623F" size="md" px={40} radius="md">
            Salvar Norma
          </Button>
        </Group>
      </Stack>
    </Box>
  );
};

export default FormularioNorma;
