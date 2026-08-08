import React from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { Bell, Sparkles, ShieldCheck, Tag } from 'lucide-react';

export default function AnnouncementsPage() {
  const announcements = [
    {
      version: 'v1.0.0',
      date: 'August 2026',
      title: 'Cipherly Official Public Release',
      badge: 'Major Release',
      content: 'We are thrilled to announce the official release of Cipherly Zero-Trust Encryption Suite v1.0.0 for Linux and Windows. Featuring Argon2id key derivation, AES-256-GCM / XChaCha20-Poly1305 ciphers, and Gutmann file shredding.'
    },
    {
      version: 'v0.9.5-beta',
      date: 'July 2026',
      title: 'Steganography Carrier Engine Integration',
      badge: 'Feature Update',
      content: 'Added LSB image steganography enabling users to conceal encrypted vault streams directly inside PNG and WebP carrier files.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <SecurityBadge text="Release Notes & Security Bulletins" variant="cyan" />
        <h1 className="text-4xl font-extrabold text-white">Announcements & Updates</h1>
        <p className="text-slate-300 text-sm">
          Stay informed on the latest features, security audits, and version releases for Cipherly.
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((item, idx) => (
          <div key={idx} className="p-6 md:p-8 rounded-2xl bg-glass border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold">
                  {item.version}
                </span>
                <span className="text-xs font-mono text-slate-400">{item.date}</span>
              </div>
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                {item.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
