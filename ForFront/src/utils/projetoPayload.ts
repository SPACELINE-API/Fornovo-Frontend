export const buildProjetoPayload = (values: any) => {
  return {
    ...values,

    numero: values.numero ?? null,

    localizacao: `${values.bairro}, ${values.cidade} - ${values.estado}${
      values.numero ? `, ${values.numero}` : ''
    }`,

    engenheiro: values.engenheiro,

    data_inicio: values.data_inicio || null,

    data_fim: values.data_fim || null,
  };
};
