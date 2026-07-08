import React from 'react';
import { useApp } from '../../context/AppContext';

const NavSelector = () => {
  const { activePage, setActivePage } = useApp();
  const tabs = ['Home', 'Achievements', 'Template'];

  return (
    <nav className="nav-selector" aria-label="Main Navigation">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-pill ${activePage === tab ? 'active' : ''}`}
          onClick={() => setActivePage(tab)}
        >
          {tab === 'Template' ? 'Templates' : tab}
        </button>
      ))}
    </nav>
  );
};

export default NavSelector;
