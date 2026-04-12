# Architecture — Newsletter Landing Page

**Projet :** Landing page de capture d'emails DEV & IA  
**Date :** 2026-04-12  
**Statut :** Draft  
**Basé sur :** `docs/prd.md`

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements (8 FRs) :**
- Présentation de l'offre : 3 FRs (headline, description, lead magnet visible)
- Capture d'email : 3 FRs (champ email, CTA, confirmation visuelle)
- Livraison lead magnet : 2 FRs (automation MailerLite, zéro gestion manuelle)

**NFRs qui guident l'architecture :**
- Chargement < 2s sur mobile 4G → pas de JS lourd, optimisation images
- Responsive mobile-first → Tailwind breakpoints, composants shadcn accessibles
- WCAG AA → contraste, navigation clavier

**Complexité :** Faible — page unique, un seul composant interactif (formulaire)

### Technical Constraints & Dependencies

- Intégration MailerLite via embed HTML (widget officiel) — pas d'API custom
- Aucun backend applicatif nécessaire (Next.js utilisé uniquement côté frontend)
- Déploiement Vercel (compte à créer)

---

## Core Architectural Decisions

### Decision Summary

- 5 décisions critiques prises
- 0 décision différée

---

### Frontend Framework

| | |
|---|---|
| **Décision** | Next.js 15 — App Router |
| **Version** | 15.x (stable) |
| **Rationale** | Nécessaire pour shadcn/ui (React). App Router = meilleure perf par défaut (RSC). SSG natif pour une landing page statique. |
| **Mode de rendu** | Static Site Generation (SSG) — `generateStaticParams` non requis, page entièrement statique |

---

### Styling & UI Components

| | |
|---|---|
| **Décision** | Tailwind CSS v4 + shadcn/ui |
| **Versions** | Tailwind 4.x / shadcn/ui (latest) |
| **Rationale** | Tailwind pour le layout et le style custom. shadcn/ui pour les composants accessibles (Button, Input) sans surcharge CSS. |
| **Composants shadcn utilisés** | `Button`, `Input`, `Card` (optionnel) |

---

### Formulaire & Intégration MailerLite

| | |
|---|---|
| **Décision** | Embed HTML officiel MailerLite |
| **Rationale** | Zéro backend à maintenir. MailerLite gère la validation, le double opt-in et l'automation PDF. Intégration en 5 min. |
| **Approche** | Composant React wrapper autour du script embed MailerLite, stylé via Tailwind pour matcher le design |

> **Note :** Le script MailerLite injecte son propre DOM. Utiliser `useEffect` pour le charger côté client uniquement (`'use client'`).

---

### Langage

| | |
|---|---|
| **Décision** | TypeScript strict |
| **Version** | 5.x |
| **Rationale** | Cohérence, autocomplétion, détection d'erreurs à la compilation. |

---

### Infrastructure & Déploiement

| | |
|---|---|
| **Décision** | Vercel (compte à créer) |
| **Rationale** | Hébergement natif Next.js, déploiement depuis GitHub en 2 clics, SSL automatique, CDN global. Free tier suffisant. |
| **CI/CD** | Push sur `main` → déploiement automatique Vercel |
| **Environnements** | `main` → production, PRs → preview URLs automatiques |

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Fichiers & Composants :**
```
Composants React  → PascalCase         (HeroSection.tsx, EmailForm.tsx)
Utilitaires       → camelCase          (cn.ts)
Pages             → lowercase          (app/page.tsx)
Styles globaux    → kebab-case         (globals.css)
```

**Variables & Props :**
```
Variables/fonctions → camelCase
Types/Interfaces    → PascalCase (EmailFormProps, HeroProps)
Constantes          → SCREAMING_SNAKE_CASE (SITE_CONFIG)
```

### Structure Patterns

**Règle de co-localisation :**
- Un composant = un fichier dans `components/`
- Pas de sous-dossiers pour un projet aussi simple
- Les types locaux au composant restent dans le même fichier

**Règle `'use client'` :**
- Par défaut tout est Server Component (RSC)
- `'use client'` uniquement pour : `EmailForm.tsx` (script MailerLite via useEffect)

### Format Patterns

**Tailwind — ordre des classes :**
Suivre l'ordre recommandé par Prettier Tailwind plugin :
`layout → flexbox/grid → spacing → sizing → typography → colors → effects`

---

## Project Structure

```
yt-landing-page/
├── app/
│   ├── layout.tsx          # Root layout (metadata, fonts)
│   ├── page.tsx            # Page principale (assemblage des sections)
│   └── globals.css         # Variables CSS + reset Tailwind
├── components/
│   ├── HeroSection.tsx     # Titre + accroche (FR1, FR2)
│   ├── LeadMagnetBadge.tsx # Mise en valeur du bonus PDF (FR3)
│   ├── EmailForm.tsx       # Wrapper embed MailerLite (FR4, FR5, FR6) — 'use client'
│   └── ui/                 # Composants shadcn générés (Button, Input...)
├── lib/
│   └── utils.ts            # Fonction cn() (shadcn standard)
├── public/
│   └── og-image.png        # Image Open Graph (partage réseaux)
├── docs/
│   ├── prd.md
│   └── architecture.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json         # Config shadcn
└── package.json
```

### Architectural Boundaries

**Composants et responsabilités :**

```
app/page.tsx
├── HeroSection          → Contenu statique pur (RSC)
├── LeadMagnetBadge      → Contenu statique pur (RSC)
└── EmailForm            → Client component (embed MailerLite)
```

**Intégration externe MailerLite :**
- Tout passe par l'embed officiel dans `EmailForm.tsx`
- Aucune clé API exposée côté client
- La logique d'automation (PDF + welcome email) est entièrement dans MailerLite

### Requirements Mapping

| FR | Composant |
|---|---|
| FR1 — Headline | `HeroSection.tsx` |
| FR2 — Description newsletter | `HeroSection.tsx` |
| FR3 — Lead magnet visible | `LeadMagnetBadge.tsx` |
| FR4 — Champ email | `EmailForm.tsx` (embed MailerLite) |
| FR5 — CTA soumission | `EmailForm.tsx` (embed MailerLite) |
| FR6 — Confirmation visuelle | `EmailForm.tsx` (géré par MailerLite) |
| FR7 — Email de bienvenue + PDF | MailerLite automation (hors codebase) |
| FR8 — Gestion abonnés | MailerLite dashboard (hors codebase) |

---

## Initialisation du projet

```bash
# 1. Créer le projet Next.js
npx create-next-app@latest yt-landing-page --typescript --tailwind --app --src-dir no --import-alias "@/*"

# 2. Initialiser shadcn
npx shadcn@latest init

# 3. Ajouter les composants nécessaires
npx shadcn@latest add button input card
```
