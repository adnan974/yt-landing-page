# Claude Code Skills — Dev Module

## Available Skills

### Planning
- `/architecture` — Create architecture decision documents
- `/brainstorm` — Facilitate structured ideation sessions
- `/epics-stories` — Transform a PRD into epics and user stories
- `/prd` — Create a comprehensive PRD collaboratively
- `/product-brief` — Create a product brief through discovery

### Development
- `/bug-fix` — Hypothesis-driven debugging assistant
- `/code-review` — Adversarial code review for bugs and quality
- `/commit` — Stage and create a git commit
- `/implement` — Execute an implementation plan
- `/plan-mode` — Orchestrate implementation planning before coding
- `/push-and-create-pr` — Push branch and open a GitHub PR
- `/update-changelog` — Prepend a new entry to CHANGELOG.md

### Documentation
- `/update-living-docs` — Synchronize living documentation from git history

### Workflow
- `/spec-to-pr` — Full pipeline: plan → implement → commit → PR

### Infrastructure
- `/github-cli` — Interact with GitHub via gh CLI
- `/worktree-terminal` — Create or attach a git worktree and launch Claude Code

## Direct Shell Scripts

### Worktree Management (Zero LLM Overhead)
- `.claude/bin/workkflow-terminal.sh` — Pure shell script for git worktree operations
  - **Usage**: `bash .claude/bin/workkflow-terminal.sh <branch> [--new | --remove]`
  - **Benefit**: No Claude model invocation, instant execution
  - **Alternative to**: `/worktree-terminal` skill (when you want pure shell, no LLM cost)

## Templates

Reusable document templates are in `.claude/workflow/templates/`:
- `architecture.template.md`
- `prd.template.md`
- `product-brief.template.md`
- `epics-stories.template.json`

## Notes

- Do not edit `.claude/skills/` directly — files will be overwritten on next install.
- To update skills: re-run the installer from `my-skills`.
