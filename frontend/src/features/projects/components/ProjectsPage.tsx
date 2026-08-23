'use client';
import CreateProjectModal from '@/features/projects/components/CreateProjectModal';
import DataTable from '@/shared/components/DataTable';
import ProjectTable from '@/shared/components/ProjectTable';
import SearchInput from '@/shared/components/SearchInput';
import {
	Search,
	ChevronDown,
	SlidersHorizontal,
	LayoutGrid,
	List,
	Plus,
	Pin,
	MoreVertical,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type StatusKey = 'in-progress' | 'completed' | 'pending' | 'planning' | 'on-hold';

const STATUS_LABEL: Record<StatusKey, string> = {
	'in-progress': 'In Progress',
	completed: 'Completed',
	pending: 'Pending',
	planning: 'Planning',
	'on-hold': 'On Hold',
};

const STATUS_CHIP: Record<StatusKey, string> = {
	'in-progress': 'chip-steel',
	completed: 'chip-patina',
	pending: 'chip-gold',
	planning: 'chip-neutral',
	'on-hold': 'chip-neutral',
};

const STATUS_BAR_COLOR: Record<StatusKey, string> = {
	'in-progress': 'var(--steel)',
	completed: 'var(--patina)',
	pending: 'var(--gold)',
	planning: 'var(--text-tertiary)',
	'on-hold': 'var(--text-tertiary)',
};

const ACCENT: Record<string, string> = {
	steel: 'var(--steel)',
	ember: 'var(--ember)',
	gold: 'var(--gold)',
	patina: 'var(--patina)',
	neutral: 'var(--text-tertiary)',
};

type Project = {
	id: string;
	code: string;
	name: string;
	description: string;
	pinned?: boolean;
	accent: keyof typeof ACCENT;
	owner: { name: string; initials: string };
	status: StatusKey;
	progress: number;
	members: string[];
	extraMembers: number;
	updated: string;
};

const PROJECTS: Project[] = [
	{
		id: '1',
		code: 'AP',
		name: 'Acme Platform Redesign',
		description: 'Complete redesign of the core platform',
		pinned: true,
		accent: 'steel',
		owner: { name: 'Wile Smith', initials: 'WS' },
		status: 'in-progress',
		progress: 72,
		members: ['A', 'B', 'C'],
		extraMembers: 5,
		updated: '2h ago',
	},
	{
		id: '2',
		code: 'MB',
		name: 'Mobile App Development',
		description: 'Cross-platform mobile application',
		accent: 'ember',
		owner: { name: 'Sarah Johnson', initials: 'SJ' },
		status: 'in-progress',
		progress: 45,
		members: ['D', 'E', 'F'],
		extraMembers: 3,
		updated: '5h ago',
	},
	{
		id: '3',
		code: 'DS',
		name: 'Design System',
		description: 'Company-wide design system',
		accent: 'gold',
		owner: { name: 'Alex Turner', initials: 'AT' },
		status: 'completed',
		progress: 100,
		members: ['G', 'H', 'I'],
		extraMembers: 2,
		updated: '1d ago',
	},
	{
		id: '4',
		code: 'DM',
		name: 'Data Migration',
		description: 'Migrate legacy data to new system',
		accent: 'steel',
		owner: { name: 'Priya Shah', initials: 'PS' },
		status: 'pending',
		progress: 25,
		members: ['J', 'K', 'L'],
		extraMembers: 1,
		updated: '2d ago',
	},
	{
		id: '5',
		code: 'AI',
		name: 'AI Analytics Engine',
		description: 'Intelligent analytics and reporting',
		accent: 'ember',
		owner: { name: 'Mike Brown', initials: 'MB' },
		status: 'planning',
		progress: 10,
		members: ['M', 'N', 'O'],
		extraMembers: 4,
		updated: '3d ago',
	},
	{
		id: '6',
		code: 'QA',
		name: 'QA Automation',
		description: 'Automated testing framework',
		accent: 'neutral',
		owner: { name: 'Lisa Wong', initials: 'LW' },
		status: 'on-hold',
		progress: 0,
		members: ['P', 'Q', 'R'],
		extraMembers: 2,
		updated: '5d ago',
	},
	{
		id: '7',
		code: 'DSA',
		name: 'Design System',
		description: 'Company-wide design system',
		accent: 'gold',
		owner: { name: 'Alex Turner', initials: 'AT' },
		status: 'completed',
		progress: 100,
		members: ['G', 'H', 'I'],
		extraMembers: 2,
		updated: '1d ago',
	},
	{
		id: '8',
		code: 'DMT',
		name: 'Data Migration',
		description: 'Migrate legacy data to new system',
		accent: 'steel',
		owner: { name: 'Priya Shah', initials: 'PS' },
		status: 'pending',
		progress: 25,
		members: ['J', 'K', 'L'],
		extraMembers: 1,
		updated: '2d ago',
	},
	{
		id: '9',
		code: 'AIW',
		name: 'AI Analytics Engine',
		description: 'Intelligent analytics and reporting',
		accent: 'ember',
		owner: { name: 'Mike Brown', initials: 'MB' },
		status: 'planning',
		progress: 10,
		members: ['M', 'N', 'O'],
		extraMembers: 4,
		updated: '3d ago',
	},
	{
		id: '10',
		code: 'QAS',
		name: 'QA Automation',
		description: 'Automated testing framework',
		accent: 'neutral',
		owner: { name: 'Lisa Wong', initials: 'LW' },
		status: 'on-hold',
		progress: 0,
		members: ['P', 'Q', 'R'],
		extraMembers: 2,
		updated: '5d ago',
	},
	{
		id: '11',
		code: 'DSR',
		name: 'Design System',
		description: 'Company-wide design system',
		accent: 'gold',
		owner: { name: 'Alex Turner', initials: 'AT' },
		status: 'completed',
		progress: 100,
		members: ['G', 'H', 'I'],
		extraMembers: 2,
		updated: '1d ago',
	},
	{
		id: '12',
		code: 'DMZ',
		name: 'Data Migration',
		description: 'Migrate legacy data to new system',
		accent: 'steel',
		owner: { name: 'Priya Shah', initials: 'PS' },
		status: 'pending',
		progress: 25,
		members: ['J', 'K', 'L'],
		extraMembers: 1,
		updated: '2d ago',
	},
	{
		id: '13',
		code: 'AIV',
		name: 'AI Analytics Engine',
		description: 'Intelligent analytics and reporting',
		accent: 'ember',
		owner: { name: 'Mike Brown', initials: 'MB' },
		status: 'planning',
		progress: 10,
		members: ['M', 'N', 'O'],
		extraMembers: 4,
		updated: '3d ago',
	},
	{
		id: '14',
		code: 'QAT',
		name: 'QA Automation',
		description: 'Automated testing framework',
		accent: 'neutral',
		owner: { name: 'Lisa Wong', initials: 'LW' },
		status: 'on-hold',
		progress: 0,
		members: ['P', 'Q', 'R'],
		extraMembers: 2,
		updated: '5d ago',
	},
];

export default function ProjectsPage() {

	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const projectColumns: Column<Project>[] = [
		{
			key: 'project',
			label: 'Project',
			render: (project) => (
				<div className="project-cell">
					<span
						className="accent-bar"
						style={{
							background: ACCENT[project.accent],
						}}
					/>

					<span
						className="project-icon"
						style={{
							background: ACCENT[project.accent],
						}}
					>
						{project.code}
					</span>

					<div>
						<div className="project-info-name">
							<Link
								href={`/projects/${project.id}`}
								className="project-name-link"
							>
								{project.name}
							</Link>

							{project.pinned && (
								<Pin
									size={12}
									color="var(--gold)"
								/>
							)}
						</div>

						<div className="project-info-desc">
							{project.description}
						</div>
					</div>
				</div>
			),
		},

		{
			key: 'owner',
			label: 'Owner',
			render: (project) => (
				<div className="owner-cell">
					<span className="owner-avatar">
						{project.owner.initials}
					</span>

					{project.owner.name}
				</div>
			),
		},

		{
			key: 'status',
			label: 'Status',
			render: (project) => (
				<span
					className={`chip ${STATUS_CHIP[project.status]}`}
				>
					{STATUS_LABEL[project.status]}
				</span>
			),
		},

		{
			key: 'progress',
			label: 'Progress',
			render: (project) => (
				<div className="progress-cell">
					<span className="progress-pct">
						{project.progress}%
					</span>

					<span className="progress-track">
						<span
							className="progress-fill"
							style={{
								width: `${project.progress}%`,
								background:
									STATUS_BAR_COLOR[project.status],
							}}
						/>
					</span>
				</div>
			),
		},

		{
			key: 'members',
			label: 'Members',
			render: (project) => (
				<div className="avatar-stack">
					{project.members.map((initial) => (
						<span
							className="stack-avatar"
							key={initial}
						>
							{initial}
						</span>
					))}

					{project.extraMembers > 0 && (
						<span className="stack-more">
							+{project.extraMembers}
						</span>
					)}
				</div>
			),
		},

		{
			key: 'updated',
			label: 'Updated',
			sortable: true,
			render: (project) => (
				<div className="updated-cell">
					<span>{project.updated}</span>

					<button
						className="kebab-btn"
						type="button"
						aria-label={`Actions for ${project.name}`}
					>
						<MoreVertical size={15} />
					</button>
				</div>
			),
		},
		{
			key: 'actions', label: '', render: (item) => <button className="kebab-btn" type="button" aria-label="More options">
				{/* <MoreVertical size={16} /> */}
			</button>
		},
	];

	return (
		<>
			<div className="page-header-row">
				<div>
					<h1 className="page-title">Projects</h1>
					<p className="page-subtitle">
						Plan, track and deliver work across all your projects.
					</p>
				</div>
				<button className="btn-primary" type="button" onClick={() => setIsCreateOpen(true)}>
					<Plus size={15} />
					New Project
				</button>
			</div>

			<CreateProjectModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

			<div className="filter-bar">
				{/* <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search projects..." />
        </div> */}
				<SearchInput
					placeholder="Search projects..."
					iconSize={14}
				/>

				<button className="filter-select" type="button">
					Status
					<ChevronDown size={14} />
				</button>
				<button className="filter-select" type="button">
					Owner
					<ChevronDown size={14} />
				</button>
				<button className="filter-select" type="button">
					Category
					<ChevronDown size={14} />
				</button>
				<button className="filter-select" type="button">
					<SlidersHorizontal size={14} />
					More Filters
				</button>

				<div className="view-toggle">
					<button className="icon-btn" type="button" aria-label="Grid view">
						<LayoutGrid size={15} />
					</button>
					<button className="icon-btn active" type="button" aria-label="List view">
						<List size={15} />
					</button>
				</div>
			</div>

			<DataTable
				columns={projectColumns}
				data={PROJECTS}
				totalItems={18}
				currentPage={1}
				totalPages={3}
				columnWidths="2.4fr 1.2fr 1.1fr 1.3fr 1.1fr 0.9fr 32px"
			/>
		</>
	);
}
