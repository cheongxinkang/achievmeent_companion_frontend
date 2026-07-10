import React, { useState } from 'react';
import Modal from '../Common/Modal';
import TextField from '../Common/TextField';
import TextButton from '../Common/TextButton';
import SubmitButton from '../Common/SubmitButton';
import { MILESTONE_STATUS } from '../../constants';
import { useAppData } from '../../context/AppDataContext';

export const DEFAULT_MILESTONES_TEXT = "Set up project\nDraft implementation plan\nExecute core development\nRun validation tests\nFinal release deployment";

const CreateAchievementModal = ({ isOpen, onClose }) => {
  const { addNewAchievement } = useAppData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pointsReward, setPointsReward] = useState('100');
  const [ticketsReward, setTicketsReward] = useState('20');
  const [milestonesText, setMilestonesText] = useState(DEFAULT_MILESTONES_TEXT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);

    // Parse rewards
    const rewards = [];
    if (pointsReward.trim()) {
      rewards.push({
        id: crypto.randomUUID(),
        type: 'points',
        value: parseInt(pointsReward) || 0,
        label: `${pointsReward} $$`,
        detail: `${pointsReward} Experience Points awarded on completion`
      });
    }
    if (ticketsReward.trim()) {
      rewards.push({
        id: crypto.randomUUID(),
        type: 'tickets',
        value: parseInt(ticketsReward) || 0,
        label: `${ticketsReward} 🎟️`,
        detail: `${ticketsReward} Premium reward tickets`
      });
    }

    // Parse milestones
    const milestones = milestonesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((mTitle) => ({
        id: crypto.randomUUID(),
        title: mTitle,
        status: MILESTONE_STATUS.IDLE
      }));

    try {
      await addNewAchievement({
        title,
        description,
        date,
        rewards,
        milestones
      });
      setTitle('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setPointsReward('100');
      setTicketsReward('20');
      setMilestonesText(DEFAULT_MILESTONES_TEXT);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Achievement Project"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <TextField
          id="create-project-title"
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Project Reminisce"
          required
        />

        <TextField
          id="create-project-desc"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide context or notes about this project..."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <TextField
            id="create-project-date"
            label="Target Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            id="create-project-pts"
            label="XP Reward ($$)"
            type="number"
            value={pointsReward}
            onChange={(e) => setPointsReward(e.target.value)}
            placeholder="e.g. 100"
          />
        </div>

        <TextField
          id="create-project-tix"
          label="Ticket Reward (🎟️)"
          type="number"
          value={ticketsReward}
          onChange={(e) => setTicketsReward(e.target.value)}
          placeholder="e.g. 20"
        />

        <TextField
          id="create-project-milestones"
          label="Milestones Checklist (one per line)"
          type="textarea"
          value={milestonesText}
          onChange={(e) => setMilestonesText(e.target.value)}
          placeholder="e.g. First Draft&#10;Coding core mechanics&#10;Testing release"
        />

        <div className="modal-footer" style={{ marginTop: '0.5rem' }}>
          <TextButton type="button" onClick={onClose}>
            Cancel
          </TextButton>
          <SubmitButton loading={isSubmitting}>
            Create Project
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAchievementModal;
