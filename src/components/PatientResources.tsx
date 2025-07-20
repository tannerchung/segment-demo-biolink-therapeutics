import React from 'react';
import { Heart, Phone, FileText, Users, MapPin, Calendar } from 'lucide-react';

const PatientResources = () => {
  const resources = [
    {
      icon: Phone,
      title: 'Patient Support Hotline',
      description: '24/7 multilingual support for patients and caregivers',
      action: 'Call Now: 1-800-BIOLINK'
    },
    {
      icon: FileText,
      title: 'Educational Materials',
      description: 'Comprehensive guides about rare diseases and treatments',
      action: 'Download Resources'
    },
    {
      icon: Users,
      title: 'Patient Communities',
      description: 'Connect with other patients and families facing similar journeys',
      action: 'Join Community'
    },
    {
      icon: MapPin,
      title: 'Treatment Centers',
      description: 'Find specialized care centers near you',
      action: 'Locate Centers'
    },
    {
      icon: Calendar,
      title: 'Care Coordination',
      description: 'Assistance with appointment scheduling and care planning',
      action: 'Schedule Support'
    },
    {
      icon: Heart,
      title: 'Financial Assistance',
      description: 'Programs to help make treatments accessible and affordable',
      action: 'Learn About Aid'
    }
  ];

  const programs = [
    {
      name: 'BioLink Cares',
      description: 'Comprehensive patient assistance program providing financial support and care coordination.',
      features: ['Co-pay assistance', 'Free drug programs', 'Insurance navigation', 'Nurse support'],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Family Connect',
      description: 'Support network connecting families affected by rare diseases for mutual support and advocacy.',
      features: ['Peer mentorship', 'Family events', 'Educational webinars', 'Advocacy training'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="patients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Patient Resources & Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that comprehensive patient support extends far beyond our therapies. 
            Our dedicated programs ensure patients and families have the resources they need throughout their journey.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-gray-100"
            >
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors duration-300">
                <resource.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{resource.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
              <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200">
                {resource.action} →
              </button>
            </div>
          ))}
        </div>

        {/* Featured Programs */}
        <div className="space-y-12">
          {programs.map((program, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img
                  src={program.image}
                  alt={program.name}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{program.name}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
                  Learn More About {program.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">24/7 Emergency Support</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            If you're experiencing a medical emergency related to your treatment, 
            our dedicated medical team is available around the clock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-800-BIOLINK"
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Emergency Hotline: 1-800-BIOLINK
            </a>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 border border-white/30">
              Medical Information Request
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientResources;