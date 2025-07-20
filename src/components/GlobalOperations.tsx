import React from 'react';
import { Globe, MapPin, Users, Building, Truck, Shield } from 'lucide-react';

const GlobalOperations = () => {
  const regions = [
    {
      name: 'North America',
      headquarters: 'Boston, MA',
      facilities: '3 Manufacturing, 2 R&D',
      employees: '450+',
      countries: '2'
    },
    {
      name: 'Europe',
      headquarters: 'Zurich, Switzerland',
      facilities: '2 Manufacturing, 1 R&D',
      employees: '280+',
      countries: '8'
    },
    {
      name: 'Asia-Pacific',
      headquarters: 'Singapore',
      facilities: '1 Manufacturing, 1 R&D',
      employees: '150+',
      countries: '5'
    }
  ];

  const capabilities = [
    {
      icon: Building,
      title: 'Manufacturing Excellence',
      description: 'State-of-the-art facilities with advanced automation and quality systems',
      stats: '6 Global Facilities'
    },
    {
      icon: Truck,
      title: 'Supply Chain',
      description: 'Robust global distribution network ensuring reliable product availability',
      stats: '99.8% On-time Delivery'
    },
    {
      icon: Shield,
      title: 'Regulatory Affairs',
      description: 'Expert teams navigating complex regulatory landscapes worldwide',
      stats: '15+ Regulatory Approvals'
    },
    {
      icon: Users,
      title: 'Global Workforce',
      description: 'Diverse team of experts committed to advancing rare disease treatments',
      stats: '880+ Employees'
    }
  ];

  return (
    <section id="operations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our worldwide presence enables us to serve patients across continents while maintaining 
            the highest standards of quality, safety, and regulatory compliance.
          </p>
        </div>

        {/* World Map Visualization */}
        <div className="relative mb-20">
          <div 
            className="h-96 bg-cover bg-center rounded-2xl shadow-lg relative overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(rgba(44, 120, 115, 0.8), rgba(44, 120, 115, 0.6)), url("https://images.unsplash.com/photo-1597149962419-0d900ac2e4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Globe className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-4">Serving Patients Worldwide</h3>
                <p className="text-xl">40+ Countries • 6 Continents • 500,000+ Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Operations */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {regions.map((region, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{region.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Headquarters</div>
                  <div className="font-medium text-gray-900">{region.headquarters}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Facilities</div>
                  <div className="font-medium text-gray-900">{region.facilities}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Employees</div>
                  <div className="font-medium text-gray-900">{region.employees}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Countries Served</div>
                  <div className="font-medium text-gray-900">{region.countries}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <capability.icon className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{capability.description}</p>
              <div className="text-teal-600 font-bold">{capability.stats}</div>
            </div>
          ))}
        </div>

        {/* Quality & Compliance */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Quality & Compliance Excellence
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality extends across every aspect of our operations, 
                from research and development to manufacturing and distribution.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
                  <div className="text-gray-600">Regulatory Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">Zero</div>
                  <div className="text-gray-600">Product Recalls</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">ISO</div>
                  <div className="text-gray-600">Certified Facilities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
                  <div className="text-gray-600">Quality Monitoring</div>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Quality control laboratory"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalOperations;