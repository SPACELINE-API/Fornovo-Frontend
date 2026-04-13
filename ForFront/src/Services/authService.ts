import api from './apiService';

export const login = async (email: string, password: string): Promise<void> => {
  const response = await api.post('/', { email, password });
  const {access,  refresh} = response.data
    localStorage.settItem('access_token', access);
    localStorage.setItem('refresh_token', refresh); 
};

export const logout = ():void =>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export default login;