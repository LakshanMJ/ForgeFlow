'use client';

import { useEffect, useState } from 'react';
import { Building2, User, Folder, ChevronDown, Plus, Save } from 'lucide-react';
import Modal from '@/shared/components/Modal';

export type DepartmentFormData = {
  name: string;
  description: string;
  managerName: string;
  parentDepartmentName: string;
};

const EMPTY_FORM: DepartmentFormData = {
  name: '',
  description: '',
  managerName: '',
  parentDepartmentName: '',
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
  mode: 'create' | 'edit';
  initialData?: DepartmentFormData;
  onSubmit?: (data: DepartmentFormData) => void;
}) {
  const [form, setForm] = useState<DepartmentFormData>(EMPTY_FORM);

  // Re-sync the form fields every time the modal is opened — with the
  // department's current data in edit mode, or a blank form in create mode.
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

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={isEdit ? 'Edit Department' : 'Add New Department'}
      icon={<Building2 size={18} />}
      size="md"
      submitFormId="department-form"
      submitLabel={isEdit ? 'Save Changes' : 'Create Department'}
      submitIcon={isEdit ? <Save size={14} /> : <Plus size={14} />}
    >
      <form id="department-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">
            Department Name<span className="required">*</span>
          </label>
          <div className="search-input">
            <Building2 size={14} />
            <input
              type="text"
              placeholder="e.g., Engineering"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Department Description</label>
          <textarea
            className="form-textarea"
            placeholder="Describe the department's purpose and responsibilities..."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            style={{ minHeight: 120 }}
          />
        </div>

        <div className="form-field">
          <label className="form-label">
            Department Manager <span className="form-help-text">(optional)</span>
          </label>
          <button type="button" className="form-select-btn">
            <span className="form-select-btn-left">
              <User size={14} />
              {form.managerName || 'Select department manager'}
            </span>
            <ChevronDown size={14} className="chevron" />
          </button>
        </div>

        <div className="form-field" style={{ marginBottom: 0 }}>
          <label className="form-label">
            Parent Department <span className="form-help-text">(optional)</span>
          </label>
          <button type="button" className="form-select-btn">
            <span className="form-select-btn-left">
              <Folder size={14} />
              {form.parentDepartmentName || 'Select parent department'}
            </span>
            <ChevronDown size={14} className="chevron" />
          </button>
        </div>
      </form>
    </Modal>
  );
}