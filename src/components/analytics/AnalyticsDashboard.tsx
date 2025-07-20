import React, { useState } from 'react';
import { BarChart3, Users, Stethoscope, FlaskConical, User, TrendingUp } from 'lucide-react';
import ExecutiveDashboard from './ExecutiveDashboard';
import Customer360 from './Customer360';
import PatientAnalytics from './PatientAnalytics';
import HCPAnalytics from './HCPAnalytics';
import ClinicalTrials from './ClinicalTrials';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('executive');

  const tabs = [
    { id: 'executive', label: 'Executive Dashboard', icon: BarChart3, component: ExecutiveDashboard },
    { id: 'customer360', label: 'Customer 360°', icon: User, component: Customer360 },
    { id: 'patients', label: 'Patient Analytics', icon: Users, component: PatientAnalytics },
    { id: 'hcp', label: 'HCP Analytics', icon: Stethoscope, component: HCPAnalytics },
    { id: 'trials', label: 'Clinical Trials', icon: FlaskConical, component: ClinicalTrials }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ExecutiveDashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Analytics Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <ActiveComponent />
    </div>
  );
};

export default AnalyticsDashboard;