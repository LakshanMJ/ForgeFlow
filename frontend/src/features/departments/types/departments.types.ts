export interface Department {
    id: string;
    name: string;
    description?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    _count?: {
        users: number;
    };
}

export interface CreateDepartmentData {
    name: string;
    description?: string;
}

export interface UpdateDepartmentData {
    name?: string;
    description?: string;
}