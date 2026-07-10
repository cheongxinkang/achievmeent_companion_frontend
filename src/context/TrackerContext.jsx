import { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from './AuthContext';

export const TrackerContext = createContext(null);

export const TrackerProvider = ({ children }) => {
  const { user } = useAuth();
  const [trackerSeconds, setTrackerSeconds] = useState(61211); // 17:00:11, as in sketch
  const [trackerRunning, setTrackerRunning] = useState(false);
  const trackerIntervalRef = useRef(null);

  // Time Tracker runner
  useEffect(() => {
    if (trackerRunning) {
      trackerIntervalRef.current = setInterval(() => {
        setTrackerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (trackerIntervalRef.current) clearInterval(trackerIntervalRef.current);
    }
    return () => {
      if (trackerIntervalRef.current) clearInterval(trackerIntervalRef.current);
    };
  }, [trackerRunning]);

  // Reset tracker state on logout
  useEffect(() => {
    if (!user) {
      setTrackerRunning(false);
      setTrackerSeconds(61211);
    }
  }, [user]);

  const contextValue = useMemo(() => ({
    trackerSeconds,
    trackerRunning,
    setTrackerRunning
  }), [trackerSeconds, trackerRunning]);

  return (
    <TrackerContext.Provider value={contextValue}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};
