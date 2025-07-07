# Configuration de la Base de Données pour le Portfolio

Ce guide vous explique comment configurer Supabase pour recevoir les messages de votre portfolio.

## 🚀 Étape 1: Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation
5. Donnez un nom à votre projet (ex: "kawaki-portfolio")
6. Créez un mot de passe pour la base de données
7. Choisissez une région proche de vous
8. Cliquez sur "Create new project"

## 🗄️ Étape 2: Créer les Tables

1. Dans votre projet Supabase, allez dans "SQL Editor"
2. Copiez le contenu du fichier `database/schema.sql`
3. Collez-le dans l'éditeur SQL
4. Cliquez sur "Run" pour exécuter le script

Ce script va créer :

- Table `contact_messages` pour les messages du formulaire de contact
- Table `chat_messages` pour les conversations du chat widget
- Index pour optimiser les performances
- Politiques de sécurité (RLS)

## 🔑 Étape 3: Récupérer les Clés API

1. Dans votre projet Supabase, allez dans "Settings" > "API"
2. Copiez l'URL du projet (Project URL)
3. Copiez la clé anon/public (anon key)

## ⚙️ Étape 4: Configurer les Variables d'Environnement

1. Créez un fichier `.env.local` à la racine de votre projet
2. Ajoutez les variables suivantes :

```env
VITE_SUPABASE_URL=https://yamffxyawlbhrdiyqeow.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbWZmeHlhd2xiaHJkaXlxZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MjYxODMsImV4cCI6MjA2NzUwMjE4M30.P1FvHkYtDcqbdIvXbWQHE-SvGzEj7TGN67xhcWfSZCM
```

**Exemple :**

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🧪 Étape 5: Tester la Configuration

1. Redémarrez votre serveur de développement : `npm run dev`
2. Ouvrez votre portfolio
3. Testez le formulaire de contact
4. Testez le chat widget
5. Vérifiez dans Supabase > Table Editor que les messages apparaissent

## 📊 Étape 6: Accéder au Panel d'Administration

Pour visualiser et gérer les messages reçus :

1. Créez une route admin dans votre application
2. Importez le composant `AdminPanel`
3. Accédez à `/admin` pour voir tous les messages

## 🔒 Sécurité

- Les politiques RLS (Row Level Security) sont configurées
- Seules les insertions publiques sont autorisées
- Pour l'administration, vous devrez configurer l'authentification

## 📈 Fonctionnalités

### Messages de Contact

- ✅ Envoi via le formulaire de contact
- ✅ Statuts : nouveau, lu, répondu
- ✅ Horodatage automatique
- ✅ Interface d'administration

### Messages de Chat

- ✅ Enregistrement des conversations
- ✅ Groupement par session
- ✅ Messages utilisateur et bot
- ✅ Interface d'administration

## 🛠️ Dépannage

### Erreur "Missing Supabase environment variables"

- Vérifiez que le fichier `.env.local` existe
- Vérifiez que les variables sont correctement nommées
- Redémarrez le serveur de développement

### Erreur "Failed to send message"

- Vérifiez votre connexion internet
- Vérifiez que les clés Supabase sont correctes
- Vérifiez les politiques RLS dans Supabase

### Messages n'apparaissent pas dans Supabase

- Vérifiez que le script SQL a été exécuté
- Vérifiez les politiques RLS
- Vérifiez les logs dans la console du navigateur

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs dans Supabase > Logs
3. Consultez la documentation Supabase
