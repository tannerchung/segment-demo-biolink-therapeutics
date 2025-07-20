import React, { useEffect } from 'react';
import { ArrowRight, Play, Users, Globe, Heart, Search, FileText } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const Hero = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackEvent('Page Viewed', {
      page_name: 'homepage',
      page_category: 'main',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }
  )

  const handleCTAClick = (action: string, destination: string) => {
    trackEvent('CTA Button Clicked', {
      action: action,
      destination: destination,
      section: 'hero',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(44, 120, 115, 0.8), rgba(44, 120, 115, 0.6)), url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforming Lives Through
            <span className="text-orange-400 block">Rare Disease Innovation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            BioLink Therapeutics develops life-changing therapies for patients with rare diseases. 
            Our innovative treatments bring hope to families facing the most challenging medical conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/find-specialist"
              onClick={() => handleCTAClick('find_specialist', '/find-specialist')}
              className="group bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Search className="mr-2 h-5 w-5" />
              Find a Specialist
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a
              href="/patient-support"
              onClick={() => handleCTAClick('patient_resources', '/patient-support')}
              className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 flex items-center border border-white/30"
            >
              <FileText className="mr-2 h-5 w-5" />
              Patient Resources
            </a>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <a 
              href="/biolink-gtx"
              onClick={() => handleCTAClick('therapy_info', '/biolink-gtx')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">BioLink-GTx</h3>
              <p className="text-gray-200 text-sm">Gene therapy for lysosomal storage disorders</p>
              <div className="mt-4 text-orange-300 font-medium group-hover:text-orange-200 transition-colors">
                Learn More →
              </div>
            </a>

            <a 
              href="/biolink-enz"
              onClick={() => handleCTAClick('therapy_info', '/biolink-enz')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">BioLink-ENZ</h3>
              <p className="text-gray-200 text-sm">Enzyme replacement for metabolic disorders</p>
              <div className="mt-4 text-orange-300 font-medium group-hover:text-orange-200 transition-colors">
                Learn More →
              </div>
            </a>

            <a 
              href="/clinical-trials"
              onClick={() => handleCTAClick('clinical_trials', '/clinical-trials')}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Clinical Trials</h3>
              <p className="text-gray-200 text-sm">Join our research studies</p>
              <div className="mt-4 text-orange-300 font-medium group-hover:text-orange-200 transition-colors">
                Learn More →
              </div>
            </a>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-8 w-8 text-orange-400 mr-3" />
              <div className="text-3xl font-bold text-orange-400">500K+</div>
            </div>
            <div className="text-white font-medium">Patients Treated Worldwide</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <Globe className="h-8 w-8 text-orange-400 mr-3" />
              <div className="text-3xl font-bold text-orange-400">40+</div>
            </div>
            <div className="text-white font-medium">Countries Served</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <Heart className="h-8 w-8 text-orange-400 mr-3" />
              <div className="text-3xl font-bold text-orange-400">9.2/10</div>
            </div>
            <div className="text-white font-medium">Patient Satisfaction</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;