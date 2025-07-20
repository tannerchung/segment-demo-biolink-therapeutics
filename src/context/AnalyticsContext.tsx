import React, { createContext, useContext, useEffect, useState } from 'react';

// UTM Parameter Tracking
const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
    gclid: urlParams.get('gclid'), // Google Ads click ID
    fbclid: urlParams.get('fbclid'), // Facebook click ID
    referrer: document.referrer
  };
};

// Store UTM parameters in localStorage for attribution
const storeMarketingAttribution = () => {
  const utmParams = getUTMParameters();
  
  // Only store if we have actual UTM parameters
  if (Object.values(utmParams).some(value => value !== null)) {
    const attribution = {
      ...utmParams,
      landing_page: window.location.pathname + window.location.search,
      timestamp: new Date().toISOString(),
      session_id: Math.random().toString(36).substr(2, 9)
    };
    
    localStorage.setItem('marketing_attribution', JSON.stringify(attribution));
    return attribution;
  }
  
  // Return stored attribution if available
  const stored = localStorage.getItem('marketing_attribution');
  return stored ? JSON.parse(stored) : null;
};

// Track page views to prevent duplicates
const viewedPages = new Set<string>();
let lastPageView = '';

interface AnalyticsEvent {
  id: string;
  timestamp: string;
  user_type: 'patient' | 'hcp' | 'admin';
  user_id: string;
  event_name: string;
  properties: Record<string, any>;
}

interface AnalyticsContextType {
  events: AnalyticsEvent[];
  addEvent: (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => void;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  simulateLiveEvents: boolean;
  setSimulateLiveEvents: (simulate: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [simulateLiveEvents, setSimulateLiveEvents] = useState(false);
  const [marketingAttribution, setMarketingAttribution] = useState<any>(null);

  // Initialize marketing attribution on load
  useEffect(() => {
    const attribution = storeMarketingAttribution();
    setMarketingAttribution(attribution);
    
    // Track initial page view with attribution
    if (attribution) {
      trackEvent('Marketing Attribution Captured', {
        ...attribution,
        page_url: window.location.href
      });
    }
  }, []);

  const addEvent = (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 1000)); // Keep last 1000 events
  };

  const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
    // Add marketing attribution to all events
    const enrichedProperties = {
      ...properties,
      ...(marketingAttribution && {
        utm_source: marketingAttribution.utm_source,
        utm_medium: marketingAttribution.utm_medium,
        utm_campaign: marketingAttribution.utm_campaign,
        utm_term: marketingAttribution.utm_term,
        utm_content: marketingAttribution.utm_content,
        marketing_session_id: marketingAttribution.session_id,
        original_landing_page: marketingAttribution.landing_page,
        attribution_timestamp: marketingAttribution.timestamp
      })
    };
    
    // Prevent duplicate page views within 1 second
    if (eventName === 'Page Viewed') {
      const pageKey = `${enrichedProperties.page_name}_${Date.now()}`;
      const currentTime = Date.now();
      
      // If same page viewed within 1 second, skip
      if (lastPageView === enrichedProperties.page_name && 
          currentTime - parseInt(pageKey.split('_').pop() || '0') < 1000) {
        return;
      }
      
      lastPageView = enrichedProperties.page_name;
    }

    // Track with Segment
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName, enrichedProperties);
    }

    // Add to local state for demo
    addEvent({
      user_type: enrichedProperties.user_type || 'admin',
      user_id: enrichedProperties.user_id || 'demo_user',
      event_name: eventName,
      properties: enrichedProperties,
    });
  };

  // Demo event simulation
  useEffect(() => {
    if (!simulateLiveEvents) return;

    const demoEvents = [
      {
        user_type: 'patient' as const,
        user_id: 'patient_sarah_m_hashed',
        event_name: 'Page Viewed',
        properties: {
          page_name: 'biolink-gtx-overview',
          page_category: 'treatment',
          device_type: 'mobile',
          therapy_program: 'BioLink-GTx'
        }
      },
      {
        user_type: 'hcp' as const,
        user_id: 'hcp_dr_johnson',
        event_name: 'Educational Content Viewed',
        properties: {
          content_type: 'clinical_study_results',
          product: 'BioLink-ENZ',
          specialty: 'endocrinology',
          viewing_time_minutes: 18
        }
      },
      {
        user_type: 'patient' as const,
        user_id: 'patient_michael_k_hashed',
        event_name: 'Treatment Dose Administered',
        properties: {
          therapy_program: 'BioLink-ENZ',
          dose_number: 3,
          infusion_center: 'Mayo Clinic',
          tolerance: 'excellent'
        }
      },
      {
        user_type: 'hcp' as const,
        user_id: 'hcp_dr_martinez',
        event_name: 'Specialist Locator Used',
        properties: {
          search_criteria: 'pediatric_genetics',
          location: 'Boston, MA',
          results_shown: 8
        }
      },
      {
        user_type: 'patient' as const,
        user_id: 'patient_emma_l_hashed',
        event_name: 'Patient Reported Outcome Survey Completed',
        properties: {
          survey_type: 'quality_of_life',
          therapy_program: 'BioLink-GTx',
          energy_level: 9,
          mobility_score: 8,
          quality_of_life: 9,
          treatment_satisfaction: 10
        }
      }
    ];

    const interval = setInterval(() => {
      const randomEvent = demoEvents[Math.floor(Math.random() * demoEvents.length)];
      addEvent(randomEvent);
    }, Math.random() * 15000 + 5000); // Random interval between 5-20 seconds

    return () => clearInterval(interval);
  }, [simulateLiveEvents]);

  // Initialize with some sample data
  useEffect(() => {
    const sampleEvents: Omit<AnalyticsEvent, 'id' | 'timestamp'>[] = [
      {
        user_type: 'patient',
        user_id: 'patient_sarah_m_hashed',
        event_name: 'Treatment Approved',
        properties: {
          therapy_program: 'BioLink-GTx',
          approval_date: '2024-07-14',
          infusion_center: 'Mayo Clinic'
        }
      },
      {
        user_type: 'hcp',
        user_id: 'hcp_dr_smith',
        event_name: 'Medical Information Request',
        properties: {
          product: 'BioLink-GTx',
          request_type: 'efficacy_data',
          specialty: 'pediatric_genetics'
        }
      },
      {
        user_type: 'patient',
        user_id: 'patient_john_d_hashed',
        event_name: 'Clinical Trial Consent Completed',
        properties: {
          study_id: 'BL-GTx-301',
          consent_version: '2.1',
          location: 'Boston Medical Center'
        }
      }
    ];

    sampleEvents.forEach(event => addEvent(event));
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      events,
      addEvent,
      trackEvent,
      simulateLiveEvents,
      setSimulateLiveEvents
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};