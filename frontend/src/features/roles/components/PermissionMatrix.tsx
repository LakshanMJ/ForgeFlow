'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Crown,
  Shield,
  ClipboardList,
  Laptop,
  Eye,
  FlaskConical,
  BookOpen,
  Folder,
  CheckSquare,
  Users,
  Paperclip,
  BarChart3,
  Settings,
  Check,
  X,
} from 'lucide-react';

type Grant = 'allowed' | 'denied' | 'limited';

type RoleCol = {
  key: string;
  label: string;
  icon: typeof Crown;
  color: string;
};

const ROLES: RoleCol[] = [
  { key: 'owner', label: 'Owner', icon: Crown, color: 'var(--ember)' },
  { key: 'admin', label: 'Admin', icon: Shield, color: 'var(--ember)' },
  { key: 'pm', label: 'PM', icon: ClipboardList, color: 'var(--gold)' },
  { key: 'dev', label: 'Dev', icon: Laptop, color: 'var(--steel)' },
  { key: 'viewer', label: 'Viewer', icon: Eye, color: 'var(--gold)' },
  { key: 'qa', label: 'QA', icon: FlaskConical, color: 'var(--patina)' },
  { key: 'intern', label: 'Intern', icon: BookOpen, color: 'var(--patina)' },
];

type PermissionRow = {
  label: string;
  grants: Grant[]; // in ROLES order
};

type Module = {
  key: string;
  title: string;
  icon: typeof Folder;
  color: string;
  permissions: PermissionRow[];
};

const A: Grant = 'allowed';
const D: Grant = 'denied';
const L: Grant = 'limited';

const MODULES: Module[] = [
  {
    key: 'projects',
    title: 'Projects',
    icon: Folder,
    color: 'var(--gold)',
    permissions: [
      { label: 'Create Project', grants: [A, A, A, D, D, D, D] },
      { label: 'Edit Project', grants: [A, A, A, D, D, D, D] },
      { label: 'Delete Project', grants: [A, A, D, D, D, D, D] },
      { label: 'Archive Project', grants: [A, A, A, D, D, D, D] },
      { label: 'View Project', grants: [A, A, A, A, A, A, A] },
    ],
  },
  {
    key: 'tasks',
    title: 'Tasks',
    icon: CheckSquare,
    color: 'var(--patina)',
    permissions: [
      { label: 'Create Task', grants: [A, A, A, A, D, A, D] },
      { label: 'Edit Task', grants: [A, A, A, A, D, A, D] },
      { label: 'Delete Task', grants: [A, A, A, D, D, D, D] },
      { label: 'Assign Task', grants: [A, A, A, A, D, D, D] },
      { label: 'Move Task', grants: [A, A, A, A, D, A, D] },
    ],
  },
  {
    key: 'team',
    title: 'Team',
    icon: Users,
    color: 'var(--steel)',
    permissions: [
      { label: 'Invite Users', grants: [A, A, A, D, D, D, D] },
      { label: 'Manage Roles', grants: [A, A, D, D, D, D, D] },
      { label: 'View Team Members', grants: [A, A, A, A, A, A, A] },
    ],
  },
  {
    key: 'files',
    title: 'Files',
    icon: Paperclip,
    color: 'var(--violet)',
    permissions: [
      { label: 'View Files', grants: [A, A, A, A, A, A, A] },
      { label: 'Upload Files', grants: [A, A, A, A, D, A, A] },
      { label: 'Delete Files', grants: [A, A, A, D, D, D, D] },
    ],
  },
  {
    key: 'analytics',
    title: 'Analytics & Reports',
    icon: BarChart3,
    color: 'var(--gold)',
    permissions: [
      { label: 'View Analytics', grants: [A, A, A, D, D, D, D] },
      { label: 'Export Data', grants: [A, A, L, D, D, D, D] },
      { label: 'View Audit Logs', grants: [A, A, D, D, D, D, D] },
    ],
  },
  {
    key: 'system',
    title: 'System',
    icon: Settings,
    color: 'var(--ember)',
    permissions: [
      { label: 'Manage Settings', grants: [A, L, D, D, D, D, D] },
      { label: 'Manage Billing', grants: [A, D, D, D, D, D, D] },
      { label: 'View System Logs', grants: [A, A, D, D, D, D, D] },
      { label: 'Manage Integrations', grants: [A, A, L, D, D, D, D] },
    ],
  },
];

const TOTAL_PERMISSIONS = MODULES.reduce((sum, m) => sum + m.permissions.length, 0);

function GrantBadge({ grant }: { grant: Grant }) {
  if (grant === 'limited') {
    return <span className="matrix-badge limited" aria-label="Limited" />;
  }
  return (
    <span
      className={`matrix-badge ${grant === 'allowed' ? 'allowed' : 'denied'}`}
      aria-label={grant === 'allowed' ? 'Allowed' : 'Denied'}
    >
      {grant === 'allowed' ? <Check size={14} /> : <X size={14} />}
    </span>
  );
}

export default function PermissionMatrix() {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(MODULES.map((m) => m.key))
  );

  const toggleModule = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div>
      <div className="page-header-row" style={{ marginBottom: 20 }}>
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Permission Matrix
          </h1>
          <span
            className="chip chip-violet"
            style={{ borderRadius: 100, padding: '5px 12px', fontSize: 12 }}
          >
            7 roles &middot; {TOTAL_PERMISSIONS} permissions
          </span>
        </div> */}
        <div className="header-actions">
          <button className="btn-secondary" type="button">
            <Download size={14} />
            Export
          </button>
          <button className="btn-secondary" type="button">
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      <div className="matrix-toolbar-row">
        <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search permissions..." />
        </div>
        <button className="filter-select" type="button">
          All Modules
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="table-card">
        <div className="matrix-scroll">
          <div className="matrix-head">
            <div className="matrix-head-label">Permission</div>
            {ROLES.map((role) => (
              <div className="matrix-role-header" key={role.key}>
                <role.icon size={16} color={role.color} />
                <span className="matrix-role-header-label">{role.label}</span>
              </div>
            ))}
          </div>

          {MODULES.map((module) => {
            const isOpen = expanded.has(module.key);
            return (
              <div key={module.key}>
                <div
                  className="matrix-group-header"
                  onClick={() => toggleModule(module.key)}
                >
                  <module.icon size={14} color={module.color} />
                  {module.title}
                  {isOpen ? (
                    <ChevronUp size={15} className="chevron-end" />
                  ) : (
                    <ChevronDown size={15} className="chevron-end" />
                  )}
                </div>

                {isOpen &&
                  module.permissions.map((perm) => (
                    <div className="matrix-row" key={perm.label}>
                      <div>{perm.label}</div>
                      {perm.grants.map((grant, i) => (
                        <div className="matrix-cell" key={ROLES[i].key}>
                          <GrantBadge grant={grant} />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        <div className="matrix-legend-row">
          <div className="matrix-legend-items">
            <span className="matrix-legend-item">
              <span className="matrix-badge allowed" style={{ width: 20, height: 20 }}>
                <Check size={12} />
              </span>
              Allowed
            </span>
            <span className="matrix-legend-item">
              <span className="matrix-badge denied" style={{ width: 20, height: 20 }}>
                <X size={12} />
              </span>
              Denied
            </span>
            <span className="matrix-legend-item">
              <span className="matrix-badge limited" />
              Limited (Permission varies)
            </span>
          </div>
          <span>
            7 roles &middot; {TOTAL_PERMISSIONS} permissions &middot; Updated 2h ago
          </span>
        </div>
      </div>

      <div className="matrix-footer-row">
        <span>
          Showing all <strong style={{ color: 'var(--text)' }}>{TOTAL_PERMISSIONS}</strong>{' '}
          permissions
        </span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" type="button">
            <Download size={14} />
            Export CSV
          </button>
          <button className="btn-primary" type="button">
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
