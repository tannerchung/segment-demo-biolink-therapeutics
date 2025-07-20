import React from 'react';
import { Beaker, Clock, TrendingUp, Target } from 'lucide-react';

const Pipeline = () => {
  const pipelineItems = [
    {
      name: 'BioLink-004',
      indication: 'Rare Neurological Disorder',
      phase: 'Phase III',
      description: 'Novel neuroprotective therapy for patients with progressive neurodegeneration.',
      timeline: 'Expected approval 2025',
      patients: 'Estimated 15,000 patients globally'
    },
    {
      name: 'BioLink-005',
      indication: 'Pediatric Genetic Disease',
      phase: 'Phase II',
      description: 'Gene editing approach targeting single-gene mutations in children.',
      timeline: 'Phase III initiation 2024',
      patients: 'Estimated 8,000 patients globally'
    },
    {
      name: 'BioLink-006',
      indication: 'Rare Autoimmune Disease',
      phase: 'Phase I',
      description: 'Immunomodulatory therapy for patients with severe autoimmune manifestations.',
      timeline: 'Phase II initiation 2025',
      patients: 'Estimated 12,000 patients globally'
    },
    {
      name: 'BioLink-007',
      indication: 'Metabolic Enzyme Deficiency',
      phase: 'Preclinical',
      description: 'Next-generation enzyme replacement with enhanced tissue targeting.',
      timeline: 'IND filing 2024',
      patients: 'Estimated 5,000 patients globally'
    }
  ];

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase III': return 'bg-green-100 text-green-800 border-green-200';
      case 'Phase II': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Phase I': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Preclinical': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="pipeline" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Development Pipeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our robust pipeline represents the future of rare disease treatment, with multiple 
            innovative therapies advancing through clinical development.
          </p>
        </div>

        {/* Pipeline Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Beaker className="h-8 w-8 text-teal-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
            <div className="text-gray-600">Programs in Development</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">40K+</div>
            <div className="text-gray-600">Potential Patients</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-gray-600">Late-Stage Programs</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
            <div className="text-gray-600">Expected Approvals 2024-25</div>
          </div>
        </div>

        {/* Pipeline Items */}
        <div className="space-y-6">
          {pipelineItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">{item.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPhaseColor(item.phase)}`}>
                        {item.phase}
                      </span>
                    </div>
                    <p className="text-teal-600 font-medium text-lg mb-3">{item.indication}</p>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <div className="text-gray-900 font-medium">{item.timeline}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Target className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Patient Population</span>
                    </div>
                    <div className="text-gray-900 font-medium">{item.patients}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Partnerships */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Research Partnerships</h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              We collaborate with leading academic institutions, research organizations, and patient advocacy 
              groups to accelerate the development of breakthrough therapies.
            </p>
            <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Explore Partnership Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pipeline;