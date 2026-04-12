# Conventional Commits Convention

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | A new feature | `feat: add user authentication` |
| `fix` | A bug fix | `fix: correct navbar alignment on mobile` |
| `docs` | Documentation only | `docs: update API documentation` |
| `style` | Code style changes (formatting, semicolons, etc.) | `style: format code with prettier` |
| `refactor` | Code refactoring without feature change | `refactor: extract auth logic to separate module` |
| `perf` | Performance improvements | `perf: optimize database queries` |
| `test` | Adding or updating tests | `test: add unit tests for auth service` |
| `chore` | Build process, dependencies, tooling | `chore: update npm dependencies` |
| `build` | Build system or external dependency changes | `build: upgrade webpack to 5.0` |
| `ci` | CI/CD configuration changes | `ci: add GitHub Actions workflow` |

## Rules

1. **Type is mandatory** and must be one of the listed types
2. **Scope is optional** but recommended for large changes
3. **Description**:
   - Use imperative mood ("add" not "added" or "adds")
   - Do not capitalize first letter
   - No period at end
   - Maximum 72 characters
4. **Body** (optional):
   - Separate from description by blank line
   - Wrap at 72 characters
   - Explain what and why, not how
5. **Footer** (optional):
   - `BREAKING CHANGE: description` for major version bumps
   - Reference issues: `Closes #123`, `Fixes #456`
   - Separate multiple footers with blank lines

## Examples

**Simple feature:**
```
feat: add password reset functionality
```

**Feature with scope:**
```
feat(auth): add JWT token refresh mechanism
```

**Fix with body:**
```
fix(forms): prevent form submission on validation error

The form was submitting even when validation failed because
the event handler was not properly canceling the default action.
Now we explicitly call preventDefault() before validation.
```

**Breaking change:**
```
refactor(api)!: change authentication endpoint structure

BREAKING CHANGE: The /auth/login endpoint now requires
JSON request body instead of form data.
```

## Mapping to Changelog

- `feat` → Added
- `fix` → Fixed
- `refactor`, `perf` → Changed
- `docs`, `style`, `chore`, `build`, `ci`, `test` → Changed
- Removals → Removed
