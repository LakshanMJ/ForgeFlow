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
import { ProjectMemberRole } from '../types/project.types';

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

const MEMBER_ROLE: Record<ProjectMemberRole, { label: string; color: string }> = {
	[ProjectMemberRole.OWNER]: {
		label: 'Owner',
		color: 'patina',
	},
	[ProjectMemberRole.ADMIN]: {
		label: 'Admin',
		color: 'steel',
	},
	[ProjectMemberRole.MEMBER]: {
		label: 'Member',
		color: 'gold',
	},
	[ProjectMemberRole.VIEWER]: {
		label: 'Viewer',
		color: 'ember',
	},
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

interface MembersPanelProps {
	members: Member[];
}

export default function MembersPanel({ members }: MembersPanelProps) {
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
					<span className="members-summary-value">{members.length}</span>
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
					<span className="members-summary-value">{'onlineCount'}</span>
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
				{members.map((m) => (
					<div className="member-table-row" key={m.email}>
						<div className="member-identity">
							<div className="member-avatar-wrap">
								<span
									className="owner-avatar"
									style={{ width: 34, height: 34, background: m.accent, color: '#fff' }}
								>
									{`${m?.user?.firstName?.[0] ?? ''}${m?.user?.lastName?.[0] ?? ''}`.toUpperCase()}
								</span>
								<span
									className="member-status-dot"
									style={{ background: STATUS_COLOR[m.status] }}
								/>
							</div>
							<div className="member-identity-text">
								<div className="member-identity-name">{`${m?.user?.firstName} ${m?.user?.lastName}`}</div>
								<div className="member-identity-email">{m.user?.email}</div>
							</div>
						</div>

						<div className="member-role-col">
							<span className={`chip chip-${MEMBER_ROLE[m.role].color}`}>
								{MEMBER_ROLE[m.role].label}
							</span>
						</div>

						<div className="member-info-block">
							<span>
								Joined:{' '}
								{m?.joinedAt
									? new Date(m.joinedAt).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})
									: '—'}
							</span>

							<span>Tasks: {'m?.tasks ' ?? 0}</span>
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
							<span>Projects: {'m.projects'}</span>
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
				<span>Showing {members.length} members</span>
				<span className="footer-with-icon">
					<Clock size={12} />
					Last active 2h ago
				</span>
			</div>
		</div>
	);
}
