import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const removeToken = () => localStorage.removeItem('access_token');
const saveToken = (token: string) => localStorage.setItem('access_token', token);

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Code to refresh the token
      const refreshToken = await refreshAccessToken();

      // Retry the original request with the new token
      if (refreshToken) {
        originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export const wrapAxios = <T = unknown>(fn: (...args: any[]) => Promise<AxiosResponse<T>>) => {
  return async (...args: any[]): Promise<T> => {
    try {
      const response = await fn(...args);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await api.post<AxiosResponse<LoginResponse>>('/refresh-token', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    saveToken(response.data.data.access_token);
    return response.data.data.access_token;
  } catch (error) {
    removeToken();
    throw error;
  }
};
export default api;
