import React, { useEffect, useState } from 'react';
import { FlaskConical, Activity, CheckCircle, Calendar, Heart, TrendingUp, User, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const TrialDashboard = () => {
  const { trackEvent } = useAnalytics();
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'trial_participant_dashboard',
      page_category: 'clinical_trials',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Identify trial participant M789
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.identify('trial_participant_m789_hashed', {
        name: 'M789',
        trial_id: 'BL-GTx-301',
        trial_compliance_score: 92,
        biomarker_quality_score: 88,
        adherence_rate: 97,
        caregiver_involved: true,
        portal_engagement_level: 'high',
        trial_site: 'boston_medical',
        enrollment_date: '2023-06-15',
        last_login: new Date().toISOString()
      });
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    trackEvent('Trial Dashboard Tab Viewed', {
      tab_name: tab,
      trial_id: 'BL-GTx-301',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleSurveyComplete = () => {
    trackEvent('Patient Reported Outcome Survey Completed', {
      survey_type: 'monthly_compliance',
      trial_id: 'BL-GTx-301',
      completion_time: 15,
      medication_adherence: 98,
      side_effects_reported: 0,
      quality_of_life_score: 9,
      visit_compliance: 100,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleBiomarkerSubmit = () => {
    trackEvent('Digital Biomarker Collection', {
      trial_id: 'BL-GTx-301',
      biomarker_type: 'heart_rate_variability',
      data_quality_flag: false,
      compliance_rate: 97,
      device_type: 'wearable',
      collection_date: new Date().toISOString()
    });
  };

  const participantInfo = {
    id: 'M789',
    name: 'Trial Participant M789',
    trialId: 'BL-GTx-301',
    trialName: 'BioLink-GTx Phase 3 Study',
    enrollmentDate: 'June 15, 2023',
    site: 'Boston Medical Center',
    complianceScore: 92,
    biomarkerQuality: 88,
    adherenceRate: 97,
    nextVisit: 'February 20, 2024',
    studyWeek: 32
  };

  // Compliance data over time
  const complianceData = [
    { week: 1, compliance: 95, biomarker: 90, adherence: 98 },
    { week: 4, compliance: 94, biomarker: 88, adherence: 97 },
    { week: 8, compliance: 96, biomarker: 92, adherence: 99 },
    { week: 12, compliance: 93, biomarker: 87, adherence: 96 },
    { week: 16, compliance: 97, biomarker: 91, adherence: 98 },
    { week: 20, compliance: 95, biomarker: 89, adherence: 97 },
    { week: 24, compliance: 98, biomarker: 93, adherence: 99 },
    { week: 28, compliance: 92, biomarker: 88, adherence: 97 },
    { week: 32, compliance: 94, biomarker: 90, adherence: 98 }
  ];

  // Study timeline
  const studyTimeline = [
    { date: '2023-06-15', event: 'Enrollment & Consent', status: 'completed' },
    { date: '2023-06-22', event: 'Baseline Assessments', status: 'completed' },
    { date: '2023-07-01', event: 'First Dose Administration', status: 'completed' },
    { date: '2023-08-01', event: 'Month 1 Follow-up', status: 'completed' },
    { date: '2023-11-01', event: 'Month 4 Assessment', status: 'completed' },
    { date: '2024-02-01', event: 'Month 8 Evaluation', status: 'completed' },
    { date: '2024-02-20', event: 'Month 8.5 Visit', status: 'upcoming' },
    { date: '2024-05-01', event: 'Month 11 Assessment', status: 'scheduled' }
  ];

  const quickActions = [
    {
      icon: CheckCircle,
      title: 'Complete Monthly Survey',
      description: 'Quality of life and compliance assessment',
      action: handleSurveyComplete
    },
    {
      icon: Activity,
      title: 'Submit Biomarker Data',
      description: 'Upload wearable device data',
      action: handleBiomarkerSubmit
    },
    {
      icon: Calendar,
      title: 'Schedule Next Visit',
      description: 'Book upcoming study visit',
      action: () => trackEvent('Trial Visit Scheduling Initiated', {
        trial_id: 'BL-GTx-301',
        visit_type: 'month_8_5_assessment',
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      })
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trial Participant Dashboard</h1>
          <p className="text-gray-600 mt-2">Study: {participantInfo.trialName}</p>
        </div>

        {/* Participant Overview Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <FlaskConical className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Participant ID</h3>
                <p className="text-purple-600">{participantInfo.id}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Compliance Score</h3>
                <p className="text-green-600">{participantInfo.complianceScore}%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Biomarker Quality</h3>
                <p className="text-blue-600">{participantInfo.biomarkerQuality}%</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Study Week</h3>
                <p className="text-orange-600">Week {participantInfo.studyWeek}</p>
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
                { id: 'compliance', label: 'Compliance Tracking' },
                { id: 'timeline', label: 'Study Timeline' },
                { id: 'biomarkers', label: 'Biomarker Data' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
                        className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left"
                      >
                        <action.icon className="h-8 w-8 text-purple-600 mb-3" />
                        <h4 className="font-bold text-gray-900 mb-2">{action.title}</h4>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2">Adherence Rate</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">{participantInfo.adherenceRate}%</div>
                    <p className="text-green-700 text-sm">Excellent compliance</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Data Quality</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{participantInfo.biomarkerQuality}%</div>
                    <p className="text-blue-700 text-sm">High-quality biomarkers</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-900 mb-2">Next Visit</h4>
                    <div className="text-lg font-bold text-purple-600 mb-2">{participantInfo.nextVisit}</div>
                    <p className="text-purple-700 text-sm">Month 8.5 Assessment</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'compliance' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Compliance Tracking Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="compliance" stroke="#8B5CF6" strokeWidth={3} name="Overall Compliance" />
                    <Line type="monotone" dataKey="biomarker" stroke="#3B82F6" strokeWidth={3} name="Biomarker Quality" />
                    <Line type="monotone" dataKey="adherence" stroke="#10B981" strokeWidth={3} name="Treatment Adherence" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedTab === 'timeline' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Study Timeline</h3>
                <div className="space-y-4">
                  {studyTimeline.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        item.status === 'completed' ? 'bg-green-500' : 
                        item.status === 'upcoming' ? 'bg-orange-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900">{item.event}</h4>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <span className={`text-sm ${
                          item.status === 'completed' ? 'text-green-600' : 
                          item.status === 'upcoming' ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : 
                           item.status === 'upcoming' ? 'Upcoming' : 'Scheduled'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'biomarkers' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Biomarker Collection Status</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">Recent Collections</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Heart Rate Variability</span>
                        <span className="text-green-600 font-medium">98% Quality</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Activity Monitoring</span>
                        <span className="text-green-600 font-medium">96% Quality</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sleep Patterns</span>
                        <span className="text-green-600 font-medium">94% Quality</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4">Collection Schedule</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Daily Wearable Data</span>
                        <span className="text-blue-600 font-medium">Automated</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Weekly Surveys</span>
                        <span className="text-orange-600 font-medium">Due Tomorrow</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Monthly Lab Work</span>
                        <span className="text-gray-600 font-medium">Feb 20, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Study Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Trial Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Study ID:</span>
                  <span className="text-gray-900 font-medium">{participantInfo.trialId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Site:</span>
                  <span className="text-gray-900 font-medium">{participantInfo.site}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrollment:</span>
                  <span className="text-gray-900 font-medium">{participantInfo.enrollmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phase:</span>
                  <span className="text-gray-900 font-medium">Phase 3</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Support Team</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal Investigator:</span>
                  <span className="text-gray-900 font-medium">Dr. Sarah Chen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Coordinator:</span>
                  <span className="text-gray-900 font-medium">Jennifer Martinez</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Emergency Contact:</span>
                  <span className="text-gray-900 font-medium">(617) 555-0123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Caregiver Support:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialDashboard;