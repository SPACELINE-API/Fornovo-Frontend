export const capitalizar = (texto: string) => {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export const capitalizarNome = (texto: string) => {
  return texto
    .toLowerCase()
    .split(' ')
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
};

export const maiusculas = (texto: string) => {
  return texto.toUpperCase();
};
export const formatarData = (data: string | null | undefined) => {
  if (!data) return '';
  try {
    const dataFormatada = data.includes('T') ? data : `${data}T00:00`;
    const date = new Date(dataFormatada);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return data;
  }
};