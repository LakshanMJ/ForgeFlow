'use client';

import DataTable from '@/shared/components/DataTable';
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
} from 'lucide-react';
import { useState } from 'react';
import AddUserModal from './AddUserModal';
import SearchInput from '@/shared/components/SearchInput';

type Status = 'Online' | 'Away' | 'Offline';

const STATUS_COLOR: Record<Status, string> = {
  Online: 'var(--patina)',
  Away: 'var(--gold)',
  Offline: 'var(--ember)',
};

type UserRow = {
  initials: string;
  name: string;
  email: string;
  isYou?: boolean;
  role: string;
  roleClass: string;
  status: Status;
  department: string;
  joined: string;
  accent: string;
};

export type User = {
  name: string;
  email: string;
  initials: string;
  accent: string;
  isYou?: boolean;
  role: string;
  roleClass: string;
  status: 'Active' | 'Inactive' | 'Pending'; // adjust to match your data
  department: string;
  joined: string;
};

const USERS: UserRow[] = [
  { initials: 'WS', name: 'Wile Smith', email: 'wile.smith@acmecorp.com', isYou: true, role: 'OWNER', roleClass: 'chip-outline-ember', status: 'Online', department: 'Engineering', joined: 'Dec 1, 2024', accent: 'var(--steel)' },
  { initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.johnson@acmecorp.com', role: 'ADMIN', roleClass: 'chip-outline-steel', status: 'Online', department: 'Engineering', joined: 'Dec 1, 2024', accent: 'var(--ember)' },
  { initials: 'AT', name: 'Alex Turner', email: 'alex.turner@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Away', department: 'Design', joined: 'Dec 2, 2024', accent: 'var(--gold)' },
  { initials: 'MB', name: 'Mike Brown', email: 'mike.brown@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Online', department: 'Engineering', joined: 'Dec 3, 2024', accent: 'var(--patina)' },
  { initials: 'LW', name: 'Lisa Wong', email: 'lisa.wong@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Offline', department: 'Engineering', joined: 'Dec 4, 2024', accent: 'var(--steel)' },
  { initials: 'PS', name: 'Priya Shah', email: 'priya.shah@acmecorp.com', role: 'DEVELOPER', roleClass: 'chip-outline-patina', status: 'Offline', department: 'QA', joined: 'Dec 5, 2024', accent: 'var(--violet)' },
  { initials: 'DK', name: 'David Kim', email: 'david.kim@acmecorp.com', role: 'VIEWER', roleClass: 'chip-outline-neutral', status: 'Online', department: 'Product', joined: 'Dec 10, 2024', accent: 'var(--gold)' },
  { initials: 'EC', name: 'Emily Chen', email: 'emily.chen@acmecorp.com', role: 'VIEWER', roleClass: 'chip-outline-neutral', status: 'Away', department: 'Marketing', joined: 'Dec 12, 2024', accent: 'var(--patina)' },
];

export default function UsersPage() {

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);


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
            {user.initials}
          </span>
          <div>
            <div className="project-info-name">
              {user.name}
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
        <span className={`chip ${user.roleClass}`}>{user.role}</span>
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
          {user.status}
        </span>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      render: (user) => user.department,
    },
    {
      key: 'joined',
      label: 'Joined',
      render: (user) => user.joined,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="kebab-cell">
          <button className="kebab-btn" type="button" aria-label="User actions">
            <MoreVertical size={15} />
          </button>
        </div>
      ),
    },
  ];

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

      <AddUserModal open={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />

      <div className="users-stat-row" style={{ marginBottom: 20 }}>
        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--ember-tint)', color: 'var(--ember)' }}
          >
            <UsersIcon size={20} />
          </span>
          <div>
            <div className="users-stat-value">24</div>
            <div className="users-stat-label">Total Users</div>
            <div className="users-stat-sub">
              <span style={{ color: 'var(--patina)' }}>↑</span> 3 this week
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
          >
            <Activity size={20} />
          </span>
          <div>
            <div className="users-stat-value">8</div>
            <div className="users-stat-label">Active Now</div>
            <div className="users-stat-sub status-line">
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--patina)',
                  display: 'inline-block',
                }}
              />
              Online
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
          >
            <Mail size={20} />
          </span>
          <div>
            <div className="users-stat-value">5</div>
            <div className="users-stat-label">Pending Invitations</div>
            <button className="users-stat-sub-link" style={{ color: 'var(--ember)' }}>
              View pending
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}
          >
            <ShieldCheck size={20} />
          </span>
          <div>
            <div className="users-stat-value">3</div>
            <div className="users-stat-label">Roles Available</div>
            <button className="users-stat-sub-link" style={{ color: 'var(--steel)' }}>
              Manage roles
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        {/* <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search users..." />
        </div> */}
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
        <button className="btn-primary" type="button" style={{ marginLeft: 'auto' }} onClick={() => setIsAddUserOpen(true)}>
          <Plus size={14} />
          Add User
        </button>
      </div>

      <DataTable<User>
        columns={userColumns}
        data={USERS}
        totalItems={24}
        currentPage={1}
        totalPages={3}
        columnWidths="2.5fr 1.2fr 1.2fr 1.5fr 1.2fr 80px"
      />
    </>
  );
}
