'use client';

import SearchInput from '@/shared/components/SearchInput';
import {
  Search,
  Filter,
  Plus,
  Users,
  Zap,
  Mail,
  Star,
  MoreVertical,
  Clock,
} from 'lucide-react';

type Status = 'online' | 'away' | 'offline';

const STATUS_COLOR: Record<Status, string> = {
  online: 'var(--patina)',
  away: 'var(--gold)',
  offline: 'var(--ember)',
};
const STATUS_LABEL: Record<Status, string> = {
  online: 'Online',
  away: 'Away',
  offline: 'Offline',
};

type Member = {
  initials: string;
  name: string;
  email: string;
  role: string;
  roleChip: string;
  accent: string;
  status: Status;
  joined: string;
  tasks: number;
  projects: number;
  favorited?: boolean;
};

const MEMBERS: Member[] = [
  { initials: 'WS', name: 'Wile Smith', email: 'wile.smith@acmecorp.com', role: 'OWNER', roleChip: 'chip-ember', accent: 'var(--steel)', status: 'online', joined: 'Dec 1, 2024', tasks: 5, projects: 3, favorited: true },
  { initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@acmecorp.com', role: 'LEAD DEV', roleChip: 'chip-steel', accent: 'var(--ember)', status: 'online', joined: 'Dec 1, 2024', tasks: 8, projects: 3, favorited: true },
  { initials: 'AT', name: 'Alex Turner', email: 'alex.turner@acmecorp.com', role: 'DESIGNER', roleChip: 'chip-steel', accent: 'var(--gold)', status: 'away', joined: 'Dec 2, 2024', tasks: 4, projects: 2 },
  { initials: 'MB', name: 'Mike Brown', email: 'mike.brown@acmecorp.com', role: 'DEVELOPER', roleChip: 'chip-patina', accent: 'var(--patina)', status: 'online', joined: 'Dec 3, 2024', tasks: 7, projects: 2 },
  { initials: 'LW', name: 'Lisa Wong', email: 'lisa.wong@acmecorp.com', role: 'DEVELOPER', roleChip: 'chip-patina', accent: 'var(--steel)', status: 'offline', joined: 'Dec 4, 2024', tasks: 6, projects: 2 },
  { initials: 'PS', name: 'Priya Shah', email: 'priya.shah@acmecorp.com', role: 'QA ENGINEER', roleChip: 'chip-violet', accent: 'var(--ember)', status: 'offline', joined: 'Dec 5, 2024', tasks: 3, projects: 1 },
  { initials: 'DK', name: 'David Kim', email: 'david.kim@acmecorp.com', role: 'INTERN', roleChip: 'chip-neutral', accent: 'var(--gold)', status: 'online', joined: 'Dec 10, 2024', tasks: 2, projects: 1 },
  { initials: 'EC', name: 'Emily Chen', email: 'emily.chen@acmecorp.com', role: 'STAKEHOLDER', roleChip: 'chip-gold', accent: 'var(--patina)', status: 'away', joined: 'Dec 12, 2024', tasks: 0, projects: 1 },
];

const onlineCount = MEMBERS.filter((m) => m.status === 'online').length;

export default function MembersPanel() {
  return (
    <div className="card">
      <div className="members-summary-row">
        <div className="members-summary-item">
          <span
            className="members-summary-icon"
            style={{ background: 'var(--ember-tint)', color: 'var(--ember)' }}
          >
            <Users size={16} />
          </span>
          <span className="members-summary-value">{MEMBERS.length}</span>
          <span className="members-summary-label">Members</span>
        </div>

        <div className="members-summary-item">
          <span
            className="members-summary-icon"
            style={{ background: 'var(--patina-tint)', color: 'var(--patina)' }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--patina)',
                display: 'block',
              }}
            />
          </span>
          <span className="members-summary-value">{onlineCount}</span>
          <span className="members-summary-label">Online</span>
        </div>

        <div className="members-summary-item">
          <span
            className="members-summary-icon"
            style={{ background: 'var(--gold-tint)', color: 'var(--gold)' }}
          >
            <Zap size={16} />
          </span>
          <span className="members-summary-value">3</span>
          <span className="members-summary-label">Active Today</span>
        </div>
      </div>

      <div className="members-toolbar-row">
        {/* <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search members..." />
        </div> */}
        <SearchInput
          placeholder="Search members..."
          iconSize={14}
        />
        <button className="filter-select" type="button">
          <Filter size={14} />
          Filter
        </button>
        <button className="btn-primary" type="button">
          <Plus size={14} />
          Invite Member
        </button>
      </div>

      <div className="members-table">
        {MEMBERS.map((m) => (
          <div className="member-table-row" key={m.email}>
            <div className="member-identity">
              <div className="member-avatar-wrap">
                <span
                  className="owner-avatar"
                  style={{ width: 34, height: 34, background: m.accent, color: '#fff' }}
                >
                  {m.initials}
                </span>
                <span
                  className="member-status-dot"
                  style={{ background: STATUS_COLOR[m.status] }}
                />
              </div>
              <div className="member-identity-text">
                <div className="member-identity-name">{m.name}</div>
                <div className="member-identity-email">{m.email}</div>
              </div>
            </div>

            <div className="member-role-col">
              <span className={`chip ${m.roleChip}`}>{m.role}</span>
            </div>

            <div className="member-info-block">
              <span>Joined: {m.joined}</span>
              <span>Tasks: {m.tasks}</span>
            </div>

            <div className="member-divider" />

            <div className="member-info-block">
              <span className="member-status-line">
                <span
                  className="status-dot-inline"
                  style={{ background: STATUS_COLOR[m.status] }}
                />
                {STATUS_LABEL[m.status]}
              </span>
              <span>Projects: {m.projects}</span>
            </div>

            <div className="member-actions">
              <button className="icon-btn" type="button" aria-label={`Email ${m.name}`}>
                <Mail size={14} />
              </button>
              <button
                className={`icon-btn${m.favorited ? ' favorited' : ''}`}
                type="button"
                aria-label={`Favorite ${m.name}`}
              >
                <Star size={14} fill={m.favorited ? 'var(--ember)' : 'none'} />
              </button>
              <button className="icon-btn" type="button" aria-label="More actions">
                <MoreVertical size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="members-footer-row">
        <span>Showing {MEMBERS.length} members</span>
        <span className="footer-with-icon">
          <Clock size={12} />
          Last active 2h ago
        </span>
      </div>
    </div>
  );
}
