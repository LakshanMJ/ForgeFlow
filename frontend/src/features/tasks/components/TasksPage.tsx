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
import TagChip from '@/shared/components/TagChip';

export default function TasksPage() {
	// const [activeSubtab, setActiveSubtab] = useState('my-tasks');
	// const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
	const [tab, setTab] = useState('my_tasks');



	return (
		<>
			<div className="page-header-row">
				<div className="page-header-left">
					<div className="page-title-row">
						<h1 className="page-title">Tasks</h1>
						<div className="page-title-chips">
							<TagChip label="12 Total" />
							<TagChip label="5 In Progress" />
							<TagChip label="3 Overdue" />
							<TagChip label="4 Done" />
						</div>
					</div>
					<p className="page-subtitle">Tasks description.</p>
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
