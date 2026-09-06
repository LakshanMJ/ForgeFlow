'use client';

import { useState } from 'react';
import {
  Search,
  ChevronDown,
  Download,
  Plus,
  ListChecks,
  LayoutGrid,
  Inbox,
  Calendar,
  Folder,
  Smartphone,
  ArrowRight,
  CheckSquare,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Check,
} from 'lucide-react';

type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM';

type DueState = 'overdue' | 'soon' | 'ontrack' | 'done';

type Task = {
  id: string;
  title: string;
  priority: Priority;
  dueLabel: string;
  dueState: DueState;
  labels: { text: string; className: string }[];
  assignees: { initials: string; accent: string }[];
  assigneeName: string;
  checked?: boolean;
};

type TaskGroup = {
  key: string;
  name: string;
  icon: typeof Folder;
  taskCount: number;
  completePct: number;
  tasks: Task[];
};

const PRIORITY_CHIP: Record<Priority, { bg: string; color: string }> = {
  CRITICAL: { bg: 'var(--ember-tint)', color: 'var(--ember-tint-text)' },
  HIGH: { bg: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
  MEDIUM: { bg: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
};

const LABEL_COLORS: Record<string, { bg: string; color: string }> = {
  backend: { bg: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
  api: { bg: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
  design: { bg: 'var(--violet-tint)', color: 'var(--violet-tint-text)' },
  frontend: { bg: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
  db: { bg: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
  auth: { bg: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
  security: { bg: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
  docs: { bg: 'var(--patina-tint)', color: 'var(--patina-tint-text)' },
  mobile: { bg: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
  notifications: { bg: 'var(--violet-tint)', color: 'var(--violet-tint-text)' },
  sync: { bg: 'var(--patina-tint)', color: 'var(--patina-tint-text)' },
  release: { bg: 'var(--patina-tint)', color: 'var(--patina-tint-text)' },
  deploy: { bg: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
};

function label(text: string) {
  const c = LABEL_COLORS[text] ?? { bg: 'var(--surface-3)', color: 'var(--text-secondary)' };
  return { text, className: '', bg: c.bg, color: c.color };
}

const GROUPS: TaskGroup[] = [
  {
    key: 'acme',
    name: 'Acme Platform Redesign',
    icon: Folder,
    taskCount: 5,
    completePct: 72,
    tasks: [
      { id: 'TASK-023', title: 'Payment API Integration', priority: 'CRITICAL', dueLabel: 'Dec 12', dueState: 'overdue', labels: [label('backend'), label('api')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }, { initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Mike' },
      { id: 'TASK-024', title: 'Dashboard Redesign', priority: 'HIGH', dueLabel: 'Dec 18', dueState: 'soon', labels: [label('design'), label('frontend')], assignees: [{ initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Alex' },
      { id: 'TASK-025', title: 'Database Migration', priority: 'MEDIUM', dueLabel: 'Dec 10', dueState: 'done', labels: [label('backend'), label('db')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }], assigneeName: 'Mike' },
      { id: 'TASK-026', title: 'User Authentication', priority: 'CRITICAL', dueLabel: 'Dec 15', dueState: 'ontrack', labels: [label('auth'), label('security')], assignees: [{ initials: 'LW', accent: 'var(--ember)' }], assigneeName: 'Lisa' },
      { id: 'TASK-027', title: 'API Documentation', priority: 'MEDIUM', dueLabel: 'Dec 20', dueState: 'ontrack', labels: [label('docs'), label('api')], assignees: [{ initials: 'PS', accent: 'var(--violet)' }], assigneeName: 'Priya' },
    ],
  },
  {
    key: 'mobile',
    name: 'Mobile App Development',
    icon: Smartphone,
    taskCount: 3,
    completePct: 45,
    tasks: [
      { id: 'TASK-101', title: 'Push Notifications', priority: 'HIGH', dueLabel: 'Dec 14', dueState: 'soon', labels: [label('mobile'), label('notifications')], assignees: [{ initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Alex' },
      { id: 'TASK-102', title: 'Offline Sync', priority: 'CRITICAL', dueLabel: 'Dec 10', dueState: 'overdue', labels: [label('backend'), label('sync')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }], assigneeName: 'Mike' },
      { id: 'TASK-103', title: 'App Store Submission', priority: 'MEDIUM', dueLabel: 'Dec 22', dueState: 'ontrack', labels: [label('release'), label('deploy')], assignees: [{ initials: 'PS', accent: 'var(--violet)' }], assigneeName: 'Priya' },
    ],
  },
];

const SUBTABS = [
  { key: 'my-tasks', label: 'My Tasks', icon: ListChecks, count: 12 },
  { key: 'board', label: 'Board', icon: LayoutGrid, count: 32 },
  { key: 'backlog', label: 'Backlog', icon: Inbox, count: 6 },
  { key: 'calendar', label: 'Calendar', icon: Calendar, count: null },
];

function DueCell({ state, dueLabel }: { state: DueState; dueLabel: string }) {
  if (state === 'done') {
    return (
      <span className="task-due" style={{ color: 'var(--patina)' }}>
        <CheckCircle2 size={13} />
        {dueLabel}
      </span>
    );
  }
  if (state === 'overdue') {
    return (
      <span className="task-due" style={{ color: 'var(--ember)' }}>
        <AlertTriangle size={13} />
        {dueLabel}
      </span>
    );
  }
  if (state === 'soon') {
    return (
      <span className="task-due" style={{ color: 'var(--gold)' }}>
        <CalendarDays size={13} />
        {dueLabel}
      </span>
    );
  }
  return (
    <span className="task-due" style={{ color: 'var(--text-secondary)' }}>
      <CalendarDays size={13} />
      {dueLabel}
    </span>
  );
}

export default function TasksPage() {
  const [activeSubtab, setActiveSubtab] = useState('my-tasks');
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="page-header-row" style={{ marginBottom: 20 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          Tasks
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div className="search-input" style={{ minWidth: 220 }}>
            <Search size={14} />
            <input type="text" placeholder="Search tasks..." />
          </div>
          <button className="filter-select" type="button">
            All Projects
            <ChevronDown size={14} />
          </button>
          <button className="filter-select" type="button">
            All Status
            <ChevronDown size={14} />
          </button>
          <button className="btn-secondary" type="button">
            <Download size={14} />
            Export
          </button>
          <button className="btn-primary" type="button">
            <Plus size={14} />
            New Task
          </button>
        </div>
      </div>

      <div className="users-stat-row" style={{ marginBottom: 20 }}>
        <div className="users-stat-card">
          <div>
            <div className="users-stat-value">12</div>
            <div className="users-stat-label">Total Tasks Assigned</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ↑ 3 this week
            </div>
          </div>
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--steel-tint)', color: 'var(--steel)', marginLeft: 'auto' }}
          >
            <CheckSquare size={20} />
          </span>
        </div>

        <div className="users-stat-card">
          <div>
            <div className="users-stat-value">5</div>
            <div className="users-stat-label">In Progress</div>
            <div className="users-stat-sub" style={{ color: 'var(--gold)' }}>
              ⏱ 2 due this week
            </div>
          </div>
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--gold-tint)', color: 'var(--gold)', marginLeft: 'auto' }}
          >
            <Clock3 size={20} />
          </span>
        </div>

        <div className="users-stat-card">
          <div>
            <div className="users-stat-value">3</div>
            <div className="users-stat-label">Overdue</div>
            <div className="users-stat-sub" style={{ color: 'var(--ember)' }}>
              ⚠ Needs attention
            </div>
          </div>
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--ember-tint)', color: 'var(--ember)', marginLeft: 'auto' }}
          >
            <AlertTriangle size={20} />
          </span>
        </div>

        <div className="users-stat-card">
          <div>
            <div className="users-stat-value">4</div>
            <div className="users-stat-label">Done This Week</div>
            <div className="users-stat-sub" style={{ color: 'var(--patina)' }}>
              ✓ Great progress
            </div>
          </div>
          <span
            className="users-stat-icon-circle"
            style={{ background: 'var(--patina-tint)', color: 'var(--patina)', marginLeft: 'auto' }}
          >
            <Check size={20} />
          </span>
        </div>
      </div>

      <nav className="tasks-subtabs">
        {SUBTABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tasks-subtab${activeSubtab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveSubtab(tab.key)}
          >
            <tab.icon size={15} />
            {tab.label}
            {tab.count !== null && (
              <span className="tasks-subtab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </nav>

      {activeSubtab === 'my-tasks' ? (
        <>
          <div className="filter-bar">
            <div className="search-input">
              <Search size={14} />
              <input type="text" placeholder="Search tasks..." />
            </div>
            <button className="filter-select" type="button">
              All Projects
              <ChevronDown size={14} />
            </button>
            <button className="filter-select" type="button">
              All Status
              <ChevronDown size={14} />
            </button>
            <button className="filter-select" type="button">
              All Priority
              <ChevronDown size={14} />
            </button>
          </div>

          {GROUPS.map((group) => (
            <div className="task-group" key={group.key}>
              <div className="task-group-header">
                <span className="task-group-icon">
                  <group.icon size={16} fill="var(--gold)" />
                </span>
                <span className="task-group-name">{group.name}</span>
                <span className="task-group-count">{group.taskCount} tasks</span>
                <div className="task-group-progress">
                  <span className="task-group-progress-pct">
                    {group.completePct}% complete
                  </span>
                  <span className="task-group-progress-track">
                    <span
                      className="task-group-progress-fill"
                      style={{ width: `${group.completePct}%` }}
                    />
                  </span>
                </div>
                <button className="btn-secondary" type="button">
                  View Board
                  <ArrowRight size={13} />
                </button>
              </div>

              {group.tasks.map((task) => {
                const isChecked = checkedTasks.has(task.id) || task.dueState === 'done';
                return (
                  <div className="task-list-row" key={task.id}>
                    <button
                      className={`task-checkbox${isChecked ? ' checked' : ''}`}
                      type="button"
                      aria-label={`Mark ${task.title} complete`}
                      onClick={() => toggleTask(task.id)}
                    >
                      {isChecked && <Check size={12} />}
                    </button>

                    <span className="task-id">{task.id}</span>
                    <span className="task-title">{task.title}</span>

                    <span
                      className="task-priority-chip"
                      style={{
                        background: PRIORITY_CHIP[task.priority].bg,
                        color: PRIORITY_CHIP[task.priority].color,
                      }}
                    >
                      {task.priority}
                    </span>

                    <DueCell state={task.dueState} dueLabel={task.dueLabel} />

                    <span className="task-labels-group">
                      {task.labels.map((l) => (
                        <span
                          key={l.text}
                          className="task-label-chip"
                          style={{ background: l.bg, color: l.color }}
                        >
                          {l.text}
                        </span>
                      ))}
                    </span>

                    <span className="task-assignee">
                      <span className="task-assignee-avatars">
                        {task.assignees.map((a) => (
                          <span
                            key={a.initials}
                            className="owner-avatar"
                            style={{ width: 26, height: 26, background: a.accent, color: '#fff' }}
                          >
                            {a.initials}
                          </span>
                        ))}
                      </span>
                      <span className="task-assignee-name">{task.assigneeName}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </>
      ) : (
        <div
          className="card"
          style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-secondary)', fontSize: 13.5 }}
        >
          {SUBTABS.find((t) => t.key === activeSubtab)?.label} view coming soon.
        </div>
      )}
    </>
  );
}
