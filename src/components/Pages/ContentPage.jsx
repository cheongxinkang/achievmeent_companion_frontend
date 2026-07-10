import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { PAGES } from '../../constants';
import HomePage from './HomePage';
import AchievementPage from './AchievementPage';
import TemplatePage from './TemplatePage';

const ContentPage = () => {
  const { activePage } = useAppData();

  switch (activePage) {
    case PAGES.HOME:
      return <HomePage />;
    case PAGES.ACHIEVEMENTS:
      return <AchievementPage />;
    case PAGES.TEMPLATE:
      return <TemplatePage />;
    default:
      return <HomePage />;
  }
};

export default ContentPage;
