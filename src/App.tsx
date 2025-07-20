import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Pipeline from './components/Pipeline';
import GlobalOperations from './components/GlobalOperations';
import PatientResources from './components/PatientResources';
import InvestorRelations from './components/InvestorRelations';
import News from './components/News';
import Footer from './components/Footer';

// New customer-facing pages
import DiseaseInfo from './components/customer/DiseaseInfo';
import SpecialistLocator from './components/customer/SpecialistLocator';
import PatientSupport from './components/customer/PatientSupport';
import ClinicalTrials from './components/customer/ClinicalTrials';
import HCPPortal from './components/customer/HCPPortal';
import HCPLogin from './components/customer/HCPLogin';
import HCPDashboard from './components/customer/HCPDashboard';
import PatientPortal from './components/customer/PatientPortal';
import Login from './components/customer/Login';
import Register from './components/customer/Register';
import Assessment from './components/customer/Assessment';
import PatientDashboard from './components/customer/PatientDashboard';
import HCPEducation from './components/customer/HCPEducation';
import MedicalInfo from './components/customer/MedicalInfo';
import TrialScreening from './components/customer/TrialScreening';
import TrialDashboard from './components/customer/TrialDashboard';

import { AnalyticsProvider } from './context/AnalyticsContext';
import Settings from './components/Settings';
import UserProfileTab from './components/UserProfileTab';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import { useState } from 'react';

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(() => {
    const saved = localStorage.getItem('profileTabOpen');
    return saved === 'true';
  });

  return (
    <AnalyticsProvider>
      <Router>
        <div className={`min-h-screen bg-white transition-all duration-300 ${
          isProfileOpen ? 'ml-80' : 'ml-0'
        }`}>
          <Header />
          <UserProfileTab isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
          <div className="transition-all duration-300">
          <Routes>
            {/* Main website pages */}
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Products />
                <Pipeline />
                <GlobalOperations />
                <PatientResources />
                <InvestorRelations />
                <News />
              </>
            } />
            
            {/* Customer-facing pages */}
            <Route path="/rare-diseases" element={<DiseaseInfo />} />
            <Route path="/biolink-gtx" element={<DiseaseInfo therapy="gtx" />} />
            <Route path="/biolink-enz" element={<DiseaseInfo therapy="enz" />} />
            <Route path="/find-specialist" element={<SpecialistLocator />} />
            <Route path="/patient-support" element={<PatientSupport />} />
            <Route path="/clinical-trials" element={<ClinicalTrials />} />
            
            {/* Patient Portal */}
            <Route path="/portal" element={<PatientPortal />} />
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<Register />} />
            <Route path="/portal/assessment" element={<Assessment />} />
            <Route path="/portal/dashboard" element={<PatientDashboard />} />
            
            {/* HCP Portal */}
            <Route path="/hcp" element={<HCPLogin />} />
            <Route path="/hcp/dashboard" element={<HCPDashboard />} />
            <Route path="/hcp/portal" element={<HCPPortal />} />
            <Route path="/hcp/education" element={<HCPEducation />} />
            <Route path="/hcp/medical-info" element={<MedicalInfo />} />
            
            {/* Clinical Trials */}
            <Route path="/trials/screening" element={<TrialScreening />} />
            <Route path="/trials/dashboard" element={<TrialDashboard />} />
            
            {/* Admin Settings */}
            <Route path="/settings" element={<Settings />} />
            
            {/* Analytics Dashboards */}
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AnalyticsProvider>
  );
}

export default App;