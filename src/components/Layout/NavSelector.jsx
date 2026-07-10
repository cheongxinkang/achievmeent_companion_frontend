import { useAppData } from '../../context/AppDataContext';
import { PAGES } from '../../constants';

const NavSelector = () => {
  const { activePage, setActivePage } = useAppData();
  const tabs = [PAGES.HOME, PAGES.ACHIEVEMENTS, PAGES.TEMPLATE];

  return (
    <nav className="nav-selector" aria-label="Main Navigation">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`nav-pill ${activePage === tab ? 'active' : ''}`}
          onClick={() => setActivePage(tab)}
        >
          {tab === PAGES.TEMPLATE ? 'Templates' : tab}
        </button>
      ))}
    </nav>
  );
};

export default NavSelector;
