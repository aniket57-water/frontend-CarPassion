// D:\client_CarPassion4\src\pages\Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }
    
    try {
      setLoading(true);
      const result = await login(username, password);
      
      if (!result || !result.success) {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Futuristic background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)', 
               backgroundSize: '32px 32px',
               backgroundPosition: 'center'
             }}>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute w-64 h-64 bg-blue-500 rounded-full top-1/4 left-1/4 filter blur-3xl opacity-10"></div>
      <div className="absolute bg-indigo-600 rounded-full bottom-1/4 right-1/4 w-96 h-96 filter blur-3xl opacity-5"></div>
      
      <div className="z-10 w-full max-w-md px-8">
        <div className="relative overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl">
          {/* Top highlight border */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
          <div className="p-8 space-y-8">
            <div>
              <h2 className="mt-6 text-3xl font-bold text-center text-blue-400">
                Admin Login
              </h2>
              <p className="mt-2 text-sm text-center text-gray-400">
                Please sign in to manage your inventory
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="username" className="block mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full px-4 py-3 text-gray-200 transition-all duration-300 border border-gray-700 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
                </div>
                
                <div className="relative">
                  <label htmlFor="password" className="block mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full px-4 py-3 text-gray-200 transition-all duration-300 border border-gray-700 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 border border-transparent rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-blue-500/25"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                    </span>
                  ) : (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-5 h-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <span className="relative z-10">{loading ? 'Authenticating...' : 'Sign in'}</span>
                </button>
                
                {/* Button glow effect */}
                <div className="absolute bottom-0 w-1/2 h-px transform -translate-x-1/2 bg-blue-500 left-1/2 filter blur-sm"></div>
              </div>
            </form>
          </div>
          
          {/* Bottom border with scanner animation */}
          <div 
            className="absolute bottom-0 left-0 h-0.5 bg-blue-500 opacity-75" 
            style={{ 
              width: '100%',
              animation: 'scan 2s infinite linear'
            }}>
          </div>

          {/* Inject the animation */}
          <style jsx>{`
            @keyframes scan {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-8 text-xs text-center text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="mt-2">SECURE CONNECTION ESTABLISHED</p>
        </div>
      </div>
    </div>
  );
};

export default Login;