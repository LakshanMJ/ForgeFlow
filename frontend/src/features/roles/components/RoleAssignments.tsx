'use client';

import { useEffect, useState } from 'react';
import {
	Plus,
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

export default function RoleAssignments() {
	const {
		data: roles,
		isLoading,
		isError,
		error,
	} = useRoles();


	const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (roles?.length && !selectedKey) {
			setSelectedKey(roles[0].id);
		}
	}, [roles, selectedKey]);

	const roleRows = (roles ?? []).map((role) => ({
		...role,
		type: role.isSystem ? 'SYSTEM' : 'CUSTOM',
		typeChip: role.isSystem
			? 'chip-outline chip-outline-steel'
			: 'chip-outline chip-outline-gold',
	}));

	const selectedRole = roleRows.find((role) => role.id === selectedKey) ?? roleRows[0];

	console.log(selectedRole, 'selectedRole');
	if (isLoading) {
		return <div>Loading roles...</div>;
	}

	if (isError) {
		return <div>Failed to load roles: {error?.message}</div>;
	}

	if (!selectedRole) {
		return <div>No roles found.</div>;
	}

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
									style={{ width: 34, height: 34, background: user.accent, color: '#fff' }} // currently no accent color is being sent from the backend, so this will be a placeholder until accent color is implemented in the backend	
								>

									{`${user?.user?.firstName?.[0] ?? ''}${user?.user?.lastName?.[0] ?? ''}`}
								</span>
								<span className="assigned-user-info">
									<div className="assigned-user-name">{user?.user?.firstName} {user?.user?.lastName}</div>
									<div className="assigned-user-email">{user?.user?.email}</div>
								</span>
								<span className="assigned-user-meta">
									<span className="chip chip-neutral">{user?.user?.department?.name}</span>
									<span className="assigned-user-status">
										<span
											style={{
												width: 7,
												height: 7,
												borderRadius: '50%',
												background: STATUS_COLOR[user.status], // clear this errror after user status is implemented with websocket
												flexShrink: 0,
											}}
										/>
										{'user.status'}   // implement this with websocket to get the real-time status of the user
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
								Type: <strong>{selectedRole?.type}</strong>
							</span>
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
								Status:
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: '50%',
										background: 'var(--patina)',
									}}
								/>
								<strong>Active</strong>
							</span>
							<span>
								Created:{' '}
								<strong>
									{selectedRole?.type === 'SYSTEM' ? 'Pre-defined' : 'Jan 2026'}
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
