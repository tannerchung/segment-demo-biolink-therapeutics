import React, { useEffect, useState } from 'react';
import { Users, Heart, TrendingUp, Activity, Clock, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const ExecutiveDashboard = () => {
  const { events, trackEvent, simulateLiveEvents, setSimulateLiveEvents } = useAnalytics();
  const [selectedTherapy, setSelectedTherapy] = useState('all');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'executive_dashboard',
      user_type: 'admin'
    });
  }, [trackEvent]);

  // Key Metrics
  const keyMetrics = [
    {
      title: 'Total Patients in Journey',
      value: '12,547',
      change: '+8.2%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Treatment Patients',
      value: '8,934',
      change: '+12.5%',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      title: 'HCP Engagement Score',
      value: '8.7/10',
      change: '+0.3',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Clinical Trial Enrollment',
      value: '1,245',
      change: '+15.8%',
      icon: Activity,
      color: 'bg-orange-500'
    },
    {
      title: 'Patient Satisfaction',
      value: '9.2/10',
      change: '+0.1',
      icon: Target,
      color: 'bg-teal-500'
    },
    {
      title: 'Avg. Time to Treatment',
      value: '42 days',
      change: '-5 days',
      icon: Clock,
      color: 'bg-red-500'
    }
  ];

  // Journey Funnel Data
  const funnelData = [
    { name: 'Anonymous Visitors', value: 45000, fill: '#3B82F6' },
    { name: 'Email Capture', value: 12500, fill: '#10B981' },
    { name: 'Account Created', value: 8900, fill: '#8B5CF6' },
    { name: 'Assessment Complete', value: 6200, fill: '#F59E0B' },
    { name: 'Treatment Approved', value: 4800, fill: '#EF4444' },
    { name: 'First Dose', value: 4200, fill: '#06B6D4' },
    { name: 'Ongoing Care', value: 3900, fill: '#84CC16' }
  ];

  // Therapy Program Performance
  const therapyData = [
    { name: 'BioLink-GTx', patients: 5200, satisfaction: 9.1, completion: 94 },
    { name: 'BioLink-ENZ', patients: 4800, satisfaction: 9.3, completion: 96 }
  ];

  // Monthly Trends
  const monthlyTrends = [
    { month: 'Jan', patients: 8500, hcp_engagement: 8.2, trials: 980 },
    { month: 'Feb', patients: 9200, hcp_engagement: 8.4, trials: 1050 },
    { month: 'Mar', patients: 9800, hcp_engagement: 8.6, trials: 1120 },
    { month: 'Apr', patients: 10500, hcp_engagement: 8.5, trials: 1180 },
    { month: 'May', patients: 11200, hcp_engagement: 8.7, trials: 1220 },
    { month: 'Jun', patients: 12000, hcp_engagement: 8.9, trials: 1245 }
  ];

  // Real-time Activity Feed
  const recentEvents = events.slice(0, 10);

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
              <p className="text-gray-600 mt-2">Unified healthcare customer journey analytics powered by Segment</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTherapy}
                onChange={(e) => setSelectedTherapy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Therapies</option>
                <option value="biolink-gtx">BioLink-GTx</option>
                <option value="biolink-enz">BioLink-ENZ</option>
              </select>
              <button
                onClick={() => setSimulateLiveEvents(!simulateLiveEvents)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  simulateLiveEvents 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {simulateLiveEvents ? 'Stop Demo' : 'Start Live Demo'}
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Journey Funnel */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Journey Funnel</h3>
            <ResponsiveContainer width="100%" height={400}>
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={3} name="Patients" />
                <Line type="monotone" dataKey="hcp_engagement" stroke="#10B981" strokeWidth={3} name="HCP Engagement" />
                <Line type="monotone" dataKey="trials" stroke="#8B5CF6" strokeWidth={3} name="Trial Enrollment" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Therapy Performance & Real-time Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Therapy Program Performance */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Therapy Program Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={therapyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#3B82F6" name="Active Patients" />
                <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction Score" />
                <Bar dataKey="completion" fill="#8B5CF6" name="Completion Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Live Activity</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-600">Real-time</span>
              </div>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    event.user_type === 'patient' ? 'bg-blue-500' :
                    event.user_type === 'hcp' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.event_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.user_type} • {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                    {event.properties.therapy_program && (
                      <p className="text-xs text-teal-600 mt-1">
                        {event.properties.therapy_program}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Segment Value Proposition */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-orange-500 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Powered by Segment's Unified Customer Data Platform</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Every patient interaction, HCP engagement, and clinical trial event unified in real-time. 
              From fragmented healthcare data silos to actionable customer intelligence.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">200+</div>
                <div className="text-sm">Data Sources Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-sm">Data Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">&lt;100ms</div>
                <div className="text-sm">Real-time Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;