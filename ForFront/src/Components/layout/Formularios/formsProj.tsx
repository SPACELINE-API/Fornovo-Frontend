import React, { useEffect } from 'react';
import {
  Box,
  Button,
  TextInput,
  Textarea,
  Group,
  Text,
  SimpleGrid,
  Select,
  Stepper,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Check } from 'lucide-react';
import type { ProjetoFormsData } from '../../../types/projeto';
import { projetoSchema } from '../../../schemas/projetoSchema';
import { useFuncionarios } from '../../../hooks/useFuncionarios';
import { useCep } from '../../../hooks/useCep';
import { useFormStepper } from '../../../hooks/useFormStepper';
import { useProjetoSubmit } from '../../../hooks/useProjetoSubmit';

interface FormularioProjetoProps {
  initialData?: ProjetoFormsData | null;
  onSubmitSuccess?: (msg: string) => void;
  onCancel?: () => void;
}

const STEP_FIELDS: (keyof ProjetoFormsData)[][] = [
  ['nome_projeto', 'cliente', 'descricao'],
  ['cep', 'cidade', 'estado', 'bairro'],
  ['engenheiro', 'data_inicio'],
];

const toDateStr = (value?: string | null) => (value ? String(value).split('T')[0] : '');

const FormularioProjeto: React.FC<FormularioProjetoProps> = ({
  initialData,
  onSubmitSuccess,
  onCancel,
}) => {
  const { funcionarios } = useFuncionarios();
  const { loadingCep, fetchCep, maskCEP } = useCep();
  const { loading, sucesso, handleSubmit } = useProjetoSubmit({
    initialData,
    onSubmitSuccess,
    onCancel,
  });

  const form = useForm<ProjetoFormsData>({
    initialValues: {
      id: initialData?.id || 0,
      nome_projeto: initialData?.nome_projeto || '',
      cliente: initialData?.cliente || '',
      descricao: initialData?.descricao || '',
      cep: initialData?.cep || '',
      cidade: initialData?.cidade || '',
      estado: initialData?.estado || '',
      bairro: initialData?.bairro || '',
      numero: initialData?.numero || undefined,
      engenheiro: initialData?.engenheiro || '',
      data_inicio: toDateStr(initialData?.data_inicio),
      data_fim: toDateStr(initialData?.data_fim),
      status: initialData?.status || 'Pendente',
    },
    validate: zodResolver(projetoSchema),
    validateInputOnBlur: false,
    validateInputOnChange: false,
  });

  useEffect(() => {
    if (!initialData) return;
    form.setValues({
      ...initialData,
      data_inicio: toDateStr(initialData.data_inicio),
      data_fim: toDateStr(initialData.data_fim),
    });
  }, [initialData]);

  const { active, setActive, handleNext, handleBack } = useFormStepper({
    form,
    stepFields: STEP_FIELDS,
    onComplete: handleSubmit,
  });

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const result = await fetchCep(e.target.value);
    if (!result) return;

    form.setFieldValue('cidade', result.cidade);
    form.setFieldValue('estado', result.estado);
    form.setFieldValue('bairro', result.bairro);
    form.clearFieldError('cidade');
    form.clearFieldError('estado');
    form.clearFieldError('bairro');
  };

  return (
    <Box p="sm">
      <Stepper
        active={active}
        onStepClick={setActive}
        color="#478d57"
        size="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Básico" description="O que é?">
          <SimpleGrid cols={1} verticalSpacing="sm" mt="md">
            <TextInput
              label="Nome do Projeto"
              placeholder="Ex: Reforma do Laboratório de Informática"
              required
              {...form.getInputProps('nome_projeto')}
            />
            <TextInput
              label="Cliente"
              placeholder="Ex: DCTA"
              required
              {...form.getInputProps('cliente')}
            />
            <Textarea
              label="Descrição"
              placeholder="Ex: Criação de prédio comercial"
              required
              minRows={3}
              {...form.getInputProps('descricao')}
            />
          </SimpleGrid>
        </Stepper.Step>

        <Stepper.Step label="Local" description="Onde é?">
          <SimpleGrid cols={1} mt="md">
            <TextInput
              label="CEP"
              required
              placeholder="00000-000"
              maxLength={9}
              rightSection={loadingCep ? <Box className="loader" /> : null}
              {...form.getInputProps('cep')}
              onBlur={(e) => {
                form.getInputProps('cep').onBlur?.(e);
                handleCepBlur(e);
              }}
              onChange={(e) => form.setFieldValue('cep', maskCEP(e.currentTarget.value))}
            />
            <TextInput
              label="Cidade"
              placeholder="Ex: São José dos Campos"
              required
              {...form.getInputProps('cidade')}
            />
            <TextInput
              label="Estado (UF)"
              placeholder="Ex: SP"
              maxLength={2}
              required
              onInput={(e) => (e.currentTarget.value = e.currentTarget.value.toUpperCase())}
              {...form.getInputProps('estado')}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} mt="sm">
            <TextInput
              label="Bairro"
              placeholder="Ex: Jardim Paulista"
              required
              {...form.getInputProps('bairro')}
            />
            <TextInput
              type="number"
              label="Número"
              placeholder="Ex: 1000"
              {...form.getInputProps('numero')}
            />
          </SimpleGrid>
        </Stepper.Step>

        <Stepper.Step label="Equipe" description="Quem e Quando?">
          <Box mt="md">
            <Select
              label="Responsáveis"
              data={funcionarios}
              required
              searchable
              clearable
              nothingFoundMessage="Nenhum funcionário encontrado"
              placeholder={form.values.engenheiro ? '' : 'Selecione'}
              comboboxProps={{ zIndex: 6000 }}
              styles={{ input: { display: 'flex', alignItems: 'center' } }}
              {...form.getInputProps('engenheiro')}
            />

            <Box style={{ maxWidth: rem(250) }} mt="sm">
              <Text size="sm" fw={500} mb={4}>
                Data de Início <span style={{ color: 'red' }}>*</span>
              </Text>
              <TextInput type="date" min="2000-01-01" {...form.getInputProps('data_inicio')} />
            </Box>

            <Box style={{ maxWidth: rem(250) }} mt="sm">
              <Text size="sm" fw={500} mb={4}>
                Data de Término
              </Text>
              <TextInput
                type="date"
                min={form.values.data_inicio || '2000-01-01'}
                disabled={!form.values.data_inicio}
                style={{ opacity: !form.values.data_inicio ? 0.5 : 1 }}
                {...form.getInputProps('data_fim')}
                onChange={(e) => form.setFieldValue('data_fim', e.target.value || '')}
              />
            </Box>

            <Box mt="sm">
              <Select
                label="Status do Projeto"
                data={['Pendente', 'Em andamento', 'Em revisão', 'Concluído']}
                comboboxProps={{ zIndex: 6000 }}
                {...form.getInputProps('status')}
              />
            </Box>
          </Box>
        </Stepper.Step>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {sucesso && (
          <Text
            color="teal"
            size="sm"
            fw={700}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            <Check size={16} /> Projeto salvo com sucesso!
          </Text>
        )}

        {active !== 0 && !sucesso && (
          <Button variant="subtle" color="gray" onClick={handleBack} disabled={loading}>
            Voltar
          </Button>
        )}

        {active < STEP_FIELDS.length - 1 ? (
          <Button type="button" onClick={handleNext} color="#34623F">
            Próximo
          </Button>
        ) : (
          <Button onClick={handleNext} color="#34623F" loading={loading} disabled={sucesso}>
            {sucesso ? 'Concluído' : 'Salvar Projeto'}
          </Button>
        )}
      </Group>
    </Box>
  );
};

export default FormularioProjeto;