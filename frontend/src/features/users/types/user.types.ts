export interface UserRole {
    id: string;
    name: string;
    displayName: string;
}

export interface UserDepartment {
    id: string;
    name: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string | null;
    department?: UserDepartment | null;
    avatar?: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    createdAt: string;
    roles: UserRole[];
}

// export interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     jobTitle?: string | null;
//     department?: string | null;
//     avatar?: string | null;
//     status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
//     createdAt: string;
//     roles: UserRole[];
// }

// This is used to create the first user of the organization, which is the owner
export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    jobTitle?: string;
    department?: string;
    role?: string;
}

// This is used by the owner to create users without a password. users create their own password upon invitation
export interface InviteUserData {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string;
    departmentId?: string;
    roleId?: string;
    avatar?: File | null;
}

export interface SetPasswordData {
    password: string;
    confirmPassword: string;
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
    mode: 'create' | 'edit' | 'view';
    existingUserDetail?: User;
    onSubmit: (data: InviteUserData) => void;
}