---
description: Create or attach a git worktree and launch Claude Code in it
model: haiku
allowed-tools: Bash(git worktree:*), Bash(git fetch:*), Bash(git show-ref:*), Bash(mkdir:*), Bash(bash:*)
argument-hint: "<branch> [--new] [--remove]"
---

# Worktree Terminal

Crée ou attache un git worktree, puis indique comment lancer Claude Code dedans.

## Arguments

`$ARGUMENTS` peut contenir :

- `<branch>` — nom de la branche (obligatoire)
- `--new` — créer une nouvelle branche depuis `origin/main`
- `--remove` — supprimer le worktree existant

## Workflow

### 1. Parser les arguments

Depuis `$ARGUMENTS` extraire :
- `BRANCH` = premier argument non-flag
- `FLAG_NEW` = présence de `--new`
- `FLAG_REMOVE` = présence de `--remove`

> Si `BRANCH` est vide → erreur : "branch name required"

### 2. Exécuter

**Si `--remove`** :
```bash
git worktree remove .claude/worktrees/$BRANCH
```
→ Afficher `✓ Worktree supprimé : .claude/worktrees/<BRANCH>` et stopper.

**Si `.claude/worktrees/$BRANCH` existe déjà** → rien à créer, continuer vers l'étape 3.

**Si `--new`** :
```bash
mkdir -p .claude/worktrees
git fetch origin main
git worktree add -b $BRANCH .claude/worktrees/$BRANCH origin/main
```

**Sinon** (attacher une branche locale existante) :
```bash
git show-ref --verify --quiet refs/heads/$BRANCH
mkdir -p .claude/worktrees
git worktree add .claude/worktrees/$BRANCH $BRANCH
```

> Si `git show-ref` échoue → erreur : "branch '$BRANCH' not found locally. Use --new to create it."

### 3. Lancer un nouveau terminal

Détecter l'OS et appeler le script approprié :

**Windows** (`$OS == "Windows_NT"` ou `$OSTYPE` contient `msys`/`cygwin`) :
```bash
bash .claude/skills/worktree-terminal/scripts/launch-terminal-windows.sh .claude/worktrees/$BRANCH
```

**Linux** :
```bash
bash .claude/skills/worktree-terminal/scripts/launch-terminal-linux.sh .claude/worktrees/$BRANCH
```

### 4. Afficher le résultat

```
✓ Worktree prêt : .claude/worktrees/<BRANCH>
✓ Terminal lancé dans le worktree avec Claude Code
```

> Si le script échoue, afficher le fallback :
> `→ Lancer manuellement : cd .claude/worktrees/<BRANCH> && claude`
