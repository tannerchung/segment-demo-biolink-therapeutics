import React, { useState, useEffect } from 'react';
import { User, X, Eye, EyeOff, RefreshCw, UserX, AlertCircle } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

interface UserProfile {
  user_id: string;
  traits: Record<string, any>;
}

interface UserProfileTabProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const UserProfileTab: React.FC<UserProfileTabProps> = ({ isOpen, setIsOpen }) => {
  const { events } = useAnalytics();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('anonymous');
  const [useRealAPI, setUseRealAPI] = useState(true);
  const [lastEventCount, setLastEventCount] = useState(0);
  const [anonymousId, setAnonymousId] = useState<string>('');

  // Persist tab state in localStorage
  useEffect(() => {
    localStorage.setItem('profileTabOpen', isOpen.toString());
  }, [isOpen]);

  // Backend endpoint URL
  const BACKEND_URL = 'https://segment-profile-api-tanner.replit.app';

  // Get current user ID from analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      const analytics = (window as any).analytics;
      
      // Get both user ID and anonymous ID using proper analytics methods
      let userId = null;
      let anonId = '';
      
      try {
        // Get user ID
        if (typeof analytics.user === 'function') {
          userId = analytics.user().id();
        }
        
        // Get anonymous ID using the proper method
        if (typeof analytics.user === 'function') {
          anonId = analytics.user().anonymousId() || '';
        }
      } catch (error) {
        console.log('Analytics user methods not available yet:', error);
      }
      
      setCurrentUserId(userId || 'anonymous');
      setAnonymousId(anonId);
    }
  }, []);

  // Get the effective user ID for profile lookup
  const getEffectiveUserId = () => {
    if (currentUserId) {
      return currentUserId;
    }
    if (anonymousId) {
      return anonymousId;
    }
    return null;
  };

  const effectiveUserId = getEffectiveUserId() || 'anonymous';
  const fetchRealProfile = async () => {
    if (effectiveUserId === 'anonymous') {
      setProfile(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/${encodeURIComponent(effectiveUserId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User profile not found in Segment');
        } else if (response.status === 401) {
          throw new Error('Authentication failed with Segment API');
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      // Use the response directly from your backend
      const transformedProfile: UserProfile = {
        user_id: effectiveUserId,
        traits: data.traits || {}
      };

      setProfile(transformedProfile);
    } catch (err) {
      let errorMessage = 'Failed to fetch profile data';
      
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          errorMessage = 'Cannot connect to backend server. Please ensure:\n1. Backend is running at ' + BACKEND_URL + '\n2. CORS is configured to allow localhost:5173\n3. Check browser console for network errors';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      console.error('Real Profile API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMockProfile = async () => {
    if (effectiveUserId === 'anonymous') {
      setProfile(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulated Profile API response based on current user
      const mockProfile: UserProfile = {
        user_id: effectiveUserId,
        traits: {
          name: effectiveUserId.includes('patient_sarah') ? 'Sarah M.' : 
                effectiveUserId.includes('hcp_dr_johnson') ? 'Dr. Michael Johnson' :
                effectiveUserId.includes('patient_emma') ? 'Emma L.' : 
                currentUserId !== 'anonymous' ? 'Identified User' : 'Anonymous Visitor',
          email: effectiveUserId.includes('patient_sarah') ? 'sarah.m@email.com' :
                 effectiveUserId.includes('hcp_dr_johnson') ? 'mjohnson@childrens.harvard.edu' :
                 effectiveUserId.includes('patient_emma') ? 'parent@email.com' : 
                 currentUserId !== 'anonymous' ? 'user@email.com' : null,
          age_range: effectiveUserId.includes('patient_sarah') ? '30-35' :
                    effectiveUserId.includes('hcp_dr_johnson') ? '40-50' :
                    effectiveUserId.includes('patient_emma') ? '8-12' : 'unknown',
          user_type: effectiveUserId.includes('hcp') ? 'healthcare_professional' : 
                    currentUserId !== 'anonymous' ? 'patient' : 'anonymous_visitor',
          therapy_program: effectiveUserId.includes('patient') ? 'BioLink-GTx' : null,
          specialty: effectiveUserId.includes('hcp') ? 'Pediatric Genetics' : null,
          institution: effectiveUserId.includes('hcp') ? 'Boston Children\'s Hospital' : null,
          location: 'Boston, MA',
          created_at: '2024-01-15T10:30:00Z',
          last_seen: new Date().toISOString(),
          // Add anonymous tracking info
          ...(currentUserId === 'anonymous' && anonymousId && {
            anonymous_id: anonymousId,
            visitor_status: 'anonymous',
            session_start: new Date().toISOString()
          })
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(mockProfile);
    } catch (err) {
      setError('Failed to fetch mock profile data');
      console.error('Mock profile error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = () => {
    if (useRealAPI) {
      fetchRealProfile();
    } else {
      fetchMockProfile();
    }
  };

  const resetUser = () => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      const analytics = (window as any).analytics;
      
      // Track the reset event
      analytics.track('User Reset to Anonymous', {
        previous_user_id: effectiveUserId,
        reset_timestamp: new Date().toISOString()
      });
      
      // Reset analytics - this will generate a new anonymous ID
      analytics.reset();
      
      // Clear current state
      setCurrentUserId(null);
      setProfile(null);
      
      // Get the new anonymous ID after reset
      setTimeout(() => {
        try {
          const newAnonymousId = analytics.user().anonymousId();
          setAnonymousId(newAnonymousId || '');
        } catch (error) {
          console.log('Could not get new anonymous ID after reset:', error);
          setAnonymousId('');
        }
      }, 100);
    }
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (response.ok) {
        const data = await response.json();
        alert(`Backend is healthy! Status: ${data.status}`);
      } else {
        alert(`Backend responded with status: ${response.status}`);
      }
    } catch (err) {
      alert(`Backend connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    if (isOpen && effectiveUserId !== 'anonymous') {
      fetchProfile();
    }
  }, [isOpen, effectiveUserId, useRealAPI]);

  // Auto-refresh profile when new events are tracked
  useEffect(() => {
    if (events.length > lastEventCount && effectiveUserId !== 'anonymous' && isOpen && useRealAPI) {
      // Add a small delay to allow the event to be processed by Segment
      const timeoutId = setTimeout(() => {
        fetchProfile();
      }, 1000);
      
      setLastEventCount(events.length);
      
      return () => clearTimeout(timeoutId);
    } else {
      setLastEventCount(events.length);
    }
  }, [events.length, effectiveUserId, isOpen, useRealAPI]);

  return (
    <>
      {/* Tab Button */}
      <div className={`fixed top-1/2 transform -translate-y-1/2 z-[60] transition-all duration-300 ${
        isOpen ? 'left-80' : 'left-0'
      }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white p-3 rounded-r-lg shadow-lg transition-colors duration-200 flex items-center ${
            isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <User className="h-5 w-5" />}
          <span className="ml-2 text-sm font-medium">
            {isOpen ? 'Hide Profile' : 'Show Profile'}
          </span>
        </button>
      </div>

      {/* Profile Panel */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto border-r border-gray-200`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Live User Profile</h2>
              <p className="text-xs text-gray-500">Updates in real-time as you navigate</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs text-green-600 font-medium">Live</span>
            </div>
          </div>

          {/* API Toggle */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-blue-900">Data Source</h3>
              <button
                onClick={testBackendConnection}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Test Backend
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setUseRealAPI(true)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  useRealAPI 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Real API
              </button>
              <button
                onClick={() => setUseRealAPI(false)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !useRealAPI 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Mock Data
              </button>
            </div>
            {useRealAPI && (
              <div className="mt-2 text-xs text-blue-700">
                Using: {BACKEND_URL}
              </div>
            )}
            <div className="mt-2 text-xs text-blue-700">
              💡 Navigate the site to see profile updates in real-time
            </div>
          </div>

          {/* Current User */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Current User</h3>
              <button
                onClick={fetchProfile}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 flex items-center"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-3 space-y-1">
              <div><strong>User ID:</strong> {currentUserId || anonymousId || 'Loading...'}</div>
              {anonymousId && (
                <div><strong>Anonymous ID:</strong> {anonymousId}</div>
              )}
              <div><strong>Effective ID:</strong> {effectiveUserId}</div>
              <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                currentUserId
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {currentUserId ? '✅ Identified' : '👤 Anonymous'}
              </div>
            </div>
            <button
              onClick={resetUser}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
            >
              <UserX className="h-4 w-4 mr-2" />
              Reset to Anonymous
            </button>
          </div>

          {/* Profile Data */}
          {effectiveUserId === 'anonymous' ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No trackable user ID</p>
              <p className="text-sm text-gray-500 mt-2">
                Start browsing to generate anonymous ID
              </p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading profile...</p>
              <p className="text-sm text-gray-500 mt-2">
                {useRealAPI ? 'Fetching from Segment API' : 'Generating mock data'}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <button
                onClick={fetchProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-2"
              >
                Retry
              </button>
              {useRealAPI && (
                <button
                  onClick={() => setUseRealAPI(false)}
                  className="block w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Switch to Mock Data
                </button>
              )}
            </div>
          ) : profile ? (
            <div className="space-y-6">
              {/* Data Source Indicator */}
              <div className={`p-3 rounded-lg ${useRealAPI ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className={`text-sm font-medium ${useRealAPI ? 'text-green-800' : 'text-yellow-800'}`}>
                  {useRealAPI ? '✅ Real Segment Data' : '🔄 Simulated Data'} 
                  {currentUserId === 'anonymous' ? '(Anonymous)' : '(Identified)'}
                </div>
              </div>

              {/* Basic Traits */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">User Traits</h3>
                {Object.keys(profile.traits).length > 0 ? (
                  <div className="space-y-2 text-sm">
                    {Object.entries(profile.traits).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className={`text-gray-900 font-medium break-all ${
                          key.includes('appointment') ? 'text-blue-600' : ''
                        }`}>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No traits available</p>
                )}

                {/* Highlight Specialist Appointment Requests */}
                {profile.traits.requested_appointment && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-bold text-purple-900 text-sm mb-2">🏥 Specialist Appointment Request</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Requested Date:</span>
                        <span className="text-purple-900 font-medium">{profile.traits.requested_appointment}</span>
                      </div>
                      {profile.traits.requested_appointment_type && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Type:</span>
                          <span className="text-purple-900 font-medium capitalize">
                            {String(profile.traits.requested_appointment_type).replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}
                      {profile.traits.requested_specialist && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Specialist:</span>
                          <span className="text-purple-900 font-medium">{profile.traits.requested_specialist}</span>
                        </div>
                      )}
                      {profile.traits.requested_specialty && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Specialty:</span>
                          <span className="text-purple-900 font-medium">{profile.traits.requested_specialty}</span>
                        </div>
                      )}
                      {profile.traits.requested_institution && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Institution:</span>
                          <span className="text-purple-900 font-medium">{profile.traits.requested_institution}</span>
                        </div>
                      )}
                      {profile.traits.last_appointment_request && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Requested:</span>
                          <span className="text-purple-900 font-medium">
                            {new Date(String(profile.traits.last_appointment_request)).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {profile.traits.appointment_request_method && (
                        <div className="flex justify-between">
                          <span className="text-purple-700">Method:</span>
                          <span className="text-purple-900 font-medium capitalize">
                            {String(profile.traits.appointment_request_method).replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Highlight Recent Appointment Updates */}
                {profile.traits.next_appointment && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold text-blue-900 text-sm mb-2">📅 Next Appointment</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Date & Time:</span>
                        <span className="text-blue-900 font-medium">{profile.traits.next_appointment}</span>
                      </div>
                      {profile.traits.next_appointment_type && (
                        <div className="flex justify-between">
                          <span className="text-blue-700">Type:</span>
                          <span className="text-blue-900 font-medium capitalize">
                            {String(profile.traits.next_appointment_type).replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}
                      {profile.traits.last_appointment_scheduled && (
                        <div className="flex justify-between">
                          <span className="text-blue-700">Scheduled:</span>
                          <span className="text-blue-900 font-medium">
                            {new Date(String(profile.traits.last_appointment_scheduled)).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {profile.traits.appointment_scheduling_method && (
                        <div className="flex justify-between">
                          <span className="text-blue-700">Method:</span>
                          <span className="text-blue-900 font-medium capitalize">
                            {String(profile.traits.appointment_scheduling_method).replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* API Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2">Profile API Integration</h4>
            <div className="mb-2 text-xs text-blue-700">
              Events tracked: {events.length} | Auto-refresh: {useRealAPI && isOpen ? 'ON' : 'OFF'}
            </div>
            <p className="text-sm text-blue-800">
              {useRealAPI 
                ? `🔄 Auto-refreshing from Segment Profile API. Tracking ${currentUserId ? 'identified' : 'anonymous'} user.`
                : '🔄 Auto-refreshing with simulated data for demo.'
              }
            </p>
            {useRealAPI && (
              <div className="mt-2 text-xs text-blue-700">
                Endpoint: {BACKEND_URL}/api/profile/{effectiveUserId}
              </div>
            )}
            <div className="mt-2 text-xs text-blue-700 bg-blue-100 p-2 rounded">
              <strong>Demo Tip:</strong> Keep this panel open while navigating to see how user traits 
              update in real-time as you interact with different pages and features! The panel will stay open as you navigate.
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
    </>
  );
};

export default UserProfileTab;