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