'use client';

import ProjectTable, {
  type Project,
} from '@/shared/components/ProjectTable';

import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Plus,
  Pin,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type StatusKey = 'in-progress' | 'completed' | 'pending' | 'planning' | 'on-hold';

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

const ACCENT: Record<string, string> = {
  steel: 'var(--steel)',
  ember: 'var(--ember)',
  gold: 'var(--gold)',
  patina: 'var(--patina)',
  neutral: 'var(--text-tertiary)',
};

const PROJECTS: Project[] = [
  {
    code: 'AP',
    name: 'Acme Platform Redesign',
    description: 'Complete redesign of the core platform',
    pinned: true,
    accent: 'steel',
    owner: { name: 'Wile Smith', initials: 'WS' },
    status: 'in-progress',
    progress: 72,
    members: ['A', 'B', 'C'],
    extraMembers: 5,
    updated: '2h ago',
  },
  {
    code: 'MB',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application',
    accent: 'ember',
    owner: { name: 'Sarah Johnson', initials: 'SJ' },
    status: 'in-progress',
    progress: 45,
    members: ['D', 'E', 'F'],
    extraMembers: 3,
    updated: '5h ago',
  },
  {
    code: 'DS',
    name: 'Design System',
    description: 'Company-wide design system',
    accent: 'gold',
    owner: { name: 'Alex Turner', initials: 'AT' },
    status: 'completed',
    progress: 100,
    members: ['G', 'H', 'I'],
    extraMembers: 2,
    updated: '1d ago',
  },
  {
    code: 'DM',
    name: 'Data Migration',
    description: 'Migrate legacy data to new system',
    accent: 'steel',
    owner: { name: 'Priya Shah', initials: 'PS' },
    status: 'pending',
    progress: 25,
    members: ['J', 'K', 'L'],
    extraMembers: 1,
    updated: '2d ago',
  },
  {
    code: 'AI',
    name: 'AI Analytics Engine',
    description: 'Intelligent analytics and reporting',
    accent: 'ember',
    owner: { name: 'Mike Brown', initials: 'MB' },
    status: 'planning',
    progress: 10,
    members: ['M', 'N', 'O'],
    extraMembers: 4,
    updated: '3d ago',
  },
  {
    code: 'QA',
    name: 'QA Automation',
    description: 'Automated testing framework',
    accent: 'neutral',
    owner: { name: 'Lisa Wong', initials: 'LW' },
    status: 'on-hold',
    progress: 0,
    members: ['P', 'Q', 'R'],
    extraMembers: 2,
    updated: '5d ago',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            Plan, track and deliver work across all your projects.
          </p>
        </div>
        <button className="btn-primary" type="button">
          <Plus size={15} />
          New Project
        </button>
      </div>
      <div className='divider-h'/>
      <div className="filter-bar">
        <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Search projects..." />
        </div>

        <button className="filter-select" type="button">
          Status
          <ChevronDown size={14} />
        </button>
        <button className="filter-select" type="button">
          Owner
          <ChevronDown size={14} />
        </button>
        <button className="filter-select" type="button">
          Category
          <ChevronDown size={14} />
        </button>
        <button className="filter-select" type="button">
          <SlidersHorizontal size={14} />
          More Filters
        </button>

        <div className="view-toggle">
          <button className="icon-btn" type="button" aria-label="Grid view">
            <LayoutGrid size={15} />
          </button>
          <button className="icon-btn active" type="button" aria-label="List view">
            <List size={15} />
          </button>
        </div>
      </div>

      <ProjectTable
        projects={PROJECTS}
        totalProjects={18}
      />
      {/* <div className="table-card">
        <div className="table-scroll">
          <div className="table-grid">
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
            </div>

            {PROJECTS.map((project) => (
              <div className="table-row" key={project.code}>
                <div className="project-cell">
                  <span
                    className="accent-bar"
                    style={{ background: ACCENT[project.accent] }}
                  />
                  <span
                    className="project-icon"
                    style={{ background: ACCENT[project.accent] }}
                  >
                    {project.code}
                  </span>
                  <div>
                    <div className="project-info-name">
                      {project.name}
                      {project.pinned && (
                        <Pin size={12} color="var(--gold)" />
                      )}
                    </div>
                    <div className="project-info-desc">
                      {project.description}
                    </div>
                  </div>
                </div>

                <div className="owner-cell">
                  <span className="owner-avatar">{project.owner.initials}</span>
                  {project.owner.name}
                </div>

                <div>
                  <span className={`chip ${STATUS_CHIP[project.status]}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                <div>
                  <div className="progress-cell">
                    <span className="progress-pct">{project.progress}%</span>
                    <span className="progress-track">
                      <span
                        className="progress-fill"
                        style={{
                          width: `${project.progress}%`,
                          background: STATUS_BAR_COLOR[project.status],
                        }}
                      />
                    </span>
                  </div>
                </div>

                <div>
                  <div className="avatar-stack">
                    {project.members.map((initial) => (
                      <span className="stack-avatar" key={initial}>
                        {initial}
                      </span>
                    ))}
                    {project.extraMembers > 0 && (
                      <span className="stack-more">+{project.extraMembers}</span>
                    )}
                  </div>
                </div>

                <div className="updated-cell">
                  {project.updated}
                  <button className="kebab-btn" type="button" aria-label="Row actions">
                    <MoreVertical size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-footer">
          <span>Showing 1 to 6 of 18 projects</span>
          <div className="pagination">
            <button className="page-btn" type="button" aria-label="Previous page">
              <ChevronLeft size={14} />
            </button>
            <button className="page-btn active" type="button">
              1
            </button>
            <button className="page-btn" type="button">
              2
            </button>
            <button className="page-btn" type="button">
              3
            </button>
            <button className="page-btn" type="button" aria-label="Next page">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div> */}


    </>
  );
}
