# UBS — Ultimate Bug Scanner

AI agent's pre-commit bug checker. Flags likely bugs early.

## Golden Rule

```bash
ubs <changed-files>  # Before every commit
# Exit 0 = safe, Exit >0 = fix & re-run
```

## Commands

```bash
# Specific files (<1s) — USE THIS
ubs file.py file2.py

# Staged files — before commit
ubs $(git diff --name-only --cached)

# Language filter (3-5x faster)
ubs --only=rust,toml src/

# CI mode — before PR
ubs --ci --fail-on-warning .

# Whole project (auto-ignores target/, Cargo.lock, etc.)
ubs .

# Debug
ubs --help
ubs sessions --entries 1  # Tail latest session log
```

## Output Format

```
⚠️  Category (N errors)
    file.py:42:5 – Issue description
    💡 Suggested fix
Exit code: 1
```

Parse: `file:line:col` → location | `💡` → fix | Exit 0/1 → pass/fail

## Fix Workflow

1. Read finding → category + fix suggestion
2. Navigate `file:line:col` → view context
3. Verify real issue (not false positive)
4. Fix root cause (not symptom)
5. Re-run `ubs <file>` → exit 0
6. Commit

## Bug Severity

| Level | Examples | Action |
|-------|----------|--------|
| **Critical** | Memory safety, use-after-free, data races, SQL injection | Always fix |
| **Important** | Unwrap panics, resource leaks, overflow | Fix for production |
| **Contextual** | TODO/FIXME, println! debug | Use judgment |

## Speed Critical

**Scope to changed files.** `ubs src/file.py` (<1s) vs `ubs .` (30s). Never full scan for small edits.

## Anti-Patterns

| Don't | Do |
|-------|-----|
| Ignore findings | Investigate each |
| Full scan per edit | Scope to file |
| Fix symptom (`if let Some(x)...`) | Fix root cause (`opt?` or proper error) |
