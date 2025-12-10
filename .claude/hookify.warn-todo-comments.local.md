---
name: warn-todo-comments
enabled: true
event: file
conditions:
  - field: new_text
    operator: regex_match
    pattern: (TODO|FIXME|HACK|XXX|BUG)[\s:]+
action: warn
---

📝 **TODO/FIXME comment detected!**

You're adding a code comment that indicates incomplete work.

**Detected patterns:**
- `TODO` - Task to complete
- `FIXME` - Code that needs fixing
- `HACK` - Workaround or technical debt
- `XXX` - Warning about problematic code
- `BUG` - Known bug

**This is a reminder to:**
- [ ] Consider addressing this now if quick
- [ ] Create a beads issue to track this: `bd create --title="..." --type=task`
- [ ] Add your name/date for context: `TODO(username): ...`

**Best practice:** Don't let TODOs pile up. Either fix it now or track it properly.

**To find all TODOs later:**
```bash
grep -rn "TODO\|FIXME\|HACK\|XXX" --include="*.rb" --include="*.js"
```
