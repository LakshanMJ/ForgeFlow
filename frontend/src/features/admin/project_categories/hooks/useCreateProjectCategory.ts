import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectCategory } from "../api/project-categories";

export const useCreateProjectCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProjectCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-categories'],
            });
        },
    });
};
