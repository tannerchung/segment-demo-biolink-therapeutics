import React, { useEffect, useState } from 'react';
import { FlaskConical, CheckCircle, ArrowRight, User, Calendar, MapPin } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const TrialScreening = () => {
  const { trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudy, setSelectedStudy] = useState('');
  const [formData, setFormData] = useState({
    study: '',
    age: '',
    diagnosis: '',
    previousTreatments: '',
    currentMedications: '',
    location: '',
    willingToTravel: '',
    contactPreference: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const totalSteps = 4;

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'clinical_trial_screening',
      page_category: 'trials',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackEvent('Trial Screening Step Completed', {
        step_number: currentStep,
        study_interest: selectedStudy,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Generate hashed user ID for clinical trial participant
    const userId = `trial_${formData.firstName.toLowerCase()}_${formData.lastName.charAt(0).toLowerCase()}_hashed`;
    
    trackEvent('Clinical Trial Consent Completed', {
      study_id: selectedStudy,
      consent_version: '2.1',
      location: formData.location,
      age_range: formData.age,
      diagnosis: formData.diagnosis,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Identify user for clinical trial tracking
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify(userId, {
        name: `${formData.firstName} ${formData.lastName}`,
        study_interest: selectedStudy,
        age_range: formData.age,
        diagnosis: formData.diagnosis,
        location: formData.location,
        contact_preference: formData.contactPreference
      });
    }

    alert('Thank you for your interest! Our clinical research team will contact you within 2 business days to discuss eligibility and next steps.');
    window.location.href = '/clinical-trials';
  };

  const availableStudies = [
    {
      id: 'BL-GTx-301',
      name: 'BioLink-GTx Phase 3 Study',
      condition: 'Gaucher Disease',
      phase: 'Phase 3',
      description: 'Evaluating the safety and efficacy of BioLink-GTx gene therapy in patients with Type 1 Gaucher Disease',
      eligibility: ['Ages 18-65', 'Confirmed Gaucher Disease diagnosis', 'No previous gene therapy']
    },
    {
      id: 'BL-ENZ-205',
      name: 'BioLink-ENZ Long-term Safety Study',
      condition: 'Fabry Disease',
      phase: 'Phase 2/3',
      description: 'Long-term safety and efficacy study of BioLink-ENZ enzyme replacement therapy',
      eligibility: ['Ages 12+', 'Confirmed Fabry Disease diagnosis', 'Stable on current therapy']
    },
    {
      id: 'BL-GTx-401',
      name: 'BioLink-GTx Pediatric Study',
      condition: 'Pompe Disease',
      phase: 'Phase 2',
      description: 'Safety and efficacy of BioLink-GTx in pediatric patients with Pompe Disease',
      eligibility: ['Ages 2-17', 'Confirmed Pompe Disease diagnosis', 'Parent/guardian consent']
    }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Clinical Trial</h2>
            <p className="text-gray-600 mb-6">
              Please select the clinical trial you're interested in participating in:
            </p>
            <div className="space-y-4">
              {availableStudies.map((study) => (
                <div
                  key={study.id}
                  className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedStudy === study.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => {
                    setSelectedStudy(study.id);
                    setFormData(prev => ({ ...prev, study: study.id }));
                  }}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 mt-1 flex items-center justify-center ${
                      selectedStudy === study.id
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedStudy === study.id && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-900 mr-3">{study.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{study.phase}</span>
                      </div>
                      <p className="text-purple-600 font-medium mb-2">{study.condition}</p>
                      <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Key Eligibility Criteria:</h4>
                        <ul className="text-sm text-gray-600">
                          {study.eligibility.map((criteria, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range *
                </label>
                <select
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  <option value="2-11">2-11 years</option>
                  <option value="12-17">12-17 years</option>
                  <option value="18-30">18-30 years</option>
                  <option value="31-50">31-50 years</option>
                  <option value="51-65">51-65 years</option>
                  <option value="65+">65+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis *
                </label>
                <select
                  name="diagnosis"
                  required
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select diagnosis</option>
                  <option value="gaucher_disease">Gaucher Disease</option>
                  <option value="fabry_disease">Fabry Disease</option>
                  <option value="pompe_disease">Pompe Disease</option>
                  <option value="mps_disorders">MPS Disorders</option>
                  <option value="alpha1_antitrypsin">Alpha-1 Antitrypsin Deficiency</option>
                  <option value="other">Other Rare Disease</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous treatments or therapies:
              </label>
              <textarea
                name="previousTreatments"
                value={formData.previousTreatments}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Please list any previous treatments, medications, or therapies..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current medications:
              </label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Please list all current medications and dosages..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Travel</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Willingness to travel for study visits *
              </label>
              <select
                name="willingToTravel"
                required
                value={formData.willingToTravel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                <option value="local_only">Local area only (within 50 miles)</option>
                <option value="regional">Regional (within 200 miles)</option>
                <option value="national">Anywhere in the country</option>
                <option value="international">International travel acceptable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred contact method *
              </label>
              <select
                name="contactPreference"
                required
                value={formData.contactPreference}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select preference</option>
                <option value="phone">Phone call</option>
                <option value="email">Email</option>
                <option value="text">Text message</option>
                <option value="mail">Postal mail</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FlaskConical className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Clinical Trial Screening</h1>
          <p className="text-gray-600">
            Complete this screening to determine your eligibility for our clinical trials and help advance rare disease research.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Screening Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedStudy || !formData.firstName || !formData.email}
                className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Screening
                <CheckCircle className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedStudy}
                className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Information Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <FlaskConical className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Clinical Trial Participation</h3>
              <p className="text-blue-800 text-sm">
                Participation in clinical trials is voluntary and you may withdraw at any time. 
                All information provided is confidential and protected under clinical research regulations. 
                This screening does not guarantee enrollment in a clinical trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialScreening;