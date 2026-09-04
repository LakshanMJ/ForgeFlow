import { useState } from 'react';
import {
    Plus,
    X,
    FileText,
    Settings,
    Users,
    Clipboard,
    SlidersHorizontal,
    ChevronDown,
    Calendar,
    UserPlus,
    CheckCircle2,
    Check,
    ArrowRight,
} from 'lucide-react';
import Dropdown from '@/shared/components/Dropdown';
import DateSelector from '@/shared/components/DateSelector';
import AddItemAutocomplete from '@/shared/components/ForgeFlowAutocomplete';
import { useUsers } from '@/features/users/hooks/useUsers';
import UserAssigneePicker from '@/shared/components/UserAssigneePicker';
import ForgeFlowAutocomplete from '@/shared/components/ForgeFlowAutocomplete';

type TeamMember = {
    initials: string;
    name: string;
    role: string;
    accent: string;
};

const INITIAL_MEMBERS: TeamMember[] = [
    { initials: 'SJ', name: 'Sarah Johnson', role: 'Lead Dev', accent: 'var(--ember)' },
    { initials: 'MB', name: 'Mike Brown', role: 'Developer', accent: 'var(--gold)' },
    { initials: 'AT', name: 'Alex Turner', role: 'Designer', accent: 'var(--steel)' },
    { initials: 'PS', name: 'Priya Shah', role: 'QA Engineer', accent: 'var(--patina)' },
    { initials: 'LW', name: 'Lisa Wong', role: 'Developer', accent: 'var(--violet)' },
];

const PROJECT_COLOR_OPTIONS = [
    { name: 'steel', value: 'var(--steel)' },
    { name: 'ember', value: 'var(--ember)' },
    { name: 'patina', value: 'var(--patina)' },
    { name: 'gold', value: 'var(--gold)' },
    { name: 'violet', value: 'var(--violet)' },
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

const statuses = []
const priorities = []
const categories = []

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

    const [form, setForm] = useState<CreateProjectData>(EMPTY_FORM);
    console.log(form.members, 'form.members')

    const projectLeadOptions = users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
    }));

    const memberOptions = users.filter(
        (user) => user.id !== form?.projectLead
    );


    // const [members, setMembers] = useState(INITIAL_MEMBERS);
    const [selectedColor, setSelectedColor] = useState('steel');
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
        // setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const toggleAdvanced = (key: keyof typeof advanced) => {
        setAdvanced((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
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
                            defaultValue=""
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">
                            Project Key<span className="required">*</span>
                        </label>
                        <input className="form-input" type="text" defaultValue="" />
                        <span className="form-help-text">ID: ACPR-001, ACPR-002</span>
                    </div>

                    <div className="form-field">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            defaultValue=""
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
                            {/* <label className="form-label">Status</label>
                            <button className="form-select-btn" type="button">
                                <span className="form-select-btn-left">
                                    <span className="select-dot" style={{ background: 'var(--steel)' }} />
                                    Planning
                                </span>
                                <ChevronDown size={14} className="chevron" />
                            </button> */}

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
                                options={statuses.map((status) => ({
                                    value: status.id,
                                    label: status.displayName,
                                }))}
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field">
                            {/* <label className="form-label">Priority</label>
                            <button className="form-select-btn" type="button">
                                <span className="form-select-btn-left">
                                    <span className="select-dot" style={{ background: 'var(--gold)' }} />
                                    Medium
                                </span>
                                <ChevronDown size={14} className="chevron" />
                            </button> */}

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
                                options={priorities.map((priority) => ({
                                    value: priority.id,
                                    label: priority.displayName,
                                }))}
                                disabled={isReadOnly}
                            />
                        </div>

                        <div className="form-field">
                            {/* <label className="form-label">Category</label>
                            <button className="form-select-btn" type="button">
                                <span className="form-select-btn-left">
                                    <span className="select-dot" style={{ background: 'var(--steel)' }} />
                                    Software
                                </span>
                                <ChevronDown size={14} className="chevron" />
                            </button> */}

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
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.displayName,
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
                                            key={c.name}
                                            className={`color-swatch${selectedColor === c.name ? ' selected' : ''}`}
                                            style={{ background: c.value }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedColor(c.name);
                                            }}
                                        />
                                    ))}
                                </span>
                            </button>
                        </div>

                        <div className="form-field">
                            <label className="form-label">Start Date</label>
                            <div className="form-input date-input-row">
                                <Calendar size={14} />
                                Dec 1, 2026
                            </div>

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
                            <label className="form-label">End Date</label>
                            <div className="form-input date-input-row">
                                <Calendar size={14} />
                                Mar 1, 2027
                            </div>
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
                            {/* Project Lead<span className="required">*</span> */}
                        </label>
                        <Dropdown
                            label="Project Lead"
                            required
                            icon={<Users size={14} />}
                            placeholder=""
                            value={form?.projectLead}
                            onChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    projectLead: value,
                                }))
                            }
                            options={projectLeadOptions}
                            disabled={isReadOnly}
                        />
                        {/* <ForgeFlowAutocomplete
                            options={users}
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
                        /> */}
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
                            disabled={!form.projectLead}
                        />
                    </div>
                </div>

                <div className="selected-members-label">Selected Team Members</div>
                <div className="selected-members-row">
                    {form.members.map((m) => (
                        <div className="selected-member-chip" key={m.initials}>
                            <span
                                className="owner-avatar"
                                style={{ background: m.accent, color: '#fff' }}
                            >
                                {m.initials}
                            </span>
                            <span className="selected-member-chip-info">
                                <span className="selected-member-chip-name">{m.firstName} {m.lastName}</span>
                                <span className="selected-member-chip-role">{m.role}</span>
                            </span>
                            <button
                                className="selected-member-chip-remove"
                                type="button"
                                aria-label={`Remove ${m.name}`}
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