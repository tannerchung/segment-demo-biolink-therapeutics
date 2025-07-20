import React, { useEffect, useState } from 'react';
import { UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const Register = () => {
  const { trackEvent } = useAnalytics();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageRange: '',
    condition: '',
    source: '',
    agreeToTerms: false
  });

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_registration',
      page_category: 'portal',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Generate hashed user ID (simulate)
    const userId = `patient_${formData.firstName.toLowerCase()}_${formData.lastName.charAt(0).toLowerCase()}_hashed`;
    
    // Track account creation
    trackEvent('Signed Up', {
      method: 'email',
      age_range: formData.ageRange,
      condition: formData.condition,
      registration_source: formData.source,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      email_domain: formData.email.split('@')[1] || 'unknown'
    });

    // Identify user with comprehensive profile data
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify(userId, {
        // Basic profile information
        first_name: formData.firstName,
        last_name: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        email_domain: formData.email.split('@')[1] || 'unknown',
        
        // Medical information
        age_range: formData.ageRange,
        condition: formData.condition,
        
        // Registration details
        registration_source: formData.source,
        registration_date: new Date().toISOString(),
        account_status: 'active',
        user_type: 'patient',
        
        // Journey tracking
        journey_stage: 'account_created',
        onboarding_completed: false,
        
        // Add marketing attribution to user profile
        ...(localStorage.getItem('marketing_attribution') && {
          ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
        })
      });
    }

    // Simulate successful registration
    alert('Account created successfully! Please check your email to verify your account.');
    window.location.href = '/portal/dashboard';
  };

  const ageRanges = [
    { value: '0-12', label: '0-12 years' },
    { value: '13-17', label: '13-17 years' },
    { value: '18-25', label: '18-25 years' },
    { value: '26-40', label: '26-40 years' },
    { value: '41-60', label: '41-60 years' },
    { value: '60+', label: '60+ years' }
  ];

  const conditions = [
    { value: 'gaucher_disease', label: 'Gaucher Disease' },
    { value: 'fabry_disease', label: 'Fabry Disease' },
    { value: 'pompe_disease', label: 'Pompe Disease' },
    { value: 'mps_disorders', label: 'MPS Disorders' },
    { value: 'alpha1_antitrypsin', label: 'Alpha-1 Antitrypsin Deficiency' },
    { value: 'hereditary_angioedema', label: 'Hereditary Angioedema' },
    { value: 'glycogen_storage', label: 'Glycogen Storage Disease' },
    { value: 'other', label: 'Other Rare Disease' },
    { value: 'not_diagnosed', label: 'Not Yet Diagnosed' }
  ];

  const sources = [
    { value: 'physician_referral', label: 'Physician Referral' },
    { value: 'online_search', label: 'Online Search' },
    { value: 'patient_advocacy', label: 'Patient Advocacy Group' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'family_friend', label: 'Family/Friend' },
    { value: 'medical_conference', label: 'Medical Conference' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Patient Portal Account</h1>
          <p className="text-gray-600">
            Join thousands of patients managing their rare disease treatment journey with BioLink.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range *
                </label>
                <select
                  name="ageRange"
                  required
                  value={formData.ageRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  {ageRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about BioLink? *
              </label>
              <select
                name="source"
                required
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select source</option>
                {sources.map(source => (
                  <option key={source.value} value={source.value}>{source.label}</option>
                ))}
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                  Privacy Policy
                </a>
                . I understand that my health information will be protected according to HIPAA regulations.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/portal/login" className="text-orange-600 hover:text-orange-700 font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">Your Information is Secure</h3>
          <p className="text-blue-800 text-sm">
            All personal health information is encrypted and protected according to HIPAA regulations. 
            Your data will never be shared without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;