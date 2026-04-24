import api from './apiService';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('usuarios/login', {
      email,
      senha: password,
    });
    return response.data;
  },
};
