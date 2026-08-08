import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';

// Pages
import HomePage from './pages/HomePage';
import DownloadsPage from './pages/DownloadsPage';
import DocsPage from './pages/DocsPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import Error404Page from './pages/Error404Page';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#070a11] text-slate-100 bg-grid-pattern relative">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </main>
        <Footer />
        <NotificationToast />
      </div>
    </AppProvider>
  );
}
