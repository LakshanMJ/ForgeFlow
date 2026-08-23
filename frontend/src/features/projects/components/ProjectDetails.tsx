'use client';

import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  ArrowLeft,
  MoreVertical,
  Star,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Upload,
  UserPlus,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
} from 'lucide-react';
import MembersPanel from './MembersPanel';
import FilesPanel from './FilesPanel';
import TasksBoard from './TasksBoard';

const STAT_TILES = [
  { label: 'TOTAL TASKS', value: 216, accent: 'var(--steel)', kind: 'link' as const, linkText: 'View all tasks' },
  { label: 'COMPLETED', value: 156, accent: 'var(--patina)', kind: 'pct' as const, pct: 72 },
  { label: 'IN PROGRESS', value: 38, accent: 'var(--ember)', kind: 'pct' as const, pct: 18 },
  { label: 'PENDING', value: 22, accent: 'var(--gold)', kind: 'pct' as const, pct: 10 },
];

const MEMBERS = [
  { initials: 'WS', name: 'Wile Smith', role: 'Owner', badge: 'OWNER', chip: 'chip-patina', accent: 'var(--steel)' },
  { initials: 'SJ', name: 'Sarah Johnson', role: 'Project Manager', badge: 'ADMIN', chip: 'chip-steel', accent: 'var(--ember)' },
  { initials: 'MB', name: 'Mike Brown', role: 'Lead Developer', badge: 'MEMBER', chip: 'chip-neutral', accent: 'var(--gold)' },
  { initials: 'AT', name: 'Alex Turner', role: 'UI/UX Designer', badge: 'MEMBER', chip: 'chip-neutral', accent: 'var(--patina)' },
];
const EXTRA_MEMBER_INITIALS = ['PS', 'LW', 'JK', 'NR'];

const KEY_DATES = [
  { label: 'Project Start', date: 'Mar 18, 2025', state: 'done' as const },
  { label: 'Design Phase Complete', date: 'Apr 30, 2025', state: 'done' as const },
  { label: 'Development Phase Complete', date: 'Jun 10, 2025', state: 'current' as const },
  { label: 'Project Target Date', date: 'Jun 30, 2025', state: 'pending' as const },
];

const MILESTONES = [
  { label: 'Design System Implementation', date: 'Apr 30, 2025', state: 'done' as const },
  { label: 'Core Platform Development', date: 'Jun 10, 2025', state: 'current' as const },
  { label: 'User Acceptance Testing', date: 'Jun 20, 2025', state: 'pending' as const },
  { label: 'Project Launch', date: 'Jun 30, 2025', state: 'pending' as const },
];

const ACTIVITY = [
  {
    icon: CheckCircle2,
    iconBg: 'var(--patina)',
    initials: 'SJ',
    text: (
      <>
        <strong>Sarah Johnson</strong> completed task Design System Foundation
      </>
    ),
    time: '2h ago',
  },
  {
    icon: XCircle,
    iconBg: 'var(--ember)',
    initials: 'MB',
    text: (
      <>
        <strong>Mike Brown</strong> updated task API Integration Layer
      </>
    ),
    time: '4h ago',
  },
  {
    icon: MessageSquare,
    iconBg: 'var(--steel)',
    initials: 'PS',
    text: (
      <>
        <strong>Priya Shah</strong> commented on User Authentication Flow
      </>
    ),
    time: '6h ago',
  },
  {
    icon: Upload,
    iconBg: 'var(--gold)',
    initials: 'AT',
    text: (
      <>
        <strong>Alex Turner</strong> uploaded file Design-System-v2.fig
      </>
    ),
    time: '8h ago',
  },
  {
    icon: UserPlus,
    iconBg: 'var(--steel)',
    initials: 'LW',
    text: (
      <>
        <strong>Lisa Wong</strong> joined the project
      </>
    ),
    time: '1d ago',
  },
];

const TASK_STATUS = [
  { label: 'Completed', count: 156, pct: 72, color: 'var(--patina)' },
  { label: 'In Progress', count: 38, pct: 18, color: 'var(--ember)' },
  { label: 'Pending', count: 22, pct: 10, color: 'var(--gold)' },
  { label: 'Blocked', count: 0, pct: 0, color: 'var(--text-tertiary)' },
];

const FILES = [
  { name: 'Design-System-v2.fig', meta: 'Uploaded 2h ago', size: '24.5 MB', icon: ImageIcon, bg: 'var(--ember)' },
  { name: 'Architecture-Diagram.pdf', meta: 'Uploaded 1d ago', size: '2.1 MB', icon: FileText, bg: '#b34a3a' },
  { name: 'Requirements-v1.2.docx', meta: 'Uploaded 2d ago', size: '1.8 MB', icon: FileText, bg: 'var(--steel)' },
  { name: 'Project-Plan.xlsx', meta: 'Uploaded 3d ago', size: '856 KB', icon: FileSpreadsheet, bg: 'var(--patina)' },
];

function DonutChart({ segments }: { segments: { pct: number; color: string }[] }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <svg width="120" height="120" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--surface-3)" strokeWidth="14" />
      {segments.map((seg, i) => {
        if (seg.pct <= 0) return null;
        const dash = (seg.pct / 100) * circumference;
        const el = (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="14"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offsetAcc}
            transform="rotate(-90 50 50)"
            strokeLinecap="butt"
          />
        );
        offsetAcc += dash;
        return el;
      })}
    </svg>
  );
}

function EmptyPanel({ label }: { label: string }) {
  return (
    <div
      className="card"
      style={{
        textAlign: 'center',
        padding: '48px 16px',
        color: 'var(--text-secondary)',
        fontSize: 13.5,
      }}
    >
      {label} view coming soon.
    </div>
  );
}

// Styling here mirrors the plain .tabs / .tab-item rules in globals.css:
// Barlow Condensed, uppercase, 13px/600, ember active state + 2px ember
// underline, transparent otherwise — just expressed as MUI sx overrides.
const tabListSx = {
  minHeight: 0,
  '& .MuiTabs-flexContainer': { gap: '4px' },
  '& .MuiTab-root': {
    minHeight: 0,
    padding: '12px 16px',
    fontFamily: '"Barlow Condensed", sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
  },
  '& .MuiTab-root:hover': {
    color: 'var(--text)',
  },
  '& .Mui-selected': {
    color: 'var(--ember) !important',
  },
};

export default function ProjectDetailPage() {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [tab, setTab] = useState('overview');

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <div className="breadcrumb-row">
        <Link href="/dashboard/projects" className="breadcrumb-link">
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
        <div className="header-actions">
          <button className="btn-secondary" type="button">
            Edit Project
          </button>
          <button className="icon-btn" type="button" aria-label="More actions">
            <MoreVertical size={15} />
          </button>
        </div>
      </div>

      <div className="project-header">
        <div className="project-header-left">
          <span className="project-header-icon" style={{ background: 'var(--steel)' }}>
            AP
          </span>
          <div>
            <div className="project-header-title-row">
              <h1 className="project-header-title">Acme Platform Redesign</h1>
              <Star size={18} fill="var(--ember)" color="var(--ember)" />
            </div>
            <p className="project-header-subtitle">
              Complete redesign of the core platform
            </p>
            <div className="project-header-badges">
              <span className="chip chip-steel">In Progress</span>
              <span className="chip chip-ember">High Priority</span>
              <span className="chip chip-neutral">Product</span>
            </div>
          </div>
        </div>

        <div className="project-meta-row">
          <div className="project-meta-col">
            <span className="project-meta-label">Owner</span>
            <span className="project-meta-value">
              <span
                className="owner-avatar"
                style={{ width: 20, height: 20, background: 'var(--steel)', color: '#fff' }}
              >
                WS
              </span>
              Wile Smith
            </span>
          </div>
          <div className="project-meta-col">
            <span className="project-meta-label">Start Date</span>
            <span className="project-meta-value">Mar 18, 2025</span>
          </div>
          <div className="project-meta-col">
            <span className="project-meta-label">Target Date</span>
            <span className="project-meta-value">Jun 30, 2025</span>
          </div>
          <div className="project-meta-col">
            <span className="project-meta-label">Project Key</span>
            <span className="project-meta-value">AP-2025</span>
          </div>
        </div>
      </div>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: '1px solid var(--border)', mb: 0 }}>
          <TabList
            onChange={handleTabChange}
            aria-label="Project detail tabs"
            TabIndicatorProps={{ style: { backgroundColor: 'var(--ember)', height: 2 } }}
            sx={tabListSx}
          >
            <Tab label="Overview" value="overview" disableRipple />
            <Tab label="Tasks" value="tasks" disableRipple />
            <Tab label="Members" value="members" disableRipple />
            <Tab label="Files" value="files" disableRipple />
            <Tab label="Settings" value="settings" disableRipple />
          </TabList>
        </Box>

        <TabPanel value="overview" sx={{ p: 0, pt: '20px' }}>
          <div className="detail-grid">
            {/* ---- Main column ---- */}
            <div className="detail-main">
              <div className="card">
                <div className="panel-header">
                  <span className="panel-title">Project Progress</span>
                  <span className="chip chip-patina">On track</span>
                </div>
                <div className="progress-big-value">72%</div>
                <div className="progress-track-lg">
                  <div className="progress-fill-lg" style={{ width: '72%' }} />
                </div>
                <div className="progress-meta-row">
                  <span>Estimated completion: 18 days</span>
                  <span>156 / 216 tasks completed</span>
                </div>

                <p className="progress-desc">
                  We are rebuilding the Acme platform with a modern, scalable
                  architecture.
                  {showFullDesc && (
                    <>
                      {' '}
                      This includes a new design system, improved performance,
                      better accessibility, and enhanced user experience.
                    </>
                  )}
                </p>
                <button
                  className="show-more-link"
                  type="button"
                  onClick={() => setShowFullDesc((v) => !v)}
                >
                  {showFullDesc ? 'Show less' : 'Show more'} ⌄
                </button>
              </div>

              <div className="card">
                <div className="panel-header">
                  <span className="panel-title">Recent Activity</span>
                  <a href="#" className="panel-link">
                    View all activity
                  </a>
                </div>
                <div className="activity-list">
                  {ACTIVITY.map((item, i) => (
                    <div className="activity-row" key={i}>
                      <span className="activity-icon-badge" style={{ background: item.iconBg }}>
                        <item.icon size={12} />
                      </span>
                      <span className="activity-avatar">{item.initials}</span>
                      <span className="activity-row-text">{item.text}</span>
                      <span className="activity-row-time">{item.time}</span>
                    </div>
                  ))}
                </div>
                <div className="comment-row">
                  <span className="activity-avatar">WS</span>
                  <input type="text" placeholder="Write a comment..." />
                  <button className="btn-post" type="button">
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* ---- Side column ---- */}
            <div className="detail-side">
              <div className="stat-tile-row">
                {STAT_TILES.map((tile) => (
                  <div
                    className="stat-tile-v2"
                    key={tile.label}
                    style={{ borderLeftColor: tile.accent }}
                  >
                    <div className="stat-tile-v2-label">{tile.label}</div>
                    <div className="stat-tile-v2-value">{tile.value}</div>
                    {tile.kind === 'link' ? (
                      <div className="stat-tile-v2-link">{tile.linkText}</div>
                    ) : (
                      <div className="stat-tile-v2-percent-row">
                        <span className="stat-tile-v2-pct">{tile.pct}%</span>
                        <span className="stat-tile-v2-track">
                          <span
                            className="stat-tile-v2-fill"
                            style={{ width: `${tile.pct}%`, background: tile.accent }}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="panel-header">
                  <span className="panel-title">Project Members</span>
                  <a href="#" className="panel-link">
                    View all members
                  </a>
                </div>
                <div className="member-list">
                  {MEMBERS.map((m) => (
                    <div className="member-row" key={m.initials}>
                      <span className="owner-avatar" style={{ background: m.accent, color: '#fff' }}>
                        {m.initials}
                      </span>
                      <span className="member-row-info">
                        <span className="member-row-name">{m.name}</span>
                        <span className="member-row-role-text">{m.role}</span>
                      </span>
                      <span className={`chip ${m.chip}`}>{m.badge}</span>
                    </div>
                  ))}
                </div>
                <div className="member-footer-row">
                  <div className="avatar-stack">
                    {EXTRA_MEMBER_INITIALS.map((initial) => (
                      <span className="stack-avatar" key={initial}>
                        {initial}
                      </span>
                    ))}
                    <span className="stack-more">+5</span>
                  </div>
                  <button className="btn-secondary" type="button">
                    <UserPlus size={13} />
                    Invite Members
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="panel-header">
                  <span className="panel-title">Key Dates</span>
                  <a href="#" className="panel-link">
                    View timeline
                  </a>
                </div>
                <div className="checklist">
                  {KEY_DATES.map((item) => (
                    <div className="checklist-item" key={item.label}>
                      <span className={`checklist-icon ${item.state}`}>
                        {item.state === 'done' && <CheckCircle2 size={12} />}
                      </span>
                      <span className="checklist-label">{item.label}</span>
                      <span className="checklist-date">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Bottom row ---- */}
          <div className="detail-bottom-grid">
            <div className="card">
              <div className="panel-header">
                <span className="panel-title">Tasks by Status</span>
              </div>
              <div className="donut-row">
                <DonutChart
                  segments={TASK_STATUS.map((s) => ({ pct: s.pct, color: s.color }))}
                />
                <div className="legend-list">
                  {TASK_STATUS.map((s) => (
                    <div className="legend-row" key={s.label}>
                      <span className="legend-swatch" style={{ background: s.color }} />
                      <span className="legend-label">{s.label}</span>
                      <span className="legend-value">
                        {s.count} ({s.pct}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="panel-header">
                <span className="panel-title">Upcoming Milestones</span>
              </div>
              <div className="checklist">
                {MILESTONES.map((item) => (
                  <div className="checklist-item" key={item.label}>
                    <span className={`checklist-icon ${item.state}`}>
                      {item.state === 'done' && <CheckCircle2 size={12} />}
                    </span>
                    <span className="checklist-label">{item.label}</span>
                    <span className="checklist-date">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="panel-header">
                <span className="panel-title">Files</span>
                <a href="#" className="panel-link">
                  View all files
                </a>
              </div>
              <div className="file-list">
                {FILES.map((f) => (
                  <div className="file-row" key={f.name}>
                    <span className="file-icon" style={{ background: f.bg }}>
                      <f.icon size={14} />
                    </span>
                    <span className="file-info">
                      <span className="file-name">{f.name}</span>
                      <span className="file-meta">{f.meta}</span>
                    </span>
                    <span className="file-size">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="tasks" sx={{ p: 0, pt: '20px' }}>
          <TasksBoard />
        </TabPanel>
        <TabPanel value="members" sx={{ p: 0, pt: '20px' }}>
          <MembersPanel />
        </TabPanel>
        <TabPanel value="files" sx={{ p: 0, pt: '20px' }}>
          <FilesPanel />
        </TabPanel>
        <TabPanel value="settings" sx={{ p: 0, pt: '20px' }}>
          <EmptyPanel label="Settings" />
        </TabPanel>
      </TabContext>
    </>
  );
}
