import api from '@/lib/axios';
import type { CreateProjectCategoryData, ProjectCategory, UpdateProjectCategoryData } from '../types/project-categories.types';


// GET /project-categories
export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
    const response = await api.get<ProjectCategory[]>('/project-categories');
    return response.data;
};

// POST /project-categories
export const createProjectCategory = async (
    data: CreateProjectCategoryData
): Promise<ProjectCategory> => {
    const response = await api.post<ProjectCategory>(
        '/project-categories',
        data
    );

    return response.data;
};

// GET /project-categories/:id
export const getProjectCategory = async (
    id: string
): Promise<ProjectCategory> => {
    const response = await api.get<ProjectCategory>(
        `/project-categories/${id}`
    );

    return response.data;
};

// PATCH /project-categories/:id
export const updateProjectCategory = async (
    id: string,
    data: UpdateProjectCategoryData
): Promise<ProjectCategory> => {
    const response = await api.patch<ProjectCategory>(
        `/project-categories/${id}`,
        data
    );

    return response.data;
};

// DELETE /project-categories/:id
export const deleteProjectCategory = async (
    id: string
): Promise<void> => {
    await api.delete(`/project-categories/${id}`);
};