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

export default function RolesPage() {
  const [tab, setTab] = useState('list');
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
        {/* <div className="header-actions">
          <button className="btn-secondary" type="button">
            <Download size={14} />
            Export
          </button>
          <button className="btn-primary" type="button">
            <Plus size={14} />
            Create New Role
          </button>
        </div> */}
      </div>
      <div className="users-stat-row" style={{ marginBottom: 20 }}>
        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--ember-tint)', color: 'var(--ember)' }}
          >
            <Shield size={20} />
          </span>
          <div>
            <div className="users-stat-value">5</div>
            <div className="users-stat-label">Total Roles Defined</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ↑ 2 this month
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}
          >
            <KeyRound size={20} />
          </span>
          <div>
            <div className="users-stat-value">12</div>
            <div className="users-stat-label">Permissions Available</div>
            <div className="users-stat-sub" style={{ color: 'var(--steel)' }}>
              Across all roles
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
          >
            <UserCircle size={20} />
          </span>
          <div>
            <div className="users-stat-value">3</div>
            <div className="users-stat-label">Custom Roles</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ↑ 1 created this week
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
          >
            <UsersIcon size={20} />
          </span>
          <div>
            <div className="users-stat-value">2</div>
            <div className="users-stat-label">Users with Custom Roles</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              8 total users
            </div>
          </div>
        </div>
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
