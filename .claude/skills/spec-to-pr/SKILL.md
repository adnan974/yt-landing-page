---
description: Orchestre la pipeline complète de développement en une commande — plan-mode → implement → commit → PR. Accepte un story ID (ex. "1.2"), une description free-text, ou un chemin vers un fichier spec. Option --yolo pour exécution entièrement automatisée sans confirmations interactives.
model: haiku
argument-hint: "[story-id|description|plan-path] [--yolo] [--skip-plan]"
---

# Spec-to-PR

Pipeline complète : branch → plan → implement → commit → changelog → PR.

## Flags

**`--yolo`** : enchaîner chaque étape sans texte interactif ni attente. Rappeler cette règle à chaque transition.  
Passer `--yolo` à : `plan-mode`, `commit`, `push-and-create-pr`. Ne pas passer à `implement` (non supporté).

**`--skip-plan`** : sauter l'étape 2 (plan-mode). L'étape plan est ignorée et l'implémentation démarre directement depuis le story input.

Les deux flags sont combinables.

---

## Step 0 — Parse

Arguments : `$ARGUMENTS`

- **Story input** : ID (ex. `1.2`), description free-text, ou chemin vers un fichier spec
- **Flag `--yolo`** : présent ou absent
- **Flag `--skip-plan`** : présent ou absent

> Si aucun story input : demander "Quelle story veux-tu implémenter ?"

---

## Step 1 — Branch

```bash
git fetch origin main
git checkout -b claude/{spec_slug} origin/main
```

Slug = titre en kebab-case tronqué à 40 chars. Si la branche existe déjà, ajouter un suffixe 4 chars alphanum. Stocker dans `BRANCH_NAME`.

> **Checkpoint (non-yolo)** : "Branche `{BRANCH_NAME}` créée. Continuer vers le plan ? (oui / non)"

---

## Step 2 — Plan

> **Si `--skip-plan`** : sauter le reste de cette étape. `PLAN_FILE` reste vide — `implement` sera invoqué directement avec le story input.

Invoquer `plan-mode` avec le story input (+ `--yolo` si présent).

Capturer `PLAN_FILE` depuis l'output ou via `ls -t docs/plans/plan-*.md | head -1`.

> **Checkpoint (non-yolo)** : "Plan sauvegardé : `{PLAN_FILE}`. Continuer ? (oui / non)"

---

## Step 3 — Implement

Invoquer `implement` avec `{PLAN_FILE}`.

Si implement signale des échecs non corrigés → stopper et remonter l'erreur.

> **Checkpoint (non-yolo)** : "Implémentation terminée. Continuer vers le commit ? (oui / non)"

---

## Step 4 — Commit

Invoquer `commit` (+ `--yolo` si présent).

Si aucun commit créé → stopper et remonter l'erreur.

> **Checkpoint (non-yolo)** : "Commit créé. Continuer vers le changelog ? (oui / non)"

---

## Step 4b — Changelog

Invoquer `update-changelog` avec le type et message du commit.

Puis amender :

```bash
git add CHANGELOG.md
git commit --amend --no-edit
```

> **Checkpoint (non-yolo)** : "Changelog mis à jour. Continuer vers la PR ? (oui / non)"

---

## Step 5 — PR

Invoquer `push-and-create-pr` (+ `--yolo` si présent → PR immédiate, pas de draft).

Récupérer et stocker `PR_URL`.

---

## Bannières (yolo uniquement)

Entre chaque étape :

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[spec-to-pr] Step {N}/6 : {ÉTAPE}
→ Next: {ÉTAPE_SUIVANTE}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Résumé final

```
✓ spec-to-pr terminé

Story :  {story_input}
Branche: {BRANCH_NAME}
Plan :   {PLAN_FILE}
Commit : {commit_hash} — {commit_message}
PR :     {PR_URL}
```

---

## Gestion d'erreurs

- Échec d'un sous-skill → stopper immédiatement, afficher l'étape et la cause
- **Yolo** : stopper et reporter, ne jamais continuer silencieusement après un échec
- **Non-yolo** : proposer retry / skip / abandonner
