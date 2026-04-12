# Semantic Versioning Convention

## Format

Semantic convention aligns commit types with semantic versioning (MAJOR.MINOR.PATCH).

```
<type>: <description>

[optional body]

[optional footer(s)]
```

## Commit Types and Version Impact

| Type | Version Impact | Purpose | Example |
|------|---|---------|---------|
| `BREAKING` | MAJOR | Breaking API changes | `BREAKING: remove authentication v1 endpoints` |
| `feat` | MINOR | New feature | `feat: add password reset functionality` |
| `fix` | PATCH | Bug fix | `fix: correct navbar alignment on mobile` |
| `refactor` | PATCH | Code refactoring | `refactor: extract auth logic to service` |
| `perf` | PATCH | Performance improvement | `perf: optimize database queries` |
| `docs` | None | Documentation only | `docs: update API documentation` |
| `style` | None | Code formatting | `style: remove trailing whitespace` |
| `test` | None | Test additions | `test: add authentication tests` |
| `build` | PATCH | Build system changes | `build: update webpack configuration` |
| `ci` | None | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | None | Maintenance | `chore: update dependencies` |

## Rules

1. **Type is mandatory** and must be one of the listed types
2. **BREAKING prefix indicates major version bump**
   - Can be applied to any type: `BREAKING:`, `BREAKING(scope):`
   - Signals incompatible API changes
3. **Description**:
   - Use imperative mood
   - Do not capitalize first letter
   - No period at end
   - Maximum 72 characters
4. **Body** (optional):
   - Separate from description by blank line
   - Explain what changed and why
   - Wrap at 72 characters
5. **Footer** (optional):
   - `BREAKING CHANGE: description` for breaking changes
   - `Closes #123` for issue references

## Versioning Examples

### Patch Version (1.0.0 → 1.0.1)
```
fix: resolve off-by-one error in loop
```

### Minor Version (1.0.0 → 1.1.0)
```
feat: add user export functionality
```

### Major Version (1.0.0 → 2.0.0)
```
BREAKING: remove deprecated authentication API

The old login endpoint /api/v1/auth has been removed.
Clients must migrate to the new /api/v2/auth endpoint.

BREAKING CHANGE: /api/v1/auth is no longer available
```

## Examples

**Bug fix (triggers patch):**
```
fix: prevent form submission when validation fails
```

**New feature (triggers minor):**
```
feat: add two-factor authentication

Supports TOTP and SMS-based 2FA. Users can enable 2FA
in account settings. Each authentication method can be
configured independently.
```

**Breaking change (triggers major):**
```
BREAKING: change API response format

Response bodies now wrap data in a "payload" field.
Old: { "id": 1, "name": "..." }
New: { "payload": { "id": 1, "name": "..." } }

Migration guide: https://docs.example.com/migration

BREAKING CHANGE: API response structure has changed
```

**Refactoring (typically patch, no version bump):**
```
refactor: simplify authentication service

Extracted password hashing logic into separate utility.
No functional changes to public API.
```

## Integration with Release Process

This convention pairs with automatic versioning tools:

- `semantic-release` automatically determines version bumps
- `standard-version` generates changelogs from commit history
- CI/CD pipelines can automate releases based on commit types

## Key Principles

1. **Version alignment** - Commit type directly maps to semver
2. **Predictable releases** - Tools can automate version bumping
3. **Breaking change clarity** - Always flag incompatibilities
4. **Documentation** - Footers explain version impact
5. **Changelog generation** - Commits become changelog entries
