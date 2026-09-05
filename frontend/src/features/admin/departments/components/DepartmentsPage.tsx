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

import DepartmentFormModal from './DepartmentFormModal';
import { useDepartments } from '../hooks/useDepartments';
import { useCreateDepartment } from '../hooks/useCreateDepartment';
import { useUpdateDepartment } from '../hooks/useUpdateDepartment';
import DataTable from '@/shared/components/DataTable';
import PageHeader from '@/shared/components/PageHeader';
import type { Department, DepartmentColumn, DepartmentFormData } from '../types/departments.types';

function openPositionsStyle(count: number): { background: string; color: string } {
	if (count === 0) return { background: 'var(--patina-tint)', color: 'var(--patina-tint-text)' };
	if (count <= 2) return { background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' };
	return { background: 'var(--ember-tint)', color: 'var(--ember-tint-text)' };
}

export default function DepartmentsPage() {

	const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
	const [editingDept, setEditingDept] = useState<Department | null>(null);
	const initialFormData: DepartmentFormData | undefined = editingDept
		? {
			name: editingDept.name,
			description: editingDept.description ?? '',
			managerId: editingDept.managerId ?? '',
			parentDepartmentName: '',
			openPositions: editingDept.openPositions,
		}
		: undefined;

	const {
		data: departments = [],
		isLoading,
	} = useDepartments();

	const createDepartment = useCreateDepartment();
	const updateDepartment = useUpdateDepartment();

	const departmentColumns : DepartmentColumn[] = [
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
			key: 'managerId',
			label: 'Manager',
			render: (dept) =>
				dept.managerId ? (
					<a href="#" className="manager-link">	
						{dept.manager?.firstName} {dept.manager?.lastName}
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
					{dept._count?.users || '--'}
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
						onClick={() => openViewModal(dept)}
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

	const openViewModal = (dept: Department) => {
		setEditingDept(dept);
		setModalMode('view');
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
						managerId: data.managerId,
						openPositions: data.openPositions,
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
				managerId: data.managerId,
				openPositions: data.openPositions,
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

			<div className="page-header-row">
				<PageHeader
					parentLabel="Admin"
					parentHref="#"
					title="Departments"
					subtitle="Manage organizational departments and their members"
				/>

				<button
					className="btn-primary"
					type="button"
					onClick={openCreateModal}
				>
					<Plus size={15} />
					Add Department
				</button>
			</div>
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
		</>
	);
}