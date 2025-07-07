-- Script pour corriger les politiques RLS
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Allow public to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public to insert chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Allow public to read chat messages by session" ON chat_messages;

-- Créer les nouvelles politiques avec plus de permissions
-- Politique pour permettre l'insertion de messages de contact (public)
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture de tous les messages de contact (pour l'admin)
CREATE POLICY "Allow public to read contact messages" ON contact_messages
  FOR SELECT USING (true);

-- Politique pour permettre la mise à jour des messages de contact (pour l'admin)
CREATE POLICY "Allow public to update contact messages" ON contact_messages
  FOR UPDATE USING (true);

-- Politique pour permettre l'insertion de messages de chat (public)
CREATE POLICY "Allow public to insert chat messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture de tous les messages de chat (public)
CREATE POLICY "Allow public to read chat messages" ON chat_messages
  FOR SELECT USING (true);

-- Vérifier que RLS est activé
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Afficher les politiques créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('contact_messages', 'chat_messages'); 