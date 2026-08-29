export interface UserRole {
    id: string;
    name: string;
    displayName: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string | null;
    department?: string | null;
    avatar?: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    createdAt: string;
    roles: UserRole[];
}

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    jobTitle?: string;
    department?: string;
    role?: string;
}

export interface InviteUserData {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string;
    department?: string;
    role?: string;
    avatar?: File | null;
}

export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    jobTitle?: string;
    department?: string;
    role?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export type UserFormMode = 'create' | 'view' | 'edit';

export interface UserFormProps {
    mode: UserFormMode;
    existingUserDetail?: User;
    onSubmit?: (
        data: CreateUserData | UpdateUserData,
    ) => void;
}