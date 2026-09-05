import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import {
    updateProject,
} from '../api/projects.api';

import type {
    UpdateProjectData,
} from '../types/project.types';

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateProjectData;
        }) => updateProject(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });

            queryClient.invalidateQueries({
                queryKey: ['projects', variables.id],
            });
        },
    });
};
