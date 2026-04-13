import axios from 'axios';

let onUnauthorizedCallback: (() => void) | null = null;
export const setOnUnauthorizedCallback = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 1500000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) =>{
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
);

api.interceptors.response.use(response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refesh_token');
      if (refreshToken){
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/lala',
            {refresh : refreshToken}
          );
          const newAccessToken = response.data.access;
          localStorage.setItem('acess_token', newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest)
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          onUnauthorizedCallback?.();
          return Promise.reject(refreshError);
        }
    } else {
        onUnauthorizedCallback?.();
      }
    }
    return Promise.reject(error);
    }
  
)
export default api;