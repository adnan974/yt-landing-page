#!/usr/bin/env bash
# launch-terminal-windows.sh — Launch a new Windows terminal with Claude Code
# Usage: ./launch-terminal-windows.sh <worktree-absolute-path>

set -euo pipefail

WORKTREE_PATH="${1:?Usage: launch-terminal-windows.sh <worktree-path>}"

# Convert to Windows path (cygpath available in MSYS2/Git Bash, fallback to sed)
if command -v cygpath &>/dev/null; then
  WIN_PATH="$(cygpath -w "$WORKTREE_PATH")"
else
  WIN_PATH="${WORKTREE_PATH//\//\\}"
  WIN_PATH="${WIN_PATH#\\}"   # strip leading backslash
fi

# Prefer Windows Terminal (wt), fallback to plain cmd
if command -v wt &>/dev/null; then
  wt -d "$WIN_PATH" cmd /k claude
else
  start cmd /k "cd /d \"$WIN_PATH\" && claude"
fi
