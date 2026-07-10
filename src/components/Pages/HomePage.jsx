import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useTracker } from '../../context/TrackerContext';
import { MILESTONE_STATUS } from '../../constants';
import Card from '../Common/Card';
import TextButton from '../Common/TextButton';
import Modal from '../Common/Modal';
import TextField from '../Common/TextField';
import SubmitButton from '../Common/SubmitButton';
import { 
  Play, 
  Pause, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Clock, 
  Calendar, 
  Sparkles,
  BookOpen
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const {
    timeline,
    changeTimelineSlotStatus,
    achievements,
    addNewAchievement,
    deleteAchievementItem,
    remarks,
    saveRemarksText
  } = useAppData();
  const {
    trackerSeconds,
    trackerRunning,
    setTrackerRunning
  } = useTracker();

  // Clock state
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatClockTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatTrackerTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const handleAddAchievementSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsSubmitting(true);
    try {
      await addNewAchievement({ title: newTitle, description: newDesc });
      setNewTitle('');
      setNewDesc('');
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-grid">
      {/* LEFT COLUMN: Welcome Message & Upcoming Timeline */}
      <section className="timeline-card">
        <Card>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: 'var(--color-warning)' }} />
              {getGreeting()},
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {user ? user.username : 'User-X'}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
            <Clock size={16} />
            <span>Time now: <strong>{formatClockTime(currentTime)}</strong></span>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 className="timeline-title">Upcoming</h3>
          </div>
          
          <div className="timeline-list">
            {timeline.map((slot) => (
              <div key={slot.id} className="timeline-item">
                <span className="timeline-time">{slot.time}</span>
                <div className="timeline-slot" data-status={slot.status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="timeline-slot-title">{slot.title}</span>
                    {slot.status !== MILESTONE_STATUS.IDLE && (
                      <span className="badge" data-status={slot.status}>
                        {slot.status}
                      </span>
                    )}
                  </div>
                    
                    <div className="timeline-slot-actions">
                      <button 
                        onClick={() => changeTimelineSlotStatus(slot.id, MILESTONE_STATUS.SUCCESS)}
                        className="timeline-icon-btn success"
                        title="Mark Completed"
                        aria-label="Mark slot as completed"
                      >
                        <Check size={14} />
                      </button>
                      <button 
                        onClick={() => changeTimelineSlotStatus(slot.id, MILESTONE_STATUS.FAILED)}
                        className="timeline-icon-btn danger"
                        title="Cancel Slot"
                        aria-label="Mark slot as failed"
                      >
                        <X size={14} />
                      </button>
                      <button 
                        onClick={() => changeTimelineSlotStatus(slot.id, MILESTONE_STATUS.ACTIVE)}
                        className="timeline-icon-btn"
                        style={{ color: 'var(--color-primary)' }}
                        title="Start Tracking"
                        aria-label="Set slot as active"
                      >
                        <Play size={12} />
                      </button>
                      <button 
                        onClick={() => changeTimelineSlotStatus(slot.id, MILESTONE_STATUS.IDLE)}
                        className="timeline-icon-btn"
                        title="Reset Slot"
                        aria-label="Reset slot status"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* MIDDLE COLUMN: Stats Grid, Time Tracker, & Remarks */}
      <section className="middle-col">
        {/* Stat Grid */}
        <div className="stats-grid">
          <Card className="stat-card">
            <span className="stat-label">Achieved Today</span>
            <span className="stat-val success">{achievements.length}</span>
          </Card>
          <Card className="stat-card">
            <span className="stat-label">Planned Tomorrow</span>
            <span className="stat-val primary">160</span>
          </Card>
          <Card className="stat-card">
            <span className="stat-label">Possible Score</span>
            <span className="stat-val warning">12/12</span>
          </Card>
        </div>

        {/* Time Tracker */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Clock size={16} style={{ color: 'var(--color-primary)' }} />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Time Tracker
            </h4>
          </div>
          <div className="tracker-row">
            <div className="tracker-time">
              {formatTrackerTime(trackerSeconds)}
            </div>
            <div className="tracker-controls">
              <TextButton 
                variant={trackerRunning ? 'danger' : 'primary'}
                onClick={() => setTrackerRunning(!trackerRunning)}
                icon={trackerRunning ? <Pause size={14} /> : <Play size={14} />}
              >
                {trackerRunning ? 'Pause' : 'Start'}
              </TextButton>
            </div>
          </div>
        </Card>

        {/* Remarks */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Remarks for Today
            </h4>
          </div>
          <textarea
            className="remarks-textarea"
            placeholder="Type your notes or reflections for today..."
            value={remarks}
            onChange={(e) => saveRemarksText(e.target.value)}
          />
        </Card>
      </section>

      {/* RIGHT COLUMN: Recent Achievements */}
      <section>
        <Card style={{ height: '100%' }}>
          <div className="achievements-card-header">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Achievements</h3>
            <button 
              className="header-icon-btn" 
              style={{ width: '32px', height: '32px' }}
              onClick={() => setIsAddModalOpen(true)}
              title="Add Achievement"
              aria-label="Log new achievement"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="achievements-list">
            {achievements.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', fontSize: '0.875rem' }}>
                No achievements logged yet. Click "+" to log your first win!
              </div>
            ) : (
              achievements.slice(0, 5).map((ach) => (
                <div key={ach.id} className="achievement-list-item">
                  <div className="achievement-item-info">
                    <span className="achievement-item-title">{ach.title}</span>
                    {ach.description && <span className="achievement-item-desc">{ach.description}</span>}
                  </div>
                  <div className="achievement-item-actions">
                    <button 
                      onClick={() => deleteAchievementItem(ach.id)}
                      style={{
                        background: 'transparent', 
                        border: 'none', 
                        color: 'var(--color-danger)', 
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Delete Achievement"
                      aria-label={`Delete achievement ${ach.title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>

      {/* ADD ACHIEVEMENT MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log New Achievement"
      >
        <form onSubmit={handleAddAchievementSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            id="ach-title"
            label="Achievement Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Read for 30 minutes"
            required
          />
          <TextField
            id="ach-desc"
            label="Description (Optional)"
            type="textarea"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="e.g. Finished chapter 5 in Atomic Habits"
          />
          <div className="modal-footer" style={{ marginTop: '0.5rem' }}>
            <TextButton onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </TextButton>
            <SubmitButton loading={isSubmitting}>
              Log Achievement
            </SubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
