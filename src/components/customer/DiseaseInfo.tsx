import React, { useEffect, useState } from 'react';
import { Heart, Download, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DownloadAnimation from '../DownloadAnimation';

interface DiseaseInfoProps {
  therapy?: 'gtx' | 'enz';
}

const DiseaseInfo: React.FC<DiseaseInfoProps> = ({ therapy }) => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view
    const pageName = therapy ? `biolink-${therapy}-info` : 'rare-disease-info';
    trackEvent('Page Viewed', {
      page_name: pageName,
      page_category: 'education',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      therapy_focus: therapy || 'general'
    });
  }, []);

  const handleDownload = (contentType: string, title: string) => {
    trackEvent('Content Downloaded', {
      content_type: contentType,
      content_title: title,
      therapy_program: therapy ? `BioLink-${therapy.toUpperCase()}` : 'general',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      file_format: 'PDF'
    });
  };

  const handleEmailCapture = () => {
    trackEvent('Email Capture Intent', {
      form_type: 'disease_info_request',
      therapy_interest: therapy ? `BioLink-${therapy.toUpperCase()}` : 'general',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const therapyData = {
    gtx: {
      title: 'BioLink-GTx Gene Therapy',
      subtitle: 'Revolutionary treatment for lysosomal storage disorders',
      description: 'BioLink-GTx is a groundbreaking gene therapy that addresses the underlying genetic cause of lysosomal storage disorders, providing sustained treatment benefits.',
      mechanism: 'Gene therapy that delivers functional copies of defective genes directly to affected cells',
      conditions: ['Gaucher Disease', 'Fabry Disease', 'Pompe Disease', 'MPS Disorders'],
      benefits: [
        'One-time treatment with lasting effects',
        'Addresses root cause of disease',
        'Significant improvement in quality of life',
        'Reduced need for ongoing treatments'
      ],
      image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    enz: {
      title: 'BioLink-ENZ Enzyme Replacement',
      subtitle: 'Advanced enzyme therapy for metabolic disorders',
      description: 'BioLink-ENZ provides essential enzymes that are missing or deficient in patients with rare metabolic disorders, helping restore normal cellular function.',
      mechanism: 'Enzyme replacement therapy that supplements missing or deficient enzymes',
      conditions: ['Alpha-1 Antitrypsin Deficiency', 'Hereditary Angioedema', 'Glycogen Storage Disease', 'Lysosomal Acid Lipase Deficiency'],
      benefits: [
        'Regular infusions to maintain enzyme levels',
        'Proven safety and efficacy profile',
        'Comprehensive patient support program',
        'Flexible dosing options'
      ],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  };

  const currentTherapy = therapy ? therapyData[therapy] : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentTherapy ? currentTherapy.title : 'Understanding Rare Diseases'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTherapy ? currentTherapy.subtitle : 'Comprehensive information about rare diseases and innovative treatment options'}
          </p>
        </div>

        {currentTherapy ? (
          /* Specific Therapy Information */
          <div className="space-y-16">
            {/* Therapy Overview */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {currentTherapy.description}
                </p>
                <div className="bg-teal-50 p-6 rounded-xl border-l-4 border-teal-500">
                  <h3 className="font-bold text-teal-900 mb-2">Mechanism of Action</h3>
                  <p className="text-teal-800">{currentTherapy.mechanism}</p>
                </div>
              </div>
              <div>
                <img
                  src={currentTherapy.image}
                  alt={currentTherapy.title}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Conditions Treated */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Conditions Treated</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentTherapy.conditions.map((condition, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{condition}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Benefits */}
            <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">Treatment Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentTherapy.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* General Rare Disease Information */
          <div className="space-y-16">
            {/* Overview */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Rare Diseases?</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Rare diseases affect fewer than 200,000 people in the United States. While each disease is rare, 
                  collectively they affect 25-30 million Americans. Most rare diseases are genetic and chronic, 
                  often affecting multiple organ systems.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-teal-600 mr-3" />
                    <span>Over 7,000 known rare diseases</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-teal-600 mr-3" />
                    <span>Average diagnosis time: 5-7 years</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-teal-600 mr-3" />
                    <span>80% are genetic in origin</span>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Rare disease research"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Our Therapies */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">BioLink-GTx</h3>
                <p className="text-gray-600 mb-6">
                  Gene therapy for lysosomal storage disorders, providing a one-time treatment 
                  that addresses the root cause of disease.
                </p>
                <a 
                  href="/biolink-gtx"
                  onClick={() => trackEvent('Therapy Link Clicked', {
                    therapy: 'BioLink-GTx',
                    source_page: 'rare_diseases',
                    device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                  })}
                  className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">BioLink-ENZ</h3>
                <p className="text-gray-600 mb-6">
                  Enzyme replacement therapy for metabolic disorders, supplementing missing 
                  or deficient enzymes to restore cellular function.
                </p>
                <a 
                  href="/biolink-enz"
                  onClick={() => trackEvent('Therapy Link Clicked', {
                    therapy: 'BioLink-ENZ',
                    source_page: 'rare_diseases',
                    device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                  })}
                  className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Resources Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Patient Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <DownloadAnimation
              fileName="Patient_Guide_Understanding_Your_Condition.pdf"
              onDownload={() => handleDownload('patient_guide', 'Understanding Your Condition')}
              className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 w-full text-left"
            >
              <Download className="h-8 w-8 text-teal-600 mr-4" />
              <div className="text-left">
                <h3 className="font-bold text-gray-900">Patient Guide</h3>
                <p className="text-gray-600 text-sm">Understanding your condition</p>
              </div>
            </DownloadAnimation>

            <DownloadAnimation
              fileName="Treatment_Options_Overview.pdf"
              onDownload={() => handleDownload('treatment_options', 'Treatment Options Overview')}
              className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 w-full text-left"
            >
              <Download className="h-8 w-8 text-orange-600 mr-4" />
              <div className="text-left">
                <h3 className="font-bold text-gray-900">Treatment Options</h3>
                <p className="text-gray-600 text-sm">Available therapies</p>
              </div>
            </DownloadAnimation>

            <DownloadAnimation
              fileName="Insurance_Coverage_Guide.pdf"
              onDownload={() => handleDownload('insurance_guide', 'Insurance Coverage Guide')}
              className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 w-full text-left"
            >
              <Download className="h-8 w-8 text-purple-600 mr-4" />
              <div className="text-left">
                <h3 className="font-bold text-gray-900">Insurance Guide</h3>
                <p className="text-gray-600 text-sm">Coverage information</p>
              </div>
            </DownloadAnimation>
          </div>
        </div>

        {/* Email Capture CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Informed</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest updates on rare disease research, treatment options, and patient resources.
          </p>
          <div className="max-w-md mx-auto">
            <form 
              className="flex flex-col sm:flex-row gap-4"
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
                    source: 'disease_info_email_capture',
                    therapy_interest: therapy ? `BioLink-${therapy.toUpperCase()}` : 'general',
                    signup_date: new Date().toISOString(),
                    user_type: 'prospect',
                    // Add marketing attribution to user profile
                    ...(localStorage.getItem('marketing_attribution') && {
                      ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
                    })
                  });
                }
                
                trackEvent('Email Capture Form Submitted', {
                  form_type: 'disease_info_request',
                  therapy_interest: therapy ? `BioLink-${therapy.toUpperCase()}` : 'general',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
                  email_domain: email.split('@')[1] || 'unknown',
                  user_id: userId
                });
                
                // Show success message
                alert('Thank you for subscribing! You will receive updates about rare disease treatments.');
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onClick={handleEmailCapture}
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;