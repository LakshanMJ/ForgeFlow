export interface RoleUser {
    id: string;
    firstName: string;
    lastName: string;
    initials: string;
    role: string;
    accent: string;
}

export interface RolePermission {
    id: string;
    permissionId: string;
    roleId: string;
}

export interface RoleAssignedUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string | null;
    avatar?: string | null;
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface RoleUserRole {
    id: string;
    userId: string;
    roleId: string;
    user: RoleAssignedUser;
}

export interface Role {
    id: string;
    organizationId: string;
    name: string;
    displayName: string;
    description: string | null;

    isSystem: boolean;

    createdAt: string;
    updatedAt: string;

    basedOnRoleName?: string | null;
    isActive?: boolean;

    rolePermissions: RolePermission[];

    userRoles: RoleUserRole[];

    _count: {
        userRoles: number;
        rolePermissions: number;
    };
}

export interface CreateRoleData {
    name: string;
    displayName: string;
    description: string;
    permissionIds: string[];
    userIds: string[];
}

export interface UpdateRoleData {
    name?: string;
    displayName?: string;
    description?: string;
    permissionIds?: string[];
    userIds?: string[];
}