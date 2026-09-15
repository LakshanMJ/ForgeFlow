import StatusChip from '@/shared/components/StatusChip';

/* ---------------------------------------------------------------------- */
/*  Data                                                                    */
/*  Mirrors the shape/spirit of the reference "Section C — Business        */
/*  Health" mock, but reuses the same semantic color tokens already        */
/*  established in ProjectManagerDashboard (red = critical, gold = high,   */
/*  steel = medium/info, patina = low/success).                            */
/* ---------------------------------------------------------------------- */

type DeltaTone = 'good' | 'bad' | 'neutral';

const DELTA_COLOR: Record<DeltaTone, string> = {
    good: 'var(--patina)',
    bad: 'var(--red)',
    neutral: 'var(--text-tertiary)',
};

const EXEC_KPI_CARDS = [
    {
        label: 'Throughput',
        value: '1,247',
        unit: 'tasks',
        accent: 'var(--patina)',
        valueColor: undefined as string | undefined,
        delta: '▲ 18%',
        deltaTone: 'good' as DeltaTone,
        deltaLabel: 'this quarter',
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,18 12,16 24,15 36,12 48,10 60,7 72,5"
                    fill="none"
                    stroke="var(--patina)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        label: 'Execution Rate',
        value: '94.2%',
        unit: undefined as string | undefined,
        accent: 'var(--steel)',
        valueColor: 'var(--steel)',
        delta: '▲ 3.1%',
        deltaTone: 'good' as DeltaTone,
        deltaLabel: 'on-time delivery',
        visual: (
            <svg width="72" height="24" viewBox="0 0 72 24">
                <polyline
                    points="0,14 12,13 24,12 36,10 48,9 60,8 72,7"
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
        label: 'Velocity',
        value: '147',
        unit: '/wk',
        accent: 'var(--red)',
        valueColor: undefined as string | undefined,
        delta: '▼ 4%',
        deltaTone: 'bad' as DeltaTone,
        deltaLabel: '8-week average',
        visual: (
            <svg width="80" height="34" viewBox="0 0 80 34">
                <rect x="0" y="18" width="7" height="16" rx="2" fill="var(--gold)" opacity="0.5" />
                <rect x="11" y="14" width="7" height="20" rx="2" fill="var(--gold)" opacity="0.65" />
                <rect x="22" y="10" width="7" height="24" rx="2" fill="var(--gold)" opacity="0.75" />
                <rect x="33" y="6" width="7" height="28" rx="2" fill="var(--gold)" opacity="0.9" />
                <rect x="44" y="4" width="7" height="30" rx="2" fill="var(--gold)" opacity="1" />
                <rect x="55" y="8" width="7" height="26" rx="2" fill="var(--gold)" opacity="0.7" />
                <rect x="66" y="12" width="7" height="22" rx="2" fill="var(--gold)" opacity="0.55" />
            </svg>
        ),
    },
    {
        label: 'Capacity Balance',
        value: '87%',
        unit: undefined as string | undefined,
        accent: 'var(--text-tertiary)',
        valueColor: undefined as string | undefined,
        delta: '▲ 2%',
        deltaTone: 'good' as DeltaTone,
        deltaLabel: 'org utilization · healthy',
        visualArea: true,
        visual: (
            <svg width="90" height="34" viewBox="0 0 90 34">
                <defs>
                    <linearGradient id="capacityAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--text-tertiary)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--text-tertiary)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0,18 L 15,16 L 30,14 L 45,12 L 60,12 L 75,10 L 90,10 L 90,34 L 0,34 Z"
                    fill="url(#capacityAreaGradient)"
                />
                <polyline
                    points="0,18 15,16 30,14 45,12 60,12 75,10 90,10"
                    fill="none"
                    stroke="var(--text-tertiary)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

const VELOCITY_WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const VELOCITY_POINTS = [
    { x: 0, y: 175 },
    { x: 85, y: 155 },
    { x: 170, y: 165 },
    { x: 255, y: 120 },
    { x: 340, y: 130 },
    { x: 425, y: 90 },
    { x: 510, y: 70 },
    { x: 600, y: 45 },
];
const VELOCITY_LINE_PATH = VELOCITY_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
const VELOCITY_AREA_PATH = `${VELOCITY_LINE_PATH} L 600,220 L 0,220 Z`;

const VELOCITY_STATS = [
    { label: 'Current', value: '162 /wk' },
    { label: '8-week avg', value: '147 /wk' },
    { label: 'Trend', value: '▲ 42%', note: 'vs W1', color: 'var(--patina)' },
];

const UTILIZATION_ITEMS = [
    { name: 'Engineering', pct: 92, color: 'var(--red)' },
    { name: 'Design', pct: 68, color: 'var(--patina)' },
    { name: 'QA', pct: 45, color: 'var(--steel)' },
    { name: 'DevOps', pct: 78, color: 'var(--gold)' },
];

type RiskSeverity = 'high' | 'medium';

const RISK_SEVERITY_STYLE: Record<RiskSeverity, { label: string; background: string; color: string }> = {
    high: { label: 'High', background: 'var(--red-tint)', color: 'var(--red-tint-text)' },
    medium: { label: 'Medium', background: 'var(--gold-tint)', color: 'var(--gold-tint-text)' },
};

const RISKS: { text: React.ReactNode; severity: RiskSeverity }[] = [
    { text: <><strong>3 projects</strong> trending at risk</>, severity: 'high' },
    { text: <><strong>8 tasks</strong> unassigned &gt; 5 days</>, severity: 'medium' },
    { text: <><strong>Engineering</strong> at 92% capacity</>, severity: 'medium' },
    { text: <><strong>2 milestones</strong> past due</>, severity: 'high' },
];

const GAUGES = [
    {
        label: 'On-Time Delivery',
        value: '94%',
        unit: undefined as string | undefined,
        color: 'var(--patina)',
        sub: 'tasks closed on schedule',
        pct: 94,
        note: '▲ 3% vs last month',
    },
    {
        label: 'Avg Cycle Time',
        value: '3.4',
        unit: 'days',
        color: 'var(--steel)',
        sub: 'task open → done',
        pct: 62,
        note: '▼ 0.6 days faster',
    },
    {
        label: 'Backlog Growth',
        value: '+12',
        unit: undefined as string | undefined,
        color: 'var(--gold)',
        sub: 'net new this week',
        pct: 42,
        note: '▲ growing backlog',
    },
];

const StakeholderDashboard = () => {
    return (
        <div className="dashboard-home" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dash-gap-lg)' }}>

            {/* ---- Row 1: Exec KPI strip ---- */}
            <div className="sd-kpi-strip">
                {EXEC_KPI_CARDS.map((kpi) => (
                    <div className="kpi-card" key={kpi.label}>
                        <span className="kpi-card-accent" style={{ background: kpi.accent }} />
                        <div className="kpi-card-label">
                            {kpi.label}
                            <span className="kpi-card-label-dot" style={{ background: kpi.accent }} />
                        </div>
                        <div className="kpi-card-value" style={{ color: kpi.valueColor }}>
                            {kpi.value}
                            {kpi.unit && <span className="sd-kpi-value-unit">{kpi.unit}</span>}
                        </div>
                        <div className={`kpi-card-visual${kpi.visualArea ? ' kpi-card-visual--area' : ''}`}>
                            {kpi.visual}
                        </div>
                        <div className="kpi-card-footer">
                            <span>{kpi.deltaLabel}</span>
                            <span className="kpi-card-delta" style={{ color: DELTA_COLOR[kpi.deltaTone] }}>
                                {kpi.delta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ---- Row 2: Delivery Velocity / Team Utilization ---- */}
            <div className="dash-row-top">

                {/* DELIVERY VELOCITY */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">
                            Delivery Velocity
                            <span className="dash-panel-count">8 WEEKS</span>
                        </div>
                        <a href="#" className="dash-view-all-link">
                            Full report &rarr;
                        </a>
                    </div>
                    <div className="sd-line-chart-wrap">
                        <svg className="sd-line-chart-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="velocityFill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.28" />
                                    <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            <line x1="0" y1="55" x2="600" y2="55" stroke="var(--border)" strokeDasharray="2 4" />
                            <line x1="0" y1="110" x2="600" y2="110" stroke="var(--border)" strokeDasharray="2 4" />
                            <line x1="0" y1="165" x2="600" y2="165" stroke="var(--border)" strokeDasharray="2 4" />

                            <path d={VELOCITY_AREA_PATH} fill="url(#velocityFill)" />
                            <path
                                d={VELOCITY_LINE_PATH}
                                fill="none"
                                stroke="var(--ember)"
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />

                            {VELOCITY_POINTS.map((p, i) => (
                                <circle
                                    key={`${p.x}-${p.y}`}
                                    cx={p.x}
                                    cy={p.y}
                                    r={i === VELOCITY_POINTS.length - 1 ? 5 : 3.5}
                                    fill="var(--ember)"
                                />
                            ))}
                        </svg>
                        <div className="sd-line-chart-labels">
                            {VELOCITY_WEEKS.map((week) => (
                                <span key={week}>{week}</span>
                            ))}
                        </div>
                    </div>
                    <div className="sd-chart-stats">
                        {VELOCITY_STATS.map((stat) => (
                            <div className="sd-chart-stat" key={stat.label}>
                                <span className="sd-chart-stat-label">{stat.label}</span>
                                <span className="sd-chart-stat-value" style={{ color: stat.color }}>
                                    {stat.value}
                                    {stat.note && <span className="sd-chart-stat-note">{stat.note}</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TEAM UTILIZATION */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">
                            Team Utilization
                            <span className="dash-panel-count">THIS WEEK</span>
                        </div>
                    </div>
                    <div className="sd-utilization-wrap">
                        {UTILIZATION_ITEMS.map((item) => (
                            <div className="sd-utilization-row" key={item.name}>
                                <div className="sd-utilization-header">
                                    <span className="sd-utilization-name">{item.name}</span>
                                    <span className="sd-utilization-value" style={{ color: item.color }}>
                                        {item.pct}%
                                    </span>
                                </div>
                                <div className="sd-utilization-bar">
                                    <div
                                        className="sd-utilization-fill"
                                        style={{ width: `${item.pct}%`, background: item.color }}
                                    >
                                        {item.pct}%
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="sd-utilization-legend">
                            <span>
                                <span className="sd-utilization-legend-dot" style={{ background: 'var(--patina)' }} />
                                60–85% ideal
                            </span>
                            <span>
                                <span className="sd-utilization-legend-dot" style={{ background: 'var(--red)' }} />
                                &gt; 90% overload
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* ---- Row 3: Risks / Gauges ---- */}
            <div className="sd-risk-gauge-row">

                {/* RISKS */}
                <div className="dash-panel">
                    <div className="dash-panel-header">
                        <div className="dash-panel-title">
                            Risks
                            <span className="dash-panel-count">{RISKS.length} ACTIVE</span>
                        </div>
                        <a href="#" className="dash-view-all-link">
                            View all &rarr;
                        </a>
                    </div>
                    <ul className="sd-risk-list">
                        {RISKS.map((risk, i) => {
                            const style = RISK_SEVERITY_STYLE[risk.severity];
                            return (
                                <li className="sd-risk-row" key={i}>
                                    <div
                                        className="sd-risk-icon"
                                        style={{ background: style.background, color: style.color }}
                                    >
                                        !
                                    </div>
                                    <div className="sd-risk-text">{risk.text}</div>
                                    <StatusChip label={style.label} background={style.background} color={style.color} />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* GAUGES */}
                <div className="sd-gauge-row">
                    {GAUGES.map((gauge) => (
                        <div className="sd-gauge-panel" key={gauge.label}>
                            <div className="sd-gauge-label">{gauge.label}</div>
                            <div className="sd-gauge-value" style={{ color: gauge.color }}>
                                {gauge.value}
                                {gauge.unit && <span className="sd-gauge-value-unit">{gauge.unit}</span>}
                            </div>
                            <div className="sd-gauge-sub">{gauge.sub}</div>
                            <div className="sd-gauge-track">
                                <div
                                    className="sd-gauge-fill"
                                    style={{ width: `${gauge.pct}%`, background: gauge.color }}
                                />
                            </div>
                            <div className="sd-gauge-sub">{gauge.note}</div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default StakeholderDashboard;
