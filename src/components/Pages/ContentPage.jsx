import React from 'react';
import { useApp } from '../../context/AppContext';
import HomePage from './HomePage';
import AchievementPage from './AchievementPage';
import TemplatePage from './TemplatePage';

const ContentPage = () => {
  const { activePage } = useApp();

  switch (activePage) {
    case 'Home':
      return <HomePage />;
    case 'Achievements':
      return <AchievementPage />;
    case 'Template':
      return <TemplatePage />;
    default:
      return <HomePage />;
  }
};

export default ContentPage;
