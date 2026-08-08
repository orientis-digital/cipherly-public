import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [userOS, setUserOS] = useState('Linux');

  useEffect(() => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) setUserOS('Windows');
    else if (ua.includes('Mac')) setUserOS('macOS');
    else if (ua.includes('Linux')) setUserOS('Linux');
  }, []);

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ toasts, addToast, removeToast, userOS }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
