import React, { useEffect, useState } from 'react';
import { Stethoscope, Users, FileText, Calendar, Download, TrendingUp, BookOpen, Activity } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import DownloadAnimation from '../DownloadAnimation';

const HCPDashboard = () => {
  const { trackEvent } = useAnalytics();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [userType, setUserType] = useState('dr_johnson'); // Default to Dr. Johnson

  useEffect(() => {
    trackEvent('Application Opened', {
      application: 'hcp_portal',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });

    // Check URL for user type or default to Dr. Johnson
    const urlParams = new URLSearchParams(window.location.search);
    const hcpType = urlParams.get('hcp') || 'dr_johnson';
    setUserType(hcpType);

    // Identify appropriate HCP user
    if (typeof window !== 'undefined' && (window as any).analytics) {
      if (hcpType === 'dr_martinez') {
        (window as any).analytics.identify('hcp_dr_martinez_hashed', {
          name: 'Dr. Carlos Martinez',
          specialty: 'Endocrinology',
          institution: 'Johns Hopkins Hospital',
          location: 'Baltimore, MD',
          npi_number: '9876543210',
          years_experience: 12,
          monthly_rare_disease_patients: 8,
          hcp_engagement_score: 85,
          patient_referrals: 0, // Critical: NO referrals for audience demo
          last_login: new Date().toISOString()
        });
      } else {
        (window as any).analytics.identify('hcp_dr_johnson_md', {
          name: 'Dr. Michael Johnson',
          specialty: 'Pediatric Genetics',
          institution: 'Boston Children\'s Hospital',
          location: 'Boston, MA',
          npi_number: '1234567890',
          years_experience: 15,
          patient_referrals: 12,
          last_login: new Date().toISOString()
        });
      }
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    trackEvent('HCP Dashboard Tab Viewed', {
      tab_name: tab,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handleResourceAccess = (resourceType: string, resourceTitle: string) => {
    trackEvent('Educational Content Viewed', {
      content_type: resourceType,
      content_title: resourceTitle,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const handlePatientReferral = () => {
    trackEvent('Patient Referral Initiated', {
      referral_type: 'biolink_therapy',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const hcpProfiles = {
    dr_johnson: {
      name: 'Dr. Michael Johnson',
      specialty: 'Pediatric Genetics',
      institution: 'Boston Children\'s Hospital',
      location: 'Boston, MA',
      npi: '1234567890',
      patientsReferred: 12,
      lastLogin: 'Today, 2:30 PM',
      engagementScore: 7.8
    },
    dr_martinez: {
      name: 'Dr. Carlos Martinez',
      specialty: 'Endocrinology',
      institution: 'Johns Hopkins Hospital',
      location: 'Baltimore, MD',
      npi: '9876543210',
      patientsReferred: 0, // No referrals for audience demo
      lastLogin: 'Today, 1:45 PM',
      engagementScore: 8.5
    }
  };

  const hcpInfo = hcpProfiles[userType] || hcpProfiles.dr_johnson;

  const quickActions = [
    {
      icon: Users,
      title: 'Refer Patient',
      description: 'Connect patients with BioLink therapies',
      action: userType === 'dr_martinez' ? 
        () => alert('Dr. Martinez is currently evaluating BioLink therapies for patient referrals.') : 
        handlePatientReferral
    },
    {
      icon: FileText,
      title: 'Request Medical Info',
      description: 'Get clinical data and prescribing information',
      action: () => handleResourceAccess('medical_information_request', 'Clinical Data Request')
    },
    {
      icon: Calendar,
      title: 'Upcoming Webinars',
      description: 'Register for educational sessions',
      action: () => handleResourceAccess('webinar_registration', 'Educational Webinars')
    }
  ];

  const recentActivity = [
    {
      type: 'content_view',
      title: 'BioLink-GTx Clinical Study Results',
      time: '2 hours ago',
      icon: FileText
    },
    {
      type: 'patient_referral',
      title: 'Patient referral submitted',
      time: '1 day ago',
      icon: Users
    },
    {
      type: 'webinar_registration',
      title: 'Registered for Rare Disease Conference',
      time: '3 days ago',
      icon: Calendar
    }
  ];

  const clinicalResources = [
    {
      title: 'BioLink-GTx Prescribing Information',
      type: 'prescribing_info',
      updated: 'Updated Jan 2024'
    },
    {
      title: 'BioLink-ENZ Safety Profile',
      type: 'safety_data',
      updated: 'Updated Dec 2023'
    },
    {
      title: 'Patient Case Studies',
      type: 'case_studies',
      updated: 'Updated Jan 2024'
    },
    {
      title: 'Dosing Guidelines',
      type: 'dosing_guidelines',
      updated: 'Updated Nov 2023'
    }
  ];

  // Generate content engagement events for Dr. Martinez
  const generateMartinezEngagement = () => {
    if (userType === 'dr_martinez') {
      // Generate multiple BioLink-GTx content views
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          trackEvent('Educational Content Viewed', {
            content_category: 'BioLink-GTx',
            content_title: `BioLink-GTx Clinical Data Session ${i + 1}`,
            time_spent_minutes: 12 + i * 2,
            engagement_level: 'high',
            specialty: 'endocrinology',
            device_type: 'desktop'
          });
        }, i * 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {hcpInfo.name}</h1>
          <p className="text-gray-600 mt-2">Your BioLink HCP dashboard</p>
        </div>

        {/* User Type Selector for Demo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <h3 className="font-bold text-blue-900 mb-2">Demo Mode - Switch HCP Profile</h3>
          <div className="flex space-x-4">
            <a href="/hcp/dashboard?hcp=dr_johnson" className="text-blue-600 hover:text-blue-700">Dr. Johnson (Has Referrals)</a>
            <a href="/hcp/dashboard?hcp=dr_martinez" className="text-blue-600 hover:text-blue-700">Dr. Martinez (No Referrals)</a>
            <button onClick={generateMartinezEngagement} className="text-blue-600 hover:text-blue-700">Generate Martinez Engagement</button>
          </div>
          <p className="text-blue-700 text-sm mt-2">Current: {hcpInfo.name} - Engagement Score: {hcpInfo.engagementScore}</p>
        </div>

        {/* HCP Overview Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Stethoscope className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Specialty</h3>
                <p className="text-orange-600">{hcpInfo.specialty}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Institution</h3>
                <p className="text-gray-600">{hcpInfo.institution}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Patients Referred</h3>
                <p className="text-gray-600">{hcpInfo.patientsReferred}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Last Login</h3>
                <p className="text-gray-600">{hcpInfo.lastLogin}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Engagement Score</h3>
                <p className="text-gray-600">{hcpInfo.engagementScore}/10</p>
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
                { id: 'resources', label: 'Clinical Resources' },
                { id: 'patients', label: 'Patient Referrals' },
                { id: 'education', label: 'Education' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-orange-500 text-orange-600'
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
                        className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-left"
                      >
                        <action.icon className="h-8 w-8 text-orange-600 mb-3" />
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
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <activity.icon className="h-5 w-5 text-orange-500 mr-3" />
                        <div className="flex-1">
                          <span className="text-gray-700">{activity.title}</span>
                          <span className="text-gray-500 text-sm ml-2">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'resources' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Clinical Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {clinicalResources.map((resource, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{resource.title}</h4>
                        <Download className="h-5 w-5 text-orange-600" />
                      </div>
                      <p className="text-gray-600 text-sm">{resource.updated}</p>
                      <DownloadAnimation
                        fileName={`${resource.title.replace(/\s+/g, '_')}.pdf`}
                        onDownload={() => handleResourceAccess(resource.type, resource.title)}
                        className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        Download →
                      </DownloadAnimation>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'patients' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Patient Referral Program</h3>
                {userType === 'dr_martinez' ? (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">Evaluating BioLink Therapies</h4>
                        <p className="text-gray-600">Dr. Martinez is currently reviewing clinical data and considering patient referrals</p>
                      </div>
                      <button
                        onClick={() => alert('Dr. Martinez is still evaluating BioLink therapies for his patients.')}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                      >
                        Review Clinical Data
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-gray-600 text-sm">Patients Referred</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">8.5/10</div>
                        <div className="text-gray-600 text-sm">Engagement Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-gray-600 text-sm">Monthly Rare Disease Patients</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">Refer Patients to BioLink Therapies</h4>
                        <p className="text-gray-600">Connect your patients with our comprehensive support programs</p>
                      </div>
                      <button
                        onClick={handlePatientReferral}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                      >
                        Start Referral
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{hcpInfo.patientsReferred}</div>
                        <div className="text-gray-600 text-sm">Patients Referred</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">100%</div>
                        <div className="text-gray-600 text-sm">Approval Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">5 days</div>
                        <div className="text-gray-600 text-sm">Avg. Processing Time</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'education' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Educational Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <BookOpen className="h-8 w-8 text-orange-600 mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">Upcoming Webinars</h4>
                    <p className="text-gray-600 text-sm mb-4">Join our educational sessions on rare disease management</p>
                    <button
                      onClick={() => handleResourceAccess('webinar_registration', 'Educational Webinars')}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Schedule →
                    </button>
                  </div>
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-orange-600 mb-4" />
                    <h4 className="font-bold text-gray-900 mb-2">Clinical Updates</h4>
                    <p className="text-gray-600 text-sm mb-4">Latest research and clinical trial results</p>
                    <button
                      onClick={() => handleResourceAccess('clinical_updates', 'Latest Clinical Data')}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Read Updates →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCPDashboard;