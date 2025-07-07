# 🗄️ Base de Données Portfolio - Documentation Complète

## 📋 Vue d'ensemble

Votre portfolio est maintenant connecté à une base de données Supabase pour recevoir et gérer les messages des visiteurs. Cette solution offre :

- ✅ **Messages de contact** via le formulaire
- ✅ **Conversations de chat** via le widget
- ✅ **Interface d'administration** pour gérer les messages
- ✅ **Notifications en temps réel** des nouveaux messages
- ✅ **Sécurité** avec Row Level Security (RLS)

## 🚀 Installation Rapide

### 1. Créer un projet Supabase

```bash
# Allez sur https://supabase.com
# Créez un nouveau projet
# Notez l'URL et la clé anon
```

### 2. Configurer les variables d'environnement

```bash
# Créez un fichier .env.local à la racine
VITE_SUPABASE_URL=https://yamffxyawlbhrdiyqeow.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbWZmeHlhd2xiaHJkaXlxZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjYxODMsImV4cCI6MjA2NzUwMjE4M30.P1FvHkYtDcqbdIvXbWQHE-SvGzEj7TGN67xhcWfSZCM
```

### 3. Créer les tables

```sql
-- Copiez le contenu de database/schema.sql
-- Exécutez-le dans l'éditeur SQL de Supabase
```

### 4. Tester l'installation

```bash
npm run dev
# Ouvrez http://localhost:5173
# Testez le formulaire de contact et le chat
```

## 📊 Structure de la Base de Données

### Table `contact_messages`

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table `chat_messages`

```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  sender VARCHAR(50) NOT NULL CHECK (sender IN ('user', 'kawaki')),
  session_id VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Fonctionnalités

### 📧 Messages de Contact

- **Envoi** : Via le formulaire de contact
- **Statuts** : Nouveau → Lu → Répondu
- **Horodatage** : Automatique
- **Validation** : Email et champs requis

### 💬 Messages de Chat

- **Sessions** : Chaque conversation a un ID unique
- **Types** : Messages utilisateur et réponses bot
- **Persistance** : Toutes les conversations sont sauvegardées
- **Groupement** : Par session dans l'admin

### 🛡️ Sécurité

- **RLS** : Row Level Security activé
- **Politiques** : Insertion publique, lecture contrôlée
- **Validation** : Types et contraintes SQL
- **Sanitisation** : Protection contre les injections

## 🎛️ Interface d'Administration

### Accès

```
http://localhost:5173/admin
```

### Fonctionnalités

- 📊 **Vue d'ensemble** : Tous les messages
- 📧 **Messages de contact** : Avec statuts
- 💬 **Conversations** : Groupées par session
- 🔄 **Actions** : Marquer comme lu/répondu
- 📈 **Statistiques** : Nombre de messages

### Notifications

- 🔔 **Temps réel** : Nouveaux messages
- 📱 **Responsive** : Mobile-friendly
- ⚡ **Performance** : Optimisé avec React Query

## 🔌 API et Services

### MessageService

```typescript
// Envoyer un message de contact
await MessageService.sendContactMessage({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello!",
});

// Envoyer un message de chat
await MessageService.sendChatMessage({
  text: "Hello!",
  sender: "user",
  session_id: "session_123",
});
```

### Hooks React Query

```typescript
// Récupérer les messages
const { data: messages } = useContactMessages();

// Envoyer un message
const sendMessage = useSendContactMessage();
sendMessage.mutate({ name, email, message });

// Mettre à jour le statut
const updateStatus = useUpdateMessageStatus();
updateStatus.mutate({ messageId, status: "read" });
```

## 🧪 Tests et Validation

### Test de Connexion

```typescript
import { testSupabaseConnection } from "@/lib/testConnection";

const result = await testSupabaseConnection();
console.log(result.success ? "✅ Connecté" : "❌ Erreur");
```

### Validation de Configuration

```typescript
import { validateDatabaseSetup } from "@/lib/testConnection";

// Vérifie les variables d'environnement
const isValid = validateDatabaseSetup();
```

## 🚨 Dépannage

### Erreurs Courantes

#### "Missing Supabase environment variables"

```bash
# Solution : Créer .env.local
VITE_SUPABASE_URL=https://yamffxyawlbhrdiyqeow.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbWZmeHlhd2xiaHJkaXlxZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjYxODMsImV4cCI6MjA2NzUwMjE4M30.P1FvHkYtDcqbdIvXbWQHE-SvGzEj7TGN67xhcWfSZCM
```

#### "Failed to send message"

```bash
# Vérifiez :
# 1. Connexion internet
# 2. Clés Supabase correctes
# 3. Tables créées dans Supabase
# 4. Politiques RLS configurées
```

#### "Messages n'apparaissent pas"

```bash
# Vérifiez :
# 1. Script SQL exécuté
# 2. Politiques RLS
# 3. Console du navigateur
# 4. Logs Supabase
```

### Logs de Débogage

```typescript
// Activez les logs détaillés
console.log("🔍 Test de connexion...");
console.log("✅ Connexion réussie!");
console.log("❌ Erreur:", error.message);
```

## 📈 Optimisations

### Performance

- **React Query** : Cache et invalidation intelligente
- **Index** : Sur les colonnes fréquemment utilisées
- **Pagination** : Pour les grandes listes
- **Lazy Loading** : Composants chargés à la demande

### Sécurité

- **Validation** : Côté client et serveur
- **Sanitisation** : Protection XSS
- **Rate Limiting** : Limitation des requêtes
- **Audit Trail** : Logs des actions

## 🔮 Évolutions Futures

### Fonctionnalités Prévues

- 📧 **Notifications email** automatiques
- 🤖 **Chatbot IA** plus intelligent
- 📊 **Analytics** détaillés
- 🔐 **Authentification** admin
- 📱 **App mobile** admin

### Améliorations Techniques

- **WebSockets** : Messages en temps réel
- **File Upload** : Pièces jointes
- **Search** : Recherche dans les messages
- **Export** : Export CSV/PDF
- **Backup** : Sauvegarde automatique

## 📞 Support

### Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Contact

- 📧 Email : support@example.com
- 💬 Discord : [Serveur communautaire]
- 📖 Wiki : [Documentation interne]

---

**🎉 Félicitations !** Votre portfolio est maintenant connecté à une base de données professionnelle pour recevoir et gérer les messages de vos visiteurs.
