import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDepartment } from '../api/departments.api';
import type { CreateDepartmentData } from '../types/departments.types';

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateDepartmentData) =>
            createDepartment(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['departments'],
            });
        },
    });
};