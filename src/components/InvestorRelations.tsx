import React from 'react';
import { TrendingUp, Calendar, FileText, DollarSign, BarChart3, Users } from 'lucide-react';

const InvestorRelations = () => {
  const financialHighlights = [
    {
      metric: 'Stock Price',
      value: '$127.50',
      change: '+15.2%',
      period: 'YTD'
    },
    {
      metric: 'Market Cap',
      value: '$2.8B',
      change: '+18.5%',
      period: 'YTD'
    },
    {
      metric: 'Revenue',
      value: '$485M',
      change: '+28%',
      period: 'Q3 2024'
    },
    {
      metric: 'R&D Investment',
      value: '$145M',
      change: '+35%',
      period: 'Q3 2024'
    }
  ];

  const upcomingEvents = [
    {
      date: 'Dec 15, 2024',
      event: 'Q4 2024 Earnings Call',
      time: '8:00 AM ET'
    },
    {
      date: 'Jan 22, 2025',
      event: 'Rare Disease Conference',
      time: 'Boston, MA'
    },
    {
      date: 'Feb 18, 2025',
      event: 'Annual Shareholder Meeting',
      time: '10:00 AM ET'
    }
  ];

  const pressReleases = [
    {
      title: 'BioLink Reports Strong Q3 2024 Financial Results',
      date: 'November 8, 2024'
    },
    {
      title: 'European Approval Granted for BioLink-GTx in Pediatric Population',
      date: 'October 25, 2024'
    },
    {
      title: 'BioLink Expands Patient Access Program to Latin America',
      date: 'October 12, 2024'
    },
    {
      title: 'Company Announces $50M Investment in Manufacturing Expansion',
      date: 'September 28, 2024'
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: 'SEC Filings',
      description: 'Access our latest 10-K, 10-Q, and 8-K filings'
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      description: 'Quarterly and annual financial statements'
    },
    {
      icon: Calendar,
      title: 'Investor Events',
      description: 'Upcoming conferences and earnings calls'
    },
    {
      icon: Users,
      title: 'Management Team',
      description: 'Leadership bios and contact information'
    }
  ];

  return (
    <section id="investors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Investor Relations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            BioLink Therapeutics (NASDAQ: NXUS) is committed to delivering sustainable growth and value 
            to our shareholders through innovative rare disease therapies and strategic execution.
          </p>
        </div>

        {/* Financial Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {financialHighlights.map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-teal-50 to-orange-50 p-6 rounded-xl border border-gray-100"
            >
              <div className="text-sm text-gray-600 mb-2">{item.metric}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-medium">{item.change}</span>
                <span className="text-gray-500 text-sm">{item.period}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Stock Performance */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Stock Performance</h3>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span className="font-medium">+15.2% YTD</span>
                </div>
              </div>
              
              {/* Interactive Chart Iframe */}
              <div className="bg-white rounded-lg overflow-hidden shadow-inner">
                <iframe
                  src="https://widget.finnhub.io/widgets/stocks/chart?symbol=JNJ&watermarkColor=%231db954&backgroundColor=%23ffffff&textColor=neutral"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  title="Stock Chart"
                  className="w-full h-96"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$127.50</div>
                  <div className="text-gray-600 text-sm">Current Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$142.80</div>
                  <div className="text-gray-600 text-sm">52-Week High</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$98.15</div>
                  <div className="text-gray-600 text-sm">52-Week Low</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Chart shows Johnson & Johnson (JNJ) as reference for pharmaceutical sector performance
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="text-teal-600 font-medium text-sm mb-2">{event.date}</div>
                  <div className="font-bold text-gray-900 mb-2">{event.event}</div>
                  <div className="text-gray-600 text-sm">{event.time}</div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
              View All Events
            </button>
          </div>
        </div>

        {/* Press Releases & Resources */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Recent Press Releases */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Press Releases</h3>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
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
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200">
              View All Press Releases
            </button>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                  <resource.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{resource.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Thesis */}
        <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Investment Thesis</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-300 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span>Leading position in high-value rare disease markets</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-300 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span>Two commercial products with strong market penetration</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-300 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span>Robust pipeline with multiple late-stage programs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-300 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span>Strong financial position and proven commercial execution</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 border border-white/30">
                <DollarSign className="h-16 w-16 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">$2.8B</div>
                <div className="text-xl">Market Capitalization</div>
                <div className="text-sm mt-2 opacity-90">NASDAQ: NXUS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorRelations;