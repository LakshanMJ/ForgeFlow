'use client';

import { useState } from 'react';
import {
  Shield,
  X,
  ChevronDown,
  FolderOpen,
  ClipboardList,
  Users,
  Paperclip,
  BarChart3,
  Check,
  Plus,
  Save,
} from 'lucide-react';

type Accent = 'ember' | 'steel' | 'patina' | 'violet' | 'gold';

type PermissionItem = {
  key: string;
  label: string;
  checked: boolean;
};

type PermissionGroup = {
  key: string;
  title: string;
  icon: typeof FolderOpen;
  accent: Accent;
  accentVar: string;
  items: PermissionItem[];
};

const INITIAL_GROUPS: PermissionGroup[] = [
  {
    key: 'project',
    title: 'Project Permissions',
    icon: FolderOpen,
    accent: 'ember',
    accentVar: 'var(--ember)',
    items: [
      { key: 'createProjects', label: 'Create Projects', checked: true },
      { key: 'editProjects', label: 'Edit Projects', checked: true },
      { key: 'deleteProjects', label: 'Delete Projects', checked: false },
      { key: 'viewProjects', label: 'View Projects', checked: true },
    ],
  },
  {
    key: 'task',
    title: 'Task Permissions',
    icon: ClipboardList,
    accent: 'steel',
    accentVar: 'var(--steel)',
    items: [
      { key: 'createTasks', label: 'Create Tasks', checked: true },
      { key: 'editTasks', label: 'Edit Tasks', checked: true },
      { key: 'deleteTasks', label: 'Delete Tasks', checked: false },
      { key: 'assignTasks', label: 'Assign Tasks', checked: true },
    ],
  },
  {
    key: 'team',
    title: 'Team Permissions',
    icon: Users,
    accent: 'patina',
    accentVar: 'var(--patina)',
    items: [
      { key: 'inviteUsers', label: 'Invite Users', checked: false },
      { key: 'manageRoles', label: 'Manage Roles', checked: false },
      { key: 'viewTeamMembers', label: 'View Team Members', checked: true },
    ],
  },
  {
    key: 'resources',
    title: 'Project Resources',
    icon: Paperclip,
    accent: 'violet',
    accentVar: 'var(--violet)',
    items: [
      { key: 'viewFiles', label: 'View Files', checked: true },
      { key: 'uploadFiles', label: 'Upload Files', checked: true },
      { key: 'deleteFiles', label: 'Delete Files', checked: false },
    ],
  },
  {
    key: 'analytics',
    title: 'Analytics & Reports',
    icon: BarChart3,
    accent: 'gold',
    accentVar: 'var(--gold)',
    items: [
      { key: 'viewAnalytics', label: 'View Analytics', checked: true },
      { key: 'exportData', label: 'Export Data', checked: false },
      { key: 'viewAuditLogs', label: 'View Audit Logs', checked: false },
    ],
  },
];

const ASSIGNED_USERS = [
  { initials: 'PS', name: 'Priya Shah', role: 'QA Engineer', accent: 'var(--violet)' },
  { initials: 'RP', name: 'Raj Patel', role: 'QA Engineer', accent: 'var(--violet)' },
];

export default function CreateRoleModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [assignedUsers, setAssignedUsers] = useState(ASSIGNED_USERS);

  if (!open) return null;

  const togglePermission = (groupKey: string, itemKey: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.key !== groupKey
          ? g
          : {
              ...g,
              items: g.items.map((it) =>
                it.key === itemKey ? { ...it, checked: !it.checked } : it
              ),
            }
      )
    );
  };

  const removeUser = (initials: string) => {
    setAssignedUsers((prev) => prev.filter((u) => u.initials !== initials));
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-header-icon">
              <Shield size={18} />
            </span>
            <span className="modal-title">Create New Role</span>
          </div>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="role-modal-card">
            <div className="role-modal-grid">
              {/* ---- Role Details ---- */}
              <div>
                <div className="role-section-label">Role Details</div>

                <div className="form-field">
                  <label className="form-label">
                    Role Name<span className="required">*</span>
                  </label>
                  <input className="form-input" type="text" defaultValue="QA Engineer" />
                  <span className="form-help-text">Unique name for this role</span>
                </div>

                <div className="form-field">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    defaultValue="Quality Assurance Engineer role responsible for testing and QA processes across all projects."
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Type</label>
                  <button className="form-select-btn" type="button">
                    <span className="form-select-btn-left">Custom Role</span>
                    <ChevronDown size={14} className="chevron" />
                  </button>
                </div>

                <div className="form-field" style={{ marginBottom: 0 }}>
                  <label className="form-label">Based On</label>
                  <button className="form-select-btn" type="button">
                    <span className="form-select-btn-left">Developer</span>
                    <ChevronDown size={14} className="chevron" />
                  </button>
                  <span className="form-help-text">
                    Start with permissions from an existing role
                  </span>
                </div>
              </div>

              {/* ---- Permissions ---- */}
              <div>
                <div className="role-section-label">Permissions</div>

                {groups.map((group) => (
                  <div className="permission-group" key={group.key}>
                    <div className="permission-group-header">
                      <group.icon size={15} color={group.accentVar} />
                      <span className="permission-group-title">{group.title}</span>
                    </div>
                    <div className="permission-checkbox-grid">
                      {group.items.map((item) => (
                        <button
                          key={item.key}
                          className="permission-checkbox-row"
                          type="button"
                          onClick={() => togglePermission(group.key, item.key)}
                        >
                          <span
                            className={`role-checkbox${
                              item.checked ? ` checked-${group.accent}` : ''
                            }`}
                          >
                            {item.checked && <Check size={12} />}
                          </span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Assigned Users ---- */}
            <div className="assigned-users-section">
              <div className="assigned-users-header-row">
                <div className="form-section-header" style={{ margin: 0 }}>
                  <Users size={15} />
                  <span className="form-section-title">Assigned Users</span>
                </div>
                <span className="assigned-users-count-badge">
                  {assignedUsers.length} users
                </span>
              </div>

              <div className="assigned-users-row">
                {assignedUsers.map((u) => (
                  <div className="selected-member-chip" key={u.initials}>
                    <span
                      className="owner-avatar"
                      style={{ background: u.accent, color: '#fff' }}
                    >
                      {u.initials}
                    </span>
                    <span className="selected-member-chip-info">
                      <span className="selected-member-chip-name">{u.name}</span>
                      <span className="selected-member-chip-role">{u.role}</span>
                    </span>
                    <button
                      className="selected-member-chip-remove"
                      type="button"
                      aria-label={`Remove ${u.name}`}
                      onClick={() => removeUser(u.initials)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <button className="add-users-chip-btn" type="button">
                  <Plus size={14} />
                  Add Users
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" type="button">
            <Save size={14} />
            Save Role
          </button>
        </div>
      </div>
    </div>
  );
}
