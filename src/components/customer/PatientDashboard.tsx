import React, { useEffect, useState } from 'react';
import { Heart, Calendar, Phone, FileText, User, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

const PatientDashboard = () => {
  const { trackEvent } = useAnalytics();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_dashboard',
      page_category: 'portal',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Get current user from analytics (set during login)
    if (typeof window !== 'undefined' && (window as any).analytics && typeof (window as any).analytics.user === 'function') {
      const analytics = (window as any).analytics;
      const currentUser = analytics.user();
      
      // Track dashboard access for current user
      if (currentUser && currentUser.id()) {
        trackEvent('Application Opened', {
          application: 'patient_portal',
          user_id: currentUser.id(),
          device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
        });
      }
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    trackEvent('Dashboard Tab Viewed', {
      tab_name: tab,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleAppointmentSchedule = () => {
    setShowAppointmentModal(true);
    trackEvent('Appointment Scheduling Initiated', {
      appointment_type: 'routine_follow_up',
      therapy_program: patientInfo.therapy,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !appointmentType) {
      alert('Please fill in all fields');
      return;
    }

    const appointmentDateTime = `${selectedDate} at ${selectedTime}`;
    
    // Get current user ID for profile update
    let currentUserId = 'anonymous';
    if (typeof window !== 'undefined' && (window as any).analytics) {
      const analytics = (window as any).analytics;
      try {
        if (typeof analytics.user === 'function') {
          const currentUser = analytics.user();
          if (currentUser && typeof currentUser.id === 'function') {
            currentUserId = currentUser.id() || 'anonymous';
          }
        }
      } catch (error) {
        console.log('Analytics user not available');
      }
    }
    
    // If no analytics user, try fallbacks
    if (currentUserId === 'anonymous') {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get('userId');
      const lastLoggedInUser = localStorage.getItem('currentPatientId');
      
      if (userIdFromUrl) {
        currentUserId = userIdFromUrl;
      } else if (lastLoggedInUser) {
        currentUserId = lastLoggedInUser;
      }
    }

    // Track the appointment scheduling event
    trackEvent('Appointment Scheduled', {
      appointment_type: appointmentType,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      appointment_datetime: appointmentDateTime,
      therapy_program: patientInfo.therapy,
      patient_name: patientInfo.name,
      care_coordinator: patientInfo.careCoordinator,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      user_id: currentUserId
    });

    // Update user profile with new appointment information
    if (typeof window !== 'undefined' && (window as any).analytics && currentUserId !== 'anonymous') {
      (window as any).analytics.identify(currentUserId, {
        next_appointment: appointmentDateTime,
        next_appointment_type: appointmentType,
        last_appointment_scheduled: new Date().toISOString(),
        appointment_scheduling_method: 'patient_portal'
      });
    }

    // Close modal and show success
    setShowAppointmentModal(false);
    setSelectedDate('');
    setSelectedTime('');
    setAppointmentType('');
    
    alert(`Appointment scheduled successfully!\n\nType: ${appointmentType}\nDate: ${appointmentDateTime}\n\nYou will receive a confirmation email shortly.`);
  };

  const handleSurveyComplete = () => {
    trackEvent('Patient Reported Outcome Survey Completed', {
      survey_type: 'quality_of_life',
      therapy_program: 'BioLink-GTx',
      energy_level: 9,
      mobility_score: 8,
      quality_of_life: 9,
      treatment_satisfaction: 10
    });
  };

  // Get patient info from current user or default to Sarah
  const getCurrentPatientInfo = () => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      const analytics = (window as any).analytics;
      
      // Try to get user ID from analytics
      let userId = null;
      try {
        if (typeof analytics.user === 'function') {
          const currentUser = analytics.user();
          if (currentUser && typeof currentUser.id === 'function') {
            userId = currentUser.id();
          }
        }
      } catch (error) {
        console.log('Analytics user not available yet');
      }
      
      // Return patient-specific data based on user ID
      if (userId) {
        return getPatientDataById(userId);
      }
    }
    
    // If no user ID from analytics, try to get from URL or localStorage as fallback
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    
    // Check localStorage for last logged in user
    const lastLoggedInUser = localStorage.getItem('currentPatientId');
    
    if (userIdFromUrl) {
      return getPatientDataById(userIdFromUrl);
    } else if (lastLoggedInUser) {
      return getPatientDataById(lastLoggedInUser);
    }
    
    // Final fallback to Sarah
    return getPatientDataById('patient_sarah_m_hashed');
  };

  const getPatientDataById = (userId: string) => {
    const patientData: Record<string, any> = {
      'patient_sarah_m_hashed': {
        name: 'Sarah M.',
        therapy: 'BioLink-GTx',
        startDate: 'October 20, 2023',
        nextAppointment: 'February 15, 2024',
        careCoordinator: 'Jennifer H.',
        supportTier: 'Premium',
        journeyStage: 'Ongoing Care',
        condition: 'rare_metabolic_disorder',
        age: '32',
        location: 'Boston, MA',
        treatmentProgress: [
          { date: '2023-10-20', event: 'First Dose Administered', status: 'completed' },
          { date: '2023-11-20', event: 'Month 1 Follow-up', status: 'completed' },
          { date: '2023-12-20', event: 'Month 2 Assessment', status: 'completed' },
          { date: '2024-01-20', event: 'Month 3 Evaluation', status: 'completed' },
          { date: '2024-02-15', event: 'Month 4 Check-in', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'survey', message: 'Quality of life survey completed - Score: 9.2/10', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'Next appointment scheduled for February 15, 2024', icon: 'Calendar', color: 'blue' },
          { type: 'reminder', message: 'Monthly survey due in 3 days', icon: 'AlertCircle', color: 'orange' }
        ]
      },
      'patient_emma_l_hashed': {
        name: 'Emma L.',
        therapy: 'BioLink-GTx',
        startDate: 'November 15, 2023',
        nextAppointment: 'February 20, 2024',
        careCoordinator: 'Dr. Sarah Chen',
        supportTier: 'Standard',
        journeyStage: 'Treatment Approved',
        condition: 'lysosomal_storage_disorder',
        age: '8',
        location: 'Chicago, IL',
        treatmentProgress: [
          { date: '2023-11-15', event: 'Genetic Testing Completed', status: 'completed' },
          { date: '2023-12-01', event: 'Insurance Approval', status: 'completed' },
          { date: '2023-12-15', event: 'Treatment Planning', status: 'completed' },
          { date: '2024-01-10', event: 'Pre-treatment Assessment', status: 'completed' },
          { date: '2024-02-20', event: 'First Dose Scheduled', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'approval', message: 'Treatment approved by medical team', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'First dose scheduled for February 20, 2024', icon: 'Calendar', color: 'blue' },
          { type: 'education', message: 'Parent education materials sent', icon: 'FileText', color: 'purple' }
        ]
      },
      'patient_michael_r_hashed': {
        name: 'Michael R.',
        therapy: 'BioLink-ENZ',
        startDate: 'January 5, 2024',
        nextAppointment: 'February 25, 2024',
        careCoordinator: 'Maria Santos',
        supportTier: 'Premium',
        journeyStage: 'Assessment Complete',
        condition: 'metabolic_disorder',
        age: '42',
        location: 'Denver, CO',
        treatmentProgress: [
          { date: '2024-01-05', event: 'Initial Consultation', status: 'completed' },
          { date: '2024-01-12', event: 'Comprehensive Assessment', status: 'completed' },
          { date: '2024-01-20', event: 'Lab Work Completed', status: 'completed' },
          { date: '2024-02-05', event: 'Results Review', status: 'completed' },
          { date: '2024-02-25', event: 'Treatment Planning', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'results', message: 'Lab results reviewed - Eligible for treatment', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'Treatment planning meeting scheduled', icon: 'Calendar', color: 'blue' },
          { type: 'insurance', message: 'Insurance verification in progress', icon: 'Clock', color: 'orange' }
        ]
      },
      'patient_david_l_hashed': {
        name: 'David L.',
        therapy: 'BioLink-ENZ',
        startDate: 'December 10, 2023',
        nextAppointment: 'February 18, 2024',
        careCoordinator: 'Dr. Michael Rodriguez',
        supportTier: 'Standard',
        journeyStage: 'Genetic Testing',
        condition: 'fabry_disease',
        age: '45',
        location: 'Chicago, IL',
        treatmentProgress: [
          { date: '2023-12-10', event: 'Specialist Referral', status: 'completed' },
          { date: '2023-12-20', event: 'Initial Assessment', status: 'completed' },
          { date: '2024-01-08', event: 'Genetic Testing Ordered', status: 'completed' },
          { date: '2024-01-25', event: 'Test Sample Collected', status: 'completed' },
          { date: '2024-02-18', event: 'Results Discussion', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'testing', message: 'Genetic test sample collected successfully', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'Results appointment scheduled for February 18', icon: 'Calendar', color: 'blue' },
          { type: 'reminder', message: 'Results expected within 2 weeks', icon: 'Clock', color: 'orange' }
        ]
      },
      'patient_lisa_w_hashed': {
        name: 'Lisa W.',
        therapy: 'BioLink-ENZ',
        startDate: 'January 15, 2024',
        nextAppointment: 'February 22, 2024',
        careCoordinator: 'Jennifer H.',
        supportTier: 'Premium',
        journeyStage: 'Insurance Verification',
        condition: 'alpha1_antitrypsin',
        age: '28',
        location: 'Seattle, WA',
        treatmentProgress: [
          { date: '2024-01-15', event: 'Diagnosis Confirmed', status: 'completed' },
          { date: '2024-01-22', event: 'Treatment Consultation', status: 'completed' },
          { date: '2024-01-30', event: 'Insurance Submitted', status: 'completed' },
          { date: '2024-02-10', event: 'Prior Authorization', status: 'completed' },
          { date: '2024-02-22', event: 'Coverage Review', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'insurance', message: 'Prior authorization approved', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'Coverage review meeting scheduled', icon: 'Calendar', color: 'blue' },
          { type: 'support', message: 'Financial assistance options available', icon: 'Heart', color: 'purple' }
        ]
      },
      'patient_robert_k_hashed': {
        name: 'Robert K.',
        therapy: 'BioLink-GTx',
        startDate: 'September 5, 2023',
        nextAppointment: 'February 12, 2024',
        careCoordinator: 'Dr. Emily Johnson',
        supportTier: 'Standard',
        journeyStage: 'Ongoing Care',
        condition: 'pompe_disease',
        age: '58',
        location: 'Phoenix, AZ',
        treatmentProgress: [
          { date: '2023-09-05', event: 'First Dose Administered', status: 'completed' },
          { date: '2023-10-05', event: 'Month 1 Follow-up', status: 'completed' },
          { date: '2023-11-05', event: 'Month 2 Assessment', status: 'completed' },
          { date: '2023-12-05', event: 'Month 3 Evaluation', status: 'completed' },
          { date: '2024-01-05', event: 'Month 4 Check-in', status: 'completed' },
          { date: '2024-02-12', event: 'Month 5 Follow-up', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'survey', message: 'Monthly assessment completed - Excellent progress', icon: 'CheckCircle', color: 'green' },
          { type: 'appointment', message: 'Next follow-up scheduled for February 12', icon: 'Calendar', color: 'blue' },
          { type: 'milestone', message: 'Reached 5-month treatment milestone', icon: 'Heart', color: 'purple' }
        ]
      },
      'patient_jennifer_m_hashed': {
        name: 'Jennifer M.',
        therapy: 'BioLink-ENZ',
        startDate: 'January 20, 2024',
        nextAppointment: 'February 28, 2024',
        careCoordinator: 'Lisa Thompson',
        supportTier: 'Premium',
        journeyStage: 'First Dose',
        condition: 'hereditary_angioedema',
        age: '31',
        location: 'Miami, FL',
        treatmentProgress: [
          { date: '2024-01-20', event: 'Treatment Initiation', status: 'completed' },
          { date: '2024-01-21', event: 'First Dose Administered', status: 'completed' },
          { date: '2024-01-28', event: 'Week 1 Check-in', status: 'completed' },
          { date: '2024-02-04', event: 'Week 2 Assessment', status: 'completed' },
          { date: '2024-02-28', event: 'Month 1 Follow-up', status: 'upcoming' }
        ],
        recentActivity: [
          { type: 'dose', message: 'First dose administered successfully', icon: 'CheckCircle', color: 'green' },
          { type: 'monitoring', message: 'No adverse reactions reported', icon: 'Heart', color: 'green' },
          { type: 'appointment', message: 'Month 1 follow-up scheduled', icon: 'Calendar', color: 'blue' }
        ]
      }
    };

    return patientData[userId] || patientData['patient_sarah_m_hashed'];
  };

  const patientInfo = getCurrentPatientInfo();

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 45; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates.slice(0, 30); // Return 30 available weekdays
  };

  const availableDates = generateAvailableDates();
  
  const availableTimes = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const appointmentTypes = [
    { value: 'routine_follow_up', label: 'Routine Follow-up' },
    { value: 'treatment_consultation', label: 'Treatment Consultation' },
    { value: 'lab_work', label: 'Lab Work' },
    { value: 'specialist_consultation', label: 'Specialist Consultation' },
    { value: 'treatment_planning', label: 'Treatment Planning' },
    { value: 'insurance_consultation', label: 'Insurance Consultation' }
  ];
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle': return CheckCircle;
      case 'Calendar': return Calendar;
      case 'AlertCircle': return AlertCircle;
      case 'Clock': return Clock;
      case 'FileText': return FileText;
      case 'Heart': return Heart;
      default: return CheckCircle;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-50 text-green-500';
      case 'blue': return 'bg-blue-50 text-blue-500';
      case 'orange': return 'bg-orange-50 text-orange-500';
      case 'purple': return 'bg-purple-50 text-purple-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  const quickActions = [
    {
      icon: Calendar,
      title: 'Schedule Appointment',
      description: 'Book your next follow-up visit',
      action: handleAppointmentSchedule
    },
    {
      icon: FileText,
      title: 'Complete Survey',
      description: 'Monthly quality of life assessment',
      action: handleSurveyComplete
    },
    {
      icon: Phone,
      title: 'Contact Care Team',
      description: 'Speak with your care coordinator',
      action: () => trackEvent('Care Team Contact Initiated', {
        contact_method: 'phone',
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {patientInfo.name}</h1>
          <p className="text-gray-600 mt-2">Your BioLink treatment dashboard</p>
        </div>

        {/* Patient Overview Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Therapy Program</h3>
                <p className="text-teal-600">{patientInfo.therapy}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Age</h3>
                <p className="text-gray-600">{patientInfo.age} years old</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Treatment Start</h3>
                <p className="text-gray-600">{patientInfo.startDate}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Next Appointment</h3>
                <p className="text-gray-600">{patientInfo.nextAppointment}</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'treatment', label: 'Treatment Progress' },
                { id: 'appointments', label: 'Appointments' },
                { id: 'resources', label: 'Resources' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 text-left"
                      >
                        <action.icon className="h-8 w-8 text-teal-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">{action.title}</h4>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {patientInfo.recentActivity?.map((activity: any, index: number) => {
                      const IconComponent = getIconComponent(activity.icon);
                      const colorClass = getColorClass(activity.color);
                      
                      return (
                        <div key={index} className={`flex items-center p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('-500', '-50')}`}>
                          <IconComponent className={`h-5 w-5 mr-3 ${colorClass.split(' ')[1]}`} />
                          <span className="text-gray-700">{activity.message}</span>
                        </div>
                      );
                    })}
                    </div>
                  </div>
              </div>
            )}

            {selectedTab === 'treatment' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Treatment Timeline</h3>
                <div className="space-y-4">
                  {patientInfo.treatmentProgress?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900">{item.event}</h4>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <span className={`text-sm ${
                          item.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'appointments' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Appointments</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">{patientInfo.journeyStage} Appointment</h4>
                      <p className="text-gray-600">{patientInfo.nextAppointment} at 10:00 AM</p>
                      <p className="text-gray-600">{patientInfo.location} Medical Center</p>
                      <p className="text-gray-600">Care Coordinator: {patientInfo.careCoordinator}</p>
                    </div>
                    <button
                      onClick={handleAppointmentSchedule}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'resources' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Patient Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Treatment Guide</h4>
                    <p className="text-gray-600 text-sm mb-3">Complete guide to your {patientInfo.therapy} therapy</p>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Download PDF →
                    </button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Insurance Information</h4>
                    <p className="text-gray-600 text-sm mb-3">Coverage details and financial assistance ({patientInfo.supportTier} Support)</p>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Scheduling Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Schedule Appointment</h2>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Appointment Form */}
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    required
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

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Select any date within the next 90 days
                  </p>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Info Display */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Appointment Details</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Patient:</strong> {patientInfo.name}</p>
                    <p><strong>Therapy:</strong> {patientInfo.therapy}</p>
                    <p><strong>Care Coordinator:</strong> {patientInfo.careCoordinator}</p>
                    <p><strong>Location:</strong> {patientInfo.location} Medical Center</p>
                  </div>
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
                    Schedule Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;