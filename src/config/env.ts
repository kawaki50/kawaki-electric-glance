// Configuration des variables d'environnement
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
}

// Vérification des variables requises
export const validateConfig = () => {
  if (!config.supabase.url || !config.supabase.anonKey) {
    console.warn('⚠️ Variables Supabase manquantes. Créez un fichier .env.local avec:')
    console.warn('VITE_SUPABASE_URL=votre_url_supabase')
    console.warn('VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase')
    return false
  }
  return true
} 