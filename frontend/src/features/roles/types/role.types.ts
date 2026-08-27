export interface Role {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    permissionIds: string[];
    userIds: string[];
    isSystem: boolean;
    rolePermissions: string[];
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