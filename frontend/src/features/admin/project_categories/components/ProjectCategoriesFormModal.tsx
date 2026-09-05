'use client';

import { useEffect, useState } from 'react';
import { Building2,Plus, Save } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import type { ProjectCategoryFormData } from '../types/project-categories.types';
import ForgeFlowSwitch from '@/shared/components/ForgeFlowSwitch';

const EMPTY_FORM: ProjectCategoryFormData = {
	name: '',
	description: '',
	color: '',
	isActive: false,
};

export default function ProjectCategoriesFormModal({
	open,
	onClose,
	mode,
	initialData,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	mode: 'create' | 'edit' | 'view';
	initialData?: ProjectCategoryFormData;
	onSubmit?: (data: ProjectCategoryFormData) => void;
}) {
	const [form, setForm] = useState<ProjectCategoryFormData>(EMPTY_FORM);

	useEffect(() => {
		if (open) {
			setForm(initialData ?? EMPTY_FORM);
		}
	}, [open, initialData]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit?.(form);
		onClose();
	};

	const isEdit = mode === 'edit';
	const isReadOnly = mode === 'view';

	return (
		<Modal
			isOpen={open}
			onClose={onClose}
			title={isEdit ? 'Edit Project Category' : isReadOnly ? 'View Project Category' : 'Add Project Category'}
			icon={<Building2 size={18} />}
			size="md"
			submitFormId="project-category-form"
			showSubmit={mode !== 'view'}
			submitLabel={isEdit ? 'Save Changes' : 'Create Project Category'}
			submitIcon={isEdit ? <Save size={14} /> : <Plus size={14} />}
		>
			<form id="project-category-form" onSubmit={handleSubmit}>
				<div className="form-field">
					<label className="form-label">
						Project Category Name<span className="required">*</span>
					</label>
					<div className="search-input">
						<input
							type="text"
							placeholder=""
							value={form.name}
							onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
							required
							disabled={isReadOnly}
						/>
					</div>
				</div>

				<div className="form-field">
					<label className="form-label">Project Category Description</label>
					<textarea
						className="form-textarea"
						placeholder=""
						value={form.description}
						onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						style={{ minHeight: 120 }}
						disabled={isReadOnly}
					/>
				</div>
				<div className="form-field active-field">
					<label className="form-label">Active</label>
					<ForgeFlowSwitch
						checked={form.isActive}
						onChange={(e) =>
							setForm(prev => ({
								...prev,
								isActive: e.target.checked,
							}))
						}
						disabled={isReadOnly}
					/>
				</div>
			</form>
		</Modal>
	);
}