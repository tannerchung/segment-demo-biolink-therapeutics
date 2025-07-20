import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Star, Filter, User, Calendar, X, ArrowRight } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const SpecialistLocator = () => {
  const { trackEvent } = useAnalytics();
  const [searchCriteria, setSearchCriteria] = useState({
    specialty: '',
    location: '',
    insurance: ''
  });
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState({
    preferredDate: '',
    preferredTime: '',
    appointmentType: '',
    patientName: '',
    email: '',
    phone: '',
    reason: ''
  });

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'specialist_locator',
      page_category: 'tools',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  const specialties = [
    { value: 'pediatric_genetics', label: 'Pediatric Genetics' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'internal_medicine', label: 'Internal Medicine' },
    { value: 'metabolic_disorders', label: 'Metabolic Disorders' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'gastroenterology', label: 'Gastroenterology' }
  ];

  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'Pediatric Genetics',
      institution: 'Boston Children\'s Hospital',
      location: 'Boston, MA',
      phone: '(617) 355-6000',
      rating: 4.9,
      experience: '15 years',
      insurance: ['Blue Cross', 'Aetna', 'United Healthcare'],
      distance: '2.3 miles'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Endocrinology',
      institution: 'Mayo Clinic',
      location: 'Rochester, MN',
      phone: '(507) 284-2511',
      rating: 4.8,
      experience: '12 years',
      insurance: ['Medicare', 'Blue Cross', 'Cigna'],
      distance: '5.7 miles'
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Metabolic Disorders',
      institution: 'Johns Hopkins Hospital',
      location: 'Baltimore, MD',
      phone: '(410) 955-5000',
      rating: 4.9,
      experience: '18 years',
      insurance: ['Blue Cross', 'Aetna', 'United Healthcare', 'Medicare'],
      distance: '8.1 miles'
    },
    {
      id: 4,
      name: 'Dr. David Park',
      specialty: 'Internal Medicine',
      institution: 'Cleveland Clinic',
      location: 'Cleveland, OH',
      phone: '(216) 444-2200',
      rating: 4.7,
      experience: '10 years',
      insurance: ['United Healthcare', 'Cigna', 'Blue Cross'],
      distance: '12.4 miles'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Pediatric Genetics',
      institution: 'UCSF Medical Center',
      location: 'San Francisco, CA',
      phone: '(415) 476-1000',
      rating: 4.8,
      experience: '14 years',
      insurance: ['Blue Cross', 'Kaiser', 'Aetna'],
      distance: '15.2 miles'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Track search event
    trackEvent('Specialist Locator Used', {
      search_criteria: searchCriteria.specialty,
      location: searchCriteria.location,
      insurance_filter: searchCriteria.insurance,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Simulate API call
    setTimeout(() => {
      const filteredResults = sampleDoctors.filter(doctor => {
        const specialtyMatch = !searchCriteria.specialty || 
          doctor.specialty.toLowerCase().includes(searchCriteria.specialty.toLowerCase());
        const locationMatch = !searchCriteria.location || 
          doctor.location.toLowerCase().includes(searchCriteria.location.toLowerCase());
        const insuranceMatch = !searchCriteria.insurance || 
          doctor.insurance.some(ins => ins.toLowerCase().includes(searchCriteria.insurance.toLowerCase()));
        
        return specialtyMatch && locationMatch && insuranceMatch;
      });

      setResults(filteredResults);
      setShowResults(true);
      setIsLoading(false);

      // Track results shown
      trackEvent('Search Results Displayed', {
        search_criteria: searchCriteria.specialty,
        location: searchCriteria.location,
        results_count: filteredResults.length,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    }, 1500);
  };

  const handleDoctorClick = (doctor: any) => {
    trackEvent('Specialist Profile Viewed', {
      doctor_name: doctor.name,
      specialty: doctor.specialty,
      institution: doctor.institution,
      location: doctor.location,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleContactClick = (doctor: any, contactMethod: string) => {
    if (contactMethod === 'appointment') {
      setSelectedDoctor(doctor);
      setShowAppointmentModal(true);
      trackEvent('Specialist Appointment Request Started', {
        doctor_name: doctor.name,
        specialty: doctor.specialty,
        institution: doctor.institution,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
      return;
    }

    trackEvent('Specialist Contact Initiated', {
      doctor_name: doctor.name,
      contact_method: contactMethod,
      specialty: doctor.specialty,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleAppointmentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointmentData.preferredDate || !appointmentData.preferredTime || !appointmentData.email || !appointmentData.patientName) {
      alert('Please fill in all required fields');
      return;
    }

    const appointmentDateTime = `${appointmentData.preferredDate} at ${appointmentData.preferredTime}`;
    
    // Generate user ID from email for identification
    const userId = `user_${appointmentData.email.split('@')[0]}_${Date.now()}`;
    
    // Identify user with appointment request details
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify(userId, {
        name: appointmentData.patientName,
        email: appointmentData.email,
        phone: appointmentData.phone,
        // Appointment-related traits
        requested_appointment: appointmentDateTime,
        requested_appointment_type: appointmentData.appointmentType,
        requested_specialist: selectedDoctor?.name,
        requested_specialty: selectedDoctor?.specialty,
        requested_institution: selectedDoctor?.institution,
        appointment_request_reason: appointmentData.reason,
        appointment_request_method: 'specialist_locator',
        last_appointment_request: new Date().toISOString(),
        // Add marketing attribution to user profile
        ...(localStorage.getItem('marketing_attribution') && {
          ...JSON.parse(localStorage.getItem('marketing_attribution') || '{}')
        })
      });
    }
    
    // Track the appointment request event
    trackEvent('Specialist Appointment Requested', {
      doctor_name: selectedDoctor?.name,
      specialty: selectedDoctor?.specialty,
      institution: selectedDoctor?.institution,
      appointment_date: appointmentData.preferredDate,
      appointment_time: appointmentData.preferredTime,
      appointment_datetime: appointmentDateTime,
      appointment_type: appointmentData.appointmentType,
      patient_name: appointmentData.patientName,
      patient_email: appointmentData.email,
      patient_phone: appointmentData.phone,
      request_reason: appointmentData.reason,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      user_id: userId
    });

    // Close modal and show success
    setShowAppointmentModal(false);
    setSelectedDoctor(null);
    setAppointmentData({
      preferredDate: '',
      preferredTime: '',
      appointmentType: '',
      patientName: '',
      email: '',
      phone: '',
      reason: ''
    });
    
    alert(`Appointment request submitted successfully!\n\nSpecialist: ${selectedDoctor?.name}\nDate: ${appointmentDateTime}\nType: ${appointmentData.appointmentType}\n\nYou will receive a confirmation email within 24 hours.`);
  };

  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const appointmentTypes = [
    { value: 'initial_consultation', label: 'Initial Consultation' },
    { value: 'follow_up', label: 'Follow-up Visit' },
    { value: 'second_opinion', label: 'Second Opinion' },
    { value: 'treatment_consultation', label: 'Treatment Consultation' },
    { value: 'genetic_counseling', label: 'Genetic Counseling' },
    { value: 'diagnostic_evaluation', label: 'Diagnostic Evaluation' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find a Rare Disease Specialist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with healthcare professionals who specialize in rare diseases and are experienced 
            with BioLink therapies. Find the right care team for your journey.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Specialty
                </label>
                <select
                  value={searchCriteria.specialty}
                  onChange={(e) => setSearchCriteria({...searchCriteria, specialty: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State or ZIP"
                  value={searchCriteria.location}
                  onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance
                </label>
                <input
                  type="text"
                  placeholder="Insurance provider"
                  value={searchCriteria.insurance}
                  onChange={(e) => setSearchCriteria({...searchCriteria, insurance: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center mx-auto disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Find Specialists
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {results.length} Specialists Found
              </h2>
              <div className="flex items-center text-gray-600">
                <Filter className="h-5 w-5 mr-2" />
                <span>Sorted by distance</span>
              </div>
            </div>

            <div className="grid gap-6">
              {results.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                            <User className="h-8 w-8 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-teal-600 font-medium">{doctor.specialty}</p>
                            <p className="text-gray-600">{doctor.institution}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{doctor.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">{doctor.experience}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{doctor.location} • {doctor.distance}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Accepts Insurance:</p>
                        <div className="flex flex-wrap gap-2">
                          {doctor.insurance.map((ins, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {ins}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(doctor, 'phone');
                        }}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
                      >
                        Call Office
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(doctor, 'appointment');
                        }}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
                      >
                        Request Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {showResults && results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">No specialists found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or contact our patient support team for assistance.
            </p>
            <button
              onClick={() => {
                trackEvent('Patient Support Contact', {
                  source: 'specialist_locator_no_results',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                });
              }}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200"
            >
              Contact Patient Support
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Finding the Right Specialist?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our patient support team can help you find specialists in your area who are experienced 
            with rare diseases and BioLink therapies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                trackEvent('Patient Support Contact', {
                  source: 'specialist_locator_help',
                  contact_method: 'phone',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                });
              }}
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Call 1-800-BIOLINK
            </button>
            <button
              onClick={() => {
                trackEvent('Patient Support Contact', {
                  source: 'specialist_locator_help',
                  contact_method: 'email',
                  device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
                });
              }}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 border border-white/30"
            >
              Email Support Team
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Request Modal */}
      {showAppointmentModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Request Appointment</h2>
                  <p className="text-gray-600">with {selectedDoctor.name}</p>
                </div>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Doctor Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-teal-600">{selectedDoctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{selectedDoctor.institution}</p>
                    <p className="text-gray-600 text-sm">{selectedDoctor.location}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Request Form */}
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      required
                      value={appointmentData.patientName}
                      onChange={handleAppointmentInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={appointmentData.email}
                      onChange={handleAppointmentInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={appointmentData.phone}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Appointment Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    name="appointmentType"
                    required
                    value={appointmentData.appointmentType}
                    onChange={handleAppointmentInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select appointment type</option>
                    {appointmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={appointmentData.preferredDate}
                      onChange={handleAppointmentInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      name="preferredTime"
                      required
                      value={appointmentData.preferredTime}
                      onChange={handleAppointmentInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    value={appointmentData.reason}
                    onChange={handleAppointmentInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Please describe the reason for your visit or any specific concerns..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Request Appointment
                  </button>
                </div>
              </form>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> This is an appointment request. The specialist's office will contact you within 24-48 hours to confirm availability and finalize the appointment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialistLocator;