import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, AuthHeader, LoginResponse, User } from './types';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const saveToken = (token: string) => localStorage.setItem('access_token', token);

export const getToken = (): string | null => localStorage.getItem('access_token');

const removeToken = () => localStorage.removeItem('access_token');

// Функция для обновления токена
const refreshToken = async () => {
  try {
    const response = await api.post<ApiResponse<LoginResponse>>('/refresh-token', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    saveToken(response.data.data.access_token);
    return response.data.data.access_token;
  } catch (error) {
    removeToken();
    throw error;
  }
};

// Функция для добавления токена в заголовок запроса
const addAuthHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const authHeader: AuthHeader = {};
  const token = getToken();
  if (token) {
    authHeader.Authorization = `Bearer ${ token }`;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      ...authHeader,
    },
  };
};

// Функция для обработки ошибок
const handleError = async (error: AxiosError) => {
  if (error.response?.status === 401 && error.config && !(error.config as any).__isRetryRequest) {
    try {
      const token = await refreshToken();
      error.config.headers.Authorization = `Bearer ${ token }`;
      (error.config as any).__isRetryRequest = true;
      return api(error.config);
    } catch (refreshError) {
      removeToken();
      window.location.href = '/';
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

api.interceptors.request.use(addAuthHeader as any);
api.interceptors.response.use((response: AxiosResponse<ApiResponse<User>>) => response, handleError);