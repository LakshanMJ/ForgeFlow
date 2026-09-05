import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { createProject} from '../api/projects.api';

import type {CreateProjectData} from '../types/project.types';

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProjectData) =>
            createProject(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
};