import { useState } from 'react';
import Modal from '../Common/Modal';
import TextButton from '../Common/TextButton';
import ConfirmDialog from '../Common/ConfirmDialog';
import { Check } from 'lucide-react';
import { MILESTONE_STATUS } from '../../constants';
import { getAchievementProgress } from '../../utils/achievements';

const MilestonesModal = ({ isOpen, onClose, project, onToggleMilestone, onDeleteProject }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (!project) return null;

  const { total, completed } = getAchievementProgress(project);

  const handleDeleteConfirm = async () => {
    setIsConfirmOpen(false);
    await onDeleteProject(project.id);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${project.title} Milestones`}
      >
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {project.description || 'No description provided.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
              Target Date: {project.date}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-success)' }}>
              Progress: {completed} / {total} Completed
            </span>
          </div>
        </div>

        <div className="milestones-checklist">
          {project.milestones && project.milestones.map((m) => {
            const isComp = m.status === MILESTONE_STATUS.SUCCESS;
            return (
              <div 
                key={m.id}
                className={`milestone-item-row ${isComp ? 'completed' : ''}`}
                onClick={() => onToggleMilestone(project, m.id)}
              >
                <div className="milestone-checkbox">
                  {isComp && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="milestone-item-title">{m.title}</span>
              </div>
            );
          })}
        </div>

        <div className="modal-footer" style={{ marginTop: '1rem', justifyContent: 'space-between' }}>
          <TextButton 
            variant="danger" 
            onClick={() => setIsConfirmOpen(true)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Delete Project
          </TextButton>
          <TextButton variant="primary" onClick={onClose}>
            Close
          </TextButton>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Achievement Project"
        message={`Are you sure you want to delete "${project.title}"?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </>
  );
};

export default MilestonesModal;
