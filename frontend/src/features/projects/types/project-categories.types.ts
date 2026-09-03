export interface ProjectCategory {
    id: string;
    organizationId: string;
    name: string;
    description?: string | null;
    color?: string | null;
    isActive: boolean;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectCategoryData {
    name: string;
    description?: string;
    color?: string;
    isActive?: boolean;
    isSystem?: boolean;
}

export interface UpdateProjectCategoryData {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
}