# ForgeFlow

### The project management tool you won't outgrow

**ForgeFlow is a modern project management platform built to give teams a clear view of their work, from individual tasks to project health and executive level progress.**

It brings tasks, projects, teams, blockers, analytics, and AI-assisted insights into one connected workspace.

<p align="center">
  <a href="YOUR_LIVE_DEMO_URL">Live Demo</a>
  ·
  <a href="YOUR_FRONTEND_REPO_URL">Frontend</a>
  ·
  <a href="YOUR_BACKEND_REPO_URL">Backend</a>
</p>

---

## ✦ The Problem

Project management tools often give everyone the same information. Just with different permissions.

ForgeFlow takes a different approach.

**The same project can mean something completely different depending on who's looking at it.**

A developer needs to know:

> What do I need to do next?

A project manager needs to know:

> What's moving, what's blocked, and where are we falling behind?

A stakeholder needs to know:

> Are we on track?

ForgeFlow is designed around those different perspectives.

### **One truth. Three perspectives.**

---

## ✦ What ForgeFlow Does

### 📋 See every task

A powerful Kanban workspace keeps work visible from backlog to completion.

* Drag-and-drop task management
* Project-based boards
* Task status tracking
* Priority and due dates
* Assignees
* Tags and categories
* Backlog management
* Personal task views

**Everything in sight. Nothing overlooked.**

---

### 🚧 Unblock work. Keep moving.

Blocked work shouldn't disappear inside a task description.

ForgeFlow makes blockers visible at the point where teams manage their work.

* Dedicated blocked status
* Blocker descriptions
* Dependency visibility
* Assignee context
* High-visibility blocker indicators

Teams can see **what is stuck and why** without digging through conversations.

---

### 📈 See how your team moves.

Velocity and progress shouldn't require manually piecing together spreadsheets.

ForgeFlow brings project activity and team progress into a centralized analytics experience.

* Project progress
* Task completion
* Team activity
* Velocity tracking
* Project health
* Performance trends

---

### 🧠 Flint — Your AI project companion

Meet **Flint**, ForgeFlow's AI powered project intelligence layer.

Instead of making managers search through boards, Flint surfaces information that deserves attention.

It can highlight things like:

* Overdue work
* Critical tasks
* Blocked tasks
* Dependencies
* Project risks
* Team activity
* Areas requiring attention

The goal isn't another chatbot.

**It's less searching. More knowing.**

---

## ✦ Three Dashboards

ForgeFlow adapts the workspace to the person using it.

### User

Focus on the work that needs to get done.

**My Tasks · Priorities · Deadlines · Activity**

### Project Manager

See how the entire project is moving.

**Project Health · Team Progress · Blockers · Velocity**

### Stakeholder

Understand the state of the business without getting buried in implementation details.

**Progress · Risks · Milestones · High-level Insights**

### **One truth. Three perspectives.**

---

## ✦ Projects

Projects bring everything together.

Each project provides a centralized workspace for:

* Tasks
* Team members
* Progress
* Categories
* Status
* Activity
* Project health
* Planning

From planning to completion, the project remains the single source of truth.

---

## ✦ Team Management

ForgeFlow includes role-based team management designed around real organizational workflows.

### Roles

* **Owner**
* **Admin**
* **Member**

Teams can manage:

* Departments
* Roles
* Project membership
* Invitations
* Open positions
* User status
* Team organization

---

# ⚙️ Technology

ForgeFlow is built as a modern full-stack application with a separated frontend and backend architecture.

### Frontend

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| **Next.js**        | Application framework   |
| **React**          | UI                      |
| **TypeScript**     | Type safety             |
| **Material UI**    | Component system        |
| **TanStack Query** | Server-state management |
| **Axios**          | API communication       |

### Backend

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| **NestJS**     | Backend framework           |
| **TypeScript** | Application language        |
| **Prisma**     | ORM                         |
| **PostgreSQL** | Database                    |
| **JWT**        | Authentication              |
| **REST API**   | Client-server communication |

### Architecture

```text
┌─────────────────────────────────────────────┐
│                 ForgeFlow                   │
├─────────────────────────────────────────────┤
│                                             │
│              Next.js Frontend               │
│                    │                        │
│                    │ REST API               │
│                    ▼                        │
│              NestJS Backend                 │
│                    │                        │
│                    ▼                        │
│                  Prisma                     │
│                    │                        │
│                    ▼                        │
│               PostgreSQL                    │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 🏗️ Backend Architecture

The backend follows a modular architecture designed to keep business logic separated from infrastructure concerns.

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── organizations/
│   ├── departments/
│   ├── projects/
│   ├── tasks/
│   ├── roles/
│   └── notifications/
│
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   └── interceptors/
│
└── main.ts
```

Core backend responsibilities include:

* Authentication
* Authorization
* Organization management
* Project management
* Task management
* Role-based access control
* Team management
* Notifications
* Analytics

---

# 🔐 Authentication & Authorization

ForgeFlow uses JWT-based authentication with access and refresh tokens.

Authorization is handled through role-based access control.

```text
OWNER
  │
  ├── Organization
  ├── Projects
  ├── Users
  └── Settings

ADMIN
  │
  ├── Projects
  ├── Teams
  └── Users

MEMBER
  │
  ├── Assigned Tasks
  ├── Projects
  └── Team Activity
```

Protected API routes enforce permissions at the backend rather than relying solely on frontend visibility.

---

# 🗃️ Core Data Model

At the center of ForgeFlow is a connected project-management domain model.

```text
Organization
      │
      ├── Users
      │
      ├── Departments
      │
      └── Projects
              │
              ├── Members
              │
              ├── Tasks
              │     ├── Assignee
              │     ├── Priority
              │     ├── Status
              │     └── Dependencies
              │
              └── Activity
```

This structure allows project-level information to flow into dashboards, analytics, and Flint's project intelligence layer.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js 20+
* PostgreSQL
* npm
* Git

---

## 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd forgeflow
```

---

## 2. Install dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

## 3. Configure environment variables

Create a `.env` file in the backend:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/forgeflow"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

PORT=3001
```

Configure the frontend environment:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## 4. Set up the database

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

---

## 5. Start the backend

```bash
npm run start:dev
```

Backend:

```text
http://localhost:3001
```

---

## 6. Start the frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 📸 Product Preview

<p align="center">
  <img src="./screenshots/dashboard.png" width="900" alt="ForgeFlow Dashboard">
</p>

<p align="center">
  <img src="./screenshots/project-board.png" width="900" alt="ForgeFlow Project Board">
</p>

<p align="center">
  <img src="./screenshots/analytics.png" width="900" alt="ForgeFlow Analytics">
</p>

---

# 🎯 Design Philosophy

ForgeFlow isn't designed to make project management feel like enterprise software.

The interface follows a simple principle:

> **Complex systems should feel simple to use.**

That means:

**Less clutter.
Clearer hierarchy.
Useful information.
Fewer clicks.**

The visual system combines a dark industrial aesthetic with restrained typography, focused information density, and purposeful motion.

---

# 🧩 What I Built

ForgeFlow was built as a full-stack product rather than a collection of isolated screens.

The project involved designing and implementing:

* Full authentication flow
* JWT access/refresh architecture
* Role-based authorization
* Organization management
* Department management
* Project management
* Task management
* Kanban workflows
* Blocker management
* Team management
* Project dashboards
* Role-specific dashboards
* Notifications
* Analytics
* AI-assisted project insights
* Responsive application layouts
* REST API architecture
* PostgreSQL data modeling
* Prisma ORM integration

---

# 🧠 Engineering Highlights

### Full-stack TypeScript

The application uses TypeScript across the frontend and backend, allowing shared concepts and consistent development patterns across the stack.

### Modular NestJS architecture

Backend functionality is separated into domain-focused modules rather than placing business logic into large controllers.

### Server-state management

TanStack Query handles API state, caching, synchronization, and background updates on the frontend.

### Secure API architecture

Authentication and authorization are enforced at the API layer, with protected routes and role-based access control.

### Relational data modeling

PostgreSQL and Prisma provide a structured relational foundation for organizations, users, projects, tasks, and their relationships.

---

# 🗺️ Roadmap

ForgeFlow is actively evolving.

### Completed

* [x] Authentication
* [x] Role-based access control
* [x] Organizations
* [x] Departments
* [x] Projects
* [x] Tasks
* [x] Kanban board
* [x] Blocker management
* [x] Team management
* [x] Dashboards
* [x] Notifications
* [x] Analytics
* [x] Flint AI concept

### Planned

* [ ] Real-time collaboration
* [ ] Advanced task dependencies
* [ ] Gantt timelines
* [ ] Expanded AI project intelligence
* [ ] Automated project summaries
* [ ] Advanced reporting
* [ ] Email notifications
* [ ] Production deployment improvements

<p align="center">
</p>
