export interface DecodedToken {
  nivel_usuario: 'Administrador' | 'Projetista' | 'Revisor';
  id_usuario: string;
  nome_usuario: string;
  exp: number;
  iat: number;
}
