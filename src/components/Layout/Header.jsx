import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useAuth();

  const handleNotificationClick = () => {
    alert("Notification Companion: You have no new notifications! Keep up the good work.");
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        Achievement Companion
      </div>
      
      {user && (
        <div className="header-actions">
          <button 
            className="header-icon-btn" 
            onClick={handleNotificationClick}
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell size={20} />
          </button>
          
          <div className="user-badge" title={`Logged in as ${user.username}`}>
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span>{user.username}</span>
          </div>

          <button 
            className="header-icon-btn" 
            onClick={logoutUser}
            title="Log Out"
            aria-label="Log out of application"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
