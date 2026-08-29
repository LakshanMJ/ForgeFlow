import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user.types";
import api from "@/lib/axios";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: UpdateUserParams): Promise<User> => {
            const response = await api.patch<User>(
                `/users/${id}`,
                data,
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