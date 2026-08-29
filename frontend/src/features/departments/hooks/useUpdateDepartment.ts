import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface UpdateDepartmentData {
    name?: string;
    description?: string;
}

export function useUpdateDepartment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: UpdateDepartmentData;
        }) => {
            const response = await api.patch(
                `/departments/${id}`,
                data,
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['departments'],
            });
        },
    });
}