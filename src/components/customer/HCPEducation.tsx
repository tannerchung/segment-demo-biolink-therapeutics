import React, { useEffect } from 'react';
import { BookOpen, Download, Users, Calendar, FileText, Video } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const HCPEducation = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'hcp_education',
      page_category: 'professional',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleContentView = (contentType: string, contentTitle: string, product: string) => {
    trackEvent('Educational Content Viewed', {
      content_type: contentType,
      content_title: contentTitle,
      product: product,
      specialty: 'general',
      viewing_time_minutes: Math.floor(Math.random() * 20) + 5, // Simulate viewing time
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleWebinarRegistration = (webinarTitle: string) => {
    trackEvent('Educational Webinar Registration', {
      webinar_title: webinarTitle,
      registration_date: new Date().toISOString(),
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const educationalContent = [
    {
      title: 'BioLink-GTx Clinical Study Results',
      type: 'clinical_data',
      product: 'BioLink-GTx',
      description: 'Phase 3 efficacy and safety data for lysosomal storage disorders',
      duration: '15 min read',
      icon: FileText
    },
    {
      title: 'BioLink-ENZ Dosing Guidelines',
      type: 'dosing_guidelines',
      product: 'BioLink-ENZ',
      description: 'Comprehensive dosing recommendations for metabolic disorders',
      duration: '10 min read',
      icon: BookOpen
    },
    {
      title: 'Patient Case Studies Collection',
      type: 'case_studies',
      product: 'Both',
      description: 'Real-world treatment outcomes and patient experiences',
      duration: '20 min read',
      icon: Users
    },
    {
      title: 'Mechanism of Action Videos',
      type: 'educational_video',
      product: 'Both',
      description: 'Visual explanation of gene therapy and enzyme replacement',
      duration: '12 min watch',
      icon: Video
    }
  ];

  const upcomingWebinars = [
    {
      title: 'Advances in Rare Disease Gene Therapy',
      date: 'February 28, 2024',
      time: '2:00 PM EST',
      presenter: 'Dr. Sarah Chen, MD, PhD',
      cme: '1.0 CME Credits'
    },
    {
      title: 'Managing Enzyme Deficiencies in Pediatric Patients',
      date: 'March 15, 2024',
      time: '1:00 PM EST',
      presenter: 'Dr. Michael Rodriguez, MD',
      cme: '1.5 CME Credits'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            HCP Educational Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive clinical information, educational materials, and professional 
            development resources for BioLink rare disease therapies.
          </p>
        </div>

        {/* Educational Content Library */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Clinical Education Library</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {educationalContent.map((content, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleContentView(content.type, content.title, content.product)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <content.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="text-sm text-gray-500">{content.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{content.title}</h3>
                <p className="text-gray-600 mb-4">{content.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {content.product}
                  </span>
                  <button className="text-teal-600 font-medium hover:text-teal-700">
                    View Content →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Educational Webinars</h2>
          <div className="space-y-6">
            {upcomingWebinars.map((webinar, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{webinar.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {webinar.date} at {webinar.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {webinar.presenter}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {webinar.cme}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWebinarRegistration(webinar.title)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Resources */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Download className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-3">Prescribing Information</h3>
            <p className="text-gray-600 mb-4">Complete prescribing guidelines and safety information</p>
            <button
              onClick={() => handleContentView('prescribing_info', 'Complete Prescribing Information', 'Both')}
              className="text-teal-600 font-medium hover:text-teal-700"
            >
              Download PDF →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-3">Patient Education Materials</h3>
            <p className="text-gray-600 mb-4">Resources to share with patients and families</p>
            <button
              onClick={() => handleContentView('patient_education', 'Patient Education Materials', 'Both')}
              className="text-orange-600 font-medium hover:text-orange-700"
            >
              Access Materials →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-3">Patient Referral Program</h3>
            <p className="text-gray-600 mb-4">Connect patients with treatment access programs</p>
            <button
              onClick={() => trackEvent('Patient Referral Program Accessed', {
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Learn More →
            </button>
          </div>
        </div>

        {/* Contact Medical Affairs */}
        <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Need Additional Clinical Information?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our medical affairs team is available to provide additional clinical data, 
            answer specific questions, and support your patient care decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => trackEvent('Medical Affairs Contact', {
                contact_method: 'phone',
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Call Medical Affairs
            </button>
            <button
              onClick={() => trackEvent('Medical Affairs Contact', {
                contact_method: 'email',
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 border border-white/30"
            >
              Email Medical Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCPEducation;