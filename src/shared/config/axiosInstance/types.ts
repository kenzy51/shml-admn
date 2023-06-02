
export interface AuthHeader {
  Authorization?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  name: string;
  login: string;
}
