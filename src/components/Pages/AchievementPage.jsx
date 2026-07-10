import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { MILESTONE_STATUS, STATUS_FILTER } from '../../constants';
import { getAchievementProgress } from '../../utils/achievements';
import Card from '../Common/Card';
import AchievementCard from '../Achievements/AchievementCard';
import CreateAchievementModal from '../Achievements/CreateAchievementModal';
import MilestonesModal from '../Achievements/MilestonesModal';
import AchievementSidebar from '../Achievements/AchievementSidebar';
import { Award } from 'lucide-react';

const AchievementPage = () => {
  const { achievements, updateAchievementItem, deleteAchievementItem } = useAppData();
  
  // Page Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTER.ALL);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Toggle milestone status inside the modal
  const handleToggleMilestone = async (project, milestoneId) => {
    const updatedMilestones = project.milestones.map((m) => {
      if (m.id === milestoneId) {
        return { ...m, status: m.status === MILESTONE_STATUS.SUCCESS ? MILESTONE_STATUS.IDLE : MILESTONE_STATUS.SUCCESS };
      }
      return m;
    });

    try {
      const updated = await updateAchievementItem(project.id, { milestones: updatedMilestones });
      setSelectedProject(updated);
    } catch (err) {
      console.error('Failed to update milestone status:', err);
    }
  };

  const handleOpenMilestones = (project) => {
    setSelectedProject(project);
    setIsMilestoneModalOpen(true);
  };

  const handleDeleteProject = async (id) => {
    await deleteAchievementItem(id);
    setIsMilestoneModalOpen(false);
    setSelectedProject(null);
  };

  // Filter logic
  const filteredAchievements = achievements.filter((ach) => {
    const matchesSearch =
      ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ach.description && ach.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const { isCompleted } = getAchievementProgress(ach);

    let matchesStatus = true;
    if (statusFilter === STATUS_FILTER.COMPLETED) {
      matchesStatus = isCompleted;
    } else if (statusFilter === STATUS_FILTER.ACTIVE) {
      matchesStatus = !isCompleted;
    }

    return matchesSearch && matchesStatus;
  });

  // Calculate overall stats for sidebar
  const totalProjects = achievements.length;
  const completedProjects = achievements.filter((ach) => getAchievementProgress(ach).isCompleted).length;

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      <div className="achievement-page-grid">
        
        {/* LEFT COLUMN: Main Achievements List */}
        <section className="achievement-list-container">
          <div className="page-header-row" style={{ marginBottom: '0.5rem' }}>
            <h1 className="page-title">Achievements</h1>
          </div>

          {filteredAchievements.length === 0 ? (
            <Card style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
              <Award size={56} style={{ color: 'var(--color-primary)', margin: '0 auto 1.25rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>No achievements match your filters</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                Try adjusting your search queries or create a brand new achievement project!
              </p>
            </Card>
          ) : (
            filteredAchievements.map((ach) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                onOpenMilestones={handleOpenMilestones}
                onToggleMilestone={handleToggleMilestone}
              />
            ))
          )}
        </section>

        {/* RIGHT COLUMN: Sidebar controls */}
        <AchievementSidebar
          onCreateClick={() => setIsCreateModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          totalProjects={totalProjects}
          completedProjects={completedProjects}
        />
      </div>

      {/* Creation Modal */}
      <CreateAchievementModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Milestones Checklist Details Modal */}
      <MilestonesModal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        project={selectedProject}
        onToggleMilestone={handleToggleMilestone}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default AchievementPage;
