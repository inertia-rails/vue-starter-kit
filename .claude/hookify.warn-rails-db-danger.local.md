---
name: warn-rails-db-danger
enabled: true
event: bash
pattern: rails\s+db:(drop|reset|migrate:reset)|rake\s+db:(drop|reset|migrate:reset)
action: warn
---

⚠️ **Destructive database command detected!**

You're about to run a command that could destroy or reset your database.

**Commands detected:**
- `db:drop` - Drops the entire database
- `db:reset` - Drops, creates, and seeds
- `db:migrate:reset` - Drops, creates, and re-runs all migrations

**Before proceeding:**
- [ ] Is this the correct environment? (Check `RAILS_ENV`)
- [ ] Do you have a backup if needed?
- [ ] Are there important records that would be lost?

**Safer alternatives:**
- `rails db:migrate` - Just run pending migrations
- `rails db:rollback` - Undo the last migration
- `rails db:seed` - Just reseed without dropping

**For testing:** Consider using `rails db:test:prepare` instead.
