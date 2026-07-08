import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { mockApi } from '../api/mockApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Home'); // Home, Achievements, Template
  const [achievements, setAchievements] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [remarks, setRemarks] = useState('');
  
  // Time Tracker state
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

  // Load initial data if logged in
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await mockApi.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          await loadAllData();
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [achList, tempList, timelineList, remarksVal] = await Promise.all([
        mockApi.getAchievements(),
        mockApi.getTemplates(),
        mockApi.getTimeline(),
        mockApi.getRemarks()
      ]);
      setAchievements(achList);
      setTemplates(tempList);
      setTimeline(timelineList);
      setRemarks(remarksVal);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    setLoading(true);
    try {
      const userData = await mockApi.login(username, password);
      setUser(userData);
      await loadAllData();
      return userData;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await mockApi.logout();
      setUser(null);
      setAchievements([]);
      setTemplates([]);
      setTimeline([]);
      setRemarks('');
      setTrackerRunning(false);
      setActivePage('Home');
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNewAchievement = async (achievementData) => {
    setLoading(true);
    try {
      const newAch = await mockApi.addAchievement(achievementData);
      setAchievements((prev) => [newAch, ...prev]);
      return newAch;
    } catch (err) {
      console.error('Error adding achievement:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAchievementItem = async (id) => {
    setLoading(true);
    try {
      await mockApi.deleteAchievement(id);
      setAchievements((prev) => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting achievement:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNewTemplate = async (templateData) => {
    setLoading(true);
    try {
      const newTemp = await mockApi.addTemplate(templateData);
      setTemplates((prev) => [newTemp, ...prev]);
      return newTemp;
    } catch (err) {
      console.error('Error adding template:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changeTimelineSlotStatus = async (id, status) => {
    try {
      const updatedList = await mockApi.updateTimelineStatus(id, status);
      setTimeline(updatedList);
    } catch (err) {
      console.error('Error updating timeline slot status:', err);
    }
  };

  const saveRemarksText = async (text) => {
    setRemarks(text);
    try {
      await mockApi.saveRemarks(text);
    } catch (err) {
      console.error('Error saving remarks:', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        activePage,
        setActivePage,
        achievements,
        templates,
        timeline,
        remarks,
        trackerSeconds,
        trackerRunning,
        setTrackerRunning,
        loginUser,
        logoutUser,
        addNewAchievement,
        deleteAchievementItem,
        addNewTemplate,
        changeTimelineSlotStatus,
        saveRemarksText,
        loadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppContext;
