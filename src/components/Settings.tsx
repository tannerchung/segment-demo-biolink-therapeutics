import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Play, Pause, Users, Activity, BarChart3, Zap, User, Stethoscope } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const Settings = () => {
  const { trackEvent } = useAnalytics();
  const [mockEventsEnabled, setMockEventsEnabled] = useState(false);
  const [eventFrequency, setEventFrequency] = useState(5); // seconds
  const [activeUsers, setActiveUsers] = useState(0);
  const [eventsGenerated, setEventsGenerated] = useState(0);
  const [isGeneratingMockUsers, setIsGeneratingMockUsers] = useState(false);

  useEffect(() => {
    trackEvent('Page Viewed', {
      page_name: 'admin_settings',
      page_category: 'admin',
      device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }, []);

  useEffect(() => {
    if (!mockEventsEnabled) return;

    const interval = setInterval(() => {
      generateMockEvent();
      setEventsGenerated(prev => prev + 1);
    }, eventFrequency * 1000);

    return () => clearInterval(interval);
  }, [mockEventsEnabled, eventFrequency]);

  const generateMockEvent = () => {
    const mockEvents = [
      // Audience 1: "Patients Requiring Genetic Testing" - Sarah Must Qualify
      {
        eventName: 'Genetic Testing Requirements Completed',
        userId: 'patient_sarah_m_hashed',
        userType: 'patient',
        properties: {
          assessment_score: 89, // >= 85 requirement ✅
          testing_type: 'comprehensive_genetic_panel',
          lab_provider: 'LabCorp',
          therapy_program: 'BioLink-GTx',
          completion_status: 'completed',
          device_type: 'desktop',
          user_id: 'patient_sarah_m_hashed'
        },
        identify: {
          name: 'Sarah M.',
          age_range: '30-35',
          condition: 'rare_metabolic_disorder',
          therapy_program: 'BioLink-GTx',
          assessment_score: 89,
          insurance_status: 'verified', // ✅
          clinical_readiness_score: 75, // >= 60 requirement ✅
          geographic_region: 'northeast', // not international ✅
          location: 'Boston, MA'
        }
      },
      {
        eventName: 'Treatment Eligibility Assessment Started',
        userId: 'patient_sarah_m_hashed',
        userType: 'patient',
        properties: {
          step: 'genetic_testing_phase', // ✅
          assessment_score: 89,
          therapy_program: 'BioLink-GTx',
          device_type: 'desktop',
          user_id: 'patient_sarah_m_hashed'
        },
        identify: {
          name: 'Sarah M.',
          assessment_score: 89,
          clinical_readiness_score: 75,
          insurance_status: 'verified'
        }
      },
      
      // Audience 2: "HCPs Engaged with BioLink-GTx Content" - Dr. Martinez Must Qualify
      {
        eventName: 'Educational Content Viewed',
        userId: 'hcp_dr_martinez_hashed',
        userType: 'hcp',
        properties: {
          content_category: 'BioLink-GTx', // ✅
          content_title: 'BioLink-GTx Clinical Data Deep Dive',
          time_spent_minutes: 12,
          engagement_level: 'high',
          specialty: 'endocrinology', // qualifying specialty ✅
          device_type: 'desktop',
          user_id: 'hcp_dr_martinez_hashed'
        },
        identify: {
          name: 'Dr. Carlos Martinez',
          specialty: 'endocrinology', // ✅
          institution: 'Johns Hopkins Hospital',
          location: 'Baltimore, MD',
          hcp_engagement_score: 85, // >= 70 ✅
          monthly_rare_disease_patients: 8, // >= 5 ✅
          institution_type: 'academic_medical_center', // not research_only ✅
          patient_referrals: 0 // NO referrals - critical for demo ✅
        }
      },
      {
        eventName: 'HCP Portal Login',
        userId: 'hcp_dr_martinez_hashed',
        userType: 'hcp',
        properties: {
          login_duration: 8, // >= 5 minutes ✅
          session_quality: 'engaged',
          therapy_program: 'BioLink-GTx',
          device_type: 'desktop',
          user_id: 'hcp_dr_martinez_hashed'
        },
        identify: {
          name: 'Dr. Carlos Martinez',
          hcp_engagement_score: 85,
          last_portal_login: new Date().toISOString()
        }
      },
      
      // Audience 3: "Trial Participants with High Compliance" - M789 Must Qualify
      {
        eventName: 'Clinical Trial Consent Completed',
        userId: 'trial_participant_m789_hashed',
        userType: 'trial_participant',
        properties: {
          trial_id: 'BL-GTx-301', // ✅
          consent_version: '2.1',
          location: 'boston_medical', // high-performing site ✅
          device_type: 'desktop',
          user_id: 'trial_participant_m789_hashed'
        },
        identify: {
          name: 'M789',
          trial_id: 'BL-GTx-301',
          trial_compliance_score: 92, // >= 90 ✅
          biomarker_quality_score: 88, // >= 85 ✅
          caregiver_involved: true, // ✅
          portal_engagement_level: 'high', // ✅
          trial_site: 'boston_medical'
        }
      },
      {
        eventName: 'Patient Reported Outcome Survey Completed',
        userId: 'trial_participant_m789_hashed',
        userType: 'trial_participant',
        properties: {
          survey_type: 'monthly_compliance',
          completion_time: 15, // <= 20 minutes ✅
          trial_id: 'BL-GTx-301',
          medication_adherence: 97,
          quality_of_life_score: 9,
          device_type: 'tablet',
          user_id: 'trial_participant_m789_hashed'
        },
        identify: {
          name: 'M789',
          trial_compliance_score: 92,
          biomarker_quality_score: 88
        }
      },
      {
        eventName: 'Treatment Dose Administered',
        userId: 'trial_participant_m789_hashed',
        userType: 'trial_participant',
        properties: {
          trial_id: 'BL-GTx-301',
          adherence_rate: 97, // >= 95% ✅
          dose_number: 24,
          administration_site: 'boston_medical',
          device_type: 'clinical_system',
          user_id: 'trial_participant_m789_hashed'
        },
        identify: {
          name: 'M789',
          adherence_rate: 97,
          trial_compliance_score: 92
        }
      },
      
      // Additional Demo Users
      {
        eventName: 'Digital Biomarker Collection',
        userId: 'trial_participant_m789_hashed',
        userType: 'trial_participant',
        properties: {
          trial_id: 'BL-GTx-301',
          biomarker_type: 'heart_rate_variability',
          data_quality_flag: false, // high quality ✅
          collection_frequency: 'daily',
          device_type: 'wearable',
          user_id: 'trial_participant_m789_hashed'
        },
        identify: {
          name: 'M789',
          biomarker_quality_score: 88
        }
      },
      {
        eventName: 'Patient Portal Login',
        userId: 'patient_12345_hashed',
        userType: 'patient',
        properties: {
          therapy_program: 'BioLink-GTx',
          login_duration: 12,
          device_type: 'desktop',
          user_id: 'patient_12345_hashed'
        },
        identify: {
          name: 'Patient 12345',
          therapy_program: 'BioLink-GTx',
          care_coordinator: 'nurse_jane_smith',
          consent_status: 'active'
        }
      },
      {
        eventName: 'Treatment Dose Recorded',
        userId: 'patient_12345_hashed',
        userType: 'patient',
        properties: {
          therapy_program: 'BioLink-GTx',
          dose_number: 8,
          patient_reported_outcome: 'excellent',
          care_coordinator: 'nurse_jane_smith',
          device_type: 'desktop',
          user_id: 'patient_12345_hashed'
        },
        identify: {
          name: 'Patient 12345',
          care_coordinator: 'nurse_jane_smith'
        }
      },
      {
        eventName: 'Patient Support Call Completed',
        userId: 'patient_12345_hashed',
        userType: 'patient',
        properties: {
          call_type: 'routine_check_in',
          care_coordinator: 'nurse_jane_smith',
          call_duration_minutes: 15,
          patient_satisfaction: 10,
          device_type: 'phone',
          user_id: 'patient_12345_hashed'
        },
        identify: {
          name: 'Patient 12345',
          care_coordinator: 'nurse_jane_smith',
          last_support_call: new Date().toISOString()
        }
      },
      
      // Anonymous to Identified Journey - Sarah
      {
        eventName: 'Disease Information Page Viewed',
        userId: 'visitor_001',
        userType: 'anonymous',
        properties: {
          disease_focus: 'lysosomal_storage_disorders',
          page_time_seconds: 180,
          device_type: 'mobile',
          user_id: 'visitor_001'
        },
        identify: {
          visitor_type: 'anonymous',
          session_start: new Date().toISOString()
        }
      },
      {
        eventName: 'Specialist Locator Used',
        userId: 'visitor_001',
        userType: 'anonymous',
        properties: {
          zip_code_searched: '02114',
          specialty_filter: 'pediatric_genetics',
          results_shown: 5,
          device_type: 'mobile',
          user_id: 'visitor_001'
        },
        identify: {
          location_interest: 'boston_area',
          specialty_interest: 'pediatric_genetics'
        }
      },
      {
        eventName: 'Email Capture Form Submitted',
        userId: 'visitor_001',
        userType: 'anonymous',
        properties: {
          form_type: 'disease_info_request',
          email_domain: 'gmail.com',
          device_type: 'mobile',
          user_id: 'visitor_001'
        },
        identify: {
          email: 'sarah.m@gmail.com',
          source: 'disease_info_email_capture',
          conversion_point: 'specialist_locator'
        }
      }
    ];

    const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
    
    // Track the event
    if (typeof window !== 'undefined' && (window as any).analytics) {
      // Identify the user first
      (window as any).analytics.identify(randomEvent.userId, randomEvent.identify);
      
      // Then track the event
      (window as any).analytics.track(randomEvent.eventName, randomEvent.properties);
    }

    // Update active users count (simulate 20-50 active users)
    setActiveUsers(Math.floor(Math.random() * 30) + 20);
  };

  const generateManualEvent = (profileType: string) => {
    let eventData;
    
    switch (profileType) {
      case 'sarah_genetic_testing':
        // Generate Sarah's comprehensive multi-system healthcare journey
        const sarahComprehensiveJourney = [
          // 1. Website & Marketing Systems (30 days ago)
          {
            eventName: 'Page Viewed',
            userId: 'anonymous_visitor_sarah_001',
            userType: 'anonymous',
            timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            properties: {
              page_name: 'rare_disease_information',
              page_category: 'education',
              utm_source: 'google',
              utm_medium: 'organic',
              utm_campaign: 'rare_disease_awareness',
              device_type: 'mobile',
              system: 'google_analytics',
              session_duration: 180,
              user_id: 'anonymous_visitor_sarah_001'
            },
            identify: {
              anonymous_id: 'anonymous_visitor_sarah_001',
              first_visit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              traffic_source: 'organic_search',
              initial_interest: 'rare_disease_education'
            }
          },
          // 2. Marketing Automation (28 days ago)
          {
            eventName: 'Email Capture Form Submitted',
            userId: 'anonymous_visitor_sarah_001',
            userType: 'anonymous',
            timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
            properties: {
              form_type: 'newsletter_signup',
              email_domain: 'gmail.com',
              lead_source: 'website_content',
              system: 'hubspot',
              device_type: 'mobile',
              user_id: 'anonymous_visitor_sarah_001'
            },
            identify: {
              email: 'sarah.m@gmail.com',
              lead_status: 'new',
              marketing_qualified: false,
              hubspot_contact_id: 'hs_12345',
              email_consent: true,
              lead_score: 25
            }
          },
          // 3. Marketing Nurture (25 days ago)
          {
            eventName: 'Email Opened',
            userId: 'lead_sarah_m_001',
            userType: 'lead',
            timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
            properties: {
              email_campaign: 'rare_disease_education_series',
              email_subject: 'Understanding Genetic Testing for Rare Diseases',
              system: 'hubspot',
              device_type: 'mobile',
              user_id: 'lead_sarah_m_001'
            },
            identify: {
              email: 'sarah.m@gmail.com',
              lead_score: 45,
              email_engagement: 'high',
              last_email_opened: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 3.5. Email Click-through (23 days ago)
          {
            eventName: 'Email Link Clicked',
            userId: 'lead_sarah_m_001',
            userType: 'lead',
            timestamp: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
            properties: {
              email_campaign: 'rare_disease_education_series',
              link_url: '/rare-diseases/biolink-gtx',
              click_position: 'main_cta',
              system: 'hubspot',
              device_type: 'mobile',
              user_id: 'lead_sarah_m_001'
            },
            identify: {
              email_engagement: 'very_high',
              lead_score: 65,
              content_interest: 'biolink_gtx',
              last_email_click: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 4. Patient Portal Registration (21 days ago)
          {
            eventName: 'Account Created',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
            properties: {
              registration_source: 'email_campaign',
              account_type: 'patient_portal',
              system: 'patient_portal',
              device_type: 'desktop',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              name: 'Sarah M.',
              email: 'sarah.m@gmail.com',
              age_range: '30-35',
              condition: 'rare_metabolic_disorder',
              registration_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
              portal_status: 'active',
              marketing_qualified: true,
              lead_score: 75
            }
          },
          // 4.5. Welcome SMS (20 days ago)
          {
            eventName: 'SMS Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            properties: {
              sms_type: 'welcome_message',
              message_content: 'Welcome to BioLink Patient Portal! Your assessment is ready.',
              phone_number: '+1617555****',
              delivery_status: 'delivered',
              system: 'twilio_sms',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              phone_number: '+16175550123',
              sms_consent: true,
              preferred_communication: 'sms_and_email',
              welcome_sms_sent: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 4.7. SMS Clicked (19 days ago)
          {
            eventName: 'SMS Link Clicked',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
            properties: {
              sms_campaign: 'welcome_series',
              link_url: '/portal/assessment',
              click_timestamp: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
              system: 'twilio_sms',
              device_type: 'mobile',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              sms_engagement: 'high',
              last_sms_click: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 5. Eligibility Assessment System (18 days ago)
          {
            eventName: 'Patient Assessment Completed',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
            properties: {
              assessment_type: 'eligibility_assessment',
              assessment_score: 89,
              therapy_program: 'BioLink-GTx',
              completion_time_minutes: 18,
              clinical_readiness_score: 75,
              system: 'eligibility_assessment_system',
              device_type: 'desktop',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              name: 'Sarah M.',
              therapy_program: 'BioLink-GTx',
              assessment_score: 89,
              clinical_readiness_score: 75,
              geographic_region: 'northeast',
              assessment_completed: true,
              last_assessment: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
              sales_qualified: true
            }
          },
          // 5.5. Assessment Completion Email (17 days ago)
          {
            eventName: 'Email Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'assessment_completion',
              email_subject: 'Your BioLink Assessment Results - Next Steps',
              email_template: 'assessment_results_template',
              system: 'sendgrid',
              delivery_status: 'delivered',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              last_email_sent: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
              email_sequence_stage: 'assessment_follow_up'
            }
          },
          // 5.7. Assessment Email Opened (16 days ago)
          {
            eventName: 'Email Opened',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'assessment_completion',
              open_time: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
              device_type: 'mobile',
              system: 'sendgrid',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              last_email_opened: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
              email_engagement_score: 8.5
            }
          },
          // 6. Care Coordinator Platform (15 days ago)
          {
            eventName: 'Patient Support Contact',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            properties: {
              contact_type: 'care_coordinator_call',
              care_coordinator: 'Jennifer Martinez',
              call_duration_minutes: 25,
              call_outcome: 'genetic_testing_scheduled',
              therapy_program: 'BioLink-GTx',
              system: 'care_coordination_platform',
              device_type: 'phone',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              care_coordinator: 'Jennifer Martinez',
              care_coordinator_assigned_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
              support_tier: 'premium',
              care_plan_status: 'active',
              next_genetic_testing: 'scheduled'
            }
          },
          // 6.5. Care Coordinator Follow-up SMS (14 days ago)
          {
            eventName: 'SMS Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            properties: {
              sms_type: 'care_coordinator_follow_up',
              message_content: 'Hi Sarah! Jennifer here. Your genetic testing is scheduled for next week. Any questions?',
              sender: 'Jennifer Martinez',
              delivery_status: 'delivered',
              system: 'care_coordination_sms',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              last_care_coordinator_sms: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              care_coordinator_communication_preference: 'sms'
            }
          },
          // 6.7. Patient SMS Reply (13 days ago)
          {
            eventName: 'SMS Received',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
            properties: {
              sms_type: 'patient_reply',
              message_content: 'Thanks Jennifer! I\'m ready. Should I fast before the test?',
              recipient: 'Jennifer Martinez',
              system: 'care_coordination_sms',
              sentiment: 'positive',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              patient_engagement_level: 'high',
              last_patient_sms: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
              communication_responsiveness: 'excellent'
            }
          },
          // 7. Insurance Verification System (12 days ago)
          {
            eventName: 'Insurance Status Updated',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
            properties: {
              insurance_status: 'verified',
              coverage_percentage: 85,
              prior_authorization_status: 'approved',
              therapy_program: 'BioLink-GTx',
              verification_method: 'automated_benefits_check',
              system: 'insurance_verification_system',
              device_type: 'system',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              insurance_status: 'verified',
              insurance_provider: 'Blue Cross Blue Shield',
              coverage_percentage: 85,
              prior_authorization_approved: true,
              financial_assistance_eligible: false,
              insurance_verified_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 7.5. Insurance Approval Email (11 days ago)
          {
            eventName: 'Email Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'insurance_approval',
              email_subject: 'Great News! Your Insurance Coverage is Approved',
              coverage_details: '85% coverage confirmed',
              system: 'insurance_notification_system',
              delivery_status: 'delivered',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              insurance_notification_sent: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
              financial_clarity: 'complete'
            }
          },
          // 7.7. Insurance Email Opened (10 days ago)
          {
            eventName: 'Email Opened',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'insurance_approval',
              open_time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              device_type: 'mobile',
              system: 'insurance_notification_system',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              insurance_email_engagement: 'high',
              financial_confidence: 'high'
            }
          },
          // 7.9. Genetic Testing Reminder Call (9 days ago)
          {
            eventName: 'Phone Call Completed',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
            properties: {
              call_type: 'genetic_testing_reminder',
              caller: 'LabCorp Scheduling',
              call_duration_minutes: 8,
              call_outcome: 'appointment_confirmed',
              appointment_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
              system: 'labcorp_scheduling_system',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              genetic_testing_appointment_confirmed: true,
              last_scheduling_call: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
              lab_provider: 'LabCorp'
            }
          },
          // 8. Genetic Testing Requirements System (8 days ago)
          {
            eventName: 'Genetic Testing Requirements Completed',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
            properties: {
              testing_type: 'comprehensive_genetic_panel',
              lab_provider: 'LabCorp',
              test_status: 'sample_collected',
              therapy_program: 'BioLink-GTx',
              system: 'genetic_testing_system',
              device_type: 'clinical_system',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              genetic_testing_status: 'completed',
              lab_provider: 'LabCorp',
              test_collection_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
              results_expected: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 8.5. Testing Completion SMS (7 days ago)
          {
            eventName: 'SMS Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            properties: {
              sms_type: 'testing_completion_confirmation',
              message_content: 'Your genetic testing sample has been received. Results in 5-7 business days.',
              sender: 'LabCorp Notifications',
              delivery_status: 'delivered',
              system: 'labcorp_sms',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              testing_confirmation_received: true,
              last_lab_sms: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 8.7. Results Ready Phone Call (6 days ago)
          {
            eventName: 'Phone Call Completed',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            properties: {
              call_type: 'genetic_results_notification',
              caller: 'Jennifer Martinez',
              call_duration_minutes: 15,
              call_outcome: 'results_discussion_scheduled',
              results_status: 'positive_for_therapy',
              system: 'care_coordination_phone',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              genetic_results_status: 'therapy_eligible',
              results_notification_call: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
              next_step: 'results_discussion'
            }
          },
          // 9. Patient Support Call System (5 days ago)
          {
            eventName: 'Patient Support Call Completed',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            properties: {
              call_type: 'genetic_testing_follow_up',
              care_coordinator: 'Jennifer Martinez',
              call_duration_minutes: 15,
              patient_satisfaction: 9,
              call_outcome: 'results_discussion_scheduled',
              system: 'patient_support_system',
              device_type: 'phone',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              last_support_call: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              support_satisfaction: 9,
              next_appointment_type: 'results_discussion'
            }
          },
          // 9.5. Appointment Confirmation Email (4 days ago)
          {
            eventName: 'Email Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'appointment_confirmation',
              email_subject: 'Appointment Confirmed: Results Discussion with Dr. Martinez',
              appointment_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              system: 'appointment_scheduling_system',
              delivery_status: 'delivered',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              appointment_confirmed: true,
              last_appointment_email: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 9.7. Appointment Reminder SMS (3 days ago)
          {
            eventName: 'SMS Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            properties: {
              sms_type: 'appointment_reminder',
              message_content: 'Reminder: Results discussion tomorrow at 2 PM with Dr. Martinez. Reply CONFIRM to confirm.',
              delivery_status: 'delivered',
              system: 'appointment_reminder_sms',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              appointment_reminder_sent: true,
              last_reminder_sms: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 9.9. Patient SMS Confirmation (3 days ago - 2 hours later)
          {
            eventName: 'SMS Received',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            properties: {
              sms_type: 'appointment_confirmation_reply',
              message_content: 'CONFIRM',
              system: 'appointment_reminder_sms',
              response_time_minutes: 120,
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              appointment_confirmed_by_patient: true,
              patient_responsiveness: 'excellent',
              last_patient_confirmation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString()
            }
          },
          // 10. Medical Affairs System (2 days ago) - Dr. Martinez reviewing Sarah's case
          {
            eventName: 'Patient Case Review',
            userId: 'hcp_dr_martinez_hashed',
            userType: 'hcp',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            properties: {
              patient_id: 'patient_sarah_m_hashed',
              review_type: 'genetic_testing_results',
              therapy_recommendation: 'BioLink-GTx',
              specialist_consultation: 'recommended',
              system: 'medical_affairs_system',
              device_type: 'desktop',
              user_id: 'hcp_dr_martinez_hashed'
            },
            identify: {
              name: 'Dr. Carlos Martinez',
              specialty: 'endocrinology',
              patients_reviewed: 8,
              last_case_review: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 10.5. Treatment Plan Email (1 day ago)
          {
            eventName: 'Email Sent',
            userId: 'patient_sarah_m_hashed',
            userType: 'patient',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            properties: {
              email_type: 'treatment_plan',
              email_subject: 'Your Personalized BioLink-GTx Treatment Plan',
              treatment_recommendation: 'BioLink-GTx approved',
              next_steps: 'treatment_initiation',
              system: 'treatment_planning_system',
              delivery_status: 'delivered',
              user_id: 'patient_sarah_m_hashed'
            },
            identify: {
              treatment_plan_sent: true,
              treatment_status: 'approved',
              therapy_program: 'BioLink-GTx',
              last_treatment_email: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          // 11. Clinical Trial System (Today) - M789 data for continuity
          {
            eventName: 'Clinical Data Reference',
            userId: 'trial_participant_m789_hashed',
            userType: 'trial_participant',
            timestamp: new Date(),
            properties: {
              reference_type: 'similar_case_study',
              referenced_patient: 'patient_sarah_m_hashed',
              trial_id: 'BL-GTx-301',
              data_point: 'genetic_testing_correlation',
              system: 'clinical_trial_system',
              device_type: 'clinical_system',
              user_id: 'trial_participant_m789_hashed'
            },
            identify: {
              name: 'M789',
              trial_id: 'BL-GTx-301',
              similar_cases_referenced: 3,
              data_contribution_score: 92
            }
          }
        ];
        
        // Execute events in sequence with realistic delays to show journey accumulation
        sarahComprehensiveJourney.forEach((event, index) => {
          setTimeout(() => {
            if (typeof window !== 'undefined' && (window as any).analytics) {
              // Identify the user first
              (window as any).analytics.identify(event.userId, event.identify);
              
              // Then track the event
              (window as any).analytics.track(event.eventName, event.properties);
            }
            
            // Update statistics for each event
            setEventsGenerated(prev => prev + 1);
          }, index * 1500); // 1.5 second delay between events for demo flow
        });
        
        return; // Exit early since we're handling multiple events
        break;
        
      case 'martinez_engagement':
        eventData = {
          eventName: 'Educational Content Viewed',
          userId: 'hcp_dr_martinez_hashed',
          userType: 'hcp',
          properties: {
            content_category: 'BioLink-GTx',
            content_title: 'BioLink-GTx Endocrinology Applications',
            product: 'BioLink-GTx',
            time_spent_minutes: 18,
            specialty: 'endocrinology',
            engagement_level: 'high',
            device_type: 'desktop',
            user_id: 'hcp_dr_martinez_hashed'
          },
          identify: {
            name: 'Dr. Carlos Martinez',
            specialty: 'endocrinology',
            institution: 'Johns Hopkins Hospital',
            location: 'Baltimore, MD',
            hcp_engagement_score: 85,
            monthly_rare_disease_patients: 8,
            patient_referrals: 0
          }
        };
        break;
        
      case 'm789_compliance':
        eventData = {
          eventName: 'Patient Reported Outcome Survey Completed',
          userId: 'trial_participant_m789_hashed',
          userType: 'trial_participant',
          properties: {
            survey_type: 'monthly_compliance',
            trial_id: 'BL-GTx-301',
            completion_time: 12,
            medication_adherence: 98,
            side_effects_reported: 0,
            quality_of_life_score: 9,
            visit_compliance: 100,
            device_type: 'tablet',
            user_id: 'trial_participant_m789_hashed'
          },
          identify: {
            name: 'M789',
            trial_id: 'BL-GTx-301',
            trial_compliance_score: 92,
            biomarker_quality_score: 88,
            caregiver_involved: true,
            portal_engagement_level: 'high'
          }
        };
        break;
        
      case 'patient_12345_care':
        eventData = {
          eventName: 'Patient Support Call Completed',
          userId: 'patient_12345_hashed',
          userType: 'patient',
          properties: {
            call_type: 'treatment_adherence_check',
            care_coordinator: 'nurse_jane_smith',
            call_duration_minutes: 20,
            patient_satisfaction: 10,
            therapy_program: 'BioLink-GTx',
            device_type: 'phone',
            user_id: 'patient_12345_hashed'
          },
          identify: {
            name: 'Patient 12345',
            therapy_program: 'BioLink-GTx',
            care_coordinator: 'nurse_jane_smith',
            consent_status: 'active',
            last_support_call: new Date().toISOString()
          }
        };
        break;
        
      default:
        return;
    }
    
    // Track the event
    if (typeof window !== 'undefined' && (window as any).analytics) {
      // Identify the user first
      (window as any).analytics.identify(eventData.userId, eventData.identify);
      
      // Then track the event
      (window as any).analytics.track(eventData.eventName, eventData.properties);
    }
    
    // Update statistics
    setEventsGenerated(prev => prev + 1);
  };

  // Enhanced mock user base generator with comprehensive event properties and enhanced existing events
  const generateMockUserBase = async () => {
    setIsGeneratingMockUsers(true);
    
    try {
      // 1. Anonymous Website Visitors (200 users)
      await generateAnonymousVisitors(200);
      
      // 2. Patient Portal Users (150 users)
      await generatePatientPortalUsers(150);
      
      // 3. Healthcare Professionals (100 users)
      await generateHCPUsers(100);
      
      // 4. Trial Participants (75 users)
      await generateTrialParticipants(75);
      
      alert('Successfully generated 1000+ events across 525 users!\n\n' +
            '• 200 Anonymous Visitors\n' +
            '• 150 Patient Portal Users\n' +
            '• 100 Healthcare Professionals\n' +
            '• 75 Trial Participants\n\n' +
            'Check Analytics Dashboard for insights!');
    } catch (error) {
      console.error('Error generating mock user base:', error);
      alert('Error generating mock users. Check console for details.');
    } finally {
      setIsGeneratingMockUsers(false);
    }
  };

  // 1. Anonymous Website Visitors (200 users)
  const generateAnonymousVisitors = async (count: number) => {
    const specialties = ['endocrinology', 'genetics', 'pediatrics', 'neurology'];
    const locations = ['Boston, MA', 'New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX'];
    const therapies = ['BioLink-GTx', 'BioLink-ENZ'];
    
    for (let i = 0; i < count; i++) {
      const anonymousId = `visitor_${Math.random().toString(36).substr(2, 9)}`;
      const isHighEngagement = Math.random() < 0.6; // 60% high engagement
      
      // Set anonymous ID for this visitor
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.reset();
        (window as any).analytics.setAnonymousId(anonymousId);
      }
      
      // Pattern: Page Viewed → Content Downloaded → Specialist Locator Used → Email Capture
      
      // 1. Initial page view
      trackEvent('Page Viewed', {
        page_name: Math.random() < 0.5 ? 'rare-disease-info' : 'biolink-therapy-overview',
        time_on_page_seconds: Math.random() < 0.5 ? 30 : Math.random() < 0.5 ? 60 : Math.random() < 0.5 ? 120 : Math.random() < 0.5 ? 180 : 300,
        scroll_depth_percentage: Math.random() < 0.5 ? 25 : Math.random() < 0.5 ? 50 : Math.random() < 0.5 ? 75 : 100,
        content_engagement_score: Math.random() < 0.5 ? 20 : Math.random() < 0.5 ? 40 : Math.random() < 0.5 ? 60 : 80,
        page_category: 'education',
        device_type: Math.random() < 0.65 ? 'mobile' : 'desktop',
        therapy_focus: therapies[Math.floor(Math.random() * therapies.length)]
      });
      
      if (isHighEngagement) {
        // 2. Multiple page views
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Page Viewed', {
          page_name: 'specialist-locator',
          time_on_page_seconds: Math.random() < 0.5 ? 30 : Math.random() < 0.5 ? 60 : Math.random() < 0.5 ? 120 : Math.random() < 0.5 ? 180 : 300,
          scroll_depth_percentage: Math.random() < 0.5 ? 25 : Math.random() < 0.5 ? 50 : Math.random() < 0.5 ? 75 : 100,
          content_engagement_score: Math.random() < 0.5 ? 20 : Math.random() < 0.5 ? 40 : Math.random() < 0.5 ? 60 : 80,
          page_category: 'tools',
          device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
        });
        
        // 3. Content download
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Content Downloaded', {
          content_type: 'patient_guide',
          content_title: 'Understanding Your Rare Disease',
          completion_percentage: Math.random() < 0.5 ? 25 : Math.random() < 0.5 ? 50 : Math.random() < 0.5 ? 75 : 100,
          user_type: Math.random() < 0.5 ? 'patient' : Math.random() < 0.5 ? 'caregiver' : 'hcp',
          content_rating: Math.random() < 0.5 ? 3 : Math.random() < 0.5 ? 4 : 5,
          device_type: Math.random() < 0.65 ? 'mobile' : 'desktop',
          file_format: 'PDF'
        });
        
        // 4. Specialist search
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Specialist Locator Used', {
          search_criteria: specialties[Math.floor(Math.random() * specialties.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          results_shown: Math.floor(Math.random() * 10) + 3,
          device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
        });
        
        // 5. Email capture (30% convert)
        if (Math.random() < 0.3) {
          await new Promise(resolve => setTimeout(resolve, 100));
          const email = `visitor${i}@email.com`;
          const userId = `user_visitor${i}_${Date.now()}`;
          
          // Identify user (anonymous to known)
          if (typeof window !== 'undefined' && (window as any).analytics) {
            (window as any).analytics.identify(userId, {
              email: email,
              source: 'website_email_capture',
              therapy_interest: therapies[Math.floor(Math.random() * therapies.length)],
              previous_anonymous_id: anonymousId
            });
          }
          
          trackEvent('Email Capture Form Submitted', {
            form_type: 'disease_info_request',
            therapy_interest: therapies[Math.floor(Math.random() * therapies.length)],
            device_type: Math.random() < 0.65 ? 'mobile' : 'desktop',
            email_domain: 'email.com',
            user_id: userId
          });
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 50)); // Throttle requests
    }
  };

  // 2. Patient Portal Users (150 users)
  const generatePatientPortalUsers = async (count: number) => {
    const firstNames = ['Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'Robert', 'Jennifer', 'James', 'Maria', 'John'];
    const lastInitials = ['M', 'R', 'L', 'K', 'W', 'T', 'H', 'B', 'S', 'C'];
    const conditions = ['gaucher_disease', 'fabry_disease', 'pompe_disease', 'alpha1_antitrypsin'];
    const therapies = ['BioLink-GTx', 'BioLink-ENZ'];
    
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)];
      const userId = `patient_${firstName.toLowerCase()}_${lastInitial.toLowerCase()}_hashed_${i}`;
      const needsGeneticTesting = Math.random() < 0.4; // 40% need genetic testing
      
      // Identify patient
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.identify(userId, {
          name: `${firstName} ${lastInitial}.`,
          user_type: 'patient',
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          therapy_program: therapies[Math.floor(Math.random() * therapies.length)],
          needs_genetic_testing: needsGeneticTesting,
          age_range: ['18-30', '31-45', '46-60'][Math.floor(Math.random() * 3)]
        });
      }
      
      // Pattern: Account Created → Assessments → Genetic Testing Required → Portal browsing
      
      // 1. Account creation
      trackEvent('Account Created', {
        account_type: 'patient',
        registration_source: ['website', 'referral', 'advertisement'][Math.floor(Math.random() * 3)],
        previous_anonymous_id: `visitor_${Math.random().toString(36).substr(2, 9)}`,
        therapy_interest: therapies[Math.floor(Math.random() * therapies.length)],
        device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
      });
      
      // 2. Assessment completion
      await new Promise(resolve => setTimeout(resolve, 100));
      trackEvent('Patient Assessment Completed', {
        assessment_score: Math.floor(Math.random() * 30) + 70, // 70-100
        therapy_program: therapies[Math.floor(Math.random() * therapies.length)],
        genetic_testing_required: Math.random() < 0.5 ? true : false,
        insurance_verified: Math.random() < 0.5 ? true : false,
        care_coordinator_assigned: Math.random() < 0.5 ? true : false,
        completion_time_minutes: Math.floor(Math.random() * 20) + 10,
        clinical_readiness_score: Math.floor(Math.random() * 25) + 75,
        device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
      });
      
      // 3. Genetic testing requirement (if needed)
      if (needsGeneticTesting) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Genetic Testing Requirements Completed', {
          test_type: 'comprehensive_panel',
          completion_status: 'required_not_scheduled',
          lab_provider: ['LabCorp', 'Quest', 'Invitae'][Math.floor(Math.random() * 3)],
          turnaround_time_days: Math.floor(Math.random() * 10) + 14
        });
        
        // Portal browsing for genetic testing info
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Portal Action Clicked', {
          action: 'view_genetic_testing_info',
          section: 'testing',
          therapy_program: therapies[Math.floor(Math.random() * therapies.length)],
          device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
        });
      }
      
      // 4. Portal browsing activity
      await new Promise(resolve => setTimeout(resolve, 100));
      trackEvent('Portal Action Clicked', {
        action: ['download_guide', 'contact_coordinator', 'view_results'][Math.floor(Math.random() * 3)],
        section: ['dashboard', 'treatment', 'support'][Math.floor(Math.random() * 3)],
        therapy_program: therapies[Math.floor(Math.random() * therapies.length)],
        device_type: Math.random() < 0.65 ? 'mobile' : 'desktop'
      });
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  // 3. Healthcare Professionals (100 users)
  const generateHCPUsers = async (count: number) => {
    const lastNames = ['Johnson', 'Martinez', 'Chen', 'Rodriguez', 'Thompson', 'Wilson', 'Davis', 'Brown', 'Miller', 'Garcia'];
    const specialties = ['endocrinology', 'genetics', 'pediatrics', 'neurology'];
    const institutions = ['Boston Medical Center', 'Johns Hopkins', 'Mayo Clinic', 'Cleveland Clinic'];
    
    for (let i = 0; i < count; i++) {
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const userId = `hcp_dr_${lastName.toLowerCase()}_hashed_${i}`;
      const isHighlyEngaged = Math.random() < 0.3; // 30% highly engaged but no referrals
      
      // Identify HCP
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.identify(userId, {
          name: `Dr. ${lastName}`,
          user_type: 'healthcare_professional',
          specialty: specialties[Math.floor(Math.random() * specialties.length)],
          institution: institutions[Math.floor(Math.random() * institutions.length)],
          years_experience: Math.floor(Math.random() * 20) + 5,
          patient_referrals: isHighlyEngaged ? 0 : Math.floor(Math.random() * 5) // Highly engaged = 0 referrals
        });
      }
      
      // Pattern: HCP Portal Login → Content Consumption → No Referral Actions
      
      // 1. Portal login
      trackEvent('HCP Portal Login', {
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
        institution: institutions[Math.floor(Math.random() * institutions.length)],
        login_duration_minutes: Math.floor(Math.random() * 30) + 15,
        device_type: Math.random() < 0.35 ? 'mobile' : 'desktop'
      });
      
      // 2. Content consumption (high engagement = more content)
      const contentViews = isHighlyEngaged ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 2) + 1;
      
      for (let j = 0; j < contentViews; j++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Educational Content Viewed', {
          content_type: ['clinical_data', 'prescribing_info', 'case_studies'][Math.floor(Math.random() * 3)],
          content_title: `BioLink Clinical Study ${j + 1}`,
          completion_percentage: Math.random() < 0.5 ? 25 : Math.random() < 0.5 ? 50 : Math.random() < 0.5 ? 75 : 100,
          user_type: 'hcp',
          content_rating: Math.random() < 0.5 ? 3 : Math.random() < 0.5 ? 4 : 5,
          specialty: specialties[Math.floor(Math.random() * specialties.length)],
          viewing_time_minutes: Math.floor(Math.random() * 15) + 5,
          device_type: Math.random() < 0.35 ? 'mobile' : 'desktop',
          engagement_level: isHighlyEngaged ? 'high' : 'medium'
        });
      }
      
      // 3. Medical information requests (highly engaged do more)
      if (isHighlyEngaged) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Medical Information Request', {
          product: ['BioLink-GTx', 'BioLink-ENZ'][Math.floor(Math.random() * 2)],
          request_type: ['efficacy_data', 'safety_profile', 'dosing_guidelines'][Math.floor(Math.random() * 3)],
          specialty: specialties[Math.floor(Math.random() * specialties.length)],
          device_type: Math.random() < 0.35 ? 'mobile' : 'desktop'
        });
      }
      
      // 4. NO referral actions for highly engaged (key insight!)
      // Only non-highly engaged HCPs make referrals
      if (!isHighlyEngaged && Math.random() < 0.3) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Patient Referral Submitted', {
          therapy_program: ['BioLink-GTx', 'BioLink-ENZ'][Math.floor(Math.random() * 2)],
          referring_physician: userId,
          referral_reason: ['treatment_candidate', 'trial_eligibility', 'second_opinion'][Math.floor(Math.random() * 3)],
          urgency_level: ['urgent', 'routine', 'follow_up'][Math.floor(Math.random() * 3)]
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  // 4. Trial Participants (75 users)
  const generateTrialParticipants = async (count: number) => {
    const trialIds = ['BLT-2024-001', 'BLT-2024-002', 'BL-GTx-301', 'BL-ENZ-205'];
    
    for (let i = 0; i < count; i++) {
      const participantId = `P${String(i + 1).padStart(3, '0')}`;
      const userId = `trial_participant_${participantId.toLowerCase()}_hashed`;
      const hasExcellentCompliance = Math.random() < 0.25; // 25% excellent compliance
      
      // Identify trial participant
      if (typeof window !== 'undefined' && (window as any).analytics) {
        (window as any).analytics.identify(userId, {
          name: participantId,
          user_type: 'trial_participant',
          trial_id: trialIds[Math.floor(Math.random() * trialIds.length)],
          compliance_score: hasExcellentCompliance ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 20) + 70,
          enrollment_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      
      // Pattern: Trial Interest → Enrollment → Survey Completion → Data Collection
      
      // 1. Trial interest
      trackEvent('Clinical Trial Interest Expressed', {
        study_id: trialIds[Math.floor(Math.random() * trialIds.length)],
        study_name: `BioLink Clinical Study ${i + 1}`,
        device_type: Math.random() < 0.5 ? 'mobile' : 'desktop'
      });
      
      // 2. Enrollment/consent
      await new Promise(resolve => setTimeout(resolve, 100));
      trackEvent('Clinical Trial Consent Completed', {
        study_id: trialIds[Math.floor(Math.random() * trialIds.length)],
        consent_version: '2.1',
        location: ['Boston Medical Center', 'Mayo Clinic', 'Johns Hopkins'][Math.floor(Math.random() * 3)],
        device_type: Math.random() < 0.5 ? 'mobile' : 'desktop'
      });
      
      // 3. Survey completion (excellent compliance = more surveys)
      const surveyCount = hasExcellentCompliance ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2) + 1;
      
      for (let j = 0; j < surveyCount; j++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Patient Reported Outcome Survey Completed', {
          survey_type: ['weekly_compliance', 'monthly_outcomes', 'safety_check'][Math.floor(Math.random() * 3)],
          therapy_program: ['BioLink-GTx', 'BioLink-ENZ'][Math.floor(Math.random() * 2)],
          genetic_testing_required: false, // Trial participants already completed
          insurance_verified: true, // Required for trial participation
          care_coordinator_assigned: true, // All trial participants have coordinators
          trial_id: trialIds[Math.floor(Math.random() * trialIds.length)],
          completion_time: Math.floor(Math.random() * 20) + 10,
          quality_of_life_score: hasExcellentCompliance ? Math.floor(Math.random() * 2) + 8 : Math.floor(Math.random() * 4) + 6,
          visit_compliance: hasExcellentCompliance ? 100 : Math.floor(Math.random() * 20) + 80
        });
      }
      
      // 4. Digital biomarker collection
      await new Promise(resolve => setTimeout(resolve, 100));
      trackEvent('Digital Biomarker Collection', {
        trial_id: trialIds[Math.floor(Math.random() * trialIds.length)],
        biomarker_type: ['heart_rate_variability', 'activity_monitoring', 'sleep_patterns'][Math.floor(Math.random() * 3)],
        data_quality_flag: !hasExcellentCompliance && Math.random() < 0.1, // Excellent compliance = no quality issues
        compliance_rate: hasExcellentCompliance ? Math.floor(Math.random() * 5) + 95 : Math.floor(Math.random() * 15) + 80,
        device_type: 'wearable',
        collection_date: new Date().toISOString()
      });
      
      // 5. Survey sent (for future compliance tracking)
      if (Math.random() < 0.7) {
        await new Promise(resolve => setTimeout(resolve, 100));
        trackEvent('Patient Reported Outcome Survey Sent', {
          survey_type: ['weekly_compliance', 'monthly_outcomes', 'safety_check'][Math.floor(Math.random() * 3)],
          trial_id: trialIds[Math.floor(Math.random() * trialIds.length)],
          due_date: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          reminder_count: Math.floor(Math.random() * 4)
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const generateAnonymousUserJourney = () => {
    // Get current anonymous ID from analytics
    let anonymousId = '';
    if (typeof window !== 'undefined' && (window as any).analytics) {
      try {
        anonymousId = (window as any).analytics.user().anonymousId() || '';
      } catch (error) {
        console.log('Could not get anonymous ID, generating random one');
        anonymousId = `anon_${Math.random().toString(36).substr(2, 16)}`;
      }
    }

    if (!anonymousId) {
      anonymousId = `anon_${Math.random().toString(36).substr(2, 16)}`;
    }

    // Calculate timeframe: 6 weeks ending 2 days ago
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2); // 2 days ago
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (6 * 7)); // 6 weeks before

    const events = [];

    // Helper function to generate random timestamp within range
    const getRandomTimestamp = () => {
      const start = startDate.getTime();
      const end = endDate.getTime();
      return new Date(start + Math.random() * (end - start));
    };

    // Helper function to get random value from array
    const getRandomFromArray = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to get random number in range
    const getRandomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1. Generate 47 Page Viewed Events
    const pageCategories = [
      { category: 'Disease Information', count: 15 },
      { category: 'Symptom Management', count: 12 },
      { category: 'Treatment Options', count: 8 },
      { category: 'Specialist Directory', count: 7 },
      { category: 'Patient Stories', count: 5 }
    ];

    const pageNames = {
      'Disease Information': [
        'rare-disease-overview', 'lysosomal-storage-disorders', 'metabolic-disorders',
        'genetic-testing-guide', 'disease-symptoms', 'diagnosis-process'
      ],
      'Symptom Management': [
        'managing-fatigue', 'pain-management', 'mobility-support', 'nutrition-guide',
        'exercise-recommendations', 'daily-living-tips'
      ],
      'Treatment Options': [
        'biolink-gtx-overview', 'enzyme-replacement-therapy', 'gene-therapy-explained',
        'treatment-comparison', 'clinical-trials'
      ],
      'Specialist Directory': [
        'find-endocrinologist', 'find-geneticist', 'find-metabolic-specialist',
        'specialist-locator', 'doctor-directory'
      ],
      'Patient Stories': [
        'sarah-success-story', 'family-journey', 'treatment-experience',
        'patient-testimonials', 'caregiver-stories'
      ]
    };

    pageCategories.forEach(({ category, count }) => {
      for (let i = 0; i < count; i++) {
        const isDesktop = Math.random() < 0.8; // 80% desktop, 20% mobile
        const pageName = getRandomFromArray(pageNames[category as keyof typeof pageNames]);
        
        const baseProperties = {
          page_name: pageName,
          page_category: category,
          time_on_page_seconds: getRandomInRange(120, 450),
          scroll_depth_percentage: getRandomInRange(75, 100),
          device_type: isDesktop ? 'desktop' : 'mobile',
          user_agent: isDesktop ? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)',
          referrer: Math.random() > 0.5 ? 'https://google.com' : 'direct',
          session_id: `session_${Math.random().toString(36).substr(2, 9)}`
        };

        // Add therapy_focus for treatment option pages
        if (category === 'Treatment Options') {
          baseProperties.therapy_focus = 'BioLink-GTx';
        }

        events.push({
          event: 'Page Viewed',
          properties: baseProperties,
          timestamp: getRandomTimestamp(),
          anonymousId: anonymousId
        });
      }
    });

    // 2. Generate 8 Content Downloaded Events
    const downloadTypes = [
      { type: 'Patient Guide', count: 3 },
      { type: 'Symptom Tracker', count: 2 },
      { type: 'Treatment Overview', count: 2 },
      { type: 'Caregiver Resource', count: 1 }
    ];

    const downloadTitles = {
      'Patient Guide': ['Understanding Your Condition', 'Treatment Journey Guide', 'Living with Rare Disease'],
      'Symptom Tracker': ['Daily Symptom Log', 'Weekly Progress Tracker'],
      'Treatment Overview': ['BioLink-GTx Overview', 'Treatment Options Comparison'],
      'Caregiver Resource': ['Caregiver Support Handbook']
    };

    downloadTypes.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        const title = getRandomFromArray(downloadTitles[type as keyof typeof downloadTitles]);
        
        events.push({
          event: 'Content Downloaded',
          properties: {
            content_type: type,
            content_title: title,
            file_format: 'PDF',
            device_type: 'desktop',
            therapy_program: 'BioLink-GTx',
            file_size_mb: Math.round((Math.random() * 5 + 1) * 100) / 100, // 1-6 MB
            download_source: 'resource_library',
            session_id: `session_${Math.random().toString(36).substr(2, 9)}`
          },
          timestamp: getRandomTimestamp(),
          anonymousId: anonymousId
        });
      }
    });

    // 3. Generate 3 Specialist Locator Used Events
    const specialistSearches = [
      { criteria: 'endocrinologist', results: 8 },
      { criteria: 'geneticist', results: 5 },
      { criteria: 'metabolic specialist', results: 12 }
    ];

    specialistSearches.forEach(({ criteria, results }) => {
      events.push({
        event: 'Specialist Locator Used',
        properties: {
          search_criteria: criteria,
          location: 'Boston, MA',
          zip_code_searched: '02114',
          radius_miles: 25,
          results_shown: results,
          device_type: 'desktop',
          search_filters: ['accepts_insurance', 'new_patients'],
          sort_by: 'distance',
          session_id: `session_${Math.random().toString(36).substr(2, 9)}`
        },
        timestamp: getRandomTimestamp(),
        anonymousId: anonymousId
      });
    });

    // Sort events by timestamp
    events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // Track all events with Segment
    let eventCount = 0;
    events.forEach((eventData, index) => {
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).analytics) {
          // Set the anonymous ID for this event
          (window as any).analytics.track(eventData.event, {
            ...eventData.properties,
            anonymousId: eventData.anonymousId,
            event_timestamp: eventData.timestamp.toISOString(),
            generated_event: true,
            event_sequence: index + 1,
            total_events: events.length
          }, {
            anonymousId: eventData.anonymousId,
            timestamp: eventData.timestamp
          });
        }
        
        eventCount++;
        if (eventCount === events.length) {
          alert(`Successfully generated ${events.length} events for anonymous user ${anonymousId} across 6-week timeframe!`);
        }
      }, index * 100); // Stagger events by 100ms
    });

    console.log(`Generated ${events.length} events for anonymous user:`, {
      anonymousId,
      timeframe: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
      eventBreakdown: {
        'Page Viewed': 47,
        'Content Downloaded': 8,
        'Specialist Locator Used': 3
      }
    });
  };

  const handleToggleMockEvents = () => {
    const newState = !mockEventsEnabled;
    setMockEventsEnabled(newState);
    
    if (newState) {
      setEventsGenerated(0);
    }
  };

  const handleFrequencyChange = (newFrequency: number) => {
    setEventFrequency(newFrequency);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Settings</h1>
          <p className="text-xl text-gray-600">
            Configure real-time mock events to simulate active users across all customer journeys
          </p>
        </div>

        {/* Main Settings Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mock Event Generator</h2>
          
          {/* Toggle Control */}
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl mb-6">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${
                mockEventsEnabled ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {mockEventsEnabled ? (
                  <Play className="h-8 w-8 text-green-600" />
                ) : (
                  <Pause className="h-8 w-8 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Real-time Mock Events</h3>
                <p className="text-gray-600">
                  {mockEventsEnabled ? 'Currently generating events' : 'Event generation stopped'}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleMockEvents}
              className={`px-8 py-3 rounded-full font-semibold transition-colors duration-200 ${
                mockEventsEnabled
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {mockEventsEnabled ? 'Stop Events' : 'Start Events'}
            </button>
          </div>

          {/* Frequency Control */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event Frequency: Every {eventFrequency} seconds
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={eventFrequency}
              onChange={(e) => handleFrequencyChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1s (Fast)</span>
              <span>15s (Medium)</span>
              <span>30s (Slow)</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-900">{eventsGenerated}</div>
              <div className="text-blue-700 text-sm">Events Generated</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-green-900">{activeUsers}</div>
              <div className="text-green-700 text-sm">Simulated Active Users</div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-900">{eventFrequency}s</div>
              <div className="text-purple-700 text-sm">Current Frequency</div>
            </div>
          </div>
        </div>

        {/* Manual Event Generation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Manual Event Generation</h2>
          <p className="text-gray-600 mb-8">Generate specific events for key user profiles to test targeted scenarios</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => generateManualEvent('sarah_genetic_testing')}
              className="p-6 border-2 border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sarah M. Complete Healthcare Journey</h3>
                  <p className="text-green-600 text-sm">Multi-System 30-Day Journey Orchestration</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Website → Marketing → Portal → Assessment → Care Coordination → Insurance → Testing → Support → Medical Affairs → Clinical - Complete 11-system journey</p>
            </button>

            <button
              onClick={() => generateManualEvent('martinez_engagement')}
              className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Dr. Martinez (Audience 2)</h3>
                  <p className="text-blue-600 text-sm">High Engagement, No Referrals</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Endocrinology, 8+ patients, Score: 8.5, 0 referrals - Qualifies for "HCPs Engaged with BioLink-GTx Content"</p>
            </button>

            <button
              onClick={() => generateManualEvent('m789_compliance')}
              className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-200">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">M789 (Audience 3)</h3>
                  <p className="text-purple-600 text-sm">High Compliance Participant</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Compliance: 92%, Biomarker: 88%, Caregiver Support - Qualifies for "Trial Participants with High Compliance"</p>
            </button>

            <button
              onClick={() => generateManualEvent('patient_12345_care')}
              className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-orange-200">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Patient 12345</h3>
                  <p className="text-orange-600 text-sm">Care Coordinator Support</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Treatment adherence tracking with Nurse Jane Smith care coordination</p>
            </button>
          </div>

          {/* Comprehensive Mock User Base Generator */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">🎯 Generate Complete User Base (1000+ Events)</h3>
            <p className="text-purple-800 mb-4">
              Generate 525 users across 4 user types with realistic behavior patterns for comprehensive analytics demo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">👥 User Types</h4>
                <ul className="space-y-1 text-purple-700">
                  <li>• 200 Anonymous Visitors (60% high engagement)</li>
                  <li>• 150 Patient Portal Users (40% need genetic testing)</li>
                  <li>• 100 Healthcare Professionals (30% high engagement, no referrals)</li>
                  <li>• 75 Trial Participants (25% excellent compliance)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">📊 New Events</h4>
                <ul className="space-y-1 text-purple-700">
                  <li>• Account Created (identity resolution)</li>
                  <li>• Portal Action Clicked (engagement)</li>
                  <li>• Patient Referral Submitted (conversion)</li>
                  <li>• HCP Portal Login (professional engagement)</li>
                  <li>• Survey Sent/Completed (compliance)</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={generateMockUserBase}
              disabled={isGeneratingMockUsers}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isGeneratingMockUsers
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isGeneratingMockUsers ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Users & Events...
                </div>
              ) : (
                'Generate Complete User Base (525 Users, 1000+ Events)'
              )}
            </button>
            
            <div className="mt-4 text-xs text-purple-700">
              <strong>Demo Insights:</strong> Anonymous-to-known identity resolution, HCP engagement without conversion, 
              trial compliance scoring, genetic testing workflow gaps, multi-channel patient journeys
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <button
              onClick={generateAnonymousUserJourney}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              Generate Anonymous User Journey (58 Events)
            </button>
          </div>
        </div>

        {/* Automatic Event Types Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulated Event Types</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Journey Events</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Page views and navigation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Treatment assessments
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Outcome surveys
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Specialist searches
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Resource downloads
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Treatment doses
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">HCP & Clinical Events</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Educational content views
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Medical info requests
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Webinar registrations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Clinical trial interest
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Trial consent completion
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Appointment scheduling
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Segment Integration Notice */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-orange-500 rounded-xl p-8 text-white text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Powered by Segment's Unified Customer Data Platform</h3>
          <p className="text-lg mb-6">
            Every patient interaction, HCP engagement, and clinical trial event unified in real-time. 
            From fragmented healthcare data silos to actionable customer intelligence.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-sm">Data Sources Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-sm">Data Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">&lt;100ms</div>
              <div className="text-sm">Real-time Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;