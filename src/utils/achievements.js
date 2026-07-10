import { MILESTONE_STATUS } from '../constants';

/**
 * Calculates the milestone progress of an achievement.
 * 
 * @param {Object} achievement - The achievement object.
 * @param {Array} [achievement.milestones] - List of milestones for the achievement.
 * @returns {Object} Progress statistics: { total, completed, isCompleted }.
 */
export function getAchievementProgress(achievement) {
  const milestones = achievement?.milestones ?? [];
  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === MILESTONE_STATUS.SUCCESS).length;
  const isCompleted = total > 0 && completed === total;

  return { total, completed, isCompleted };
}
