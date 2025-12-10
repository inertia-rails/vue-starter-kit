---
name: warn-ruby-debug
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.(rb|rake|erb)$
  - field: new_text
    operator: regex_match
    pattern: (binding\.pry|binding\.irb|byebug|debugger|puts\s+["\'].*debug|Rails\.logger\.debug)
action: warn
---

⚠️ **Debug statement detected in Ruby code!**

You're adding debug code that shouldn't be committed.

**Detected patterns:**
- `binding.pry` / `binding.irb` - Interactive debuggers
- `byebug` / `debugger` - Debugger breakpoints
- `puts` with debug messages
- `Rails.logger.debug`

**Why this matters:**
- Interactive debuggers will halt production
- Debug logs clutter output
- May expose sensitive data

**Better alternatives:**
- Use `Rails.logger.info/warn/error` for production logging
- Remove debuggers before committing
- Use conditional debug blocks in development only

**Before committing:** Remove all debug statements with:
```bash
git diff --cached | grep -E "(binding\.(pry|irb)|byebug|debugger)"
```
