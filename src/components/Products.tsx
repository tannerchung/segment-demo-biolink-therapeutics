import React from 'react';
import { CheckCircle, Clock, Users, Globe, Dna, Zap } from 'lucide-react';

const Products = () => {
  const products = [
    {
      name: 'BioLink-GTx',
      indication: 'Lysosomal Storage Disorder',
      status: 'Approved',
      type: 'Gene Therapy',
      description: 'Revolutionary gene therapy providing sustained treatment for patients with lysosomal storage disorders, offering hope where traditional treatments have fallen short.',
      patients: '250,000+',
      countries: '25',
      image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: Dna
    },
    {
      name: 'BioLink-ENZ',
      indication: 'Metabolic Disorder',
      status: 'Approved',
      type: 'Enzyme Replacement',
      description: 'Advanced enzyme replacement therapy designed to address the underlying metabolic dysfunction in rare genetic disorders.',
      patients: '250,000+',
      countries: '30',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: Zap
    }
  ];

  const pipeline = [
    {
      phase: 'Clinical Development',
      count: '3',
      description: 'Programs advancing through clinical trials'
    },
    {
      phase: 'IND-Enabling Studies',
      count: '2',
      description: 'Programs preparing for clinical entry'
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Approved Therapies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We have successfully brought two groundbreaking therapies to market, providing hope and 
            improved outcomes for over 500,000 patients with rare diseases worldwide.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {products.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {product.status}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-teal-600">
                    {product.type}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <product.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                    <p className="text-teal-600 font-medium">{product.indication}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Patients Treated</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{product.patients}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Globe className="h-4 w-4 mr-2" />
                      <span className="text-sm">Countries</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{product.countries}</div>
                  </div>
                </div>
                
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
                  Learn More About {product.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Overview */}
        <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Development Pipeline</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our robust pipeline continues to advance with multiple programs targeting unmet medical needs in rare diseases.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pipeline.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">{item.count}</div>
                <div className="text-xl font-bold text-gray-900 mb-2">{item.phase}</div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturing Excellence */}
        <div className="bg-gradient-to-r from-teal-50 to-orange-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Manufacturing Excellence
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art manufacturing facilities in the US, Ireland, and Switzerland ensure 
                the highest quality standards for all our therapies. We maintain full control over the 
                production process to guarantee consistent supply for patients worldwide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  FDA, EMA, and PMDA approved facilities
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  24/7 quality monitoring systems
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Global distribution network
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Advanced cold chain management
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Advanced pharmaceutical laboratory"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;