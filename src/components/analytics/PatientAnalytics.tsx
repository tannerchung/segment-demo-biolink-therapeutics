import React, { useEffect, useState } from 'react';
import { Users, Clock, TrendingUp, Heart, MapPin, Smartphone } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const PatientAnalytics = () => {
  const { trackEvent } = useAnalytics();
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'patient_analytics',
      user_type: 'admin'
    });
  }, [trackEvent]);

  // Journey Timeline Data
  const journeyStages = [
    { stage: 'Discovery', avgDays: 0, patients: 12500, dropoff: 0 },
    { stage: 'Information Gathering', avgDays: 7, patients: 10200, dropoff: 18.4 },
    { stage: 'Assessment Request', avgDays: 14, patients: 8900, dropoff: 12.7 },
    { stage: 'Testing Scheduled', avgDays: 21, patients: 7800, dropoff: 12.4 },
    { stage: 'Results Review', avgDays: 35, patients: 7200, dropoff: 7.7 },
    { stage: 'Treatment Approval', avgDays: 42, patients: 6800, dropoff: 5.6 },
    { stage: 'First Dose', avgDays: 49, patients: 6400, dropoff: 5.9 },
    { stage: 'Ongoing Care', avgDays: 90, patients: 6100, dropoff: 4.7 }
  ];

  // Patient Cohort Analysis
  const cohortData = [
    { month: 'Jan', biolink_gtx: 450, biolink_enz: 380, retention_gtx: 94, retention_enz: 96 },
    { month: 'Feb', biolink_gtx: 520, biolink_enz: 420, retention_gtx: 93, retention_enz: 95 },
    { month: 'Mar', biolink_gtx: 580, biolink_enz: 480, retention_gtx: 95, retention_enz: 97 },
    { month: 'Apr', biolink_gtx: 620, biolink_enz: 510, retention_gtx: 94, retention_enz: 96 },
    { month: 'May', biolink_gtx: 680, biolink_enz: 550, retention_gtx: 96, retention_enz: 98 },
    { month: 'Jun', biolink_gtx: 720, biolink_enz: 580, retention_gtx: 95, retention_enz: 97 }
  ];

  // Patient Reported Outcomes
  const outcomesData = [
    { week: 0, energy: 3.2, mobility: 2.8, quality_of_life: 3.1 },
    { week: 4, energy: 4.1, mobility: 3.5, quality_of_life: 4.0 },
    { week: 8, energy: 5.2, mobility: 4.8, quality_of_life: 5.1 },
    { week: 12, energy: 6.8, mobility: 6.2, quality_of_life: 6.5 },
    { week: 16, energy: 7.9, mobility: 7.5, quality_of_life: 7.8 },
    { week: 20, energy: 8.4, mobility: 8.1, quality_of_life: 8.3 },
    { week: 24, energy: 8.7, mobility: 8.5, quality_of_life: 8.6 }
  ];

  // Geographic Distribution
  const geoData = [
    { region: 'Northeast', patients: 3200, satisfaction: 9.1 },
    { region: 'Southeast', patients: 2800, satisfaction: 9.3 },
    { region: 'Midwest', patients: 2400, satisfaction: 8.9 },
    { region: 'Southwest', patients: 2100, satisfaction: 9.0 },
    { region: 'West', patients: 2000, satisfaction: 9.2 }
  ];

  // Device Usage Patterns
  const deviceData = [
    { name: 'Mobile', value: 65, color: '#3B82F6' },
    { name: 'Desktop', value: 28, color: '#10B981' },
    { name: 'Tablet', value: 7, color: '#8B5CF6' }
  ];

  // Age Demographics
  const ageData = [
    { range: '0-12', count: 2800, therapy_gtx: 1800, therapy_enz: 1000 },
    { range: '13-25', count: 3200, therapy_gtx: 1900, therapy_enz: 1300 },
    { range: '26-40', count: 2900, therapy_gtx: 1600, therapy_enz: 1300 },
    { range: '41-60', count: 2400, therapy_gtx: 1200, therapy_enz: 1200 },
    { range: '60+', count: 1200, therapy_gtx: 600, therapy_enz: 600 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Journey Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive patient journey mapping and outcomes tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Patients</option>
                <option value="biolink-gtx">BioLink-GTx</option>
                <option value="biolink-enz">BioLink-ENZ</option>
                <option value="pediatric">Pediatric</option>
                <option value="adult">Adult</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Journey Stage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-sm text-green-600 font-medium">+8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">12,547</h3>
            <p className="text-gray-600">Total Patients</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-orange-500" />
              <span className="text-sm text-green-600 font-medium">-5 days</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">42 days</h3>
            <p className="text-gray-600">Avg. Time to Treatment</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+2.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">94.2%</h3>
            <p className="text-gray-600">Journey Completion</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-sm text-green-600 font-medium">+0.3</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">9.2/10</h3>
            <p className="text-gray-600">Patient Satisfaction</p>
          </div>
        </div>

        {/* Journey Timeline & Cohort Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Journey Map */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Journey Timeline</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={journeyStages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="patients" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>Average journey completion time: 90 days</p>
              <p>Highest drop-off: Information Gathering (18.4%)</p>
            </div>
          </div>

          {/* Cohort Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Therapy Program Cohorts</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="biolink_gtx" stroke="#3B82F6" strokeWidth={3} name="BioLink-GTx" />
                <Line type="monotone" dataKey="biolink_enz" stroke="#10B981" strokeWidth={3} name="BioLink-ENZ" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Outcomes & Demographics */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Patient Reported Outcomes */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Patient Reported Outcomes Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={outcomesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={3} name="Energy Level" />
                <Line type="monotone" dataKey="mobility" stroke="#3B82F6" strokeWidth={3} name="Mobility Score" />
                <Line type="monotone" dataKey="quality_of_life" stroke="#10B981" strokeWidth={3} name="Quality of Life" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Device Usage */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Device Usage Patterns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic & Age Demographics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Geographic Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#3B82F6" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Age Demographics */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Age Demographics by Therapy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="therapy_gtx" stackId="a" fill="#3B82F6" name="BioLink-GTx" />
                <Bar dataKey="therapy_enz" stackId="a" fill="#10B981" name="BioLink-ENZ" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Segmentation Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Key Patient Journey Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Geographic Optimization</h4>
              <p className="text-sm">Southeast region shows highest satisfaction (9.3/10) with fastest treatment access</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Smartphone className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Mobile-First Experience</h4>
              <p className="text-sm">65% of patients use mobile devices, requiring optimized mobile journey design</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Outcome Improvements</h4>
              <p className="text-sm">Quality of life scores improve 175% within 24 weeks of treatment initiation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAnalytics;