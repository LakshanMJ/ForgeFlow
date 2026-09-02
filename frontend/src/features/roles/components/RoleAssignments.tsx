'use client';

import { useState } from 'react';
import {
	Download,
	Plus,
	Crown,
	Shield,
	ClipboardList,
	Laptop,
	Eye,
	FlaskConical,
	BookOpen,
	Users,
	UserCheck,
	AlertTriangle,
	Search,
	RefreshCw,
	X,
	Trash2,
} from 'lucide-react';
import type { RoleColumn, Status } from '../types/role.types';
import { RoleIcon } from './RoleIcon';
import { useRoles } from '../hooks/useRoles';

const STATUS_COLOR: Record<Status, string> = {
	Online: 'var(--patina)',
	Away: 'var(--gold)',
	Offline: 'var(--text-tertiary)',
};


const ROLES: RoleColumn[] = [
	{
		key: 'OWNER',
		label: 'Owner',
		icon: Crown,
		color: 'var(--ember)',
		count: 1,
		permissions: 12,
		type: 'System Role',
		active: true,
		users: [
			{ initials: 'WS', name: 'Wile Smith', email: 'wile.smith@acmecorp.com', accent: 'var(--steel)', department: 'Engineering', status: 'Online' },
		],
	},
	{
		key: 'ADMIN',
		label: 'Admin',
		icon: Shield,
		color: 'var(--ember)',
		count: 2,
		permissions: 10,
		type: 'System Role',
		active: true,
		users: [
			{ initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.johnson@acmecorp.com', accent: 'var(--ember)', department: 'Engineering', status: 'Online' },
			{ initials: 'ML', name: 'Michael Lee', email: 'michael.lee@acmecorp.com', accent: 'var(--steel)', department: 'HR', status: 'Away' },
		],
	},
	{
		key: 'PROJECT_MANAGER',
		label: 'Project Manager',
		icon: ClipboardList,
		color: 'var(--gold)',
		count: 3,
		permissions: 8,
		type: 'System Role',
		active: true,
		users: [
			{ initials: 'JW', name: 'Jamie Wong', email: 'jamie.wong@acmecorp.com', accent: 'var(--gold)', department: 'Product', status: 'Online' },
			{ initials: 'AR', name: 'Alex Rivera', email: 'alex.rivera@acmecorp.com', accent: 'var(--patina)', department: 'Marketing', status: 'Offline' },
			{ initials: 'SC', name: 'Sarah Chen', email: 'sarah.chen@acmecorp.com', accent: 'var(--steel)', department: 'Engineering', status: 'Online' },
		],
	},
	{
		key: 'DEVELOPER',
		label: 'Developer',
		icon: Laptop,
		color: 'var(--steel)',
		count: 8,
		permissions: 6,
		type: 'System Role',
		active: true,
		users: [
			{ initials: 'AT', name: 'Alex Turner', email: 'alex@acme.com', accent: 'var(--steel)', department: 'Design', status: 'Online' },
			{ initials: 'MB', name: 'Mike Brown', email: 'mike@acme.com', accent: 'var(--patina)', department: 'Engineering', status: 'Online' },
			{ initials: 'LW', name: 'Lisa Wong', email: 'lisa@acme.com', accent: 'var(--ember)', department: 'Engineering', status: 'Offline' },
			{ initials: 'PS', name: 'Priya Shah', email: 'priya@acme.com', accent: 'var(--violet)', department: 'QA', status: 'Offline' },
			{ initials: 'JD', name: 'John Doe', email: 'john@acme.com', accent: 'var(--surface-3)', department: 'Engineering', status: 'Away' },
			{ initials: 'SP', name: 'Sarah Park', email: 'sarah.park@acme.com', accent: 'var(--violet)', department: 'Engineering', status: 'Online' },
			{ initials: 'TC', name: 'Tom Chen', email: 'tom@acme.com', accent: 'var(--gold)', department: 'Engineering', status: 'Offline' },
			{ initials: 'RC', name: 'Ryan Cole', email: 'ryan.cole@acme.com', accent: 'var(--steel)', department: 'Engineering', status: 'Online' },
		],
	},
	{
		key: 'VIEWER',
		label: 'Viewer',
		icon: Eye,
		color: 'var(--gold)',
		count: 4,
		permissions: 3,
		type: 'System Role',
		active: true,
		users: [
			{ initials: 'DK', name: 'David Kim', email: 'david.kim@acmecorp.com', accent: 'var(--gold)', department: 'Product', status: 'Online' },
			{ initials: 'EC', name: 'Emily Chen', email: 'emily.chen@acmecorp.com', accent: 'var(--patina)', department: 'Marketing', status: 'Away' },
			{ initials: 'NP', name: 'Nina Patel', email: 'nina.patel@acmecorp.com', accent: 'var(--steel)', department: 'Sales', status: 'Offline' },
			{ initials: 'CE', name: 'Chris Evans', email: 'chris.evans@acmecorp.com', accent: 'var(--violet)', department: 'Finance', status: 'Offline' },
		],
	},
	{
		key: 'qa',
		label: 'QA Engineer',
		icon: FlaskConical,
		color: 'var(--patina)',
		count: 2,
		permissions: 5,
		type: 'Custom Role',
		active: true,
		sidebarBadge: { text: 'Custom', className: 'chip-violet' },
		users: [
			{ initials: 'PS', name: 'Priya Shah', email: 'priya.shah@acmecorp.com', accent: 'var(--violet)', department: 'QA', status: 'Offline' },
			{ initials: 'RP', name: 'Raj Patel', email: 'raj.patel@acmecorp.com', accent: 'var(--violet)', department: 'QA', status: 'Online' },
		],
	},
	{
		key: 'intern',
		label: 'Intern',
		icon: BookOpen,
		color: 'var(--patina)',
		count: 1,
		permissions: 2,
		type: 'Custom Role',
		active: false,
		sidebarBadge: { text: 'Inactive', className: 'chip-gold' },
		users: [
			{ initials: 'SL', name: 'Sam Lee', email: 'sam.lee@acmecorp.com', accent: 'var(--gold)', department: 'Engineering', status: 'Offline' },
		],
	},
];

const TOTAL_ROLES = ROLES.length;
const TOTAL_USERS = 24;
const ASSIGNED_USERS = ROLES.reduce((sum, r) => sum + r.count, 0);
const COVERAGE_PCT = Math.round((ASSIGNED_USERS / TOTAL_USERS) * 100);
const UNASSIGNED_USERS = TOTAL_USERS - ASSIGNED_USERS;

export default function RoleAssignments() {
	const {
		data: roles,
		isLoading,
		isError,
		error,
	} = useRoles();

	const [selectedKey, setSelectedKey] = useState('Viewer');

	const roleRows = (roles ?? []).map((role) => ({
		...role,
		type: role.isSystem ? 'SYSTEM' : 'CUSTOM',
		typeChip: role.isSystem
			? 'chip-outline chip-outline-steel'
			: 'chip-outline chip-outline-gold',
	}));

	// const selectedRole = roleRows.find(
	// 	(role) => role.id === selectedKey
	// );

	const selectedRole =
    roleRows.find((role) => role.id === selectedKey) ?? roleRows[0];
	
	// const selectedRole = roles?.find((r) => r.id === selectedKey) ?? roles?.[0];


	console.log(roles, 'rolesz')
	console.log(selectedRole, 'selectedRole')
	return (
		<div>
			<div className="assignments-layout">
				{/* ---- Roles sidebar ---- */}
				<div className="roles-sidebar-panel">
					<div className="roles-sidebar-title">Roles</div>
					{roles?.map((role) => (
						<button
							key={role.id}
							type="button"
							className={`role-sidebar-item${role.id === selectedKey ? ' active' : ''}`}
							onClick={() => setSelectedKey(role.id)}
						>
							<RoleIcon roleName={role.displayName} />
							<span className="role-sidebar-name">{role?.displayName}</span>
							<span className="role-sidebar-count">{role?._count?.userRoles}</span>
						</button>
					))}

					<button className="create-role-dashed-btn" type="button">
						<Plus size={14} />
						Create New Role
					</button>
				</div>
				{/* ...................................................................................................... */}
				{/* ---- Role detail ---- */}
				<div className="role-detail-panel">
					<div className="role-detail-header">
						<div className="role-detail-header-left">
							<span className="role-detail-icon">
								{/* <selectedRole.icon size={18} color={selectedRole.color} /> */}
								{selectedRole && (
									<RoleIcon roleName={selectedRole?.displayName} />
								)}
							</span>
							<span>
								<span className="role-detail-title">{selectedRole?.displayName}</span>
								<span className="role-detail-count">({selectedRole?._count?.userRoles} users)</span>
							</span>
							{/* <span
								className="chip chip-violet"
								style={{ borderRadius: 10, padding: '4px 11px', fontSize: 11.5 }}
							>
								{selectedRole?.type}
							</span> */}
							<span
								className={`chip ${selectedRole?.typeChip}`}
								style={{
									borderRadius: 100,
									padding: '4px 11px',
									fontSize: 11.5,
								}}
							>
								{selectedRole?.type}
							</span>
						</div>
						<div className="header-actions">
							<button className="btn-secondary" type="button">
								<Search size={13} />
								View Permissions
							</button>
							<button className="btn-primary" type="button">
								<Plus size={14} />
								Add Users
							</button>
						</div>
					</div>

					<div className="role-detail-search">
						<div className="search-input">
							<Search size={14} />
							<input type="text" placeholder="Search users in this role..." />
						</div>
					</div>

					<div className="assigned-user-list">
						{selectedRole?.userRoles?.map((user) => (
							<div className="assigned-user-row" key={user.id}>
								<span
									className="owner-avatar"
									style={{ width: 34, height: 34, background: user.accent, color: '#fff' }}
								>
									{/* {user.initials} */}
									{`${user?.user?.firstName?.[0] ?? ''}${user?.user?.lastName?.[0] ?? ''}`}
								</span>
								<span className="assigned-user-info">
									<div className="assigned-user-name">{user?.user?.firstName} {user?.user?.lastName}</div>
									<div className="assigned-user-email">{user?.user?.email}</div>
								</span>
								<span className="assigned-user-meta">
									<span className="chip chip-neutral">{'user.department'}</span>
									<span className="assigned-user-status">
										<span
											style={{
												width: 7,
												height: 7,
												borderRadius: '50%',
												background: STATUS_COLOR[user.status],
												flexShrink: 0,
											}}
										/>
										{'user.status'}
									</span>
								</span>
								<span className="assigned-user-actions">
									<button
										className="icon-btn-fill-steel"
										type="button"
										aria-label={`Reassign ${user.user.firstName} ${user.user.lastName}`}
									>
										<RefreshCw size={13} />
									</button>
									<button
										className="kebab-btn"
										type="button"
										aria-label={`Remove ${user.user.firstName} ${user.user.lastName} from role`}
									>
										<X size={16} />
									</button>
								</span>
							</div>
						))}
					</div>

					<div className="role-detail-footer">
						<div className="role-detail-footer-meta">
							<span>
								Permissions: <strong>{5}</strong>
							</span>
							<span>
								Type: <strong>{selectedRole.type}</strong>
							</span>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
								Status:
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: '50%',
										background: selectedRole.active ? 'var(--patina)' : 'var(--gold)',
									}}
								/>
								<strong>{selectedRole.active ? 'Active' : 'Inactive'}</strong>
							</span>
							<span>
								Created:{' '}
								<strong>
									{selectedRole.type === 'System Role' ? 'Pre-defined' : 'Jan 2026'}
								</strong>
							</span>
						</div>
						<div style={{ display: 'flex', gap: 10 }}>
							<button className="btn-secondary" type="button">
								<Search size={13} />
								View Permissions
							</button>
							<button className="btn-outline-danger" type="button" style={{ width: 'auto' }}>
								<Trash2 size={14} />
								Remove All
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
