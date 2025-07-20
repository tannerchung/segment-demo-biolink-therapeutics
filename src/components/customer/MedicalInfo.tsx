import React, { useEffect } from 'react';
import { FileText, Download, Phone, Mail, Search, AlertTriangle } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DownloadAnimation from '../DownloadAnimation';

const MedicalInfo = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'medical_information',
      page_category: 'professional',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleMedInfoRequest = (requestType: string, product: string) => {
    trackEvent('Medical Information Request', {
      product: product,
      request_type: requestType,
      specialty: 'general',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleResourceDownload = (resourceType: string, product: string) => {
    trackEvent('Medical Resource Downloaded', {
      resource_type: resourceType,
      product: product,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const medicalResources = [
    {
      title: 'BioLink-GTx Prescribing Information',
      product: 'BioLink-GTx',
      type: 'prescribing_info',
      description: 'Complete prescribing information including indications, dosing, and contraindications',
      pages: '24 pages'
    },
    {
      title: 'BioLink-ENZ Safety Profile',
      product: 'BioLink-ENZ',
      type: 'safety_data',
      description: 'Comprehensive safety data from clinical trials and post-market surveillance',
      pages: '18 pages'
    },
    {
      title: 'Clinical Study Summary - Phase 3',
      product: 'BioLink-GTx',
      type: 'clinical_data',
      description: 'Efficacy and safety results from pivotal Phase 3 clinical trials',
      pages: '32 pages'
    },
    {
      title: 'Dosing Guidelines for Pediatric Patients',
      product: 'Both',
      type: 'dosing_guidelines',
      description: 'Age and weight-based dosing recommendations for pediatric populations',
      pages: '12 pages'
    },
    {
      title: 'Drug Interaction Studies',
      product: 'BioLink-ENZ',
      type: 'drug_interactions',
      description: 'Comprehensive drug-drug interaction data and clinical recommendations',
      pages: '16 pages'
    },
    {
      title: 'Mechanism of Action Overview',
      product: 'Both',
      type: 'mechanism_action',
      description: 'Detailed explanation of therapeutic mechanisms and cellular targets',
      pages: '20 pages'
    }
  ];

  const requestTypes = [
    {
      title: 'Efficacy Data Request',
      description: 'Request detailed efficacy information from clinical trials',
      type: 'efficacy_data',
      icon: FileText
    },
    {
      title: 'Safety Information',
      description: 'Access comprehensive safety profiles and adverse event data',
      type: 'safety_profile',
      icon: AlertTriangle
    },
    {
      title: 'Pharmacokinetic Data',
      description: 'Request PK/PD studies and bioavailability information',
      type: 'pharmacokinetics',
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Medical Information Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive medical information, clinical data, and prescribing resources 
            for BioLink rare disease therapies.
          </p>
        </div>

        {/* Quick Request Forms */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {requestTypes.map((request, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleMedInfoRequest(request.type, 'general')}
            >
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <request.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{request.title}</h3>
              <p className="text-gray-600 mb-4">{request.description}</p>
              <button className="text-teal-600 font-medium hover:text-teal-700">
                Submit Request →
              </button>
            </div>
          ))}
        </div>

        {/* Medical Resources Library */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Medical Resources Library</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{medicalResources.map((resource, index) => (
  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
        <FileText className="h-6 w-6 text-orange-600" />
      </div>
      <span className="text-sm text-gray-500">{resource.pages}</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
    <div className="flex items-center justify-between">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
        {resource.product}
      </span>
      <DownloadAnimation
        fileName={`${resource.title.replace(/\s+/g, '_')}.pdf`}
        onDownload={() => handleResourceDownload(resource.type, resource.product)}
        className="text-orange-600 font-medium hover:text-orange-700 text-sm"
      >
        Download →
      </DownloadAnimation>
    </div>
  </div>
))}
          </div>
        </div>

        {/* Product-Specific Information */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">BioLink-GTx Information</h3>
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg">
                <h4 className="font-bold text-teal-900 mb-2">Indication</h4>
                <p className="text-teal-800 text-sm">Gene therapy for lysosomal storage disorders including Gaucher Disease, Fabry Disease, and Pompe Disease</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Mechanism of Action</h4>
                <p className="text-gray-700 text-sm">Delivers functional copies of defective genes directly to affected cells using advanced viral vector technology</p>
              </div>
              <button
                onClick={() => handleMedInfoRequest('complete_profile', 'BioLink-GTx')}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                Request Complete Product Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">BioLink-ENZ Information</h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Indication</h4>
                <p className="text-orange-800 text-sm">Enzyme replacement therapy for metabolic disorders including Alpha-1 Antitrypsin Deficiency and Hereditary Angioedema</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Mechanism of Action</h4>
                <p className="text-gray-700 text-sm">Supplements missing or deficient enzymes to restore normal cellular function and metabolic processes</p>
              </div>
              <button
                onClick={() => handleMedInfoRequest('complete_profile', 'BioLink-ENZ')}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                Request Complete Product Profile
              </button>
            </div>
          </div>
        </div>

        {/* Contact Medical Affairs */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Medical Affairs Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Our medical affairs team is available to provide personalized medical information, 
            answer specific clinical questions, and support your patient care decisions.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Phone Support</h3>
              <p className="text-gray-300 text-sm mb-4">Monday - Friday, 8 AM - 6 PM EST</p>
              <button
                onClick={() => trackEvent('Medical Affairs Contact', {
                  contact_method: 'phone',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                })}
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Call (1-800) MED-INFO
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-gray-300 text-sm mb-4">Response within 24 hours</p>
              <button
                onClick={() => trackEvent('Medical Affairs Contact', {
                  contact_method: 'email',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                })}
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Email Medical Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;