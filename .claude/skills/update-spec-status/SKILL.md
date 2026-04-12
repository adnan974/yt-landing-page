---
description: Update the status of a spec in its source system after implementation. Orchestrates adapter skills — no business logic of its own.
model: haiku
argument-hint: "--source <skill-name>:<ref> --status <status> [--yolo]"
---

# Update Spec Status

Pure orchestrator. Dispatches to the adapter skill named in `--source`.

## Arguments

Parse from `$ARGUMENTS`:

| Argument | Required | Description |
|----------|----------|-------------|
| `--source <skill:ref>` | yes | Adapter skill name + reference (e.g. `github-cli:123`) |
| `--status <status>` | yes | Target status (e.g. `implemented`, `done`) |
| `--yolo` | no | Skip confirmation |

If `--source` missing: stop with `! --source requis (ex: --source github-cli:123)`.  
If `--status` missing: stop with `! --status requis`.

---

## Step 1 — Parse source

Split `--source` value on `:` (first occurrence):

- `ADAPTER_SKILL` = part before `:`
- `REF` = part after `:`

Examples:
- `github-cli:123` → skill=`github-cli`, ref=`123`
- `jira:PROJ-123` → skill=`jira`, ref=`PROJ-123`

---

## Step 2 — Confirm (non-yolo)

Without `--yolo`, display and wait for confirmation:

```
⏸️ Mise à jour statut

Adaptateur : <ADAPTER_SKILL>
Référence  : <REF>
Status     : → <status>

Confirmer ? (oui / non)
```

---

## Step 3 — Invoke adapter

Invoke the skill named `<ADAPTER_SKILL>` with the following intent:

> Update reference `<REF>` to status `<status>`

Pass arguments in the adapter's expected format. Known adapters:

| Adapter skill | Arguments to pass |
|---|---|
| `github-cli` | `"ferme l'issue #<REF> avec commentaire 'Status → <status>'"` |
| any other skill | Pass `--id <REF> --status <status>` as best-effort |

If the adapter skill does not exist or returns an error: stop and surface the error to the user.

---

## Step 4 — Output

On success:

```
✓ Statut mis à jour via <ADAPTER_SKILL>
  Ref    : <REF>
  Status : → <status>
```
