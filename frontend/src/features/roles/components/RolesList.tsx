import DataTable from '@/shared/components/DataTable';
import {
    Crown,
    Shield,
    KeyRound,
    UserCircle,
    Users as UsersIcon,
    Download,
    Plus,
    Search,
    ChevronDown,
    ClipboardList,
    LayoutGrid,
    UsersRound,
    Laptop,
    Eye,
    FlaskConical,
    FileText,
    Lock,
    Pencil,
    Trash2,
    GripVertical,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import CreateRoleModal from './CreateRoleModal';

type RoleType = 'SYSTEM' | 'CUSTOM';
type RoleStatus = 'Active' | 'Inactive';

type Role = {
    name: string;
    icon: typeof Crown;
    iconColor: string;
    users: number;
    permissions: number;
    type: RoleType;
    typeChip: string;
    status: RoleStatus;
};

const ROLES: Role[] = [
    { name: 'Owner', icon: Crown, iconColor: 'var(--ember)', users: 1, permissions: 12, type: 'SYSTEM', typeChip: 'chip-outline-steel', status: 'Active' },
    { name: 'Admin', icon: Shield, iconColor: 'var(--ember)', users: 2, permissions: 10, type: 'SYSTEM', typeChip: 'chip-outline-steel', status: 'Active' },
    { name: 'Project Manager', icon: ClipboardList, iconColor: 'var(--gold)', users: 3, permissions: 8, type: 'SYSTEM', typeChip: 'chip-outline-steel', status: 'Active' },
    { name: 'Developer', icon: Laptop, iconColor: 'var(--steel)', users: 8, permissions: 6, type: 'SYSTEM', typeChip: 'chip-outline-steel', status: 'Active' },
    { name: 'Viewer', icon: Eye, iconColor: 'var(--gold)', users: 4, permissions: 3, type: 'SYSTEM', typeChip: 'chip-outline-steel', status: 'Active' },
    { name: 'QA Engineer', icon: FlaskConical, iconColor: 'var(--patina)', users: 2, permissions: 5, type: 'CUSTOM', typeChip: 'chip-outline-gold', status: 'Active' },
    { name: 'Intern', icon: FileText, iconColor: 'var(--patina)', users: 1, permissions: 2, type: 'CUSTOM', typeChip: 'chip-outline-gold', status: 'Inactive' },
];

const STATUS_COLOR: Record<RoleStatus, string> = {
    Active: 'var(--patina)',
    Inactive: 'var(--gold)',
};

const RolesList = () => {

    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

    const roleColumns: Column<Role>[] = [
        {
            key: 'name',
            label: 'Role Name',
            render: (role) => (
                <div className="role-name-cell">
                    <span
                        className="role-icon"
                        style={{ background: 'var(--surface-3)', color: role.iconColor }}
                    >
                        <role.icon size={16} />
                    </span>
                    <span className="role-name-text">{role.name}</span>
                </div>
            ),
        },
        {
            key: 'users',
            label: 'Users',
            render: (role) => role.users,
        },
        {
            key: 'permissions',
            label: 'Permissions',
            render: (role) => (
                <span className="permissions-count-link">{role.permissions}</span>
            ),
        },
        {
            key: 'type',
            label: 'Type',
            render: (role) => (
                <span className={`chip ${role.typeChip}`}>{role.type}</span>
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
                            background: STATUS_COLOR[role.status],
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
                            <button className="kebab-btn" type="button" aria-label="Locked">
                                <Lock size={15} />
                            </button>
                            <button className="kebab-btn" type="button" aria-label={`View ${role.name}`}>
                                <Eye size={15} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="kebab-btn" type="button" aria-label={`Edit ${role.name}`}>
                                <Pencil size={15} />
                            </button>
                            <button className="kebab-btn" type="button" aria-label={`Delete ${role.name}`}>
                                <Trash2 size={15} />
                            </button>
                            <button className="kebab-btn" type="button" aria-label="Reorder" style={{ cursor: 'grab' }}>
                                <GripVertical size={15} />
                            </button>
                        </>
                    )}
                </span>
            ),
        },
    ];

    return (
        <>
            <CreateRoleModal open={isCreateRoleOpen} onClose={() => setIsCreateRoleOpen(false)} />

            <div className="filter-bar">
                <div className="search-input">
                    <Search size={14} />
                    <input type="text" placeholder="Search roles..." />
                </div>
                <button className="filter-select" type="button">
                    All Types
                    <ChevronDown size={14} />
                </button>
                <button className="filter-select" type="button">
                    All Status
                    <ChevronDown size={14} />
                </button>
                <div className="header-actions" style={{ marginLeft: 'auto' }}>
                    <button className="btn-secondary" type="button">
                        <Download size={14} />
                        Export
                    </button>
                    <button className="btn-primary" type="button" onClick={() => setIsCreateRoleOpen(true)}>
                        <Plus size={14} />
                        Create New Role
                    </button>
                </div>
            </div>

            <DataTable
                columns={roleColumns}
                data={ROLES}
                totalItems={7}
                currentPage={1}
                totalPages={1}
                columnWidths="2fr 1fr 1.2fr 1fr 1fr 110px"
            />
        </>
    )
}

export default RolesList;