---
description: Interact with GitHub repo via gh CLI (PRs, issues, status, review)
model: haiku
allowed-tools: Bash(gh pr:*), Bash(gh issue:*), Bash(gh repo:*), Bash(gh run:*), Bash(git branch:*), Bash(git log:*)
---

# GitHub CLI

Interact with the GitHub repository using natural language. Understands French and English.

## Step 1: Understand Intent

Read the user's message and determine the action:

| User says | Action |
|-----------|--------|
| "statut", "status", "montre les PRs", "show PRs", "vue d'ensemble" | **Repo Status** |
| "crée une PR", "create a PR", "ouvre une PR", "nouvelle PR" | **Create PR** |
| "liste les issues", "show issues", "quelles issues" | **List Issues** |
| "crée une issue", "nouvelle issue", "add issue" | **Create Issue** |
| "ferme l'issue", "close issue #X" | **Close Issue** |
| "vois l'issue", "view issue #X", "détails issue" | **View Issue** |
| "review la PR", "merge la PR", "approve PR #X" | **Review/Merge PR** |

If intent is unclear, ask: "Que veux-tu faire ? (statut du repo, créer une PR, gérer les issues, ou review/merge une PR)"

## Step 2: Pre-flight Check

Before any action, run:

```bash
gh auth status
```

If not authenticated, stop and display:

```
❌ GitHub CLI non authentifié.
Exécute: gh auth login
```

---

## Action: Repo Status

Run in parallel:

```bash
gh pr list --limit 10
gh issue list --limit 10
gh run list --limit 5
```

Display a clean summary:

```
📊 Statut du repo: [repo name]

🔀 Pull Requests ouvertes (X):
  #42  feat: add auth       @user   [ready]
  #38  fix: navbar bug      @user   [draft]

🐛 Issues ouvertes récentes (X):
  #15  Bug login page       @user   [bug]
  #12  Feature request      @user   [enhancement]

⚙️ Derniers runs CI/CD:
  ✅ main  push   2h ago   (2m 14s)
  ❌ feat  PR #42 3h ago   (failed)
```

---

## Action: Create PR

1. Get context:

```bash
git branch --show-current
git log main..HEAD --oneline
```

2. Generate PR title and body from commits:
   - Title: conventional format based on most significant commit
   - Body: markdown list of all commits + "## Changes" section

3. Ask if draft PR: "Créer en draft ? (oui/non)"

4. Show preview and wait for confirmation:

```
📝 PR Preview:

Title: feat: add user authentication

Body:
## Changes
- Add login form component
- Add JWT token handling
- Add session persistence

Branch: feat/auth → main

Confirmer ? (oui/non)
```

5. Execute:

```bash
gh pr create --title "..." --body "..." [--draft]
```

6. Output PR URL on success.

---

## Action: List Issues

```bash
gh issue list --limit 20
```

If user specified filters (label, assignee, milestone), extract and add them:

```bash
gh issue list --label "bug" --assignee "@me" --limit 20
```

Display formatted table with number, title, labels, author.

---

## Action: Create Issue

Extract title from user message if provided (e.g. "crée une issue: bug dans le login" → title = "bug dans le login").

If no title, ask: "Titre de l'issue ?"
Then ask: "Description (optionnel) ?"

```bash
gh issue create --title "..." --body "..."
```

Output issue URL on success.

---

## Action: Close Issue

Extract issue number from user message.

If no number found, run `gh issue list` and ask which one.

Ask for optional comment: "Ajouter un commentaire avant de fermer ? (optionnel)"

```bash
gh issue close <number> [--comment "..."]
```

Confirm: "✅ Issue #X fermée."

---

## Action: View Issue

Extract issue number from user message.

```bash
gh issue view <number>
```

Display title, body, labels, comments, assignees.

---

## Action: Review / Merge PR

1. If no PR number in message, list open PRs and ask:

```bash
gh pr list
```

"Quelle PR ? (numéro)"

2. Show PR details:

```bash
gh pr view <number>
gh pr diff <number> --stat
```

3. Ask what to do:

```
Que veux-tu faire ?
[1] Approuver
[2] Demander des modifications
[3] Merger
```

4. For **approve**:

```bash
gh pr review <number> --approve
```

5. For **request changes** — ask for comment:

```bash
gh pr review <number> --request-changes --body "..."
```

6. For **merge** — ask strategy:

```
Stratégie de merge ?
[1] Squash (recommandé — 1 commit propre)
[2] Merge commit
[3] Rebase
```

Show final confirmation, then:

```bash
gh pr merge <number> --squash|--merge|--rebase --delete-branch
```

Confirm: "✅ PR #X mergée. Branche supprimée."

---

## Error Handling

- `gh: command not found` → "Installe gh: https://cli.github.com"
- `gh auth status` fails → show `gh auth login` instructions
- Branch has no commits ahead of main → warn before creating PR
- PR already exists for branch → show existing PR link
