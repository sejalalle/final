import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Github } from 'lucide-react';

const SignUp = ({ onBack, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    passwordHint: '',
    confirmPasswordError: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      validatePassword(value);
    }
    if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const allRequirementsMet = Object.values(requirements).every(Boolean);

    setErrors((prev) => ({
      ...prev,
      passwordHint: allRequirementsMet
        ? ''
        : 'Password must contain: 8+ chars, uppercase, lowercase, number, special char',
    }));

    return allRequirementsMet;
  };

  const validateConfirmPassword = (confirmPassword) => {
    const matches = confirmPassword === formData.password;
    setErrors((prev) => ({
      ...prev,
      confirmPasswordError: matches ? '' : 'Passwords do not match',
    }));
    return matches;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(formData.password);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSignUpSuccess(formData);
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleGitHubSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100 mt-32">
      <div className="w-full max-w-3xl p-8 transform transition-all duration-300">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600 mt-2 font-medium">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-20 bg-gray-50 
                         focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200
                         hover:border-purple-200"
              >
                <option value="" disabled>Select a role</option>
                <option value="visitor">Visitor</option>
                <option value="user">User</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-20 bg-gray-50 
                           focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200 pl-12
                           group-hover:border-purple-200"
                  placeholder="you@example.com"
                  required
                />
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-20 bg-gray-50 
                           focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200
                           group-hover:border-purple-200"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPassword.password ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.passwordHint && (
                <p className="mt-2 text-sm text-pink-600">{errors.passwordHint}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-20 bg-gray-50 
                           focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200
                           group-hover:border-purple-200"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPassword.confirmPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPasswordError && (
                <p className="mt-2 text-sm text-pink-600">{errors.confirmPasswordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-medium
                       hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 focus:ring-4 focus:ring-purple-300
                       disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02]
                       shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center px-4 py-3 space-x-2 bg-white border-2 border-gray-200 rounded-xl
                         hover:bg-gray-50 transition-colors duration-200 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-gray-700 font-medium group-hover:text-gray-900">Google</span>
              </button>

              <button
                onClick={handleGitHubSignUp}
                className="flex items-center justify-center px-4 py-3 space-x-2 bg-gray-900 rounded-xl
                         hover:bg-gray-800 transition-colors duration-200"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-white font-medium">GitHub</span>
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onBack}
                  className="text-purple-500 hover:text-pink-500 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;