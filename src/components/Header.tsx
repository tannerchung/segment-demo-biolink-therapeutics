import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Stethoscope, FlaskConical } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if we're on a page with white background
      const path = window.location.pathname;
      const whiteBackgroundPages = [
        '/rare-diseases', '/biolink-gtx', '/biolink-enz', '/find-specialist',
        '/patient-support', '/clinical-trials', '/portal', '/hcp', '/settings',
        '/trials/screening', '/portal/login', '/portal/register', '/portal/assessment',
        '/portal/dashboard', '/hcp/dashboard', '/hcp/portal', '/hcp/education', '/hcp/medical-info'
      ];
      setIsOnWhiteBackground(whiteBackgroundPages.some(page => path.startsWith(page)));
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleScroll);
    };
  }, []);

  const handleNavClick = (section: string, href: string) => {
    trackEvent('Navigation Click', {
      section: section,
      destination: href,
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  };

  const navigation = [
    { 
      name: 'Rare Diseases', 
      href: '/rare-diseases',
      submenu: [
        { name: 'BioLink-GTx', href: '/biolink-gtx' },
        { name: 'BioLink-ENZ', href: '/biolink-enz' },
        { name: 'Disease Information', href: '/rare-diseases' }
      ]
    },
    { name: 'Find a Specialist', href: '/find-specialist' },
    { name: 'Patient Support', href: '/patient-support' },
    { name: 'Clinical Trials', href: '/clinical-trials' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isOnWhiteBackground ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="flex items-center"
              onClick={() => handleNavClick('logo', '/')}
            >
              <img 
                src="/biolink full.webp" 
                alt="BioLink Therapeutics" 
                className="h-32 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  onClick={() => handleNavClick('main_nav', item.href)}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled || isOnWhiteBackground
                      ? 'text-gray-700 hover:text-teal-600' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </a>
                
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          onClick={() => handleNavClick('submenu', subitem.href)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Portal Access Buttons */}
            <div className="flex items-center space-x-3 ml-6 border-l border-gray-300 pl-6">
              <a
                href="/portal"
                onClick={() => handleNavClick('portal_access', '/portal')}
                className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Patient Portal
              </a>
              <a
                href="/hcp"
                onClick={() => handleNavClick('hcp_access', '/hcp')}
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                HCP Portal
              </a>
              <a
                href="/trials/screening"
                onClick={() => handleNavClick('trial_access', '/trials/screening')}
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors duration-200"
              >
                <FlaskConical className="h-4 w-4 mr-2" />
                Clinical Trials
              </a>
              <a
                href="/trials/dashboard"
                onClick={() => handleNavClick('trial_dashboard', '/trials/dashboard')}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Trial Dashboard
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled || isOnWhiteBackground
                  ? 'text-gray-700 hover:text-teal-600' 
                  : 'text-white hover:text-orange-300'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200"
                    onClick={() => {
                      handleNavClick('mobile_nav', item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200"
                          onClick={() => {
                            handleNavClick('mobile_submenu', subitem.href);
                            setIsMenuOpen(false);
                          }}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Portal Access */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a
                  href="/portal"
                  className="flex items-center w-full text-center bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors duration-200"
                  onClick={() => {
                    handleNavClick('mobile_portal', '/portal');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Patient Portal
                </a>
                <a
                  href="/hcp"
                  className="flex items-center w-full text-center bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors duration-200"
                  onClick={() => {
                    handleNavClick('mobile_hcp', '/hcp');
                    setIsMenuOpen(false);
                  }}
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  HCP Portal
                </a>
                <a
                  href="/trials/screening"
                  className="flex items-center w-full text-center bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors duration-200"
                  onClick={() => {
                    handleNavClick('mobile_trials', '/trials/screening');
                    setIsMenuOpen(false);
                  }}
                >
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Clinical Trials
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;