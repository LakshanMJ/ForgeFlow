'use client';

import { usePermissions } from '@/features/permissions/hooks/usePermissions';
import {
    Check,
    ChevronDown,
    Plus,
    Users,
    X,
    FolderOpen,
    ClipboardList,
    Paperclip,
    BarChart3
} from 'lucide-react';
import { useState } from 'react';

interface RoleFormProps {
    groups: any[];
    assignedUsers: any[];
    togglePermission: (groupKey: string, itemKey: string) => void;
    removeUser: (initials: string) => void;
    onAddUsers?: () => void;
}

type Accent = 'ember' | 'steel' | 'patina' | 'violet' | 'gold';

type PermissionItem = {
    key: string;
    label: string;
    checked: boolean;
};

type PermissionGroup = {
    key: string;
    title: string;
    icon: typeof FolderOpen;
    accent: Accent;
    accentVar: string;
    items: PermissionItem[];
};

const INITIAL_GROUPS: PermissionGroup[] = [
    {
        key: 'Organization & User Management',
        title: 'Organization & User Management',
        icon: FolderOpen,
        accent: 'ember',
        accentVar: 'var(--ember)',
        items: [
            { key: 'createProjects', label: 'Create Projects', checked: true },
            { key: 'editProjects', label: 'Edit Projects', checked: true },
            { key: 'deleteProjects', label: 'Delete Projects', checked: false },
            { key: 'viewProjects', label: 'View Projects', checked: true },
            { key: 'createProjects1', label: 'Create Projects', checked: true },
            { key: 'editProjects1', label: 'Edit Projects', checked: true },
            { key: 'deleteProjects1', label: 'Delete Projects', checked: false },
        ],
    },
    {
        key: 'project',
        title: 'Project Permissions',
        icon: FolderOpen,
        accent: 'ember',
        accentVar: 'var(--ember)',
        items: [
            { key: 'createProjects', label: 'Create Projects', checked: true },
            { key: 'editProjects', label: 'Edit Projects', checked: true },
            { key: 'deleteProjects', label: 'Delete Projects', checked: false },
            { key: 'viewProjects', label: 'View Projects', checked: true },
            { key: 'createProjects1', label: 'Create Projects', checked: true },
            { key: 'editProjects1', label: 'Edit Projects', checked: true },
            { key: 'deleteProjects1', label: 'Delete Projects', checked: false },
        ],
    },
    {
        key: 'task',
        title: 'Task Permissions',
        icon: ClipboardList,
        accent: 'steel',
        accentVar: 'var(--steel)',
        items: [
            { key: 'createTasks', label: 'Create Tasks', checked: true },
            { key: 'editTasks', label: 'Edit Tasks', checked: true },
            { key: 'deleteTasks', label: 'Delete Tasks', checked: false },
            { key: 'assignTasks', label: 'Assign Tasks', checked: true },
            { key: 'createTasks1', label: 'Create Tasks', checked: true },
            { key: 'editTasks1', label: 'Edit Tasks', checked: true },
            { key: 'deleteTasks1', label: 'Delete Tasks', checked: false },
            { key: 'assignTasks1', label: 'Assign Tasks', checked: true },
        ],
    },
    {
        key: 'Collaboration & Communication',
        title: 'Collaboration & Communication',
        icon: Users,
        accent: 'patina',
        accentVar: 'var(--patina)',
        items: [
            { key: 'inviteUsers', label: 'Invite Users', checked: false },
            { key: 'manageRoles', label: 'Manage Roles', checked: false },
            { key: 'viewTeamMembers', label: 'View Team Members', checked: true },
            { key: 'inviteUsers1', label: 'Invite Users', checked: false },
            { key: 'manageRoles1', label: 'Manage Roles', checked: false },
            { key: 'viewTeamMembers1', label: 'View Team Members', checked: true },
            { key: 'viewTeamMembers2', label: 'View Team Members', checked: true },
        ],
    },
    {
        key: 'Data & Analytics',
        title: 'Data & Analytics',
        icon: Paperclip,
        accent: 'violet',
        accentVar: 'var(--violet)',
        items: [
            { key: 'viewFiles', label: 'View Files', checked: true },
            { key: 'uploadFiles', label: 'Upload Files', checked: true },
            { key: 'deleteFiles', label: 'Delete Files', checked: false },
        ],
    },
    {
        key: 'Notifications & Invitations',
        title: 'Notifications & Invitations',
        icon: BarChart3,
        accent: 'gold',
        accentVar: 'var(--gold)',
        items: [
            { key: 'viewAnalytics', label: 'View Analytics', checked: true },
            { key: 'exportData', label: 'Export Data', checked: false },
        ],
    },
    {
        key: 'Search & Administrations',
        title: 'Search & Administration',
        icon: Paperclip,
        accent: 'violet',
        accentVar: 'var(--violet)',
        items: [
            { key: 'viewFiles', label: 'View Files', checked: true },
            { key: 'uploadFiles', label: 'Upload Files', checked: true },
        ],
    },
];

const ASSIGNED_USERS = [
    { initials: 'PS', name: 'Priya Shah', role: 'QA Engineer', accent: 'var(--violet)' },
    { initials: 'RP', name: 'Raj Patel', role: 'QA Engineer', accent: 'var(--violet)' },
];

export default function AddRoleForm() {
    const {
        data: permissions,
        isLoading,
        isError,
    } = usePermissions();

    if (isLoading) {
        return <div>Loading permissions...</div>;
    }

    if (isError) {
        return <div>Failed to load permissions.</div>;
    }
    
    const [groups, setGroups] = useState(INITIAL_GROUPS);
    const [assignedUsers, setAssignedUsers] = useState(ASSIGNED_USERS);

    if (!open) return null;

    const togglePermission = (groupKey: string, itemKey: string) => {
        setGroups((prev) =>
            prev.map((g) =>
                g.key !== groupKey
                    ? g
                    : {
                        ...g,
                        items: g.items.map((it) =>
                            it.key === itemKey ? { ...it, checked: !it.checked } : it
                        ),
                    }
            )
        );
    };

    const removeUser = (initials: string) => {
        setAssignedUsers((prev) => prev.filter((u) => u.initials !== initials));
    };

    return (
        <div className="role-modal-card">
            <div className="role-modal-grid">

                {/* =========================
            Role Details
        ========================== */}
                <div>
                    <div className="role-section-label">
                        Role Details
                    </div>

                    {/* Role Name */}
                    <div className="form-field">
                        <label className="form-label">
                            Role Name
                            <span className="required">*</span>
                        </label>

                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            placeholder="Enter role name"
                        />

                        <span className="form-help-text">
                            Unique name for this role
                        </span>
                    </div>

                    {/* Description */}
                    <div className="form-field">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-textarea"
                            name="description"
                            placeholder="Describe this role..."
                            style={{ height: '300px' }}
                        />
                    </div>

                    {/* Based On */}
                    <div
                        className="form-field"
                        style={{ marginBottom: 0 }}
                    >
                        <label className="form-label">
                            Based On
                        </label>

                        <button
                            className="form-select-btn"
                            type="button"
                        >
                            <span className="form-select-btn-left">
                                Developer
                            </span>

                            <ChevronDown
                                size={14}
                                className="chevron"
                            />
                        </button>

                        <span className="form-help-text">
                            Start with permissions from an existing role
                        </span>
                    </div>

                    {/* Status */}
                    <div className="form-field">
                        <label className="form-label">
                            Status
                        </label>

                        <div>
                            {/* TODO: Add active/inactive switch */}
                        </div>
                    </div>

                    {/* =========================
          Assigned Users
      ========================== */}
                    <div className="assigned-users-section">
                        <div className="assigned-users-header-row">

                            <div
                                className="form-section-header"
                                style={{ margin: 0 }}
                            >
                                <Users size={15} />

                                <span className="form-section-title">
                                    Assigned Users
                                </span>
                            </div>

                            <span className="assigned-users-count-badge">
                                {assignedUsers.length} users
                            </span>
                        </div>

                        <div className="assigned-users-row">

                            {assignedUsers.map((user) => (
                                <div
                                    className="selected-member-chip"
                                    key={user.initials}
                                >
                                    <span
                                        className="owner-avatar"
                                        style={{
                                            background: user.accent,
                                            color: '#fff',
                                        }}
                                    >
                                        {user.initials}
                                    </span>

                                    <span className="selected-member-chip-info">
                                        <span className="selected-member-chip-name">
                                            {user.name}
                                        </span>

                                        <span className="selected-member-chip-role">
                                            {user.role}
                                        </span>
                                    </span>

                                    <button
                                        className="selected-member-chip-remove"
                                        type="button"
                                        aria-label={`Remove ${user.name}`}
                                        onClick={() =>
                                            removeUser(user.initials)
                                        }
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            <button
                                className="add-users-chip-btn"
                                type="button"
                            // onClick={onAddUsers}
                            >
                                <Plus size={14} />
                                Add Users
                            </button>

                        </div>
                    </div>
                </div>

                {/* =========================
            Permissions
        ========================== */}
                <div>
                    <div className="role-section-label">
                        Permissions
                    </div>

                    {groups.map((group) => (
                        <div
                            className="permission-group"
                            key={group.key}
                        >
                            <div className="permission-group-header">
                                <group.icon
                                    size={15}
                                    color={group.accentVar}
                                />

                                <span className="permission-group-title">
                                    {group.title}
                                </span>
                            </div>

                            <div className="permission-checkbox-grid">
                                {group.items.map((item: any) => (
                                    <button
                                        key={item.key}
                                        className="permission-checkbox-row"
                                        type="button"
                                        onClick={() =>
                                            togglePermission(
                                                group.key,
                                                item.key
                                            )
                                        }
                                    >
                                        <span
                                            className={`role-checkbox${item.checked
                                                ? ` checked-${group.accent}`
                                                : ''
                                                }`}
                                        >
                                            {item.checked && (
                                                <Check size={12} />
                                            )}
                                        </span>

                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}