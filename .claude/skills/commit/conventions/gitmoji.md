# Gitmoji Convention

## Format

```
<emoji> <description>

[optional body]

[optional footer(s)]
```

## Gitmoji Types

| Emoji | Name | Purpose | Example |
|-------|------|---------|---------|
| ✨ | sparkles | New feature | `✨ add user authentication` |
| 🐛 | bug | Bug fix | `🐛 fix navbar alignment on mobile` |
| 📚 | books | Documentation | `📚 update API documentation` |
| 🎨 | art | Code style/formatting | `🎨 format code with prettier` |
| ♻️ | recycle | Refactoring | `♻️ extract auth logic to separate module` |
| ⚡ | zap | Performance | `⚡ optimize database queries` |
| ✅ | white_check_mark | Tests | `✅ add unit tests for auth service` |
| 🔧 | wrench | Configuration/tooling | `🔧 update npm dependencies` |
| 🏗️ | building_construction | Build system | `🏗️ upgrade webpack to 5.0` |
| 🤖 | robot | CI/CD | `🤖 add GitHub Actions workflow` |
| 🔒 | lock | Security | `🔒 fix SQL injection vulnerability` |
| 📦 | package | Package/dependency update | `📦 bump react to 18.0` |
| 🚀 | rocket | Deployment/release | `🚀 release version 2.0.0` |
| 💥 | boom | Breaking change | `💥 remove legacy API endpoints` |
| 🔐 | key | Secrets management | `🔐 rotate API keys` |

## Rules

1. **Emoji is mandatory** and must be one of the listed gitmoji types
2. **Description**:
   - Use imperative mood ("add" not "added" or "adds")
   - Do not capitalize first letter after emoji
   - No period at end
   - Maximum 72 characters after emoji
3. **Body** (optional):
   - Separate from description by blank line
   - Wrap at 72 characters
   - Explain what and why, not how
4. **Footer** (optional):
   - Reference issues: `Closes #123`, `Fixes #456`
   - Separate multiple footers with blank lines

## Examples

**Simple feature:**
```
✨ add password reset functionality
```

**Bug fix with body:**
```
🐛 fix form submission on validation error

The form was submitting even when validation failed because
the event handler was not properly canceling the default action.
Now we explicitly call preventDefault() before validation.
```

**Breaking change:**
```
💥 remove legacy authentication API

This endpoint was deprecated 6 months ago. Clients must migrate
to the new JWT-based authentication system.

Closes #1234
```

## Notes

- Gitmoji is visual and emoji-first, making commits scannable in logs
- Different from Conventional Commits in format but similar in semantics
- Tools like `gitmoji-cli` can help select emoji interactively
