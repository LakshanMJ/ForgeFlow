import AnimatedLogo from '@/shared/components/AnimatedLogo';
import BrandMark from '@/shared/components/BrankMark';
import StatusChip from '@/shared/components/StatusChip';
import { ArrowRight, Sparkles } from 'lucide-react';

const FLINT_ITEMS = [
    {
        tone: 'critical',
        content: (
            <>
                <span className="mention-chip mention-task">@Payment API Integration</span>{' '}
                is <strong>2 days overdue </strong> and marked Critical. I&apos;d prioritize
                this today.
            </>
        ),
    },
    {
        tone: 'high',
        content: (
            <>
                <span className="mention-chip mention-task">@User Authentication</span> is
                blocking <span className="mention-chip mention-user">@Sarah</span> from
                continuing on <span className="mention-chip mention-project">@Phoenix</span>
                . This is your highest-impact task.
            </>
        ),
    },
    {
        tone: 'medium',
        content: (
            <>
                <span className="mention-chip mention-user">@Mike</span> mentioned you in{' '}
                <span className="mention-chip mention-task">@API Documentation</span>. Check
                that thread before moving on.
            </>
        ),
    },
];

const KPI_CARDS = [
    {
        label: 'My Tasks',
        value: 12,
        accent: 'var(--text-tertiary)',
        delta: '▲ 2',
        valueColor: 'var(--kpi-card-text-color)',
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,18 12,16 24,17 36,12 48,10 60,8 72,6"
                    fill="none"
                    stroke="var(--text-tertiary)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: 'In Progress',
        value: 5,
        accent: 'var(--steel)',
        delta: '▲ 1',
        valueColor: 'var(--kpi-card-text-color)',
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,18 12,17 24,15 36,13 48,12 60,11 72,9"
                    fill="none"
                    stroke="var(--steel)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: 'Overdue',
        value: 3,
        accent: 'var(--red)',
        delta: '▼ 1',
        valueColor: 'var(--red)',
        visual: (
            <svg width="80" height="34" viewBox="0 0 80 34">
                <rect x="0" y="20" width="7" height="14" rx="2" fill="var(--red)" opacity="0.35" />
                <rect x="11" y="15" width="7" height="19" rx="2" fill="var(--red)" opacity="0.5" />
                <rect x="22" y="8" width="7" height="26" rx="2" fill="var(--red)" opacity="0.7" />
                <rect x="33" y="2" width="7" height="32" rx="2" fill="var(--red)" opacity="0.95" />
                <rect x="44" y="10" width="7" height="24" rx="2" fill="var(--red)" opacity="0.6" />
                <rect x="55" y="17" width="7" height="17" rx="2" fill="var(--red)" opacity="0.4" />
                <rect x="66" y="23" width="7" height="11" rx="2" fill="var(--red)" opacity="0.25" />
            </svg>
        ),
    },
    {
        label: 'Done This Week',
        value: 4,
        accent: 'var(--patina)',
        delta: '▲ 2',
        valueColor: 'var(--patina)',
        visualArea: true,
        visual: (
            <svg width="90" height="34" viewBox="0 0 90 34">
                <defs>
                    <linearGradient id="doneAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--patina)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--patina)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0,26 L 15,24 L 30,19 L 45,14 L 60,10 L 75,7 L 90,4 L 90,34 L 0,34 Z"
                    fill="url(#doneAreaGradient)"
                />
                <polyline
                    points="0,26 15,24 30,19 45,14 60,10 75,7 90,4"
                    fill="none"
                    stroke="var(--patina)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const FOCUS_TASKS: {
    title: string;
    priority: Priority;
    project: string;
    due: string;
    overdue?: boolean;
}[] = [
        { title: 'Payment API Integration', priority: 'critical', project: 'acme', due: 'Dec 12 · overdue', overdue: true },
        { title: 'Review Dashboard PR', priority: 'high', project: 'acme', due: 'Due today' },
        { title: 'Update DB Schema Docs', priority: 'medium', project: 'beta', due: 'Dec 13' },
        { title: 'Fix mobile layout bug', priority: 'high', project: 'gamma', due: 'Due today' },
        { title: 'Sync with design team', priority: 'low', project: 'beta', due: 'Dec 15' },
    ];

const ACTIVITY_ITEMS = [
    { initials: 'P', gradient: 'linear-gradient(135deg, var(--patina), var(--patina-tint-text))', who: 'You', verb: 'completed', target: 'DB Migration', time: '2h ago' },
    { initials: 'S', gradient: 'linear-gradient(135deg, var(--gold), var(--gold-tint-text))', who: 'Sarah', verb: 'mentioned you in', target: 'API Docs', time: '5h ago' },
    { initials: 'M', gradient: 'linear-gradient(135deg, var(--steel), var(--steel-tint-text))', who: 'Mike', verb: 'assigned you', target: 'User Auth', time: '1d ago' },
    { initials: 'P', gradient: 'linear-gradient(135deg, var(--patina), var(--patina-tint-text))', who: 'You', verb: 'commented on', target: 'Dashboard Redesign', time: '2d ago' },
];

const OVERDUE_ITEMS = [
    { title: 'User Authentication', meta: 'acme · mike', badge: '2d late' },
    { title: 'API Documentation', meta: 'beta · sarah', badge: '1d late' },
    { title: 'Test coverage', meta: 'gamma · paulie', badge: '4d late' },
];

type Priority = 'critical' | 'high' | 'medium' | 'low';
// const PRIORITY_CHIP: Record<Priority, string> = {
//     critical: 'chip-ember',
//     high: 'chip-gold',
//     medium: 'chip-steel',
//     low: 'chip-patina',
// };

const PRIORITY_CHIP = {
    low: { label: 'Low', background: 'var(--patina-tint)', color: 'var(--patina-tint-text)' },
    medium: { label: 'Medium', background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
    high: { label: 'High', background: 'var(--ember-tint)', color: 'var(--ember-tint-text)' },
    urgent: { label: 'Urgent', background: 'var(--red-tint)', color: 'var(--red-tint-text)' },
};

const UserDashboard = () => {
    return (
        <div className="dashboard-home" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dash-gap-lg)' }}>
            {/* ---- Row 1: Flint briefing + KPI grid ---- */}

            {/* //FLINT BRIEFING */}
            <div className="dash-row-top">
                <div className="flint-card-border">
                    <div className="flint-card-inner">
                        <div className="flint-header-row">
                            <div className="flint-brand-row">
                                <span className="flint-mark">
                                    <AnimatedLogo animateOnView />
                                </span>
                                <div>
                                    Flint Briefing
                                </div>
                            </div>
                            <span className="flint-date-label">Wed &middot; Dec 11</span>
                        </div>

                        <p className="flint-greeting">
                            Good morning, <span className="flint-name">John</span>. Here&apos;s
                            what needs your attention.
                        </p>

                        <div className="flint-items-list">
                            {FLINT_ITEMS.map((item, i) => (
                                <div className="flint-item-row" key={i}>
                                    <span className={`flint-item-dot ${item.tone}`} />
                                    <div className="flint-item-text">{item.content}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flint-footer-row">
                            <span className="flint-live-indicator">
                                <span className="flint-live-dot" />
                                Live &middot; updated 4m ago
                            </span>
                            <a href="#" className="flint-view-link">
                                View full briefing
                                <ArrowRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="dash-kpi-grid">
                    {KPI_CARDS.map((kpi) => (
                        <div className="kpi-card" key={kpi.label}>
                            <span className="kpi-card-accent" style={{ background: kpi.accent }} />
                            <div className="kpi-card-label">
                                {kpi.label}
                                <span className="kpi-card-label-dot" style={{ background: kpi.accent }} />
                            </div>
                            <div className="kpi-card-value" style={{ color: kpi.valueColor }}>
                                {kpi.value}
                            </div>
                            <div className={`kpi-card-visual${kpi.visualArea ? ' kpi-card-visual--area' : ''}`}>
                                {kpi.visual}
                            </div>
                            <div className="kpi-card-footer">
                                <span>vs last week</span>
                                <span className="kpi-card-delta" style={{ color: kpi.accent }}>
                                    {kpi.delta}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---- Row 2: Focus Today ---- */}
            <div className="dash-hero-card">
                <div className="dash-hero-header">
                    <div className="dash-hero-title-row">
                        <span className="dash-hero-title-mark" />
                        Focus Today
                        <span className="dash-hero-count-badge">5 tasks</span>
                    </div>
                    <a href="#" className="dash-view-all-link">
                        View all &rarr;
                    </a>
                </div>

                <ul className="dash-task-list">
                    {FOCUS_TASKS.map((task) => {
                        const style = PRIORITY_CHIP[task?.priority];

                        return (
                            <li className="dash-task-row" key={task.title}>
                                <button className="dash-task-checkbox" type="button" aria-label={`Mark ${task.title} complete`} />
                                <span className="dash-task-title">{task.title}</span>

                                <StatusChip
                                    label={style?.label}
                                    background={style?.background}
                                    color={style?.color}
                                />

                                <span className="dash-task-project-tag">{task.project}</span>
                                <span className={`dash-task-due${task.overdue ? ' overdue' : ''}`}>
                                    {task.due}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ---- Row 3: Activity + Overdue ---- */}
            <div className="dash-bottom-grid">
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">Recent Activity</div>
                        <a href="#" className="dash-view-all-link">
                            View all &rarr;
                        </a>
                    </div>
                    <ul className="dash-activity-list">
                        {ACTIVITY_ITEMS.map((item, i) => (
                            <li className="dash-activity-row" key={i}>
                                <span className="dash-activity-avatar" style={{ background: item.gradient }}>
                                    {item.initials}
                                </span>
                                <span className="dash-activity-text">
                                    <strong>{item.who}</strong> {item.verb} <em>&quot;{item.target}&quot;</em>
                                </span>
                                <span className="dash-activity-time">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* //OVERDUE */}
                <div className="dash-panel dash-overdue-panel">
                    <div className="dash-overdue-panel-header">
                        <div className="dash-overdue-panel-title ">
                            Overdue
                            <span className="dash-panel-count">3</span>
                        </div>
                        <a href="#" className="dash-view-all-link">
                            View all &rarr;
                        </a>
                    </div>
                    <ul className="dash-overdue-list">
                        {OVERDUE_ITEMS.map((item) => (
                            <li className="dash-overdue-row" key={item.title}>
                                <span className="dash-overdue-info">
                                    <span className="dash-overdue-title">{item.title}</span>
                                    <span className="dash-overdue-meta">{item.meta}</span>
                                </span>
                                <span className="dash-overdue-badge">{item.badge}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;