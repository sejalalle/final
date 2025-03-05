import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = ({ onBack }) => {
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    passwordHint: '',
    confirmPasswordError: '',
    general: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'newPassword') {
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
    const matches = confirmPassword === formData.newPassword;
    setErrors((prev) => ({
      ...prev,
      confirmPasswordError: matches ? '' : 'Passwords do not match',
    }));
    return matches;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(formData.newPassword);
    const isConfirmPasswordValid = validateConfirmPassword(formData.confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) return;

    setIsLoading(true);
    setErrors({ general: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: formData.token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Password reset successful! Redirecting...');
        setTimeout(() => onBack(), 2000); // Redirect to login after 2 sec
      } else {
        setErrors((prev) => ({ ...prev, general: data.message || 'Something went wrong' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: 'Failed to reset password. Try again.' }));
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100">
      <div className="w-full max-w-md p-8 transform transition-all duration-300">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-gray-600 mt-2 font-medium">Enter your new password</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-pulse">
              {successMessage}
            </div>
          )}

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Token Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reset Token</label>
              <input
                type="text"
                name="token"
                value={formData.token}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 
                         focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200"
                placeholder="Enter reset token"
                required
              />
            </div>

            {/* New Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative group">
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 
                           focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200
                           group-hover:border-purple-200"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPassword.newPassword ? (
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative group">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 
                           focus:ring-2 focus:ring-pink-400 focus:border-purple-400 transition-all duration-200
                           group-hover:border-purple-200"
                  placeholder="Confirm new password"
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

            {/* Submit Button */}
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
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={onBack}
                  className="text-purple-500 hover:text-pink-500 font-medium transition-colors"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;