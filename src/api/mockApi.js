import { MILESTONE_STATUS } from '../constants';

// Mock database storage
const STORAGE_KEYS = {
  ACHIEVEMENTS: 'ac_achievements',
  TEMPLATES: 'ac_templates',
  USER: 'ac_user',
  TIMELINE: 'ac_timeline',
  REMARKS: 'ac_remarks'
};

const defaultAchievements = [
  {
    id: 'default-ach-1',
    title: 'Project Reminisce',
    description: 'A classic puzzle-adventure game development quest.',
    date: '2026-07-27',
    rewards: [
      { id: 'default-rew-1', type: 'points', value: 100, label: '100 $$', detail: '100 Experience Points awarded on completion' },
      { id: 'default-rew-2', type: 'tickets', value: 20, label: '20 🎟️', detail: '20 Reward Tickets for the shop' }
    ],
    milestones: [
      { id: 'default-ms-1-1', title: 'Set up game project structure', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-2', title: 'Import character assets & sprites', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-3', title: 'Implement player movement physics', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-4', title: 'Create camera tracking system', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-5', title: 'Design initial level layout (Chapter 1)', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-6', title: 'Add dialogue system framework', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-7', title: 'Create player combat state machine', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-8', title: 'Implement basic enemy AI behavior', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-9', title: 'Integrate sound effects & ambient noise', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-10', title: 'Design user interface & HUD elements', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-11', title: 'Implement item inventory system', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-12', title: 'Create local save/load save state system', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-13', title: 'Build Chapter 2: The Forest of Echoes', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-14', title: 'Implement boss fight game mechanics', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-15', title: 'Perform memory leak code optimization', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-16', title: 'Configure auto build pipelines & packaging', status: MILESTONE_STATUS.IDLE },
      { id: 'default-ms-1-17', title: 'Release beta build for testers', status: MILESTONE_STATUS.IDLE }
    ]
  },
  {
    id: 'default-ach-2',
    title: 'Gym Challenge',
    description: 'Complete the daily strength routine.',
    date: '2026-07-08',
    rewards: [
      { id: 'default-rew-3', type: 'points', value: 50, label: '50 $$', detail: '50 Fitness points' }
    ],
    milestones: [
      { id: 'default-ms-2-1', title: 'Full-body warmup stretching', status: MILESTONE_STATUS.SUCCESS },
      { id: 'default-ms-2-2', title: 'Heavy squat 5x5 sets', status: MILESTONE_STATUS.SUCCESS },
      { id: 'default-ms-2-3', title: 'HIIT Treadmill sprint run', status: MILESTONE_STATUS.IDLE }
    ]
  }
];

const defaultTemplates = [
  { id: 'default-temp-1', title: 'Morning Routine', description: 'Brush, meditate, read, work out.', category: 'Habit' },
  { id: 'default-temp-2', title: 'Gym Workout', description: 'Push day routine focus.', category: 'Fitness' },
  { id: 'default-temp-3', title: 'LeetCode Session', description: 'Solve 2 medium problems.', category: 'Coding' },
];

const defaultTimeline = [
  { id: 'default-time-1', time: '17:00', title: 'Perfect Day slot', status: MILESTONE_STATUS.IDLE }, // statuses: idle, active, success, failed
  { id: 'default-time-2', time: '18:00', title: 'Perfect Day slot', status: MILESTONE_STATUS.IDLE },
  { id: 'default-time-3', time: '19:00', title: 'Perfect Day slot', status: MILESTONE_STATUS.IDLE },
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
    
    // Auto-generate milestones if not provided or empty
    let milestonesList = achievement.milestones;
    if (!milestonesList || milestonesList.length === 0) {
      milestonesList = [
        { id: crypto.randomUUID(), title: 'Define project goals', status: MILESTONE_STATUS.IDLE },
        { id: crypto.randomUUID(), title: 'Draft implementation plan', status: MILESTONE_STATUS.IDLE },
        { id: crypto.randomUUID(), title: 'Execute development', status: MILESTONE_STATUS.IDLE },
        { id: crypto.randomUUID(), title: 'Verify and review changes', status: MILESTONE_STATUS.IDLE }
      ];
    }
    
    // Auto-generate rewards if not provided or empty
    let rewardsList = achievement.rewards;
    if (!rewardsList || rewardsList.length === 0) {
      rewardsList = [
        { id: crypto.randomUUID(), type: 'points', value: 50, label: '50 $$', detail: '50 Experience Points' }
      ];
    }

    const newAchievement = {
      id: crypto.randomUUID(),
      title: achievement.title,
      description: achievement.description || '',
      date: achievement.date || new Date().toISOString().split('T')[0],
      rewards: rewardsList,
      milestones: milestonesList
    };
    achievements.unshift(newAchievement);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    return newAchievement;
  },

  updateAchievement: async (id, updatedFields) => {
    await delay(200);
    const achievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
    const index = achievements.findIndex(a => a.id === id);
    if (index !== -1) {
      achievements[index] = { ...achievements[index], ...updatedFields };
      saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
      return achievements[index];
    }
    throw new Error('Achievement not found');
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
      id: crypto.randomUUID(),
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
