export const capitalizar = (texto: string) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export const capitalizarNome = (texto: string) => {
    return texto
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
};

export const maiusculas = (texto: string) => {
    return texto.toUpperCase();
};

export const formatarData = (data: string | null) => {
    if (data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    return ""
};