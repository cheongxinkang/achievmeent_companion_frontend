import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './components/Login/LoginPage';
import Header from './components/Layout/Header';
import NavSelector from './components/Layout/NavSelector';
import ContentPage from './components/Pages/ContentPage';

const AppContent = () => {
  const { user, loading } = useApp();

  if (loading && !user) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(255,255,255,0.05)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span>Syncing session details...</span>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app-container" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Header />
      <NavSelector />
      <main style={{ marginTop: '0.5rem' }}>
        <ContentPage />
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
