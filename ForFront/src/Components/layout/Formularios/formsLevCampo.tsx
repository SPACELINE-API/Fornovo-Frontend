import React, { useState} from "react";
import { Box, Button, TextInput, Group, Stepper, Text, ActionIcon, NumberInput, Table} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { z } from "zod";



export interface Ambiente {
  id: number;
  nome: string;
  comprimentoAmbiente: number;
  larguraAmbiente: number;
  alturaAmbiente: number;
  area: number;
  tomadas:number;
  iluminacao:number;
  interruptores:number;
  cabos: { circuito: string; secao: number }[];
  disjuntores: { amperagem: number; quantidade: number }[];
  tipoTomada: string;
  tipoInterruptor: string;
  tipoLuminaria: string;
  alturaInstalacao: number;
  ramais: { nome: string; diametro: string; comprimento: number }[];
  registros: number;
  valvulas: number;
  conexoes: number;
  reservatorio: { tipo: string; capacidade: number };
  hastesAterramento: number;
  caixasInspecao: number;
  terminaisAereos: number;
  quadrosRede: number;
  patchCords: number;
  cameras: number;
  cabeamentos: { circuito: string; comprimento: number; tomadas: number }[];
  extintores: {tipo:string; peso:number; capacidade: number}[];
  hidrantes: {localizacao:string; diametro: string; conexoes:number}[];
  dutos: {diametro:number; comprimento:number}[];
  tipoEstrutura: string;
  tipoTelhamento: string;
  espessura: number;
  inclinacao: number;
  pecas:{ descricao: string; secao: string}[];
  conteineres: number;
  banheirosQuimicos: number;
  andaimes: number;
  residuoComum: number;
  residuoContaminado: number;
  destinacaoResiduo: string;
  profundidadeEscavacao: number;
  inclinacaoTerreno: number;
  volumes: {terraplanagem: number; escavacao: number; aterro: number; enrocamento: number; contencao: number; taludamento: number;nivelamento: number; compactacao: number;}
  fundacoes: { tipo: string; profundidade: number; volumeLastro: number; volumeConcreto: number; pesoFerragem: number; pesoEstribo: number; areaForma: number }[];
  superestrutura: { tipo: string; largura: number; altura: number; volumeConcreto: number; pesoFerragem: number; pesoEstribo: number; areaForma: number; janelaLancamento?: string }[];
  metalicas: { tipo: string; tipoPerfil: string; secao: string; peso: number; elastomero?: string }[];
  madeira: { tipoPeca: string; secao: string; pesoTotal: number; tipoTelhamento: string }[];
  
}

const num = (msg = "Obrigatório") => z.number({ invalid_type_error: msg });
const int = (msg = "Obrigatório") => z.number({ invalid_type_error: msg }).int("Deve ser inteiro");

const ambienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  comprimentoAmbiente: num("Comprimento é obrigatório"),
  larguraAmbiente: num("Largura é obrigatória"),
  alturaAmbiente: num("Altura é obrigatória"),
  tomadas: int("Tomadas é obrigatório"),
  iluminacao: int("Iluminação é obrigatória"),
  interruptores: int("Interruptores é obrigatório"),
  cabos: z.array(z.object({
    circuito: z.string().min(1, "Circuito é obrigatório"),
    secao: num("Seção é obrigatória"),
  })),
  disjuntores: z.array(z.object({
    amperagem: num("Amperagem é obrigatória"),
    quantidade: int("Quantidade é obrigatória"),
  })),
  tipoTomada: z.string().optional(),
  tipoInterruptor: z.string().optional(),
  tipoLuminaria: z.string().optional(),
  alturaInstalacao: z.number().optional(),
  hastesAterramento: int("Hastes é obrigatório"),
  caixasInspecao: int("Caixa é obrigatório"),
  terminaisAereos: int("Terminais é obrigatório"),
  quadrosRede: z.number().optional(),
  patchCords: z.number().optional(),
  cameras: z.number().optional(),
  cabeamentos: z.array(z.object({
    circuito: z.string().min(1, "Circuito é obrigatório"),
    comprimento: num("Comprimento é obrigatório"),
    tomadas: int("Quantidade é obrigatória"),
  })),
  ramais: z.array(z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    diametro: z.string().min(1, "Diâmetro é obrigatório"),
    comprimento: num("Comprimento é obrigatório"),
  })),
  registros: int("Registros é obrigatório"),
  valvulas: int("Válvulas é obrigatório"),
  conexoes: int("Conexões é obrigatório"),
  reservatorio: z.object({
    tipo: z.string().min(1, "Tipo é obrigatório"),
    capacidade: num("Capacidade é obrigatória"),
  }),
  extintores: z.array(z.object({
    tipo: z.string().optional(),
    peso: num("Peso é obrigatório"),
    capacidade: int("Capacidade é obrigatória"),
  })),
  hidrantes: z.array(z.object({
    localizacao: z.string().optional(),
    diametro: z.string().min(1, "Diâmetro é obrigatório"),
    conexoes: num("Conexões é obrigatório"),
  })),
  dutos: z.array(z.object({
    diametro: z.string().min(1, "Diâmetro é obrigatório"),
    comprimento: num("Comprimento é obrigatório"),
  })),
  tipoTelhamento: z.string().min(1, "Obrigatório"),
  tipoEstrutura: z.string().min(1, "Obrigatório"),
  espessura: num("Espessura é obrigatória"),
  inclinacao: num("Inclinação é obrigatória"),
  pecas: z.array(z.object({
    descricao: z.string().min(1, "Descrição é obrigatória"),
    secao: z.string().min(1, "Seção é obrigatória"),
  })),
  conteineres: z.number().optional(),
  banheirosQuimicos: z.number().optional(),
  andaimes: z.number().optional(),
  residuoComum: z.number().optional(),
  residuoContaminado: z.number().optional(),
  destinacaoResiduo: z.string().optional(),
  profundidadeEscavacao: num("Obrigatória"),
  inclinacaoTerreno: num("Obrigatória"),
  volumes: z.object({
    terraplanagem: num("Obrigatória"),
    escavacao: num("Obrigatória"),
    aterro: num("Obrigatória"),
    enrocamento: num("Obrigatória"),
    contencao: num("Obrigatória"),
    taludamento: num("Obrigatória"),
    nivelamento: num("Obrigatória"),
    compactacao: num("Obrigatória"),
  }),
  fundacoes: z.array(z.object({
    tipo: z.string().min(1, "Obrigatório"),
    profundidade: num("Obrigatória"),
    volumeLastro: num("Obrigatório"),
    volumeConcreto: num("Obrigatório"),
    pesoFerragem: num("Obrigatório"),
    pesoEstribo: num("Obrigatório"),
    areaForma: num("Obrigatória"),
  })),
  superestrutura: z.array(z.object({
    tipo: z.string().min(1, "Obrigatório"),
    largura: num("Obrigatória"),
    altura: num("Obrigatória"),
    volumeConcreto: num("Obrigatório"),
    pesoFerragem: num("Obrigatório"),
    pesoEstribo: num("Obrigatório"),
    areaForma: num("Obrigatória"),
    janelaLancamento: z.string().optional(),
  })),
  metalicas: z.array(z.object({
    tipo: z.string().min(1, "Obrigatório"),
    tipoPerfil: z.string().min(1, "Obrigatório"),
    secao: z.string().min(1, "Obrigatório"),
    peso: num("Obrigatório"),
    elastomero: z.string().optional(),
  })),
  madeira: z.array(z.object({
    tipoPeca: z.string().min(1, "Obrigatório"),
    secao: z.string().min(1, "Obrigatório"),
    pesoTotal: num("Obrigatório"),
    tipoTelhamento: z.string().min(1, "Obrigatório"),
  })),
});

interface FormularioAmbienteProps {
  initialData?: Ambiente | null;
  onSubmitSuccess?: (msg: string) => void;
  onCancel?: () => void;
}
const FormularioLevCampo: React.FC<FormularioAmbienteProps> = ({ initialData }) => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
    nome: initialData?.nome || "", 
    comprimentoAmbiente: initialData?.comprimentoAmbiente ?? "",
    larguraAmbiente: initialData?.larguraAmbiente ?? "",
    alturaAmbiente: initialData?.alturaAmbiente ?? "",
    tomadas: initialData?.tomadas ?? "",
    iluminacao: initialData?.iluminacao ?? "",
    interruptores: initialData?.interruptores ?? "",
    cabos: initialData?.cabos ?? [{ circuito: "", secao: "" }],
    disjuntores: initialData?.disjuntores ?? [{ amperagem: "", quantidade: "" }],
    tipoTomada: initialData?.tipoTomada ?? "",
    tipoInterruptor: initialData?.tipoInterruptor ?? "",
    tipoLuminaria: initialData?.tipoLuminaria ?? "",
    alturaInstalacao: initialData?.alturaInstalacao ?? "",
    ramais: initialData?.ramais ?? [{ nome: "", diametro: "", comprimento: "" }],
    registros: initialData?.registros ?? "",
    valvulas: initialData?.valvulas ?? "",
    conexoes: initialData?.conexoes ?? "",
    reservatorio: initialData?.reservatorio ?? { tipo: "", capacidade: "" },
    hastesAterramento: initialData?.hastesAterramento ?? "",
    caixasInspecao: initialData?.caixasInspecao ?? "",
    terminaisAereos: initialData?.terminaisAereos ?? "",
    quadrosRede: initialData?.quadrosRede ?? "",
    patchCords: initialData?.patchCords ?? "",
    cameras: initialData?.cameras ?? "",
    cabeamentos: initialData?.cabeamentos ?? [{ circuito: "", comprimento: "", tomadas: "" }],
    extintores: initialData?.extintores ?? [{ tipo: "", peso: "", capacidade: "" }],
    dutos: initialData?.dutos ?? [{ diametro: "", comprimento: "" }],
    hidrantes: initialData?.hidrantes ?? [{ localizacao: "", diametro: "", conexoes: "" }],
    tipoEstrutura: initialData?.tipoEstrutura ?? "",
    tipoTelhamento: initialData?.tipoTelhamento ?? "",
    espessura: initialData?.espessura ?? "",
    inclinacao: initialData?.inclinacao ?? "",
    pecas: initialData?.pecas ?? [{ descricao: "", secao: "" }],
    conteineres: initialData?.conteineres ?? "",
    banheirosQuimicos: initialData?.banheirosQuimicos ?? "",
    andaimes: initialData?.andaimes ?? "",
    residuoComum: initialData?.residuoComum ?? "",
    residuoContaminado: initialData?.residuoContaminado ?? "",
    destinacaoResiduo: initialData?.destinacaoResiduo ?? "",
    profundidadeEscavacao: initialData?.profundidadeEscavacao ?? "",
    inclinacaoTerreno: initialData?.inclinacaoTerreno ?? "",
    volumes: initialData?.volumes ?? {terraplanagem: "", escavacao: "", aterro: "", enrocamento: "", contencao: "", taludamento: "",nivelamento: "", compactacao: "",},
    fundacoes: initialData?.fundacoes ?? [{tipo: "", profundidade: "", volumeLastro: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "", }],
    superestrutura: initialData?.superestrutura ?? [{tipo: "", largura: "",altura: "",volumeConcreto: "",pesoFerragem: "", pesoEstribo: "", areaForma: "", janelaLancamento: "",}],
    metalicas: initialData?.metalicas ?? [{tipo: "", tipoPerfil: "",secao: "", peso: "", elastomero: "",}],
    madeira: initialData?.madeira ?? [{ tipoPeca: "", secao: "", pesoTotal: "", tipoTelhamento: "",}],

    },
    validate: zodResolver(ambienteSchema),
  });

 const fieldsByStep: Record<number, string[]> = {
  0: ["nome", "comprimentoAmbiente", "larguraAmbiente", "alturaAmbiente"],
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
      errorKey === field || 
      errorKey.startsWith(`${field}.`) || 
      errorKey.startsWith(`${field}[`) 
    )
  );

  if (!stepHasErrors) {
  form.clearErrors();
  setActive((current) => current + 1);
  const modal = document.querySelector(".mantine-Modal-body");
  if (modal) modal.scrollTop = 0;
} else {
  const firstErrorField = document.querySelector(".mantine-TextInput-error");
  firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
}
};
  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    const novoAmbiente = {
      id: Date.now(),
      ...values,
    };

    console.log("Ambiente salvo:", novoAmbiente);
    setLoading(false);
    setActive(0); 
    form.reset();
  };     
  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
    <Stepper active={active} allowNextStepsSelect={false} color="#478d57" iconSize={30}>
    <Stepper.Step label="Ambiente">
    <Group mt="sm" grow maw={900}>
        <TextInput label="Nome do Ambiente" placeholder="Ex: Cantina, Laboratório, Sala" {...form.getInputProps("nome")}/>
        <NumberInput label="Comprimento"  placeholder="Ex: 10.5" rightSection="m"{...form.getInputProps("comprimentoAmbiente")}/>
        <NumberInput label="Largura" placeholder="Ex: 8.0" rightSection="m"{...form.getInputProps("larguraAmbiente")}/>
        <NumberInput label="Altura" placeholder="Ex: 3.0" rightSection="m" {...form.getInputProps("alturaAmbiente")}/>
    </Group>
    </Stepper.Step>
    <Stepper.Step label="Elétrica">
    <Text fw={700} mt="md">Pontos Elétricos</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput label="Tomadas (TUG)" placeholder="Qtd. de tomadas" {...form.getInputProps("tomadas")}/>
        <NumberInput label="Pontos de Iluminação" placeholder="Qtd. de pontos" {...form.getInputProps("iluminacao")}/>
        <NumberInput label="Interruptores" placeholder="Qtd. de interruptores" {...form.getInputProps("interruptores")}/>
    </Group>
    <Group align="flex-start" mt="md">
    <Box style={{ flex: 1 }}>
    <Text fw={700}>Cabos por Circuito</Text>
    {form.values.cabos.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end">
          <TextInput style={{ flex: 1 }} placeholder="Ex: C1" label="Circuito" {...form.getInputProps(`cabos.${index}.circuito`)} />
          <NumberInput style={{ flex: 1 }} placeholder="Ex: 1.5" label="Seção (mm²)" {...form.getInputProps(`cabos.${index}.secao`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("cabos", index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem("cabos", { circuito: "", secao: "" })}>
      Adicionar circuito
    </Button>
  </Box>
  <Box style={{ flex: 1 }}>
    <Text fw={700}>Disjuntores</Text>
    {form.values.disjuntores.map((_, index) => (
      <Box key={index} mt="sm">
        <Group align="flex-end">
          <NumberInput style={{ flex: 1 }} placeholder="Ex: 20" label="Amperagem (A)" {...form.getInputProps(`disjuntores.${index}.amperagem`)} />
          <NumberInput style={{ flex: 1 }} label="Quantidade" placeholder="Qtd. de disjuntores"  {...form.getInputProps(`disjuntores.${index}.quantidade`)} />
          <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("disjuntores", index)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
      onClick={() => form.insertListItem("disjuntores", { amperagem: "", quantidade: "" })}>
      Adicionar disjuntor
    </Button>
  </Box>
</Group>
    <Text fw={700} mt="md">Componentes</Text>
    <Group grow mt="sm" maw={700}>
        <TextInput placeholder="Ex: Tramontina 10A" label="Tipo de Tomada" {...form.getInputProps("tipoTomada")} />
        <TextInput placeholder="Ex: Tramontina Simples" label="Tipo de Interruptor"  {...form.getInputProps("tipoInterruptor")} />
        <TextInput placeholder="Ex: LED 12W Embutir" label="Tipo de Luminária" {...form.getInputProps("tipoLuminaria")} />
        <NumberInput placeholder="Ex: 1.10" label="Altura de Instalação" rightSection="m" {...form.getInputProps("alturaInstalacao")} /> 
    </Group>
    <Text fw={700} mt="md">Aterramento e SPDA</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput placeholder="Qtd. de hastes" label="Hastes de Aterramento" {...form.getInputProps("hastesAterramento")} />
        <NumberInput placeholder="Qtd. de caixas de inspeção" label="Caixas de Inspeção"{...form.getInputProps("caixasInspecao")} />
        <NumberInput placeholder="Qtd. de terminais aéreos"  label="Terminais Aéreos" {...form.getInputProps("terminaisAereos")}/>
    </Group>
    <Text fw={700} mt="md">Telefonia, Rede e CFTV</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput placeholder="Qtd. de quadros de redes"  label="Quadros de Rede"{...form.getInputProps("quadrosRede")}/>
        <NumberInput placeholder="Qtd. de patch"  label="Patch Cords"  {...form.getInputProps("patchCords")} />
        <NumberInput placeholder="Qtd. de câmeras"  label="Câmeras" {...form.getInputProps("cameras")} />
    </Group>
    <Text fw={700} mt="md">Cabeamento por Circuito</Text>
        {form.values.cabeamentos.map((_, index) => (
        <Box key={index} mt="sm">
    <Group align="flex-end" maw={700}>
        <TextInput label="Circuito" placeholder="Ex: CP1" {...form.getInputProps(`cabeamentos.${index}.circuito`)} />
        <NumberInput label="Comprimento"placeholder="Ex: 15.0" rightSection="m" {...form.getInputProps(`cabeamentos.${index}.comprimento`)} />
        <NumberInput placeholder="Qtd. de tomadas" style={{ flex: 1 }} label="Tomadas/ Keystone" {...form.getInputProps(`cabeamentos.${index}.tomadas`)} />
        <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("cabeamentos", index)}><IconTrash size={16} /></ActionIcon>
    </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />} onClick={() => form.insertListItem("cabeamentos", { circuito: "", comprimento: "", tomadas: "" })}>Adicionar circuito</Button>
    </Stepper.Step>
    <Stepper.Step label="Hidráulica">
    <Text fw={700} mt="md">Ramais</Text>
    {form.values.ramais.map((_, index) => (
        <Box key={index} mt="sm">
        <Group align="flex-end" maw={700}>
        <TextInput label="Nome" placeholder="Ex: Ramal 1.1" {...form.getInputProps(`ramais.${index}.nome`)} />
        <TextInput style={{ flex: 1 }} placeholder="Ex: DN20" label="Diâmetro" {...form.getInputProps(`ramais.${index}.diametro`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 5.0" label="Comprimento" rightSection="m"{...form.getInputProps(`ramais.${index}.comprimento`)} />
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("ramais", index)}><IconTrash size={16} /></ActionIcon>
        </Group>
        </Box>
        ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />} onClick={() => form.insertListItem("ramais", { nome: "", diametro: "", comprimento: "" })}>Adicionar ramal</Button>
    <Text fw={700} mt="md">Quantidades</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput placeholder="Qtd. de registros" label="Registros" {...form.getInputProps("registros")} />
        <NumberInput placeholder="Qtd. de válvulas" label="Válvulas" {...form.getInputProps("valvulas")} />
        <NumberInput placeholder="Qtd. de conexões" label="Conexões" {...form.getInputProps("conexoes")} />
    </Group>
    <Text fw={700} mt="md">Reservatório</Text>
    <Group grow mt="sm" maw={700}>
        <TextInput label="Tipo" placeholder="Ex: Caixa d'água, Cisterna" {...form.getInputProps("reservatorio.tipo")} />
        <NumberInput label="Capacidade" placeholder="Ex: 10"  rightSection="L" {...form.getInputProps("reservatorio.capacidade")} />
    </Group>
    <Text fw={700} mt="md">Extintores</Text>
    {form.values.extintores.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={700}>
        <TextInput style={{ flex: 1 }} label="Tipo" placeholder="Ex: ABC, CO2" {...form.getInputProps(`extintores.${index}.tipo`)} />
        <NumberInput style={{ flex: 1 }} label="Peso (kg)" placeholder="Ex: 6" {...form.getInputProps(`extintores.${index}.peso`)} />
        <NumberInput style={{ flex: 1 }} label="Capacidade (L)" placeholder="Ex: 6" {...form.getInputProps(`extintores.${index}.capacidade`)} />
      <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("extintores", index)}><IconTrash size={16} /></ActionIcon>
    </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}onClick={() => form.insertListItem("extintores", { tipo: "", peso: "", capacidade: "" })}>Adicionar Extintor</Button>
    <Text fw={700} mt="md">Hidrantes</Text>
    {form.values.hidrantes.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={700}>
        <TextInput style={{ flex: 1 }} label="Localização" placeholder="Ex: Corredor principal" {...form.getInputProps(`hidrantes.${index}.localizacao`)} />
        <TextInput style={{ flex: 1 }} label="Diâmetro" placeholder="Ex: DN65" {...form.getInputProps(`hidrantes.${index}.diametro`)} />
        <NumberInput style={{ flex: 1 }} label="Conexões" placeholder="Qtd. de conexões" {...form.getInputProps(`hidrantes.${index}.conexoes`)} />
        <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("hidrantes", index)}><IconTrash size={16} /></ActionIcon>
    </Group>
  </Box>
))}
<Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}onClick={() => form.insertListItem("hidrantes", { localizacao: "", diametro: "", conexoes: "" })}>Adicionar hidrante</Button>
    <Text fw={700} mt="md">Dutos</Text>
    {form.values.dutos.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={700}>
        <TextInput style={{ flex: 1 }} label="Diâmetro" placeholder="Ex: DN100" {...form.getInputProps(`dutos.${index}.diametro`)} />
        <NumberInput style={{ flex: 1 }} label="Comprimento"placeholder="Ex: 10.0" rightSection="m" {...form.getInputProps(`dutos.${index}.comprimento`)} />
        <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("dutos", index)}><IconTrash size={16} /></ActionIcon>
    </Group>
  </Box>
))}
<Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}onClick={() => form.insertListItem("dutos", { diametro: "", comprimento: "" })}>Adicionar duto</Button>
    <Text fw={700} mt="md">Cobertura</Text>
    <Group grow mt="sm" maw={700}>
        <TextInput label="Tipo de Estrutura" placeholder="Ex: Madeira, Metálica" {...form.getInputProps("tipoEstrutura")}/>
        <TextInput label="Tipo de Telhamento" placeholder="Ex: Cerâmica, Metálica" {...form.getInputProps("tipoTelhamento")} />
    </Group>
    <Group grow mt="sm" maw={700}>
        <NumberInput label="Espessura" placeholder="Ex: 6" rightSection="cm" {...form.getInputProps("espessura")} />
        <NumberInput label="Inclinação" placeholder="Ex: 30" rightSection="%" {...form.getInputProps("inclinacao")} />
    </Group>
    <Text fw={700} mt="md">Peças</Text>
    {form.values.pecas.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={700}>
        <TextInput style={{ flex: 1 }} label="Descrição" placeholder="Ex: Caibro, Terça" {...form.getInputProps(`pecas.${index}.descricao`)} />
        <TextInput style={{ flex: 1 }} label="Seção" placeholder="Ex: 5x5cm, W150" {...form.getInputProps(`pecas.${index}.secao`)} />
    <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("pecas", index)}><IconTrash size={16} /></ActionIcon>
    </Group>
  </Box>
))}
<Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />} onClick={() => form.insertListItem("pecas", { descricao: "", secao: "" })}>Adicionar peça</Button>
</Stepper.Step>
    <Stepper.Step label="Serviços e Movimento de Solo">
    <Text fw={700} mt="md">Serviços Preliminares</Text>
    <Text fw={700} mt="md">Canteiro de Obras</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput label="Contêineres"placeholder="Qtd. de contêineres" {...form.getInputProps("conteineres")} />
        <NumberInput  label="Banheiros Químicos" placeholder="Qtd. de banheiros" {...form.getInputProps("banheirosQuimicos")} />
        <NumberInput label="Andaimes" placeholder="Qtd. de andaimes" {...form.getInputProps("andaimes")} />
    </Group>
    <Text fw={700} mt="md">Resíduos</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput label="Resíduo Comum" placeholder="Ex: 10.0"  rightSection="m³" {...form.getInputProps("residuoComum")} />
        <NumberInput label="Resíduo Contaminado" placeholder="Ex: 2.0" rightSection="m³" {...form.getInputProps("residuoContaminado")} />
        <TextInput label="Destinação e Transporte (CTR)" placeholder="Ex: Aterro sanitário" {...form.getInputProps("destinacaoResiduo")} />
    </Group>
    <Text fw={700} mt="md">Movimento de Solo</Text>
    <Text fw={700} mt="md">Escavação</Text>
    <Group grow mt="sm" maw={700}>
        <NumberInput label="Profundidade" placeholder="Ex: 1.5" rightSection="m" {...form.getInputProps("profundidadeEscavacao")} />
        <NumberInput label="Inclinação do Terreno" placeholder="Ex: 10"  rightSection="%" {...form.getInputProps("inclinacaoTerreno")} />
    </Group>
    <Text fw={700} mt="md">Volumes</Text>
    <Group grow mt="sm">
        <NumberInput placeholder="Ex: 50.0" label="Terraplanagem" rightSection="m³" {...form.getInputProps("volumes.terraplanagem")} />
        <NumberInput placeholder="Ex: 30.0" label="Escavação"  rightSection="m³" {...form.getInputProps("volumes.escavacao")} />
        <NumberInput placeholder="Ex: 20.0" label="Aterro" rightSection="m³" {...form.getInputProps("volumes.aterro")} />
        <NumberInput placeholder="Ex: 5.0" label="Enrocamento"  rightSection="m³" {...form.getInputProps("volumes.enrocamento")} />
    </Group>
    <Group grow mt="sm">
        <NumberInput placeholder="Ex: 8.0" label="Contenção"  rightSection="m³" {...form.getInputProps("volumes.contencao")} />
        <NumberInput placeholder="Ex: 12.0" label="Taludamento"  rightSection="m³" {...form.getInputProps("volumes.taludamento")} />
        <NumberInput placeholder="Ex: 25.0" label="Nivelamento"  rightSection="m³" {...form.getInputProps("volumes.nivelamento")} />
        <NumberInput placeholder="Ex: 40.0" label="Compactação"  rightSection="m³" {...form.getInputProps("volumes.compactacao")} />
    </Group>
    </Stepper.Step>
    <Stepper.Step label="Estruturas">
    <Text fw={700} mt="md">Fundações</Text>
    {form.values.fundacoes.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={800}>
        <TextInput style={{ flex: 1 }} placeholder="Ex: Viga Baldrame" label="Tipo" {...form.getInputProps(`fundacoes.${index}.tipo`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 1.5" label="Profundidade" rightSection="m" {...form.getInputProps(`fundacoes.${index}.profundidade`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 0.05" label="Vol. Lastro" rightSection="m³" {...form.getInputProps(`fundacoes.${index}.volumeLastro`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 0.3" label="Vol. Concreto"  rightSection="m³" {...form.getInputProps(`fundacoes.${index}.volumeConcreto`)} />
    </Group>
    <Group align="flex-end" maw={700} mt="xs">   
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 15.0" label="Ferragem"  rightSection="KgF" {...form.getInputProps(`fundacoes.${index}.pesoFerragem`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 5.0" label="Estribo"  rightSection="KgF" {...form.getInputProps(`fundacoes.${index}.pesoEstribo`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 2.5" label="Forma"  rightSection="m²" {...form.getInputProps(`fundacoes.${index}.areaForma`)} />
    <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("fundacoes", index)}>
        <IconTrash size={16} />
    </ActionIcon>
    </Group>
  </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("fundacoes", { tipo: "", profundidade: "", volumeLastro: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo: "", areaForma: "" })}>
    Adicionar fundação
    </Button>
    <Text fw={700} mt="lg">Superestrutura em Concreto</Text>
    {form.values.superestrutura.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end" maw={800}>
        <TextInput style={{ flex: 1 }} placeholder="Ex: Pilar, Viga, Laje" label="Tipo" {...form.getInputProps(`superestrutura.${index}.tipo`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 0.20" label="Largura"  rightSection="m" {...form.getInputProps(`superestrutura.${index}.largura`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 0.40" label="Altura" rightSection="m" {...form.getInputProps(`superestrutura.${index}.altura`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 0.5" label="Vol. Concreto" rightSection="m³" {...form.getInputProps(`superestrutura.${index}.volumeConcreto`)} />
    </Group>
    <Group align="flex-end" maw={800} mt="xs">
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 20.0" label="Ferragem" rightSection="KgF" {...form.getInputProps(`superestrutura.${index}.pesoFerragem`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 8.0" label="Estribo" rightSection="KgF" {...form.getInputProps(`superestrutura.${index}.pesoEstribo`)} />
        <NumberInput style={{ flex: 1 }} placeholder="Ex: 3.0" label="Forma" rightSection="m²" {...form.getInputProps(`superestrutura.${index}.areaForma`)} />
        <TextInput style={{ flex: 1 }} placeholder="Ex: 0.40x0.40" label="Janela Lançamento" {...form.getInputProps(`superestrutura.${index}.janelaLancamento`)} />
    <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("superestrutura", index)}>
        <IconTrash size={16} />
    </ActionIcon>
    </Group>
  </Box>
))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("superestrutura", { tipo: "", largura: "", altura: "", volumeConcreto: "", pesoFerragem: "", pesoEstribo:"", areaForma: "", janelaLancamento: "" })}>
    Adicionar peça
    </Button>
    <Text fw={700} mt="lg">Estruturas Metálicas</Text>
    {form.values.metalicas.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end">
        <TextInput style={{ flex: 1 }} label="Tipo" placeholder="Ex: Pilar, Viga" {...form.getInputProps(`metalicas.${index}.tipo`)} />
        <TextInput style={{ flex: 1 }} label="Perfil" placeholder="Ex: I, H, U" {...form.getInputProps(`metalicas.${index}.tipoPerfil`)} />
        <TextInput style={{ flex: 1 }} label="Seção" placeholder="Ex: W150x24" {...form.getInputProps(`metalicas.${index}.secao`)} />
        <NumberInput style={{ flex: 1 }} label="Peso"  rightSection="KgF" {...form.getInputProps(`metalicas.${index}.peso`)} />
        <TextInput style={{ flex: 1 }} label="Elastômero" {...form.getInputProps(`metalicas.${index}.elastomero`)} />
    <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("metalicas", index)}>
        <IconTrash size={16} />
    </ActionIcon>
    </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("metalicas", { tipo: "", tipoPerfil: "", secao: "", peso: "", elastomero: "" })}>
    Adicionar peça metálica
    </Button>
    <Text fw={700} mt="lg">Estruturas em Madeira</Text>
    {form.values.madeira.map((_, index) => (
    <Box key={index} mt="sm">
    <Group align="flex-end">
        <TextInput style={{ flex: 1 }} label="Tipo de Peça" placeholder="Ex: Tesoura, Terça" {...form.getInputProps(`madeira.${index}.tipoPeca`)} />
        <TextInput style={{ flex: 1 }} label="Seção" placeholder="Ex: 5x10cm" {...form.getInputProps(`madeira.${index}.secao`)} />
        <NumberInput style={{ flex: 1 }} label="Peso Total" placeholder="Ex: 80.0" rightSection="KgF" {...form.getInputProps(`madeira.${index}.pesoTotal`)} />
        <TextInput style={{ flex: 1 }} label="Tipo de Telhamento" placeholder="Ex: Cerâmica, Metálica" {...form.getInputProps(`madeira.${index}.tipoTelhamento`)} />
    <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("madeira", index)}>
        <IconTrash size={16} />
    </ActionIcon>
    </Group>
    </Box>
))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("madeira", { tipoPeca: "", secao: "", pesoTotal: "", tipoTelhamento: "" })}>
    Adicionar peça de madeira
    </Button>
    </Stepper.Step>
    <Stepper.Step label="Confirmação">
      <Text fw={700} mb="md" fz="lg" >Confira os dados do formulário</Text>
      <Table striped highlightOnHover withTableBorder withColumnBorders style={{flex: 1}} mb="xl">
        <Table.Tbody>
          <Table.Tr><Table.Td fw={700} fz="lg" ta="center" colSpan={2}>Ambiente</Table.Td></Table.Tr>
          <Table.Tr><Table.Td w="50%">Nome</Table.Td><Table.Td>{form.values.nome}</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Comprimento</Table.Td><Table.Td>{form.values.comprimentoAmbiente} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Largura</Table.Td><Table.Td>{form.values.larguraAmbiente} m</Table.Td></Table.Tr>
          <Table.Tr><Table.Td>Altura</Table.Td><Table.Td>{form.values.alturaAmbiente} m</Table.Td></Table.Tr>
        </Table.Tbody >
      </Table>
      <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{flex: 1}} mb="xl">
      <Table.Tbody>
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={2} fz="lg" >Elétrica</Table.Td></Table.Tr>
        <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Pontos Elétricos</Table.Td></Table.Tr>
        <Table.Tr><Table.Td w="50%">Tomadas</Table.Td><Table.Td>{form.values.tomadas}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Iluminação</Table.Td><Table.Td>{form.values.iluminacao}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Interruptores</Table.Td><Table.Td>{form.values.interruptores}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Tipo de Tomada</Table.Td><Table.Td>{form.values.tipoTomada}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Tipo de Interruptor</Table.Td><Table.Td>{form.values.tipoInterruptor}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Tipo de Luminária</Table.Td><Table.Td>{form.values.tipoLuminaria}</Table.Td></Table.Tr>
        <Table.Tr><Table.Td>Altura de Instalação</Table.Td><Table.Td>{form.values.alturaInstalacao} m</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabos por Circuito</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Seção (mm²)</Table.Td></Table.Tr>{form.values.cabos.map((cabo, index) => (
      <Table.Tr key={index}>
        <Table.Td>{cabo.circuito}</Table.Td>
        <Table.Td>{cabo.secao}</Table.Td>
      </Table.Tr>
    ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Disjuntores</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Amperagem (A)</Table.Td><Table.Td fw={500}>Quantidade</Table.Td></Table.Tr>{form.values.disjuntores.map((d, index) => (
      <Table.Tr key={index}>
        <Table.Td>{d.amperagem}</Table.Td>
        <Table.Td>{d.quantidade}</Table.Td>
      </Table.Tr>
    ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Aterramento e SPDA</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Hastes de Aterramento</Table.Td><Table.Td>{form.values.hastesAterramento}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Caixas de Inspeção</Table.Td><Table.Td>{form.values.caixasInspecao}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Terminais Aéreos</Table.Td><Table.Td>{form.values.terminaisAereos}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700}ta="center" colSpan={2}>Telefonia, Rede e CFTV</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Quadros de Rede</Table.Td><Table.Td>{form.values.quadrosRede}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Patch Cords</Table.Td><Table.Td>{form.values.patchCords}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Câmeras</Table.Td><Table.Td>{form.values.cameras}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Cabeamento por Circuito</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Circuito</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
      {form.values.cabeamentos.map((cab, index) => (
        <Table.Tr key={index}>
          <Table.Td>{cab.circuito}</Table.Td>
          <Table.Td>{cab.comprimento}</Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
  <Table striped highlightOnHover withTableBorder withColumnBorders mt="lg" style={{flex: 1}} mb="xl">
  <Table.Tbody>
    <Table.Tr><Table.Td fw={700} ta="center"colSpan={3} fz="lg" >Hidráulica</Table.Td></Table.Tr>
    <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Ramais</Table.Td></Table.Tr>
    <Table.Tr><Table.Td fw={700}>Nome</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Comprimento (m)</Table.Td></Table.Tr>
    {form.values.ramais.map((ramal, index) => (
      <Table.Tr key={index}>
        <Table.Td w="20%">{ramal.nome}</Table.Td>
        <Table.Td w="20%">{ramal.diametro}</Table.Td>
        <Table.Td w="20%">{ramal.comprimento}</Table.Td>
      </Table.Tr>
    ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Quantidades</Table.Td></Table.Tr>
      <Table.Tr><Table.Td >Registros</Table.Td><Table.Td colSpan={2}>{form.values.registros}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Válvulas</Table.Td><Table.Td colSpan={2}>{form.values.valvulas}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Conexões</Table.Td><Table.Td colSpan={2}>{form.values.conexoes}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Reservatório</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Tipo</Table.Td><Table.Td colSpan={2}>{form.values.reservatorio.tipo}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Capacidade</Table.Td><Table.Td colSpan={2}>{form.values.reservatorio.capacidade} L</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Extintores</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Tipo</Table.Td><Table.Td fw={500}>Peso (kg)</Table.Td><Table.Td fw={500}>Capacidade (L)</Table.Td></Table.Tr>
      {form.values.extintores.map((ext, index) => (
        <Table.Tr key={index}>
          <Table.Td>{ext.tipo}</Table.Td>
          <Table.Td>{ext.peso}</Table.Td>
          <Table.Td>{ext.capacidade}</Table.Td>
        </Table.Tr>
      ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Hidrantes</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Localização</Table.Td><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500}>Conexões</Table.Td></Table.Tr>
      {form.values.hidrantes.map((hid, index) => (
        <Table.Tr key={index}>
          <Table.Td>{hid.localizacao}</Table.Td>
          <Table.Td>{hid.diametro}</Table.Td>
          <Table.Td>{hid.conexoes}</Table.Td>
        </Table.Tr>
      ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Dutos</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Diâmetro</Table.Td><Table.Td fw={500} colSpan={2}>Comprimento (m)</Table.Td></Table.Tr>
      {form.values.dutos.map((duto, index) => (
        <Table.Tr key={index}>
          <Table.Td>{duto.diametro}</Table.Td>
          <Table.Td colSpan={2}>{duto.comprimento}</Table.Td>
        </Table.Tr>
      ))}
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Cobertura</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Tipo de Estrutura</Table.Td><Table.Td colSpan={2}>{form.values.tipoEstrutura}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Tipo de Telhamento</Table.Td><Table.Td colSpan={2}>{form.values.tipoTelhamento}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Espessura</Table.Td><Table.Td colSpan={2}>{form.values.espessura} cm</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Inclinação</Table.Td><Table.Td colSpan={2}>{form.values.inclinacao}%</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={3}>Peças</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={500}>Descrição</Table.Td><Table.Td fw={500} colSpan={2}>Seção</Table.Td></Table.Tr>
      {form.values.pecas.map((peca, index) => (
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
      <Table.Tr><Table.Td w="50%">Contêineres</Table.Td><Table.Td>{form.values.conteineres}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Banheiros Químicos</Table.Td><Table.Td>{form.values.banheirosQuimicos}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Andaimes</Table.Td><Table.Td>{form.values.andaimes}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Resíduos</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Resíduo Comum</Table.Td><Table.Td>{form.values.residuoComum} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Resíduo Contaminado</Table.Td><Table.Td>{form.values.residuoContaminado} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Destinação</Table.Td><Table.Td>{form.values.destinacaoResiduo}</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Escavação</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Profundidade</Table.Td><Table.Td>{form.values.profundidadeEscavacao} m</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Inclinação do Terreno</Table.Td><Table.Td>{form.values.inclinacaoTerreno}%</Table.Td></Table.Tr>
      <Table.Tr><Table.Td fw={700} ta="center" colSpan={2}>Volumes</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Terraplanagem</Table.Td><Table.Td>{form.values.volumes.terraplanagem} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Escavação</Table.Td><Table.Td>{form.values.volumes.escavacao} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Aterro</Table.Td><Table.Td>{form.values.volumes.aterro} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Enrocamento</Table.Td><Table.Td>{form.values.volumes.enrocamento} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Contenção</Table.Td><Table.Td>{form.values.volumes.contencao} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Taludamento</Table.Td><Table.Td>{form.values.volumes.taludamento} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Nivelamento</Table.Td><Table.Td>{form.values.volumes.nivelamento} m³</Table.Td></Table.Tr>
      <Table.Tr><Table.Td>Compactação</Table.Td><Table.Td>{form.values.volumes.compactacao} m³</Table.Td></Table.Tr>
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
    {form.values.fundacoes.map((fund, index) => (
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
    {form.values.superestrutura.map((sup, index) => (
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
    {form.values.metalicas.map((met, index) => (
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
    {form.values.madeira.map((mad, index) => (
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
  <Group justify="flex-end" mt="xl">
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
        <Button type="submit" loading={loading} color="#34623F">
            Salvar
        </Button>
        )}
    </Group>
    </Box>
        );
};
export default FormularioLevCampo;
