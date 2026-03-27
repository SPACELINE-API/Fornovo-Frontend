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

export type Extintores = {
  tipo : string,
  peso : number,
  capacidade : number
}

export type Hidrante = {
  localizacao : string,
  diametro : number,
  conexoes : number
}

export type Dutos = {
  diametro : number,
  comprimento : number
}

export type Pecas = {
  descricao : string,
  secao : string
}

export type Volumes = {
  terraplanagem : number,
  escavacao : number,
  aterro : number,
}

export type LevantamentoDados = {
  nome: string;
  comprimento: number;
  largura: number;
  altura: number;
  area: number,

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
  registros : number;
  valvulas : number;
  conexoes : number;
  extintores : Extintores[];
  hidrantes : Hidrante[];
  dutos : Dutos[];

  reservatorio: Reservatorio;

  containeres: number;
  banheirosQuimicos: number;
  andaimes : number;

  residuoComum : number,
  residuoContaminado : number,
  destinacaoResiduo : string

  profundidadeEscavacao : number,
  inclinacaoTerreno : number
  escavacao : number

  volumes : Volumes;
  enrocamento : number;
  contencao : number;
  taludamento : number;
  nivelamento : number;
  compactacao : number;

  tipoEstrutura : string,
  tipoTelhamento : string,
  espessura : number,
  inclinacao : number,
  pecas : Pecas;

  fundacoes: Fundacao[];
};