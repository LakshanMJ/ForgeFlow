import {
    useQuery,
} from '@tanstack/react-query';

import {
    getProject,
} from '../api/projects.api';

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });
};