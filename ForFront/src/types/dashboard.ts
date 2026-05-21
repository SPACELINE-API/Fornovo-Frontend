export interface KpiData {
  funcionarios: number;
  projetos: number;
  normas: number;
  issuesAbertas: number;
}

export interface StatusData {
  name: string;
  value: number;
  color: `#${string}`;
}

export interface ProjetosPorMes {
  mes: string;
  quantidade: number;
}

export interface MemorialPorMes {
  mes: string;
  quantidade: number;
}

export interface ProjetoAtrasado {
  label: string;
  valor: number;
}

export interface TopNorma {
  nome: string;
  usos: number;
}

export interface NormasPorAno {
  ano: number;
  quantidade: number;
}

export type TipoNotificacao = 'info' | 'sucesso' | 'alerta' | 'erro';

export interface Notificacao {
  id: number;
  mensagem: string;
  tipo: TipoNotificacao;
  data: string;
  usuario?: string;
  lida?: boolean;
}

export interface MetricaIA {
  label: string;
  valor: number;
}

export interface ConformidadeIA {
  valor: number;
  status: string;
  cor: string;
  metricas: MetricaIA[];
}