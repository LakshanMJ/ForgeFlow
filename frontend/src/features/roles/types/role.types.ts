import type { Permission } from "@/features/permissions/types/permission.types";
import type { Crown } from "lucide-react";

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
    roleId: string;
    permissionId: string;
    createdAt: string;
    permission: Permission;
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

// type RoleType = 'System Role' | 'Custom Role';

export type RoleType = 'SYSTEM' | 'CUSTOM';

export type RoleStatus = 'Active' | 'Inactive';

export type Status = 'Online' | 'Away' | 'Offline';

type AssignedUser = {
    initials: string;
    name: string;
    email: string;
    accent: string;
    department: string;
    status: Status;
};

export type RoleColumn = {
    key: string;
    label: string;
    icon: typeof Crown;
    color: string;
    count: number;
    permissions: number;
    type: RoleType;
    active: boolean;
    sidebarBadge?: { text: string; className: string };
    users: AssignedUser[];
};

export type RoleRow = Role & {
    users: number;
    permissions: number;
    typeChip: string;
    type: RoleType;
    status: RoleStatus;
};