'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Code2,
  Megaphone,
  TrendingUp,
  Package,
  User,
  DollarSign,
  Cog,
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

// type Department = {
//   name: string;
//   description: string;
//   icon: typeof Code2;
//   accent: string;
//   accentTint: string;
//   manager: string | null;
//   parentDepartment: string;
//   members: number;
//   openPositions: number;
//   created: string;
// };

const INITIAL_DEPARTMENTS: Department[] = [
  { name: 'Engineering', description: 'Builds and maintains all core platform software.', icon: Code2, accent: 'var(--steel)', accentTint: 'var(--steel-tint)', manager: 'Sarah Chen', parentDepartment: '', members: 24, openPositions: 3, created: 'Jan 2024' },
  { name: 'Marketing', description: 'Owns brand, campaigns, and customer acquisition.', icon: Megaphone, accent: 'var(--patina)', accentTint: 'var(--patina-tint)', manager: 'Alex Rivera', parentDepartment: '', members: 18, openPositions: 1, created: 'Jan 2024' },
  { name: 'Sales', description: 'Drives revenue through new business and renewals.', icon: TrendingUp, accent: 'var(--violet)', accentTint: 'var(--violet-tint)', manager: null, parentDepartment: '', members: 12, openPositions: 4, created: 'Feb 2024' },
  { name: 'Product', description: 'Defines product strategy and roadmap.', icon: Package, accent: 'var(--gold)', accentTint: 'var(--gold-tint)', manager: 'Jamie Wong', parentDepartment: '', members: 9, openPositions: 0, created: 'Mar 2024' },
  { name: 'HR', description: 'Manages hiring, benefits, and employee relations.', icon: User, accent: 'var(--steel)', accentTint: 'var(--steel-tint)', manager: 'Michael Lee', parentDepartment: '', members: 6, openPositions: 2, created: 'Apr 2024' },
  { name: 'Finance', description: 'Oversees budgeting, payroll, and financial reporting.', icon: DollarSign, accent: 'var(--gold)', accentTint: 'var(--gold-tint)', manager: null, parentDepartment: '', members: 5, openPositions: 1, created: 'May 2024' },
  { name: 'Operations', description: 'Keeps internal tooling and processes running smoothly.', icon: Cog, accent: 'var(--ember)', accentTint: 'var(--ember-tint)', manager: null, parentDepartment: '', members: 4, openPositions: 0, created: 'Jun 2024' },
];

function openPositionsStyle(count: number): { background: string; color: string } {
  if (count === 0) return { background: 'var(--patina-tint)', color: 'var(--patina-tint-text)' };
  if (count <= 2) return { background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' };
  return { background: 'var(--ember-tint)', color: 'var(--ember-tint-text)' };
}

export default function DepartmentsPage() {
  // const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
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

  // const initialFormData: DepartmentFormData | undefined = editingDept
  //   ? {
  //     name: editingDept.name,
  //     description: editingDept.description,
  //     managerName: editingDept.manager ?? '',
  //     parentDepartmentName: editingDept.parentDepartment,
  //   }
  //   : undefined;

  return (
    <>
      <DepartmentFormModal
        open={modalMode !== null}
        onClose={closeModal}
        mode={modalMode ?? 'create'}
        initialData={initialFormData}
        onSubmit={handleSubmit}
      />

      <div className="breadcrumb-trail">
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
      </div>

      <div className="card" style={{ margin: '20px 0' }}>
        <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search departments..." />
        </div>
      </div>

      <div className="table-card">
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
                  {/* <span
                    className="department-icon"
                    style={{ background: dept.accentTint, color: dept.accent }}
                  >
                    <dept.icon size={17} />
                  </span> */}
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

                <div>{dept?.created}</div>

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
      </div>
    </>
  );
}