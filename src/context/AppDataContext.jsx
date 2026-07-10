import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { mockApi } from '../api/mockApi';
import { useAuth } from './AuthContext';
import { PAGES } from '../constants';

export const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState(PAGES.HOME);
  const [achievements, setAchievements] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  const loadAllData = useCallback(async () => {
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
  }, []);

  // Load initial data or clear on auth state change
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      setAchievements([]);
      setTemplates([]);
      setTimeline([]);
      setRemarks('');
      setActivePage(PAGES.HOME);
    }
  }, [user, loadAllData]);

  const addNewAchievement = useCallback(async (achievementData) => {
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
  }, []);

  const deleteAchievementItem = useCallback(async (id) => {
    setLoading(true);
    try {
      await mockApi.deleteAchievement(id);
      setAchievements((prev) => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting achievement:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAchievementItem = useCallback(async (id, updatedFields) => {
    try {
      const updated = await mockApi.updateAchievement(id, updatedFields);
      setAchievements((prev) => prev.map(a => a.id === id ? updated : a));
      return updated;
    } catch (err) {
      console.error('Error updating achievement:', err);
      throw err;
    }
  }, []);

  const addNewTemplate = useCallback(async (templateData) => {
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
  }, []);

  const changeTimelineSlotStatus = useCallback(async (id, status) => {
    try {
      const updatedList = await mockApi.updateTimelineStatus(id, status);
      setTimeline(updatedList);
    } catch (err) {
      console.error('Error updating timeline slot status:', err);
    }
  }, []);

  const saveRemarksText = useCallback(async (text) => {
    setRemarks(text);
    try {
      await mockApi.saveRemarks(text);
    } catch (err) {
      console.error('Error saving remarks:', err);
    }
  }, []);

  const contextValue = useMemo(() => ({
    activePage,
    setActivePage,
    achievements,
    templates,
    timeline,
    remarks,
    loading, // internal data loading, just in case
    loadAllData,
    addNewAchievement,
    deleteAchievementItem,
    updateAchievementItem,
    addNewTemplate,
    changeTimelineSlotStatus,
    saveRemarksText
  }), [
    activePage,
    achievements,
    templates,
    timeline,
    remarks,
    loading,
    loadAllData,
    addNewAchievement,
    deleteAchievementItem,
    updateAchievementItem,
    addNewTemplate,
    changeTimelineSlotStatus,
    saveRemarksText
  ]);

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
