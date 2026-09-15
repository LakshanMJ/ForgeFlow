'use client';

// import '@/app/dashboard/dashboard-home.css';
// import '@/app/dashboard/team-operations.css';

const OPS_KPI_CARDS = [
    {
        label: 'Active Projects',
        value: 12,
        accent: 'var(--text-tertiary)',
        delta: '▲ 2',
        deltaColor: 'var(--text-tertiary)',
        footerLabel: 'vs last week',
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
        deltaColor: 'var(--steel)',
        footerLabel: 'vs last month',
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
        accent: 'var(--ember)',
        delta: '▼ 2',
        deltaColor: 'var(--patina)',
        footerLabel: 'vs last week',
        valueColor: 'var(--ember)',
        visual: (
            <svg width="80" height="34" viewBox="0 0 80 34">
                <rect x="0" y="14" width="7" height="20" rx="2" fill="var(--ember)" opacity="0.5" />
                <rect x="11" y="8" width="7" height="26" rx="2" fill="var(--ember)" opacity="0.75" />
                <rect x="22" y="2" width="7" height="32" rx="2" fill="var(--ember)" opacity="0.95" />
                <rect x="33" y="5" width="7" height="29" rx="2" fill="var(--ember)" opacity="0.85" />
                <rect x="44" y="12" width="7" height="22" rx="2" fill="var(--ember)" opacity="0.6" />
                <rect x="55" y="18" width="7" height="16" rx="2" fill="var(--ember)" opacity="0.4" />
                <rect x="66" y="22" width="7" height="12" rx="2" fill="var(--ember)" opacity="0.3" />
            </svg>
        ),
    },
    {
        label: 'On Track',
        value: '87%',
        accent: 'var(--patina)',
        delta: '▲ 5%',
        deltaColor: 'var(--patina)',
        footerLabel: 'of active projects',
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

const WORKLOAD = [
    { initials: 'P', name: 'Paulie', pct: 87, count: 7, gradient: 'linear-gradient(90deg, var(--ember), var(--gold))', avatarGradient: 'linear-gradient(135deg, var(--ember), var(--ember-tint-text))' },
    { initials: 'S', name: 'Sarah', pct: 62, count: 5, gradient: 'linear-gradient(90deg, var(--gold), var(--gold-tint-text))', avatarGradient: 'linear-gradient(135deg, var(--gold), var(--gold-tint-text))' },
    { initials: 'E', name: 'Emma', pct: 62, count: 5, gradient: 'linear-gradient(90deg, var(--steel), var(--steel-tint-text))', avatarGradient: 'linear-gradient(135deg, var(--steel), var(--steel-tint-text))' },
    { initials: 'M', name: 'Mike', pct: 37, count: 3, gradient: 'linear-gradient(90deg, var(--patina), var(--patina-tint-text))', avatarGradient: 'linear-gradient(135deg, var(--patina), var(--patina-tint-text))' },
];

const DONUT_SEGMENTS = [
    { label: 'Critical', count: 8, pct: 29, color: 'var(--ember)', dasharray: '107.71 269.28', dashoffset: '0' },
    { label: 'High', count: 10, pct: 36, color: 'var(--gold)', dasharray: '134.64 242.35', dashoffset: '-107.71' },
    { label: 'Medium', count: 7, pct: 25, color: 'var(--steel)', dasharray: '94.25 282.74', dashoffset: '-242.35' },
    { label: 'Low', count: 3, pct: 11, color: 'var(--patina)', dasharray: '40.39 336.6', dashoffset: '-336.6' },
];

const PROJECT_HEALTH = [
    { name: 'Acme Platform', pct: 72, color: 'var(--patina)', gradient: 'linear-gradient(90deg, var(--patina), var(--patina-tint-text))' },
    { name: 'Beta Rewrite', pct: 45, color: 'var(--gold)', gradient: 'linear-gradient(90deg, var(--gold), var(--gold-tint-text))' },
    { name: 'Gamma Mobile', pct: 90, color: 'var(--patina)', gradient: 'linear-gradient(90deg, var(--patina), var(--patina-tint-text))' },
    { name: 'Delta Infra', pct: 12, color: 'var(--ember)', gradient: 'linear-gradient(90deg, var(--ember), var(--gold))' },
];

type Priority = 'critical' | 'high' | 'medium' | 'low';
const PRIORITY_CHIP: Record<Priority, string> = {
    critical: 'chip-ember',
    high: 'chip-gold',
    medium: 'chip-steel',
    low: 'chip-patina',
};

const DEADLINES: {
    date: string;
    dateColor?: string;
    title: string;
    project: string;
    owner: string;
    ownerInitial: string;
    ownerGradient: string;
    priority: Priority;
}[] = [
        { date: 'Dec 12', dateColor: 'var(--ember)', title: 'Payment API Integration', project: 'acme', owner: 'Paulie', ownerInitial: 'P', ownerGradient: 'linear-gradient(135deg, var(--ember), var(--ember-tint-text))', priority: 'critical' },
        { date: 'Dec 15', dateColor: 'var(--gold)', title: 'User Authentication', project: 'acme', owner: 'Mike', ownerInitial: 'M', ownerGradient: 'linear-gradient(135deg, var(--patina), var(--patina-tint-text))', priority: 'high' },
        { date: 'Dec 18', title: 'Dashboard Redesign', project: 'acme', owner: 'Sarah', ownerInitial: 'S', ownerGradient: 'linear-gradient(135deg, var(--gold), var(--gold-tint-text))', priority: 'high' },
        { date: 'Dec 20', title: 'Database Migration', project: 'beta', owner: 'Paulie', ownerInitial: 'P', ownerGradient: 'linear-gradient(135deg, var(--ember), var(--ember-tint-text))', priority: 'medium' },
        { date: 'Dec 22', title: 'API Documentation', project: 'beta', owner: 'Emma', ownerInitial: 'E', ownerGradient: 'linear-gradient(135deg, var(--steel), var(--steel-tint-text))', priority: 'medium' },
    ];

const ProjectManagerDashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dash-gap-lg)' }}>
            <div className="ops-section-marker">
                <span className="ops-marker-label">Section B</span>
                <span className="ops-marker-line" />
                <span className="ops-marker-badge">Team Operations</span>
            </div>

            {/* ---- Ops KPI strip ---- */}
            <div className="ops-kpi-strip">
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
                            <span>{kpi.footerLabel}</span>
                            <span className="kpi-card-delta" style={{ color: kpi.deltaColor }}>
                                {kpi.delta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---- Ops grid: Workload / Donut / Health ---- */}
            <div className="ops-grid">
                {/* Team Workload */}
                <div className="ops-panel">
                    <div className="ops-panel-header">
                        <div className="ops-panel-title">Team Workload</div>
                        <span className="ops-panel-count">20</span>
                    </div>
                    <ul className="ops-workload-list">
                        {WORKLOAD.map((m) => (
                            <li className="ops-workload-row" key={m.name}>
                                <div className="ops-workload-member">
                                    <span className="ops-workload-avatar" style={{ background: m.avatarGradient }}>
                                        {m.initials}
                                    </span>
                                    <span className="ops-workload-name">{m.name}</span>
                                </div>
                                <div className="ops-workload-bar">
                                    <div
                                        className="ops-workload-fill"
                                        style={{ width: `${m.pct}%`, background: m.gradient }}
                                    />
                                </div>
                                <span className="ops-workload-count">{m.count}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="ops-workload-footer">
                        <span>4 members</span>
                        <span>avg 5.0 tasks</span>
                    </div>
                </div>

                {/* Task Distribution donut */}
                <div className="ops-panel">
                    <div className="ops-panel-header">
                        <div className="ops-panel-title">Task Distribution</div>
                        <span className="ops-panel-count">28</span>
                    </div>
                    <div className="ops-donut-wrap">
                        <div className="ops-donut-svg">
                            <svg viewBox="0 0 160 160">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    fill="none"
                                    stroke="var(--surface-3)"
                                    strokeWidth="16"
                                />
                                {DONUT_SEGMENTS.map((seg) => (
                                    <circle
                                        key={seg.label}
                                        cx="80"
                                        cy="80"
                                        r="60"
                                        fill="none"
                                        stroke={seg.color}
                                        strokeWidth="16"
                                        strokeDasharray={seg.dasharray}
                                        strokeDashoffset={seg.dashoffset}
                                    />
                                ))}
                            </svg>
                            <div className="ops-donut-center">
                                <div className="ops-donut-center-value">28</div>
                                <div className="ops-donut-center-label">Tasks</div>
                            </div>
                        </div>

                        <div className="ops-donut-legend">
                            {DONUT_SEGMENTS.map((seg) => (
                                <div className="ops-donut-legend-row" key={seg.label}>
                                    <span className="ops-donut-legend-dot" style={{ background: seg.color }} />
                                    <span className="ops-donut-legend-label">{seg.label}</span>
                                    <span className="ops-donut-legend-count">{seg.count}</span>
                                    <span className="ops-donut-legend-pct">{seg.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Project Health */}
                <div className="ops-panel">
                    <div className="ops-panel-header">
                        <div className="ops-panel-title">Project Health</div>
                        <a href="#" className="ops-panel-link">
                            View all &rarr;
                        </a>
                    </div>
                    <ul className="ops-health-list">
                        {PROJECT_HEALTH.map((p) => (
                            <li className="ops-health-row" key={p.name}>
                                <div className="ops-health-info">
                                    <span className="ops-health-name">{p.name}</span>
                                    <div className="ops-health-bar">
                                        <div
                                            className="ops-health-fill"
                                            style={{ width: `${p.pct}%`, background: p.gradient }}
                                        />
                                    </div>
                                </div>
                                <span className="ops-health-pct" style={{ color: p.color }}>
                                    {p.pct}%
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="ops-health-footer">
                        <span>4 active</span>
                        <span>avg 55%</span>
                    </div>
                </div>
            </div>

            {/* ---- Upcoming Deadlines ---- */}
            <div className="ops-panel">
                <div className="ops-panel-header">
                    <div className="ops-panel-title">
                        Upcoming Deadlines
                        <span className="ops-panel-count">5</span>
                    </div>
                    <a href="#" className="ops-panel-link">
                        View all &rarr;
                    </a>
                </div>
                <ul className="ops-deadline-list">
                    {DEADLINES.map((d) => (
                        <li className="ops-deadline-row" key={d.title}>
                            <span className="ops-deadline-date" style={{ color: d.dateColor }}>
                                {d.date}
                            </span>
                            <span className="ops-deadline-title">{d.title}</span>
                            <span className="ops-deadline-project">{d.project}</span>
                            <span className="ops-deadline-owner">
                                <span className="ops-deadline-avatar" style={{ background: d.ownerGradient }}>
                                    {d.ownerInitial}
                                </span>
                                {d.owner}
                            </span>
                            <span className={`chip chip-dot ${PRIORITY_CHIP[d.priority]}`}>
                                {d.priority.charAt(0).toUpperCase() + d.priority.slice(1)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProjectManagerDashboard;