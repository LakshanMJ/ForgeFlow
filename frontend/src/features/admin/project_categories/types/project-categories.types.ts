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
}

export interface UpdateProjectCategoryData {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
}

export interface ProjectCategoryColumn {
    key: string;
    label: string;
    render: (dept: ProjectCategory) => React.ReactNode;
}

export interface ProjectCategoryFormData {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
}