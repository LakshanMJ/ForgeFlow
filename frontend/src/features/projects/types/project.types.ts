import type { User } from "@/features/users/types/user.types";
import type { ReactNode } from "react";

export enum ProjectStatus {
    PLANNING = 'PLANNING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    ON_HOLD = 'ON_HOLD',
    CANCELLED = 'CANCELLED',
}

export enum ProjectColor {
    STEEL = 'STEEL',
    EMBER = 'EMBER',
    PATINA = 'PATINA',
    GOLD = 'GOLD',
    VIOLET = 'VIOLET',
}

export enum ProjectPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT',
}

export interface Project {
    id: string;
    organizationId: string;

    ownerId: string;
    owner: User;
    categoryId?: string | null;

    name: string;
    description?: string | null;
    status: ProjectStatus;

    startDate?: string | null;
    endDate?: string | null;

    color?: ProjectColor;
    archived: boolean;
    members: ProjectMember[];

    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface ProjectMember {
    id: string;
    projectId: string;
    userId: string;
    role: string;
    joinedAt: string;
    user: User;
}

export interface ProjectColumn<T> {
    key: string;
    label: string;
    render?: (item: T) => ReactNode;
}

export interface CreateProjectData {
    name: string;
    description?: string;

    ownerId: string;
    categoryId?: string;

    status?: ProjectStatus;
    priority?: ProjectPriority;
    color?: ProjectColor;

    startDate?: string;
    endDate?: string;

    members?: string[];
}

export interface UpdateProjectData {
    name?: string;
    description?: string;

    ownerId?: string;
    categoryId?: string;

    status?: ProjectStatus;
    priority?: ProjectPriority;
    color?: ProjectColor;

    startDate?: string;
    endDate?: string;

    members?: string[];
}

export interface ProjectFormData {
    name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    category: string;
    color: ProjectColor | '';
    startDate: string;
    endDate: string;
    owner: string;
    members: User[];
}

export interface ProjectFormProps {
    mode: 'create' | 'edit' | 'view';
    existingProjectDetail?: Project;
    onSubmit: (data: CreateProjectData) => void;
}