
import { useState } from 'react';
import {
    UserPlus,
    X,
    Users,
    Camera,
    Upload,
    Trash2,
    Shield,
    ChevronDown,
    Building2,
    Mail,
    Check,
    UserCircle,
    CircleCheck
} from 'lucide-react';
import type { UserFormProps } from '../types/user.types';
import { useRoles } from '@/features/roles/hooks/useRoles';
import Dropdown from '@/shared/components/Dropdown';
import { useDepartments } from '@/features/departments/hooks/useDepartments';

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

    console.log(JSON.stringify(roles))
    const [sendInvite, setSendInvite] = useState(true);
    const [requirePasswordChange, setRequirePasswordChange] = useState(true);
    const [addToDefaultProject, setAddToDefaultProject] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const selectedRoleData = roles.find((role) => role.id === selectedRole,
    );

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

    return (
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
                        <input className="form-input" type="text" />
                    </div>

                    <div className="form-field">
                        <label className="form-label">
                            Last Name<span className="required">*</span>
                        </label>
                        <input className="form-input" type="text" />
                    </div>

                    <div className="form-field">
                        <label className="form-label">
                            Email<span className="required">*</span>
                        </label>
                        <input
                            className="form-input"
                            type="email"
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Job Title</label>
                        <input
                            className="form-input"
                            type="text"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <div className="form-section-header">
                        <Camera size={15} />
                        <span className="form-section-title">Profile Picture</span>
                    </div>

                    <div className="profile-picture-row">
                        <div className="avatar-upload-col">
                            <div className="avatar-upload-box">
                                <span className="avatar-upload-icon-circle">
                                    <UserCircle size={30} />
                                </span>
                                <span className="avatar-upload-label">
                                    Avatar
                                    <br />
                                    Preview
                                </span>
                            </div>
                            <button className="btn-secondary btn-block" type="button">
                                <Upload size={14} />
                                Upload Photo
                            </button>
                            <button className="btn-outline-danger" type="button">
                                <Trash2 size={14} />
                                Remove Photo
                            </button>
                        </div>

                        <div className="upload-info-col">
                            <div className="upload-info-row">
                                <span className="upload-info-label">Supported formats:</span>
                                <span className="upload-info-value">PNG, JPG, JPEG, WEBP, GIF</span>
                            </div>
                            <div className="upload-info-row">
                                <span className="upload-info-label">Max size:</span>{' '}
                                <span className="upload-info-value">5MB</span>
                            </div>
                            <div className="upload-info-row">
                                <span className="upload-info-label">Recommended:</span>{' '}
                                <span className="upload-info-value">400x400px</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Role & Access ---- */}
            <div className="form-section">
                <div className="form-section-header">
                    <Shield size={15} />
                    <span className="form-section-title">Role &amp; Access</span>
                </div>

                <div className="form-field">
                    {/* <label className="form-label">
                        Role<span className="required">*</span>
                    </label>
                    <button className="form-select-btn" type="button">
                        <span className="form-select-btn-left">
                            <Users size={14} />
                            Developer
                        </span>
                        <ChevronDown size={14} className="chevron" />
                    </button> */}

                    <Dropdown
                        label="Role"
                        required
                        icon={<Users size={14} />}
                        placeholder="Select a role"
                        value={selectedRole}
                        onChange={setSelectedRole}
                        options={roles.map((role) => ({
                            value: role.id,
                            label: role.displayName,
                        }))}
                    />

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

                    <div className="form-field" style={{ marginBottom: 0 }}>
                        {/* <label className="form-label">
                            Department<span className="required">*</span>
                        </label>
                        <button className="form-select-btn" type="button">
                            <span className="form-select-btn-left">
                                <Building2 size={14} />
                                Engineering
                            </span>
                            <ChevronDown size={14} className="chevron" />
                        </button> */}
                        <Dropdown
                            label="Department"
                            placeholder="Select a department"
                            value={selectedDepartment}
                            onChange={setSelectedDepartment}
                            options={departments.map((department) => ({
                                value: department.id,
                                label: department.name,
                            }))}
                            disabled={departmentsLoading}
                        />
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
                        <button
                            className="form-checkbox-row"
                            type="button"
                            onClick={() => setRequirePasswordChange((v) => !v)}
                        >
                            <span className={`form-checkbox${requirePasswordChange ? ' checked' : ''}`}>
                                {requirePasswordChange && <Check size={12} />}
                            </span>
                            Require password change on first login
                        </button>
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
    );
}