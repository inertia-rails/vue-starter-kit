---
name: warn-production-env
enabled: true
event: bash
pattern: RAILS_ENV=production|--environment=production|-e\s+production
action: warn
---

🚨 **Production environment detected!**

You're about to run a command in the **production** environment.

**This is dangerous because:**
- Changes affect real users
- Data loss may be irreversible
- Downtime impacts your business

**Please verify:**
- [ ] Is this intentional?
- [ ] Have you tested in development/staging first?
- [ ] Do you have a rollback plan?
- [ ] Is this command safe to run in production?

**If this is a mistake:** Cancel this command and remove `RAILS_ENV=production`.
