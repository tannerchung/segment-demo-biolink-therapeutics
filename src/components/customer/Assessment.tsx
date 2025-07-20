import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, FileText, Heart } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const Assessment = () => {
  const { trackEvent } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [formData, setFormData] = useState({
    therapy: '',
    symptoms: [],
    medicalHistory: '',
    currentTreatments: '',
    familyHistory: '',
    qualityOfLife: '',
    mobility: '',
    energy: ''
  });

  const totalSteps = 5;

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'treatment_eligibility_assessment',
      page_category: 'portal',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  useEffect(() => {
    if (selectedTherapy) {
      trackEvent('Treatment Eligibility Assessment Started', {
        therapy_program: selectedTherapy,
        assessment_type: 'comprehensive',
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }
  }, [selectedTherapy, trackEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name as keyof typeof prev] as string[]), value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackEvent('Assessment Step Completed', {
        step_number: currentStep,
        therapy_program: selectedTherapy,
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
    trackEvent('Treatment Eligibility Assessment Completed', {
      therapy_program: selectedTherapy,
      eligibility_status: 'qualified', // Would be calculated based on responses
      completion_time_minutes: 15, // Would be calculated
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      symptoms_reported: formData.symptoms.length,
      quality_of_life_score: formData.qualityOfLife
    });

    alert('Assessment completed! Our care team will review your responses and contact you within 2 business days.');
    window.location.href = '/portal/dashboard';
  };

  const therapyOptions = [
    {
      value: 'BioLink-GTx',
      name: 'BioLink-GTx',
      indication: 'Lysosomal Storage Disorders',
      description: 'Gene therapy for conditions like Gaucher Disease, Fabry Disease, and Pompe Disease'
    },
    {
      value: 'BioLink-ENZ',
      name: 'BioLink-ENZ',
      indication: 'Metabolic Disorders',
      description: 'Enzyme replacement therapy for Alpha-1 Antitrypsin Deficiency and related conditions'
    }
  ];

  const symptoms = [
    'Fatigue or low energy',
    'Muscle weakness',
    'Joint pain or stiffness',
    'Difficulty breathing',
    'Enlarged liver or spleen',
    'Bone pain',
    'Easy bruising or bleeding',
    'Frequent infections',
    'Growth delays (pediatric)',
    'Cognitive changes'
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Therapy Program</h2>
            <p className="text-gray-600 mb-6">
              Please select the therapy program you're interested in learning about:
            </p>
            <div className="space-y-4">
              {therapyOptions.map((therapy) => (
                <div
                  key={therapy.value}
                  className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedTherapy === therapy.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                  onClick={() => {
                    setSelectedTherapy(therapy.value);
                    setFormData(prev => ({ ...prev, therapy: therapy.value }));
                  }}
                >
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 mt-1 flex items-center justify-center ${
                      selectedTherapy === therapy.value
                        ? 'border-teal-500 bg-teal-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedTherapy === therapy.value && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{therapy.name}</h3>
                      <p className="text-teal-600 font-medium mb-2">{therapy.indication}</p>
                      <p className="text-gray-600 text-sm">{therapy.description}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Symptoms</h2>
            <p className="text-gray-600 mb-6">
              Please select any symptoms you are currently experiencing:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <label key={symptom} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="symptoms"
                    value={symptom}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mr-3"
                  />
                  <span className="text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please describe your medical history and any previous diagnoses:
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Include any relevant medical conditions, surgeries, or hospitalizations..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current treatments or medications:
                </label>
                <textarea
                  name="currentTreatments"
                  value={formData.currentTreatments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="List any current medications, treatments, or therapies..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Family History</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family history of rare diseases or genetic conditions:
              </label>
              <textarea
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Please include any family members with similar conditions or genetic disorders..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quality of Life Assessment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your current quality of life? (1-10 scale)
                </label>
                <select
                  name="qualityOfLife"
                  value={formData.qualityOfLife}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select rating</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} - {num <= 3 ? 'Poor' : num <= 6 ? 'Fair' : num <= 8 ? 'Good' : 'Excellent'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your current mobility? (1-10 scale)
                </label>
                <select
                  name="mobility"
                  value={formData.mobility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select rating</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} - {num <= 3 ? 'Very Limited' : num <= 6 ? 'Somewhat Limited' : num <= 8 ? 'Good' : 'Excellent'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your current energy level? (1-10 scale)
                </label>
                <select
                  name="energy"
                  value={formData.energy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select rating</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} - {num <= 3 ? 'Very Low' : num <= 6 ? 'Low' : num <= 8 ? 'Good' : 'High'}</option>
                  ))}
                </select>
              </div>
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
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Treatment Eligibility Assessment</h1>
          <p className="text-gray-600">
            This assessment helps us understand your condition and determine the best treatment options for you.
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
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Assessment Form */}
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
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedTherapy}
                className="flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Assessment
                <CheckCircle className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedTherapy}
                className="flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Heart className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Your Privacy Matters</h3>
              <p className="text-blue-800 text-sm">
                All information provided in this assessment is confidential and protected under HIPAA regulations. 
                This assessment is for informational purposes and does not constitute medical advice. 
                Please consult with your healthcare provider for medical decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;