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

import DepartmentFormModal from './ProjectCategoriesFormModal';
import DataTable from '@/shared/components/DataTable';
import PageHeader from '@/shared/components/PageHeader';
import { useActiveProjectCategories } from '../hooks/useActiveProjectCategories';
import { useUpdateProjectCategory } from '../hooks/useUpdateProjectCategory';
import { useCreateProjectCategory } from '../hooks/useCreateProjectCategory';
import type { ProjectCategory, ProjectCategoryColumn, ProjectCategoryFormData } from '../types/project-categories.types';
import ProjectCategoriesFormModal from './ProjectCategoriesFormModal';

export default function ProjectCategoriesPage() {

	const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
	const [editingProjectCategory, setEditingProjectCategory] = useState<ProjectCategory | null>(null);
	const initialFormData: ProjectCategoryFormData | undefined = editingProjectCategory
		? {
			name: editingProjectCategory.name,
			description: editingProjectCategory.description ?? '',
			color: editingProjectCategory.color ?? '',
			isActive: editingProjectCategory.isActive,
		}
		: undefined;

	const {
		data: projectCategories = [],
		isLoading,
	} = useActiveProjectCategories();

	const createProjectCategory = useCreateProjectCategory();
	const updateProjectCategory = useUpdateProjectCategory();

	const projectCategoriesColumns: ProjectCategoryColumn[] = [
		{
			key: 'name',
			label: 'Name',
			render: (category) => (
				<div className="department-name-cell">
					<span className="department-name-text">
						{category.name || '--'}
					</span>
				</div>
			),
		},
		{
			key: 'description',
			label: 'Description',
			// render: (category) => { category.description || '--' }
			render: (category) => (
				<div className="department-name-cell">
					<span className="department-name-text">
						{category.name || '--'}
					</span>
				</div>
			),
		},
		{
			key: 'color',
			label: 'Color',
			render: (category) => (
				<span className="members-count-cell">
					{category?.color || '--'}
				</span>
			),
		},
		{
			key: 'isActive',
			label: 'Status',
			render: (category) => (
				<span className="members-count-cell">
					{category.isActive ? 'Active' : 'Inactive'}
				</span>
			),
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (category) => (
				<span className="actions-cell-group">
					<button
						className="kebab-btn"
						type="button"
						aria-label={`View ${category.name}`}
						onClick={() => openViewModal(category)}
					>
						<Eye size={15} />
					</button>

					<button
						className="kebab-btn"
						type="button"
						aria-label={`Edit ${category.name}`}
						onClick={() => openEditModal(category)}
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
		setEditingProjectCategory(null);
		setModalMode('create');
	};

	const openEditModal = (cat: ProjectCategory) => {
		setEditingProjectCategory(cat);
		setModalMode('edit');
	};

	const openViewModal = (cat: ProjectCategory) => {
		setEditingProjectCategory(cat);
		setModalMode('view');
	};

	const closeModal = () => {
		setModalMode(null);
		setEditingProjectCategory(null);
	};

	const handleSubmit = (data: ProjectCategoryFormData) => {
		if (modalMode === 'edit' && editingProjectCategory) {
			updateProjectCategory.mutate(
				{
					id: editingProjectCategory.id,
					data: {
						name: data.name,
						description: data.description,
						color: data.color,
						isActive: data.isActive,
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
		createProjectCategory.mutate(
			{
				name: data.name,
				description: data.description,
				color: data.color,
				isActive: data.isActive,
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
			<ProjectCategoriesFormModal
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
					title="Project Categories"
					subtitle="Manage Project Categories"
				/>

				<button
					className="btn-primary"
					type="button"
					onClick={openCreateModal}
				>
					<Plus size={15} />
					Add Project Category
				</button>
			</div>
			<div className="card" style={{ margin: '20px 0' }}>
				<div className="search-input">
					<Search size={14} />
					<input type="text" placeholder="Search project categories..." />
				</div>
			</div>

			<DataTable
				columns={projectCategoriesColumns}
				data={projectCategories}
				totalItems={projectCategories.length}
				currentPage={1}
				totalPages={1}
				columnWidths="2.5fr 2fr 1fr 1fr 110px"
			/>
		</>
	);
}