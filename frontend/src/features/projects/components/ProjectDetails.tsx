'use client';

import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
	ArrowLeft,
	MoreVertical,
	Star,
	CheckCircle2,
	XCircle,
	MessageSquare,
	Upload,
	UserPlus,
	FileText,
	FileSpreadsheet,
	Image as ImageIcon,
} from 'lucide-react';
import MembersPanel from './MembersPanel';
import FilesPanel from './FilesPanel';
import TasksBoard from './TasksBoard';
import ProjectOverview from './ProjectOverview';
import Tabs from '@/shared/components/Tabs';

function EmptyPanel({ label }: { label: string }) {
	return (
		<div
			className="card"
			style={{
				textAlign: 'center',
				padding: '48px 16px',
				color: 'var(--text-secondary)',
				fontSize: 13.5,
			}}
		>
			{label} view coming soon.
		</div>
	);
}

export default function ProjectDetailPage() {

	const [tab, setTab] = useState('overview');

	return (
		<>
			<div className="breadcrumb-row">
				<Link href="/dashboard/projects" className="breadcrumb-link">
					<ArrowLeft size={14} />
					Back to Projects
				</Link>
				<div className="header-actions">
					<button className="btn-secondary" type="button">
						Edit Project
					</button>
					<button className="icon-btn" type="button" aria-label="More actions">
						<MoreVertical size={15} />
					</button>
				</div>
			</div>

			<div className="project-header">
				<div className="project-header-left">
					<span className="project-header-icon" style={{ background: 'var(--steel)' }}>
						AP
					</span>
					<div>
						<div className="project-header-title-row">
							<h1 className="project-header-title">Acme Platform Redesign</h1>
							<Star size={18} fill="var(--ember)" color="var(--ember)" />
						</div>
						<p className="project-header-subtitle">
							Complete redesign of the core platform
						</p>
						<div className="project-header-badges">
							<span className="chip chip-steel">In Progress</span>
							<span className="chip chip-ember">High Priority</span>
							<span className="chip chip-neutral">Product</span>
						</div>
					</div>
				</div>

				<div className="project-meta-row">
					<div className="project-meta-col">
						<span className="project-meta-label">Owner</span>
						<span className="project-meta-value">
							<span
								className="owner-avatar"
								style={{ width: 20, height: 20, background: 'var(--steel)', color: '#fff' }}
							>
								WS
							</span>
							Wile Smith
						</span>
					</div>
					<div className="project-meta-col">
						<span className="project-meta-label">Start Date</span>
						<span className="project-meta-value">Mar 18, 2025</span>
					</div>
					<div className="project-meta-col">
						<span className="project-meta-label">Target Date</span>
						<span className="project-meta-value">Jun 30, 2025</span>
					</div>
					<div className="project-meta-col">
						<span className="project-meta-label">Project Key</span>
						<span className="project-meta-value">AP-2025</span>
					</div>
				</div>
			</div>

			<Tabs
				value={tab}
				onChange={setTab}
				tabs={[
					{
						label: 'Overview',
						value: 'overview',
					},
					{
						label: 'Tasks',
						value: 'tasks',
					},
					{
						label: 'Members',
						value: 'members',
					},
					{
						label: 'Files',
						value: 'files',
					},
					{
						label: 'Settings',
						value: 'settings',
					},
				]}
			>
				<TabPanel
					value="overview"
					sx={{ p: 0, pt: '20px' }}
				>
					<ProjectOverview />
				</TabPanel>

				<TabPanel
					value="tasks"
					sx={{ p: 0, pt: '20px' }}
				>
					<TasksBoard />
				</TabPanel>

				<TabPanel
					value="members"
					sx={{ p: 0, pt: '20px' }}
				>
					<MembersPanel />
				</TabPanel>

				<TabPanel
					value="files"
					sx={{ p: 0, pt: '20px' }}
				>
					<FilesPanel />
				</TabPanel>

				<TabPanel
					value="settings"
					sx={{ p: 0, pt: '20px' }}
				>
					<EmptyPanel label="Settings" />
				</TabPanel>
			</Tabs>
		</>
	);
}
