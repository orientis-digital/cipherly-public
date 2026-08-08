import React from 'react';
import { Link } from 'react-router-dom';
import SecurityBadge from '../components/SecurityBadge';
import EncryptionSimulator from '../components/EncryptionSimulator';
import PasswordEntropyCalculator from '../components/PasswordEntropyCalculator';
import { 
  Shield, Lock, Cpu, EyeOff, Zap, FileSpreadsheet, Download, CheckCircle2, 
  ArrowRight, Key, Layers, RefreshCw, AlertTriangle, ChevronRight, Terminal, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { addToast } = useApp();

  const features = [
    {
      icon: Shield,
      title: 'Zero-Trust Local Encryption',
      desc: 'All cryptographic ops execute strictly client-side. Your raw keys and unencrypted payloads never leave device memory.',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    {
      icon: Key,
      title: 'Argon2id Key Hardening',
      desc: 'Protects against GPU & ASIC brute-force clusters using memory-hard Argon2id key derivation (64MB memory cost).',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20'
    },
    {
      icon: Zap,
      title: 'Gutmann File Shredder',
      desc: 'Permanently destroy sensitive files with DoD 5220.22-M 3-pass or Gutmann 35-pass entropy overwrite before unlinking.',
      color: 'text-yellow-400',
      border: 'border-yellow-500/20'
    },
    {
      icon: EyeOff,
      title: 'Steganographic Carrier Engine',
      desc: 'Hide encrypted ciphertexts inside innocent carrier images (PNG/WebP) using unnoticeable LSB spatial encoding.',
      color: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    {
      icon: Layers,
      title: 'Dual Cipher Engine',
      desc: 'Seamlessly switch between NIST-standard AES-256-GCM (Hardware accelerated) and modern XChaCha20-Poly1305.',
      color: 'text-blue-400',
      border: 'border-blue-500/20'
    },
    {
      icon: Terminal,
      title: 'Zero Telemetry Guarantee',
      desc: 'No cloud dependencies, no analytics, no external tracking servers. 100% open-source and audit-friendly architecture.',
      color: 'text-rose-400',
      border: 'border-rose-500/20'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-block">
            <SecurityBadge text="Zero-Trust Architecture • Military-Grade Cryptography" variant="cyan" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Your Keys. Your Files. <br />
            <span className="text-gradient-cyan">Zero Compromise.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Cipherly is an open-source, local-first zero-trust encryption suite designed to secure sensitive files, derive resilient cryptographic keys, and shred data beyond recovery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/downloads"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Download Desktop Vault</span>
            </Link>

            <a
              href="#demo-lab"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition-all"
            >
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Try Cipher Lab Live</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 text-xs font-mono text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>100% Local Processing</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Cloud Accounts</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Open Source Architecture</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cross-Platform Linux & Windows</span>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE ENCRYPTION LAB */}
      <section id="demo-lab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-3">
          <SecurityBadge text="In-Browser Cryptographic Sandbox" variant="emerald" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience Zero-Trust Encryption Live</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Test actual client-side AES-256-GCM encryption derived with PBKDF2/SHA-256 right in your web browser. No data ever reaches any server.
          </p>
        </div>

        <EncryptionSimulator />
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Engine Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Engineered for Absolute Confidentiality</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Built from the ground up using state-of-the-art cryptographic primitives and zero-knowledge paradigms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-slate-900/60 border ${f.border} bg-glass-hover transition-all space-y-4 group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform ${f.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PASSWORD ENTROPY & SECURITY TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Cryptographic Resilience</span>
          <h2 className="text-3xl font-bold text-white">Interactive Passphrase Strength Estimator</h2>
        </div>

        <PasswordEntropyCalculator />
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">Why Cipherly?</span>
          <h2 className="text-3xl font-bold text-white">Cipherly vs Traditional Encryption</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-glass border border-slate-800 shadow-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-4">Feature / Paradigm</th>
                <th className="p-4 text-cyan-400 font-bold">Cipherly Vault</th>
                <th className="p-4 text-slate-400">Cloud Storage Vaults</th>
                <th className="p-4 text-slate-400">Standard Zip Passwords</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-4 font-semibold text-white">Encryption Standard</td>
                <td className="p-4 text-cyan-400 font-bold">AES-256-GCM / XChaCha20</td>
                <td className="p-4 text-slate-400">AES-256 (Server Managed)</td>
                <td className="p-4 text-slate-400">ZipCrypto (Legacy Vulnerable)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Key Derivation Function</td>
                <td className="p-4 text-emerald-400 font-bold">Argon2id (Memory Hard)</td>
                <td className="p-4 text-slate-400">PBKDF2 / Vendor KMS</td>
                <td className="p-4 text-slate-400">None (Plain Hash)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Data Storage Location</td>
                <td className="p-4 text-cyan-400 font-bold">100% Local Machine Only</td>
                <td className="p-4 text-slate-400">Third-Party Cloud Servers</td>
                <td className="p-4 text-slate-400">Local</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Telemetry & Analytics</td>
                <td className="p-4 text-emerald-400 font-bold">Zero Telemetry (Disabled)</td>
                <td className="p-4 text-slate-400">Extensive User Metrics</td>
                <td className="p-4 text-slate-400">N/A</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">File Shredding Standard</td>
                <td className="p-4 text-cyan-400 font-bold">35-Pass Gutmann / DoD</td>
                <td className="p-4 text-slate-400">Soft Delete / Bin</td>
                <td className="p-4 text-slate-400">Standard OS Unlink</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border border-cyan-500/30 p-8 md:p-14 overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Take Control of Your Cryptographic Privacy Today.
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            No registration, no credit cards, no telemetry. Download the standalone executable for Linux or Windows and lock down your sensitive data.
          </p>

          <div className="pt-2">
            <Link
              to="/downloads"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Get Cipherly v1.0.0 Now</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
