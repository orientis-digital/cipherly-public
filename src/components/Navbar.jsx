import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Download, BookOpen, HelpCircle, Info, Bell, Menu, X, Cpu, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Downloads', path: '/downloads', icon: Download },
    { name: 'Documentation', path: '/docs', icon: BookOpen },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Announcements', path: '/announcements', icon: Bell },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Cipherly
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                  v1.0.0
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 tracking-wider">Zero-Trust Suite</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Download CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/downloads"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Get Cipherly</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-6 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/downloads"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold shadow-lg"
          >
            Get Cipherly Free
          </Link>
        </div>
      )}
    </nav>
  );
}
