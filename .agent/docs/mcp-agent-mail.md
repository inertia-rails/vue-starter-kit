# MCP Agent Mail — Multi-Agent Coordination

Mail-like layer for asynchronous agent coordination via MCP tools. Provides identities, inbox/outbox, searchable threads, and file reservations with Git-auditable artifacts.

## Why Use It

- **Prevents collisions** — Explicit file reservations (leases) signal edit intent
- **Reduces token cost** — Messages stored in per-project archive, not context
- **Auditable** — All communication in Git-friendly format

## Core Workflow (Single Agent)

Even working solo, always:

```python
# 1. Register
register_agent(project_key="/abs/path/to/repo", agent_name="Claude")

# 2. Reserve files before editing
file_reservation_paths(
    project_key, agent_name, 
    ["src/**"], 
    ttl_seconds=3600, 
    exclusive=True,
    reason="bd-123"  # Use Beads ID if applicable
)

# 3. Send messages with thread ID
send_message(
    project_key, agent_name,
    to_agent="*",
    thread_id="bd-123",
    subject="[bd-123] Starting auth refactor",
    body="..."
)

# 4. When done, release
release_file_reservations(project_key, agent_name, paths=["src/**"])
```

## Same Repository Workflow

1. `ensure_project` + `register_agent` with repo absolute path
2. `file_reservation_paths(...)` before editing
3. `send_message(..., thread_id="FEAT-123")` to communicate
4. Check inbox: `fetch_inbox`, acknowledge: `acknowledge_message`
5. Fast reads: `resource://inbox/{Agent}?project=<abs-path>&limit=20`

## Cross-Repository Workflow

**Option A (shared bus):** Same `project_key` for both repos, specific patterns (`frontend/**` vs `backend/**`)

**Option B (linked projects):** Separate `project_key` per repo, use `macro_contact_handshake` to link, shared `thread_id` for traceability

## Macros vs Granular Tools

| Use Macros | Use Granular |
|------------|--------------|
| Speed/simplicity | Fine control |
| Smaller models | Complex workflows |
| `macro_start_session` | `register_agent` |
| `macro_prepare_thread` | `send_message` |
| `macro_file_reservation_cycle` | `file_reservation_paths` |

## Worktree Mode (Opt-In)

Enable with `WORKTREES_ENABLED=1` in `.env`:

```bash
# Check identity
mcp-agent-mail mail status .

# Install guards
mcp-agent-mail guard install <project_key> . --prepush

# Trial mode (warn, don't block)
AGENT_MAIL_GUARD_MODE=warn
```

## Guard Usage

Set `AGENT_NAME="YourAgent"` in shell for commits:
- **Pre-commit:** Blocks conflicts with others' exclusive reservations
- **Pre-push:** Catches conflicts in to-be-pushed commits
- **Advisory mode:** `AGENT_MAIL_GUARD_MODE=warn` prints conflicts but proceeds

## Build Slots

For long-running tasks:

```python
acquire_build_slot(project_key, agent_name, "frontend-build", ttl_seconds=3600, exclusive=True)
renew_build_slot(project_key, agent_name, "frontend-build", extend_seconds=1800)
release_build_slot(project_key, agent_name, "frontend-build")
```

## Product Bus (Multi-Repo)

```bash
mcp-agent-mail products ensure MyProduct --name "My Product"
mcp-agent-mail products link MyProduct .
mcp-agent-mail products search MyProduct "bd-123" --limit 50
mcp-agent-mail products inbox MyProduct YourAgent --urgent-only
```

## Common Pitfalls

| Error | Fix |
|-------|-----|
| `from_agent not registered` | `register_agent` in correct `project_key` first |
| `FILE_RESERVATION_CONFLICT` | Wait for expiry, adjust patterns, or use non-exclusive |
| Auth errors | Include bearer token with matching `kid` if JWT+JWKS enabled |
