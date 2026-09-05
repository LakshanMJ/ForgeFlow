import { useQuery } from '@tanstack/react-query';
import { getProjectCategories } from '../api/project-categories';

export const useProjectCategories = () => {
    return useQuery({
        queryKey: ['project-categories'],
        queryFn: getProjectCategories,
    });
};