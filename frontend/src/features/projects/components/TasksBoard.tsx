'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  Search,
  ChevronDown,
  Share2,
  Zap,
  Download,
  MoreVertical,
  Plus,
  LayoutGrid,
  List,
  Calendar,
  GanttChartSquare,
  GripVertical,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';
import SearchInput from '@/shared/components/SearchInput';

type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

type Task = {
  id: string;
  title: string;
  label: string;
  labelChip: string;
  priority: Priority;
  assignee: { initials: string; name: string; accent: string };
  progress?: number;
  done?: boolean;
  blockedNote?: string;
};

type ColumnId = 'todo' | 'in_progress' | 'in_review' | 'done' | 'blocked';

type Column = {
  id: ColumnId;
  title: string;
  count: number;
  accent: string;
};

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', count: 8, accent: 'var(--gold)' },
  { id: 'in_progress', title: 'In Progress', count: 5, accent: 'var(--steel)' },
  { id: 'in_review', title: 'In Review', count: 3, accent: 'var(--violet)' },
  { id: 'done', title: 'Done', count: 12, accent: 'var(--patina)' },
  { id: 'blocked', title: 'Blocked', count: 2, accent: 'var(--ember)' },
];

const PRIORITY_COLOR: Record<Priority, string> = {
  HIGH: 'var(--ember)',
  MEDIUM: 'var(--gold)',
  LOW: 'var(--steel)',
};

const INITIAL_TASKS: Record<ColumnId, Task[]> = {
  todo: [
    { id: 'AP-101', title: 'Design System Foundation', label: 'DESIGN', labelChip: 'chip-steel', priority: 'HIGH', assignee: { initials: 'SJ', name: 'Sarah Johnson', accent: 'var(--ember)' } },
    { id: 'AP-102', title: 'User Research & Interviews', label: 'RESEARCH', labelChip: 'chip-violet', priority: 'MEDIUM', assignee: { initials: 'PS', name: 'Priya Shah', accent: 'var(--gold)' } },
    { id: 'AP-103', title: 'Information Architecture', label: 'DESIGN', labelChip: 'chip-steel', priority: 'MEDIUM', assignee: { initials: 'AT', name: 'Alex Turner', accent: 'var(--gold)' } },
    { id: 'AP-104', title: 'Competitor Analysis', label: 'RESEARCH', labelChip: 'chip-violet', priority: 'LOW', assignee: { initials: 'SJ', name: 'Sarah Johnson', accent: 'var(--ember)' } },
  ],
  in_progress: [
    { id: 'AP-105', title: 'API Integration Layer', label: 'DEVELOPMENT', labelChip: 'chip-patina', priority: 'HIGH', assignee: { initials: 'MB', name: 'Mike Brown', accent: 'var(--steel)' }, progress: 60 },
    { id: 'AP-106', title: 'User Authentication Flow', label: 'DEVELOPMENT', labelChip: 'chip-patina', priority: 'HIGH', assignee: { initials: 'PS', name: 'Priya Shah', accent: 'var(--gold)' }, progress: 75 },
    { id: 'AP-107', title: 'Responsive Layout Implementation', label: 'DEVELOPMENT', labelChip: 'chip-patina', priority: 'MEDIUM', assignee: { initials: 'AT', name: 'Alex Turner', accent: 'var(--gold)' }, progress: 40 },
    { id: 'AP-108', title: 'Project Setup & Configuration', label: 'DEVOPS', labelChip: 'chip-violet', priority: 'LOW', assignee: { initials: 'MB', name: 'Mike Brown', accent: 'var(--steel)' }, progress: 15 },
  ],
  in_review: [
    { id: 'AP-109', title: 'Dashboard UI Design', label: 'DESIGN', labelChip: 'chip-steel', priority: 'HIGH', assignee: { initials: 'SJ', name: 'Sarah Johnson', accent: 'var(--ember)' }, progress: 90 },
    { id: 'AP-110', title: 'Task Management API', label: 'DEVELOPMENT', labelChip: 'chip-patina', priority: 'MEDIUM', assignee: { initials: 'MB', name: 'Mike Brown', accent: 'var(--steel)' }, progress: 85 },
    { id: 'AP-111', title: 'Data Model Review', label: 'ARCHITECTURE', labelChip: 'chip-violet', priority: 'MEDIUM', assignee: { initials: 'AT', name: 'Alex Turner', accent: 'var(--gold)' }, progress: 90 },
  ],
  done: [
    { id: 'AP-112', title: 'Project Kickoff Meeting', label: 'MANAGEMENT', labelChip: 'chip-neutral', priority: 'MEDIUM', assignee: { initials: 'WS', name: 'Wile Smith', accent: 'var(--patina)' }, done: true },
    { id: 'AP-113', title: 'Requirements Gathering', label: 'MANAGEMENT', labelChip: 'chip-neutral', priority: 'MEDIUM', assignee: { initials: 'SJ', name: 'Sarah Johnson', accent: 'var(--ember)' }, done: true },
    { id: 'AP-114', title: 'Technical Architecture', label: 'ARCHITECTURE', labelChip: 'chip-violet', priority: 'HIGH', assignee: { initials: 'AT', name: 'Alex Turner', accent: 'var(--gold)' }, done: true },
    { id: 'AP-115', title: 'CI/CD Pipeline Setup', label: 'DEVOPS', labelChip: 'chip-violet', priority: 'MEDIUM', assignee: { initials: 'MB', name: 'Mike Brown', accent: 'var(--steel)' }, done: true },
  ],
  blocked: [
    { id: 'AP-116', title: 'Third-party Service Integration', label: 'DEVELOPMENT', labelChip: 'chip-patina', priority: 'HIGH', assignee: { initials: 'MB', name: 'Mike Brown', accent: 'var(--steel)' }, blockedNote: 'Waiting on vendor API access' },
    { id: 'AP-117', title: 'Data Migration Strategy', label: 'ARCHITECTURE', labelChip: 'chip-violet', priority: 'MEDIUM', assignee: { initials: 'AT', name: 'Alex Turner', accent: 'var(--gold)' }, blockedNote: 'Blocked by data export format' },
  ],
};

function findColumnOf(
  columns: Record<ColumnId, Task[]>,
  taskId: UniqueIdentifier
): ColumnId | undefined {
  return (Object.keys(columns) as ColumnId[]).find((colId) =>
    columns[colId].some((t) => t.id === taskId)
  );
}

function TaskCard({ task, dragging }: { task: Task; dragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card${isDragging || dragging ? ' dragging' : ''}`}
    >
      <div className="task-card-top-row">
        <span className="task-card-drag-handle" {...attributes} {...listeners}>
          <GripVertical size={14} />
        </span>
        <span className="task-card-title">{task.title}</span>
        <button className="task-card-kebab" type="button" aria-label="Task actions">
          <MoreVertical size={14} />
        </button>
      </div>

      <div className="task-card-meta-row">
        <span className={`chip ${task.labelChip}`}>{task.label}</span>
        <span className="task-card-priority" style={{ color: PRIORITY_COLOR[task.priority] }}>
          {task.priority}
        </span>
      </div>

      <div className="task-card-bottom-row">
        <span className="task-card-assignee">
          <span
            className="owner-avatar"
            style={{ width: 22, height: 22, background: task.assignee.accent, color: '#fff' }}
          >
            {task.assignee.initials}
          </span>
          <span className="task-card-assignee-name">{task.assignee.name}</span>
        </span>
        {task.done && (
          <span className="task-card-done-mark">
            <CheckCircle2 size={13} />
            Done
          </span>
        )}
      </div>

      {typeof task.progress === 'number' && (
        <div className="task-card-progress-row">
          <span className="task-card-progress-track">
            <span
              className="task-card-progress-fill"
              style={{ width: `${task.progress}%` }}
            />
          </span>
          <span className="task-card-progress-pct">{task.progress}%</span>
        </div>
      )}

      {task.blockedNote && (
        <div className="task-card-blocked-note">{task.blockedNote}</div>
      )}
    </div>
  );
}

function BoardColumn({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className={`board-column${isOver ? ' column-drop-active' : ''}`}>
      <div className="column-accent-bar" style={{ background: column.accent }} />
      <div className="column-header-row">
        <span className="column-title">{column.title}</span>
        <span className="column-count-badge">{column.count}</span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="column-body" ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>

      <button className="add-task-link" type="button">
        <Plus size={13} />
        Add task
      </button>
    </div>
  );
}

export default function TasksBoard() {
  const [columns, setColumns] = useState<Record<ColumnId, Task[]>>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeView, setActiveView] = useState<'board' | 'list' | 'calendar' | 'timeline'>('board');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const totalTasks = useMemo(
    () => COLUMNS.reduce((sum, c) => sum + c.count, 0),
    []
  );

  function handleDragStart(event: DragStartEvent) {
    const colId = findColumnOf(columns, event.active.id);
    if (!colId) return;
    const task = columns[colId].find((t) => t.id === event.active.id) ?? null;
    setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColId = findColumnOf(columns, active.id);
    const overColId =
      (COLUMNS.find((c) => c.id === over.id)?.id as ColumnId | undefined) ??
      findColumnOf(columns, over.id);

    if (!activeColId || !overColId || activeColId === overColId) return;

    setColumns((prev) => {
      const sourceItems = [...prev[activeColId]];
      const destItems = [...prev[overColId]];
      const activeIndex = sourceItems.findIndex((t) => t.id === active.id);
      if (activeIndex === -1) return prev;

      const [movedTask] = sourceItems.splice(activeIndex, 1);
      const overIndex = destItems.findIndex((t) => t.id === over.id);
      const insertAt = overIndex >= 0 ? overIndex : destItems.length;
      destItems.splice(insertAt, 0, movedTask);

      return {
        ...prev,
        [activeColId]: sourceItems,
        [overColId]: destItems,
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const colId = findColumnOf(columns, active.id);
    if (!colId) return;

    const items = columns[colId];
    const activeIndex = items.findIndex((t) => t.id === active.id);
    const overIndex = items.findIndex((t) => t.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setColumns((prev) => ({
        ...prev,
        [colId]: arrayMove(prev[colId], activeIndex, overIndex),
      }));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="tasks-header-row">
        <div className="view-subtabs">
          <button
            className={`view-subtab${activeView === 'board' ? ' active' : ''}`}
            type="button"
            onClick={() => setActiveView('board')}
          >
            <LayoutGrid size={14} />
            Board
          </button>
          <button
            className={`view-subtab${activeView === 'list' ? ' active' : ''}`}
            type="button"
            onClick={() => setActiveView('list')}
          >
            <List size={14} />
            List
          </button>
          <button
            className={`view-subtab${activeView === 'calendar' ? ' active' : ''}`}
            type="button"
            onClick={() => setActiveView('calendar')}
          >
            <Calendar size={14} />
            Calendar
          </button>
          <button
            className={`view-subtab${activeView === 'timeline' ? ' active' : ''}`}
            type="button"
            onClick={() => setActiveView('timeline')}
          >
            <GanttChartSquare size={14} />
            Timeline
          </button>
        </div>

        <div className="header-actions">
          <button className="btn-secondary" type="button">
            <Share2 size={13} />
            Share
          </button>
          <button className="btn-secondary" type="button">
            <Zap size={13} />
            Automation
          </button>
          <button className="btn-secondary" type="button">
            <Download size={13} />
            Export
          </button>
          <button className="icon-btn" type="button" aria-label="More actions">
            <MoreVertical size={15} />
          </button>
          <div className="split-btn">
            <button className="btn-primary" type="button">
              <Plus size={14} />
              New Task
            </button>
            <button className="split-btn-caret" type="button" aria-label="New task options">
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="tasks-filter-row">
        {/* <div className="search-input">
          <Search size={14} />
          <input type="text" placeholder="Filter tasks..." />
        </div> */}
        <SearchInput
          placeholder="Search tasks..."
          iconSize={14}
        />
        <button className="filter-select" type="button">
          Assignee
          <ChevronDown size={13} />
        </button>
        <button className="filter-select" type="button">
          Label
          <ChevronDown size={13} />
        </button>
        <button className="filter-select" type="button">
          Priority
          <ChevronDown size={13} />
        </button>
        <button className="filter-select" type="button">
          Status
          <ChevronDown size={13} />
        </button>
        <button className="clear-filters-link" type="button">
          Clear filters
        </button>

        <div className="tasks-filter-spacer">
          <button className="filter-select" type="button">
            Group by: Status
            <ChevronDown size={13} />
          </button>
          <button className="filter-select" type="button">
            Sort: Priority
            <ChevronDown size={13} />
          </button>
          <button className="icon-btn" type="button" aria-label="Board settings">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {activeView === 'board' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="board-scroll">
            <div className="board-columns">
              {COLUMNS.map((column) => (
                <BoardColumn key={column.id} column={column} tasks={columns[column.id]} />
              ))}
            </div>
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} dragging /> : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div
          className="card"
          style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-secondary)', fontSize: 13.5 }}
        >
          {activeView === 'list' && 'List view coming soon.'}
          {activeView === 'calendar' && 'Calendar view coming soon.'}
          {activeView === 'timeline' && 'Timeline view coming soon.'}
        </div>
      )}

      <div className="board-footer-row">
        <span>{totalTasks} tasks total</span>
        <div className="board-legend">
          <span className="board-legend-item">
            <span className="board-legend-dot" style={{ background: 'var(--ember)' }} />
            High
          </span>
          <span className="board-legend-item">
            <span className="board-legend-dot" style={{ background: 'var(--gold)' }} />
            Medium
          </span>
          <span className="board-legend-item">
            <span className="board-legend-dot" style={{ background: 'var(--steel)' }} />
            Low
          </span>
        </div>
        <span className="board-footer-refresh">
          Last updated 2m ago
          <RefreshCw size={12} />
        </span>
      </div>
    </div>
  );
}
