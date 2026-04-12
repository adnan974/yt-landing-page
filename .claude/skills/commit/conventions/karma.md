# Karma Convention

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Commit Types

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | Feature | `feat(auth): add user authentication` |
| `fix` | Bug fix | `fix(navbar): correct alignment on mobile` |
| `docs` | Documentation | `docs(readme): update installation steps` |
| `style` | Formatting, whitespace, semicolons | `style(code): remove trailing whitespace` |
| `refactor` | Code refactoring without feature change | `refactor(auth): extract logic to service` |
| `perf` | Performance optimization | `perf(db): optimize query with index` |
| `test` | Test additions/modifications | `test(auth): add JWT validation tests` |
| `build` | Build system changes | `build(deps): upgrade webpack` |
| `ci` | CI configuration changes | `ci(github): add test workflow` |
| `chore` | Other changes (dependencies, etc.) | `chore(deps): update npm packages` |

## Rules

1. **Type is mandatory** and must be one of the listed types
2. **Scope is mandatory** (unlike Conventional Commits) - the affected module/feature
3. **Subject**:
   - Use imperative mood
   - Do not capitalize first letter
   - No period at end
   - Maximum 50 characters
4. **Body** (optional):
   - Separate from subject by blank line
   - Explain motivation and contrast with previous behavior
   - Each line maximum 72 characters
5. **Footer** (optional):
   - Breaking changes: `BREAKING CHANGE: description`
   - Issue references: `Closes #123`, `Fixes #456`

## Examples

**Simple feature:**
```
feat(auth): add password reset functionality
```

**Fix with scope and body:**
```
fix(navbar): prevent menu from overlapping content

The navbar position was changed from absolute to fixed in a recent
refactor, but the overflow handling was not updated. This caused
the dropdown menu to be clipped by the document overflow:hidden.

We now ensure the navbar z-index is higher than content.
```

**Breaking change:**
```
feat(api)!: change authentication endpoint structure

BREAKING CHANGE: The /auth/login endpoint now requires
JSON request body instead of form data. Migrate by sending:
  POST /auth/login
  Content-Type: application/json
  { "username": "...", "password": "..." }
```

## Scope Examples

Common scope values:
- `auth` - Authentication module
- `api` - API/backend changes
- `ui`, `navbar`, `form`, `modal` - UI components
- `db` - Database layer
- `build`, `config` - Configuration
- `deps` - Dependencies
- `types` - Type definitions

## Notes

- Karma originated from AngularJS project
- Emphasizes scope over optional body
- Clear separation of concerns by scope
