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

type Status = 'Online' | 'Away' | 'Offline';

const STATUS_COLOR: Record<Status, string> = {
  Online: 'var(--patina)',
  Away: 'var(--gold)',
  Offline: 'var(--text-tertiary)',
};

type AssignedUser = {
  initials: string;
  name: string;
  email: string;
  accent: string;
  department: string;
  status: Status;
};

type RoleType = 'System Role' | 'Custom Role';

type RoleDef = {
  key: string;
  label: string;
  icon: typeof Crown;
  color: string;
  count: number;
  permissions: number;
  type: RoleType;
  active: boolean;
  sidebarBadge?: { text: string; className: string };
  users: AssignedUser[];
};

const ROLES: RoleDef[] = [
  {
    key: 'owner',
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
    key: 'admin',
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
    key: 'pm',
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
    key: 'developer',
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
    key: 'viewer',
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
  const [selectedKey, setSelectedKey] = useState(ROLES[3].key); // Developer, matching the reference
  const selectedRole = ROLES.find((r) => r.key === selectedKey) ?? ROLES[0];

  return (
    <div>
      <div className="page-header-row" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Role Assignments
          </h1>
          <span
            className="chip chip-violet"
            style={{ borderRadius: 100, padding: '5px 12px', fontSize: 12 }}
          >
            {TOTAL_ROLES} roles &middot; {TOTAL_USERS} users
          </span>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" type="button">
            <Download size={14} />
            Export
          </button>
          <button className="btn-primary" type="button">
            <Plus size={14} />
            Create New Role
          </button>
        </div>
      </div>

      <div className="users-stat-row" style={{ marginBottom: 20 }}>
        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--violet-tint)', color: 'var(--violet)' }}
          >
            <Crown size={20} />
          </span>
          <div>
            <div className="users-stat-value">{TOTAL_ROLES}</div>
            <div className="users-stat-label">Total Roles Defined</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ↑ 2 custom roles
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
          >
            <Users size={20} />
          </span>
          <div>
            <div className="users-stat-value">{TOTAL_USERS}</div>
            <div className="users-stat-label">Total Users in Org</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ↑ 3 this month
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--steel-tint)', color: 'var(--steel)' }}
          >
            <UserCheck size={20} />
          </span>
          <div>
            <div className="users-stat-value">{ASSIGNED_USERS}</div>
            <div className="users-stat-label">Assigned to Roles</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              {COVERAGE_PCT}% coverage
            </div>
          </div>
        </div>

        <div className="users-stat-card">
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
          >
            <AlertTriangle size={20} />
          </span>
          <div>
            <div className="users-stat-value">{UNASSIGNED_USERS}</div>
            <div className="users-stat-label">Unassigned Users</div>
            <div className="users-stat-sub" style={{ color: 'var(--gold)' }}>
              ⚠ Needs attention
            </div>
          </div>
        </div>
      </div>

      <div className="assignments-layout">
        {/* ---- Roles sidebar ---- */}
        <div className="roles-sidebar-panel">
          <div className="roles-sidebar-title">Roles</div>
          {ROLES.map((role) => (
            <button
              key={role.key}
              type="button"
              className={`role-sidebar-item${role.key === selectedKey ? ' active' : ''}`}
              onClick={() => setSelectedKey(role.key)}
            >
              <span className="role-sidebar-icon">
                <role.icon size={14} color={role.color} />
              </span>
              <span className="role-sidebar-name">{role.label}</span>
              {role.sidebarBadge && (
                <span
                  className={`chip ${role.sidebarBadge.className} role-sidebar-badge`}
                >
                  {role.sidebarBadge.text}
                </span>
              )}
              <span className="role-sidebar-count">{role.count}</span>
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
                <selectedRole.icon size={18} color={selectedRole.color} />
              </span>
              <span>
                <span className="role-detail-title">{selectedRole.label}</span>
                <span className="role-detail-count">({selectedRole.count} users)</span>
              </span>
              <span
                className="chip chip-violet"
                style={{ borderRadius: 100, padding: '4px 11px', fontSize: 11.5 }}
              >
                {selectedRole.type}
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
            {selectedRole.users.map((user) => (
              <div className="assigned-user-row" key={user.email}>
                <span
                  className="owner-avatar"
                  style={{ width: 34, height: 34, background: user.accent, color: '#fff' }}
                >
                  {user.initials}
                </span>
                <span className="assigned-user-info">
                  <div className="assigned-user-name">{user.name}</div>
                  <div className="assigned-user-email">{user.email}</div>
                </span>
                <span className="assigned-user-meta">
                  <span className="chip chip-neutral">{user.department}</span>
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
                    {user.status}
                  </span>
                </span>
                <span className="assigned-user-actions">
                  <button
                    className="icon-btn-fill-steel"
                    type="button"
                    aria-label={`Reassign ${user.name}`}
                  >
                    <RefreshCw size={13} />
                  </button>
                  <button
                    className="kebab-btn"
                    type="button"
                    aria-label={`Remove ${user.name} from role`}
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
                Permissions: <strong>{selectedRole.permissions}</strong>
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
