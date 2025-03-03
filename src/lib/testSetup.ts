import { supabase } from './supabase';

const logDatabaseState = async () => {
  console.log('🔍 Checking database state...');
  
  try {
    // Check profiles table
    const { data: profilesCount, error: profilesError } = await supabase
      .from('profiles')
      .select('count');
    console.log('📊 Profiles table:', {
      status: profilesError ? '❌ Error' : '✅ OK',
      count: profilesCount?.[0]?.count || 0,
      error: profilesError
    });

    // Check projects table
    const { data: projectsCount, error: projectsError } = await supabase
      .from('projects')
      .select('count');
    console.log('📊 Projects table:', {
      status: projectsError ? '❌ Error' : '✅ OK',
      count: projectsCount?.[0]?.count || 0,
      error: projectsError
    });

    // Check RLS by trying to read projects
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
    console.log('🔒 RLS Check:', {
      status: projectError ? '❌ Error' : '✅ OK',
      publicAccess: projectData ? 'Enabled' : 'Disabled',
      error: projectError
    });

    // Check auth configuration
    const { data: authConfig, error: authError } = await supabase.auth.getSession();
    console.log('🔑 Auth Configuration:', {
      status: authError ? '❌ Error' : '✅ OK',
      hasSession: !!authConfig.session,
      error: authError
    });

  } catch (error) {
    console.error('❌ Database state check failed:', error);
  }
};

export const createTestUser = async () => {
  try {
    console.log('🔄 Starting test user creation process...');
    
    // Check database state first
    await logDatabaseState();
    
    const testUser = {
      email: 'test@example.com',
      password: 'Test123!@#',
      fullName: 'Test User'
    };

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password
    });

    if (!checkError && existingUser.user) {
      console.log('✅ Test user already exists and credentials are valid');
      return {
        success: true,
        credentials: {
          email: testUser.email,
          password: testUser.password
        },
        userId: existingUser.user.id
      };
    }

    // Sign up the user
    console.log('📝 Creating auth user...');
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          full_name: testUser.fullName
        }
      }
    });

    if (signUpError) {
      throw new Error(`Auth signup failed: ${signUpError.message}`);
    }

    if (!authData.user) {
      throw new Error('No user data returned from signup');
    }

    console.log('✅ Auth user created:', {
      id: authData.user.id,
      email: authData.user.email
    });

    // Sign in to get session for RLS policies
    console.log('🔑 Signing in to create session...');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: testUser.email,
      password: testUser.password,
    });

    if (signInError) {
      throw new Error(`Sign in failed: ${signInError.message}`);
    }

    // Wait for trigger
    console.log('⏳ Waiting for database trigger...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create profile manually if needed
    console.log('👤 Verifying profile creation...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      console.log('⚠️ Profile not created by trigger, creating manually...');
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: testUser.fullName,
          email: testUser.email,
          address: '123 Test Street'
        });

      if (insertError) {
        throw new Error(`Manual profile creation failed: ${insertError.message}`);
      }
    }

    console.log('✅ Test user setup completed successfully');
    return {
      success: true,
      credentials: {
        email: testUser.email,
        password: testUser.password
      },
      userId: authData.user.id
    };

  } catch (error) {
    console.error('❌ Test user creation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Function to verify if test user exists
export const verifyTestUser = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'test@example.com')
      .single();

    if (error) throw error;

    return {
      exists: !!data,
      profile: data
    };
  } catch (error) {
    console.error('❌ Error verifying test user:', error);
    return {
      exists: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};