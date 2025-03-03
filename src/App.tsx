import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
// Remove unused import
import { ContactSection } from './components/ContactSection';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { useAuth } from './hooks/useAuth';
import { testSupabaseConnectivity, testDatabaseTables, testRLSPolicies } from './lib/supabaseTest';
import { createTestUser, verifyTestUser } from './lib/testSetup';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading } = useAuth();

  useEffect(() => {
    // Test Supabase connection on app start
    testSupabaseConnectivity();
  }, []);

  const testDatabase = async (): Promise<void> => {
    console.log('🔄 Starting Comprehensive Supabase Tests...');
    
    // Test overall connectivity
    const connectivityResults = await testSupabaseConnectivity();
    console.log('📊 Connectivity Results:', connectivityResults);
    
    // Test database tables
    const tableResults = await testDatabaseTables();
    console.log('📊 Database Tables Results:', tableResults);
    
    // Test RLS policies
    const rlsResults = await testRLSPolicies();
    console.log('📊 RLS Policy Results:', rlsResults);
  };

  const setupTestUser = async () => {
    console.log('🔄 Setting up test user...');
    
    // First check if test user exists
    const { exists, profile } = await verifyTestUser();
    
    if (exists) {
      console.log('✅ Test user already exists:', profile);
      return {
        message: 'Test user already exists',
        credentials: {
          email: 'test@example.com',
          password: 'Test123!@#'
        }
      };
    }
    
    // If not exists, create new test user
    const result = await createTestUser();
    
    if (result.success) {
      console.log('✅ Test user created successfully');
      return {
        message: 'Test user created successfully',
        credentials: result.credentials
      };
    } else {
      console.error('❌ Failed to create test user:', result.error);
      return {
        message: 'Failed to create test user',
        error: result.error
      };
    }
  };

  // Show a more user-friendly loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route
            path="/*"
            element={
              user ? (
                <>
                  <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                  <main className="pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;