import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../Common/Card';
import TextButton from '../Common/TextButton';
import Modal from '../Common/Modal';
import TextField from '../Common/TextField';
import SubmitButton from '../Common/SubmitButton';
import { Plus, Trash2, Award } from 'lucide-react';

const AchievementPage = () => {
  const { achievements, addNewAchievement, deleteAchievementItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      await addNewAchievement({ title, description });
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      <div className="page-header-row">
        <h1 className="page-title">Achievements</h1>
        <TextButton 
          variant="primary" 
          onClick={() => setIsModalOpen(true)}
          icon={<Plus size={16} />}
        >
          New Achievement
        </TextButton>
      </div>

      {achievements.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <Award size={48} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem', opacity: 0.7 }} />
          <h3>No achievements yet</h3>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Start recording your daily wins to build consistency!</p>
        </Card>
      ) : (
        <div className="items-grid">
          {achievements.map((ach) => (
            <Card key={ach.id} style={{ borderLeft: '4px solid var(--color-success)' }}>
              <div className="item-card-inner">
                <h3 className="item-card-title">{ach.title}</h3>
                <p className="item-card-desc">{ach.description || 'No description provided.'}</p>
                <div className="item-card-footer">
                  <span className="badge">{ach.date}</span>
                  <TextButton 
                    variant="danger" 
                    onClick={() => deleteAchievementItem(ach.id)}
                    icon={<Trash2 size={14} />}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Delete
                  </TextButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Achievement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Achievement"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <TextField
            id="ach-page-title"
            label="Achievement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you accomplish?"
            required
          />
          <TextField
            id="ach-page-desc"
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add context or notes..."
          />
          <div className="modal-footer">
            <TextButton onClick={() => setIsModalOpen(false)}>
              Cancel
            </TextButton>
            <SubmitButton loading={isSubmitting}>
              Add Achievement
            </SubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AchievementPage;
