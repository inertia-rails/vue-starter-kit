<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Project Overview

Vue 3 + TypeScript frontend with Rails 8 API backend.
All agents must register with MCP Agent Mail, reserve files, and log messages—even when working solo.

## Core Rules

> [!CAUTION]
> **No file deletions** without explicit written permission—ask first, receive confirmation.

> [!CAUTION]
> **No destructive git commands** (`reset --hard`, `clean -fd`, `rm -rf`) without user-provided exact command and acknowledgment of consequences.

- **No batch scripts on code files** — Make manual edits or use parallel subagents
- **No backward-compat shims** — Pre-launch, zero users, do it right
- **No file proliferation** — Modify existing files, never create `*_v2.py` or `*_improved.py`
- **Console output** — Colorful, detailed, informative
- **Unknown libraries** — Search for current (mid-2025) docs before using

## Agent Workflow

Every task follows this flow:

1. **Register** — `register_agent(project_key, agent_name)`
2. **Reserve files** — `file_reservation_paths(...)` before editing
3. **Pick work** — `bd ready --json` for Beads tasks
4. **Announce** — `send_message(..., thread_id="bd-###")`
5. **Work** — Edit, test, commit (run `ubs <files>` before commit)
6. **Complete** — `bd close`, release reservations, final message

Use `bd-###` as thread ID for traceability across Beads + Mail.

## Tool Reference

Detailed docs in `.agent/docs/`:

| Tool | Doc | Purpose |
|------|-----|---------|
| cass | [cass.md](.agent/docs/cass.md) | Search agent session history |
| MCP Agent Mail | [mcp-agent-mail.md](.agent/docs/mcp-agent-mail.md) | Multi-agent coordination (register and reserve files) |
| Beads + bv | [beads-bv.md](.agent/docs/beads-bv.md) | Dependency-aware task planning |
| UBS | [ubs.md](.agent/docs/ubs.md) | Bug scanning before commits |
| Code Search | [code-search.md](.agent/docs/code-search.md) | ast-grep, ripgrep, warp_grep |

Open the relevant doc when you need detailed command reference.
