import type {
  StatusData,
  ProjetosPorMes,
  MemorialPorMes,
  ProjetoAtrasado,
  TopNorma,
  ConformidadeIA,
  Notificacao,
} from '../types/dashboard';

export const MOCK_STATUS: StatusData[] = [
  {
    name: 'Concluído',
    value: 12,
    color: '#34623F',
  },
  {
    name: 'Em andamento',
    value: 8,
    color: '#89c094',
  },
  {
    name: 'Revisão',
    value: 5,
    color: '#f59e0b',
  },
  {
    name: 'Pendente',
    value: 3,
    color: '#e5e7eb',
  },
];

export const MOCK_MESES: ProjetosPorMes[] = [
  { mes: 'Dez', quantidade: 2 },
  { mes: 'Jan', quantidade: 5 },
  { mes: 'Fev', quantidade: 3 },
  { mes: 'Mar', quantidade: 7 },
  { mes: 'Abr', quantidade: 4 },
  { mes: 'Mai', quantidade: 9 },
];

export const MOCK_MEMORIAIS: MemorialPorMes[] = [
  { mes: 'Dez', quantidade: 12 },
  { mes: 'Jan', quantidade: 18 },
  { mes: 'Fev', quantidade: 14 },
  { mes: 'Mar', quantidade: 27 },
  { mes: 'Abr', quantidade: 21 },
  { mes: 'Mai', quantidade: 35 },
];

export const MOCK_ATRASADOS: ProjetoAtrasado[] = [
  {
    label: 'No prazo',
    valor: 78,
  },
  {
    label: 'Atrasados',
    valor: 22,
  },
];

export const MOCK_TOP_NORMAS: TopNorma[] = [
  {
    nome: 'NBR 6118',
    usos: 42,
  },
  {
    nome: 'NBR 15575',
    usos: 31,
  },
  {
    nome: 'NBR 6120',
    usos: 24,
  },
  {
    nome: 'NBR 8681',
    usos: 18,
  },
  {
    nome: 'NBR 5626',
    usos: 14,
  },
];

export const MOCK_NOTIFICACOES: Notificacao[] = [
  {
    id: 1,
    mensagem: 'Projeto "Reforma Sede" entrou em revisão',
    tipo: 'alerta',
    data: 'Hoje, 14:32',
    usuario: 'Carlos Lima',
  },
  {
    id: 2,
    mensagem: 'Norma NBR 15575 foi atualizada',
    tipo: 'info',
    data: 'Hoje, 13:10',
    usuario: 'Sistema',
  },
  {
    id: 3,
    mensagem: 'Projeto "Torre Sul" concluído com sucesso',
    tipo: 'sucesso',
    data: 'Hoje, 11:45',
    usuario: 'Ana Souza',
  },
  {
    id: 4,
    mensagem: 'Novo funcionário cadastrado: Pedro Alves',
    tipo: 'info',
    data: 'Hoje, 10:20',
    usuario: 'Admin',
  },
  {
    id: 5,
    mensagem: 'Levantamento pendente de aprovação',
    tipo: 'alerta',
    data: 'Ontem, 17:55',
    usuario: 'Marcos R.',
  },
  {
    id: 6,
    mensagem: 'Projeto "Edifício Central" atrasado',
    tipo: 'erro',
    data: 'Ontem, 16:30',
    usuario: 'Sistema',
  },
  {
    id: 7,
    mensagem: 'Memorial "Shopping Plaza" revisado',
    tipo: 'sucesso',
    data: 'Ontem, 15:05',
    usuario: 'Fernanda G.',
  },
  {
    id: 8,
    mensagem: 'Norma NBR 6118 em revisão',
    tipo: 'info',
    data: 'Ontem, 14:00',
    usuario: 'Sistema',
  },
];

export const MOCK_CONFORMIDADE: ConformidadeIA = {
  valor: 91,

  status: 'Excelente',

  cor: '#16a34a',

  metricas: [
    {
      label: 'Precisão técnica',
      valor: 94,
    },
    {
      label: 'Conformidade normativa',
      valor: 91,
    }
  ],
};