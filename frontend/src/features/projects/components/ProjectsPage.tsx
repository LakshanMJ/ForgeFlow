'use client';
import DataTable from '@/shared/components/DataTable';
import Modal from '@/shared/components/Modal';
import SearchInput from '@/shared/components/SearchInput';
import {
	ChevronDown,
	SlidersHorizontal,
	LayoutGrid,
	List,
	Plus,
	Shield,
	Save,
	Eye,
	Pencil,
	Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ProjectForm from './ProjectForm';
import { CreateProjectData, ProjectColor, ProjectFormData, ProjectStatus, type Project, type ProjectColumn } from '../types/project.types';
import { createProject } from '../api/projects.api';
import { useProjects } from '../hooks/useProjects';


const STATUS_CHIP: Record<ProjectStatus, string> = {
	[ProjectStatus.PLANNING]: 'chip-neutral',
	[ProjectStatus.ACTIVE]: 'chip-steel',
	[ProjectStatus.ON_HOLD]: 'chip-neutral',
	[ProjectStatus.COMPLETED]: 'chip-patina',
	[ProjectStatus.CANCELLED]: 'chip-neutral',
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
	[ProjectStatus.PLANNING]: 'Planning',
	[ProjectStatus.ACTIVE]: 'In Progress',
	[ProjectStatus.ON_HOLD]: 'On Hold',
	[ProjectStatus.COMPLETED]: 'Completed',
	[ProjectStatus.CANCELLED]: 'Cancelled',
};

const STATUS_BAR_COLOR: Record<ProjectStatus, string> = {
	[ProjectStatus.PLANNING]: 'var(--gold)',
	[ProjectStatus.ACTIVE]: 'var(--steel)',
	[ProjectStatus.ON_HOLD]: 'var(--ember)',
	[ProjectStatus.COMPLETED]: 'var(--patina)',
	[ProjectStatus.CANCELLED]: 'var(--ember)',
};


const ACCENT: Record<string, string> = {
	steel: 'var(--steel)',
	ember: 'var(--ember)',
	gold: 'var(--gold)',
	patina: 'var(--patina)',
	neutral: 'var(--text-tertiary)',
};

const PROJECT_COLOR_MAP: Record<ProjectColor, string> = {
	[ProjectColor.STEEL]: 'var(--steel)',
	[ProjectColor.EMBER]: 'var(--ember)',
	[ProjectColor.PATINA]: 'var(--patina)',
	[ProjectColor.GOLD]: 'var(--gold)',
	[ProjectColor.VIOLET]: 'var(--violet)',
};

export default function ProjectsPage() {

	const {
		data: projects = [],
		isLoading: isProjectsLoading,
		isError: isProjectsError,
	} = useProjects();

	console.log(projects, 'projects')
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
	const [projectModalMode, setProjectModalMode] = useState<'create' | 'view' | 'edit'>('create');
	const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

	const projectColumns: ProjectColumn<Project>[] = [
		{
			key: 'project',
			label: 'Project',
			render: (project) => {
				const color = project.color
					? PROJECT_COLOR_MAP[project.color]
					: 'var(--steel)';

				return (
					<div className="project-cell">
						<span
							className="accent-bar"
							style={{
								background: color,
							}}
						/>

						<span
							className="project-icon"
							style={{
								background: color,
							}}
						>
							{project.name.slice(0, 2).toUpperCase()}
						</span>

						<div>
							<div className="project-info-name">
								<Link
									href={`/projects/${project.id}`}
									className="project-name-link"
								>
									{project.name}
								</Link>
							</div>

							<div className="project-info-desc">
								{project.description}
							</div>
						</div>
					</div>
				);
			},
		},

		{
			key: 'owner',
			label: 'Owner',
			render: (project) => (
				<div className="owner-cell">
					<span className="owner-avatar">
						{`${project.owner.firstName?.[0] ?? ''}${project.owner.lastName?.[0] ?? ''}`.toUpperCase()}
					</span>

					{project?.owner
						? `${project.owner.firstName} ${project.owner.lastName}`
						: 'Unassigned'}
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
						{'project.progress'}%
					</span>

					<span className="progress-track">
						<span
							className="progress-fill"
							style={{
								width: `${project.progress}%`,
								background: STATUS_BAR_COLOR[project.status],
							}}
						/>
					</span>
				</div>
			),
		},

		{
			key: 'members',
			label: 'Members',
			render: (project) => {
				const visibleMembers = project.members.slice(0, 4);
				const extraMembers =
					project.members.length - visibleMembers.length;

				return (
					<div className="avatar-stack">
						{visibleMembers.map((member) => (
							<span
								className="stack-avatar"
								key={member.id}
							>
								{`${member.user.firstName?.[0] ?? ''}${member.user.lastName?.[0] ?? ''}`.toUpperCase()}
							</span>
						))}

						{extraMembers > 0 && (
							<span className="stack-more">
								+{extraMembers}
							</span>
						)}
					</div>
				);
			},
		},

		{
			key: 'updated',
			label: 'Updated',
			sortable: true,
			render: (project) => (
				<div className="updated-cell">
					<span>
						{new Date(project.updatedAt).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</span>
				</div>
			),
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (project) => (
				<span className="actions-cell-group">
					<button
						className="kebab-btn"
						type="button"
						aria-label={`View ${project.name}`}
						onClick={() => {
							setSelectedProject(project);
							setProjectModalMode('view');
							setIsProjectModalOpen(true);
						}}
					>
						<Eye size={15} />
					</button>
					<button
						className="kebab-btn"
						type="button"
						aria-label={`Edit ${'role.name'}`}
						onClick={() => {
							setSelectedProject(project);
							setProjectModalMode('edit');
							setIsProjectModalOpen(true);
						}}
					>
						<Pencil size={15} />
					</button>

					<button
						className="kebab-btn"
						type="button"
						aria-label={`Delete ${'role.name'}`}
					>
						<Trash2 size={15} />
					</button>
				</span>
			),
		},
	];

	const handleSubmit = (data: ProjectFormData) => {
		const payload: CreateProjectData = {
			name: data.name,
			description: data.description,
			status: data.status,
			priority: data.priority,
			ownerId: data.owner,
			categoryId: data.category,

			color: data.color || undefined,
			startDate: data.startDate || undefined,
			endDate: data.endDate || undefined,

			members: data.members.map((member) => member.id),
		};

		createProject(payload);
	};

	if (
		isProjectsLoading
	) {
		return (
			<div className="role-modal-card">
				Loading...
			</div>
		);
	}

	if (
		isProjectsError
	) {
		return (
			<div className="role-modal-card">
				Failed to load Projects data.
			</div>
		);
	}

	return (
		<>
			<div className="page-header-row">
				<div>
					<h1 className="page-title">Projects</h1>
					<p className="page-subtitle">
						Plan, track and deliver work across all your projects.
					</p>
				</div>
				<button className="btn-primary" type="button" onClick={() => setIsProjectModalOpen(true)}>
					<Plus size={15} />
					New Project
				</button>
			</div>

			{/* <CreateProjectModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} /> */}

			{/* <Modal
				isOpen={isProjectModalOpen}
				onClose={() => setIsProjectModalOpen(false)}
				title="Create New Project"
				icon={<Shield size={18} />}
				size="xl"
				submitLabel="Save Project"
				submitIcon={<Save size={14} />}
				onSubmit={() => { }}
			>
				<AddProjetForm />
			</Modal> */}

			<Modal
				isOpen={isProjectModalOpen}
				onClose={() => setIsProjectModalOpen(false)}
				title={
					projectModalMode === 'create'
						? 'Create New Project'
						: projectModalMode === 'edit'
							? 'Edit Project'
							: 'View Project'
				}
				icon={<Shield size={18} />}
				size="xl"
				submitFormId="project-form"
				showSubmit={projectModalMode !== 'view'}
				submitLabel={
					projectModalMode === 'edit'
						? 'Save Changes'
						: 'Save Project'
				}
				submitIcon={<Save size={14} />}
			>
				<ProjectForm
					mode={projectModalMode}
					existingUserDetail={selectedProject}
					onSubmit={handleSubmit}
				/>
			</Modal>

			<div className="filter-bar">
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
				data={projects}
				totalItems={18}
				currentPage={1}
				totalPages={3}
				columnWidths="2.6fr 1.3fr 1.1fr 1.4fr 1.2fr 1fr 102px"
			/>
		</>
	);
}
