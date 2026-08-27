
import api from '@/lib/axios';
import type {
  Role,
  CreateRoleData,
  UpdateRoleData,
} from '../types/role.types.ts';

// GET /roles
export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>('/roles');

  return response.data;
};

// POST /roles
export const createRole = async (
  data: CreateRoleData
): Promise<Role> => {
  const response = await api.post<Role>('/roles', data);

  return response.data;
};

// GET /roles/:id
export const getRole = async (
  id: string
): Promise<Role> => {
  const response = await api.get<Role>(`/roles/${id}`);

  return response.data;
};

// PATCH /roles/:id
export const updateRole = async (
  id: string,
  data: UpdateRoleData
): Promise<Role> => {
  const response = await api.patch<Role>(
    `/roles/${id}`,
    data
  );

  return response.data;
};

// DELETE /roles/:id
export const deleteRole = async (
  id: string
): Promise<void> => {
  await api.delete(`/roles/${id}`);
};