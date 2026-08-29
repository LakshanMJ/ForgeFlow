import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserData, User } from "../types/user.types";
import api from "@/lib/axios";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserData): Promise<User> => {
            const response = await api.post<User>('/users', data);

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};