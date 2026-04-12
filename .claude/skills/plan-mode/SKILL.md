---
description: Orchestrate implementation planning for stories before coding begins using a Plan sub-agent
model: sonnet
argument-hint: "[story-id|description|spec-path] [--context <path1,path2,...>] [--yolo]"
---

# Plan Mode

## Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `{{DOCS_DIR}}` | `docs/` | Project documentation folder (output) |
| `{{SKILLS_DIR}}` | `.claude/skills/` | Skills folder |
| `{{PLANS_DIR}}` | `{{DOCS_DIR}}/plans/` | Plans output folder |
| `{{TEMPLATES_DIR}}` | `.claude/skills/plan-mode/templates/` | Templates folder |

## Context

If `--context <path1,path2,...>` is provided: read each listed file (paths separated by comma). These files have been pre-selected by the orchestrator as relevant for this task (e.g. epics-stories, PRD, architecture, product brief).

If `--context` is absent: proceed without project context. If an epics file or spec is needed and not available, ask the user.

## Flags

- `--yolo`: Skip all user confirmations and run end-to-end automatically. Phase 1 spec confirmation and Phase 7 plan approval are bypassed — spec is accepted as-is and plan is auto-approved.

---

## Your Role

You orchestrate implementation planning for stories before coding begins. You gather context and then delegate the actual planning work to an **isolated Plan sub-agent** to avoid polluting the main conversation context.

**Why sub-agent?** Planning involves extensive file exploration and analysis. Running this in the main context would accumulate intermediate steps and reduce available context for implementation. The sub-agent returns only the final plan.

---

## Critical Rules

- **Use provided context** - If `--context` is provided, read all listed files before starting. These may include epics-stories, PRD, architecture, and product brief.
- **Require a spec** - Cannot plan without a spec (inline text or file path). If not provided, ask the user.
- **Specific files** - Every task must specify exact file paths
- **Dependency order** - Tasks ordered so each builds on previous ones

---

## Workflow

### Phase 1: Identify Spec

Accept the spec from the user in one of two forms:

- **Inline spec** - The user provides the spec directly in the message
- **File path** - The user provides a path to a spec file

**If spec provided directly:** Extract objective, acceptance criteria, and constraints from the text.

**If an epics-stories file is present in `--context`:** Propose using it as the spec source — ask the user which story to plan.

**If nothing provided:** Ask the user: "Please provide a spec (inline text or file path) for what you want to plan."

**Capture `spec_origin`** — used later in the plan header:
- If the spec is a URL (starts with `http://` or `https://`) → `spec_origin = the URL`
- If the spec is a file path → `spec_origin = the file path`
- If the spec is inline text → `spec_origin = the full raw text`

Once spec is loaded, confirm with user: "Planning implementation for: [title]. Correct?"

> If `--yolo`: skip confirmation, proceed immediately.

---

### Phase 2: Detect Architecture

**Check if an architecture file is present in `--context`.**

**If found:**

- Scan for architecture pattern (Clean Architecture, MVC, Hexagonal, etc.)
- Extract: tech stack, folder structure, conventions

**If not found or pattern unclear:**

- Ask user:

  ```
  Which architecture pattern are you using?

  1. Clean Architecture
  2. MVC
  3. Feature-Driven Development
  4. Hexagonal
  5. Other (specify)
  ```

---

### Phase 3: Analyze Context

Before planning, gather context:

**Read project documentation from `--context`:**

- All files provided via `--context` have already been pre-selected as relevant
- Read them to understand vision, requirements, and technical decisions

**Check existing code:**

- Search for related files/patterns in the codebase
- Identify files that will need modification
- Note existing conventions and patterns

**Check project-context.md (if exists):**

- Extract rules and patterns to follow

**Check previous related work:**

- What was already implemented that's relevant?
- What patterns were established?

---

### Phase 5: Launch Plan Sub-agent

Use the **Task tool** with `subagent_type="Plan"` to create the implementation plan in an isolated context.

**Construct the prompt for the sub-agent** with all gathered context:

```
Create an implementation plan for:

## Spec
- Title: {spec_title}
- Objective: {objective}
- Acceptance Criteria:
{acceptance_criteria_list}
- Constraints: {constraints}

## Architecture
- Pattern: {detected_pattern}
- Key principles: {extracted_principles}

## Project Context
- Tech stack: {tech_stack}
- Folder structure: {folder_structure}
- Related files found: {related_files}
- Established patterns: {established_patterns}

## Plan Requirements
Create a plan with:
1. Story Overview (title, objective, architecture)
2. Ordered Tasks - each with:
   - Exact file path
   - Specific action to take
   - **Detailed Code** - the complete code to write (for new files) or the exact changes to apply (for modified files). Include full implementation, not pseudocode.
   - Architecture note (how it follows principles)
   - Dependencies on other tasks
3. Test Tasks - for each AC, include a task to create an acceptance test with **complete test code**
4. AC Coverage table - map each AC to implementation tasks AND test tasks
5. Files Summary - list files to create/modify (including test files)
6. Validation Steps - commands to run after implementation to verify the spec is fulfilled
7. **Complete Code Reference** - a final section grouping all code to create/modify, file by file, with the full content ready to be copy-pasted or written directly

## File Paths
Use paths relative to the project root (e.g. `src/modules/dev/config.yaml`).

## Validation Checklist
Before returning, verify:
- [ ] Every AC is covered by at least one implementation task
- [ ] Every AC has a corresponding test task
- [ ] Tasks ordered by dependency (no forward deps)
- [ ] Every task has a specific file path
- [ ] Every task includes complete, implementable code (not pseudocode or summaries)
- [ ] Architecture principles are respected
- [ ] Validation steps are concrete and runnable
- [ ] Complete Code Reference section contains all files with full content
```

**Launch the sub-agent:**

```
Task tool:
  subagent_type: "Plan"
  prompt: [constructed prompt above]
  description: "Plan: {spec_title}"
```

**Benefits of sub-agent:**
- Explores codebase without polluting main context
- Can read dozens of files, only final plan returns
- Main conversation stays clean for implementation phase

---

### Phase 6: Receive and Save Plan

The Plan sub-agent returns a complete implementation plan. **Always save it immediately** to `{{PLANS_DIR}}/plan-{spec_slug}-{YYYY-MM-DD-HHmm}.md` (datetime = current time at save) before presenting anything to the user. This ensures the plan is never lost regardless of the user's next action.

Use the template in `{{TEMPLATES_DIR}}/plan.template.md` to structure the final document.

The expected plan format follows the structure in `{{TEMPLATES_DIR}}/plan.template.md`, which includes these key sections:

- **Story Overview** - Title, objective, architecture pattern, spec origin
- **Implementation Tasks** - Ordered tasks with files, actions, architecture notes, and complete code
- **Test Tasks** - Acceptance tests with complete test code for each AC
- **AC Coverage** - Table mapping each acceptance criterion to implementation and test tasks
- **Files to Create/Modify** - Summary of all files affected
- **Complete Code Reference** - Full, copy-paste-ready code for each file
- **Validation Steps** - Commands to verify implementation against acceptance criteria

---

### Phase 7: Plan Approval Checkpoint

> If `--yolo`: skip this phase entirely, proceed directly to Phase 9.

The plan is already saved (Phase 6). Present a summary and ask for validation:

```
Plan saved to {{PLANS_DIR}}/plan-{spec_slug}-{YYYY-MM-DD-HHmm}.md

{title}
{task_count} tasks covering {ac_count} acceptance criteria
{files_count} files to create/modify

Ready to implement?
- [y] Yes - Approve plan and start implementation with /implement
- [n] No - Adjust the plan (describe changes needed)
- [s] Save - Plan is already saved, exit for now
```

**If [s]:** Exit. Plan is already saved.

**If [n]:** Re-launch sub-agent with feedback: "Adjust the plan: {user_feedback}". Save updated plan to `{{PLANS_DIR}}/plan-{spec_slug}-{YYYY-MM-DD-HHmm}.md` (overwrite, same datetime as original save).

**If [y]:** Proceed to Phase 9.

---

### Phase 9: Propose Implementation

After plan approval, propose to the user:

```
Plan saved to {plan_file_path}.

Ready to implement? I recommend using /implement {plan_file_path}
This will clear context and run implementation with haiku for speed.

- [y] Yes, launch /implement now
- [n] No, I'll implement later
```

**If [y]:** Tell the user to run `/clear` then `/implement {plan_file_path}` so implementation starts with a clean context window.

**If [n]:** Exit. The user can run `/implement {plan_file_path}` anytime later.

---

## Output Format

The plan should be saved to `{{PLANS_DIR}}/plan-{spec_slug}-{YYYY-MM-DD-HHmm}.md`

---

## Facilitation Tips

**Spec unclear?**
→ "Let me check the acceptance criteria. What does 'success' look like?"

**Architecture conflict?**
→ "The skill says X, but existing code does Y. Which should we follow?"

**Task too vague?**
→ "What exactly changes in this file? Let's be specific."

**Missing file path?**
→ "Where should this code live according to our architecture?"
