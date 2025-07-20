import React, { useEffect, useState } from 'react';
import { Search, MapPin, Calendar, Users, FileText, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    analytics: any;
  }
}

const ClinicalTrials: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');

  useEffect(() => {
    // Track page view
    if (window.analytics) {
      window.analytics.page('Clinical Trials', {
        page_name: 'clinical-trials',
        page_category: 'trials',
        device_type: 'desktop'
      });
    }
  }, []);

  const handleStudyInterest = (studyId: string, studyName: string) => {
    if (window.analytics) {
      window.analytics.track('Clinical Trial Interest Expressed', {
        study_id: studyId,
        study_name: studyName,
        device_type: 'desktop'
      });
    }
    setSelectedStudy(studyId);
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.analytics) {
      window.analytics.track('Clinical Trial Location Search', {
        search_location: searchLocation,
        device_type: 'desktop'
      });
    }
  };

  const studies = [
    {
      id: 'BL-GTx-301',
      name: 'BioLink-GTx Phase 3 Study',
      therapy: 'BioLink-GTx',
      condition: 'Gaucher Disease',
      phase: 'Phase 3',
      status: 'Recruiting',
      participants: '150 participants needed',
      locations: ['Boston Medical Center', 'Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic'],
      description: 'Evaluating the safety and efficacy of BioLink-GTx gene therapy in patients with Type 1 Gaucher Disease.'
    },
    {
      id: 'BL-ENZ-205',
      name: 'BioLink-ENZ Long-term Safety Study',
      therapy: 'BioLink-ENZ',
      condition: 'Fabry Disease',
      phase: 'Phase 2/3',
      status: 'Recruiting',
      participants: '100 participants needed',
      locations: ['Mayo Clinic', 'Cleveland Clinic', 'UCSF Medical Center'],
      description: 'Long-term safety and efficacy study of BioLink-ENZ enzyme replacement therapy in Fabry Disease patients.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Clinical Trials</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Participate in groundbreaking research to advance rare disease treatments. 
              Find clinical trials near you and help shape the future of therapy.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Trials Near You</h2>
          <form onSubmit={handleLocationSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city or zip code"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </form>
        </div>

        {/* Active Studies */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Active Clinical Trials</h2>
          
          {studies.map((study) => (
            <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{study.phase}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{study.status}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {study.participants}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStudyInterest(study.id, study.name)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Express Interest
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Study Details</h4>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Therapy: {study.therapy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Condition: {study.condition}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Study Locations</h4>
                    <div className="space-y-2">
                      {study.locations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedStudy === study.id && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Thank you for your interest!</h5>
                    <p className="text-blue-800 text-sm">
                      A member of our clinical research team will contact you within 2 business days 
                      to discuss eligibility and next steps.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Clinical Trials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Expect</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive medical evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Regular monitoring and care</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Access to investigational treatments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Contribution to medical research</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights as a Participant</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Voluntary participation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Informed consent process</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Right to withdraw at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Privacy and confidentiality protection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Clinical Trials?</h2>
          <p className="text-blue-100 mb-6">
            Our clinical research team is here to help you understand your options and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Call (1-800) BIOLINK
            </button>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors">
              Email Clinical Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalTrials;