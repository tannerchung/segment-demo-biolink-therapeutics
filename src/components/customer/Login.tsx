import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const Login = () => {
  const { trackEvent } = useAnalytics();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_portal_login',
      page_category: 'portal',
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
    
    // Mock patient email mapping
    const mockPatients = {
      'sarah.m@email.com': {
        userId: 'patient_sarah_m_hashed',
        name: 'Sarah M.',
        therapy_program: 'BioLink-GTx',
        support_tier: 'Premium',
        journey_stage: 'Ongoing Care',
        age_range: '30-35',
        condition: 'rare_metabolic_disorder'
      },
      'emma.l@email.com': {
        userId: 'patient_emma_l_hashed',
        name: 'Emma L.',
        therapy_program: 'BioLink-GTx',
        support_tier: 'Standard',
        journey_stage: 'Treatment Approved',
        age_range: '8-12',
        condition: 'lysosomal_storage_disorder'
      },
      'michael.r@email.com': {
        userId: 'patient_michael_r_hashed',
        name: 'Michael R.',
        therapy_program: 'BioLink-ENZ',
        support_tier: 'Premium',
        journey_stage: 'Assessment Complete',
        age_range: '35-45',
        condition: 'metabolic_disorder'
      },
      'david.l@email.com': {
        userId: 'patient_david_l_hashed',
        name: 'David L.',
        therapy_program: 'BioLink-ENZ',
        support_tier: 'Standard',
        journey_stage: 'Genetic Testing',
        age_range: '40-50',
        condition: 'fabry_disease'
      },
      'lisa.w@email.com': {
        userId: 'patient_lisa_w_hashed',
        name: 'Lisa W.',
        therapy_program: 'BioLink-ENZ',
        support_tier: 'Premium',
        journey_stage: 'Insurance Verification',
        age_range: '25-30',
        condition: 'alpha1_antitrypsin'
      },
      'robert.k@email.com': {
        userId: 'patient_robert_k_hashed',
        name: 'Robert K.',
        therapy_program: 'BioLink-GTx',
        support_tier: 'Standard',
        journey_stage: 'Ongoing Care',
        age_range: '55-65',
        condition: 'pompe_disease'
      },
      'jennifer.m@email.com': {
        userId: 'patient_jennifer_m_hashed',
        name: 'Jennifer M.',
        therapy_program: 'BioLink-ENZ',
        support_tier: 'Premium',
        journey_stage: 'First Dose',
        age_range: '28-35',
        condition: 'hereditary_angioedema'
      }
    };

    // Check if email matches a mock patient
    const mockPatient = mockPatients[formData.email.toLowerCase() as keyof typeof mockPatients];
    
    // Track login attempt
    trackEvent('Signed In', {
      method: 'email',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      email_domain: formData.email.split('@')[1] || 'unknown'
    });

    if (mockPatient) {
      // Store the user ID in localStorage for dashboard access
      localStorage.setItem('currentPatientId', mockPatient.userId);
      
      // Identify the specific mock patient
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.identify(mockPatient.userId, {
          // Basic profile information
          first_name: mockPatient.name.split(' ')[0],
          last_name: mockPatient.name.split(' ')[1] || '',
          name: mockPatient.name,
          email: formData.email,
          email_domain: formData.email.split('@')[1] || 'unknown',
          
          // Medical information
          therapy_program: mockPatient.therapy_program,
          support_tier: mockPatient.support_tier,
          journey_stage: mockPatient.journey_stage,
          age_range: mockPatient.age_range,
          condition: mockPatient.condition,
          
          // Account details
          account_status: 'active',
          user_type: 'patient',
          login_method: 'password',
          last_login: new Date().toISOString(),
          
          // Journey tracking
          onboarding_completed: true,
          portal_access: true,
          
          // Add marketing attribution to user profile
          ...(localStorage.getItem('marketing_attribution') && {
            ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
          })
        });
      }
      
      // Simulate successful login
      alert(`Login successful! Welcome ${mockPatient.name}. Redirecting to your dashboard...`);
      window.location.href = `/portal/dashboard?userId=${mockPatient.userId}`;
    } else {
      // Handle non-mock email
      alert('Email not recognized. Please use one of the mock patient emails or create a new account.');
    }
  };

  const handleForgotPassword = () => {
    trackEvent('Password Reset Requested', {
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to your BioLink patient portal to access your treatment information and resources.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/portal/register" className="text-teal-600 hover:text-teal-700 font-medium">
                Create one here
              </a>
            </p>
          </div>
        </div>

        {/* Mock Patient Emails */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-4">Demo Patient Emails</h3>
          <p className="text-blue-800 text-sm mb-4">Use any of these emails to login as different mock patients:</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">sarah.m@email.com</span>
              <span className="text-blue-600">Sarah M. - BioLink-GTx</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">emma.l@email.com</span>
              <span className="text-blue-600">Emma L. - BioLink-GTx (Pediatric)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">michael.r@email.com</span>
              <span className="text-blue-600">Michael R. - BioLink-ENZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">david.l@email.com</span>
              <span className="text-blue-600">David L. - BioLink-ENZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">lisa.w@email.com</span>
              <span className="text-blue-600">Lisa W. - BioLink-ENZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">robert.k@email.com</span>
              <span className="text-blue-600">Robert K. - BioLink-GTx</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 font-mono">jennifer.m@email.com</span>
              <span className="text-blue-600">Jennifer M. - BioLink-ENZ</span>
            </div>
          </div>
          <p className="text-blue-700 text-xs mt-3">Password can be anything for demo purposes</p>
        </div>
        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">Secure Access</h3>
          <p className="text-blue-800 text-sm">
            Your login is protected with industry-standard encryption. All patient information 
            is secured according to HIPAA regulations.
          </p>
        </div>

        {/* Support Contact */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need help accessing your account?{' '}
            <button
              onClick={() => trackEvent('Support Contact Request', {
                source: 'login_page',
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;