import { supabase } from './supabase';

export const testSupabaseConnectivity = async () => {
  const results = {
    auth: false,
    database: false,
    storage: false,
    realtime: false,
    details: {} as any
  };

  try {
    // 1. Test Authentication Service
    console.log('🔍 Testing Supabase Authentication...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) throw new Error(`Auth Error: ${authError.message}`);
    results.auth = true;
    results.details.auth = 'Authentication service is connected';

    // 2. Test Database Connection
    console.log('🔍 Testing Supabase Database...');
    const { data: dbData, error: dbError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    if (dbError) throw new Error(`Database Error: ${dbError.message}`);
    results.database = true;
    results.details.database = 'Database is accessible';

    // 3. Test Storage Bucket Access
    console.log('🔍 Testing Supabase Storage...');
    const { data: buckets, error: storageError } = await supabase
      .storage
      .listBuckets();
    if (storageError) throw new Error(`Storage Error: ${storageError.message}`);
    results.storage = true;
    results.details.storage = 'Storage is accessible';

    // 4. Test Realtime
    console.log('🔍 Testing Supabase Realtime...');
    const subscription = supabase
      .channel('test')
      .subscribe((status) => {
        results.realtime = status === 'SUBSCRIBED';
        results.details.realtime = 'Realtime subscription working';
      });

    // Clean up subscription after test
    setTimeout(() => {
      subscription.unsubscribe();
    }, 1000);

    // Log overall results
    console.log('✅ Supabase Connectivity Test Results:', {
      timestamp: new Date().toISOString(),
      status: 'Connected',
      services: results,
      sessionStatus: authData?.session ? 'Active Session' : 'No Active Session',
    });

    return results;

  } catch (error) {
    console.error('❌ Supabase Connection Error:', error);
    results.details.error = error instanceof Error ? error.message : 'Unknown error occurred';
    return results;
  }
};

// Test specific database tables
export const testDatabaseTables = async () => {
  const tables = ['profiles', 'projects']; // Add all your tables here
  const results: Record<string, boolean> = {};

  for (const table of tables) {
    try {
      console.log(`🔍 Testing table: ${table}`);
      const { error } = await supabase
        .from(table)
        .select('count')
        .limit(1);
      
      results[table] = !error;
      if (error) {
        console.error(`❌ Error accessing ${table}:`, error.message);
      } else {
        console.log(`✅ Table ${table} is accessible`);
      }
    } catch (error) {
      results[table] = false;
      console.error(`❌ Error testing ${table}:`, error);
    }
  }

  return results;
};

// Test RLS Policies
export const testRLSPolicies = async () => {
  try {
    // Test unauthenticated access (should fail)
    const { error: unauthError } = await supabase
      .from('profiles')
      .select('*');

    // Test authenticated access (if user is logged in)
    const { data: session } = await supabase.auth.getSession();
    
    console.log('🔒 RLS Policy Test Results:', {
      unauthenticatedAccess: !unauthError ? 'Failed (Security Issue)' : 'Blocked (Good)',
      authenticatedAccess: session?.session ? 'Available' : 'No Session',
    });

    return {
      rlsPoliciesWorking: !!unauthError,
      sessionActive: !!session?.session
    };
  } catch (error) {
    console.error('❌ Error testing RLS policies:', error);
    return {
      rlsPoliciesWorking: false,
      sessionActive: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 