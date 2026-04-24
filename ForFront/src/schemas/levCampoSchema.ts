import { z } from 'zod';

const num = (msg = 'Obrigatório') => z.number({ invalid_type_error: msg });
const int = (msg = 'Obrigatório') => z.number({ invalid_type_error: msg }).int('Deve ser inteiro');

export const ambienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  comprimento: num('Comprimento é obrigatório'),
  largura: num('Largura é obrigatória'),
  altura: num('Altura é obrigatória'),
  tomadas: int('Tomadas é obrigatório'),
  iluminacao: int('Iluminação é obrigatória'),
  interruptores: int('Interruptores é obrigatório'),
  cabos: z.array(
    z.object({
      circuito: z.string().min(1, 'Circuito é obrigatório'),
      secao: num('Seção é obrigatória'),
    }),
  ),
  disjuntores: z.array(
    z.object({
      amperagem: num('Amperagem é obrigatória'),
      quantidade: int('Quantidade é obrigatória'),
    }),
  ),
  tipoTomada: z.string().optional(),
  tipoInterruptor: z.string().optional(),
  tipoLuminaria: z.string().optional(),
  alturaInstalacao: num('Altura é obrigatória'),
  hastesAterramento: int('Hastes é obrigatório'),
  caixasInspecao: int('Caixa é obrigatório'),
  terminaisAereos: int('Terminais é obrigatório'),
  quadrosRede: int('Quadros de rede é obrigatório'),
  patchCords: int('Patch é obrigatório'),
  cameras: int('Cameras é obrigatório'),
  cabeamentos: z.array(
    z.object({
      circuito: z.string().min(1, 'Circuito é obrigatório'),
      comprimento: num('Comprimento é obrigatório'),
      tomadas: int('Quantidade é obrigatória'),
    }),
  ),
  ramais: z.array(
    z.object({
      nome: z.string().min(1, 'Nome é obrigatório'),
      diametro: z.string().min(1, 'Diâmetro é obrigatório'),
      comprimento: num('Comprimento é obrigatório'),
    }),
  ),
  registros: int('Registros é obrigatório'),
  valvulas: int('Válvulas é obrigatório'),
  conexoes: int('Conexões é obrigatório'),
  reservatorio: z.object({
    tipo: z.string().min(1, 'Tipo é obrigatório'),
    capacidade: num('Capacidade é obrigatória'),
  }),
  extintores: z.array(
    z.object({
      tipo: z.string().optional(),
      peso: num('Peso é obrigatório'),
      capacidade: int('Capacidade é obrigatória'),
    }),
  ),
  hidrantes: z.array(
    z.object({
      localizacao: z.string().optional(),
      diametro: z.string().min(1, 'Diâmetro é obrigatório'),
      conexoes: num('Conexões é obrigatório'),
    }),
  ),
  dutos: z.array(
    z.object({
      diametro: z.string().min(1, 'Diâmetro é obrigatório'),
      comprimento: num('Comprimento é obrigatório'),
    }),
  ),
  tipoTelhamento: z.string().min(1, 'Obrigatório'),
  tipoEstrutura: z.string().min(1, 'Obrigatório'),
  espessura: num('Espessura é obrigatória'),
  inclinacao: num('Inclinação é obrigatória'),
  pecas: z.array(
    z.object({
      descricao: z.string().min(1, 'Descrição é obrigatória'),
      secao: z.string().min(1, 'Seção é obrigatória'),
    }),
  ),
  conteineres: num('Conteineres é obrigatório'),
  banheirosQuimicos: num('Banheiros é obrigatório'),
  andaimes: num('Andaimes é obrigatório'),
  residuoComum: num('Residuo Comum é obrigatório'),
  residuoContaminado: num('Residuo Contaminado é obrigatório'),
  destinacaoResiduo: z.string().optional(),
  profundidadeEscavacao: num('Obrigatória'),
  inclinacaoTerreno: num('Obrigatória'),
  volumes: z.object({
    terraplanagem: num('Obrigatória'),
    escavacao: num('Obrigatória'),
    aterro: num('Obrigatória'),
    enrocamento: num('Obrigatória'),
    contencao: num('Obrigatória'),
    taludamento: num('Obrigatória'),
    nivelamento: num('Obrigatória'),
    compactacao: num('Obrigatória'),
  }),
  fundacoes: z.array(
    z.object({
      tipo: z.string().min(1, 'Obrigatório'),
      profundidade: num('Obrigatória'),
      volumeLastro: num('Obrigatório'),
      volumeConcreto: num('Obrigatório'),
      pesoFerragem: num('Obrigatório'),
      pesoEstribo: num('Obrigatório'),
      areaForma: num('Obrigatória'),
    }),
  ),
  superestrutura: z.array(
    z.object({
      tipo: z.string().min(1, 'Obrigatório'),
      largura: num('Obrigatória'),
      altura: num('Obrigatória'),
      volumeConcreto: num('Obrigatório'),
      pesoFerragem: num('Obrigatório'),
      pesoEstribo: num('Obrigatório'),
      areaForma: num('Obrigatória'),
      janelaLancamento: z.string().optional(),
    }),
  ),
  metalicas: z.array(
    z.object({
      tipo: z.string().min(1, 'Obrigatório'),
      tipoPerfil: z.string().min(1, 'Obrigatório'),
      secao: z.string().min(1, 'Obrigatório'),
      peso: num('Obrigatório'),
      elastomero: num('Obrigatório'),
    }),
  ),
  madeira: z.array(
    z.object({
      tipoPeca: z.string().min(1, 'Obrigatório'),
      secao: z.string().min(1, 'Obrigatório'),
      pesoTotal: num('Obrigatório'),
      tipoTelhamento: z.string().min(1, 'Obrigatório'),
    }),
  ),
});
