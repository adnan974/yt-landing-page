---
description: Execute an implementation plan - writes code from the plan, runs mandatory validation, and auto-fixes failures.
model: haiku
argument-hint: "<plan-file-path|description>"
---

# Implement Plan

Accepts either a **plan file path** or a **free-text description**. Executes tasks, then runs validation.

---

## Input Detection

Check `$ARGUMENTS`:

- **Path to existing `.md` file** → read the plan file and follow it exactly
- **Free-text description** (anything else) → implement directly from the description (no plan file needed)

---

## Critical Rules

1. **MANDATORY VALIDATION** — After implementation, you MUST run EVERY validation step. NEVER skip. NEVER consider yourself done without running validation.
2. **FIX AFTER NOTIFY** — When validation fails: (1) tell the user what failed, (2) immediately fix it. Only ask the user if you cannot determine the fix.
3. **VALIDATION LOOP** — After fixing, re-run ALL validations. Repeat until all pass. Max 3 cycles, then escalate to user.

---

## Workflow — Plan File

1. **Read plan** — Read the plan file fully.
2. **Execute tasks** — Write/edit files following the plan's tasks and code reference, in dependency order.
3. **Run validation** — Execute EVERY command from the plan's "Validation Steps". Report results. If failures: notify user, fix, re-run all validations (up to 3 cycles).
4. **Complete** — When all validations pass: update story status to `"implemented"` in `docs/epics-stories.json`, mark tasks `[x]` in the plan file.

---

## Workflow — Free-text Description

1. **Understand intent** — Parse the description to identify what needs to be built or changed.
2. **Explore codebase** — Read relevant existing files to understand the context before writing anything.
3. **Implement** — Write/edit files to fulfill the description. Keep changes minimal and focused.
4. **Validate** — Run relevant checks (syntax, tests, lint, or manual verification). If nothing automated applies, verify manually that the output matches the intent.
5. **Complete** — Report what was done and confirm the implementation matches the description.
