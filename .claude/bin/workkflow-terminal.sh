#!/usr/bin/env bash
# workkflow-terminal.sh — Create/attach git worktrees and launch Claude Code
# Pure shell script — no Claude model invocation, zero LLM overhead
#
# Usage:
#   ./workkflow-terminal.sh <branch>              # Attach existing local branch
#   ./workkflow-terminal.sh <branch> --new        # Create new branch from origin/main
#   ./workkflow-terminal.sh <branch> --remove     # Remove worktree
#   ./workkflow-terminal.sh --help                # Show help
#
# Examples:
#   ./workkflow-terminal.sh feature-x
#   ./workkflow-terminal.sh feature-y --new
#   ./workkflow-terminal.sh my-worktree --remove

set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Defaults
BRANCH=""
FLAG_NEW=false
FLAG_REMOVE=false
WORKTREE_DIR=".claude/worktrees"

# ============================================================================
# FUNCTIONS
# ============================================================================

show_help() {
  cat <<EOF
Usage: $(basename "$0") <branch> [FLAGS]

Arguments:
  <branch>          Branch name (required unless using --help)

Flags:
  --new             Create new branch from origin/main (default: attach existing)
  --remove          Remove the worktree
  --help            Show this help message

Examples:
  $(basename "$0") feature-x                # Attach existing local branch
  $(basename "$0") feature-y --new          # Create new branch from origin/main
  $(basename "$0") old-branch --remove      # Remove worktree

Behavior:
  - With --new: Creates new branch 'feature-x' based on origin/main
  - Without --new: Attaches existing local branch 'feature-x'
  - With --remove: Deletes the worktree directory and git reference
  - Launches Claude Code in a new terminal with the worktree
EOF
}

log_error() {
  echo -e "${RED}✗ Error: $1${NC}" >&2
}

log_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

log_info() {
  echo -e "${YELLOW}→ $1${NC}"
}

# ============================================================================
# STEP 0: Parse Arguments
# ============================================================================

if [[ $# -eq 0 || "$1" == "--help" || "$1" == "-h" ]]; then
  show_help
  [[ $# -eq 0 ]] && exit 1 || exit 0
fi

# Extract branch and flags
for arg in "$@"; do
  case "$arg" in
    --new)    FLAG_NEW=true ;;
    --remove) FLAG_REMOVE=true ;;
    --*)      log_error "Unknown flag: $arg"; exit 1 ;;
    *)        BRANCH="$arg" ;;
  esac
done

if [[ -z "$BRANCH" ]]; then
  log_error "branch name required"
  exit 1
fi

WORKTREE_PATH="$WORKTREE_DIR/$BRANCH"

# ============================================================================
# STEP 1: Handle --remove
# ============================================================================

if $FLAG_REMOVE; then
  if [[ -d "$WORKTREE_PATH" ]]; then
    git worktree remove "$WORKTREE_PATH" 2>/dev/null || \
      git worktree remove --force "$WORKTREE_PATH" 2>/dev/null || \
      rm -rf "$WORKTREE_PATH"
    log_success "Worktree removed: $WORKTREE_PATH"
  else
    log_info "Worktree not found: $WORKTREE_PATH"
  fi
  exit 0
fi

# ============================================================================
# STEP 2: Check if worktree already exists
# ============================================================================

if [[ -d "$WORKTREE_PATH" ]]; then
  log_info "Worktree already exists: $WORKTREE_PATH"
  log_info "Skipping creation, proceeding to terminal launch..."
else
  # ========================================================================
  # STEP 3: Create or attach worktree
  # ========================================================================

  mkdir -p "$WORKTREE_DIR"

  if $FLAG_NEW; then
    log_info "Creating new branch '$BRANCH' from origin/main..."
    git fetch origin main >/dev/null 2>&1 || true
    git worktree add -b "$BRANCH" "$WORKTREE_PATH" origin/main || {
      log_error "Failed to create worktree with new branch"
      exit 1
    }
    log_success "New branch created and worktree attached"

  else
    log_info "Attaching existing local branch '$BRANCH'..."

    if ! git show-ref --verify --quiet "refs/heads/$BRANCH"; then
      log_error "branch '$BRANCH' not found locally. Use --new to create it."
      exit 1
    fi

    git worktree add "$WORKTREE_PATH" "$BRANCH" || {
      log_error "Failed to attach worktree to branch '$BRANCH'"
      exit 1
    }
    log_success "Worktree attached to existing branch"
  fi
fi

# ============================================================================
# STEP 4: Detect OS and launch terminal
# ============================================================================

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" || -n "${OS:-}" && "$OS" == "Windows_NT" ]]; then
  OS_TYPE="windows"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  OS_TYPE="macos"
else
  OS_TYPE="linux"
fi

log_info "Launching terminal on $OS_TYPE..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

case "$OS_TYPE" in
  windows)
    LAUNCH_SCRIPT="$SCRIPT_DIR/launch-terminal-with-worktree-windows.sh"
    ;;
  linux|macos)
    LAUNCH_SCRIPT="$SCRIPT_DIR/launch-terminal-with-worktree-linux.sh"
    ;;
esac

# ============================================================================
# STEP 5: Execute terminal launch
# ============================================================================

if [[ -f "$LAUNCH_SCRIPT" ]]; then
  bash "$LAUNCH_SCRIPT" "$WORKTREE_PATH" || {
    log_error "Terminal launch failed"
    echo ""
    echo "Fallback: launch manually:"
    echo "  cd $WORKTREE_PATH && claude"
    exit 1
  }
  log_success "Worktree ready: $WORKTREE_PATH"
  log_success "Terminal launched with Claude Code"
else
  log_info "Launch script not found at $LAUNCH_SCRIPT"
  echo ""
  echo "Fallback: launch manually:"
  echo "  cd $WORKTREE_PATH && claude"
  exit 1
fi

exit 0
