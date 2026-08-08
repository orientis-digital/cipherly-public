import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Mail, Globe, Lock, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Cipherly</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-Trust Encryption Suite & Cryptographic Vault. Built for paranoid security professionals, journalists, and privacy advocates.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Telemetry Verified</span>
            </div>
          </div>

          {/* Column 2: Architecture & Specs */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Cryptographic Standards</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="hover:text-cyan-400 transition-colors">• AES-256-GCM (AEAD)</li>
              <li className="hover:text-cyan-400 transition-colors">• XChaCha20-Poly1305</li>
              <li className="hover:text-cyan-400 transition-colors">• Argon2id Key Derivation</li>
              <li className="hover:text-cyan-400 transition-colors">• Gutmann & DoD 5220.22-M Shred</li>
              <li className="hover:text-cyan-400 transition-colors">• Steganographic Carrier Embed</li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/downloads" className="hover:text-cyan-400 transition-colors">Download AppImage / DEB / ZIP</Link></li>
              <li><Link to="/docs" className="hover:text-cyan-400 transition-colors">Zero-Trust Security Whitepaper</Link></li>
              <li><Link to="/faq" className="hover:text-cyan-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/announcements" className="hover:text-cyan-400 transition-colors">Security Advisories & Releases</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Orientis Digital PGP Keys</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-4">Orientis Digital</h4>
            <p className="text-xs text-slate-400 mb-4">
              Open-source software developed by Orientis Digital. Engineered with zero backdoors.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/orientis-digital/cipherly-public"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:orientisdigital.official@gmail.com"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Security Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://orientisdigital.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Orientis Digital Official Site"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Orientis Digital. All Rights Reserved. Released under the MIT License.</p>
          <div className="flex items-center gap-6">
            <span>Built with React 19 & Tailwind</span>
            <span>Cloudflare Pages Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
