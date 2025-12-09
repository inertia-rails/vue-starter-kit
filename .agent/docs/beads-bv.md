# Beads + bv — Dependency-Aware Task Planning

Beads provides a lightweight issue database with dependency tracking. bv is a terminal UI/sidecar that computes graph metrics. Together they power structured task execution.

## Conventions

- **Beads** = single source of truth for task status/priority/dependencies
- **Agent Mail** = conversation, decisions, attachments (audit trail)
- **Shared ID** = Use Beads issue ID (`bd-123`) as Mail `thread_id`

## Agent Workflow

```bash
# 1. Pick ready work (no blockers, highest priority)
bd ready --json

# 2. Reserve edit surface (in Agent Mail)
file_reservation_paths(project_key, agent_name, ["src/**"], 
    ttl_seconds=3600, exclusive=True, reason="bd-123")

# 3. Announce start
send_message(..., thread_id="bd-123", subject="[bd-123] Start: <title>")

# 4. Work, update progress in-thread

# 5. Complete
bd close bd-123 --reason "Completed"
release_file_reservations(project_key, agent_name, paths=["src/**"])
send_message(..., thread_id="bd-123", subject="[bd-123] Completed")
```

## ID Mapping

| System | Value |
|--------|-------|
| Mail `thread_id` | `bd-###` |
| Mail subject | `[bd-###] ...` |
| File reservation `reason` | `bd-###` |
| Commit message | Include `bd-###` |

## bv Robot Commands

bv precomputes dependency metrics so you don't have to:

```bash
# All robot commands
bv --robot-help

# Graph metrics (PageRank, critical path, cycles)
bv --robot-insights

# Execution plan with parallel tracks
bv --robot-plan

# Priority recommendations with reasoning
bv --robot-priority

# Available recipes (filters/sorts)
bv --robot-recipes
bv --recipe actionable  # Apply a recipe

# Diff since commit/date
bv --robot-diff --diff-since main
```

## Pitfalls

- **Don't manage tasks in Mail** — Beads is the task queue
- **Always include `bd-###`** in message `thread_id` to avoid ID drift
- **Use bv robot commands** instead of parsing JSONL or writing graph logic
