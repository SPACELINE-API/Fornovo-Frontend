import React, { useState, useEffect} from "react";
import { Box, Button, TextInput, Group, Stepper, Text, ActionIcon, NumberInput, Table} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { ambienteSchema } from "../../../schemas/levCampoSchema";
import { notifications } from "@mantine/notifications";
import api from "../../../Services/apiService";
import { useParams } from "react-router-dom";
import type { Ambiente } from "../../../types/levCampo.ts";

interface FormularioAmbienteProps {
  initialData?: Ambiente | null;
  onSubmitSuccess?: (msg: string) => void;
  onCancel?: () => void;
}
const FormularioLevCampo: React.FC<FormularioAmbienteProps> =  ({ initialData, onSubmitSuccess, onCancel }) => {
  const { id } = useParams()
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
 const ambienteValues = (data?: Ambiente | null) => ({
  nome: data?.nome || "",
  comprimento: data?.comprimento ?? "",
  largura: data?.largura ?? "",
  altura: data?.altura ?? "",
  tomadas: data?.tomadas ?? "",
  iluminacao: data?.iluminacao ?? "",
  interruptores: data?.interruptores ?? "",
  cabos: data?.cabos ?? [{ circuito: "", secao: "" }],
  disjuntores: data?.disjuntores ?? [{ amperagem: "", quantidade: "" }],
  tipoTomada: data?.tipoTomada ?? "",
  tipoInterruptor: data?.tipoInterruptor ?? "",
  tipoLuminaria: data?.tipoLuminaria ?? "",
  alturaInstalacao: data?.alturaInstalacao ?? "",
  ramais: data?.ramais ?? [{ nome: "", diametro: "", comprimento: "" }],
  registros: data?.registros ?? "",
  valvulas: data?.valvulas ?? "",
  conexoes: data?.conexoes ?? "",
  reservatorio: data?.reservatorio ?? { tipo: "", capacidade: "" },
  hastesAterramento: data?.hastesAterramento ?? "",
  caixasInspecao: data?.caixasInspecao ?? "",
  terminaisAereos: data?.terminaisAereos ?? "",
  quadrosRede: data?.quadrosRede ?? "",
  patchCords: data?.patchCords ?? "",
  cameras: data?.cameras ?? "",
  cabeamentos: data?.cabeamentos ?? [{ circuito: "", comprimento: "", tomadas: "" }],
  extintores: data?.extintores ?? [{ tipo: "", peso: "", capacidade: "" }],
  dutos: data?.dutos ?? [{ diametro: "", comprimento: "" }],
  hidrantes: data?.hidrantes ?? [{ localizacao: "", diametro: "", conexoes: "" }],
  tipoEstrutura: data?.tipoEstrutura ?? "",
  tipoTelhamento: data?.tipoTelhamento ?? "",
  espessura: data?.espessura ?? "",
  inclinacao: data?.inclinacao ?? "",
  pecas: data?.pecas ?? [{ descricao: "", secao: "" }],
  conteineres: data?.conteineres ?? "",
  banheirosQuimicos: data?.banheirosQuimicos ?? "",
  andaimes: data?.andaimes ?? "",
  residuoComum: data?.residuoComum ?? "",
  residuoContaminado: data?.residuoContaminado ?? "",
  destinacaoResiduo: data?.destinacaoResiduo ?? "",
  profundidadeEscavacao: data?.profundidadeEscavacao ?? "",
  inclinacaoTerreno: data?.inclinacaoTerreno ?? "",
  volumes: data?.volumes ?? { terraplanagem: "", escavacao: "", aterro: "", enrocamento: "", contencao: "", taludamento: "", nivelamento: "", compactacao: "" },
  fundacoes: data?.fundacoes ?? [{ tipo: "", profundidade: "", volumeLastro: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "" }],
  superestrutura: data?.superestrutura ?? [{ tipo: "", largura: "", altura: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "", janelaLancamento: "" }],
  metalicas: data?.metalicas ?? [{ tipo: "", tipoPerfil: "", secao: "", peso: "", elastomero: "" }],
  madeira: data?.madeira ?? [{ tipoPeca: "", secao: "", pesoTotal: "", tipoTelhamento: "" }],
});
const form = useForm({
  initialValues: { ambientes: [ambienteValues(initialData)] },
  validate: zodResolver(ambienteSchema),
});

useEffect(() => {
  form.setValues({ ambientes: [ambienteValues(initialData)] });
}, [initialData]);

 const fieldsByStep: Record<number, string[]> = {
  0: ["nome", "comprimento", "largura", "altura"],
  1: ["tomadas", "iluminacao", "interruptores", "cabos", "disjuntores", "tipoTomada", "tipoInterruptor", "tipoLuminaria", "alturaInstalacao", "hastesAterramento", "caixasInspecao", "terminaisAereos", "quadrosRede", "patchCords", "cameras", "cabeamentos"],
  2: ["ramais", "registros", "valvulas", "conexoes", "reservatorio", "extintores", "hidrantes", "dutos", "tipoTelhamento", "tipoEstrutura", "espessura", "inclinacao", "pecas"],
  3: ["conteineres", "banheirosQuimicos", "andaimes", "residuoComum", "residuoContaminado", "destinacaoResiduo", "profundidadeEscavacao", "inclinacaoTerreno", "volumes"],
  4: ["fundacoes", "superestrutura", "metalicas", "madeira"],
  5:[]
};

const handleNextStep = () => {
  const fields = fieldsByStep[active];
  const result = form.validate();
  const stepHasErrors = Object.keys(result.errors).some((errorKey) =>
    fields.some((field) =>
      errorKey === `ambientes.0.${field}` ||
      errorKey.startsWith(`ambientes.0.${field}.`) ||
      errorKey.startsWith(`ambientes.0.${field}[`)
    )
  );
  if (!stepHasErrors) {
    form.clearErrors();
    setActive((current) => current + 1);
    const modal = document.querySelector(".mantine-Modal-body");
    if (modal) modal.scrollTop = 0;
  } else {
    const firstErrorField = document.querySelector(
      ".mantine-InputWrapper-error"
    );
    firstErrorField?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const handleSubmit = async (values: typeof form.values) => {
  setLoading(true);
  try {
    const isEdicao = !!initialData?.id;
    const response = isEdicao
      ? await api.patch(`calculos/form-levantamento/${id}`, {
          ...values.ambientes[0],
          ambiente_id: initialData!.id,
        })
      : await api.post('calculos/form-levantamento', {
          ...values,
          projeto_id: id,
        });

    if (response.status === 200 || response.status === 201) {
      setSucesso(true);
      notifications.show({
        title: 'Sucesso!',
        message: isEdicao ? 'Ambiente atualizado' : 'Formulário salvo',
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
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
    <Stepper active={active} allowNextStepsSelect={false} color="#478d57" iconSize={30}>
      <Stepper.Step label="Ambiente">
        <Group mt="sm" grow maw={900}>
          <TextInput label="Nome do Ambiente" withAsterisk placeholder="Ex: Cantina, Laboratório, Sala" {...form.getInputProps(`ambientes.${currentIndex}.nome`)} />
          <NumberInput label="Comprimento" withAsterisk placeholder="Ex: 10.5" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.comprimento`)} />
          <NumberInput label="Largura" withAsterisk placeholder="Ex: 8.0" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.largura`)} />
          <NumberInput label="Altura" withAsterisk placeholder="Ex: 3.0" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.altura`)} />
        </Group>
    </Stepper.Step>
   <Stepper.Step label="Elétrica">
    <Text fw={700} mt="md">Pontos Elétricos</Text>
    <Group grow mt="sm" maw={700}>
      <NumberInput label="Tomadas (TUG)" withAsterisk placeholder="Qtd. de tomadas" {...form.getInputProps(`ambientes.${currentIndex}.tomadas`)} />
      <NumberInput label="Pontos de Iluminação" withAsterisk placeholder="Qtd. de pontos" {...form.getInputProps(`ambientes.${currentIndex}.iluminacao`)} />
      <NumberInput label="Interruptores" withAsterisk placeholder="Qtd. de interruptores" {...form.getInputProps(`ambientes.${currentIndex}.interruptores`)} />
    </Group>
  <Group align="flex-start" mt="md">
    <Box style={{ flex: 1 }}>
      <Text fw={700}>Cabos por Circuito</Text>
      {form.values.ambientes[currentIndex].cabos.map((_, index) => (
        <Box key={index} mt="sm">
          <Group align="flex-end">
            <TextInput style={{ flex: 1 }} withAsterisk placeholder="Ex: C1" label="Circuito" {...form.getInputProps(`ambientes.${currentIndex}.cabos.${index}.circuito`)} />
            <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 1.5" label="Seção (mm²)" {...form.getInputProps(`ambientes.${currentIndex}.cabos.${index}.secao`)} />
            <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.cabos`, index)}>
            <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Box>
      ))}
      <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
        onClick={() => form.insertListItem(`ambientes.${currentIndex}.cabos`, { circuito: "", secao: "" })}>
        Adicionar circuito
      </Button>
    </Box>
    <Box style={{ flex: 1 }}>
      <Text fw={700}>Disjuntores</Text>
      {form.values.ambientes[currentIndex].disjuntores.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end">
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 20" label="Amperagem (A)" {...form.getInputProps(`ambientes.${currentIndex}.disjuntores.${index}.amperagem`)} />
          <NumberInput style={{ flex: 1 }} label="Quantidade" withAsterisk placeholder="Qtd. de disjuntores" {...form.getInputProps(`ambientes.${currentIndex}.disjuntores.${index}.quantidade`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.disjuntores`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
        ))}
        <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
          onClick={() => form.insertListItem(`ambientes.${currentIndex}.disjuntores`, { amperagem: "", quantidade: "" })}>
          Adicionar disjuntor
        </Button>
      </Box>
    </Group>
    <Text fw={700} mt="md">Componentes</Text>
      <Group grow mt="sm" maw={700}>
        <TextInput placeholder="Ex: Tramontina 10A" label="Tipo de Tomada" {...form.getInputProps(`ambientes.${currentIndex}.tipoTomada`)} />
        <TextInput placeholder="Ex: Tramontina Simples" label="Tipo de Interruptor" {...form.getInputProps(`ambientes.${currentIndex}.tipoInterruptor`)} />
        <TextInput placeholder="Ex: LED 12W Embutir" label="Tipo de Luminária" {...form.getInputProps(`ambientes.${currentIndex}.tipoLuminaria`)} />
        <NumberInput placeholder="Ex: 1.10" withAsterisk label="Altura de Instalação" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.alturaInstalacao`)} />
      </Group>
      <Text fw={700} mt="md">Aterramento e SPDA</Text>
      <Group grow mt="sm" maw={700}>
        <NumberInput placeholder="Qtd. de hastes" withAsterisk label="Hastes de Aterramento" {...form.getInputProps(`ambientes.${currentIndex}.hastesAterramento`)} />
        <NumberInput placeholder="Qtd. de caixas de inspeção" withAsterisk label="Caixas de Inspeção" {...form.getInputProps(`ambientes.${currentIndex}.caixasInspecao`)} />
        <NumberInput placeholder="Qtd. de terminais aéreos" withAsterisk label="Terminais Aéreos" {...form.getInputProps(`ambientes.${currentIndex}.terminaisAereos`)} />
      </Group>
      <Text fw={700} mt="md">Telefonia, Rede e CFTV</Text>
      <Group grow mt="sm" maw={700}>
        <NumberInput placeholder="Qtd. de quadros de redes" withAsterisk label="Quadros de Rede" {...form.getInputProps(`ambientes.${currentIndex}.quadrosRede`)} />
        <NumberInput placeholder="Qtd. de patch" withAsterisk label="Patch Cords" {...form.getInputProps(`ambientes.${currentIndex}.patchCords`)} />
        <NumberInput placeholder="Qtd. de câmeras" withAsterisk label="Câmeras" {...form.getInputProps(`ambientes.${currentIndex}.cameras`)} />
      </Group>
      <Text fw={700} mt="md">Cabeamento por Circuito</Text>
      {form.values.ambientes[currentIndex].cabeamentos.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput label="Circuito" placeholder="Ex: CP1" withAsterisk {...form.getInputProps(`ambientes.${currentIndex}.cabeamentos.${index}.circuito`)} />
          <NumberInput label="Comprimento" placeholder="Ex: 15.0" withAsterisk rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.cabeamentos.${index}.comprimento`)} />
          <NumberInput placeholder="Qtd. de tomadas" style={{ flex: 1 }} withAsterisk label="Tomadas / Keystone" {...form.getInputProps(`ambientes.${currentIndex}.cabeamentos.${index}.tomadas`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.cabeamentos`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
      ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.cabeamentos`, { circuito: "", comprimento: "", tomadas: "" })}>
      Adicionar circuito
    </Button>
  </Stepper.Step>
    <Stepper.Step label="Hidráulica">
    <Text fw={700} mt="md">Ramais</Text>
    {form.values.ambientes[currentIndex].ramais.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput label="Nome" placeholder="Ex: Ramal 1.1" withAsterisk {...form.getInputProps(`ambientes.${currentIndex}.ramais.${index}.nome`)} />
          <TextInput style={{ flex: 1 }} placeholder="Ex: DN20" withAsterisk label="Diâmetro" {...form.getInputProps(`ambientes.${currentIndex}.ramais.${index}.diametro`)} />
          <NumberInput style={{ flex: 1 }} placeholder="Ex: 5.0" withAsterisk label="Comprimento" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.ramais.${index}.comprimento`)} />
          <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem(`ambientes.${currentIndex}.ramais`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.ramais`, { nome: "", diametro: "", comprimento: "" })}>
      Adicionar ramal
    </Button>
    <Text fw={700} mt="md">Quantidades</Text>
    <Group grow mt="sm" maw={700}>
      <NumberInput placeholder="Qtd. de registros" withAsterisk label="Registros" {...form.getInputProps(`ambientes.${currentIndex}.registros`)} />
      <NumberInput placeholder="Qtd. de válvulas" withAsterisk label="Válvulas" {...form.getInputProps(`ambientes.${currentIndex}.valvulas`)} />
      <NumberInput placeholder="Qtd. de conexões" withAsterisk label="Conexões" {...form.getInputProps(`ambientes.${currentIndex}.conexoes`)} />
    </Group>
    <Text fw={700} mt="md">Reservatório</Text>
    <Group grow mt="sm" maw={700}>
      <TextInput label="Tipo" withAsterisk placeholder="Ex: Caixa d'água, Cisterna" {...form.getInputProps(`ambientes.${currentIndex}.reservatorio.tipo`)} />
      <NumberInput label="Capacidade" placeholder="Ex: 10" withAsterisk rightSection="L" {...form.getInputProps(`ambientes.${currentIndex}.reservatorio.capacidade`)} />
    </Group>
    <Text fw={700} mt="md">Extintores</Text>
    {form.values.ambientes[currentIndex].extintores.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput style={{ flex: 1 }} withAsterisk label="Tipo" placeholder="Ex: ABC, CO2" {...form.getInputProps(`ambientes.${currentIndex}.extintores.${index}.tipo`)} />
          <NumberInput style={{ flex: 1 }} label="Peso (kg)" withAsterisk placeholder="Ex: 6" {...form.getInputProps(`ambientes.${currentIndex}.extintores.${index}.peso`)} />
          <NumberInput style={{ flex: 1 }} label="Capacidade (L)" withAsterisk placeholder="Ex: 6" {...form.getInputProps(`ambientes.${currentIndex}.extintores.${index}.capacidade`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.extintores`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
   <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.extintores`, { tipo: "", peso: "", capacidade: "" })}>
      Adicionar Extintor
    </Button>
    <Text fw={700} mt="md">Hidrantes</Text>
    {form.values.ambientes[currentIndex].hidrantes.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput style={{ flex: 1 }} label="Localização" placeholder="Ex: Corredor principal" {...form.getInputProps(`ambientes.${currentIndex}.hidrantes.${index}.localizacao`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Diâmetro" placeholder="Ex: DN65" {...form.getInputProps(`ambientes.${currentIndex}.hidrantes.${index}.diametro`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk label="Conexões" placeholder="Qtd. de conexões" {...form.getInputProps(`ambientes.${currentIndex}.hidrantes.${index}.conexoes`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.hidrantes`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.hidrantes`, { localizacao: "", diametro: "", conexoes: "" })}>
      Adicionar hidrante
    </Button>
    <Text fw={700} mt="md">Dutos</Text>
    {form.values.ambientes[currentIndex].dutos.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput style={{ flex: 1 }} withAsterisk label="Diâmetro" placeholder="Ex: DN100" {...form.getInputProps(`ambientes.${currentIndex}.dutos.${index}.diametro`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk label="Comprimento" placeholder="Ex: 10.0" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.dutos.${index}.comprimento`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.dutos`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.dutos`, { diametro: "", comprimento: "" })}>
      Adicionar duto
    </Button>
    <Text fw={700} mt="md">Cobertura</Text>
    <Group grow mt="sm" maw={700}>
      <TextInput label="Tipo de Estrutura" withAsterisk placeholder="Ex: Madeira, Metálica" {...form.getInputProps(`ambientes.${currentIndex}.tipoEstrutura`)} />
      <TextInput label="Tipo de Telhamento" withAsterisk placeholder="Ex: Cerâmica, Metálica" {...form.getInputProps(`ambientes.${currentIndex}.tipoTelhamento`)} />
    </Group>
    <Group grow mt="sm" maw={700}>
      <NumberInput label="Espessura" placeholder="Ex: 6" withAsterisk rightSection="cm" {...form.getInputProps(`ambientes.${currentIndex}.espessura`)} />
      <NumberInput label="Inclinação" placeholder="Ex: 30" withAsterisk rightSection="%" {...form.getInputProps(`ambientes.${currentIndex}.inclinacao`)} />
    </Group>
    <Text fw={700} mt="md">Peças</Text>
    {form.values.ambientes[currentIndex].pecas.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
          <TextInput style={{ flex: 1 }} label="Descrição" withAsterisk placeholder="Ex: Caibro, Terça" {...form.getInputProps(`ambientes.${currentIndex}.pecas.${index}.descricao`)} />
          <TextInput style={{ flex: 1 }} label="Seção" withAsterisk placeholder="Ex: 5x5cm, W150" {...form.getInputProps(`ambientes.${currentIndex}.pecas.${index}.secao`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.pecas`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.pecas`, { descricao: "", secao: "" })}>
      Adicionar peça
    </Button>
  </Stepper.Step>
    <Stepper.Step label="Serviços e Movimento de Solo">
    <Text fw={700} mt="md">Serviços Preliminares</Text>
    <Text fw={700} mt="md">Canteiro de Obras</Text>
    <Group grow mt="sm" maw={700}>
      <NumberInput withAsterisk label="Contêineres" placeholder="Qtd. de contêineres" {...form.getInputProps(`ambientes.${currentIndex}.conteineres`)} />
      <NumberInput withAsterisk label="Banheiros Químicos" placeholder="Qtd. de banheiros" {...form.getInputProps(`ambientes.${currentIndex}.banheirosQuimicos`)} />
      <NumberInput withAsterisk label="Andaimes" placeholder="Qtd. de andaimes" {...form.getInputProps(`ambientes.${currentIndex}.andaimes`)} />
    </Group>

    <Text fw={700} mt="md">Resíduos</Text>
    <Group grow mt="sm" maw={700}>
      <NumberInput withAsterisk label="Resíduo Comum" placeholder="Ex: 10.0" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.residuoComum`)} />
      <NumberInput withAsterisk label="Resíduo Contaminado" placeholder="Ex: 2.0" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.residuoContaminado`)} />
      <TextInput label="Destinação e Transporte (CTR)" placeholder="Ex: Aterro sanitário" {...form.getInputProps(`ambientes.${currentIndex}.destinacaoResiduo`)} />
    </Group>

    <Text fw={700} mt="md">Movimento de Solo</Text>
    <Text fw={700} mt="md">Escavação</Text>
    <Group grow mt="sm" maw={700}>
      <NumberInput label="Profundidade" withAsterisk placeholder="Ex: 1.5" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.profundidadeEscavacao`)} />
      <NumberInput label="Inclinação do Terreno" withAsterisk placeholder="Ex: 10" rightSection="%" {...form.getInputProps(`ambientes.${currentIndex}.inclinacaoTerreno`)} />
    </Group>

    <Text fw={700} mt="md">Volumes</Text>
    <Group grow mt="sm">
      <NumberInput placeholder="Ex: 50.0" withAsterisk label="Terraplanagem" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.terraplanagem`)} />
      <NumberInput placeholder="Ex: 30.0" withAsterisk label="Escavação" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.escavacao`)} />
      <NumberInput placeholder="Ex: 20.0" withAsterisk label="Aterro" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.aterro`)} />
      <NumberInput placeholder="Ex: 5.0" withAsterisk label="Enrocamento" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.enrocamento`)} />
    </Group>
    <Group grow mt="sm">
      <NumberInput placeholder="Ex: 8.0" withAsterisk label="Contenção" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.contencao`)} />
      <NumberInput placeholder="Ex: 12.0" withAsterisk label="Taludamento" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.taludamento`)} />
      <NumberInput placeholder="Ex: 25.0" withAsterisk label="Nivelamento" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.nivelamento`)} />
      <NumberInput placeholder="Ex: 40.0" withAsterisk label="Compactação" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.volumes.compactacao`)} />
    </Group>
  </Stepper.Step>
  <Stepper.Step label="Estruturas">
    <Text fw={700} mt="md">Fundações</Text>
    {form.values.ambientes[currentIndex].fundacoes.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={800}>
          <TextInput style={{ flex: 1 }} withAsterisk placeholder="Ex: Viga Baldrame" label="Tipo" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.tipo`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 1.5" label="Profundidade" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.profundidade`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 0.05" label="Vol. Lastro" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.volumeLastro`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 0.3" label="Vol. Concreto" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.volumeConcreto`)} />
        </Group>
        <Group align="flex-end" maw={700} mt="xs">
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 15.0" label="Ferragem" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.pesoFerragem`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 5.0" label="Estribo" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.pesoEstribo`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 2.5" label="Forma" rightSection="m²" {...form.getInputProps(`ambientes.${currentIndex}.fundacoes.${index}.areaForma`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.fundacoes`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.fundacoes`, { tipo: "", profundidade: "", volumeLastro: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "" })}>
      Adicionar fundação
    </Button>
    <Text fw={700} mt="lg">Superestrutura em Concreto</Text>
    {form.values.ambientes[currentIndex].superestrutura.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end" maw={800}>
          <TextInput style={{ flex: 1 }} withAsterisk placeholder="Ex: Pilar, Viga, Laje" label="Tipo" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.tipo`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 0.20" label="Largura" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.largura`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 0.40" label="Altura" rightSection="m" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.altura`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 0.5" label="Vol. Concreto" rightSection="m³" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.volumeConcreto`)} />
        </Group>
        <Group align="flex-end" maw={800} mt="xs">
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 20.0" label="Ferragem" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.pesoFerragem`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 8.0" label="Estribo" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.pesoEstribo`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk placeholder="Ex: 3.0" label="Forma" rightSection="m²" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.areaForma`)} />
          <TextInput style={{ flex: 1 }} placeholder="Ex: 0.40x0.40" label="Janela Lançamento" {...form.getInputProps(`ambientes.${currentIndex}.superestrutura.${index}.janelaLancamento`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.superestrutura`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
   <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.superestrutura`, { tipo: "", largura: "", altura: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "", janelaLancamento: "" })}>
      Adicionar peça
    </Button>
    <Text fw={700} mt="lg">Estruturas Metálicas</Text>
    {form.values.ambientes[currentIndex].metalicas.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end">
          <TextInput style={{ flex: 1 }} withAsterisk label="Tipo" placeholder="Ex: Pilar, Viga" {...form.getInputProps(`ambientes.${currentIndex}.metalicas.${index}.tipo`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Perfil" placeholder="Ex: I, H, U" {...form.getInputProps(`ambientes.${currentIndex}.metalicas.${index}.tipoPerfil`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Seção" placeholder="Ex: W150x24" {...form.getInputProps(`ambientes.${currentIndex}.metalicas.${index}.secao`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk label="Peso" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.metalicas.${index}.peso`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Elastômero" placeholder="Ex: 10" {...form.getInputProps(`ambientes.${currentIndex}.metalicas.${index}.elastomero`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.metalicas`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.metalicas`, { tipo: "", tipoPerfil: "", secao: "", peso: "", elastomero: "" })}>
      Adicionar peça metálica
    </Button>
    <Text fw={700} mt="lg">Estruturas em Madeira</Text>
    {form.values.ambientes[currentIndex].madeira.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end">
          <TextInput style={{ flex: 1 }} withAsterisk label="Tipo de Peça" placeholder="Ex: Tesoura, Terça" {...form.getInputProps(`ambientes.${currentIndex}.madeira.${index}.tipoPeca`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Seção" placeholder="Ex: 5x10cm" {...form.getInputProps(`ambientes.${currentIndex}.madeira.${index}.secao`)} />
          <NumberInput style={{ flex: 1 }} withAsterisk label="Peso Total" placeholder="Ex: 80.0" rightSection="KgF" {...form.getInputProps(`ambientes.${currentIndex}.madeira.${index}.pesoTotal`)} />
          <TextInput style={{ flex: 1 }} withAsterisk label="Tipo de Telhamento" placeholder="Ex: Cerâmica, Metálica" {...form.getInputProps(`ambientes.${currentIndex}.madeira.${index}.tipoTelhamento`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem(`ambientes.${currentIndex}.madeira`, index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem(`ambientes.${currentIndex}.madeira`, { tipoPeca: "", secao: "", pesoTotal: "", tipoTelhamento: "" })}>
      Adicionar peça de madeira
    </Button>
  </Stepper.Step>
    <Stepper.Step label="Confirmação">
        <Text fw={700} mb="md" fz="lg">Confira os dados do formulário</Text>
        <Table striped highlightOnHover withTableBorder withColumnBorders style={{ flex: 1 }} mb="xl">
          <Table.Tbody>
            <Table.Tr><Table.Td fw={700} fz="lg" ta="center" colSpan={2}>Ambiente</Table.Td></Table.Tr>
            <Table.Tr><Table.Td w="50%">Nome</Table.Td><Table.Td>{form.values.ambientes[currentIndex].nome}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Comprimento</Table.Td><Table.Td>{form.values.ambientes[currentIndex].comprimento} m</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Largura</Table.Td><Table.Td>{form.values.ambientes[currentIndex].largura} m</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Altura</Table.Td><Table.Td>{form.values.ambientes[currentIndex].altura} m</Table.Td></Table.Tr>
          </Table.Tbody>
        </Table>
        <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{ flex: 1 }} mb="xl">
          <Table.Tbody>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2} fz="lg">Elétrica</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Pontos Elétricos</Table.Td></Table.Tr>
            <Table.Tr><Table.Td w="50%">Tomadas</Table.Td><Table.Td>{form.values.ambientes[currentIndex].tomadas}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Iluminação</Table.Td><Table.Td>{form.values.ambientes[currentIndex].iluminacao}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Interruptores</Table.Td><Table.Td>{form.values.ambientes[currentIndex].interruptores}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Tipo de Tomada</Table.Td><Table.Td>{form.values.ambientes[currentIndex].tipoTomada}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Tipo de Interruptor</Table.Td><Table.Td>{form.values.ambientes[currentIndex].tipoInterruptor}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Tipo de Luminária</Table.Td><Table.Td>{form.values.ambientes[currentIndex].tipoLuminaria}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Altura de Instalação</Table.Td><Table.Td>{form.values.ambientes[currentIndex].alturaInstalacao} m</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabos por Circuito</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Seção (mm²)</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].cabos.map((cabo, index) => (
              <Table.Tr key={index}>
                <Table.Td>{cabo.circuito}</Table.Td>
                <Table.Td>{cabo.secao}</Table.Td>
              </Table.Tr>
          ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Disjuntores</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={500}>Amperagem (A)</Table.Td><Table.Td fw={500}>Quantidade</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].disjuntores.map((d, index) => (
              <Table.Tr key={index}>
                <Table.Td>{d.amperagem}</Table.Td>
                <Table.Td>{d.quantidade}</Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Aterramento e SPDA</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Hastes de Aterramento</Table.Td><Table.Td>{form.values.ambientes[currentIndex].hastesAterramento}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Caixas de Inspeção</Table.Td><Table.Td>{form.values.ambientes[currentIndex].caixasInspecao}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Terminais Aéreos</Table.Td><Table.Td>{form.values.ambientes[currentIndex].terminaisAereos}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Telefonia, Rede e CFTV</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Quadros de Rede</Table.Td><Table.Td>{form.values.ambientes[currentIndex].quadrosRede}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Patch Cords</Table.Td><Table.Td>{form.values.ambientes[currentIndex].patchCords}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Câmeras</Table.Td><Table.Td>{form.values.ambientes[currentIndex].cameras}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabeamento por Circuito</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].cabeamentos.map((cab, index) => (
              <Table.Tr key={index}>
                <Table.Td>{cab.circuito}</Table.Td>
                <Table.Td>{cab.comprimento}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{ flex: 1 }} mb="xl">
          <Table.Tbody>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3} fz="lg">Hidráulica</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Ramais</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700}>Nome</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].ramais.map((ramal, index) => (
              <Table.Tr key={index}>
                <Table.Td w="20%">{ramal.nome}</Table.Td>
                <Table.Td w="20%">{ramal.diametro}</Table.Td>
                <Table.Td w="20%">{ramal.comprimento}</Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Quantidades</Table.Td></Table.Tr>
            <Table.Tr><Table.Td >Registros</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].registros}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Válvulas</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].valvulas}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Conexões</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].conexoes}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Reservatório</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Tipo</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].reservatorio.tipo}</Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Capacidade</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].reservatorio.capacidade} L</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Extintores</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={500}>Tipo</Table.Td><Table.Td fw={500}>Peso (kg)</Table.Td><Table.Td fw={500}>Capacidade (L)</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].extintores.map((ext, index) => (
              <Table.Tr key={index}>
                <Table.Td>{ext.tipo}</Table.Td>
                <Table.Td>{ext.peso}</Table.Td>
                <Table.Td>{ext.capacidade}</Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Hidrantes</Table.Td></Table.Tr>
            <Table.Tr><Table.Td fw={500}>Localização</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Conexões</Table.Td></Table.Tr>
            {form.values.ambientes[currentIndex].hidrantes.map((hid, index) => (
              <Table.Tr key={index}>
                <Table.Td>{hid.localizacao}</Table.Td>
                <Table.Td>{hid.diametro}</Table.Td>
                <Table.Td>{hid.conexoes}</Table.Td>
              </Table.Tr>
            ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Dutos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500} colSpan={2}>Comprimento (m)</Table.Td></Table.Tr>
          {form.values.ambientes[currentIndex].dutos.map((duto, index) => (
            <Table.Tr key={index}>
              <Table.Td>{duto.diametro}</Table.Td>
              <Table.Td colSpan={2}>{duto.comprimento}</Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Cobertura</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Estrutura</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].tipoEstrutura}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Tipo de Telhamento</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].tipoTelhamento}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Espessura</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].espessura} cm</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação</Table.Td><Table.Td colSpan={2}>{form.values.ambientes[currentIndex].inclinacao}%</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Peças</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={500}>Descrição</Table.Td><Table.Td fw={500} colSpan={2}>Seção</Table.Td></Table.Tr>
          {form.values.ambientes[currentIndex].pecas.map((peca, index) => (
            <Table.Tr key={index}>
              <Table.Td>{peca.descricao}</Table.Td>
              <Table.Td colSpan={2}>{peca.secao}</Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
        <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{flex: 1}} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} ta="center"colSpan={3} fz="lg" >Serviços Preliminares e Movimento de Solo</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Canteiro de Obras</Table.Td></Table.Tr>
          <Table.Tr><Table.Td w="50%">Contêineres</Table.Td><Table.Td>{form.values.ambientes[currentIndex].conteineres}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Banheiros Químicos</Table.Td><Table.Td>{form.values.ambientes[currentIndex].banheirosQuimicos}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Andaimes</Table.Td><Table.Td>{form.values.ambientes[currentIndex].andaimes}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Resíduos</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resíduo Comum</Table.Td><Table.Td>{form.values.ambientes[currentIndex].residuoComum} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Resíduo Contaminado</Table.Td><Table.Td>{form.values.ambientes[currentIndex].residuoContaminado} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Destinação</Table.Td><Table.Td>{form.values.ambientes[currentIndex].destinacaoResiduo}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Escavação</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Profundidade</Table.Td><Table.Td>{form.values.ambientes[currentIndex].profundidadeEscavacao} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Inclinação do Terreno</Table.Td><Table.Td>{form.values.ambientes[currentIndex].inclinacaoTerreno}%</Table.Td></Table.Tr>
          <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Volumes</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Terraplanagem</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.terraplanagem} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Escavação</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.escavacao} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Aterro</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.aterro} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Enrocamento</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.enrocamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Contenção</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.contencao} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Taludamento</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.taludamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Nivelamento</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.nivelamento} m³</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Compactação</Table.Td><Table.Td>{form.values.ambientes[currentIndex].volumes.compactacao} m³</Table.Td></Table.Tr>
      </Table.Tbody>
    </Table>
        <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" ta="center" mb="xl">
        <Table.Tbody>
        <Table.Tr><Table.Td fw={700} ta="center"colSpan={7} fz="lg">Estrutura</Table.Td></Table.Tr>
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Fundações</Table.Td></Table.Tr>
        <Table.Tr>
          <Table.Td fw={500}>Tipo</Table.Td>
          <Table.Td fw={500}>Profundidade (m)</Table.Td>
          <Table.Td fw={500}>Vol. Lastro (m³)</Table.Td>
          <Table.Td fw={500}>Vol. Concreto (m³)</Table.Td>
          <Table.Td fw={500}>Ferragem (KgF)</Table.Td>
          <Table.Td fw={500}>Estribo (KgF)</Table.Td>
          <Table.Td fw={500}>Forma (m²)</Table.Td>
        </Table.Tr>
        {form.values.ambientes[currentIndex].fundacoes.map((fund, index) => (
          <Table.Tr key={index}>
            <Table.Td>{fund.tipo}</Table.Td>
            <Table.Td>{fund.profundidade}</Table.Td>
            <Table.Td>{fund.volumeLastro}</Table.Td>
            <Table.Td>{fund.volumeConcreto}</Table.Td>
            <Table.Td>{fund.pesoFerragem}</Table.Td>
            <Table.Td>{fund.pesoEstribo}</Table.Td>
            <Table.Td>{fund.areaForma}</Table.Td>
          </Table.Tr>
        ))}
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Superestrutura em Concreto</Table.Td></Table.Tr>
        <Table.Tr>
          <Table.Td fw={500}>Tipo</Table.Td>
          <Table.Td fw={500}>Largura (m)</Table.Td>
          <Table.Td fw={500}>Altura (m)</Table.Td>
          <Table.Td fw={500}>Vol. Concreto (m³)</Table.Td>
          <Table.Td fw={500}>Ferragem (KgF)</Table.Td>
          <Table.Td fw={500}>Estribo (KgF)</Table.Td>
          <Table.Td fw={500}>Forma (m²)</Table.Td>
        </Table.Tr>
        {form.values.ambientes[currentIndex].superestrutura.map((sup, index) => (
          <Table.Tr key={index}>
            <Table.Td>{sup.tipo}</Table.Td>
            <Table.Td>{sup.largura}</Table.Td>
            <Table.Td>{sup.altura}</Table.Td>
            <Table.Td>{sup.volumeConcreto}</Table.Td>
            <Table.Td>{sup.pesoFerragem}</Table.Td>
            <Table.Td>{sup.pesoEstribo}</Table.Td>
            <Table.Td>{sup.areaForma}</Table.Td>
          </Table.Tr>
        ))}
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Estruturas Metálicas</Table.Td></Table.Tr>
        <Table.Tr>
          <Table.Td fw={500}>Tipo</Table.Td>
          <Table.Td fw={500}>Perfil</Table.Td>
          <Table.Td fw={500}>Seção</Table.Td>
          <Table.Td fw={500}>Peso (KgF)</Table.Td>
          <Table.Td fw={500} colSpan={3}>Elastômero</Table.Td>
        </Table.Tr>
        {form.values.ambientes[currentIndex].metalicas.map((met, index) => (
          <Table.Tr key={index}>
            <Table.Td>{met.tipo}</Table.Td>
            <Table.Td>{met.tipoPerfil}</Table.Td>
            <Table.Td>{met.secao}</Table.Td>
            <Table.Td>{met.peso}</Table.Td>
            <Table.Td colSpan={3}>{met.elastomero}</Table.Td>
          </Table.Tr>
        ))}
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={7}>Estruturas em Madeira</Table.Td></Table.Tr>
        <Table.Tr>
          <Table.Td fw={500}>Tipo de Peça</Table.Td>
          <Table.Td fw={500}>Seção</Table.Td>
          <Table.Td fw={500}>Peso Total (KgF)</Table.Td>
          <Table.Td fw={500} colSpan={4}>Tipo de Telhamento</Table.Td>
        </Table.Tr>
        {form.values.ambientes[currentIndex].madeira.map((mad, index) => (
          <Table.Tr key={index}>
            <Table.Td>{mad.tipoPeca}</Table.Td>
            <Table.Td>{mad.secao}</Table.Td>
            <Table.Td>{mad.pesoTotal}</Table.Td>
            <Table.Td colSpan={4}>{mad.tipoTelhamento}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </Stepper.Step>
    </Stepper>
  <Group justify="space-between" mt="xl">
      {active > 0 && (
        <Button variant="subtle" color="gray" onClick={() => setActive((c) => c - 1)} disabled={loading}>
          Voltar
        </Button>
      )}
      {active < 5 && (
        <Button type="button" onClick={handleNextStep} color="#34623F">
          Próximo
        </Button>
      )}
      {active === 5 && (
      <Group>
      {!initialData && (
        <Button type="button" variant="outline" color="#34623F" onClick={() => {
          form.insertListItem("ambientes", {
            nome: "", comprimento: "", largura: "", altura: "",
            tomadas: "", iluminacao: "", interruptores: "",
            cabos: [{ circuito: "", secao: "" }],
            disjuntores: [{ amperagem: "", quantidade: "" }],
            tipoTomada: "", tipoInterruptor: "", tipoLuminaria: "", alturaInstalacao: "",
            ramais: [{ nome: "", diametro: "", comprimento: "" }],
            registros: "", valvulas: "", conexoes: "",
            reservatorio: { tipo: "", capacidade: "" },
            hastesAterramento: "", caixasInspecao: "", terminaisAereos: "",
            quadrosRede: "", patchCords: "", cameras: "",
            cabeamentos: [{ circuito: "", comprimento: "", tomadas: "" }],
            extintores: [{ tipo: "", peso: "", capacidade: "" }],
            dutos: [{ diametro: "", comprimento: "" }],
            hidrantes: [{ localizacao: "", diametro: "", conexoes: "" }],
            tipoEstrutura: "", tipoTelhamento: "", espessura: "", inclinacao: "",
            pecas: [{ descricao: "", secao: "" }],
            conteineres: "", banheirosQuimicos: "", andaimes: "",
            residuoComum: "", residuoContaminado: "", destinacaoResiduo: "",
            profundidadeEscavacao: "", inclinacaoTerreno: "",
            volumes: { terraplanagem: "", escavacao: "", aterro: "", enrocamento: "", contencao: "", taludamento: "", nivelamento: "", compactacao: "" },
            fundacoes: [{ tipo: "", profundidade: "", volumeLastro: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "" }],
            superestrutura: [{ tipo: "", largura: "", altura: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "", janelaLancamento: "" }],
            metalicas: [{ tipo: "", tipoPerfil: "", secao: "", peso: "", elastomero: "" }],
            madeira: [{ tipoPeca: "", secao: "", pesoTotal: "", tipoTelhamento: "" }],
          });
          setCurrentIndex(form.values.ambientes.length);
          setActive(0);
          setSucesso(false);
        }}>
          + Adicionar Ambiente
        </Button>
      )}
    <Button type="submit" color="#34623F" loading={loading} disabled={sucesso}>
      {sucesso ? "Concluído" : "Salvar Formulário"}
    </Button>
  </Group>
)}
</Group>
</Box>
);
};
export default FormularioLevCampo;