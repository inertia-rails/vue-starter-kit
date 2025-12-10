---
name: block-dangerous-rm
enabled: true
event: bash
pattern: rm\s+(-[a-zA-Z]*r[a-zA-Z]*\s+.*-[a-zA-Z]*f|(-[a-zA-Z]*f[a-zA-Z]*\s+.*)?-[a-zA-Z]*r[a-zA-Z]*f|-rf|-fr)
action: block
---

🛑 **Dangerous rm command blocked!**

You attempted to run a recursive force-delete command (`rm -rf` or similar).

**Why this is blocked:**
- Can permanently delete important files
- No confirmation prompt
- No recovery from mistakes

**Alternatives:**
- Use `rm -ri` for interactive deletion (prompts for each file)
- Move files to trash: `gio trash <path>` or `trash-put <path>`
- First list what would be deleted: `find <path> -type f`
- For specific files: `rm <specific-file>` without recursive flag

**If you really need to run this command:**
1. Disable this rule temporarily: Edit `.claude/hookify.block-dangerous-rm.local.md` and set `enabled: false`
2. Run your command manually in a separate terminal
3. Re-enable the rule
