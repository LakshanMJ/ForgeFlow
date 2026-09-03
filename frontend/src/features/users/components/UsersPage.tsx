'use client';

import DataTable, { type Column } from '@/shared/components/DataTable';
import {
	Search,
	ChevronDown,
	Plus,
	Users as UsersIcon,
	Activity,
	Mail,
	ShieldCheck,
	ChevronRight,
	MoreVertical,
	ChevronLeft,
	Shield,
	Save,
	Pencil,
	Trash2,
	Eye,
} from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/shared/components/SearchInput';
import Modal from '@/shared/components/Modal';
import AddUserForm from './UserForm';
import { useUsers } from '../hooks/useUsers';
import type { CreateUserData, InviteUserData, UpdateUserData, User } from '../types/user.types';
import { useCreateRole } from '@/features/roles/hooks/useCreateRole';
import { useUpdateRole } from '@/features/roles/hooks/useUpdateRole';
import { useCreateUser } from '../hooks/useCreateUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useInviteUser } from '../hooks/useInviteUser';
import Card from '@/shared/components/Card';
import UserForm from './UserForm';

type Status = 'Online' | 'Away' | 'Offline';

const STATUS_COLOR: Record<Status, string> = {
	Online: 'var(--patina)',
	Away: 'var(--gold)',
	Offline: 'var(--ember)',
};


// const USERS: UserRow[] = [
// 	{ initials: 'WS', name: 'Wile Smith', email: 'wile.smith@acmecorp.com', isYou: true, role: 'OWNER', roleClass: 'chip-outline-ember', status: 'Online', department: 'Engineering', joined: 'Dec 1, 2024', accent: 'var(--steel)' },
// 	{ initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.johnson@acmecorp.com', role: 'ADMIN', roleClass: 'chip-outline-steel', status: 'Online', department: 'Engineering', joined: 'Dec 1, 2024', accent: 'var(--ember)' },
// 	{ initials: 'AT', name: 'Alex Turner', email: 'alex.turner@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Away', department: 'Design', joined: 'Dec 2, 2024', accent: 'var(--gold)' },
// 	{ initials: 'MB', name: 'Mike Brown', email: 'mike.brown@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Online', department: 'Engineering', joined: 'Dec 3, 2024', accent: 'var(--patina)' },
// 	{ initials: 'LW', name: 'Lisa Wong', email: 'lisa.wong@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Offline', department: 'Engineering', joined: 'Dec 4, 2024', accent: 'var(--steel)' },
// 	{ initials: 'PS', name: 'Priya Shah', email: 'priya.shah@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Offline', department: 'QA', joined: 'Dec 5, 2024', accent: 'var(--violet)' },
// 	{ initials: 'DK', name: 'David Kim', email: 'david.kim@acmecorp.com', role: 'VIEWER', roleClass: 'chip-outline-neutral', status: 'Online', department: 'Product', joined: 'Dec 10, 2024', accent: 'var(--gold)' },
// 	{ initials: 'EC', name: 'Emily Chen', email: 'emily.chen@acmecorp.com', role: 'VIEWER', roleClass: 'chip-outline-neutral', status: 'Away', department: 'Marketing', joined: 'Dec 12, 2024', accent: 'var(--patina)' },
// ];

export default function UsersPage() {

	const {
		data: users = [],
		isLoading: isUsersLoading,
		isError: isUsersError,
	} = useUsers();
	console.log(users,'USERS DATA');
	// const [isAddUserOpen, setIsAddUserOpen] = useState(false);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [userModalMode, setUserModalMode] = useState<'create' | 'view' | 'edit'>('create');
	const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

	const createUserMutation = useInviteUser();
	const inviteUserMutation = useInviteUser();
	const updateUserMutation = useUpdateUser();

	const STATUS_COLOR: Record<string, string> = {
		Active: '#10B981',
		Inactive: '#6B7280',
		Pending: '#F59E0B',
	};

	const userColumns: Column<User>[] = [
		{
			key: 'user',
			label: 'User',
			render: (user) => (
				<div className="project-cell">
					<span
						className="owner-avatar"
						style={{ width: 34, height: 34, background: user.accent, color: '#fff' }}
					>
						{user.firstName?.[0]}
						{user.lastName?.[0]}
					</span>
					<div>
						<div className="project-info-name">
							{`${user.firstName} ${user.lastName}`}
							{user.isYou && <span className="you-tag">YOU</span>}
						</div>
						<div className="project-info-desc">{user.email}</div>
					</div>
				</div>
			),
		},
		{
			key: 'role',
			label: 'Role',
			render: (user) => (
				<span className={`chip ${user.roleClass}`}>
					{user.roles?.map((role) => role.displayName).join(', ') || '--'}
				</span>
			),
		},
		{
			key: 'status',
			label: 'Status',
			render: (user) => (
				<span className="user-status-cell">
					<span
						style={{
							width: 7,
							height: 7,
							borderRadius: '50%',
							background: STATUS_COLOR[user.status],
							flexShrink: 0,
						}}
					/>
					{user.status || '--'}
				</span>
			),
		},
		{
			key: 'department',
			label: 'Department',
			render: (user) => user?.department?.name || '--',
		},
		// {
		//   key: 'joined',
		//   label: 'Joined',
		//   render: (user) => user.createdAt,
		// },
		{
			key: 'joined',
			label: 'Joined',
			render: (user) => (
				<span>
					{new Date(user.createdAt).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}
				</span>
			),
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (user) => (
				<span className="actions-cell-group">
					<button
						className="kebab-btn"
						type="button"
						aria-label={`View ${user.name}`}
						onClick={() => {
							setSelectedUser(user);
							setUserModalMode('view');
							setIsUserModalOpen(true);
						}}
					>
						<Eye size={15} />
					</button>
					<button
						className="kebab-btn"
						type="button"
						aria-label={`Edit ${'role.name'}`}
						onClick={() => {
							setSelectedUser(user);
							setUserModalMode('edit');
							setIsUserModalOpen(true);
						}}
					>
						<Pencil size={15} />
					</button>

					<button
						className="kebab-btn"
						type="button"
						aria-label={`Delete ${'role.name'}`}
					>
						<Trash2 size={15} />
					</button>
				</span>
			),
		},
	];


	if (
		isUsersLoading
	) {
		return (
			<div className="role-modal-card">
				Loading...
			</div>
		);
	}

	if (
		isUsersError
	) {
		return (
			<div className="role-modal-card">
				Failed to load user data.
			</div>
		);
	}

	const handleSubmit = (data: InviteUserData) => {

		console.log('🔥 PARENT RECEIVED:', data);

		inviteUserMutation.mutate(data, {
			onSuccess: (response) => {
				console.log('✅ USER INVITED:', response);
				setIsUserModalOpen(false);
			},
			onError: (error) => {
				console.error('❌ INVITE USER ERROR:', error);
			},
		});
	};

	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<h1 className="page-title" style={{ marginBottom: 4 }}>
					Users
				</h1>
				<p className="page-subtitle" style={{ marginBottom: 0 }}>
					Manage system users and their access
				</p>
			</div>

			<Modal
				isOpen={isUserModalOpen}
				onClose={() => setIsUserModalOpen(false)}
				title={
					userModalMode === 'create'
						? 'Create New User'
						: userModalMode === 'edit'
							? 'Edit User'
							: 'View User'
				}
				icon={<Shield size={18} />}
				size="lg"
				submitFormId="user-form"
				showSubmit={userModalMode !== 'view'}
				submitLabel={
					userModalMode === 'edit'
						? 'Save Changes'
						: 'Save User'
				}
				submitIcon={<Save size={14} />}
			>
				<UserForm
					mode={userModalMode}
					existingUserDetail={selectedUser}
					onSubmit={handleSubmit}
				/>
			</Modal>

			<div className="users-stat-row" style={{ marginBottom: 20 }}>
				<Card
					icon={UsersIcon}
					value={24}
					label="Total Users"
					// sub="↑ 3 this week"
					iconStyle={{ background: 'var(--ember-tint)', color: 'var(--ember)' }}
				/>

				<Card
					icon={Activity}
					value={8}
					label="Active Now"
					sub="Online"
					iconStyle={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
				/>

				<Card
					icon={Mail}
					value={5}
					label="Pending Invitations"
					// sub="View pending"
					iconStyle={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
				/>

				<Card
					icon={ShieldCheck}
					value={3}
					label="Roles Available"
					// sub="View pending"
					iconStyle={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}
				/>
			</div>

			<div className="filter-bar">
				<SearchInput
					placeholder="Search users..."
					iconSize={14}
				/>
				<button className="filter-select" type="button">
					All Roles
					<ChevronDown size={14} />
				</button>
				<button className="filter-select" type="button">
					All Status
					<ChevronDown size={14} />
				</button>
				<button className="filter-select" type="button">
					All Departments
					<ChevronDown size={14} />
				</button>
				<button
					className="btn-primary"
					type="button"
					style={{ marginLeft: 'auto' }}
					onClick={() => {
						setSelectedUser(undefined);
						setUserModalMode('create');	
						setIsUserModalOpen(true);
					}}
				>
					<Plus size={14} />
					Add User
				</button>
			</div>

			<DataTable<User>
				columns={userColumns}
				data={users}
				totalItems={24}
				currentPage={1}
				totalPages={3}
				columnWidths="2.5fr 1.2fr 1.2fr 1.5fr 1.2fr 100px"
			/>
		</>
	);
}
