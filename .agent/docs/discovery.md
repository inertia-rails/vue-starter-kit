# Codebase Discovery Report

**Date:** December 9, 2025  
**Project:** sit-stay (Inertia Rails Vue Starter Kit)

---

## Project Purpose

This is a **modern full-stack web application starter kit** combining:
- **Rails 8** as the backend API and server
- **Vue 3 + TypeScript** as the frontend framework
- **Inertia.js** as the bridge enabling SPA-like experiences without building a separate API

The project provides a solid foundation for building web applications with:
- Complete user authentication system (sign up, sign in, email verification, password reset)
- Session management with device tracking
- User settings (profile, password, email, appearance)
- Modern UI components via shadcn/vue
- Deployment-ready configuration with Kamal

---

## Architecture Overview

### Technology Stack

| Layer | Technology |
|-------|------------|
| Backend Framework | Rails 8.1 |
| Frontend Framework | Vue 3.5 + TypeScript |
| Build Tool | Vite 7 |
| CSS Framework | Tailwind CSS 4 |
| UI Components | shadcn/vue (Reka UI based) |
| SPA Adapter | Inertia.js |
| Database | SQLite 3 |
| Testing | RSpec (backend), Vue Test Utils (frontend) |
| Deployment | Kamal + Docker |

### Directory Structure

```
sit-stay/
├── app/
│   ├── controllers/       # Rails controllers (handle HTTP requests)
│   ├── frontend/          # Vue.js frontend application
│   │   ├── components/    # Reusable Vue components
│   │   │   └── ui/        # shadcn/vue component library
│   │   ├── composables/   # Vue composition functions
│   │   ├── entrypoints/   # Vite entry points
│   │   ├── layouts/       # Page layout components
│   │   ├── pages/         # Inertia page components
│   │   ├── routes/        # Generated route definitions (js-routes)
│   │   └── types/         # TypeScript type definitions
│   ├── models/            # ActiveRecord models
│   ├── mailers/           # Email templates
│   └── views/             # ERB templates (email, layout)
├── config/                # Rails configuration
├── db/                    # Database schema and migrations
├── spec/                  # RSpec tests
├── .agent/docs/           # Agent tooling documentation
└── prompts/               # AI assistant prompts
```

### Request Flow (Inertia.js)

1. **User navigates** → Browser makes request to Rails
2. **Rails controller** → Processes request, prepares data
3. **Inertia response** → Renders Vue component with props
4. **Vue frontend** → Displays UI, handles interactions
5. **Form submission** → Inertia XHR request back to Rails

---

## Key Components

### Backend (Rails)

| Component | File(s) | Purpose |
|-----------|---------|---------|
| Application Controller | `app/controllers/application_controller.rb` | Base controller with authentication |
| Sessions Controller | `app/controllers/sessions_controller.rb` | User login/logout |
| Users Controller | `app/controllers/users_controller.rb` | User registration |
| User Model | `app/models/user.rb` | User entity with secure password |
| Session Model | `app/models/session.rb` | User session tracking |
| Current Model | `app/models/current.rb` | Thread-safe request context |

### Frontend (Vue)

| Component | Location | Purpose |
|-----------|----------|---------|
| Entry Point | `app/frontend/entrypoints/inertia.ts` | App initialization, Inertia setup |
| App Layout | `app/frontend/layouts/AppLayout.vue` | Main application shell with sidebar |
| Auth Layout | `app/frontend/layouts/AuthLayout.vue` | Authentication pages layout |
| UI Components | `app/frontend/components/ui/` | shadcn/vue component library |
| Page Components | `app/frontend/pages/` | Inertia page views |
| Type Definitions | `app/frontend/types/index.d.ts` | Shared TypeScript interfaces |

### Database Schema

```
users
├── id (integer, primary key)
├── name (string, required)
├── email (string, unique, required)
├── password_digest (string, required)
├── verified (boolean, default: false)
└── timestamps

sessions
├── id (integer, primary key)
├── user_id (integer, foreign key → users)
├── user_agent (string)
├── ip_address (string)
└── timestamps
```

---

## Development Guidelines

### Core Rules (from AGENTS.md)

> ⚠️ **No file deletions** without explicit permission  
> ⚠️ **No destructive git commands** without explicit confirmation

1. **No batch scripts on code files** — Make manual edits
2. **No backward-compat shims** — Pre-launch project, do it right
3. **No file proliferation** — Modify existing files, never create `*_v2.*`
4. **Console output** — Colorful, detailed, informative
5. **Unknown libraries** — Search for current docs before using

### Agent Workflow

Every task follows this flow:

1. **Register** — `register_agent(project_key, agent_name)`
2. **Reserve files** — `file_reservation_paths(...)` before editing
3. **Pick work** — `bd ready --json` for Beads tasks
4. **Announce** — `send_message(..., thread_id="bd-###")`
5. **Work** — Edit, test, commit (run `ubs <files>` before commit)
6. **Complete** — `bd close`, release reservations, final message

### Code Conventions

**Ruby (Backend):**
- Rails 8 conventions (Omakase)
- RuboCop enforced styling
- RSpec for testing
- Brakeman for security scanning

**TypeScript/Vue (Frontend):**
- ESLint + Prettier enforced
- `<script setup lang="ts">` composition API
- Type-safe props and emits
- Path aliases: `@/` → `app/frontend/`

### Testing

```bash
# Backend tests
bin/rspec

# Frontend linting/type checking
npm run lint
npm run check
```

### CI Pipeline

The GitHub Actions CI runs:
1. **lint_js** — Prettier, ESLint, TypeScript checks
2. **scan_ruby** — Brakeman security scan, bundler-audit
3. **lint** — RuboCop style checking
4. **test** — RSpec with database preparation

---

## Agent Tooling

The project includes several AI agent coordination tools:

| Tool | Doc | Purpose |
|------|-----|---------|
| MCP Agent Mail | `.agent/docs/mcp-agent-mail.md` | Multi-agent coordination, file reservations |
| Beads + bv | `.agent/docs/beads-bv.md` | Dependency-aware task planning |
| UBS | `.agent/docs/ubs.md` | Pre-commit bug scanning |
| cass | `.agent/docs/cass.md` | Search agent session history |
| Code Search | `.agent/docs/code-search.md` | ast-grep, ripgrep, warp_grep |

---

## Questions/Clarifications

1. **Project name "sit-stay"** — The codebase is named "sit-stay" but the README refers to "Inertia Rails Vue Starter Kit". Is there a specific domain/purpose for this application beyond being a starter kit?

2. **Beads integration** — The `.agent/docs/beads-bv.md` references Beads for task management, but I didn't find a `.beads/` directory or configuration. Is this tool installed separately?

3. **OpenSpec** — AGENTS.md references `@/openspec/AGENTS.md` for change proposals, but no `openspec/` directory exists. Is this functionality pending setup?

4. **SSR support** — The README mentions optional SSR support. Is there a plan to enable this for production?

5. **Authentication scope** — The current auth system is session-based. Are there plans to add OAuth, social logins, or API token authentication?

---

## Getting Started

```bash
# Install dependencies and setup database
bin/setup

# Start development server
bin/dev

# Open application
open http://localhost:3000
```

---

*Generated by AI assistant following `prompts/claude/01-discovery.md` instructions.*
