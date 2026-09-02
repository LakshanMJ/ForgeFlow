'use client';

import DataTable, { type Column } from '@/shared/components/DataTable';

import {
    Crown,
    Shield,
    Eye,
    Download,
    Plus,
    Search,
    ChevronDown,
    ClipboardList,
    Users as UsersIcon,
    Save,
    Lock,
    Pencil,
    Trash2,
    GripVertical,
} from 'lucide-react';

import { useState } from 'react';

import Modal from '@/shared/components/Modal';
import AddRoleForm from './AddRoleForm';
import { useRoles } from '../hooks/useRoles';
import type { CreateRoleData, Role, RoleRow, RoleStatus, RoleType, UpdateRoleData } from '../types/role.types';
import { useCreateRole } from '../hooks/useCreateRole';
import { useUpdateRole } from '../hooks/useUpdateRole';
import { RoleIcon } from './RoleIcon';

const STATUS_COLOR: Record<RoleStatus, string> = {
    Active: 'var(--patina)',
    Inactive: 'var(--gold)',
};

const RolesList = () => {

    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [roleModalMode, setRoleModalMode] = useState<'create' | 'view' | 'edit'>('create');
    const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();

    const {
        data: roles,
        isLoading,
        isError,
        error,
    } = useRoles();
    
    console.log('rolessssss', roles);
    if (isLoading) {
        return (
            <div>
                Loading roles...
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                Failed to load roles.
                <br />
                {error instanceof Error
                    ? error.message
                    : 'Unknown error'}
            </div>
        );
    }

    // Convert API roles into the structure required by the DataTable.

    const roleRows: RoleRow[] = (roles ?? []).map(
        (role) => {
            return {
                ...role,
                users: role._count.userRoles,
                permissions:
                    role._count.rolePermissions,
                type: role.isSystem
                    ? 'SYSTEM'
                    : 'CUSTOM',
                typeChip: role.isSystem
                    ? 'chip-outline-steel'
                    : 'chip-outline-gold',
                status: 'Active',
            };
        },
    );

    const roleColumns: Column<RoleRow>[] = [
        {
            key: 'name',
            label: 'Role Name',
            render: (role) => (
                <div className="role-name-cell">
                    <RoleIcon roleName={role.name} />

                    <span className="role-name-text">
                        {role.displayName}
                    </span>
                </div>
            ),
        },
        {
            key: 'users',
            label: 'Users',

            render: (role) => (
                role._count.userRoles
            ),
        },
        {
            key: 'permissions',
            label: 'Permissions',

            render: (role) => (
                <span className="permissions-count-link">
                    {role._count.rolePermissions}
                </span>
            ),
        },
        {
            key: 'type',
            label: 'Type',

            render: (role) => (
                <span
                    className={`chip ${role.typeChip}`}
                >
                    {role.type}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',

            render: (role) => (
                <span className="user-status-cell">
                    <span
                        style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background:
                                STATUS_COLOR[
                                role.status
                                ],
                            flexShrink: 0,
                        }}
                    />

                    {role.status}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (role) => (
                <span className="actions-cell-group">
                    {role.type === 'SYSTEM' ? (
                        <>
                            <button
                                className="kebab-btn"
                                type="button"
                                aria-label="Locked"
                            >
                                <Lock size={15} />
                            </button>

                            <button
                                className="kebab-btn"
                                type="button"
                                aria-label={`View ${role.name}`}
                                onClick={() => {
                                    setSelectedRole(role);
                                    setRoleModalMode('view');
                                    setIsRoleModalOpen(true);
                                }}
                            >
                                <Eye size={15} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="kebab-btn"
                                type="button"
                                aria-label={`Edit ${role.name}`}
                                onClick={() => {
                                    setSelectedRole(role);
                                    setRoleModalMode('edit');
                                    setIsRoleModalOpen(true);
                                }}
                            >
                                <Pencil size={15} />
                            </button>

                            <button
                                className="kebab-btn"
                                type="button"
                                aria-label={`Delete ${role.name}`}
                            >
                                <Trash2 size={15} />
                            </button>

                            <button
                                className="kebab-btn"
                                type="button"
                                aria-label="Reorder"
                                style={{
                                    cursor: 'grab',
                                }}
                            >
                                <GripVertical
                                    size={15}
                                />
                            </button>
                        </>
                    )}
                </span>
            ),
        },
    ];

    const handleCreateRole = () => {
        setSelectedRole(undefined);
        setRoleModalMode('create');
        setIsRoleModalOpen(true);
    };

    const handleRoleSubmit = (
        data: CreateRoleData | UpdateRoleData,
    ) => {
        if (roleModalMode === 'create') {
            createRoleMutation.mutate(data as CreateRoleData, {
                onSuccess: () => {
                    setIsRoleModalOpen(false);
                },
            });
            return;
        }

        if (roleModalMode === 'edit') {
            if (!selectedRole) {
                return;
            }
            updateRoleMutation.mutate(
                {
                    id: selectedRole.id,
                    data: data as UpdateRoleData,
                },
                {
                    onSuccess: () => {
                        setIsRoleModalOpen(false);
                    },
                },
            );
        }
    };

    return (
        <>
            <Modal
                isOpen={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                title={
                    roleModalMode === 'create'
                        ? 'Create New Role'
                        : roleModalMode === 'edit'
                            ? 'Edit Role'
                            : 'View Role'
                }
                icon={<Shield size={18} />}
                size="xl"
                submitFormId="role-form"
                showSubmit={roleModalMode !== 'view'}
                submitLabel={
                    roleModalMode === 'edit'
                        ? 'Save Changes'
                        : 'Save Role'
                }
                submitIcon={<Save size={14} />}
            >
                <AddRoleForm
                    mode={roleModalMode}
                    role={selectedRole}
                    assignedUsers={selectedRole?.userRoles}
                    onSubmit={handleRoleSubmit}
                />
            </Modal>

            <div className="filter-bar">
                {/* Search */}

                <div className="search-input">
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="Search roles..."
                    />
                </div>

                {/* Type */}

                <button
                    className="filter-select"
                    type="button"
                >
                    All Types
                    <ChevronDown size={14} />
                </button>

                {/* Status */}

                <button
                    className="filter-select"
                    type="button"
                >
                    All Status
                    <ChevronDown size={14} />
                </button>

                {/* Actions */}

                <div
                    className="header-actions"
                    style={{
                        marginLeft: 'auto',
                    }}
                >
                    <button
                        className="btn-secondary"
                        type="button"
                    >
                        <Download size={14} />
                        Export
                    </button>

                    <button
                        className="btn-primary"
                        type="button"
                        onClick={handleCreateRole}
                    >
                        <Plus size={14} />
                        Create New Role
                    </button>
                </div>
            </div>

            <DataTable
                columns={roleColumns}
                data={roleRows}
                totalItems={roleRows.length}
                currentPage={1}
                totalPages={1}
                columnWidths="2fr 1fr 1.2fr 1fr 1fr 110px"
            />
        </>
    );
};

export default RolesList;