# Integration Tests - API Subscription

## 📋 Prérequis

Avant de lancer les tests :

1. **Configurez .env.local** avec :
   ```env
   MAILERLITE_API_KEY=sk_live_xxxxx
   MAILERLITE_GROUP_ID=123456789
   ```

2. **Démarrez le serveur de développement** :
   ```bash
   npm run dev
   ```
   Le serveur doit tourner sur `http://localhost:3001`

3. **Attendez que Next.js soit prêt** :
   ```
   ▲ Next.js 16.2.3
   - Local: http://localhost:3001
   ```

## 🧪 Lancer les tests

### Test d'intégration seul
```bash
npm run test:integration
```

Cela va :
- ✅ Vérifier la connexion à MailerLite
- ✅ Tester l'inscription d'emails
- ✅ Valider la gestion des erreurs
- ✅ Tester les doublons

### Mode watch (reload au changement)
```bash
npm run test
```

### Mode UI interactif
```bash
npm run test:ui
```
Ouvre une interface web sur `http://localhost:51204`

### Tous les tests
```bash
npm run test:run
```

## 📊 Que testent les tests ?

### ✅ Inscriptions réussies
- Email valide → Inscription réussie (HTTP 201)
- Email en majuscules → Conversion en minuscules automatique
- Subscriber data correctement retourné

### ✅ Validation des emails
- Emails invalides (sans @, sans domaine, avec espaces)
- Email manquant
- Email non-string

### ✅ Gestion des doublons
- Première inscription → 201
- Deuxième avec même email → 200 (pas d'erreur)
- Message "déjà inscrit" correct

### ✅ Endpoint de test (GET)
- Vérifier que MailerLite est connecté
- Récupérer les infos du groupe (nom, nombre d'abonnés)

## 📈 Sortie attendue

```
✓ __tests__/integration/api.subscribe.test.ts (10 tests) 2.45s
  ✓ POST /api/subscribe
    ✓ Successful subscription
      ✓ should subscribe a new email successfully
      ✓ should accept email in different cases
    ✓ Email validation
      ✓ should reject invalid email format
      ✓ should reject missing email
      ✓ should reject non-string email
    ✓ Duplicate email handling
      ✓ should handle already subscribed email gracefully
    ✓ GET /api/subscribe (Test endpoint)
      ✓ should return connection status
      ✓ should show configured group details

Test Files  1 passed (1)
     Tests  10 passed (10)
```

## 🐛 Troubleshooting

### "Connection refused on port 3001"
```
Erreur : Could not connect to http://localhost:3001
```
**Solution** : Assurez-vous que `npm run dev` tourne dans un autre terminal.

### "Configuration manquante"
```
Erreur : Variables manquantes / MAILERLITE_API_KEY manquant
```
**Solution** : 
1. Vérifiez `.env.local`
2. Redémarrez le serveur (`npm run dev`)
3. Les variables d'env sont chargées au démarrage

### "Impossible de se connecter à MailerLite"
```
Erreur : Impossible de se connecter à MailerLite
```
**Solutions** :
1. Vérifiez la clé API (`sk_live_...`)
2. Vérifiez l'ID du groupe
3. Testez via : `curl http://localhost:3001/api/subscribe`

### Tests en timeout
```
Erreur : Test timeout after 10000ms
```
**Solutions** :
1. Vérifiez que le serveur répond : `curl http://localhost:3001`
2. Vérifiez la connexion internet
3. MailerLite peut être lent en cas de charge

## 💡 Conseils

### Tester un email spécifique
Modifiez le test et utilisez :
```javascript
const email = 'votre-email@example.com';
```

### Ajouter un nouveau test
```javascript
it('should do something specific', async () => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com' }),
  });
  
  expect(response.status).toBe(201);
});
```

### Déboguer une réponse
```javascript
const data = await response.json();
console.log('Response:', JSON.stringify(data, null, 2));
```

## 🔄 Workflow recommandé

1. **Lancez le serveur** :
   ```bash
   npm run dev
   ```

2. **Dans un autre terminal, lancez les tests** :
   ```bash
   npm run test:integration
   ```

3. **Regardez les résultats** :
   - ✅ Tous les tests passent ? → Intégration OK
   - ❌ Erreur ? → Consultez Troubleshooting

4. **Vérifiez dans MailerLite** :
   - Les nouveaux abonnés de test apparaissent dans votre groupe
   - Allez sur https://app.mailerlite.com/groups/

## 📚 Fichiers connexes

- `/app/api/subscribe/route.ts` - API endpoint
- `.env.local` - Configuration (pas versionné)
- `MAILERLITE_SETUP.md` - Guide complet de configuration
