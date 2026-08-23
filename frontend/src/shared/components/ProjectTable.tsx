'use client';
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pin,
} from 'lucide-react';

type StatusKey =
  | 'in-progress'
  | 'completed'
  | 'pending'
  | 'planning'
  | 'on-hold';

export type AccentKey =
  | 'steel'
  | 'ember'
  | 'gold'
  | 'patina'
  | 'neutral';

// type AccentKey = 'steel' | 'ember' | 'gold' | 'patina' | 'neutral';

export type Project = {
  id: string;
  code: string;
  name: string;
  description: string;
  pinned?: boolean;
  accent: AccentKey;
  owner: {
    name: string;
    initials: string;
  };
  status: StatusKey;
  progress: number;
  members: string[];
  extraMembers: number;
  updated: string;
};

const STATUS_LABEL: Record<StatusKey, string> = {
  'in-progress': 'In Progress',
  completed: 'Completed',
  pending: 'Pending',
  planning: 'Planning',
  'on-hold': 'On Hold',
};

const STATUS_CHIP: Record<StatusKey, string> = {
  'in-progress': 'chip-steel',
  completed: 'chip-patina',
  pending: 'chip-gold',
  planning: 'chip-neutral',
  'on-hold': 'chip-neutral',
};

const STATUS_BAR_COLOR: Record<StatusKey, string> = {
  'in-progress': 'var(--steel)',
  completed: 'var(--patina)',
  pending: 'var(--gold)',
  planning: 'var(--text-tertiary)',
  'on-hold': 'var(--text-tertiary)',
};

const ACCENT: Record<AccentKey, string> = {
  steel: 'var(--steel)',
  ember: 'var(--ember)',
  gold: 'var(--gold)',
  patina: 'var(--patina)',
  neutral: 'var(--text-tertiary)',
};

type ProjectTableProps = {
  projects: Project[];
  totalProjects?: number;
};

export default function ProjectTable({
  projects,
  totalProjects = projects.length,
}: ProjectTableProps) {
  return (
    <div className="table-card">
      <div className="table-scroll">
        <div className="table-grid">
          {/* Table header */}
          <div className="table-head">
            <div>Project</div>

            <div>Owner</div>

            <div>Status</div>

            <div>Progress</div>

            <div>Members</div>

            <div>
              Updated
              <ChevronDown size={12} />
            </div>

            <div />
          </div>

          {/* Table rows */}
          {projects.map((project) => (
            
            <div className="table-row" key={project.id}>
              {/* Project */}
              <div className="project-cell">
                <span
                  className="accent-bar"
                  style={{
                    background: ACCENT[project.accent],
                  }}
                />

                <span
                  className="project-icon"
                  style={{
                    background: ACCENT[project.accent],
                  }}
                >
                  {project.code}
                </span>

                <div>
                  <div className="project-info-name">
                    <Link
                      href={`/projects/${project.id}`}
                      className="project-name-link"
                    >
                      {project.name}
                    </Link>
                    {project.pinned && (
                      <Pin size={12} color="var(--gold)" />
                    )}
                  </div>

                  <div className="project-info-desc">
                    {project.description}
                  </div>
                </div>
              </div>

              {/* Owner */}
              <div className="owner-cell">
                <span className="owner-avatar">
                  {project.owner.initials}
                </span>

                {project.owner.name}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`chip ${STATUS_CHIP[project.status]}`}
                >
                  {STATUS_LABEL[project.status]}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="progress-cell">
                  <span className="progress-pct">
                    {project.progress}%
                  </span>

                  <span className="progress-track">
                    <span
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                        background:
                          STATUS_BAR_COLOR[project.status],
                      }}
                    />
                  </span>
                </div>
              </div>

              {/* Members */}
              <div>
                <div className="avatar-stack">
                  {project.members.map((initial) => (
                    <span
                      className="stack-avatar"
                      key={initial}
                    >
                      {initial}
                    </span>
                  ))}

                  {project.extraMembers > 0 && (
                    <span className="stack-more">
                      +{project.extraMembers}
                    </span>
                  )}
                </div>
              </div>

              {/* Updated + actions */}
              <div className="updated-cell">
                <span>{project.updated}</span>

                <button
                  className="kebab-btn"
                  type="button"
                  aria-label={`Actions for ${project.name}`}
                >
                  <MoreVertical size={15} />
                </button>
              </div>

              {/* Grid spacer */}
              <div />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="table-footer">
        <span>
          Showing 1 to {projects.length} of {totalProjects} projects
        </span>

        <div className="pagination">
          <button
            className="page-btn"
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            className="page-btn active"
            type="button"
          >
            1
          </button>

          <button
            className="page-btn"
            type="button"
          >
            2
          </button>

          <button
            className="page-btn"
            type="button"
          >
            3
          </button>

          <button
            className="page-btn"
            type="button"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}