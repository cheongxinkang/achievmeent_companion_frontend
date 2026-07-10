import React from 'react';
import Card from '../Common/Card';
import { Check } from 'lucide-react';
import { MILESTONE_STATUS } from '../../constants';
import { getAchievementProgress } from '../../utils/achievements';

const AchievementCard = ({ achievement, onOpenMilestones, onToggleMilestone }) => {
  const { total, completed, isCompleted } = getAchievementProgress(achievement);
  const progressStr = `${completed}/${total}`;

  return (
    <Card 
      className="interactive-ach-card"
      onClick={() => onOpenMilestones(achievement)}
      data-completed={isCompleted}
    >
      <div className="ach-card-row">
        {/* Left side info */}
        <div className="ach-card-left">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {achievement.title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {achievement.description || 'No description provided.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
            <span 
              className="badge" 
              data-status={isCompleted ? MILESTONE_STATUS.SUCCESS : MILESTONE_STATUS.ACTIVE}
              style={{ fontWeight: 700 }}
            >
              {progressStr}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {achievement.date}
            </span>
          </div>
        </div>

        {/* Middle: Rewards */}
        {achievement.rewards && achievement.rewards.length > 0 && (
          <div className="ach-card-rewards" onClick={(e) => e.stopPropagation()}>
            {achievement.rewards.map((rew) => (
              <div 
                key={rew.id} 
                className="tooltip-container ach-reward-badge"
              >
                <span>{rew.type === 'points' ? '🪙' : '🎟️'}</span>
                <span>{rew.label}</span>
                <span className="tooltip-text">{rew.detail}</span>
              </div>
            ))}
          </div>
        )}

        {/* Right: Milestones Status dots */}
        {achievement.milestones && achievement.milestones.length > 0 && (
          <div className="ach-card-milestones" onClick={(e) => e.stopPropagation()}>
            {achievement.milestones.map((m) => (
              <div 
                key={m.id}
                className={`tooltip-container ach-milestone-dot ${m.status === MILESTONE_STATUS.SUCCESS ? 'completed' : 'idle'}`}
                onClick={() => onToggleMilestone(achievement, m.id)}
              >
                {m.status === MILESTONE_STATUS.SUCCESS ? (
                  <Check size={10} strokeWidth={3} />
                ) : (
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)' }} />
                )}
                <span className="tooltip-text">
                  {m.title} - {m.status === MILESTONE_STATUS.SUCCESS ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AchievementCard;
