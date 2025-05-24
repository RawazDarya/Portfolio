import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // Corrected path

// IMPORTANT: This is a very basic authentication mechanism.
// For a production environment, use a robust authentication solution.
const STUDIO_PASSWORD = '112233'; // Replace with a strong, unique password, ideally from an environment variable.

function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        // Check for specific error types if needed, e.g., invalid login credentials
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(signInError.message); // Show other Supabase auth errors
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Login successful
        onLoginSuccess(); 
      } else {
        // Should not happen if signInError is null and user is null, but as a fallback
        setError('Login failed. Please try again.');
      }
    } catch (catchError) {
      // Catch any unexpected errors during the process
      console.error("Login catch error:", catchError);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-700">Studio Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 whitespace-pre-line">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          This is a basic security measure. For production, please implement proper authentication.
        </p>
      </div>
    </div>
  );
}

export default Auth; 