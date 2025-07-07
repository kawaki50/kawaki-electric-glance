import { createClient } from '@supabase/supabase-js'
import { config, validateConfig } from '@/config/env'

// Vérifier la configuration au démarrage
validateConfig()

export const supabase = createClient(config.supabase.url, config.supabase.anonKey)

// Types pour les messages
export interface ContactMessage {
  id?: string
  name: string
  email: string
  message: string
  created_at?: string
  status?: 'new' | 'read' | 'replied'
}

export interface ChatMessage {
  id?: string
  text: string
  sender: 'user' | 'kawaki'
  timestamp?: string
  session_id?: string
  created_at?: string
} 