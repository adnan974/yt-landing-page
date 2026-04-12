#!/usr/bin/env bash
# worktree-claude.sh — Create/attach a git worktree and launch Claude Code in it
#
# Usage:
#   ./worktree-claude.sh [<branch>] [--new] [--remove]
#
#   <branch>   Branch name to create or attach
#   --new      Create a new branch from origin/main
#   --remove   Remove the worktree (with confirmation if interactive)

set -euo pipefail

# ── Resolve script dir & repo root ────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git rev-parse --show-toplevel)"
WORKTREE_BASE="${REPO_ROOT}/.claude/worktrees"

# ── Parse arguments ────────────────────────────────────────────────────────────
BRANCH=""
FLAG_NEW=false
FLAG_REMOVE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --new)    FLAG_NEW=true; shift ;;
    --remove) FLAG_REMOVE=true; shift ;;
    -*)       echo "Error: unknown flag '$1'" >&2; exit 1 ;;
    *)        BRANCH="$1"; shift ;;
  esac
done

# ── Interactive branch prompt (no args, TTY only) ──────────────────────────────
if [[ -z "$BRANCH" && -t 0 ]]; then
  echo "Existing worktrees:"
  git worktree list
  echo ""
  read -rp "Branch name: " BRANCH
fi

if [[ -z "$BRANCH" ]]; then
  echo "Error: branch name required" >&2
  exit 1
fi

WORKTREE_PATH="${WORKTREE_BASE}/${BRANCH}"

# ── --remove ───────────────────────────────────────────────────────────────────
if $FLAG_REMOVE; then
  if [[ ! -d "$WORKTREE_PATH" ]]; then
    echo "Error: worktree not found at '$WORKTREE_PATH'" >&2
    exit 1
  fi
  if [[ -t 0 ]]; then
    read -rp "Remove worktree '$BRANCH'? (y/N) " confirm
    [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }
  fi
  git worktree remove "$WORKTREE_PATH"
  echo "✓ Worktree removed: $WORKTREE_PATH"
  exit 0
fi

# ── Create worktree base dir ───────────────────────────────────────────────────
mkdir -p "$WORKTREE_BASE"

# ── Create or attach worktree ─────────────────────────────────────────────────
if [[ -d "$WORKTREE_PATH" ]]; then
  echo "→ Reusing existing worktree: $WORKTREE_PATH" >&2

elif $FLAG_NEW; then
  echo "→ Creating branch '$BRANCH' from origin/main..." >&2
  git fetch origin main
  git worktree add -b "$BRANCH" "$WORKTREE_PATH" origin/main
  echo "✓ Worktree created: $WORKTREE_PATH" >&2

else
  if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
    git worktree add "$WORKTREE_PATH" "$BRANCH"
    echo "✓ Worktree attached: $WORKTREE_PATH" >&2
  else
    echo "Error: branch '$BRANCH' not found locally. Use --new to create it from origin/main." >&2
    exit 1
  fi
fi

# ── Launch Claude in a new terminal window ────────────────────────────────────
echo "→ Launching Claude Code in new terminal..." >&2

if [[ "${OS:-}" == "Windows_NT" || "$OSTYPE" == msys* || "$OSTYPE" == cygwin* ]]; then
  bash "$SCRIPT_DIR/scripts/launch-terminal-windows.sh" "$WORKTREE_PATH"
else
  bash "$SCRIPT_DIR/scripts/launch-terminal-linux.sh" "$WORKTREE_PATH"
fi

echo "✓ Terminal launched: $WORKTREE_PATH"
