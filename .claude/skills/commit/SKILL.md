---
description: Stage all changes and create commit (use with caution)
model: haiku
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*), Bash(git log:*)
argument-hint: "[--yolo]"
---

# Commit Everything

⚠️ **CAUTION**: Stage ALL changes and commit. Use only when confident all changes belong together.

## Flags

- `--yolo`: Skip all user confirmations and commit end-to-end automatically. Steps 2 (split evaluation) and 5 (confirmation) are bypassed — single commit is always used, and execution proceeds immediately after safety checks pass. **Steps 3, 4, 6, and 7 are NEVER skipped regardless of flags.**

## Workflow

### 0. Load Convention

**Read configuration:**

```bash
cd /path/to/project/root  # Find project root (contains config.yaml)
convention=$(yq eval '.commit.convention // "conventional-commits"' src/modules/dev/config.yaml)
```

If `src/modules/dev/config.yaml` does not exist or `commit.convention` is not set, default to `"conventional-commits"`.

**Load convention file:**

```bash
convention_file="src/modules/dev/domain/02_developpement/commit/conventions/${convention}.md"
```

If the convention file does not exist, stop and display:
```
❌ Convention not found: ${convention}
Supported conventions: conventional-commits, gitmoji, karma, github-flow, semantic
```

**Read convention file content** for reference during commit message generation (used in Step 4).

### 1. Analyze Changes

Run in parallel:

- `git status` - Show modified/added/deleted/untracked files
- `git diff --stat` - Show change statistics
- `git log -1 --oneline` - Show recent commit for message style

### 2. Evaluate Commit Scope

> If `--yolo` flag is active, skip this entire step and proceed directly to Step 3 with a single commit.

**Analyze if changes should be split into multiple commits:**

**Indicators for multiple commits:**

- Changes span unrelated features/concerns
- Mix of types: e.g., `feat` + `fix` + `docs` + `refactor`
- Changes in independent areas (e.g., `frontend/` AND `backend/`)
- Bug fix mixed with new feature
- Config changes mixed with code changes
- Test additions for different features

**Grouping Rules:**

1. **By type**: Group `docs` separately from `feat` or `fix`
2. **By feature**: Group files related to the same feature/module
3. **By concern**: Separate refactoring from functional changes
4. **By independence**: Files that don't depend on each other → separate commits

**If split is recommended, present:**

```
📦 Suggested Commit Split:

Commit 1 (feat): User authentication
  - src/auth/login.ts
  - src/auth/session.ts
  - tests/auth.test.ts

Commit 2 (fix): Fix navbar alignment
  - src/components/navbar.css

Commit 3 (docs): Update API documentation
  - docs/api.md
  - README.md

Options:
  [1] Proceed with split (recommended)
  [2] Commit everything together
  [3] Let me choose files manually
```

**WAIT for user choice before proceeding.**

**If user chooses split:**

- Process each commit group sequentially
- For each group: stage files → generate message → commit → verify
- Continue to next group until all committed

**If single commit is appropriate**, continue to next step.

### 3. Safety Checks

**❌ STOP and WARN if detected:**

- Secrets: `.env*`, `*.key`, `*.pem`, `credentials.json`, `secrets.yaml`, `id_rsa`, `*.p12`, `*.pfx`, `*.cer`
- API Keys: Any `*_API_KEY`, `*_SECRET`, `*_TOKEN` variables with real values (not placeholders like `your-api-key`, `xxx`, `placeholder`)
- Large files: `>10MB` without Git LFS
- Build artifacts: `node_modules/`, `dist/`, `build/`, `__pycache__/`, `*.pyc`, `.venv/`
- Temp files: `.DS_Store`, `thumbs.db`, `*.swp`, `*.tmp`

**API Key Validation:**
Check modified files for patterns like:

```bash
OPENAI_API_KEY=sk-proj-xxxxx  # ❌ Real key detected!
AWS_SECRET_KEY=AKIA...         # ❌ Real key detected!
STRIPE_API_KEY=sk_live_...    # ❌ Real key detected!

# ✅ Acceptable placeholders:
API_KEY=your-api-key-here
SECRET_KEY=placeholder
TOKEN=xxx
API_KEY=<your-key>
SECRET=${YOUR_SECRET}
```

**✅ Verify:**

- `.gitignore` properly configured
- No merge conflicts
- API keys are placeholders only

### 4. Generate Commit Message

Analyze changes and create a commit message following the loaded convention.

**Use the convention file loaded in Step 0 as the format specification.**

For example:
- If convention is `conventional-commits`: Follow format from `conventional-commits.md`
- If convention is `gitmoji`: Follow format from `gitmoji.md`
- If convention is `karma`: Follow format from `karma.md`
- If convention is `github-flow`: Follow format from `github-flow.md`
- If convention is `semantic`: Follow format from `semantic.md`

**Generic guidelines (apply to all conventions):**

1. Read the convention file to understand format rules
2. Analyze the change scope to determine type/emoji/category
3. Write the message following the convention format
4. Validate against the convention rules (length limits, required fields, etc.)

### 5. Request Confirmation

> If `--yolo` flag is active, skip this entire step and proceed directly to Step 6.

Present summary:

```
📊 Changes Summary:
- X files modified, Y added, Z deleted
- Total: +AAA insertions, -BBB deletions

🔒 Safety: ✅ No secrets | ✅ No large files | ⚠️ [warnings]
🌿 Branch: [name]
📋 Convention: [loaded convention name]

📝 Commit message:
[Generated commit message]

Type 'yes' to proceed or 'no' to cancel.
```

**WAIT for explicit "yes" before proceeding.**

### 6. Execute (After Confirmation)

```bash
git add .
git commit -m "$(cat <<'EOF'
[Generated commit message]
EOF
)"
git log -1 --oneline --decorate  # Verify
```

### 7. Confirm Success

```
✅ Successfully committed!

Commit: [hash]
Branch: [branch]
Files changed: X (+insertions, -deletions)
📋 Convention: [loaded convention name]

📝 Full commit message:
[Generated commit message]
```

## Error Handling

- **Convention file not found**: Stop with helpful message listing supported conventions
- **config.yaml not found**: Use default "conventional-commits"
- **git add fails**: Check permissions, locked files, verify repo initialized
- **git commit fails**: Fix pre-commit hooks, check git config (user.name/email)

## When to Use

✅ **Good:**

- Multi-file documentation updates
- Feature with tests and docs
- Bug fixes across files
- Project-wide formatting/refactoring
- Configuration changes

❌ **Avoid:**

- Uncertain what's being committed
- Contains secrets/sensitive data
- Merge conflicts present
- Want granular commit history
- Pre-commit hooks failing

## Alternatives

If user wants control, suggest:

1. **Selective staging**: Review/stage specific files
2. **Interactive staging**: `git add -p` for patch selection

**⚠️ Remember**: Always review changes before committing. When in doubt, use individual git commands for more control.
