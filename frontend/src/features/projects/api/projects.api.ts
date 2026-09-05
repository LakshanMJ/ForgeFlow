import api from '@/lib/axios';

import type {
    Project,
    CreateProjectData,
    UpdateProjectData,
} from '../types/project.types';

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get('/projects');

    return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);

    return response.data;
};

export const createProject = async (
    data: CreateProjectData,
): Promise<Project> => {
    const response = await api.post('/projects', data);

    return response.data;
};

export const updateProject = async (
    id: string,
    data: UpdateProjectData,
): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, data);

    return response.data;
};

export const deleteProject = async (id: string): Promise<Project> => {
    const response = await api.delete(`/projects/${id}`);

    return response.data;
};

export const archiveProject = async (id: string): Promise<Project> => {
    const response = await api.patch(`/projects/${id}/archive`);

    return response.data;
};

export const unarchiveProject = async (id: string): Promise<Project> => {
    const response = await api.patch(`/projects/${id}/unarchive`);

    return response.data;
};