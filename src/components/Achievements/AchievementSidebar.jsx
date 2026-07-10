import Card from '../Common/Card';
import { Plus, Search, Star } from 'lucide-react';
import { STATUS_FILTER } from '../../constants';
import PossibleRewardsWidget from './PossibleRewardsWidget';

const AchievementSidebar = ({
  onCreateClick,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalProjects,
  completedProjects
}) => {
  return (
    <aside className="achievement-sidebar">
      {/* Action Box */}
      <Card className="sidebar-widget">
        <div className="sidebar-btn-container">
          <button 
            className="create-btn-huge"
            onClick={onCreateClick}
          >
            <Plus size={20} />
            Create New Project
          </button>
        </div>
      </Card>

      {/* Filter Widget */}
      <Card className="sidebar-widget">
        <h4 className="sidebar-widget-title">
          <Search size={16} />
          Filter & Search
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            {[STATUS_FILTER.ALL, STATUS_FILTER.ACTIVE, STATUS_FILTER.COMPLETED].map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: statusFilter === status ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.02)',
                  color: statusFilter === status ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textTransform: 'capitalize'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Possible Rewards Today Widget */}
      <PossibleRewardsWidget />

      {/* Quick Stats Widget */}
      <Card className="sidebar-widget" style={{ opacity: 0.9 }}>
        <h4 className="sidebar-widget-title">
          <Star size={16} style={{ color: 'var(--color-primary)' }} />
          Status Overview
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Quests:</span>
            <span style={{ fontWeight: 700 }}>{totalProjects}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Completed:</span>
            <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>{completedProjects}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Active Quests:</span>
            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{totalProjects - completedProjects}</span>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default AchievementSidebar;
