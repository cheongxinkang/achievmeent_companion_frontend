import Card from '../Common/Card';
import { Trophy, Check } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

const PossibleRewardsWidget = () => {
  const { claimedRewards = {}, saveClaimedRewards } = useAppData();

  const handleClaimReward = (id) => {
    const newClaimed = { ...claimedRewards, [id]: !claimedRewards[id] };
    saveClaimedRewards(newClaimed);
  };

  const rewardsItems = [
    { id: 't1', icon: '🎟️', title: 'Daily Entry ticket', reward: 'Ticket Token' },
    { id: 't2', icon: '🪙', title: 'Consistency Coins', reward: '50 Gold' },
    { id: 't3', icon: '🏆', title: 'Trophy Bonus', reward: '100 XP Points' },
    { id: 't4', icon: '🌟', title: 'Superstar Boost', reward: 'Vapor XP multipliers' }
  ];

  return (
    <Card className="sidebar-widget">
      <h4 className="sidebar-widget-title">
        <Trophy size={16} style={{ color: 'var(--color-warning)' }} />
        Possible Rewards Today
      </h4>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
        Perform daily check-ins & milestones to claim points!
      </p>
      <div className="possible-rewards-grid">
        {rewardsItems.map((item) => {
          const claimed = claimedRewards[item.id];
          return (
            <div 
              key={item.id}
              className={`possible-reward-item tooltip-container ${claimed ? 'claimed' : ''}`}
              onClick={() => handleClaimReward(item.id)}
            >
              <span className="possible-reward-icon">{item.icon}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>
                {claimed ? 'Claimed' : 'Claim'}
              </span>
              {claimed && (
                <div className="possible-reward-check">
                  <Check size={8} strokeWidth={4} />
                </div>
              )}
              <span className="tooltip-text">
                <strong>{item.title}</strong><br/>
                {item.reward}<br/>
                {claimed ? 'Click to unclaim' : 'Click to claim reward'}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PossibleRewardsWidget;
