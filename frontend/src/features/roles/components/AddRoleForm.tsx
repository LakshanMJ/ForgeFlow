'use client';

import { usePermissions } from '@/features/permissions/hooks/usePermissions';
import {
    Check,
    ChevronDown,
    Users,
    X,
    FolderOpen,
    ClipboardList,
    Paperclip,
    BarChart3,
    Shield,
} from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import type { User } from '@/features/users/types/user.types';
import type {
    CreateRoleData,
    UpdateRoleData,
    Role,
    RoleUser,
} from '../types/role.types';
import { useUsers } from '@/features/users/hooks/useUsers';

type RoleFormMode = 'create' | 'view' | 'edit';

interface RoleFormProps {
    mode: RoleFormMode;
    role?: Role;
    assignedUsers?: RoleUser[];
    onAddUsers?: () => void;
    onSubmit?: (
        data: CreateRoleData | UpdateRoleData,
    ) => void;
}

type Accent =
    | 'ember'
    | 'steel'
    | 'patina'
    | 'violet'
    | 'gold';

interface Permission {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    category: string;
}


const CATEGORY_CONFIG: Record<
    string,
    {
        icon: typeof FolderOpen;
        accent: Accent;
        accentVar: string;
    }
> = {
    'Organization & User Management': {
        icon: Users,
        accent: 'ember',
        accentVar: 'var(--ember)',
    },

    'Project Management': {
        icon: FolderOpen,
        accent: 'steel',
        accentVar: 'var(--steel)',
    },

    'Task Management': {
        icon: ClipboardList,
        accent: 'patina',
        accentVar: 'var(--patina)',
    },

    'Collaboration & Communication': {
        icon: Users,
        accent: 'patina',
        accentVar: 'var(--patina)',
    },

    'Data & Analytics': {
        icon: BarChart3,
        accent: 'violet',
        accentVar: 'var(--violet)',
    },

    'Notifications & Invitations': {
        icon: Paperclip,
        accent: 'gold',
        accentVar: 'var(--gold)',
    },

    'Search & Administration': {
        icon: Paperclip,
        accent: 'violet',
        accentVar: 'var(--violet)',
    },
};

const EMPTY_FORM: CreateRoleData = {
    name: '',
    displayName: '',
    description: '',
    permissionIds: [],
    userIds: [],
};

export default function AddRoleForm({
    mode,
    role,
    assignedUsers: initialAssignedUsers = [],
    onAddUsers,
    onSubmit,
}: RoleFormProps) {

    const {
        data: permissions,
        isLoading: isPermissionsLoading,
        isError: isPermissionsError,
    } = usePermissions();

    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useUsers();

    const [form, setForm] = useState<CreateRoleData>(EMPTY_FORM);
    const [assignedUsers, setAssignedUsers] = useState<RoleUser[]>(initialAssignedUsers);
    const isSystemRole = role?.isSystem ?? false;

    const isReadOnly =
        mode === 'view' ||
        (mode === 'edit' && isSystemRole);


    // Convert API users into RoleUser objects used by the UI

    const userOptions: RoleUser[] = (users ?? []).map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        initials: `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`,
        role: user.jobTitle ?? 'User',
        accent: 'var(--violet)',
    }));

    useEffect(() => {
        // CREATE
        if (mode === 'create' || !role) {
            const usersForCreate = initialAssignedUsers ?? [];

            setAssignedUsers(usersForCreate);

            setForm({
                ...EMPTY_FORM,
                userIds: usersForCreate.map(
                    (user) => user.id,
                ),
            });

            return;
        }

        // VIEW / EDIT
        const existingUsers: RoleUser[] =
            (role.userRoles ?? []).map(
                (userRole) => {
                    const user = userRole.user;

                    return {
                        id: user.id,

                        firstName: user.firstName,
                        lastName: user.lastName,

                        initials:
                            `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`,

                        role:
                            user.jobTitle ??
                            role.displayName ??
                            role.name,

                        accent: 'var(--ember)',
                    };
                },
            );

        setForm({
            name: role.name ?? '',

            displayName:
                role.displayName ??
                role.name ??
                '',

            description:
                role.description ?? '',

            permissionIds:
                role.rolePermissions.map(
                    (permission) =>
                        permission.permissionId,
                ),

            userIds:
                existingUsers.map(
                    (user) => user.id,
                ),
        });

        setAssignedUsers(existingUsers);
    }, [
        mode,
        role,
        initialAssignedUsers,
    ]);
    /*
     * ============================================================
     * Group permissions by category
     * ============================================================
     */

    const groupedPermissions = (
        permissions ?? []
    ).reduce(
        (
            groups: Record<
                string,
                Permission[]
            >,
            permission: Permission,
        ) => {
            if (!groups[permission.category]) {
                groups[permission.category] = [];
            }

            groups[permission.category].push(
                permission,
            );

            return groups;
        },
        {},
    );

    /*
     * ============================================================
     * Input handling
     * ============================================================
     */

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >,
    ) => {
        if (isReadOnly) {
            return;
        }

        const {
            name,
            value,
        } = e.target;

        setForm((prev) => ({
            ...prev,

            [name]: value,

            /*
             * Keep displayName synced with name.
             */
            ...(name === 'name'
                ? {
                    displayName: value,
                }
                : {}),
        }));
    };

    /*
     * ============================================================
     * Permission handling
     * ============================================================
     */

    const togglePermission = (
        permissionId: string,
    ) => {
        if (isReadOnly) {
            return;
        }

        setForm((prev) => ({
            ...prev,

            permissionIds:
                prev.permissionIds.includes(
                    permissionId,
                )
                    ? prev.permissionIds.filter(
                        (id) =>
                            id !==
                            permissionId,
                    )
                    : [
                        ...prev.permissionIds,
                        permissionId,
                    ],
        }));
    };

    /*
     * ============================================================
     * User handling
     * ============================================================
     */

    const handleUsersChange = (
        newUsers: RoleUser[],
    ) => {
        if (isReadOnly) {
            return;
        }

        setAssignedUsers(newUsers);

        setForm((prev) => ({
            ...prev,

            userIds: newUsers.map(
                (user) => user.id,
            ),
        }));
    };

    /*
     * ============================================================
     * Remove individual user
     * ============================================================
     */

    const removeUser = (
        userId: string,
    ) => {
        if (isReadOnly) {
            return;
        }

        const updatedUsers =
            assignedUsers.filter(
                (user) =>
                    user.id !== userId,
            );

        handleUsersChange(
            updatedUsers,
        );
    };

    /*
     * ============================================================
     * Form submission
     * ============================================================
     */

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        /*
         * Make absolutely sure userIds is
         * synchronized with the visible users.
         */

        const data: CreateRoleData = {
            ...form,

            userIds:
                assignedUsers.map(
                    (user) => user.id,
                ),
        };

        // console.log(
        //     'FORM SUBMIT DATA:',
        //     data,
        // );

        onSubmit?.(data);
    };


    if (
        isPermissionsLoading ||
        isUsersLoading
    ) {
        return (
            <div className="role-modal-card">
                Loading...
            </div>
        );
    }

    if (
        isPermissionsError ||
        isUsersError
    ) {
        return (
            <div className="role-modal-card">
                Failed to load role data.
            </div>
        );
    }

    /*
     * ============================================================
     * Render
     * ============================================================
     */

    return (
        <form
            id="role-form"
            className="role-modal-card"
            onSubmit={handleSubmit}
        >
            <div className="role-modal-grid">

                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div>
                    <div className="role-section-label">
                        Role Details
                    </div>

                    {/* =================================================
                        System role warning
                    ================================================= */}

                    {isSystemRole && (
                        <div className="role-system-warning">
                            <Shield size={14} />

                            <span>
                                System roles cannot be
                                modified.
                            </span>
                        </div>
                    )}

                    {/* =================================================
                        Role Name
                    ================================================= */}

                    <div className="form-field">
                        <label className="form-label">
                            Role Name

                            {mode === 'create' && (
                                <span className="required">
                                    *
                                </span>
                            )}
                        </label>

                        {isReadOnly ? (
                            <div className="form-input role-readonly-value">
                                {form.name || '—'}
                            </div>
                        ) : (
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                placeholder="Enter role name"
                                value={form.name}
                                onChange={
                                    handleInputChange
                                }
                            />
                        )}

                        <span className="form-help-text">
                            Unique name for this role
                        </span>
                    </div>

                    {/* =================================================
                        Description
                    ================================================= */}

                    <div className="form-field">
                        <label className="form-label">
                            Description
                        </label>

                        {isReadOnly ? (
                            <div
                                className="form-input role-readonly-value"
                                style={{
                                    minHeight:
                                        '300px',
                                    whiteSpace:
                                        'pre-wrap',
                                }}
                            >
                                {form.description ||
                                    'No description'}
                            </div>
                        ) : (
                            <textarea
                                className="form-textarea"
                                name="description"
                                placeholder="Describe this role..."
                                style={{
                                    height: '300px',
                                }}
                                value={
                                    form.description
                                }
                                onChange={
                                    handleInputChange
                                }
                            />
                        )}
                    </div>

                    {/* =================================================
                        Based On
                    ================================================= */}

                    <div
                        className="form-field"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <label className="form-label">
                            Based On
                        </label>

                        {isReadOnly ? (
                            <div className="form-input role-readonly-value">
                                {role?.basedOnRoleName ??
                                    '—'}
                            </div>
                        ) : (
                            <button
                                className="form-select-btn"
                                type="button"
                            >
                                <span className="form-select-btn-left">
                                    {role?.basedOnRoleName ??
                                        'Developer'}
                                </span>

                                <ChevronDown
                                    size={14}
                                    className="chevron"
                                />
                            </button>
                        )}

                        <span className="form-help-text">
                            Start with permissions
                            from an existing role
                        </span>
                    </div>

                    {/* =================================================
                        Status
                    ================================================= */}

                    <div className="form-field">
                        <label className="form-label">
                            Status
                        </label>

                        {isReadOnly ? (
                            <div className="form-input role-readonly-value">
                                {role?.isActive
                                    ? 'Active'
                                    : 'Inactive'}
                            </div>
                        ) : (
                            <div>
                                {/* TODO: Add active/inactive switch */}
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        Assigned Users
                    ================================================= */}

                    <div className="assigned-users-section">
                        <div className="assigned-users-header-row">
                            <div
                                className="form-section-header"
                                style={{
                                    margin: 0,
                                }}
                            >
                                <Users size={15} />

                                <span className="form-section-title">
                                    Assigned Users
                                </span>
                            </div>

                            <span className="assigned-users-count-badge">
                                {
                                    assignedUsers.length
                                }{' '}
                                {assignedUsers.length ===
                                    1
                                    ? 'user'
                                    : 'users'}
                            </span>
                        </div>

                        {/* =================================================
                            USER AUTOCOMPLETE
                        ================================================= */}

                        <div className="assigned-users-row">
                            <Autocomplete
                                multiple
                                fullWidth
                                options={userOptions}
                                value={assignedUsers}
                                disabled={isReadOnly}
                                onChange={(
                                    _event,
                                    newValue,
                                ) => {
                                    handleUsersChange(
                                        newValue,
                                    );
                                }}
                                getOptionLabel={(
                                    user,
                                ) =>
                                    `${user.firstName} ${user.lastName}`
                                }
                                isOptionEqualToValue={(
                                    option,
                                    value,
                                ) =>
                                    option.id ===
                                    value.id
                                }
                                filterSelectedOptions
                                openOnFocus
                                disableCloseOnSelect
                                renderInput={(
                                    params,
                                ) => (
                                    <TextField
                                        {...params}
                                        placeholder={
                                            assignedUsers.length ===
                                                0
                                                ? 'Add users...'
                                                : 'Add another user...'
                                        }
                                    />
                                )}
                                renderOption={(
                                    props,
                                    user,
                                ) => (
                                    <li
                                        {...props}
                                        key={
                                            user.id
                                        }
                                        style={{
                                            display:
                                                'flex',
                                            alignItems:
                                                'center',
                                            gap: '10px',
                                        }}
                                    >
                                        <span
                                            className="owner-avatar"
                                            style={{
                                                background:
                                                    user.accent,
                                                color:
                                                    '#fff',
                                            }}
                                        >
                                            {
                                                user.initials
                                            }
                                        </span>

                                        <span className="selected-member-chip-info">
                                            <span className="selected-member-chip-name">
                                                {
                                                    `${user.firstName} ${user.lastName}`
                                                }
                                            </span>

                                            <span className="selected-member-chip-role">
                                                {
                                                    user.role
                                                }
                                            </span>
                                        </span>
                                    </li>
                                )}

                                renderValue={(value, getItemProps) =>
                                    value.map((user, index) => {
                                        const {
                                            key,
                                            ...itemProps
                                        } = getItemProps({
                                            index,
                                        });

                                        return (
                                            <div
                                                {...itemProps}
                                                key={key}
                                                className="selected-member-chip"
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
                                                        {`${user.firstName} ${user.lastName}`}
                                                    </span>

                                                    {/* <span className="selected-member-chip-role">
                                                        {user.role}
                                                    </span> */}
                                                </span>

                                                {!isReadOnly && (
                                                    <button
                                                        type="button"
                                                        className="selected-member-chip-remove"
                                                        aria-label={`Remove ${`${user.firstName} ${user.lastName}`}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            removeUser(user.id);
                                                        }}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })
                                }
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '6px',
                                        padding: '3px 8px',
                                        fontSize: '13px',
                                        color: 'var(--text)',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        width: '100%',

                                        '& fieldset': {
                                            border: 'none',
                                        },

                                        '&:hover fieldset': {
                                            border: 'none',
                                        },

                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        },

                                        '&.Mui-focused': {
                                            borderColor: 'var(--border-strong)',
                                        },
                                    },

                                    '& .MuiAutocomplete-input': {
                                        padding: '6px 4px !important',
                                        fontSize: '13px',
                                        color: 'var(--text)',

                                        '&::placeholder': {
                                            color: 'var(--text-tertiary)',
                                            opacity: 1,
                                        },
                                    },

                                    '& .MuiAutocomplete-inputRoot': {
                                        padding: '3px 8px !important',
                                    },

                                    '& .MuiAutocomplete-tag': {
                                        margin: 0,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* =================================================
                    RIGHT COLUMN - PERMISSIONS
                ================================================= */}

                <div>
                    <div className="role-section-label">
                        Permissions
                    </div>

                    {Object.entries(
                        groupedPermissions,
                    ).map(
                        ([
                            category,
                            categoryPermissions,
                        ]) => {
                            const config =
                                CATEGORY_CONFIG[
                                category
                                ] ?? {
                                    icon: FolderOpen,
                                    accent:
                                        'ember' as Accent,
                                    accentVar:
                                        'var(--ember)',
                                };

                            const Icon =
                                config.icon;

                            return (
                                <div
                                    className="permission-group"
                                    key={category}
                                >
                                    {/* Category Header */}

                                    <div className="permission-group-header">
                                        <Icon
                                            size={15}
                                            color={
                                                config.accentVar
                                            }
                                        />

                                        <span className="permission-group-title">
                                            {category}
                                        </span>
                                    </div>

                                    {/* Permissions */}

                                    <div className="permission-checkbox-grid">
                                        {categoryPermissions.map(
                                            (
                                                permission,
                                            ) => {
                                                const checked =
                                                    form.permissionIds.includes(
                                                        permission.id,
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            permission.id
                                                        }
                                                        className={`permission-checkbox-row ${isReadOnly
                                                            ? 'readonly'
                                                            : ''
                                                            }`}
                                                        type="button"
                                                        disabled={
                                                            isReadOnly
                                                        }
                                                        onClick={() =>
                                                            togglePermission(
                                                                permission.id,
                                                            )
                                                        }
                                                        title={
                                                            permission.description ??
                                                            undefined
                                                        }
                                                    >
                                                        <span
                                                            className={`role-checkbox${checked
                                                                ? ` checked-${config.accent}`
                                                                : ''
                                                                }`}
                                                        >
                                                            {checked && (
                                                                <Check
                                                                    size={
                                                                        12
                                                                    }
                                                                />
                                                            )}
                                                        </span>

                                                        {
                                                            permission.displayName
                                                        }
                                                    </button>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </form>
    );
}