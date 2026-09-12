import OwnerCell from '@/shared/components/OwnerCell';
import StatusChip from '@/shared/components/StatusChip';
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
import { useState } from 'react';

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

const owner = { "id": "297ff519-c4e1-4c5b-bec3-c4ab5665c7a6", "firstName": "Paulie", "lastName": "Gualtieri", "email": "pg@gmail.com" }

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

const TASK_STATUS = {
    CRITICAL: {
        label: "Critical",
        background: "#FEE2E2",
        color: "#991B1B",
    },
    HIGH: {
        label: "High",
        background: "#FEF3C7",
        color: "#92400E",
    },
    MEDIUM: {
        label: "Medium",
        background: "#E8E8E8",
        color: "#555555",
    },
    LOW: {
        label: "Low",
        background: "#E0F2FE",
        color: "#0369A1",
    },
};

const GROUPS: TaskGroup[] = [
    {
        key: 'acme',
        name: 'Acme Platform Redesign',
        icon: Folder,
        taskCount: 5,
        completePct: 72,
        tasks: [
            { id: 'TASK-023', title: 'Payment API Integration Payment API Integration Payment API Integration Payment API Integration ', priority: 'CRITICAL', dueLabel: 'Dec 12', dueState: 'overdue', labels: [label('backend'), label('api')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }, { initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Me' },
            { id: 'TASK-024', title: 'Dashboard Redesign', priority: 'HIGH', dueLabel: 'Dec 18', dueState: 'soon', labels: [label('design'), label('frontend')], assignees: [{ initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Me' },
            { id: 'TASK-025', title: 'Database Migration', priority: 'MEDIUM', dueLabel: 'Dec 10', dueState: 'done', labels: [label('backend'), label('db')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }], assigneeName: 'Me' },
            { id: 'TASK-026', title: 'User Authentication', priority: 'CRITICAL', dueLabel: 'Dec 15', dueState: 'ontrack', labels: [label('auth'), label('security')], assignees: [{ initials: 'LW', accent: 'var(--ember)' }], assigneeName: 'Me' },
            { id: 'TASK-027', title: 'API Documentation', priority: 'MEDIUM', dueLabel: 'Dec 20', dueState: 'ontrack', labels: [label('docs'), label('api')], assignees: [{ initials: 'PS', accent: 'var(--violet)' }], assigneeName: 'Me' },
        ],
    },
    {
        key: 'mobile',
        name: 'Mobile App Development',
        icon: Smartphone,
        taskCount: 3,
        completePct: 45,
        tasks: [
            { id: 'TASK-101', title: 'Push Notifications', priority: 'HIGH', dueLabel: 'Dec 14', dueState: 'soon', labels: [label('mobile'), label('notifications')], assignees: [{ initials: 'AT', accent: 'var(--steel)' }], assigneeName: 'Me' },
            { id: 'TASK-102', title: 'Offline Sync', priority: 'CRITICAL', dueLabel: 'Dec 10', dueState: 'overdue', labels: [label('backend'), label('sync')], assignees: [{ initials: 'MB', accent: 'var(--patina)' }], assigneeName: 'Me' },
            { id: 'TASK-103', title: 'App Store Submission', priority: 'MEDIUM', dueLabel: 'Dec 22', dueState: 'ontrack', labels: [label('release'), label('deploy')], assignees: [{ initials: 'PS', accent: 'var(--violet)' }], assigneeName: 'Me' },
        ],
    },
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


function label(text: string) {
    const c = LABEL_COLORS[text] ?? { bg: 'var(--surface-3)', color: 'var(--text-secondary)' };
    return { text, className: '', bg: c.bg, color: c.color };
}

const MyTasks = () => {
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
                <button className="btn-primary" type="button">
                    <Plus size={14} />
                    New Task
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
                        const style = TASK_STATUS[task.priority]
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

                                <StatusChip
                                    label={style.label}
                                    background={style.background}
                                    color={style.color}
                                />
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
                                        <OwnerCell owner={owner} />
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    )
}

export default MyTasks