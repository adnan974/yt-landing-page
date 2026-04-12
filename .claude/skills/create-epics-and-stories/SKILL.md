---
description: Transform a PRD into implementable epics and user stories in JSON format
model: sonnet
argument-hint: "[--context <path1,path2,...>] [--yolo]"
---

# Epics & Stories Creator

## Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `{{TEMPLATES_DIR}}` | `.claude/skills/create-epics-and-stories/templates/` | Templates folder |

## Context

If `--context <path1,path2,...>` is provided: read each listed file (paths separated by comma). These files have been pre-selected by the orchestrator as relevant for this task (e.g. PRD, architecture, product brief).

If `--context` is absent: proceed without project context, or ask the user to provide the PRD.

## Flags

- `--yolo`: Skip all user confirmations and generate end-to-end automatically. FR count confirmation (Phase 1), epic approval (Phase 2), and per-epic story confirmations (Phase 3) are all bypassed.

---

## Your Role

You transform a PRD into implementable epics and stories. Focus on user value, not technical layers.

**Output format:** JSON (use `{{TEMPLATES_DIR}}/epics-stories.template.json` as reference)

## Critical Rules

- **Use provided context** - If `--context` is provided, read all listed files before starting (PRD is required — if no PRD is available, ask the user to provide it).
- **Require a PRD** - Cannot create stories without defined requirements
- **User-value epics** - Each epic delivers meaningful user outcomes
- **Complete functionality** - Each story delivers end-to-end user value
- **No forward dependencies** - Story N can only depend on stories 1 to N-1
- **Single dev scope** - Each story completable in one dev session
- **All stories start with `status: "todo"`** - Tracks workflow progression
- **All stories start with `passes: false`** - Will be set to true when tests pass

### Acceptance Criteria Rules (BDD)

- **Declarative, not imperative** - Describe the OUTCOME, not the steps to get there
- **No technical details** - Never mention buttons, fields, APIs, or UI elements in criteria
- **Always include edge cases** - Boundary values, error cases, and limits must be covered
- **Use examples to remove ambiguity** - When a rule involves values, provide a table of examples

---

## Workflow Overview

1. **Extract Requirements** - Pull FRs from PRD
2. **Design Epics** - Group FRs by user value
3. **Create Stories** - Break epics into implementable stories (JSON)
4. **Validate** - Ensure full FR coverage

---

## Phase 1: Extract Requirements

### Input Check

Read all files provided via `--context`. A PRD is required — if none is present, ask the user to provide it. Architecture doc is optional but helpful if available.

### Extract FRs

From the PRD, list all Functional Requirements:
```
FR1: [requirement]
FR2: [requirement]
...
```

Count total FRs. Confirm with user: "I found X functional requirements. Any missing?"

> If `--yolo`: skip confirmation, proceed with extracted FRs immediately.

---

## Phase 2: Design Epics

### Epic Principles

**Good epics (user value):**
- Epic 1: User Authentication (register, login, reset password)
- Epic 2: Content Creation (create, edit, publish posts)
- Epic 3: Social Features (follow, comment, like)

**Bad epics (technical layers):**
- Epic 1: Database Setup ❌
- Epic 2: API Development ❌
- Epic 3: Frontend Components ❌

### Dependency Rules

- Each epic must be **standalone** and functional
- Epic 2 can use Epic 1, but must not require Epic 3
- No circular dependencies

### Epic List Format

Present epics for approval:
```json
{
  "id": 1,
  "title": "Epic Title",
  "goal": "What users can accomplish",
  "frs_covered": ["FR1", "FR2", "FR3"]
}
```

**Every FR must be mapped to an epic.** If one is missing, add it.

Get user approval before proceeding to stories.

> If `--yolo`: skip approval, proceed to Phase 3 immediately.

---

## Phase 3: Create Stories

### Story JSON Format

```json
{
  "id": "1.1",
  "title": "User can register with email",
  "as_a": "visitor",
  "i_want": "to create an account with email and password",
  "so_that": "I can access the platform",
  "status": "todo",
  "acceptance_criteria": [
    {
      "given": "I am a visitor with a valid email",
      "when": "I complete registration",
      "then": "my account is created and I am authenticated"
    },
    {
      "given": "I attempt to register with an already used email",
      "when": "I complete registration",
      "then": "registration is refused with clear feedback"
    }
  ],
  "passes": false
}
```

### Story Status Workflow

Each story has a `status` field that tracks its progression:

```
todo → planned → in_progress → implemented → reviewed → done
```

| Status | Meaning | Set by |
|--------|---------|--------|
| `todo` | Story not started | Default |
| `planned` | Implementation plan created | `/plan` prompt |
| `in_progress` | Development in progress | Developer (manual) |
| `implemented` | Code written, ready for review | Developer (manual) |
| `reviewed` | Code review passed | `/review` prompt |
| `done` | Merged/deployed | Developer (manual) |

**Note:** `status` tracks workflow. `passes` tracks acceptance criteria validation (tests).

---

## Acceptance Criteria: BDD Best Practices

### Declarative vs Imperative Style

Criteria describe the **outcome** (declarative), not the **steps** (imperative).

**Imperative (BAD):**
```
Given I am on the login page
When I type "user@test.com" in the email field
And I type "password123" in the password field
And I click the "Login" button
Then I see the dashboard
```

**Declarative (GOOD):**
```
Given I have valid credentials
When I authenticate
Then I access my dashboard
```

Why? The imperative style is coupled to the UI. If you change a button to a gesture, the criterion breaks. The declarative style describes the business rule, not the implementation.

### No Technical Details in Criteria

**BAD (coupled to implementation):**
- "the Submit button is disabled" ❌
- "the API returns a 401" ❌
- "the toast notification appears" ❌
- "data is saved in localStorage" ❌

**GOOD (business outcomes):**
- "submission is prevented" ✅
- "access is denied with clear feedback" ✅
- "the user is informed of the result" ✅
- "preferences are remembered between sessions" ✅

### Edge Cases are Mandatory

Every story must consider:
- **Boundary values** - What happens at 0, at the limit, just above/below?
- **Error cases** - Invalid input, missing data, conflicts
- **Empty states** - No data, first use, cleared data

### Scenario Outline with Examples

When a rule involves values or thresholds, use a **Scenario Outline** with an examples table. Numbers are unambiguous; words are not.

```json
{
  "given": "I have a cart worth <amount>",
  "when": "I proceed to checkout",
  "then": "shipping fees are <fees>",
  "examples": [
    {"amount": 15.00, "fees": 5.00, "note": "Below threshold"},
    {"amount": 49.99, "fees": 5.00, "note": "Just below threshold"},
    {"amount": 50.00, "fees": 0.00, "note": "Exact threshold (free)"},
    {"amount": 100.00, "fees": 0.00, "note": "Well above threshold"},
    {"amount": 0.00, "fees": null, "note": "Empty cart - not allowed?"}
  ]
}
```

**Why use examples?**
- "A young user" means nothing. "Age = 17" is unambiguous.
- Edge cases (0, -1, limit) become visible.
- The table becomes living documentation AND test cases.

### Story Principles

**Good stories:**
- Story 1.1: User can register with email and password
- Story 1.2: User can login with credentials
- Story 1.3: User can reset password via email

**Bad stories:**
- "Set up database" ❌ (no user value)
- "Create all models" ❌ (too large)
- "Login UI" that depends on Story 1.3 API ❌ (forward dependency)

### Database/Entity Rule

Create tables ONLY when the story needs them:
- ❌ Epic 1 Story 1 creates all 50 tables
- ✅ Each story creates only what it needs

### Story Sizing

Each story should be:
- Completable in one dev session
- Testable independently
- Delivering visible user value

### Process Each Epic

For each epic in order:
1. List the FRs it covers
2. Break into 3-8 stories
3. Write acceptance criteria for each (Given/When/Then)
4. Set `passes: false` for all stories
5. Get user confirmation (skip if `--yolo`)
6. Move to next epic

---

## Phase 4: Validate

### Coverage Check

- [ ] Every FR has at least one story
- [ ] No story depends on a future story
- [ ] Each story has clear acceptance criteria
- [ ] Stories are appropriately sized
- [ ] All stories have `status: "todo"`
- [ ] All stories have `passes: false`

### Dependency Check

For each epic:
- Can it function without the next epic? ✅
- Do stories only depend on previous stories? ✅

---

## Final Output

Generate the JSON file following the structure in `{{TEMPLATES_DIR}}/epics-stories.template.json`.

---

## Facilitation Tips

**Epic too technical?**
→ "What can users DO after this epic is done?"

**Story too big?**
→ "Can one developer complete this in a day? Let's split it."

**Missing acceptance criteria?**
→ "How would we test this is working?"

**Forward dependency detected?**
→ "This story needs [X] which comes later. Let's reorder or merge."

**Criteria too imperative (mentions clicks, fields, buttons)?**
→ "This describes HOW, not WHAT. What's the business outcome if we ignore the UI?"

**Criteria mentions technical details (API, database, component)?**
→ "This couples the story to implementation. What does the USER experience?"

**Missing edge cases?**
→ "What happens at 0? At the limit? With invalid input? On first use?"

**Rule involves numbers or thresholds?**
→ "Let's add an examples table. What are the boundary values? What's the exact threshold behavior?"
