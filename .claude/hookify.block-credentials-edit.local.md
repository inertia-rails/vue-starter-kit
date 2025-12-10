---
name: block-credentials-edit
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: (credentials\.yml\.enc|master\.key|\.env\.production|secrets\.yml)$
action: block
---

🛑 **Sensitive credentials file edit blocked!**

You're attempting to edit a sensitive credentials file.

**Why this is blocked:**
- `credentials.yml.enc` - Encrypted credentials, should be edited via `rails credentials:edit`
- `master.key` - Encryption key, should NEVER be edited directly or committed
- `.env.production` - Production secrets, changes need careful review
- `secrets.yml` - Legacy secrets file

**Proper ways to edit credentials:**
```bash
# Edit encrypted credentials (opens in $EDITOR)
EDITOR=vim rails credentials:edit

# For environment-specific credentials
EDITOR=vim rails credentials:edit --environment production
```

**Important:**
- Never commit `master.key` to version control
- Ensure `.gitignore` includes sensitive files
