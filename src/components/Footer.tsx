import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Our Science',
      links: [
        { name: 'BioLink-GTx', href: '#products' },
        { name: 'BioLink-ENZ', href: '#products' },
        { name: 'Development Pipeline', href: '#pipeline' },
        { name: 'Manufacturing', href: '#manufacturing' }
      ]
    },
    {
      title: 'Patients & Caregivers',
      links: [
        { name: 'Patient Resources', href: '#patients' },
        { name: 'Support Programs', href: '#support' },
        { name: 'Financial Assistance', href: '#assistance' },
        { name: 'Clinical Trial Finder', href: '#trials' }
      ]
    },
    {
      title: 'Healthcare Professionals',
      links: [
        { name: 'Medical Information', href: '#medical' },
        { name: 'Clinical Data', href: '#data' },
        { name: 'Prescribing Information', href: '#prescribing' },
        { name: 'Medical Affairs', href: '#affairs' }
      ]
    },
    {
      title: 'Investors',
      links: [
        { name: 'Stock Information', href: '#stock' },
        { name: 'SEC Filings', href: '#filings' },
        { name: 'Financial Reports', href: '#financials' },
        { name: 'Investor Events', href: '#events' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Leadership Team', href: '#leadership' },
        { name: 'Careers', href: '#careers' },
        { name: 'News & Media', href: '#news' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Corporate Headquarters',
      details: ['1 BioLink Plaza', 'Boston, MA 02210', 'United States']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['(857) 555-0456', 'Patient Support: 1-800-BIOLINK']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['medinfo@biolinktherapeutics.com', 'support@biolinktherapeutics.com']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src="/biolink stacked-Photoroom.svg" 
                  alt="BioLink Therapeutics" 
                  className="h-28 w-auto mb-4"
                />
                <p className="text-gray-300 leading-relaxed">
                  Transforming lives through innovative rare disease therapies. 
                  Founded in 2015, we are dedicated to bringing hope to patients and families worldwide.
                </p>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">NASDAQ: NXUS</div>
                <div className="text-lg font-bold text-white">$127.50</div>
                <div className="text-sm text-green-400">+15.2% YTD</div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-teal-600 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-teal-600 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-full hover:bg-teal-600 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 grid md:grid-cols-5 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.href}
                          className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-teal-600 p-3 rounded-full mr-4 flex-shrink-0">
                  <contact.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">{contact.title}</h4>
                  {contact.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-300 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-gray-400 text-sm">
                © 2024 BioLink Therapeutics. All rights reserved. | NASDAQ: NXUS
              </div>
              
              {/* Admin Tools */}
              <div className="flex items-center space-x-4">
                <a
                  href="/settings"
                  className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Settings
                </a>
                <a
                  href="/analytics"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Analytics
                </a>
              </div>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Terms of Use
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;