import React from 'react';
import { Calendar, ArrowRight, Award, Beaker, Users, TrendingUp } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      category: 'Financial Results',
      title: 'BioLink Reports Strong Q3 2024 Financial Results',
      excerpt: 'Revenue increased 28% year-over-year driven by strong commercial performance of BioLink-GTx and BioLink-ENZ across all major markets.',
      date: 'November 8, 2024',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: TrendingUp
    },
    {
      category: 'Regulatory Approval',
      title: 'European Approval Granted for BioLink-GTx in Pediatric Population',
      excerpt: 'EMA approval expands access to our gene therapy for children with lysosomal storage disorders, addressing a critical unmet medical need.',
      date: 'October 25, 2024',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: Award
    },
    {
      category: 'Global Expansion',
      title: 'BioLink Expands Patient Access Program to Latin America',
      excerpt: 'New patient assistance programs launched in Brazil, Mexico, and Argentina to improve access to life-changing therapies.',
      date: 'October 12, 2024',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: Users
    },
    {
      category: 'Manufacturing',
      title: 'Company Announces $50M Investment in Manufacturing Expansion',
      excerpt: 'Investment will double production capacity and support growing global demand for our rare disease therapies.',
      date: 'September 28, 2024',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: Beaker
    }
  ];

  const additionalReleases = [
    {
      title: 'BioLink Therapeutics to Present at Rare Disease Conference 2024',
      date: 'September 15, 2024'
    },
    {
      title: 'New Patient Assistance Program Launched in Asia-Pacific Region',
      date: 'August 30, 2024'
    },
    {
      title: 'BioLink-ENZ Receives Orphan Drug Designation in Japan',
      date: 'August 18, 2024'
    },
    {
      title: 'Company Announces Strategic Partnership with Leading Academic Center',
      date: 'July 25, 2024'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial Results': return 'bg-green-100 text-green-800';
      case 'Regulatory Approval': return 'bg-blue-100 text-blue-800';
      case 'Global Expansion': return 'bg-purple-100 text-purple-800';
      case 'Manufacturing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest News & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed about our latest developments, regulatory approvals, 
            financial results, and company milestones as we continue to transform rare disease treatment.
          </p>
        </div>

        {/* Featured News */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {newsItems.map((item, index) => (
            <article 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                
                <button className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200 group">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Press Releases & Media */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Additional Press Releases */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Press Releases</h3>
            <div className="space-y-4">
              {additionalReleases.map((release, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 group cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                      {release.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">{release.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-4" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
              View All Press Releases
            </button>
          </div>

          {/* Media Resources */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Media Resources</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">Media Kit</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Download our complete media kit including logos, executive photos, and company fact sheet.
                </p>
                <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors duration-200">
                  Download Kit →
                </button>
              </div>
              
              <div className="border-l-4 border-teal-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">Media Contacts</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Connect with our media relations team for interviews, statements, and additional information.
                </p>
                <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200">
                  Contact Media Team →
                </button>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-gray-900 mb-2">Newsletter Signup</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Subscribe to receive our latest news and updates directly in your inbox.
                </p>
                <button className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-200">
                  Subscribe Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;