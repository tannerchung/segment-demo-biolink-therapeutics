import React, { useEffect, useState } from 'react';
import { User, Calendar, MapPin, Phone, Mail, Activity, Heart, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Timeline } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const Customer360 = () => {
  const { events, trackEvent } = useAnalytics();
  const [selectedCustomer, setSelectedCustomer] = useState('patient_sarah_m_hashed');
  const [viewType, setViewType] = useState('unified');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'customer_360',
      user_type: 'admin'
    });
  }, [trackEvent]);

  // Sample customer profiles
  const customerProfiles = {
    'patient_sarah_m_hashed': {
      name: 'Sarah M.',
      type: 'Patient',
      age: '32',
      condition: 'Rare Metabolic Disorder',
      therapy: 'BioLink-GTx',
      location: 'Boston, MA',
      support_tier: 'Premium',
      journey_stage: 'Ongoing Care',
      satisfaction: 9.2,
      last_interaction: '2024-01-15T10:30:00Z'
    },
    'hcp_dr_johnson': {
      name: 'Dr. Michael Johnson',
      type: 'Healthcare Professional',
      specialty: 'Pediatric Genetics',
      institution: 'Boston Children\'s Hospital',
      location: 'Boston, MA',
      engagement_score: 8.7,
      referrals: 12,
      last_interaction: '2024-01-14T14:20:00Z'
    },
    'patient_emma_l_hashed': {
      name: 'Emma L. (via parent)',
      type: 'Patient',
      age: '8',
      condition: 'Lysosomal Storage Disorder',
      therapy: 'BioLink-GTx',
      location: 'Chicago, IL',
      support_tier: 'Standard',
      journey_stage: 'Treatment Approved',
      satisfaction: 9.8,
      last_interaction: '2024-01-13T16:45:00Z'
    }
  };

  // Customer journey timeline
  const journeyTimeline = [
    {
      date: '2023-08-15',
      event: 'Website Visit',
      source: 'Organic Search',
      details: 'Viewed rare disease information page',
      touchpoint: 'Website'
    },
    {
      date: '2023-08-18',
      event: 'Email Capture',
      source: 'Newsletter Signup',
      details: 'Subscribed to patient education newsletter',
      touchpoint: 'Email'
    },
    {
      date: '2023-08-25',
      event: 'Account Created',
      source: 'Patient Portal',
      details: 'Created patient portal account',
      touchpoint: 'Portal'
    },
    {
      date: '2023-09-02',
      event: 'Assessment Started',
      source: 'Patient Portal',
      details: 'Began treatment eligibility assessment',
      touchpoint: 'Portal'
    },
    {
      date: '2023-09-05',
      event: 'Assessment Completed',
      source: 'Patient Portal',
      details: 'Completed comprehensive assessment',
      touchpoint: 'Portal'
    },
    {
      date: '2023-09-12',
      event: 'Genetic Testing Scheduled',
      source: 'Care Coordinator',
      details: 'Scheduled genetic testing at LabCorp',
      touchpoint: 'Phone'
    },
    {
      date: '2023-09-28',
      event: 'Test Results Received',
      source: 'Clinical System',
      details: 'Genetic testing confirmed eligibility',
      touchpoint: 'Portal'
    },
    {
      date: '2023-10-05',
      event: 'Insurance Verification',
      source: 'Benefits Team',
      details: 'Insurance coverage verified (85%)',
      touchpoint: 'Phone'
    },
    {
      date: '2023-10-12',
      event: 'Treatment Approved',
      source: 'Medical Team',
      details: 'Treatment approved by medical team',
      touchpoint: 'Portal'
    },
    {
      date: '2023-10-20',
      event: 'First Dose Administered',
      source: 'Infusion Center',
      details: 'First dose at Boston Medical Center',
      touchpoint: 'Clinical'
    },
    {
      date: '2024-01-15',
      event: 'Outcome Survey',
      source: 'Patient Portal',
      details: 'Quality of life score: 9.2/10',
      touchpoint: 'Portal'
    }
  ];

  // Patient outcomes over time
  const outcomesData = [
    { month: 'Baseline', energy: 3.2, mobility: 2.8, quality_of_life: 3.1 },
    { month: 'Month 1', energy: 4.1, mobility: 3.5, quality_of_life: 4.0 },
    { month: 'Month 2', energy: 5.2, mobility: 4.8, quality_of_life: 5.1 },
    { month: 'Month 3', energy: 6.8, mobility: 6.2, quality_of_life: 6.5 },
    { month: 'Month 4', energy: 7.9, mobility: 7.5, quality_of_life: 7.8 },
    { month: 'Month 5', energy: 8.4, mobility: 8.1, quality_of_life: 8.3 },
    { month: 'Month 6', energy: 8.7, mobility: 8.5, quality_of_life: 8.6 }
  ];

  // Touchpoint frequency
  const touchpointData = [
    { touchpoint: 'Patient Portal', interactions: 45, satisfaction: 9.1 },
    { touchpoint: 'Phone Support', interactions: 12, satisfaction: 9.4 },
    { touchpoint: 'Email', interactions: 28, satisfaction: 8.8 },
    { touchpoint: 'Clinical Visits', interactions: 8, satisfaction: 9.6 },
    { touchpoint: 'Website', interactions: 67, satisfaction: 8.5 }
  ];

  // Data integration comparison
  const dataIntegration = {
    before: {
      title: 'Before Segment: Fragmented Data Silos',
      systems: [
        { name: 'Website Analytics', data: 'Page views, sessions', integration: 'Isolated' },
        { name: 'Patient Portal', data: 'Account activity, assessments', integration: 'Isolated' },
        { name: 'CRM System', data: 'Contact information, notes', integration: 'Isolated' },
        { name: 'Clinical Systems', data: 'Treatment data, outcomes', integration: 'Isolated' },
        { name: 'Support Platform', data: 'Call logs, tickets', integration: 'Isolated' }
      ]
    },
    after: {
      title: 'After Segment: Unified Customer Intelligence',
      benefits: [
        'Real-time data synchronization across all touchpoints',
        'Complete customer journey visibility',
        'Personalized engagement based on unified profile',
        'Predictive analytics for intervention opportunities',
        'HIPAA-compliant data governance'
      ]
    }
  };

  const currentProfile = customerProfiles[selectedCustomer];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer 360° View</h1>
              <p className="text-gray-600 mt-2">Unified customer profiles across all touchpoints and interactions</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="patient_sarah_m_hashed">Sarah M. (Patient)</option>
                <option value="hcp_dr_johnson">Dr. Johnson (HCP)</option>
                <option value="patient_emma_l_hashed">Emma L. (Patient)</option>
              </select>
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="unified">Unified View</option>
                <option value="before-after">Before/After Segment</option>
                <option value="real-time">Real-time Activity</option>
              </select>
            </div>
          </div>
        </div>

        {viewType === 'before-after' ? (
          /* Before/After Segment Comparison */
          <div className="space-y-8">
            {/* Before Segment */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-red-900 mb-6">{dataIntegration.before.title}</h3>
              <div className="grid md:grid-cols-5 gap-6">
                {dataIntegration.before.systems.map((system, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">{system.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{system.data}</p>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">{system.integration}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-medium">❌ No unified customer view</p>
                <p className="text-red-800 font-medium">❌ Manual data reconciliation</p>
                <p className="text-red-800 font-medium">❌ Delayed insights and interventions</p>
              </div>
            </div>

            {/* After Segment */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">{dataIntegration.after.title}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Unified Data Platform</h4>
                  <div className="bg-white p-6 rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="h-8 w-8 text-white" />
                      </div>
                      <h5 className="font-bold text-gray-900 mb-2">Segment CDP</h5>
                      <p className="text-sm text-gray-600">All customer data unified in real-time</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    {dataIntegration.after.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Unified Customer View */
          <div className="space-y-8">
            {/* Customer Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentProfile.name}</h2>
                    <p className="text-gray-600">{currentProfile.type}</p>
                    {currentProfile.condition && (
                      <p className="text-teal-600 font-medium">{currentProfile.condition}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Last Interaction</div>
                  <div className="font-medium">{new Date(currentProfile.last_interaction).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {currentProfile.therapy && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Therapy Program</span>
                    </div>
                    <div className="font-bold text-gray-900">{currentProfile.therapy}</div>
                  </div>
                )}
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Location</span>
                  </div>
                  <div className="font-bold text-gray-900">{currentProfile.location}</div>
                </div>

                {currentProfile.satisfaction && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Activity className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm text-gray-600">Satisfaction</span>
                    </div>
                    <div className="font-bold text-gray-900">{currentProfile.satisfaction}/10</div>
                  </div>
                )}

                {currentProfile.journey_stage && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm text-gray-600">Journey Stage</span>
                    </div>
                    <div className="font-bold text-gray-900">{currentProfile.journey_stage}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Journey Timeline & Outcomes */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Customer Journey Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Journey Timeline</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {journeyTimeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900">{event.event}</h4>
                          <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{event.details}</p>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{event.touchpoint}</span>
                          <span className="text-xs text-gray-500">{event.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Outcomes (if patient) */}
              {currentProfile.type === 'Patient' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Reported Outcomes</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={outcomesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={3} name="Energy Level" />
                      <Line type="monotone" dataKey="mobility" stroke="#3B82F6" strokeWidth={3} name="Mobility Score" />
                      <Line type="monotone" dataKey="quality_of_life" stroke="#10B981" strokeWidth={3} name="Quality of Life" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Touchpoint Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Touchpoint Interaction Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={touchpointData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="touchpoint" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="interactions" fill="#3B82F6" name="Interactions" />
                  <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Real-time Activity Feed */}
            {viewType === 'real-time' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Real-time Customer Activity</h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-gray-600">Live Updates</span>
                  </div>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {events.filter(event => event.user_id === selectedCustomer).slice(0, 10).map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.event_name}</p>
                        <p className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                        {Object.keys(event.properties).length > 0 && (
                          <div className="mt-1">
                            {Object.entries(event.properties).slice(0, 2).map(([key, value]) => (
                              <span key={key} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Segment Value Proposition */}
        <div className="bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Unified Customer Intelligence with Segment</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Every patient interaction, HCP engagement, and clinical touchpoint unified in real-time. 
              From anonymous visitor to treatment success - see the complete customer journey.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">360°</div>
                <div className="text-sm">Complete Customer View</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;100ms</div>
                <div className="text-sm">Real-time Data Sync</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">HIPAA</div>
                <div className="text-sm">Compliant & Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-sm">Data Sources Connected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer360;