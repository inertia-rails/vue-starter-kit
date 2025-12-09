# cass — Coding Agent Session Search

Search and retrieve past agent session content across Claude Code, Codex, Cursor, Gemini, Aider, ChatGPT.

## Quick Start

```bash
# Health check (exit 0=ok, 1=run index first)
cass health --json

# Search across all histories
cass search "authentication error" --robot --limit 5

# View specific result
cass view /path/to/session.jsonl -n 42 --json

# Expand context around a line
cass expand /path/to/session.jsonl -n 42 -C 3 --json

# Full API discovery
cass capabilities --json
cass robot-docs guide
```

## Key Flags

| Flag | Purpose |
|------|---------|
| `--robot` / `--json` | Machine-readable output (required!) |
| `--fields minimal` | Reduce payload: `source_path`, `line_number`, `agent` only |
| `--limit N` | Cap result count |
| `--agent NAME` | Filter to claude, codex, cursor, etc. |
| `--days N` | Limit to recent N days |

**stdout = data only, stderr = diagnostics. Exit 0 = success.**

## Robot Mode

- Always use `--robot` or `--json` — never bare `cass` (launches TUI)
- Prefer `cass --robot-help` and `cass robot-docs <topic>` for machine-first docs
- Use `--color=never` in non-TTY automation for ANSI-free output

## Auto-Correction

cass auto-corrects common mistakes:
- `-robot` → `--robot` (long flags need double-dash)
- `find "query"` → `search "query"` (alias normalization)
- `--Robot` → `--robot` (case normalization)

Run `cass robot-docs` for complete alias list.

## Health Check Workflow

```bash
cass health --json  # Exit 0=healthy, 1=unhealthy
# If unhealthy:
cass index --full   # Build index
# Then proceed with searches
```

## Exit Codes

| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | Continue |
| 1 | Unhealthy | Run `cass index --full` |
| 2 | Usage error | Fix syntax |
| 3 | Missing index | Run `cass index` |
