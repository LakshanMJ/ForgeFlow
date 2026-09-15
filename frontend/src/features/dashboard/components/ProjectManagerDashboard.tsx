import StatusChip from '@/shared/components/StatusChip';
import { ArrowRight } from 'lucide-react';

/* ---------------------------------------------------------------------- */
/*  Data                                                                    */
/*  Mirrors the shape/spirit of the reference "Section B — Team            */
/*  Operations" mock, but reuses the same semantic color tokens already    */
/*  established in UserDashboard (red = critical, gold = high,             */
/*  steel = medium/info, patina = low/success).                            */
/* ---------------------------------------------------------------------- */

type Priority = 'critical' | 'high' | 'medium' | 'low';

const PRIORITY_STYLE: Record<Priority, { label: string; background: string; color: string }> = {
    critical: { label: 'Critical', background: 'var(--red-tint)', color: 'var(--red-tint-text)' },
    high: { label: 'High', background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
    medium: { label: 'Medium', background: 'var(--steel-tint)', color: 'var(--steel-tint-text)' },
    low: { label: 'Low', background: 'var(--patina-tint)', color: 'var(--patina-tint-text)' },
};

const OPS_KPI_CARDS = [
    {
        label: 'Active Projects',
        value: 12,
        accent: 'var(--text-tertiary)',
        delta: '▲ 2',
        deltaLabel: 'vs last week',
        valueColor: undefined,
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,17 12,15 24,16 36,13 48,11 60,9 72,7"
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
        label: 'Team Members',
        value: 8,
        accent: 'var(--steel)',
        delta: '▲ 1',
        deltaLabel: 'vs last month',
        valueColor: undefined,
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,18 12,18 24,16 36,16 48,14 60,13 72,12"
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
        value: 7,
        accent: 'var(--red)',
        delta: '▼ 2',
        deltaLabel: 'vs last week',
        valueColor: 'var(--red)',
        visual: (
            <svg width="80" height="34" viewBox="0 0 80 34">
                <rect x="0" y="14" width="7" height="20" rx="2" fill="var(--red)" opacity="0.5" />
                <rect x="11" y="8" width="7" height="26" rx="2" fill="var(--red)" opacity="0.75" />
                <rect x="22" y="2" width="7" height="32" rx="2" fill="var(--red)" opacity="0.95" />
                <rect x="33" y="5" width="7" height="29" rx="2" fill="var(--red)" opacity="0.85" />
                <rect x="44" y="12" width="7" height="22" rx="2" fill="var(--red)" opacity="0.6" />
                <rect x="55" y="18" width="7" height="16" rx="2" fill="var(--red)" opacity="0.4" />
                <rect x="66" y="22" width="7" height="12" rx="2" fill="var(--red)" opacity="0.3" />
            </svg>
        ),
    },
    {
        label: 'On Track',
        value: '87%',
        accent: 'var(--patina)',
        delta: '▲ 5%',
        deltaLabel: 'of active projects',
        valueColor: 'var(--patina)',
        visualArea: true,
        visual: (
            <svg width="90" height="34" viewBox="0 0 90 34">
                <defs>
                    <linearGradient id="onTrackAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--patina)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--patina)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0,22 L 15,20 L 30,18 L 45,16 L 60,12 L 75,10 L 90,8 L 90,34 L 0,34 Z"
                    fill="url(#onTrackAreaGradient)"
                />
                <polyline
                    points="0,22 15,20 30,18 45,16 60,12 75,10 90,8"
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

const WORKLOAD_ITEMS = [
    { name: 'Paulie', initials: 'P', color: 'var(--red)', tintText: 'var(--red-tint-text)', pct: 87, count: 7 },
    { name: 'Sarah', initials: 'S', color: 'var(--gold)', tintText: 'var(--gold-tint-text)', pct: 62, count: 5 },
    { name: 'Emma', initials: 'E', color: 'var(--steel)', tintText: 'var(--steel-tint-text)', pct: 62, count: 5 },
    { name: 'Mike', initials: 'M', color: 'var(--patina)', tintText: 'var(--patina-tint-text)', pct: 37, count: 3 },
    { name: 'Mike', initials: 'M', color: 'var(--patina)', tintText: 'var(--patina-tint-text)', pct: 37, count: 3 },
    { name: 'Mike', initials: 'M', color: 'var(--patina)', tintText: 'var(--patina-tint-text)', pct: 37, count: 3 },
    { name: 'Mike', initials: 'M', color: 'var(--patina)', tintText: 'var(--patina-tint-text)', pct: 37, count: 3 },
    
];

const TASK_DISTRIBUTION = [
    { label: 'Critical', color: 'var(--red)', count: 8 },
    { label: 'High', color: 'var(--gold)', count: 10 },
    { label: 'Medium', color: 'var(--steel)', count: 7 },
    { label: 'Low', color: 'var(--patina)', count: 3 },
];

const TASK_TOTAL = TASK_DISTRIBUTION.reduce((sum, item) => sum + item.count, 0);

// Precompute donut segment geometry (r = 60 → circumference ≈ 376.99)
const DONUT_RADIUS = 60;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
let donutOffsetAcc = 0;
const DONUT_SEGMENTS = TASK_DISTRIBUTION.map((item) => {
    const length = (item.count / TASK_TOTAL) * DONUT_CIRCUMFERENCE;
    const segment = {
        ...item,
        dasharray: `${length.toFixed(2)} ${(DONUT_CIRCUMFERENCE - length).toFixed(2)}`,
        dashoffset: -donutOffsetAcc,
        pct: Math.round((item.count / TASK_TOTAL) * 100),
    };
    donutOffsetAcc += length;
    return segment;
});

const PROJECT_HEALTH = [
    { name: 'Acme Platform', pct: 72, color: 'var(--patina)' },
    { name: 'Beta Rewrite', pct: 45, color: 'var(--gold)' },
    { name: 'Gamma Mobile', pct: 90, color: 'var(--patina)' },
    { name: 'Delta Infra', pct: 12, color: 'var(--red)' },
    { name: 'Delta Infra', pct: 12, color: 'var(--red)' },
    { name: 'Delta Infra', pct: 12, color: 'var(--red)' },
];

const UPCOMING_DEADLINES: {
    title: string;
    priority: Priority;
    project: string;
    owner: string;
    initials: string;
    color: string;
    date: string;
    dateColor?: string;
}[] = [
        { title: 'Payment API Integration', priority: 'critical', project: 'acme', owner: 'Lex Luthor', initials: 'P', color: 'var(--red)', date: 'Dec 12', dateColor: 'var(--red)' },
        { title: 'User Authentication', priority: 'high', project: 'acme', owner: 'Mike Shinoda', initials: 'M', color: 'var(--patina)', date: 'Dec 15', dateColor: 'var(--gold)' },
        { title: 'Dashboard Redesign', priority: 'high', project: 'acme', owner: 'Sarah Connor', initials: 'S', color: 'var(--gold)', date: 'Dec 18' },
        { title: 'Database Migration', priority: 'medium', project: 'beta', owner: 'Paulie Walnuts', initials: 'P', color: 'var(--red)', date: 'Dec 20' },
        { title: 'API Documentation', priority: 'medium', project: 'beta', owner: 'Howard Stark', initials: 'E', color: 'var(--steel)', date: 'Dec 22' },
    ];

const ProjectManagerDashboard = () => {
    return (
        <div className="dashboard-home" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dash-gap-lg)' }}>

            {/* ---- Row 1: Ops KPI strip ---- */}
            <div className="pm-kpi-strip">
                {OPS_KPI_CARDS.map((kpi) => (
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
                            <span>{kpi.deltaLabel}</span>
                            <span className="kpi-card-delta" style={{ color: kpi.accent }}>
                                {kpi.delta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---- Row 2: Team Workload / Task Distribution / Project Health ---- */}
            <div className="pm-ops-grid">

                {/* TEAM WORKLOAD */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">Team Workload</div>
                        <span className="dash-panel-count">{WORKLOAD_ITEMS.reduce((s, w) => s + w.count, 0)}</span>
                    </div>
                    <ul className="pm-workload-list">   
                        {WORKLOAD_ITEMS.map((member) => (
                            <li className="pm-workload-row" key={member.name}>
                                <div className="pm-workload-member">
                                    <span
                                        className="pm-workload-avatar"
                                        style={{ background: `linear-gradient(135deg, ${member.color}, ${member.tintText})` }}
                                    >
                                        {member.initials}
                                    </span>
                                    <span className="pm-workload-name">{member.name}</span>
                                </div>
                                <div className="pm-workload-bar">
                                    <div
                                        className="pm-workload-fill"
                                        style={{ width: `${member.pct}%`, background: member.color }}
                                    />
                                </div>
                                <span className="pm-workload-count">{member.count}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pm-panel-footer">
                        <span>{WORKLOAD_ITEMS.length} members</span>
                        <span>
                            avg {(WORKLOAD_ITEMS.reduce((s, w) => s + w.count, 0) / WORKLOAD_ITEMS.length).toFixed(1)} tasks
                        </span>
                    </div>
                </div>

                {/* TASK DISTRIBUTION — DONUT */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">Task Distribution</div>
                        <span className="dash-panel-count">{TASK_TOTAL}</span>
                    </div>
                    <div className="pm-donut-wrap">
                        <div className="pm-donut-svg">
                            <svg viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r={DONUT_RADIUS} fill="none" stroke="var(--surface-3)" strokeWidth="16" />
                                {DONUT_SEGMENTS.map((seg) => (
                                    <circle
                                        key={seg.label}
                                        cx="80"
                                        cy="80"
                                        r={DONUT_RADIUS}
                                        fill="none"
                                        stroke={seg.color}
                                        strokeWidth="16"
                                        strokeDasharray={seg.dasharray}
                                        strokeDashoffset={seg.dashoffset}
                                    />
                                ))}
                            </svg>
                            <div className="pm-donut-center">
                                <div className="pm-donut-center-value">{TASK_TOTAL}</div>
                                <div className="pm-donut-center-label">Tasks</div>
                            </div>
                        </div>
                        <div className="pm-donut-legend">
                            {DONUT_SEGMENTS.map((seg) => (
                                <div className="pm-donut-legend-row" key={seg.label}>
                                    <span className="pm-donut-legend-dot" style={{ background: seg.color }} />
                                    <span className="pm-donut-legend-label">{seg.label}</span>
                                    <span className="pm-donut-legend-count">{seg.count}</span>
                                    <span className="pm-donut-legend-pct">{seg.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PROJECT HEALTH */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">Project Health</div>
                        <a href="#" className="dash-view-all-link">
                            View all &rarr;
                        </a>
                    </div>
                    <ul className="pm-health-list">
                        {PROJECT_HEALTH.map((project) => (
                            <li className="pm-health-row" key={project.name}>
                                <div className="pm-health-info">
                                    <span className="pm-health-name">{project.name}</span>
                                    <div className="pm-health-bar">
                                        <div
                                            className="pm-health-fill"
                                            style={{ width: `${project.pct}%`, background: project.color }}
                                        />
                                    </div>
                                </div>
                                <span className="pm-health-pct" style={{ color: project.color }}>
                                    {project.pct}%
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="pm-panel-footer">
                        <span>{PROJECT_HEALTH.length} active</span>
                        <span>
                            avg {Math.round(PROJECT_HEALTH.reduce((s, p) => s + p.pct, 0) / PROJECT_HEALTH.length)}%
                        </span>
                    </div>
                </div>

            </div>

            {/* ---- Row 3: Upcoming Deadlines ---- */}
            <div className="dash-panel">
                <div className="dash-panel-header">
                    <div className="dash-panel-title">
                        Upcoming Deadlines
                        <span className="dash-panel-count">{UPCOMING_DEADLINES.length}</span>
                    </div>
                    <a href="#" className="dash-view-all-link">
                        View all &rarr;
                    </a>
                </div>
                <ul className="pm-deadline-list">
                    {UPCOMING_DEADLINES.map((item) => {
                        const style = PRIORITY_STYLE[item.priority];
                        return (
                            <li className="pm-deadline-row" key={item.title}>
                                <span className="pm-deadline-date" style={{ color: item.dateColor }}>
                                    {item.date}
                                </span>
                                <span className="pm-deadline-title">{item.title}</span>
                                <span className="pm-deadline-project">{item.project}</span>
                                <div className="pm-deadline-owner">
                                    <span className="pm-deadline-avatar" style={{ background: item.color }}>
                                        {item.initials}
                                    </span>
                                    {item.owner}
                                </div>
                                <StatusChip label={style.label} background={style.background} color={style.color} />
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
};

export default ProjectManagerDashboard;
