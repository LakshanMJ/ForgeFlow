
import api from '@/lib/axios';
import type { User } from '../components/UsersPage';

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
};