import React, { useEffect } from 'react';
import { User, Lock, UserPlus, ArrowRight, Shield, Heart, Calendar } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const PatientPortal = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_portal_landing',
      page_category: 'portal',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handlePortalAction = (action: string, destination: string) => {
    // Follow Segment B2B SaaS spec
    if (action === 'login_attempt') {
      trackEvent('Signed In', {
        method: 'email',
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    } else if (action === 'register_intent') {
      trackEvent('Signed Up', {
        method: 'email',
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    } else if (action === 'forgot_password') {
      trackEvent('Password Reset', {
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    } else if (action === 'support_contact') {
      trackEvent('Support Ticket Created', {
        channel: destination,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Treatment Tracking',
      description: 'Monitor your therapy progress and upcoming appointments'
    },
    {
      icon: Calendar,
      title: 'Appointment Management',
      description: 'Schedule and manage your medical appointments'
    },
    {
      icon: User,
      title: 'Care Team Access',
      description: 'Connect directly with your care coordinators'
    },
    {
      icon: Shield,
      title: 'Secure Messaging',
      description: 'HIPAA-compliant communication with your healthcare team'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            BioLink Patient Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your secure gateway to managing your rare disease treatment journey. 
            Access your treatment information, connect with your care team, and track your progress.
          </p>
        </div>

        {/* Login/Register Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Existing Patients */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-10 w-10 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Existing Patients</h2>
              <p className="text-gray-600">
                Access your patient portal to view treatment progress, schedule appointments, and communicate with your care team.
              </p>
            </div>

            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email') as string;
                
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
                const mockPatient = mockPatients[email.toLowerCase() as keyof typeof mockPatients];
                
                handlePortalAction('login_attempt', '/portal/dashboard');
                
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
                      email: email,
                      email_domain: email.split('@')[1] || 'unknown',
                      
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
                  
                  // Redirect to dashboard with user ID
                  window.location.href = `/portal/dashboard?userId=${mockPatient.userId}`;
                } else {
                  // Handle non-mock email - redirect to generic dashboard
                  alert('Email not recognized. Please use one of the mock patient emails or create a new account.');
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Try: emma.l@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Any password works for demo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center"
              >
                Sign In to Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <a 
                href="#"
                onClick={() => handlePortalAction('forgot_password', '/portal/reset')}
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* New Patients */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="h-10 w-10 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">New Patients</h2>
              <p className="text-gray-600">
                Create your patient portal account to begin your treatment journey and access personalized support.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <span className="text-gray-700">Complete treatment eligibility assessment</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <span className="text-gray-700">Schedule genetic testing</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <span className="text-gray-700">Track insurance verification</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                <span className="text-gray-700">Connect with care coordinators</span>
              </div>
            </div>

            <a
              href="/portal/register"
              onClick={() => handlePortalAction('register_intent', '/portal/register')}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Portal Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
          <div className="flex items-start">
            <Shield className="h-8 w-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Your Privacy & Security</h3>
              <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                <div>
                  <h4 className="font-semibold mb-2">HIPAA Compliant</h4>
                  <p className="text-sm">All patient information is protected according to HIPAA regulations and industry best practices.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Secure Access</h4>
                  <p className="text-sm">Multi-factor authentication and encrypted connections ensure your data remains secure.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Protection</h4>
                  <p className="text-sm">Your personal health information is never shared without your explicit consent.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">24/7 Monitoring</h4>
                  <p className="text-sm">Our systems are continuously monitored for security threats and unauthorized access.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Accessing Your Portal?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our patient support team is available 24/7 to help you with portal access, 
            technical issues, or any questions about your treatment journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handlePortalAction('support_contact', 'phone')}
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Call Support: 1-800-BIOLINK
            </button>
            <button
              onClick={() => handlePortalAction('support_contact', 'email')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 border border-white/30"
            >
              Email Support Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;