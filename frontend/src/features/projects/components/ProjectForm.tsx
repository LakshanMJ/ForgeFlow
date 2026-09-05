import { useState } from 'react';
import {
    X,
    FileText,
    Settings,
    Users,
    Clipboard,
    SlidersHorizontal,
    ChevronDown,
    CheckCircle2,
    Check,
} from 'lucide-react';
import Dropdown from '@/shared/components/Dropdown';
import DateSelector from '@/shared/components/DateSelector';
import { useUsers } from '@/features/users/hooks/useUsers';
import ForgeFlowAutocomplete from '@/shared/components/ForgeFlowAutocomplete';
import { ProjectColor, ProjectStatus, type CreateProjectData, type ProjectFormProps } from '../types/project.types';
import { useActiveProjectCategories } from '@/features/admin/project_categories/hooks/useActiveProjectCategories';

export const PROJECT_COLOR_OPTIONS = [
    { name: 'steel', value: ProjectColor.STEEL, cssValue: 'var(--steel)' },
    { name: 'ember', value: ProjectColor.EMBER, cssValue: 'var(--ember)' },
    { name: 'patina', value: ProjectColor.PATINA, cssValue: 'var(--patina)' },
    { name: 'gold', value: ProjectColor.GOLD, cssValue: 'var(--gold)' },
    { name: 'violet', value: ProjectColor.VIOLET, cssValue: 'var(--violet)' },
];

export const PROJECT_PRIORITY_OPTIONS = [
    {
        name: 'Low',
        value: 'LOW',
    },
    {
        name: 'Medium',
        value: 'MEDIUM',
    },
    {
        name: 'High',
        value: 'HIGH',
    },
    {
        name: 'Urgent',
        value: 'URGENT',
    },
];

const EMPTY_FORM: CreateProjectData = {
    name: '',
    description: '',
    status: '',
    priority: '',
    category: '',
    color: '',
    startDate: '',
    endDate: '',
    owner: '',
    members: [],
};

const formatStatus = (status: string) =>
    status
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());

const projectStatusOptions = Object.values(ProjectStatus).map(status => ({
    value: status,
    label: formatStatus(status),
}));

export default function ProjectForm({
    mode,
    existingProjectDetail,
    onSubmit
}: ProjectFormProps) {

    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useUsers();

    const {
        data: projectCategories = [],
        isLoading: isProjectCategoriesLoading,
        isError: isProjectCategoriesError,
    } = useActiveProjectCategories();

    const [form, setForm] = useState<CreateProjectData>(EMPTY_FORM);

    const projectOwnerOptions = users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
    }));

    const memberOptions = users.filter(
        (user) => user.id !== form?.owner
    );

    const [sendInvites, setSendInvites] = useState(true);
    const [advanced, setAdvanced] = useState({
        sprintTracking: true,
        timeTracking: true,
        projectWiki: false,
        backlog: false,
        fileAttachments: true,
    });

    const isReadOnly = mode === 'view'

    if (!open) return null;

    const removeMember = (id: string) => {
        setForm((prev) => ({
            ...prev,
            members: prev.members.filter((m) => m.id !== id)
        }))
    };

    const toggleAdvanced = (key: keyof typeof advanced) => {
        setAdvanced((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (

        <form id="project-form" onSubmit={handleSubmit}>
            <div className="modal-body">
                {/* ---- Project Details + Project Settings ---- */}
                <div className="form-grid-2">
                    <div className="form-section">
                        <div className="form-section-header">
                            <FileText size={15} />
                            <span className="form-section-title">Project Details</span>
                        </div>

                        <div className="form-field">
                            <label className="form-label">
                                Project Name<span className="required">*</span>
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                name="name"
                                defaultValue=""
                                onChange={
                                    handleInputChange
                                }
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">
                                Project Key<span className="required">*</span>
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                name="key"
                                defaultValue=""
                                onChange={
                                    handleInputChange
                                }
                                disabled
                            />
                            <span className="form-help-text">ID: ACPR-001, ACPR-002</span>
                        </div>

                        <div className="form-field">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-textarea"
                                defaultValue=""
                                name="description"
                                onChange={
                                    handleInputChange
                                }
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-header">
                            <Settings size={15} />
                            <span className="form-section-title">Project Settings</span>
                        </div>

                        <div className="settings-grid">
                            <div className="form-field">
                                <Dropdown
                                    label="Status"
                                    required
                                    icon={<Users size={14} />}
                                    placeholder="Select a Status"
                                    value={form?.status}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status: value,
                                        }))
                                    }
                                    options={projectStatusOptions.map((status) => ({
                                        value: status.value,
                                        label: status.label,
                                    }))}
                                    disabled={isReadOnly}
                                />
                            </div>

                            <div className="form-field">
                                <Dropdown
                                    label="Priority"
                                    required
                                    icon={<Users size={14} />}
                                    placeholder="Select a Priority"
                                    value={form?.priority}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            priority: value,
                                        }))
                                    }
                                    options={PROJECT_PRIORITY_OPTIONS.map((priority) => ({
                                        value: priority.value,
                                        label: priority.name,
                                    }))}
                                    disabled={isReadOnly}
                                />
                            </div>

                            <div className="form-field">
                                <Dropdown
                                    label="Category"
                                    required
                                    icon={<Users size={14} />}
                                    placeholder="Select a Category"
                                    value={form?.category}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            category: value,
                                        }))
                                    }
                                    options={projectCategories.map((category) => ({
                                        value: category.id,
                                        label: category.name,
                                    }))}
                                    disabled={isReadOnly}
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label">Color Label</label>

                                <button className="form-select-btn" type="button">
                                    <span className="color-swatch-row">
                                        {PROJECT_COLOR_OPTIONS.map((c) => (
                                            <span
                                                key={c.value}
                                                className={`color-swatch${form.color === c.value ? ' selected' : ''
                                                    }`}
                                                style={{
                                                    background: c.cssValue,
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setForm((prev) => ({
                                                        ...prev,
                                                        color: c.value,
                                                    }));
                                                }}
                                            />
                                        ))}
                                    </span>
                                </button>
                            </div>

                            <div className="form-field">
                                <DateSelector
                                    label="Start Date"
                                    required
                                    value={form?.startDate}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            startDate: value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="form-field">
                                <DateSelector
                                    label="End Date"
                                    required
                                    value={form?.endDate}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            endDate: value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---- Team & Access ---- */}
                <div className="form-section">
                    <div className="form-section-header">
                        <Users size={15} />
                        <span className="form-section-title">Team &amp; Access</span>
                    </div>

                    <div className="team-row-2col">
                        <div className="form-field" style={{ marginBottom: 0 }}>
                            <label className="form-label">
                            </label>
                            <Dropdown
                                label="Project Lead"
                                required
                                icon={<Users size={14} />}
                                placeholder=""
                                value={form?.owner}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        owner: value,
                                    }))
                                }
                                options={projectOwnerOptions}
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field" style={{ marginBottom: 0 }}>
                            <label className="form-label">Add Team Members</label>
                            <ForgeFlowAutocomplete
                                options={memberOptions}
                                value={form.members}
                                onChange={(selectedUsers) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        members: selectedUsers,
                                    }))
                                }
                                getOptionLabel={(u) => `${u.firstName} ${u.lastName}`}
                                getOptionKey={(u) => u.id}
                                renderValue={() => null}
                                disabled={!form.owner}
                            />
                        </div>
                    </div>

                    <div className="selected-members-label">Selected Team Members</div>
                    <div className="selected-members-row">
                        {form.members.map((m) => (

                            <div className="selected-member-chip" key={m.id}>
                                <span
                                    className="owner-avatar"
                                    style={{ background: m.accent, color: '#fff' }}
                                >
                                    {`${m.firstName?.[0] ?? ''}${m.lastName?.[0] ?? ''}`.toUpperCase()}
                                </span>

                                <span className="selected-member-chip-info">
                                    <span className="selected-member-chip-name">
                                        {m.firstName} {m.lastName}
                                    </span>

                                    <span className="selected-member-chip-role">
                                        {m.roles[0].displayName}
                                    </span>
                                </span>

                                <button
                                    className="selected-member-chip-remove"
                                    type="button"
                                    aria-label={`Remove ${m.firstName} ${m.lastName}`}
                                    onClick={() => removeMember(m.id)}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        className="form-checkbox-row"
                        type="button"
                        onClick={() => setSendInvites((v) => !v)}
                    >
                        <span className={`form-checkbox${sendInvites ? ' checked' : ''}`}>
                            {sendInvites && <Check size={12} />}
                        </span>
                        Send invitation emails to all members
                    </button>
                </div>

                {/* ---- Template + Advanced options ---- */}
                <div className="bottom-row-grid">
                    <div className="form-section">
                        <div className="form-section-header">
                            <Clipboard size={15} />
                            <span className="form-section-title">
                                Project Template<span className="optional">(Optional)</span>
                            </span>
                        </div>
                        <button className="form-select-btn" type="button">
                            <span className="form-select-btn-left">
                                <Clipboard size={14} />
                                Software Development (Default)
                            </span>
                            <ChevronDown size={14} className="chevron" />
                        </button>
                        <div className="template-success-note">
                            <CheckCircle2 size={14} />
                            Creates default statuses, labels, and board columns
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-header">
                            <SlidersHorizontal size={15} />
                            <span className="form-section-title">Advanced Options</span>
                        </div>
                        <div className="advanced-options-grid">
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => toggleAdvanced('sprintTracking')}
                            >
                                <span className={`form-checkbox${advanced.sprintTracking ? ' checked' : ''}`}>
                                    {advanced.sprintTracking && <Check size={12} />}
                                </span>
                                Enable sprint tracking
                            </button>
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => toggleAdvanced('backlog')}
                            >
                                <span className={`form-checkbox${advanced.backlog ? ' checked' : ''}`}>
                                    {advanced.backlog && <Check size={12} />}
                                </span>
                                Enable backlog
                            </button>
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => toggleAdvanced('timeTracking')}
                            >
                                <span className={`form-checkbox${advanced.timeTracking ? ' checked' : ''}`}>
                                    {advanced.timeTracking && <Check size={12} />}
                                </span>
                                Enable time tracking
                            </button>
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => toggleAdvanced('fileAttachments')}
                            >
                                <span className={`form-checkbox${advanced.fileAttachments ? ' checked' : ''}`}>
                                    {advanced.fileAttachments && <Check size={12} />}
                                </span>
                                Enable file attachments
                            </button>
                            <button
                                className="form-checkbox-row"
                                type="button"
                                onClick={() => toggleAdvanced('projectWiki')}
                            >
                                <span className={`form-checkbox${advanced.projectWiki ? ' checked' : ''}`}>
                                    {advanced.projectWiki && <Check size={12} />}
                                </span>
                                Enable project wiki
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}