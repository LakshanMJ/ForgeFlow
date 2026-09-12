'use client';

import { useState } from 'react';
import {
	Search,
	ChevronDown,
	Download,
	Plus,
	ListChecks,
	LayoutGrid,
	Calendar,
	Folder,
	Smartphone,
	ArrowRight,
	CheckSquare,
	Clock3,
	AlertTriangle,
	CheckCircle2,
	Check,
} from 'lucide-react';
import {
    ListTodo,
    LayoutDashboard,
    Inbox,
    CalendarDays,
} from 'lucide-react';
import ForgeFlowTabs from '@/shared/components/ForgeFlowTabs';
import { TabPanel } from '@mui/lab';
import MyTasks from './MyTasks';
import MyTasksBoard from './MyTasksBoard';
import Backlog from './Backlog';
import MyCalendar from './MyCalendar';

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
	const [tab, setTab] = useState('my_tasks');



	return (
		<>
			{/* <div className="page-header-row" style={{ marginBottom: 20 }}>
				<h1 className="page-title" style={{ marginBottom: 0 }}>
					Tasks
				</h1>
			</div> */}

			<div className="page-header-row">
				<div>
					<h1 className="page-title">Tasks</h1>
					<p className="page-subtitle">
						Tasks description.
					</p>
				</div>
			</div>

			<div className="users-stat-row" style={{ marginBottom: 20 }}>
				<div className="users-stat-card">
					<div>
						<div className="users-stat-value">12</div>
						<div className="users-stat-label">Total Tasks Assigned</div>
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
					</div>
					<span
						className="users-stat-icon-circle"
						style={{ background: 'var(--patina-tint)', color: 'var(--patina)', marginLeft: 'auto' }}
					>
						<Check size={20} />
					</span>
				</div>
			</div>

			<ForgeFlowTabs
				value={tab}
				onChange={setTab}
				tabs={[
					{
						label: 'My Tasks',
						value: 'my_tasks',
						icon: ListTodo,
					},
					{
						label: 'My Tasks Board',
						value: 'my_tasks_board',
						icon: LayoutDashboard,
					},
					{
						label: 'Backlog',
						value: 'backlog',
						icon: Inbox,
					},
					{
						label: 'My Calendar',
						value: 'my_calendar',
						icon: CalendarDays,
					},
				]}
			>
				<TabPanel
					value="my_tasks"
					sx={{ p: 0, pt: '20px' }}
				>
					<MyTasks />
				</TabPanel>

				<TabPanel
					value="my_tasks_board"
					sx={{ p: 0, pt: '20px' }}
				>
					<MyTasksBoard />
				</TabPanel>

				<TabPanel
					value="backlog"
					sx={{ p: 0, pt: '20px' }}
				>
					<Backlog />
				</TabPanel>

				<TabPanel
					value="my_calendar"
					sx={{ p: 0, pt: '20px' }}
				>
					<MyCalendar />
				</TabPanel>
			</ForgeFlowTabs>

		</>
	);
}
