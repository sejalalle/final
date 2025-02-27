import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = ({ onLoginSuccess, onSignUpClick, onForgotPasswordClick }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onLoginSuccess({ ...formData, rememberMe });
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Login failed. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100 mt-20 ">
      <div className="flex w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20 ">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 via-fuchsia-400/20 to-sky-400/20" />
          <img
            src="https://parksonspackaging.com/wp-content/uploads/2023/12/Company-Background-scaled.jpg"
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
          </div>

          {errors.general && (
            <div className="p-4 bg-rose-50 border-l-4 border-rose-400 text-rose-700 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 pl-12 
                             focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all duration-200
                             group-hover:border-violet-300"
                    placeholder="you@example.com"
                  />
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-hover:text-violet-400 transition-colors duration-200" />
                </div>
                {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 pr-12
                             focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all duration-200
                             group-hover:border-violet-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-violet-500 transition-colors duration-200"
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-violet-500 border-gray-300 rounded 
                           focus:ring-violet-400 transition-colors duration-200"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm text-violet-500 hover:text-fuchsia-500 transition-colors duration-200"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 text-white rounded-xl
                       font-medium shadow-lg shadow-violet-200 hover:shadow-violet-300
                       hover:from-violet-600 hover:via-fuchsia-600 hover:to-sky-600
                       focus:ring-4 focus:ring-violet-200 disabled:opacity-50 
                       disabled:cursor-not-allowed transform transition-all duration-200
                       hover:-translate-y-0.5"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignUpClick}
                  className="text-violet-500 hover:text-fuchsia-500 font-medium transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;    