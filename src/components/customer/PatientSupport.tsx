import React, { useEffect } from 'react';
import { Heart, Phone, Download, Users, MapPin, Calendar, FileText, CreditCard } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DownloadAnimation from '../DownloadAnimation';

const PatientSupport = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_support',
      page_category: 'resources',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleDownload = (contentType: string, title: string) => {
    trackEvent('Content Downloaded', {
      content_type: contentType,
      content_title: title,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      file_format: 'PDF'
    });
  };

  const handleSupportContact = (contactMethod: string, supportType: string) => {
    trackEvent('Patient Support Contact', {
      contact_method: contactMethod,
      support_type: supportType,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const resources = [
    {
      icon: Heart,
      title: 'Patient Support Hotline',
      description: '24/7 multilingual support for patients and caregivers',
      action: 'Call Now: 1-800-BIOLINK',
      contactMethod: 'phone',
      supportType: 'general_support'
    },
    {
      icon: FileText,
      title: 'Educational Materials',
      description: 'Comprehensive guides about rare diseases and treatments',
      action: 'Download Resources',
      contactMethod: 'download',
      supportType: 'educational_materials'
    },
    {
      icon: Users,
      title: 'Patient Communities',
      description: 'Connect with other patients and families facing similar journeys',
      action: 'Join Community',
      contactMethod: 'online',
      supportType: 'peer_support'
    },
    {
      icon: MapPin,
      title: 'Treatment Centers',
      description: 'Find specialized care centers near you',
      action: 'Locate Centers',
      contactMethod: 'online',
      supportType: 'treatment_centers'
    },
    {
      icon: Calendar,
      title: 'Care Coordination',
      description: 'Assistance with appointment scheduling and care planning',
      action: 'Schedule Support',
      contactMethod: 'phone',
      supportType: 'care_coordination'
    },
    {
      icon: CreditCard,
      title: 'Financial Assistance',
      description: 'Programs to help make treatments accessible and affordable',
      action: 'Learn About Aid',
      contactMethod: 'online',
      supportType: 'financial_assistance'
    }
  ];

  const downloadableResources = [
    {
      title: 'Understanding Your Rare Disease',
      description: 'Comprehensive guide to rare disease basics',
      type: 'patient_guide',
      pages: '24 pages'
    },
    {
      title: 'Treatment Journey Roadmap',
      description: 'Step-by-step guide through the treatment process',
      type: 'treatment_roadmap',
      pages: '16 pages'
    },
    {
      title: 'Insurance Coverage Guide',
      description: 'Understanding your insurance benefits and coverage',
      type: 'insurance_guide',
      pages: '12 pages'
    },
    {
      title: 'Caregiver Support Handbook',
      description: 'Resources and tips for family caregivers',
      type: 'caregiver_handbook',
      pages: '20 pages'
    },
    {
      title: 'Managing Side Effects',
      description: 'Common side effects and management strategies',
      type: 'side_effects_guide',
      pages: '8 pages'
    },
    {
      title: 'Nutrition and Wellness',
      description: 'Dietary guidelines and wellness tips',
      type: 'wellness_guide',
      pages: '14 pages'
    }
  ];

  const programs = [
    {
      name: 'BioLink Cares',
      description: 'Comprehensive patient assistance program providing financial support and care coordination.',
      features: ['Co-pay assistance', 'Free drug programs', 'Insurance navigation', 'Nurse support'],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      eligibility: 'Income-based eligibility',
      coverage: 'Up to 100% of treatment costs'
    },
    {
      name: 'Family Connect',
      description: 'Support network connecting families affected by rare diseases for mutual support and advocacy.',
      features: ['Peer mentorship', 'Family events', 'Educational webinars', 'Advocacy training'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      eligibility: 'All BioLink patients and families',
      coverage: 'Free participation'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Patient Resources & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that comprehensive patient support extends far beyond our therapies. 
            Our dedicated programs ensure patients and families have the resources they need throughout their journey.
          </p>
        </div>

        {/* Support Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors duration-300">
                <resource.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{resource.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
              <button 
                onClick={() => handleSupportContact(resource.contactMethod, resource.supportType)}
                className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200"
              >
                {resource.action} →
              </button>
            </div>
          ))}
        </div>

        {/* Downloadable Resources */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Educational Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableResources.map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Download className="h-6 w-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-gray-500">{resource.pages}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                <DownloadAnimation
                  fileName={`${resource.title.replace(/\s+/g, '_')}.pdf`}
                  onDownload={() => handleDownload(resource.type, resource.title)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
                >
                  Download PDF
                </DownloadAnimation>
              </div>
            ))}
          </div>
        </div>

        {/* Support Programs */}
        <div className="space-y-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Support Programs</h2>
          {programs.map((program, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img
                  src={program.image}
                  alt={program.name}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              
              <div className={`bg-white p-8 rounded-2xl shadow-lg ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{program.name}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Eligibility</h4>
                      <p className="text-gray-600 text-sm">{program.eligibility}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Coverage</h4>
                      <p className="text-gray-600 text-sm">{program.coverage}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSupportContact('online', `${program.name.toLowerCase().replace(' ', '_')}_enrollment`)}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
                >
                  Learn More About {program.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Email Capture for Updates */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Connected</h2>
            <p className="text-gray-600 mb-6">
              Get updates on new resources, support programs, and patient education materials.
            </p>
            <form 
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email') as string;
                
                // Generate user ID from email
                const userId = `user_${email.split('@')[0]}_${Date.now()}`;
                
                // Identify user with Segment
                if (typeof window !== 'undefined' && (window as any).analytics) {
                  (window as any).analytics.identify(userId, {
                    email: email,
                    email_domain: email.split('@')[1] || 'unknown',
                    source: 'patient_support_email_capture',
                    signup_date: new Date().toISOString(),
                    user_type: 'prospect',
                    interest: 'patient_support',
                    // Add marketing attribution to user profile
                    ...(localStorage.getItem('marketing_attribution') && {
                      ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
                    })
                  });
                }
                
                trackEvent('Email Capture Form Submitted', {
                  form_type: 'patient_support_updates',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
                  email_domain: email.split('@')[1] || 'unknown',
                  user_id: userId
                });
                
                alert('Thank you for subscribing! You will receive updates about patient resources.');
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">24/7 Emergency Support</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            If you're experiencing a medical emergency related to your treatment, 
            our dedicated medical team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleSupportContact('phone', 'emergency_hotline')}
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Emergency Hotline: 1-800-BIOLINK
            </button>
            <button
              onClick={() => handleSupportContact('online', 'medical_information_request')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 border border-white/30"
            >
              Medical Information Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSupport;