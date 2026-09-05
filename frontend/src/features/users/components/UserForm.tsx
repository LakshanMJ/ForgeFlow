
import { useEffect, useState } from 'react';
import {
    Users,
    Shield,
    ChevronDown,
    Mail,
    Check,
    CircleCheck
} from 'lucide-react';
import type { InviteUserData, UserFormProps } from '../types/user.types';
import { useRoles } from '@/features/roles/hooks/useRoles';
import Dropdown from '@/shared/components/Dropdown';
import { useDepartments } from '@/features/admin/departments/hooks/useDepartments';
import PhotoUpload from '@/shared/components/PhotoUpload';

type PermissionKey =
    | 'viewTasks'
    | 'createTasks'
    | 'editTasks'
    | 'deleteTasks'
    | 'manageUsers'
    | 'deleteProject'
    | 'comment'
    | 'uploadFiles';

const PERMISSIONS: { key: PermissionKey; label: string; granted: boolean }[] = [
    { key: 'viewTasks', label: 'View Tasks', granted: true },
    { key: 'createTasks', label: 'Create Tasks', granted: true },
    { key: 'editTasks', label: 'Edit Tasks', granted: true },
    { key: 'deleteTasks', label: 'Delete Tasks', granted: false },
    { key: 'manageUsers', label: 'Manage Users', granted: false },
    { key: 'deleteProject', label: 'Delete Project', granted: false },
    { key: 'comment', label: 'Comment', granted: true },
    { key: 'uploadFiles', label: 'Upload Files', granted: true },
];

const EMPTY_FORM: InviteUserData = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    departmentId: '',
    roleId: '',
    avatar: null
};

export default function AddUserForm({
    mode,
    existingUserDetail,
    onSubmit
}: UserFormProps) {
    const {
        data: roles = [],
        isLoading: isRolesLoading,
        isError: isRolesError,
    } = useRoles();

    const {
        data: departments = [],
        isLoading: departmentsLoading,
    } = useDepartments();

    // const [selectedRole, setSelectedRole] = useState('');
    // const [requirePasswordChange, setRequirePasswordChange] = useState(true);
    // const [selectedDepartment, setSelectedDepartment] = useState('');
    const [form, setForm] = useState<InviteUserData>(EMPTY_FORM);
    const [sendInvite, setSendInvite] = useState(true);
    const [addToDefaultProject, setAddToDefaultProject] = useState(false);
    const selectedRoleData = roles.find((role) => role.id === form?.roleId,
    );

    const isReadOnly = mode === 'view'

    useEffect(() => {
        if (mode === 'create') {
            setForm(EMPTY_FORM);
            return;
        }

        if ((mode === 'edit' || mode === 'view') && existingUserDetail) {
            setForm({
                firstName: existingUserDetail.firstName,
                lastName: existingUserDetail.lastName,
                email: existingUserDetail.email,
                jobTitle: existingUserDetail.jobTitle ?? '',
                departmentId: existingUserDetail.department?.id ?? '',
                roleId: existingUserDetail.roles?.[0]?.id ?? '',
                avatar: null,
            });
        }
    }, [mode, existingUserDetail]);

    if (!open) return null;

    if (
        isRolesLoading
    ) {
        return (
            <div className="role-modal-card">
                Loading...
            </div>
        );
    }

    if (
        isRolesError
    ) {
        return (
            <div className="role-modal-card">
                Failed to load role data.
            </div>
        );
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarChange = (file: File | null) => {
        setForm((prev) => ({
            ...prev,
            avatar: file,
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();
        if (isReadOnly) {

            return;
        }

        const data: InviteUserData = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            jobTitle: form.jobTitle,
            departmentId: form.departmentId,
            roleId: form.roleId,
            avatar: form.avatar,
        };
        onSubmit?.(data);
    };

    return (
        <form
            id="user-form"
            className="role-modal-card"
            onSubmit={handleSubmit}
        >
            <div className="modal-body">
                {/* ---- User Details + Profile Picture ---- */}
                <div className="add-user-grid-2">
                    <div className="form-section">
                        <div className="form-section-header">
                            <Users size={15} />
                            <span className="form-section-title">User Details</span>
                        </div>

                        <div className="form-field">
                            <label className="form-label">
                                First Name<span className="required">*</span>
                            </label>
                            <input
                                className="form-input"
                                name="firstName"
                                type="text"
                                value={form?.firstName}
                                onChange={
                                    handleInputChange
                                }
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">
                                Last Name<span className="required">*</span>
                            </label>
                            <input
                                className="form-input"
                                name="lastName"
                                type="text"
                                value={form.lastName}
                                onChange={
                                    handleInputChange
                                }
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">
                                Email<span className="required">*</span>
                            </label>
                            <input
                                className="form-input"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={
                                    handleInputChange
                                }
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">Job Title</label>
                            <input
                                className="form-input"
                                name="jobTitle"
                                type="text"
                                value={form.jobTitle}
                                onChange={
                                    handleInputChange
                                }
                                disabled={isReadOnly}
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <PhotoUpload
                            value={form.avatar ? URL.createObjectURL(form.avatar) : null}
                            onChange={handleAvatarChange}
                            disabled={isReadOnly}
                        />
                    </div>
                </div>

                {/* ---- Role & Access ---- */}
                <div className="form-section">
                    <div className="form-section-header">
                        <Shield size={15} />
                        <span className="form-section-title">Role &amp; Access</span>
                    </div>

                    <div className="role-access-row">
                        <div className="role-field">
                            <Dropdown
                                label="Role"
                                required
                                icon={<Users size={14} />}
                                placeholder="Select a role"
                                value={form?.roleId}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        roleId: value,
                                    }))
                                }
                                options={roles.map((role) => ({
                                    value: role.id,
                                    label: role.displayName,
                                }))}
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="department-field">
                            <Dropdown
                                label="Department"
                                placeholder="Select a department"
                                value={form?.departmentId}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        departmentId: value,
                                    }))
                                }
                                options={departments.map((department) => ({
                                    value: department.id,
                                    label: department.name,
                                }))}
                                disabled={departmentsLoading || isReadOnly}
                            />
                        </div>
                    </div>

                    <div className="role-access-grid">
                        <div>
                            <div className="permission-overview-label">Permission Overview</div>
                            <div className="permission-grid">
                                {selectedRoleData?.rolePermissions.map((perm) => (
                                    <div className="permission-item" key={perm.id}>
                                        <span className="permission-icon">
                                            <CircleCheck size={22} />
                                        </span>
                                        {perm?.permission?.displayName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---- Invitation Settings ---- */}
                <div className="form-section">
                    <div className="form-section-header">
                        <Mail size={15} />
                        <span className="form-section-title">Invitation Settings</span>
                    </div>

                    <div className="invitation-settings-row">
                        <div className="invitation-checks-col">
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => setSendInvite((v) => !v)}
                            >
                                <span className={`form-checkbox${sendInvite ? ' checked' : ''}`}>
                                    {sendInvite && <Check size={12} />}
                                </span>
                                Send invitation email to user
                            </button>
                            {/* <button
                            className="form-checkbox-row"
                            type="button"
                            onClick={() => setRequirePasswordChange((v) => !v)}
                        >
                            <span className={`form-checkbox${requirePasswordChange ? ' checked' : ''}`}>
                                {requirePasswordChange && <Check size={12} />}
                            </span>
                            Require password change on first login
                        </button> */}
                        </div>

                        <div className="default-project-row">
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => setAddToDefaultProject((v) => !v)}
                            >
                                <span className={`form-checkbox${addToDefaultProject ? ' checked' : ''}`}>
                                    {addToDefaultProject && <Check size={12} />}
                                </span>
                                Add to default project:
                            </button>
                            <button
                                className={`form-select-btn default-project-select${addToDefaultProject ? '' : ' disabled'
                                    }`}
                                type="button"
                                disabled={!addToDefaultProject}
                            >
                                <span className="form-select-btn-left">Acme Platform Redesign</span>
                                <ChevronDown size={14} className="chevron" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}