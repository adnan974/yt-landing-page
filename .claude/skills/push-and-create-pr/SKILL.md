---
name: push-and-create-pr
description: Push the current branch to remote and open a pull request via a provider skill. Use when the user wants to publish their branch and create a PR in one step. Accepts a --provider flag (default: github-cli) that selects which provider skill handles PR creation (e.g. github-cli, gitlab-cli). Triggers on phrases like "push and create PR", "publish branch and open PR", "push + PR", "ouvre une PR", or any request combining git push with PR creation.
model: haiku
allowed-tools: Bash(git push:*), Bash(git remote:*), Bash(git branch:*), Bash(git status:*)
argument-hint: "[--provider <github-cli|gitlab-cli>] [--yolo]"
---

# Push and Create PR

Push the current branch to remote, then delegate PR creation to the selected provider skill.

## Step 1 — Parse Input

Extract from the user's message:

- `--provider <name>` — provider skill to use for PR creation (default: `github-cli`)

## Step 2 — Push to Remote

Run:

```bash
git remote -v
git branch --show-current
```

Then push:

```bash
git push --set-upstream origin <current-branch>
```

### Push Error Handling

| Error | Action |
|-------|--------|
| `fatal: 'origin' does not exist` / no remote listed | Stop. Display: "No remote configured. Add one with: `git remote add origin <url>`" |
| `error: failed to push some refs` (non-fast-forward) | Stop. Display: "Push rejected — remote has changes not in your local branch. Run `git pull --rebase` first." |
| `Permission denied` / `Authentication failed` / `403` | Stop. Display: "Authentication failure. Check your credentials or run `gh auth login` / `glab auth login`." |
| `fatal: The current branch has no upstream` | Use `--set-upstream origin <branch>` (already included above). If it still fails, report the raw error. |

If push succeeds, confirm: "Branch pushed to origin/<branch>."

## Step 3 — Delegate PR Creation

Look up the skill named `<provider>` in the available skills. If no matching skill is found, stop and display: "No skill found for provider `<provider>`. Install a `<provider>` skill first."

If the skill exists, invoke it with the intent to create a PR. Pass all context from the user's original message (draft preference, title hints, target base branch) so the provider skill does not re-ask for already-provided information.

> The branch is already pushed — tell the provider skill not to push again.
