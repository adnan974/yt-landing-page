---
description: Prepend a new entry to CHANGELOG.md based on commit type and message
model: haiku
allowed-tools: Read, Edit, Bash(git add:*)
argument-hint: "<commit-type> <commit-message>"
---

# Update Changelog

Prepend a new entry to `CHANGELOG.md` at the project root, then stage the file.

## Input

The caller must provide:
- **Commit type** — conventional commit type (e.g. `feat`, `fix`, `refactor`)
- **Commit message subject** — the summary line of the commit message

## Workflow

### 1. Map type to changelog section

| Commit type | Changelog section |
|-------------|-------------------|
| `feat` | `Added` |
| `fix` | `Fixed` |
| `refactor`, `perf` | `Changed` |
| `docs`, `style`, `chore`, `build`, `ci`, `test` | `Changed` |

If the diff or commit subject indicates a removal/deletion (e.g. `chore: Remove ...`), use `Removed`.

### 2. Write the entry

**Date header:** Use today's date (`YYYY-MM-DD`).

- If `CHANGELOG.md` already starts with `## [YYYY-MM-DD]` matching today, append under the existing section instead of adding a duplicate header.
- Otherwise, prepend a new `## [YYYY-MM-DD]` block after the `# Changelog` header line.

**Entry format:**

```markdown
## [YYYY-MM-DD]

### Added / Changed / Fixed / Removed

- <commit message subject>
```

### 3. Stage the file

```bash
git add CHANGELOG.md
```

> `CHANGELOG.md` must be staged **before** the caller runs `git commit` so it is included in the same commit as the code changes.

## Output

Confirm with a single line:

```
✅ CHANGELOG.md updated and staged ([section]: <subject>)
```
