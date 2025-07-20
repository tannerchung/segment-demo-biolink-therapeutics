import React, { useEffect, useState } from 'react';
import { Users, BookOpen, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useAnalytics } from '../../context/AnalyticsContext';

const HCPAnalytics = () => {
  const { trackEvent } = useAnalytics();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'hcp_analytics',
      user_type: 'admin'
    });
  }, [trackEvent]);

  // HCP Engagement Metrics
  const engagementMetrics = [
    {
      title: 'Active HCPs',
      value: '2,847',
      change: '+12.3%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Content Views',
      value: '18,542',
      change: '+24.7%',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      title: 'Webinar Attendance',
      value: '1,234',
      change: '+18.9%',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Resource Downloads',
      value: '5,678',
      change: '+31.2%',
      icon: Download,
      color: 'bg-orange-500'
    }
  ];

  // Content Performance Data
  const contentPerformance = [
    { content: 'Clinical Study Results', views: 4200, downloads: 1800, engagement_time: 12.5, specialty: 'Genetics' },
    { content: 'Treatment Guidelines', views: 3800, downloads: 2100, engagement_time: 15.2, specialty: 'Endocrinology' },
    { content: 'Patient Case Studies', views: 3200, downloads: 1400, engagement_time: 8.7, specialty: 'Pediatrics' },
    { content: 'Dosing Information', views: 2900, downloads: 1900, engagement_time: 6.3, specialty: 'Internal Medicine' },
    { content: 'Safety Data', views: 2600, downloads: 1200, engagement_time: 9.8, specialty: 'Neurology' }
  ];

  // HCP Journey Funnel
  const hcpJourney = [
    { stage: 'Information Request', count: 5200, conversion: 100 },
    { stage: 'Content Engagement', count: 4100, conversion: 78.8 },
    { stage: 'Webinar Attendance', count: 2800, conversion: 53.8 },
    { stage: 'Patient Referral', count: 1900, conversion: 36.5 },
    { stage: 'Treatment Prescription', count: 1400, conversion: 26.9 }
  ];

  // Specialty Engagement
  const specialtyData = [
    { specialty: 'Pediatric Genetics', hcps: 680, engagement: 9.2, referrals: 420 },
    { specialty: 'Endocrinology', hcps: 520, engagement: 8.8, referrals: 380 },
    { specialty: 'Internal Medicine', hcps: 480, engagement: 7.9, referrals: 290 },
    { specialty: 'Neurology', hcps: 420, engagement: 8.5, referrals: 310 },
    { specialty: 'Metabolic Medicine', hcps: 380, engagement: 9.0, referrals: 340 },
    { specialty: 'Other', hcps: 367, engagement: 7.2, referrals: 180 }
  ];

  // Monthly Trends
  const monthlyTrends = [
    { month: 'Jan', content_views: 12000, webinars: 180, referrals: 320 },
    { month: 'Feb', content_views: 13500, webinars: 220, referrals: 380 },
    { month: 'Mar', content_views: 15200, webinars: 280, referrals: 420 },
    { month: 'Apr', content_views: 16800, webinars: 310, referrals: 480 },
    { month: 'May', content_views: 17900, webinars: 340, referrals: 520 },
    { month: 'Jun', content_views: 18500, webinars: 380, referrals: 580 }
  ];

  // Educational Content ROI
  const contentROI = [
    { content_type: 'Clinical Data', investment: 45000, referrals: 280, roi: 6.2 },
    { content_type: 'Case Studies', investment: 32000, referrals: 190, roi: 5.9 },
    { content_type: 'Webinars', investment: 28000, referrals: 220, roi: 7.9 },
    { content_type: 'Guidelines', investment: 22000, referrals: 160, roi: 7.3 },
    { content_type: 'Safety Info', investment: 18000, referrals: 120, roi: 6.7 }
  ];

  // Geographic HCP Distribution
  const geoHCPData = [
    { name: 'Northeast', value: 32, color: '#3B82F6' },
    { name: 'Southeast', value: 28, color: '#10B981' },
    { name: 'Midwest', value: 22, color: '#8B5CF6' },
    { name: 'West', value: 18, color: '#F59E0B' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HCP Engagement Analytics</h1>
              <p className="text-gray-600 mt-2">Healthcare professional engagement and educational content performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Specialties</option>
                <option value="genetics">Pediatric Genetics</option>
                <option value="endocrinology">Endocrinology</option>
                <option value="internal">Internal Medicine</option>
                <option value="neurology">Neurology</option>
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

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {engagementMetrics.map((metric, index) => (
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

        {/* Content Performance & HCP Journey */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Educational Content Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Educational Content Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={contentPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="content" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="views" fill="#3B82F6" name="Views" />
                <Bar dataKey="downloads" fill="#10B981" name="Downloads" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* HCP Journey Funnel */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">HCP Engagement Journey</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={hcpJourney}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Specialty Analysis & Monthly Trends */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Specialty Engagement */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Engagement by Medical Specialty</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={specialtyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="specialty" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hcps" fill="#3B82F6" name="Active HCPs" />
                <Bar dataKey="referrals" fill="#10B981" name="Patient Referrals" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">HCP Geographic Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={geoHCPData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {geoHCPData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends & Content ROI */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Engagement Trends */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Engagement Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="content_views" stroke="#3B82F6" strokeWidth={3} name="Content Views" />
                <Line type="monotone" dataKey="webinars" stroke="#10B981" strokeWidth={3} name="Webinar Attendance" />
                <Line type="monotone" dataKey="referrals" stroke="#8B5CF6" strokeWidth={3} name="Patient Referrals" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Educational Content ROI */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Educational Content ROI</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentROI}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="content_type" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="roi" fill="#F59E0B" name="ROI Multiplier" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HCP Engagement Insights */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Key HCP Engagement Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <BookOpen className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Content Effectiveness</h4>
              <p className="text-sm">Clinical study results drive highest engagement (12.5 min avg. time) and referral conversion</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Specialty Focus</h4>
              <p className="text-sm">Pediatric genetics specialists show highest engagement scores (9.2/10) and referral rates</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Calendar className="h-8 w-8 mb-4" />
              <h4 className="font-bold mb-2">Webinar Impact</h4>
              <p className="text-sm">Live webinars generate 7.9x ROI with 68% of attendees making patient referrals within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCPAnalytics;