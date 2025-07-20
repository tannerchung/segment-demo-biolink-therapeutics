import React, { useEffect } from 'react';
import { Stethoscope, BookOpen, FileText, Calendar, Download, Users, ArrowRight } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const HCPPortal = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'hcp_portal',
      page_category: 'professional',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleResourceClick = (resourceType: string, resourceTitle: string) => {
    trackEvent('Educational Content Viewed', {
      content_type: resourceType,
      content_title: resourceTitle,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleMedInfoRequest = (requestType: string) => {
    trackEvent('Medical Information Request', {
      request_type: requestType,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const resources = [
    {
      icon: FileText,
      title: 'Clinical Study Results',
      description: 'Latest efficacy and safety data for BioLink therapies',
      type: 'clinical_data'
    },
    {
      icon: BookOpen,
      title: 'Prescribing Information',
      description: 'Complete prescribing guidelines and dosing recommendations',
      type: 'prescribing_info'
    },
    {
      icon: Users,
      title: 'Patient Case Studies',
      description: 'Real-world treatment outcomes and patient experiences',
      type: 'case_studies'
    },
    {
      icon: Download,
      title: 'Educational Materials',
      description: 'Patient education resources and treatment guides',
      type: 'educational_materials'
    }
  ];

  const therapies = [
    {
      name: 'BioLink-GTx',
      indication: 'Lysosomal Storage Disorders',
      type: 'Gene Therapy',
      description: 'Revolutionary one-time gene therapy for patients with lysosomal storage disorders'
    },
    {
      name: 'BioLink-ENZ',
      indication: 'Metabolic Disorders',
      type: 'Enzyme Replacement',
      description: 'Advanced enzyme replacement therapy for rare metabolic conditions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Healthcare Professional Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive medical information, educational resources, and clinical data 
            for BioLink rare disease therapies.
          </p>
        </div>

        {/* Therapy Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {therapies.map((therapy, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <Stethoscope className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{therapy.name}</h3>
                  <p className="text-teal-600 font-medium">{therapy.type}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{therapy.indication}</p>
              <p className="text-gray-700 mb-6">{therapy.description}</p>
              <button
                onClick={() => handleResourceClick('therapy_overview', therapy.name)}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                View Clinical Information
              </button>
            </div>
          ))}
        </div>

        {/* Professional Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Professional Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleResourceClick(resource.type, resource.title)}
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                  <resource.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Information Requests */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Medical Information Requests</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => handleMedInfoRequest('efficacy_data')}
              className="p-6 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 text-left"
            >
              <h3 className="font-bold text-gray-900 mb-2">Efficacy Data</h3>
              <p className="text-gray-600 text-sm">Request detailed efficacy information and clinical trial results</p>
            </button>
            <button
              onClick={() => handleMedInfoRequest('safety_profile')}
              className="p-6 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 text-left"
            >
              <h3 className="font-bold text-gray-900 mb-2">Safety Profile</h3>
              <p className="text-gray-600 text-sm">Access comprehensive safety data and adverse event information</p>
            </button>
            <button
              onClick={() => handleMedInfoRequest('dosing_guidelines')}
              className="p-6 border border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 text-left"
            >
              <h3 className="font-bold text-gray-900 mb-2">Dosing Guidelines</h3>
              <p className="text-gray-600 text-sm">Get detailed dosing recommendations and administration protocols</p>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
            <Calendar className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Upcoming Webinars</h3>
            <p className="mb-6">Join our educational webinars on rare disease management and treatment protocols.</p>
            <button
              onClick={() => handleResourceClick('webinar_registration', 'Upcoming Webinars')}
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              View Schedule <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <Users className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Patient Referral Program</h3>
            <p className="mb-6">Connect your patients with our comprehensive support programs and treatment access.</p>
            <button
              onClick={() => handleResourceClick('referral_program', 'Patient Referral Program')}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Medical Affairs Contact</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our medical affairs team is available to answer your questions about BioLink therapies, 
            provide additional clinical information, and support your patient care decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => trackEvent('Medical Affairs Contact', {
                contact_method: 'phone',
                device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
              })}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors duration-200"
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
          
          {/* Login Notice */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/30">
            <h3 className="font-bold mb-2">Already have an account?</h3>
            <p className="text-sm mb-4 opacity-90">
              Access your personalized HCP dashboard with clinical resources and patient referral tools.
            </p>
            <a
              href="/hcp"
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Sign In to HCP Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCPPortal;