export interface Department {
    id: string;
    name: string;
    description?: string | null;
    openPositions: number;
    managerId?: string;
    manager: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null;
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
    managerId?: string;
    openPositions: number;
}

export type DepartmentFormData = {
    name: string;
    description: string;
    managerId: string;
    parentDepartmentName: string;
    openPositions: number;
};

export interface UpdateDepartmentData {
    name?: string;
    description?: string;
    managerId?: string;
    openPositions: number;
}

export type DepartmentColumn = {
    key: string;
    label: string;
    render: (dept: Department) => React.ReactNode;
};