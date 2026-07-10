import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import Card from '../Common/Card';
import TextButton from '../Common/TextButton';
import Modal from '../Common/Modal';
import TextField from '../Common/TextField';
import SubmitButton from '../Common/SubmitButton';
import { Plus, LayoutGrid } from 'lucide-react';

const TemplatePage = () => {
  const { templates, addNewTemplate } = useAppData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Habit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usedTemplateId, setUsedTemplateId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    setError('');
    try {
      await addNewTemplate({ title, description, category });
      setTitle('');
      setDescription('');
      setCategory('Habit');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create template. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseTemplate = (id) => {
    setUsedTemplateId(id);
    setTimeout(() => {
      setUsedTemplateId(null);
    }, 1500);
  };

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      <div className="page-header-row">
        <h1 className="page-title">Templates</h1>
        <TextButton 
          variant="primary" 
          onClick={() => setIsModalOpen(true)}
          icon={<Plus size={16} />}
        >
          New Template
        </TextButton>
      </div>

      {templates.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <LayoutGrid size={48} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem', opacity: 0.7 }} />
          <h3>No templates found</h3>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Create templates to quickly log standard achievements.</p>
        </Card>
      ) : (
        <div className="items-grid">
          {templates.map((temp) => (
            <Card key={temp.id} style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <div className="item-card-inner">
                <h3 className="item-card-title">{temp.title}</h3>
                <p className="item-card-desc">{temp.description || 'No description template provided.'}</p>
                <div className="item-card-footer">
                  <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)' }}>
                    {temp.category}
                  </span>
                  <TextButton 
                    variant={usedTemplateId === temp.id ? 'success' : 'primary'} 
                    onClick={() => handleUseTemplate(temp.id)}
                    disabled={usedTemplateId !== null}
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {usedTemplateId === temp.id ? '✓ Created' : 'Use Template'}
                  </TextButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Template"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <TextField
            id="temp-title"
            label="Template Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Clean Bedroom"
            required
          />
          
          <TextField
            id="temp-category"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Habit, Chores, Study, Work"
            required
          />

          <TextField
            id="temp-desc"
            label="Description template"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Put away laundry, sweep, vacuum, dust shelves"
          />

          {error && <div className="text-field-error" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{error}</div>}

          <div className="modal-footer">
            <TextButton onClick={() => setIsModalOpen(false)}>
              Cancel
            </TextButton>
            <SubmitButton loading={isSubmitting}>
              Add Template
            </SubmitButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TemplatePage;
