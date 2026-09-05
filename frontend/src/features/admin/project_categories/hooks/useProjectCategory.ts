import { useQuery } from "@tanstack/react-query";
import { getProjectCategory } from "../api/project-categories";

export const useProjectCategory = (id: string) => {
    return useQuery({
        queryKey: ['project-categories', id],
        queryFn: () => getProjectCategory(id),
        enabled: !!id,
    });
};