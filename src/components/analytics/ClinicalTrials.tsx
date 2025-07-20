import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, Clock, TrendingUp, MapPin, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const ClinicalTrials = () => {
  const { trackEvent } = useAnalytics();
  const [selectedStudy, setSelectedStudy] = useState('all');
  const [selectedSite, setSelectedSite] = useState('all');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'clinical_trials',
      user_type: 'admin'
    });
  }, [trackEvent]);

  // Trial Metrics
  const trialMetrics = [
    {
      title: 'Active Participants',
      value: '1,245',
      change: '+15.8%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Enrollment Rate',
      value: '94.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Compliance Rate',
      value: '96.8%',
      change: '+1.2%',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'Data Collection',
      value: '98.5%',
      change: '+0.8%',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  // Enrollment Pipeline
  const enrollmentPipeline = [
    { stage: 'Screening', count: 2800, conversion: 100, avg_days: 0 },
    { stage: 'Eligibility Review', count: 2200, conversion: 78.6, avg_days: 7 },
    { stage: 'Informed Consent', count: 1800, conversion: 64.3, avg_days: 14 },
    { stage: 'Baseline Visit', count: 1600, conversion: 57.1, avg_days: 21 },
    { stage: 'Randomization', count: 1450, conversion: 51.8, avg_days: 28 },
    { stage: 'Active Participation', count: 1245, conversion: 44.5, avg_days: 35 }
  ];

  // Site Performance
  const sitePerformance = [
    { site: 'Boston Medical Center', enrolled: 280, target: 300, compliance: 98.2, retention: 96.4 },
    { site: 'Mayo Clinic', enrolled: 245, target: 250, compliance: 97.8, retention: 98.1 },
    { site: 'Johns Hopkins', enrolled: 220, target: 240, compliance: 96.5, retention: 95.9 },
    { site: 'UCSF Medical Center', enrolled: 195, target: 200, compliance: 99.1, retention: 97.3 },
    { site: 'Cleveland Clinic', enrolled: 180, target: 190, compliance: 95.8, retention: 94.7 },
    { site: 'Mount Sinai', enrolled: 125, target: 150, compliance: 97.2, retention: 96.8 }
  ];

  // Study Progress
  const studyProgress = [
    { study: 'BL-GTx-301', phase: 'Phase III', enrolled: 450, target: 500, completion: 90, primary_endpoint: 'Efficacy' },
    { study: 'BL-ENZ-201', phase: 'Phase II', enrolled: 280, target: 300, completion: 93, primary_endpoint: 'Safety' },
    { study: 'BL-GTx-401', phase: 'Phase III', enrolled: 320, target: 350, completion: 91, primary_endpoint: 'Long-term Safety' },
    { study: 'BL-ENZ-301', phase: 'Phase III', enrolled: 195, target: 200, completion: 98, primary_endpoint: 'Efficacy' }
  ];

  // Monthly Enrollment Trends
  const enrollmentTrends = [
    { month: 'Jan', enrolled: 85, screened: 120, retention: 94.2 },
    { month: 'Feb', enrolled: 92, screened: 135, retention: 95.1 },
    { month: 'Mar', enrolled: 108, screened: 150, retention: 96.3 },
    { month: 'Apr', enrolled: 115, screened: 165, retention: 95.8 },
    { month: 'May', enrolled: 128, screened: 180, retention: 97.1 },
    { month: 'Jun', enrolled: 142, screened: 195, retention: 96.8 }
  ];

  // Digital Biomarker Collection
  const biomarkerData = [
    { type: 'Heart Rate Variability', compliance: 98.5, quality: 'Excellent', participants: 1200 },
    { type: 'Activity Monitoring', compliance: 96.8, quality: 'Good', participants: 1180 },
    { type: 'Sleep Patterns', compliance: 94.2, quality: 'Excellent', participants: 1150 },
    { type: 'Medication Adherence', compliance: 99.1, quality: 'Excellent', participants: 1245 },
    { type: 'Symptom Tracking', compliance: 92.7, quality: 'Good', participants: 1100 }
  ];

  // Protocol Deviations
  const deviationData = [
    { category: 'Visit Window', count: 12, severity: 'Minor', trend: -2 },
    { category: 'Dosing', count: 8, severity: 'Major', trend: -1 },
    { category: 'Consent Process', count: 5, severity: 'Minor', trend: 0 },
    { category: 'Lab Collection', count: 15, severity: 'Minor', trend: -3 },
    { category: 'Adverse Event Reporting', count: 3, severity: 'Major', trend: 0 }
  ];

  // Geographic Distribution
  const geoDistribution = [
    { name: 'Northeast', value: 35, color: '#3B82F6' },
    { name: 'Southeast', value: 28, color: '#10B981' },
    { name: 'Midwest', value: 22, color: '#8B5CF6' },
    { name: 'West', value: 15, color: '#F59E0B' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clinical Trial Operations</h1>
              <p className="text-gray-600 mt-2">Real-time clinical trial enrollment, compliance, and data quality monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStudy}
                onChange={(e) => setSelectedStudy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Studies</option>
                <option value="bl-gtx-301">BL-GTx-301</option>
                <option value="bl-enz-201">BL-ENZ-201</option>
                <option value="bl-gtx-401">BL-GTx-401</option>
                <option value="bl-enz-301">BL-ENZ-301</option>
              </select>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Sites</option>
                <option value="boston">Boston Medical Center</option>
                <option value="mayo">Mayo Clinic</option>
                <option value="hopkins">Johns Hopkins</option>
                <option value="ucsf">UCSF Medical Center</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trialMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          ))}
        </div>

        {/* Enrollment Pipeline & Site Performance */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Enrollment Pipeline */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Enrollment Pipeline</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={enrollmentPipeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Site Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Site Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sitePerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="site" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#3B82F6" name="Enrolled" />
                <Bar dataKey="target" fill="#E5E7EB" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Progress & Monthly Trends */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Study Progress */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Study Progress Overview</h3>
            <div className="space-y-4">
              {studyProgress.map((study, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-bold text-gray-900">{study.study}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{study.phase}</span>
                    </div>
                    <span className="text-sm text-gray-600">{study.completion}% Complete</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Enrollment: {study.enrolled}/{study.target}</span>
                    <span className="text-sm text-gray-600">Primary: {study.primary_endpoint}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(study.enrolled / study.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={geoDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {geoDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Digital Biomarkers & Protocol Deviations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Digital Biomarker Collection */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Digital Biomarker Collection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={biomarkerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="compliance" fill="#10B981" name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Enrollment Trends */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Enrollment Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="enrolled" stroke="#3B82F6" strokeWidth={3} name="Enrolled" />
                <Line type="monotone" dataKey="screened" stroke="#10B981" strokeWidth={3} name="Screened" />
                <Line type="monotone" dataKey="retention" stroke="#8B5CF6" strokeWidth={3} name="Retention %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clinical Trial Insights */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Key Clinical Trial Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Activity className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Digital Innovation</h4>
              <p className="text-sm">Digital biomarker collection achieves 98.5% compliance with excellent data quality across all studies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Site Excellence</h4>
              <p className="text-sm">Mayo Clinic leads with 98.1% retention rate and 97.8% protocol compliance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Clock className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Enrollment Acceleration</h4>
              <p className="text-sm">15.8% increase in enrollment rate with 35-day average time from screening to participation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalTrials;