import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nitLogo from '../assets/logo2.png';
import VantaGlobeBackground from '../components/VantaGlobeBackground';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Sign in with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || 'Login failed: Invalid credentials.');
        return;
      }

      // Optional: Check if user has admin role via custom claims or a separate table
      // For now, any authenticated user can access the dashboard
      console.log('Login successful!', data.user.email);
      navigate('/admin/dashboard');

    } catch (err) {
      setError('Server connection failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 Gluten text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30";
  const labelClass = "block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate";

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <VantaGlobeBackground />

      {/* Dynamic Overlay for depth and clarity */}
      <div className="fixed inset-0 z-0 "></div>

      {/* Main Form Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 animate-fade-in">

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/20 p-8 md:p-10 rounded-xl shadow-2xl shadow-blue-500/40 border border-blue-700/60 space-y-7 backdrop-blur-md"
        >

          <div className="flex flex-col items-center mb-6">
            {nitLogo && (
              <img src={nitLogo} alt="NIT Nagaland Logo" className="h-16 w-auto mb-4 title-rocking" />
            )}
            <h1 className="text-4xl font-extrabold rokkitt text-cyan-400 font-anton text-center tracking-wide leading-tight">
              ADMIN ACCESS
            </h1>
            <p className="text-sm text-gray-400 mt-2 font-mono Gluten">Tech Avinya Dashboard</p>
          </div>

          {error && (
            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg border border-red-700">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className={labelClass}>Admin Email</label>
            <input type="email" id="email" required className={inputClass} placeholder="admin@nitn.ac.in" onChange={handleInputChange} />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input type="password" id="password" required className={inputClass} placeholder="********" onChange={handleInputChange} />
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg transition-all duration-300
                         bg-gradient-to-r from-teal-600 to-blue-600 border border-teal-500 text-white
                         hover:from-teal-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/50
                         active:scale-95 disabled:bg-gray-600 disabled:border-gray-500 disabled:shadow-none"
            >
              {isSubmitting ? 'Authenticating...' : 'Secure Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}