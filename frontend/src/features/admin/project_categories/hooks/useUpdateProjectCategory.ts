import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectCategory } from "../api/project-categories";
import type { UpdateProjectCategoryData } from "../types/project-categories.types";

export const useUpdateProjectCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateProjectCategoryData;
        }) => updateProjectCategory(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-categories'],
            });
        },
    });
};
