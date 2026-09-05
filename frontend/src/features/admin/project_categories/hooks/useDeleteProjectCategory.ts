import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectCategory } from "../api/project-categories";

export const useDeleteProjectCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProjectCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-categories'],
            });
        },
    });
};