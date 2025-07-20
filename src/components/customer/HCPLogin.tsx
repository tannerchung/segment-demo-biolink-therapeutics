import React, { useEffect, useState } from 'react';
import { Stethoscope, ArrowRight, Eye, EyeOff, Building } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const HCPLogin = () => {
  const { trackEvent } = useAnalytics();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    npi: ''
  });

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'hcp_portal_login',
      page_category: 'professional',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track HCP login attempt
    trackEvent('Signed In', {
      method: 'email',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      email_domain: formData.email.split('@')[1] || 'unknown'
    });

    // Simulate HCP identification (in real app, this would come from auth response)
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify('hcp_dr_johnson_md', {
        // Basic profile information
        first_name: 'Michael',
        last_name: 'Johnson',
        name: 'Dr. Michael Johnson',
        email: formData.email,
        email_domain: formData.email.split('@')[1] || 'unknown',
        
        // Professional information
        specialty: 'Pediatric Genetics',
        institution: 'Boston Children\'s Hospital',
        location: 'Boston, MA',
        npi_number: formData.npi || '1234567890',
        years_experience: 15,
        
        // Account details
        account_status: 'active',
        user_type: 'healthcare_professional',
        login_method: 'password',
        last_login: new Date().toISOString(),
        
        // Professional engagement
        hcp_verified: true,
        portal_access: true,
        
        // Add marketing attribution to user profile
        ...(localStorage.getItem('marketing_attribution') && {
          ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
        })
      });
    }

    // Simulate successful login
    alert('Login successful! Welcome to the HCP portal.');
    window.location.href = '/hcp/dashboard';
  };

  const handleForgotPassword = () => {
    trackEvent('HCP Password Reset Requested', {
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleRegisterInterest = () => {
    trackEvent('HCP Registration Interest', {
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">HCP Portal Login</h1>
          <p className="text-gray-600">
            Access clinical information, educational resources, and medical data for BioLink therapies.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Email Address
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your professional email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* NPI Number (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NPI Number (Optional)
              </label>
              <input
                type="text"
                name="npi"
                value={formData.npi}
                onChange={handleInputChange}
                placeholder="Enter your NPI number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
            >
              Sign In to HCP Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              New to BioLink HCP Portal?{' '}
              <button 
                onClick={handleRegisterInterest}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Request Access
              </button>
            </p>
          </div>
        </div>

        {/* Professional Verification Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">Professional Verification</h3>
          <p className="text-blue-800 text-sm">
            Access to medical information is restricted to licensed healthcare professionals. 
            Your credentials will be verified to ensure compliance with medical information regulations.
          </p>
        </div>

        {/* Support Contact */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help accessing your account?{' '}
            <button
              onClick={() => trackEvent('HCP Support Contact Request', {
                source: 'login_page',
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Contact Medical Affairs
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HCPLogin;