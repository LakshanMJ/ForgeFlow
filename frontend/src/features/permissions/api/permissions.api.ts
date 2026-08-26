import api from '@/lib/axios';
import type { Permission } from '../types/permission.types';

export const permissionsApi = {
  getAll: async (): Promise<Permission[]> => {
    const response = await api.get<Permission[]>('/permissions');
    return response.data;
  },

  getById: async (id: string): Promise<Permission> => {
    const response = await api.get<Permission>(
      `/permissions/${id}`,
    );
    return response.data;
  },
};