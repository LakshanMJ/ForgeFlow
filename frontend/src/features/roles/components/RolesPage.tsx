'use client';

import { useState } from 'react';
import {
	Shield,
	KeyRound,
	UserCircle,
	Users as UsersIcon,
	Download,
	Plus,
} from 'lucide-react';
import Tabs from '@/shared/components/Tabs';
import { TabPanel } from '@mui/lab';
import RolesList from './RolesList';
import RoleAssignments from './RoleAssignments';
import PermissionMatrix from './PermissionMatrix';
import { useRoles } from '../hooks/useRoles';
import Card from '@/shared/components/Card';

export default function RolesPage() {
	const [tab, setTab] = useState('assignments');
	const {
		data: roles,
		isLoading,
		isError,
		error,
	} = useRoles();

	return (
		<>
			<div className="roles-page-header-row">
				<div className="roles-header-left">
					<div className="roles-title-row">
						<h1 className="page-title" style={{ marginBottom: 0 }}>
							Roles &amp; Permissions
						</h1>
					</div>
				</div>
			</div>

			<div className="users-stat-row" style={{ marginBottom: 20 }}>
				<Card
					icon={Shield}
					value={5}
					label="Total Roles Defined"
					// sub="↑ 2 this month"
					iconStyle={{ background: "var(--ember-tint)", color: "var(--ember)", }}
				/>

				<Card
					icon={KeyRound}
					value={12}
					label="Permissions Available"
					// sub="↑ 2 this month"
					iconStyle={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}
				/>

				<Card
					icon={UserCircle}
					value={3}
					label="Custom Roles"
					// sub="↑ 1 created this week"
					iconStyle={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
				/>

				<Card
					icon={UsersIcon}
					value={2}
					label="Users with Custom Roles"
					// sub="8 total users"
					iconStyle={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
				/>
			</div>

			<Tabs
				value={tab}
				onChange={setTab}
				tabs={[
					{
						label: 'Roles List',
						value: 'list',
					},
					{
						label: 'Permission Matrix',
						value: 'matrix',
					},
					{
						label: 'Role Assignments',
						value: 'assignments',
					}
				]}
			>
				<TabPanel
					value="list"
					sx={{ p: 0, pt: '20px' }}
				>
					<RolesList />
				</TabPanel>
				<TabPanel
					value="matrix"
					sx={{ p: 0, pt: '20px' }}
				>
					<PermissionMatrix />
				</TabPanel>
				<TabPanel
					value="assignments"
					sx={{ p: 0, pt: '20px' }}
				>
					<RoleAssignments />
				</TabPanel>
			</Tabs>
		</>
	);
}
