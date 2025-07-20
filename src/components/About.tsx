import React from 'react';
import { Heart, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-First',
      description: 'Every decision we make is guided by our commitment to improving patient outcomes and quality of life.'
    },
    {
      icon: Award,
      title: 'Scientific Excellence',
      description: 'We maintain the highest standards in research, development, and manufacturing of our therapies.'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Our therapies reach patients across continents, ensuring equitable access to life-changing treatments.'
    },
    {
      icon: Users,
      title: 'Collaborative Innovation',
      description: 'We partner with leading researchers, clinicians, and patient advocacy groups to accelerate discovery.'
    }
  ];

  const leadership = [
    {
      name: 'Lisa Thompson',
      title: 'Chief Commercial Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'David Park',
      title: 'VP Patient Engagement',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Dr. Maria Santos',
      title: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About BioLink Therapeutics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 2015, BioLink Therapeutics (NASDAQ: NXUS) is a public biotechnology company 
            dedicated to developing and delivering life-changing therapies for rare disease patients and families.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              "To develop and deliver life-changing therapies for rare disease patients and families, 
              ensuring that no patient is left behind regardless of geography or circumstance."
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="BioLink Therapeutics research team"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Pioneering Rare Disease Innovation
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Since our founding in 2015, BioLink Therapeutics has emerged as a leader in rare disease 
              therapeutics, specializing in cell and gene therapy and enzyme replacement technologies. 
              Our focus on metabolic disorders and genetic diseases has led to breakthrough treatments 
              that are transforming patient lives.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With a market capitalization of $2.8 billion and commercial presence across the US, Europe, 
              and Japan, we are committed to ensuring that geographic location never becomes a barrier 
              to accessing life-changing treatments.
            </p>
            
            <div className="bg-teal-50 p-6 rounded-xl border-l-4 border-teal-500">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-600">2015</div>
                  <div className="text-teal-800 text-sm">Founded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">$2.8B</div>
                  <div className="text-teal-800 text-sm">Market Cap</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h4>
                <p className="text-teal-600 font-medium">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors duration-300">
                <value.icon className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;