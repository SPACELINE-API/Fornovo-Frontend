import { z } from 'zod';

export const projetoSchema = z
  .object({
    nome_projeto: z.string().min(1, 'Nome é obrigatório'),
    cliente: z.string().min(1, 'Cliente é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
    cidade: z.string().min(1),
    estado: z.string().min(2).max(2),
    bairro: z.string().min(1),
    numero: z.string().optional(),
    engenheiro: z.string().min(1),
    data_inicio: z.string().min(1),
    data_fim: z.string().optional().nullable().or(z.literal('')),
    status: z.enum(['Pendente', 'Em andamento', 'Em revisão', 'Concluído']),
  })
  .refine(
    (data) => {
      if (data.data_fim) {
        return data.data_fim >= data.data_inicio;
      }
      return true;
    },
    {
      message: 'Data final não pode ser anterior',
      path: ['data_fim'],
    },
  );
