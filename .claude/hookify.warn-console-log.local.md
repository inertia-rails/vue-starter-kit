---
name: warn-console-log
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.(js|ts|jsx|tsx)$
  - field: new_text
    operator: regex_match
    pattern: console\.(log|debug|info|warn|error)\(
action: warn
---

⚠️ **Console statement detected in JavaScript/TypeScript!**

You're adding a `console.*` statement to production code.

**Why this matters:**
- Debug logs shouldn't ship to production
- Console output can expose sensitive data
- Affects browser performance
- Clutters developer tools

**Better alternatives:**
- Use a proper logging library (e.g., `pino`, `winston`)
- Use conditional logging: `if (process.env.NODE_ENV === 'development')`
- Use debugger breakpoints instead
- Remove before committing

**If intentional:** Consider using a structured logger that can be disabled in production.
