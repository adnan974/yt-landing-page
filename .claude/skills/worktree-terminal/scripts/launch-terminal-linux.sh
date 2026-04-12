#!/usr/bin/env bash
# launch-terminal-linux.sh — Launch a new Linux terminal with Claude Code
# Usage: ./launch-terminal-linux.sh <worktree-absolute-path>

set -euo pipefail

WORKTREE_PATH="${1:?Usage: launch-terminal-linux.sh <worktree-path>}"

if command -v gnome-terminal &>/dev/null; then
  gnome-terminal -- bash -c "cd '$WORKTREE_PATH' && claude; exec bash"

elif command -v konsole &>/dev/null; then
  konsole --workdir "$WORKTREE_PATH" -e bash -c "claude; exec bash"

elif command -v xfce4-terminal &>/dev/null; then
  xfce4-terminal --working-directory="$WORKTREE_PATH" -e "bash -c 'claude; exec bash'"

elif command -v xterm &>/dev/null; then
  xterm -e bash -c "cd '$WORKTREE_PATH' && claude; exec bash"

else
  echo "Error: no supported terminal emulator found." >&2
  echo "Install one of: gnome-terminal, konsole, xfce4-terminal, xterm" >&2
  exit 1
fi
