# PRD — Newsletter Landing Page

**Projet :** Landing page de capture d'emails pour newsletter DEV & IA  
**Date :** 2026-04-12  
**Statut :** Draft

---

## Executive Summary

Créer une landing page minimaliste en français, destinée aux développeurs arrivant depuis YouTube (description de chaîne ou end screen). L'objectif est de convertir les visiteurs en abonnés à une newsletter hebdomadaire gratuite sur l'IA et le DEV. En échange de leur email, les visiteurs reçoivent automatiquement via MailerLite un résumé PDF des 16 conseils Claude Code classés par niveau d'impact (S/A/B/C).

**Vision :** Devenir la source de référence "bruit filtré" sur l'IA et le DEV pour les développeurs francophones — les pépites que YouTube ne peut pas couvrir, max 1 email/semaine.

---

## Product Scope

### MVP — Minimum Viable Product

- Page épurée avec headline accrocheur et description courte du contenu newsletter
- Formulaire de capture (email uniquement) + bouton CTA
- Intégration MailerLite : inscription → automation → email de bienvenue avec PDF
- Confirmation visuelle après soumission du formulaire
- Design responsive (mobile-first, audience YouTube)

### Growth Features (Post-MVP)

- Compteur social "Rejoins X développeurs abonnés"
- Aperçu d'un email type de la newsletter (extrait)
- Section courte "Qui je suis" (crédibilité auteur)

### Vision (Future)

- A/B testing sur les headlines
- Page de remerciement dédiée (post-soumission)
- Tracking des conversions par source (URL params YouTube)

---

## Functional Requirements

### Présentation de l'offre

- FR1 : EN TANT QUE visiteur, je peux lire un titre principal accrocheur SO THAT je comprends immédiatement la valeur de la newsletter en moins de 5 secondes
- FR2 : EN TANT QUE visiteur, je peux lire une courte description de ce que contient la newsletter (fréquence, type de contenu, positionnement "filtre anti-bruit") SO THAT je suis convaincu avant de m'inscrire
- FR3 : EN TANT QUE visiteur, je peux voir clairement le bonus offert (résumé des 16 conseils classés S/A/B/C) SO THAT j'ai une raison immédiate de m'inscrire

### Capture d'email

- FR4 : EN TANT QUE visiteur, je peux saisir mon adresse email dans un champ unique SO THAT je peux m'inscrire en un minimum de friction
- FR5 : EN TANT QUE visiteur, je peux soumettre le formulaire via un bouton CTA clair SO THAT mon inscription est enregistrée dans MailerLite
- FR6 : EN TANT QUE visiteur, je vois une confirmation visuelle immédiate après soumission SO THAT je sais que mon inscription a bien été prise en compte

### Livraison du lead magnet

- FR7 : EN TANT QUE nouvel abonné, je reçois automatiquement un email de bienvenue via MailerLite SO THAT je reçois le PDF résumé des 16 conseils sans action supplémentaire de ma part
- FR8 : EN TANT QU'auteur, je peux gérer les abonnés et l'automation depuis MailerLite SO THAT je n'ai aucune gestion manuelle à faire côté livraison

---

## Non-Functional Requirements

### Accessibilité

- Contraste suffisant pour la lisibilité (WCAG AA minimum)
- Formulaire utilisable au clavier

### Compatibilité

- Responsive mobile-first (majorité du trafic YouTube vient du mobile)
- Compatible navigateurs modernes (Chrome, Firefox, Safari, Edge)

---

## Contraintes & Décisions

| Sujet                 | Décision                                         |
| --------------------- | ------------------------------------------------ |
| Email marketing       | MailerLite (déjà en place)                       |
| Livraison lead magnet | Automation MailerLite (email de bienvenue + PDF) |
| Langue                | Français uniquement                              |
| Complexité UI         | Minimaliste — titre + champ email + CTA          |
| Source de trafic      | YouTube (description chaîne + end screen vidéo)  |
