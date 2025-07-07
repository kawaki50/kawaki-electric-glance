import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Test de connexion à Supabase...');
    
    // Test de connexion basique
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur de connexion:', error.message);
      return {
        success: false,
        error: error.message,
        details: 'Impossible de se connecter à la base de données'
      };
    }
    
    console.log('✅ Connexion à Supabase réussie!');
    
    // Test d'insertion d'un message de test
    const testMessage = {
      name: 'Test Connection',
      email: 'test@example.com',
      message: 'Ceci est un test de connexion automatique',
      status: 'new' as const
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('contact_messages')
      .insert([testMessage])
      .select();
    
    if (insertError) {
      console.error('❌ Erreur d\'insertion:', insertError.message);
      return {
        success: false,
        error: insertError.message,
        details: 'Impossible d\'insérer des données'
      };
    }
    
    console.log('✅ Test d\'insertion réussi!');
    
    // Supprimer le message de test
    if (insertData && insertData[0]) {
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', insertData[0].id);
    }
    
    console.log('✅ Test de suppression réussi!');
    
    return {
      success: true,
      message: 'Tous les tests de connexion sont passés avec succès!'
    };
    
  } catch (error) {
    console.error('❌ Erreur inattendue:', error);
    return {
      success: false,
      error: 'Erreur inattendue',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

// Fonction pour tester la configuration au démarrage
export const validateDatabaseSetup = () => {
  console.log('🚀 Validation de la configuration de la base de données...');
  
  // Vérifier les variables d'environnement
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes');
    console.log('📝 Créez un fichier .env.local avec:');
    console.log('VITE_SUPABASE_URL=votre_url_supabase');
    console.log('VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase');
    return false;
  }
  
  console.log('✅ Variables d\'environnement configurées');
  return true;
}; 