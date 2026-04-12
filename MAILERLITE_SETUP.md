# Configuration MailerLite & Test d'Intégration

## 📋 Prérequis

Vous devez avoir un compte MailerLite actif avec :
1. Une clé API
2. Un groupe d'abonnés créé (List ou Segment)

## 🔧 Configuration

### 1. Obtenez vos identifiants MailerLite

**Clé API :**
- Allez sur https://app.mailerlite.com/integrations/api/
- Créez une token API (Section "Create API token")
- Copiez la clé

**ID du groupe :**
- Allez sur https://app.mailerlite.com/groups/
- Cliquez sur le groupe où vous voulez ajouter les abonnés
- L'ID apparaît dans l'URL : `https://app.mailerlite.com/groups/123456/...`
- Ou utilisez l'endpoint de test (voir ci-dessous)

### 2. Configurez les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
MAILERLITE_API_KEY=votre_clé_api_ici
MAILERLITE_GROUP_ID=votre_id_groupe_ici
```

Exemple :
```env
MAILERLITE_API_KEY=sk_live_abc123def456
MAILERLITE_GROUP_ID=123456789
```

## 🧪 Tests

### Test 1 : Vérifier la connexion MailerLite

```bash
# En ligne de commande
curl http://localhost:3000/api/subscribe

# Ou avec VS Code REST Client, créez une requête GET
GET http://localhost:3000/api/subscribe
```

**Réponse attendue (succès) :**
```json
{
  "status": "ok",
  "message": "MailerLite connecté avec succès",
  "group": {
    "id": "123456",
    "name": "Newsletter",
    "subscribersCount": 42
  }
}
```

**Réponse attendue (erreur) :**
```json
{
  "status": "error",
  "message": "Variables manquantes",
  "details": {
    "MAILERLITE_API_KEY": "✗ Manquant",
    "MAILERLITE_GROUP_ID": "✗ Manquant"
  }
}
```

### Test 2 : Inscrire un abonné (via formulaire)

1. Démarrez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez http://localhost:3000 dans votre navigateur

3. Entrez une adresse email de test et cliquez sur "S'inscrire"

4. Vérifiez dans MailerLite que l'abonné a bien été ajouté

### Test 3 : Inscrire un abonné (via API)

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Réponse attendue (succès) :**
```json
{
  "message": "Inscription réussie !",
  "subscriber": {
    "data": {
      "id": "xyz789",
      "email": "test@example.com",
      "status": "active"
    }
  }
}
```

### Test 4 : Test d'erreur - Email invalide

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid-email"}'
```

**Réponse attendue :**
```json
{
  "message": "Email invalide"
}
```

### Test 5 : Test d'erreur - Email déjà inscrit

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

(Lancer deux fois avec le même email)

**Réponse attendue :**
```json
{
  "message": "Cet email est déjà inscrit."
}
```

## 📊 Vérifications dans MailerLite

### Visualiser les abonnés ajoutés

1. Connectez-vous à https://app.mailerlite.com/
2. Allez dans le groupe où vous avez testé
3. Cliquez sur "Abonnés" 
4. Les nouveaux abonnés de test doivent y être listés

### Vérifier l'historique des appels API

1. Allez sur https://app.mailerlite.com/integrations/api/
2. Cliquez sur "Logs API"
3. Vous devez voir vos appels de test listés

## 🐛 Dépannage

### "Configuration manquante"

**Cause :** Les variables d'environnement ne sont pas définies
**Solution :**
1. Vérifiez le fichier `.env.local`
2. Redémarrez le serveur de développement après modification
3. Consultez la console Next.js pour les erreurs

### "Impossible de se connecter à MailerLite"

**Cause :** Clé API invalide ou expirée
**Solution :**
1. Vérifiez que la clé API commence par `sk_live_`
2. Générez une nouvelle clé sur https://app.mailerlite.com/integrations/api/
3. Mettez à jour `.env.local`

### "Email invalide" lors d'une inscription

**Cause :** Format d'email non valide
**Solution :**
1. Utilisez un email au format correct : `utilisateur@domaine.com`
2. Vérifiez qu'il n'y a pas d'espaces

### "Cet email est déjà inscrit"

**C'est normal !** L'email est déjà abonné au groupe. Testez avec une adresse différente.

## 📡 Endpoints disponibles

- `POST /api/subscribe` - Inscrire un nouvel abonné
- `GET /api/subscribe` - Tester la connexion MailerLite

## 🔒 Sécurité

- ✅ Les clés API sont stockées en `.env.local` (jamais versionnées)
- ✅ Validation d'email côté serveur
- ✅ Gestion d'erreur sans exposer les détails techniques
- ✅ Compatible avec production (requêtes serveur uniquement)

## 📚 Références

- [API MailerLite Documentation](https://developers.mailerlite.com/docs)
- [Ajouter un abonné à un groupe](https://developers.mailerlite.com/docs/groups#add-subscriber-to-a-group)
