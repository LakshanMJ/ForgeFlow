import { useQuery } from "@tanstack/react-query";
import { getActiveProjectCategories } from "../api/project-categories";

export const useActiveProjectCategories = () => {
    return useQuery({
        queryKey: ['project-categories', 'active'],
        queryFn: getActiveProjectCategories,
    });
};