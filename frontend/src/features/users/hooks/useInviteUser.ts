import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InviteUserData, User } from '../types/user.types';
import api from '@/lib/axios';

export const useInviteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: InviteUserData): Promise<User> => {
            console.log('🔥 MUTATION RECEIVED:', data);
            console.log('🔥 MUTATION TYPE:', typeof data);
            const response = await api.post<User>(
                '/users/invite',
                data
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};