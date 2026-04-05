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

  const partes = data.split('-');

  if (partes.length !== 3) return data;

  const [ano, mes, dia] = partes;

  return `${dia}/${mes}/${ano}`;
};