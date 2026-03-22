import React, { useState} from "react";
import { Box, Button, TextInput, Group, Stepper, Text, ActionIcon} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import { z } from "zod";

export interface PecaEstrutura {
  largura: number;
  altura: number;
  quantidade: number;
}

export interface Ambiente {
  id: number;
  nome: string;
  comprimento: number;
  largura: number;
  altura: number;
  area: number;
  pilares: PecaEstrutura[];
  vigas: PecaEstrutura[];
  lajes:{espessura: number, quantidade:number}[];
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
}

const ambienteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  comprimento: z.coerce.number().min(0.01, "Comprimento é obrigatório"),
  largura: z.coerce.number().min(0.01, "Largura é obrigatória"),
  altura: z.coerce.number().min(0.01, "Altura é obrigatória"),
  pilares: z.array(z.object({
    largura: z.coerce.number().min(0.01, "Largura é obrigatória"),
    altura: z.coerce.number().min(0.01, "Altura é obrigatória"),
    quantidade: z.coerce.number().int().min(1, "Quantidade é obrigatória"),
  })),
  vigas: z.array(z.object({
    largura: z.coerce.number().min(0.01, "Largura é obrigatória"),
    altura: z.coerce.number().min(0.01, "Altura é obrigatória"),
    quantidade: z.coerce.number().int().min(1, "Quantidade é obrigatória"),
  })),
  lajes: z.array(z.object({
    espessura: z.coerce.number().min(0.01, "Espessura é obrigatória"),
    quantidade: z.coerce.number().int().min(1, "Quantidade é obrigatória"),
  })),
    tomadas: z.coerce.number().int().min(1, "Obrigatório"),
    iluminacao: z.coerce.number().int().min(1, "Obrigatório"),
    interruptores: z.coerce.number().int().min(1, "Obrigatório"),
    cabos: z.array(z.object({
    circuito: z.string().min(1, "Circuito é obrigatório"),
    secao: z.coerce.number().min(0.01, "Seção é obrigatória"),
  })),
    disjuntores: z.array(z.object({
    amperagem: z.coerce.number().min(1, "Amperagem é obrigatória"),
    quantidade: z.coerce.number().int().min(1, "Quantidade é obrigatória"),
  })),
    tipoTomada: z.string().min(1, "Obrigatório"),
    tipoInterruptor: z.string().min(1, "Obrigatório"),
    tipoLuminaria: z.string().min(1, "Obrigatório"),
    alturaInstalacao: z.coerce.number().min(0.01, "Obrigatório"),
    ramais:z.array(z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        diametro: z.coerce.number().min(0.01, "Diâmetro é obrigatório"),
        comprimento: z.coerce.number().min(0.01, "Comprimento é obrigatório"),
    })),
    registros:z.coerce.number().int().min(1, "Registros é obrigatório"),
    valvulas:z.coerce.number().int().min(1, "Válvulas é obrigatório"),
    conexoes:z.coerce.number().int().min(1, "Conexões é obrigatório"),
    reservatorio:z.array(z.object({
        tipo:z.string().min(1, "Tipo é obrigatório"),
        capacidade:z.string().min(1, "Capacidade é obrigatória"),
    })),
    hastesAterramento: z.coerce.number().int().min(1, "Obrigatório"),
    caixasInspecao: z.coerce.number().int().min(1, "Obrigatório"),
    terminaisAereos: z.coerce.number().int().min(1, "Obrigatório"),
    quadrosRede: z.coerce.number().int().min(0, "Obrigatório"),
    patchCords: z.coerce.number().int().min(0, "Obrigatório"),
    cameras: z.coerce.number().int().min(0, "Obrigatório"),
    cabeamentos: z.array(z.object({
      circuito: z.string().min(1, "Circuito é obrigatório"),
      comprimento: z.coerce.number().min(0.01, "Comprimento é obrigatório"),
      tomadas: z.coerce.number().int().min(1, "Obrigatório"),
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
      comprimentoAmbiente: initialData?.comprimento ?? undefined,
      larguraAmbiente: initialData?.largura ?? undefined,
      alturaAmbiente: initialData?.altura ?? undefined,
      pilares: initialData?.pilares ?? [{ largura: undefined, altura: undefined, quantidade: undefined }],
      vigas: initialData?.vigas ?? [{ largura: undefined, altura: undefined, quantidade: undefined }],
      lajes: initialData?.lajes ?? [{ espessura: undefined, quantidade: undefined }],
      tomadas: initialData?.tomadas ?? undefined,
      iluminacao: initialData?.iluminacao ?? undefined,
      interruptores: initialData?.interruptores ?? undefined,
      cabos: initialData?.cabos ?? [{ circuito: "", secao: undefined }],
      disjuntores: initialData?.disjuntores ?? [{ amperagem: undefined, quantidade: undefined }],
      tipoTomada: initialData?.tipoTomada ?? "",
      tipoInterruptor: initialData?.tipoInterruptor ?? "",
      tipoLuminaria: initialData?.tipoLuminaria ?? "",
      alturaInstalacao: initialData?.alturaInstalacao ?? undefined,
      ramais: initialData?.ramais?? [{ nome: "", diametro: undefined, comprimento: undefined }],
      registros: initialData?.registros ?? undefined,
      valvulas: initialData?.valvulas ?? undefined,
      conexoes: initialData?.conexoes ?? undefined,
      reservatorio: initialData?.reservatorio ?? [{ tipo: "", capacidade: undefined }],
      hastesAterramento: initialData?.hastesAterramento ?? undefined,
      caixasInspecao: initialData?.caixasInspecao ?? undefined,
      terminaisAereos: initialData?.terminaisAereos ?? undefined,
      quadrosRede: initialData?.quadrosRede ?? undefined,
      patchCords: initialData?.patchCords ?? undefined,
      cameras: initialData?.cameras ?? undefined,
      cabeamentos: initialData?.cabeamentos ?? [{ circuito: "", comprimento: undefined, tomadas: undefined }],
        
     
    },
    validate: zodResolver(ambienteSchema),
  });

  const handleNextStep = () => {
  const result = form.validate();
  if (!result.hasErrors) {
    setActive((current) => current + 1);
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
     <Box component="form" onSubmit={form.onSubmit(handleSubmit)}  p="md">
        <Stepper active={active} allowNextStepsSelect={false} color="#478d57" >
        <Stepper.Step label="Ambiente">
        <TextInput
            label="Nome do Ambiente"
            placeholder="Ex: Cantina, Laboratório, Sala"
            {...form.getInputProps("nome")}
        />
        <Group mt="sm" grow>
        <TextInput
            mt="sm"
            label="Comprimento"
            type="number"
            rightSection="m²"
            {...form.getInputProps("comprimentoAmbiente")}
        />
        <TextInput
            mt="sm"
            label="Largura"
            type="number"
            rightSection="m²"
            {...form.getInputProps("larguraAmbiente")}
        />
        <TextInput
            mt="sm"
            label="Altura"
            type="number"
            rightSection="m²"
            {...form.getInputProps("alturaAmbiente")}
        />
    </Group>
    </Stepper.Step>
    <Stepper.Step label="Elétrica">
    <Text fw={700} mt="md">Pontos Elétricos</Text>
    <Group grow mt="sm">
        <TextInput
            label="Tomadas (TUG)"
            type="number"
            {...form.getInputProps("tomadas")}
        />
        <TextInput
            label="Iluminação"
            type="number"
            {...form.getInputProps("iluminacao")}
        />
        <TextInput
            label="Interruptores"
            type="number"
            {...form.getInputProps("interruptores")}
        />
    </Group>
   <Text fw={700} mt="md">Cabos por Circuito</Text>
    {form.values.cabos.map((_, index) => (
        <Box key={index} mt="sm">
        <Group align="flex-end">
        <TextInput 
            label="Circuito" 
            {...form.getInputProps(`cabos.${index}.circuito`)} />
        <TextInput 
            label="Seção (mm²)" 
            type="number" 
            {...form.getInputProps(`cabos.${index}.secao`)} />
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("cabos", index)}>
            <IconTrash size={16} />
        </ActionIcon>
        </Group>
        </Box>
        ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
        onClick={() => form.insertListItem("cabos", { circuito: "", secao: undefined })}>
        Adicionar circuito
    </Button>
    <Text fw={700} mt="md">Disjuntores</Text>
        {form.values.disjuntores.map((_, index) => (
        <Box key={index} mt="sm">  
        <Group align="flex-end">
        <TextInput 
            label="Amperagem (A)" 
            type="number" 
            {...form.getInputProps(`disjuntores.${index}.amperagem`)} />
            <TextInput 
            label="Quantidade" 
            type="number" 
            {...form.getInputProps(`disjuntores.${index}.quantidade`)} />
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("dijuntores", index)}>
            <IconTrash size={16} />
        </ActionIcon>
        </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
        onClick={() => form.insertListItem("disjuntores", { amperagem: undefined, quantidade: undefined })}>
        Adicionar disjuntor
    </Button>
    <Text fw={700} mt="md">Componentes</Text>
    <Group grow mt="sm">
        <TextInput 
            placeholder="Ex:Modelo/Marca"
            label="Tipo de Tomada" 
            {...form.getInputProps("tipoTomada")} 
        />
        <TextInput 
            placeholder="Ex:Modelo/Marca"
            label="Tipo de Interruptor" 
            {...form.getInputProps("tipoInterruptor")} 
        />
        <TextInput  
            placeholder="Ex:Modelo/Marca"
            label="Tipo de Luminária" 
            {...form.getInputProps("tipoLuminaria")} 
        />
    </Group>
        <TextInput mt="sm" 
            label="Altura de Instalação" 
            type="number" 
            rightSection="m" 
            {...form.getInputProps("alturaInstalacao")} 
        /> 
    <Text fw={700} mt="md">Aterramento e SPDA</Text>
    <Group grow mt="sm">
        <TextInput 
            placeholder="Ex: Quantidade"
            label="Hastes de Aterramento" 
            type="number" 
            {...form.getInputProps("hastesAterramento")} 
        />
        <TextInput 
            placeholder="Ex: Quantidade"
            label="Caixas de Inspeção" 
            type="number" 
            {...form.getInputProps("caixasInspecao")} 
        />
        <TextInput 
            placeholder="Ex: Quantidade"
            label="Terminais Aéreos" 
            type="number" 
            {...form.getInputProps("terminaisAereos")}
        />
    </Group>
    <Text fw={700} mt="md">Telefonia, Rede e CFTV</Text>
    <Group grow mt="sm">
        <TextInput
            placeholder="Ex: Quantidade" 
            label="Quadros de Rede" 
            type="number" 
            {...form.getInputProps("quadrosRede")}
        />
        <TextInput 
            placeholder="Ex: Quantidade"
            label="Patch Cords" 
            type="number" 
            {...form.getInputProps("patchCords")} 
        />
        <TextInput 
            placeholder="Ex: Quantidade"
            label="Câmeras" 
            type="number" 
            {...form.getInputProps("cameras")} 
        />
    </Group>
    <Text fw={700} mt="md">Cabeamento por Circuito</Text>
        {form.values.cabeamentos.map((_, index) => (
        <Box key={index} mt="sm">
        <Group align="flex-end">
        <TextInput 
            style={{ flex: 1 }} 
            label="Circuito" 
            placeholder="Ex: CP1" 
            {...form.getInputProps(`cabeamentos.${index}.circuito`)} 
        />
        <TextInput 
            style={{ flex: 1 }} 
            label="Comprimento" type="number" 
            rightSection="m" 
            {...form.getInputProps(`cabeamentos.${index}.comprimento`)} 
        />
        <TextInput 
            placeholder="Ex: Quantidade"
            style={{ flex: 1 }} 
            label="Tomadas/ Keystone" type="number" 
            {...form.getInputProps(`cabeamentos.${index}.tomadas`)} 
        />
        <ActionIcon color="red" variant="subtle" mb={4} onClick={() => form.removeListItem("cabeamentos", index)}>
            <IconTrash size={16} />
        </ActionIcon>
        </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("cabeamentos", { circuito: "", comprimento: undefined, tomadas: undefined })}>
    Adicionar circuito
    </Button>
    </Stepper.Step>
    <Stepper.Step label="Hidráulica">
    <Text fw={700} mt="md">Ramais</Text>
    {form.values.cabos.map((_, index) => (
        <Box key={index} mt="sm">
        <Group align="flex-end">
        <TextInput 
            style={{ flex: 1 }}
            label="Nome" 
            {...form.getInputProps(`ramais.${index}.nome`)} 
        />
        <TextInput 
            style={{ flex: 1 }}
            label="Diâmetro" 
            type="number" 
            {...form.getInputProps(`ramais.${index}.diametro`)} 
        />
        <TextInput 
            style={{ flex: 1 }}
            label="Comprimento" 
            type="number" 
            rightSection="m"
            {...form.getInputProps(`ramais.${index}.comprimento`)} 
        />
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("ramais", index)}>
            <IconTrash size={16} />
        </ActionIcon>
        </Group>
        </Box>
        ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
        onClick={() => form.insertListItem("cabos", { circuito: "", secao: undefined })}>
        Adicionar ramal
    </Button>
   <Text fw={700} mt="md">Quantidades</Text>
    <Group grow mt="sm">
        <TextInput 
            label="Registros" 
            type="number" 
            {...form.getInputProps("registros")} 
        />
        <TextInput 
            label="Válvulas" 
            type="number" 
            {...form.getInputProps("valvulas")} 
        />
        <TextInput label="Conexões" 
            type="number" 
            {...form.getInputProps("conexoes")} 
        />
    </Group>
    <Text fw={700} mt="md">Reservatório</Text>
    <Group grow mt="sm">
        <TextInput 
            label="Tipo" 
            placeholder="Ex: Caixa d'água, Cisterna" 
            {...form.getInputProps("reservatorio.tipo")} 
        />
        <TextInput 
            label="Capacidade" 
            type="number" 
            rightSection="L" 
            {...form.getInputProps("reservatorio.capacidade")} 
        />
    </Group>
    </Stepper.Step>
    <Stepper.Step label="Estrutura">
    <Text fw={700} mt="md">Pilares</Text>
    {form.values.pilares.map((_, index) => (
    <Box key={index} mt="sm">
    <Group justify="space-between">
      <Text fw={500}>{index + 1}</Text>
      <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("pilares", index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
    <Group grow>
      <TextInput label="Largura" type="number" rightSection="m" {...form.getInputProps(`pilares.${index}.largura`)} />
      <TextInput label="Altura" type="number" rightSection="m" {...form.getInputProps(`pilares.${index}.altura`)} />
      <TextInput label="Quantidade" type="number" {...form.getInputProps(`pilares.${index}.quantidade`)} />
    </Group>
  </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("pilares", { largura: undefined, altura: undefined, quantidade: undefined })}>
    Adicionar grupo de pilares
    </Button>
    <Text fw={700} mt="md">Vigas</Text>
    {form.values.vigas.map((_, index) => (
    <Box key={index} mt="sm">
    <Group justify="space-between">
      <Text fw={500}>{index + 1}</Text>
      <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("pilares", index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
    <Group grow>
      <TextInput label="Largura" type="number" rightSection="m" {...form.getInputProps(`vigas.${index}.largura`)} />
      <TextInput label="Altura" type="number" rightSection="m" {...form.getInputProps(`vigas.${index}.altura`)} />
      <TextInput label="Quantidade" type="number" {...form.getInputProps(`vigas.${index}.quantidade`)} />
    </Group>
  </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("vigas", { largura: undefined, altura: undefined, quantidade: undefined })}>
    Adicionar grupo de vigas
    </Button>
    <Text fw={700} mt="md">Lajes</Text>
    {form.values.lajes.map((_, index) => (
    <Box key={index} mt="sm">
    <Group justify="space-between">
      <Text fw={500}>{index + 1}</Text>
      <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem("pilares", index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
        <Group grow>
        <TextInput label="Espessura" type="number" rightSection="m" {...form.getInputProps(`lajes.${index}.espessura`)} />
        <TextInput label="Quantidade" type="number" {...form.getInputProps(`lajes.${index}.quantidade`)} />
        </Group>
    </Box>
    ))}
    <Button mt="xs" variant="light" color="#34623F" leftSection={<IconPlus size={14} />}
    onClick={() => form.insertListItem("lajes", { espessura: undefined, quantidade: undefined })}>
    Adicionar grupo de lajes
    </Button>
    </Stepper.Step>
    
    <Stepper.Step label="Confirmação">
      <Text>Confira os dados:</Text>
      <Text>Nome: {form.values.nome}</Text>
      <Text>Comprimento: {form.values.comprimentoAmbiente}m²</Text>
      <Text>Largura: {form.values.larguraAmbiente}m²</Text>
      <Text>Altura: {form.values.alturaAmbiente}m²</Text>
      <Text mt="sm" fw={700}> Área: {form.values.comprimentoAmbiente && form.values.larguraAmbiente? form.values.comprimentoAmbiente * form.values.larguraAmbiente: "-"}m²</Text>
    </Stepper.Step>
  </Stepper>
  <Group justify="flex-end" mt="xl">
      {active > 0 && (
        <Button variant="subtle" color="gray" onClick={() => setActive((c) => c - 1)} disabled={loading}>
          Voltar
        </Button>
      )}
      {active < 2 && (
        <Button onClick={() => setActive((c) => c + 1)} color="#34623F">
          Próximo
        </Button>
      )}
      {active === 2 && (
        <Button type="submit" loading={loading}>
          Salvar
        </Button>
      )}
    </Group>
  </Box>
  );
};
export default FormularioLevCampo;
