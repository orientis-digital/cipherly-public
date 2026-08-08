import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { Shield, Globe, Mail, Copy, Check, Lock, Terminal, Cpu } from 'lucide-react';

export default function AboutPage() {
  const { addToast } = useApp();
  const [copiedKey, setCopiedKey] = useState(false);

  const pgpKeyFingerprint = "4F92 B71C 8A0E 3F5B 920D  117E E8A4 C90F 2B5A 631C";

  const copyPgp = () => {
    navigator.clipboard.writeText(pgpKeyFingerprint);
    setCopiedKey(true);
    addToast('Orientis Digital PGP Fingerprint copied', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Developed by Orientis Digital" variant="cyan" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">About Cipherly & Orientis Digital</h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Orientis Digital builds software for a privacy-conscious world. We engineer uncompromising, local-first tools designed to protect personal data from state-level surveillance and corporate tracking.
        </p>
      </div>

      {/* Manifesto Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-glass border border-slate-800 space-y-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Zero Telemetry</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We never track users, IP addresses, device identifiers, or usage statistics. Your software runs entirely in isolation on your machine.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-glass border border-slate-800 space-y-3">
          <Terminal className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Open Source</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All source code is publicly accessible on GitHub under the permissive MIT license. Independent security researchers are welcome to audit.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-glass border border-slate-800 space-y-3">
          <Cpu className="w-8 h-8 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Local First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cryptographic operations (encryption, hashing, shredding) execute in client-side RAM without relying on remote API calls.
          </p>
        </div>
      </div>

      {/* PGP Security Fingerprint Box */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Orientis Digital Official PGP Fingerprint</h3>
          </div>
          <button
            onClick={copyPgp}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline"
          >
            {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey ? 'Copied' : 'Copy Fingerprint'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
          {pgpKeyFingerprint}
        </div>
        <p className="text-xs text-slate-400">
          Use this PGP fingerprint to verify release artifact signatures or encrypt sensitive vulnerability disclosures.
        </p>
      </div>

    </div>
  );
}
