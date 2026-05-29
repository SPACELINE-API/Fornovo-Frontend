export type StatusProjeto = 'Pendente' | 'Em andamento' | 'Em revisão' | 'Concluído';

export interface ProjetoFormsData {
  id: number;
  nome_projeto: string;
  cliente: string;
  descricao: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  numero?: number;
  engenheiro: string;
  data_inicio: string | null;
  data_fim?: string | null;
  status: StatusProjeto;
}

export interface ProjetoListagem {
  id_projeto: string;
  nome_projeto: string;
  descricao: string;
  status: string;
  engenheiro_nome: string;
  data_fim: string;
  localizacao: string;
}

export interface ModalCriarProjetoProps {
  opened: boolean;
  onClose: () => void;
  atualizarProjetos: () => void;
}

export interface ModalEditarProjetoProps {
  opened: boolean;
  onClose: () => void;
  atualizarProjetos: () => void;
  projeto: ProjetoFormsData | null;
}
