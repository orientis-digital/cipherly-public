import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { Download, Terminal, CheckCircle2, Copy, Shield, FileCheck, ExternalLink } from 'lucide-react';

export default function DownloadsPage() {
  const { userOS, addToast } = useApp();
  const [copiedHash, setCopiedHash] = useState(null);

  const releases = [
    {
      os: 'Linux',
      name: 'Linux AppImage (Standalone)',
      filename: 'Cipherly-1.0.0-x86_64.AppImage',
      size: '68.4 MB',
      sha256: '9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a',
      recommended: userOS === 'Linux',
      type: 'AppImage'
    },
    {
      os: 'Linux',
      name: 'Debian / Ubuntu Package',
      filename: 'cipherly_1.0.0_amd64.deb',
      size: '54.2 MB',
      sha256: '8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7',
      recommended: false,
      type: 'DEB'
    },
    {
      os: 'Linux',
      name: 'Linux Tarball Archive',
      filename: 'cipherly-1.0.0-linux-x64.tar.gz',
      size: '52.8 MB',
      sha256: '7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6',
      recommended: false,
      type: 'TAR.GZ'
    },
    {
      os: 'Windows',
      name: 'Windows Portable Bundle',
      filename: 'cipherly-1.0.0-win-x64.zip',
      size: '72.1 MB',
      sha256: '6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5',
      recommended: userOS === 'Windows',
      type: 'ZIP'
    }
  ];

  const copyHash = (hash, filename) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(filename);
    addToast(`SHA-256 hash for ${filename} copied to clipboard`, 'info');
    setTimeout(() => setCopiedHash(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <SecurityBadge text={`Detected Operating System: ${userOS}`} variant="cyan" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Download Cipherly Vault</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          All release artifacts are cryptographically signed by Orientis Digital PGP key. Download the standalone executable for your platform.
        </p>
      </div>

      {/* Download Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {releases.map((rel, idx) => (
          <div
            key={idx}
            className={`p-6 md:p-8 rounded-2xl bg-glass border transition-all space-y-6 relative overflow-hidden ${
              rel.recommended
                ? 'border-cyan-500/50 shadow-2xl shadow-cyan-950/50 bg-slate-900/90'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {rel.recommended && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono uppercase font-bold tracking-wider">
                Recommended for your OS
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Shield className="w-4 h-4" />
                <span>{rel.os} • {rel.type}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{rel.name}</h3>
              <p className="text-xs font-mono text-slate-400">File: {rel.filename} ({rel.size})</p>
            </div>

            {/* SHA-256 Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>SHA-256 Checksum:</span>
                <button
                  onClick={() => copyHash(rel.sha256, rel.filename)}
                  className="flex items-center gap-1 text-cyan-400 hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedHash === rel.filename ? 'Copied!' : 'Copy Hash'}</span>
                </button>
              </div>
              <p className="text-[10px] font-mono text-slate-400 break-all select-all">
                {rel.sha256}
              </p>
            </div>

            {/* Action Download */}
            <a
              href={`https://github.com/orientis-digital/cipherly-public/releases/download/v1.0.0/${rel.filename}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => addToast(`Starting download for ${rel.filename}...`, 'success')}
              className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                rel.recommended
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-cyan-500/25 hover:from-cyan-400 hover:to-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download {rel.type} ({rel.size})</span>
            </a>
          </div>
        ))}
      </div>

      {/* Verification Instructions */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">How to Verify File Integrity</h3>
        </div>
        <p className="text-xs text-slate-300">
          Before running any downloaded executable, verify the SHA-256 checksum against our official published hash:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
          <p className="text-slate-500"># On Linux / macOS Terminal:</p>
          <p className="select-all">sha256sum Cipherly-1.0.0-x86_64.AppImage</p>
          <p className="text-slate-500 pt-2"># On Windows PowerShell:</p>
          <p className="select-all">Get-FileHash .\cipherly-1.0.0-win-x64.zip -Algorithm SHA256</p>
        </div>
      </div>

    </div>
  );
}
