#!/usr/bin/env bash
# launch-terminal-windows.sh — Launch a new Windows terminal with Claude Code
# Usage: ./launch-terminal-windows.sh <worktree-absolute-path>

set -euo pipefail

WORKTREE_PATH="${1:?Usage: launch-terminal-windows.sh <worktree-path>}"

# Resolve to absolute path
WORKTREE_PATH="$(realpath "$WORKTREE_PATH")"

# Convert to Windows path (cygpath available in MSYS2/Git Bash, fallback to sed)
if command -v cygpath &>/dev/null; then
  WIN_PATH="$(cygpath -w "$WORKTREE_PATH")"
else
  WIN_PATH="${WORKTREE_PATH//\//\\}"
  WIN_PATH="${WIN_PATH#\\}"   # strip leading backslash if present
fi

# Prefer Windows Terminal (wt), fallback to plain powershell
if command -v wt &>/dev/null; then
  wt -d "$WIN_PATH" powershell -NoExit -Command "claude"
else
  start powershell -NoExit -Command "cd '$WIN_PATH'; claude"
fi
