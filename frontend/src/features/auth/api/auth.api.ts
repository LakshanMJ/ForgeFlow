import api from '@/lib/axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    organization: string;
    roles: string[];
  };
}

export const authApi = {
  login: async (
    data: LoginRequest,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      data,
    );

    return response.data;
  },
};