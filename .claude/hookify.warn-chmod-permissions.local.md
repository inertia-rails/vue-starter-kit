---
name: warn-chmod-permissions
enabled: true
event: bash
pattern: chmod\s+(777|666|775|755\s+/)
action: warn
---

⚠️ **Potentially dangerous permission change detected!**

**Why this matters:**
- `777` - World-writable, major security risk
- `666` - World-readable/writable files
- `775` - Group-writable directories
- `755 /` - Recursive permission change from root

**Security implications:**
- World-writable files can be modified by any user
- Can expose sensitive data
- May allow arbitrary code execution

**Better alternatives:**
- Use specific permissions: `chmod 644` for files, `chmod 755` for executables
- Limit to owner: `chmod 600` for sensitive files
- Use groups properly instead of world permissions

**If you need these permissions:** Verify this is intentional and understand the security implications.
