import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        if (setUser) setUser(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Connection to backend failed. Please ensure the server is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 py-12">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/register_bg.png" 
          alt="Register Background" 
          className="w-full h-full object-cover filter brightness-[0.4] dark:brightness-[0.2]"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-8 py-10 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl mx-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Create an Account</h2>
          <p className="text-gray-300">Join us and start booking your dream destinations.</p>
        </div>

        {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl text-sm font-medium text-center backdrop-blur-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-5 py-3 rounded-full bg-white/20 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-5 py-3 rounded-full bg-white/20 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-5 py-3 rounded-full bg-white/20 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full px-5 py-3 rounded-full bg-white/20 dark:bg-gray-800/60 border border-white/10 dark:border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center"
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
