// Mock database storage
const STORAGE_KEYS = {
  ACHIEVEMENTS: 'ac_achievements',
  TEMPLATES: 'ac_templates',
  USER: 'ac_user',
  TIMELINE: 'ac_timeline',
  REMARKS: 'ac_remarks'
};

const defaultAchievements = [
  { id: 1, title: 'Woke up at 6 AM', description: 'Maintained strict sleep schedule.', date: '2026-07-08' },
  { id: 2, title: 'Read 10 pages', description: 'Atomic Habits chapter 4.', date: '2026-07-08' },
  { id: 3, title: 'Drank 3L Water', description: 'Stayed hydrated all day long.', date: '2026-07-08' },
];

const defaultTemplates = [
  { id: 1, title: 'Morning Routine', description: 'Brush, meditate, read, work out.', category: 'Habit' },
  { id: 2, title: 'Gym Workout', description: 'Push day routine focus.', category: 'Fitness' },
  { id: 3, title: 'LeetCode Session', description: 'Solve 2 medium problems.', category: 'Coding' },
];

const defaultTimeline = [
  { id: 't1', time: '17:00', title: 'Perfect Day slot', status: 'idle' }, // statuses: idle, active, success, failed
  { id: 't2', time: '18:00', title: 'Perfect Day slot', status: 'idle' },
  { id: 't3', time: '19:00', title: 'Perfect Day slot', status: 'idle' },
];

// Helper to load or initialize local storage
const getFromStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Authentication
  login: async (username, password) => {
    await delay(600);
    if (!username.trim() || !password.trim()) {
      throw new Error('Username and password are required.');
    }
    const userData = { username: username.trim() };
    saveToStorage(STORAGE_KEYS.USER, userData);
    return userData;
  },

  logout: async () => {
    await delay(300);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  },

  getCurrentUser: async () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  // Achievements
  getAchievements: async () => {
    await delay();
    return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
  },

  addAchievement: async (achievement) => {
    await delay(500);
    const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
    const newAchievement = {
      id: Date.now(),
      title: achievement.title,
      description: achievement.description || '',
      date: new Date().toISOString().split('T')[0]
    };
    achievements.unshift(newAchievement);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    return newAchievement;
  },

  deleteAchievement: async (id) => {
    await delay(300);
    let achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
    achievements = achievements.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    return true;
  },

  // Templates
  getTemplates: async () => {
    await delay();
    return getFromStorage(STORAGE_KEYS.TEMPLATES, defaultTemplates);
  },

  addTemplate: async (template) => {
    await delay(500);
    const templates = getFromStorage(STORAGE_KEYS.TEMPLATES, defaultTemplates);
    const newTemplate = {
      id: Date.now(),
      title: template.title,
      description: template.description || '',
      category: template.category || 'General'
    };
    templates.unshift(newTemplate);
    saveToStorage(STORAGE_KEYS.TEMPLATES, templates);
    return newTemplate;
  },

  // Timeline
  getTimeline: async () => {
    await delay();
    return getFromStorage(STORAGE_KEYS.TIMELINE, defaultTimeline);
  },

  updateTimelineStatus: async (id, status) => {
    await delay(200);
    const timeline = getFromStorage(STORAGE_KEYS.TIMELINE, defaultTimeline);
    const item = timeline.find(t => t.id === id);
    if (item) {
      item.status = status;
      saveToStorage(STORAGE_KEYS.TIMELINE, timeline);
    }
    return timeline;
  },

  // Remarks
  getRemarks: async () => {
    await delay(200);
    return getFromStorage(STORAGE_KEYS.REMARKS, '');
  },

  saveRemarks: async (remarks) => {
    await delay(300);
    saveToStorage(STORAGE_KEYS.REMARKS, remarks);
    return remarks;
  }
};
