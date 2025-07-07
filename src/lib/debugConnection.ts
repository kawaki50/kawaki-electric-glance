import { supabase } from './supabase';

export const debugSupabaseConnection = async () => {
  console.log('🔍 Débogage de la connexion Supabase...');
  
  try {
    // Test 1: Vérifier la connexion basique
    console.log('📡 Test 1: Connexion basique...');
    const { data: testData, error: testError } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Erreur de connexion:', testError);
      return { success: false, error: testError.message };
    }
    
    console.log('✅ Connexion basique réussie');
    
    // Test 2: Tenter d'insérer un message de test
    console.log('📝 Test 2: Insertion d\'un message de test...');
    const testMessage = {
      name: 'Test Debug',
      email: 'debug@test.com',
      message: 'Test de débogage - ' + new Date().toISOString(),
      status: 'new' as const
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('contact_messages')
      .insert([testMessage])
      .select();
    
    if (insertError) {
      console.error('❌ Erreur d\'insertion:', insertError);
      console.error('Détails:', insertError.details);
      console.error('Hint:', insertError.hint);
      return { success: false, error: insertError.message, details: insertError.details };
    }
    
    console.log('✅ Insertion réussie:', insertData);
    
    // Test 3: Lire le message inséré
    console.log('📖 Test 3: Lecture du message inséré...');
    const { data: readData, error: readError } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', insertData[0].id)
      .single();
    
    if (readError) {
      console.error('❌ Erreur de lecture:', readError);
      return { success: false, error: readError.message };
    }
    
    console.log('✅ Lecture réussie:', readData);
    
    // Test 4: Supprimer le message de test
    console.log('🗑️ Test 4: Suppression du message de test...');
    const { error: deleteError } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', insertData[0].id);
    
    if (deleteError) {
      console.error('❌ Erreur de suppression:', deleteError);
      return { success: false, error: deleteError.message };
    }
    
    console.log('✅ Suppression réussie');
    
    return { 
      success: true, 
      message: 'Tous les tests de débogage sont passés avec succès!' 
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

// Fonction pour tester les variables d'environnement
export const checkEnvironmentVariables = () => {
  console.log('🔧 Vérification des variables d\'environnement...');
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('URL Supabase:', supabaseUrl ? '✅ Configurée' : '❌ Manquante');
  console.log('Clé Supabase:', supabaseKey ? '✅ Configurée' : '❌ Manquante');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes!');
    return false;
  }
  
  console.log('✅ Variables d\'environnement OK');
  return true;
}; 