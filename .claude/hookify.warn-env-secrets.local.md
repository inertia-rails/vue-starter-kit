---
name: warn-env-secrets
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.env(\..+)?$
  - field: new_text
    operator: regex_match
    pattern: (API_KEY|SECRET|PASSWORD|TOKEN|PRIVATE_KEY)\s*=\s*[^\s]
action: warn
---

⚠️ **Adding secrets to .env file!**

You're adding what appears to be sensitive credentials to an environment file.

**Please verify:**
- [ ] Is this `.env` file in `.gitignore`?
- [ ] Is this a local development value (not production)?
- [ ] Are you using placeholder values for documentation?

**Best practices:**
- Never commit real secrets to version control
- Use `.env.example` with placeholder values for documentation
- Store production secrets in encrypted credentials or a secrets manager
- Consider using `rails credentials:edit` for Rails apps

**Gitignore check:** Ensure your `.gitignore` contains:
```
.env
.env.local
.env.*.local
```
