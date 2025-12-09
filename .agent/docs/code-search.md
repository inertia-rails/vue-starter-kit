# Code Search — ast-grep, ripgrep, warp_grep

Three tools for different search needs. Pick based on what you know.

## Decision Matrix

| Scenario | Tool | Why |
|----------|------|-----|
| "How is auth implemented?" | `warp_grep` | Exploratory, unknown location |
| "Find all `useQuery(` calls" | `ripgrep` | Known pattern, fast |
| "Rename `getUserById` → `fetchUser`" | `ast-grep` | Structural refactor |
| "Replace all `var` with `let`" | `ast-grep` | Codemod, avoid collateral |

## Rule of Thumb

- **Don't know where to look** → `warp_grep` (AI finds it)
- **Know the pattern** → `ripgrep` (fastest)
- **Need AST precision** → `ast-grep` (safest for rewrites)

---

## ripgrep (rg)

Fast text search. Use when pattern is known.

```bash
# Find text
rg -n 'console\.log\(' -t js

# List files only
rg -l 'useQuery\(' -t ts

# Exclude dirs
rg -n 'TODO' --glob '!node_modules/*'
```

---

## ast-grep

AST-aware search/replace. Ignores comments/strings, understands syntax.

```bash
# Find structured code
ast-grep run -l TypeScript -p 'import $X from "$P"'

# Codemod (var → let)
ast-grep run -l JavaScript -p 'var $A = $B' -r 'let $A = $B' -U

# Combine with rg for speed
rg -l -t ts 'useQuery\(' | xargs ast-grep run -l TypeScript -p 'useQuery($A)' -r 'useSuspenseQuery($A)' -U
```

**Use for:** Refactors, codemods, policy enforcement, safe rewrites.

---

## warp_grep (Morph MCP)

AI-powered search. Expands query, greps, reads files, returns synthesized context.

```python
mcp__morph-mcp__warp_grep(
    repoPath="/path/to/project",
    query="How is the appeals system implemented?"
)
```

**Returns:** File paths, line ranges, extracted code snippets.

**Good queries:**
- "How does the moderation appeals flow work?"
- "Where are websocket connections managed?"
- "What services touch the users table?"

**Don't use for:**
- Known function names (use `rg`)
- Boolean "does X exist" checks (use `rg`)
- Quick lookups mid-task (5-10s latency vs 100ms for rg)

---

## Comparison

| Aspect | ripgrep | ast-grep | warp_grep |
|--------|---------|----------|-----------|
| Unit | Line | AST node | File sections |
| Speed | ~100ms | ~500ms | 5-10s |
| False positives | Depends on regex | Low | Low |
| Rewrites | Risky (sed/awk) | Safe, first-class | N/A |
| Best for | Recon, known patterns | Codemods, structure | Understanding, exploration |
