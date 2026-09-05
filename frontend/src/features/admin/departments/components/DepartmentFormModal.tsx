'use client';

import { useEffect, useState } from 'react';
import { Building2, User, Folder, ChevronDown, Plus, Save, Users } from 'lucide-react';
import Modal from '@/shared/components/Modal';
import Dropdown from '@/shared/components/Dropdown';
import type { DepartmentFormData } from '../types/departments.types';
import { useUsers } from '@/features/users/hooks/useUsers';

const EMPTY_FORM: DepartmentFormData = {
	name: '',
	description: '',
	managerId: '',
	parentDepartmentName: '',
	openPositions: 0,
};

export default function DepartmentFormModal({
	open,
	onClose,
	mode,
	initialData,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	mode: 'create' | 'edit' | 'view';
	initialData?: DepartmentFormData;
	onSubmit?: (data: DepartmentFormData) => void;
}) {
	const [form, setForm] = useState<DepartmentFormData>(EMPTY_FORM);

	const {
		data: users = [],
		isLoading: isUsersLoading,
		isError: isUsersError,
	} = useUsers();

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
			title={isEdit ? 'Edit Department' : isReadOnly ? 'View Department' : 'Add New Department'}
			icon={<Building2 size={18} />}
			size="md"
			submitFormId="department-form"
			showSubmit={mode !== 'view'}
			submitLabel={isEdit ? 'Save Changes' : 'Create Department'}
			submitIcon={isEdit ? <Save size={14} /> : <Plus size={14} />}
		>
			<form id="department-form" onSubmit={handleSubmit}>
				<div className="form-field">
					<label className="form-label">
						Department Name<span className="required">*</span>
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
					<label className="form-label">Department Description</label>
					<textarea
						className="form-textarea"
						placeholder=""
						value={form.description}
						onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						style={{ minHeight: 120 }}
						disabled={isReadOnly}
					/>
				</div>

				<div className="form-field">
					<Dropdown
						label="Department Manager"
						required
						icon={<Users size={14} />}
						placeholder=""
						value={form?.managerId}
						onChange={(value) =>
							setForm((prev) => ({
								...prev,
								managerId: value,
							}))
						}
						options={users.map((user) => ({
							value: user.id,
							label: `${user.firstName} ${user.lastName}`
						}))}
						disabled={isReadOnly}
					/>
				</div>

				<div className="form-field">
					<label className="form-label">
						Open Positions
					</label>
					<div className="search-input">
						<input
							type="number"
							placeholder=""
							value={form.openPositions}
							onChange={(e) => setForm((f) => ({ ...f, openPositions: parseInt(e.target.value) || 0 }))}
							required
							disabled={isReadOnly}
						/>
					</div>
				</div>

				<div className="form-field" style={{ marginBottom: 0 }}>
					<label className="form-label">
						Parent Department <span className="form-help-text">(optional)</span>
					</label>
					<button type="button" className="form-select-btn">
						<span className="form-select-btn-left">
							{form.parentDepartmentName}
						</span>
						<ChevronDown size={14} className="chevron" />
					</button>
				</div>
			</form>
		</Modal>
	);
}