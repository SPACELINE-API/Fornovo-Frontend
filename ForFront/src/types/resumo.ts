export type Cabo = {
  circuito: string;
  secao: number;
};

export type Disjuntor = {
  amperagem: number;
  quantidade: number;
};

export type Cabeamento = {
  circuito: string;
  comprimento: number;
};

export type Ramal = {
  nome: string;
  diametro: number;
  comprimento: number;
};

export type Fundacao = {
  tipo: string;
  profundidade: number;
  volumeLastro: number;
  volumeConcreto: number;
  pesoFerragem: number;
  pesoEstribo: number;
  areaForma: number;
};

export type Reservatorio = {
  tipo: string;
  capacidade: number;
};

export type LevantamentoDados = {
  nome: string;
  comprimentoAmbiente: number;
  larguraAmbiente: number;
  alturaAmbiente: number;
  areaAmbiente: number,

  tomadas: number;
  iluminacao: number;
  interruptores: number;
  tipoTomada: string;
  tipoInterruptor: string;
  tipoLuminaria: string;
  alturaInstalacao: number;

  cabos: Cabo[];
  disjuntores: Disjuntor[];

  hastesAterramento: number;
  caixasInspecao: number;
  terminaisAereos: number;

  quadrosRede: number;
  patchCords: number;
  cameras: number;

  cabeamentos: Cabeamento[];
  ramais: Ramal[];

  reservatorio: Reservatorio;

  conteineres: number;
  banheirosQuimicos: number;

  fundacoes: Fundacao[];
};