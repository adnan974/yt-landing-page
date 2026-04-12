---
name: update-living-docs
description: >
  Synchronize all living documentation files after features or fixes have been
  added without going through the full commit workflow. Detects the gap from
  git history automatically, proposes all changes across declared docs, and
  applies them only after user confirmation. Use when you suspect docs are out
  of sync with recent commits.
allowed-tools: Bash, Read, Edit, Grep, Glob
---

# Update Living Docs

## Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `{{CHANGELOG}}` | `CHANGELOG.md` | Changelog file (keepachangelog format) |
| `{{DOCS_DIR}}` | `docs/` | Project documentation folder |
| `{{PRD_FILE}}` | `{{DOCS_DIR}}/prd.md` | PRD location |
| `{{PRODUCT_BRIEF_FILE}}` | `{{DOCS_DIR}}/product-brief.md` | Product brief location |
| `{{EPICS_STORIES_FILE}}` | `{{DOCS_DIR}}/epics-stories.json` | Epics & stories JSON location |

**Resolution:** Search using default path. If not found, skip that doc silently and note it in the preview. Never block on a missing optional doc.

---

## Phase 1 — Detect the gap

Read last documented date from `{{CHANGELOG}}`:

```bash
grep -m1 "^## \[" {{CHANGELOG}}
```

List commits since that date:

```bash
git log --oneline --since="<last_date>" --format="%H %s"
```

Cross-reference commit subjects against the entries already present in the latest changelog block.
Build a list of **undocumented commits** (hash + subject).

If empty → inform the user that all docs are in sync, stop.

---

## Phase 2 — Classify commits

| Prefix | CHANGELOG | Living docs |
|--------|-----------|-------------|
| `feat` | Yes | Yes |
| `fix` | Yes | Yes — only if it changes something already tracked in the living docs |
| `refactor`, `perf`, `chore`, `docs`, `ci`, `style`, `test` | Yes | No |

No prefix → treat as `feat`, flag as ambiguous in the preview.

---

## Phase 3 — Read current state

Read all files that exist among `{{PRD_FILE}}`, `{{PRODUCT_BRIEF_FILE}}`, `{{EPICS_STORIES_FILE}}`.

For each file:
- Read it fully and understand its structure, conventions, and current content
- Identify any numeric sequences or counters present (requirement numbers, IDs, version numbers, etc.)
- Note the highest value of each counter — derive the next value from the live read, never from memory or assumption
- Identify any aggregate fields (totals, counts, summaries) — note their current value and how they are computed from the rest of the file

Do not assume any fixed section names, heading hierarchy, field names, or formats. Let each file's own structure tell you what it contains and where additions belong.

---

## Phase 4 — Preview (no edits yet)

Show one block per doc. Show only what changes.

**`{{CHANGELOG}}`** — new date block (append under today's block if it already exists):
```
## [YYYY-MM-DD]
### Added
- <feat summaries>
### Changed
- <fix/chore summaries>
```

**`{{PRD_FILE}}`** — based on what you read in Phase 3, state exactly what entries are added, following the file's own conventions and numbering.

**`{{PRODUCT_BRIEF_FILE}}`** — based on what you read in Phase 3, identify which parts of the document are affected by the undocumented commits and state exactly what line is added and where.

**`{{EPICS_STORIES_FILE}}`** — based on what you read in Phase 3, state what new entries are added and how any aggregate fields change (show before → after).

End with a **STOP**:
```
<N> docs to update. Ambiguous commits: [list or "none"].
Type 'yes' to apply, or describe what to adjust.
```

---

## Phase 5 — Apply (after confirmation only)

Apply sequentially: `{{CHANGELOG}}` first, then `{{PRD_FILE}}`, `{{PRODUCT_BRIEF_FILE}}`, `{{EPICS_STORIES_FILE}}`.

For any file containing aggregate fields (counts, totals, summaries): recompute them by reading the full updated content after inserting. Never derive them by arithmetic on the old value.

Confirm when done:
```
Done. <N> docs updated. Run /commit to save.
```

---

## Guardrails

- Never edit any file before Phase 5
- Never hardcode paths — always use the Variables above
- Never derive counters or IDs without the Phase 3 live reads
- Never recompute aggregate fields by arithmetic — recount from the updated content
- Idempotency: running twice must find nothing to do the second time
