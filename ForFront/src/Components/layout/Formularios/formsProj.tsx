  import React, { useState, useEffect } from "react";
  import { Box, Button, TextInput, Textarea, Group, Text, SimpleGrid, MultiSelect, Stepper } from "@mantine/core";
  import { useForm, zodResolver } from "@mantine/form";
  import { notifications } from "@mantine/notifications";
  import { Check } from "lucide-react";
  import { z } from "zod";
  import api from "../../../Services/apiService";

  export interface Projeto {
    id: number;
    nome_projeto: string;
    cliente: string;
    descricao: string;
    cidade: string;
    estado: string;
    bairro: string;
    numero?: string;
    responsavel: string[];
    data_inicio: string | null;
    data_fim?: string | null;
    status: "Pendente" | "Em Andamento" | "Em Revisão" |"Concluído";
  }

  const projetoSchema = z.object({
    nome_projeto: z.string().min(1, "Nome é obrigatório"),
    cliente: z.string().min(1, "Cliente é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(2, "UF inválida").max(2, "Use apenas a sigla"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    numero: z.string().optional(),
    responsavel: z.array(z.string()).min(1, "Selecione pelo menos um responsável"),
    data_inicio: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
      z.date({ message: "Data inválida" }).min(new Date("2000-01-01"), "Mínimo ano 2000")
    ),
    data_fim: z.date().nullable().optional(),
    status: z.enum(["Pendente", "Em Andamento", "Em Revisão", "Concluído"]).default("Pendente"),
  }).refine((data) => {
    if (data.data_fim && data.data_inicio) {
      return data.data_fim >= data.data_inicio;
    }
    return true;
  }, {
    message: "A data de término não pode ser anterior à data de início",
    path: ["data_fim"],
  });

  interface FormularioProjetoProps {
    initialData?: Projeto | null;
    onSubmitSuccess?: (msg: string) => void;
    onCancel?: () => void;
  }

  const FormularioProjeto: React.FC<FormularioProjetoProps> = ({ initialData, onSubmitSuccess, onCancel }) => {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [opcoesFuncionarios, setOpcoesFuncionarios] = useState<{ value: string; label: string }[]>([]);

    const form = useForm({
      initialValues: {
        nome_projeto: initialData?.nome_projeto || "", 
        cliente: initialData?.cliente || "", 
        descricao: initialData?.descricao || "",
        cidade: initialData?.cidade || "", 
        estado: initialData?.estado || "",
        bairro: initialData?.bairro || "", 
        numero: initialData?.numero || "",
        responsavel: [], 
        data_inicio: null as any,
        data_fim: null as any,
        status: initialData?.status || "Pendente" as const,
      },
      validate: zodResolver(projetoSchema),
      validateInputOnBlur: true,
      validateInputOnChange: false,
    });

    useEffect(() => {
      let funcs = JSON.parse(localStorage.getItem("@Fornovo:funcionarios") || "[]");
      if (funcs.length === 0) {
        funcs = [
          { id: "1", nome: "Gabriel Silva" }, 
          { id: "2", nome: "João Oliveira" },
          { id: "3", nome: "Maria Santos" },
          { id: "4", nome: "Ana Costa" },
          { id: "5", nome: "Carlos Pereira" },
        ];
        localStorage.setItem("@Fornovo:funcionarios", JSON.stringify(funcs));
      }
      setOpcoesFuncionarios(funcs.map((f: any) => ({ value: f.nome, label: f.nome })));
    }, []);

    const handleNextStep = () => {
      const camposPasso0 = ['nome_projeto', 'cliente', 'descricao'];
      const camposPasso1 = ['cidade', 'estado', 'bairro'];
      const camposPasso2 = ['responsavel', 'data_inicio'];

      if (active === 0) {
        const temErro = camposPasso0.some((campo) => form.validateField(campo).hasError);
        if (!temErro) {
          camposPasso1.forEach(campo => form.clearFieldError(campo));
          setActive(1);
        }
      } else if (active === 1) {
        const temErro = camposPasso1.some((campo) => form.validateField(campo).hasError);
        if (!temErro) {
          camposPasso2.forEach(campo => form.clearFieldError(campo));
          setActive(2);
        }
      } else if (active === 2) {
        const temErro = camposPasso2.some((campo) => form.validateField(campo).hasError);
        if (!temErro) {
          form.onSubmit(handleSubmit)();
        }
      }
    };



    const handleSubmit = async (values: typeof form.values) => {
      setLoading(true);
      try {
        const enderecoCompleto = `${values.bairro}, ${values.cidade} - ${values.estado}${values.numero ? ', ' + values.numero : ''}`;

        const payload = {
          ...values,
          localizacao: enderecoCompleto,
          data_inicio: values.data_inicio instanceof Date 
            ? values.data_inicio.toISOString().split("T")[0] 
            : null,
        data_fim: values.data_fim instanceof Date
            ? values.data_fim.toISOString().split("T")[0]
            : null,
          
        };
        const response = await api.post('projetos/cadastrarProjeto', payload);

        if (response.status === 201 || response.status === 200) {
          setSucesso(true);
          notifications.show({
            title: 'Sucesso!',
            message: 'Projeto salvo no banco de dados.',
            color: 'green',
            position: 'bottom-left',
          });
          if (onSubmitSuccess) {
            setTimeout(() => {
              onSubmitSuccess("OK");
            }, 1000);
          }
        }
      } catch (error: any) {
        notifications.show({
          title: 'Erro ao salvar',
          message: error.response?.data?.erro || 'Verifique os dados e tente novamente.',
          color: 'red',
          position: 'bottom-left',
          autoClose: 3000,
        });

        setTimeout(() => {
          if (onCancel) onCancel(); 
        }, 1000);

      } finally {
        setLoading(false);
      }
    };

    return (
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate p="sm">
        <Stepper active={active} onStepClick={setActive} color="#478d57" size="sm" allowNextStepsSelect={false}>
          <Stepper.Step label="Básico" description="O que é?">
            <SimpleGrid cols={1} verticalSpacing="sm" mt="md">
              <TextInput
                label="Nome do Projeto" 
                placeholder="Ex: Reforma do Laboratório de Informática"
                required
                {...form.getInputProps("nome_projeto")}  
              />
              <TextInput 
                label="Cliente" 
                placeholder="Ex: DCTA"
                required
                {...form.getInputProps("cliente")}
              />
              <Textarea 
                label="Descrição" 
                placeholder="Ex: Criação de prédio comercial"
                required 
                minRows={3}
                {...form.getInputProps("descricao")}  
              />
            </SimpleGrid>
          </Stepper.Step>

          <Stepper.Step label="Local" description="Onde é?">
            <SimpleGrid cols={2} mt="md">
              <TextInput 
                label="Cidade" 
                placeholder="Ex: São José dos Campos"
                required
                {...form.getInputProps("cidade")}  
              />
              <TextInput 
                label="Estado (UF)" 
                placeholder="Ex: SP"
                maxLength={2} 
                required
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.toUpperCase())}
                {...form.getInputProps("estado")}  
              />
            </SimpleGrid>
            <SimpleGrid cols={2} mt="sm">
              <TextInput 
                label="Bairro" 
                placeholder="Ex: Jardim Paulista" 
                required
                {...form.getInputProps("bairro")}  
              />
              <TextInput 
                label="Número" 
                placeholder="Ex: 1000"
                {...form.getInputProps("numero")}  
              />
            </SimpleGrid>
          </Stepper.Step>

          <Stepper.Step label="Equipe" description="Quem e Quando?">
            <Box mt="md">
              <MultiSelect 
                label="Responsáveis" 
                data={opcoesFuncionarios} 
                required 
                searchable 
                clearable
                nothingFoundMessage="Nenhum funcionário encontrado"
                placeholder={form.values.responsavel.length > 0 ? "" : "Selecione"}
                {...form.getInputProps("responsavel")} 
                comboboxProps={{ zIndex: 6000 }}
                styles={{
                  input: { display: 'flex', alignItems: 'center' }
                }}
              />
              <Box mt="sm">
                <Text size="sm" fw={500} mb={4} >Data de Início <span style={{color: 'red'}}>*</span></Text>
                <input 
                  type="date" 
                  min="2000-01-01" 
                  onChange={(e) => form.setFieldValue("data_inicio", e.target.value ? new Date(e.target.value + "T00:00:00") : (null as any))}
                />
                {form.errors.data_inicio && <Text color="red" size="xs" mt={4}>{String(form.errors.data_inicio)}</Text>}
              </Box>

              <Box mt='sm'> 
                <Text size="sm" fw={500} mb={4}>Data de Término</Text>
                <input 
                  type="date"
                  min={
                    form.values.data_inicio instanceof Date 
                      ? form.values.data_inicio.toISOString().split('T')[0] 
                      : "2000-01-01"
                  }
                  onChange={(e) => form.setFieldValue("data_fim", e.target.value ? new Date(e.target.value + "T00:00:00") : (null as any))}
                  disabled={!form.values.data_inicio}
                  style={{ opacity: !form.values.data_inicio ? 0.5 : 1 }}
                />
                {form.errors.data_fim && <Text color="red" size="xs" mt={4}>{String(form.errors.data_fim)}</Text>}
              </Box>

              <Box>
                <Text size="sm" fw={500} mt="md">Status do Projeto</Text>
                <select 
                  onChange={(e) => form.setFieldValue("status", e.target.value as any)}
                  value={form.values.status}
                  style={{ marginTop: 4, padding: 8, borderRadius: 4, borderColor: "#ccc", width: "100%" }}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Em Revisão">Em Revisão</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </Box>
            </Box>
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {sucesso && (
            <Text color="teal" size="sm" fw={700} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Check size={16} /> Projeto salvo com sucesso!
            </Text>
          )}

          {active !== 0 && !sucesso && (
            <Button variant="subtle" color="gray" onClick={() => setActive((current) => current - 1)} disabled={loading}>
              Voltar
            </Button>
          )}
          
          {active < 2 ? (
            <Button type="button" onClick={handleNextStep} color="#34623F">Próximo</Button>
          ) : (
            <Button type="submit" color="#34623F" loading={loading} disabled={sucesso}>
              {sucesso ? "Concluído" : "Salvar Projeto"}
            </Button>
          )}
        </Group>
      </Box>
    );
  };

  export default FormularioProjeto;