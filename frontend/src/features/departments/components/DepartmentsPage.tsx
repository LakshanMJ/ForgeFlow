'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	Search,
	Plus,
	Users,
	Eye,
	Pencil,
	MoreVertical,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import type { DepartmentFormData } from './DepartmentFormModal';
import DepartmentFormModal from './DepartmentFormModal';
import { useDepartments } from '../hooks/useDepartments';
import { useCreateDepartment } from '../hooks/useCreateDepartment';
import type { Department } from '../types/departments.types';
import { useUpdateDepartment } from '../hooks/useUpdateDepartment';
import DataTable from '@/shared/components/DataTable';
import PageHeader from '@/shared/components/PageHeader';

function openPositionsStyle(count: number): { background: string; color: string } {
	if (count === 0) return { background: 'var(--patina-tint)', color: 'var(--patina-tint-text)' };
	if (count <= 2) return { background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' };
	return { background: 'var(--ember-tint)', color: 'var(--ember-tint-text)' };
}

export default function DepartmentsPage() {

	const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
	const [editingDept, setEditingDept] = useState<Department | null>(null);
	const initialFormData: DepartmentFormData | undefined = editingDept
		? {
			name: editingDept.name,
			description: editingDept.description ?? '',
			managerName: '',
			parentDepartmentName: '',
		}
		: undefined;

	const {
		data: departments = [],
		isLoading,
	} = useDepartments();

	const createDepartment = useCreateDepartment();
	const updateDepartment = useUpdateDepartment();

	const departmentColumns = [
		{
			key: 'name',
			label: 'Department',
			render: (dept) => (
				<div className="department-name-cell">
					<span className="department-name-text">
						{dept.name}
					</span>
				</div>
			),
		},
		{
			key: 'manager',
			label: 'Manager',
			render: (dept) =>
				dept.manager ? (
					<a href="#" className="manager-link">
						{dept.manager || '--'}
					</a>
				) : (
					<span className="manager-dash">&mdash;</span>
				),
		},
		{
			key: 'members',
			label: 'Members',
			render: (dept) => (
				<span className="members-count-cell">
					<Users size={14} color="var(--text-tertiary)" />
					{dept.members || '--'}
				</span>
			),
		},
		{
			key: 'openPositions',
			label: 'Open Positions',
			render: (dept) => (
				<span
					className="open-positions-badge"
					style={openPositionsStyle(dept.openPositions)}
				>
					{dept.openPositions || '--'}
				</span>
			),
		},
		{
			key: 'createdAt',
			label: 'Created',
			render: (dept) =>
				new Date(dept.createdAt).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				}),
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (dept) => (
				<span className="actions-cell-group">
					<button
						className="kebab-btn"
						type="button"
						aria-label={`View ${dept.name}`}
					>
						<Eye size={15} />
					</button>

					<button
						className="kebab-btn"
						type="button"
						aria-label={`Edit ${dept.name}`}
						onClick={() => openEditModal(dept)}
					>
						<Pencil size={15} />
					</button>

					<button
						className="kebab-btn"
						type="button"
						aria-label="More actions"
					>
						<MoreVertical size={15} />
					</button>
				</span>
			),
		},
	];

	const openCreateModal = () => {
		setEditingDept(null);
		setModalMode('create');
	};

	const openEditModal = (dept: Department) => {
		setEditingDept(dept);
		setModalMode('edit');
	};

	const closeModal = () => {
		setModalMode(null);
		setEditingDept(null);
	};

	const handleSubmit = (data: DepartmentFormData) => {
		if (modalMode === 'edit' && editingDept) {
			updateDepartment.mutate(
				{
					id: editingDept.id,
					data: {
						name: data.name,
						description: data.description,
					},
				},
				{
					onSuccess: () => {
						closeModal();
					},
				},
			);

			return;
		}

		createDepartment.mutate(
			{
				name: data.name,
				description: data.description,
			},
			{
				onSuccess: () => {
					closeModal();
				},
			},
		);
	};

	return (
		<>
			<DepartmentFormModal
				open={modalMode !== null}
				onClose={closeModal}
				mode={modalMode ?? 'create'}
				initialData={initialFormData}
				onSubmit={handleSubmit}
			/>

			{/* <div className="breadcrumb-trail">
				<Link href="/dashboard/settings">Settings</Link>
				<span className="crumb-sep">/</span>
				<span className="crumb-current">Departments</span>
			</div>

			<div className="page-header-row">
				<div>
					<h1 className="page-title">Departments</h1>
					<p className="page-subtitle" style={{ marginBottom: 0 }}>
						Manage organizational departments and their members
					</p>
				</div>
				<button className="btn-primary" type="button" onClick={openCreateModal}>
					<Plus size={15} />
					Add Department
				</button>
			</div> */}
			<div className="page-header-row">
				<PageHeader
					parentLabel="Settings"
					parentHref="/dashboard/settings"
					title="Departments"
					subtitle="Manage organizational departments and their members"
				/>
			</div>
			<button
				className="btn-primary"
				type="button"
				onClick={openCreateModal}
			>
				<Plus size={15} />
				Add Department
			</button>
			<div className="card" style={{ margin: '20px 0' }}>
				<div className="search-input">
					<Search size={14} />
					<input type="text" placeholder="Search departments..." />
				</div>
			</div>

			<DataTable
				columns={departmentColumns}
				data={departments}
				totalItems={departments.length}
				currentPage={1}
				totalPages={1}
				columnWidths="2fr 1fr 1.2fr 1fr 1fr 110px"
			/>

			{/* Make this into a table !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
			{/* <div className="table-card">
				<div className="table-scroll">
					<div className="table-grid departments-table-grid">
						<div className="table-head departments-table-row">
							<div>Department</div>
							<div>Manager</div>
							<div>Members</div>
							<div>Open Positions</div>
							<div>Created</div>
							<div>Actions</div>
						</div>

						{departments.map((dept) => (
							<div className="table-row departments-table-row" key={dept.name}>
								<div className="department-name-cell">
									<span className="department-name-text">{dept.name}</span>
								</div>

								<div>
									{dept?.manager ? (
										<a href="#" className="manager-link">
											{dept?.manager}
										</a>
									) : (
										<span className="manager-dash">&mdash;</span>
									)}
								</div>

								<div>
									<span className="members-count-cell">
										<Users size={14} color="var(--text-tertiary)" />
										{dept?.members}
									</span>
								</div>

								<div>
									<span
										className="open-positions-badge"
										style={openPositionsStyle(dept?.openPositions)}
									>
										{dept?.openPositions}
									</span>
								</div>
								<div>
									{new Date(dept.createdAt).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</div>

								<div>
									<span className="actions-cell-group">
										<button className="kebab-btn" type="button" aria-label={`View ${dept.name}`}>
											<Eye size={15} />
										</button>
										<button
											className="kebab-btn"
											type="button"
											aria-label={`Edit ${dept.name}`}
											onClick={() => openEditModal(dept)}
										>
											<Pencil size={15} />
										</button>
										<button className="kebab-btn" type="button" aria-label="More actions">
											<MoreVertical size={15} />
										</button>
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="table-footer">
					<span>Showing 1 to {departments.length} of {departments.length} items</span>
					<div className="pagination">
						<button className="page-btn" type="button" aria-label="Previous page">
							<ChevronLeft size={14} />
						</button>
						<button className="page-btn active" type="button">
							1
						</button>
						<button className="page-btn" type="button" aria-label="Next page">
							<ChevronRight size={14} />
						</button>
					</div>
				</div>
			</div> */}
		</>
	);
}