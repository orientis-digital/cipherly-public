import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { BookOpen, Shield, Key, Cpu, EyeOff, Terminal, Copy, Check } from 'lucide-react';

export default function DocsPage() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState(null);

  const sections = [
    { id: 'overview', name: '1. Architecture & Threat Model', icon: Shield },
    { id: 'ciphers', name: '2. Cryptographic Ciphers (AES / XChaCha)', icon: Cpu },
    { id: 'argon2id', name: '3. Key Derivation (Argon2id)', icon: Key },
    { id: 'shredder', name: '4. Gutmann File Shredder', icon: Terminal },
    { id: 'steganography', name: '5. Steganography Engine', icon: EyeOff },
  ];

  const copySnippet = (code, label) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    addToast(`Copied ${label} snippet to clipboard`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <SecurityBadge text="Official Documentation • Zero-Trust Specification" variant="cyan" />
        <h1 className="text-4xl font-extrabold text-white">Cipherly Technical Documentation</h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Comprehensive guide to Cipherly's cryptographic architecture, zero-trust storage paradigms, and key derivation standards.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">Table of Contents</span>
          <div className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-3 transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-glass border border-slate-800 space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                1. Architecture & Threat Model
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cipherly operates strictly under a <strong>Zero-Trust Local Execution Paradigm</strong>. The application assumes all external networks, cloud backends, and swap devices are untrusted or actively monitored.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                <h4 className="text-cyan-400 font-bold">Threat Mitigation Guarantees:</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                  <li><strong>Zero Key Exfiltration:</strong> Master passphrase is never stored on disk or transmitted over network sockets.</li>
                  <li><strong>Memory Hardness:</strong> Argon2id parameter bounds prevent brute-forcing via specialized FPGA/ASIC hardware.</li>
                  <li><strong>Authenticated Ciphertext:</strong> Every encrypted block includes an HMAC tag (GCM Tag or Poly1305 MAC) to detect tampering before decryption.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ciphers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                2. Cryptographic Ciphers
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cipherly provides two authenticated encryption algorithms (AEAD):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-cyan-400 font-bold">AES-256-GCM</h4>
                  <p className="text-slate-400">Galois/Counter Mode utilizing 256-bit symmetric key + 96-bit random IV. Hardware accelerated via AES-NI CPU instructions.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-emerald-400 font-bold">XChaCha20-Poly1305</h4>
                  <p className="text-slate-400">Extended nonce 192-bit Stream cipher. Eliminates nonce reuse risks in distributed or multi-file encryption tasks.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'argon2id' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6 text-emerald-400" />
                3. Argon2id Key Derivation
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passphrases are transformed into 256-bit master keys using the winner of the Password Hashing Competition (PHC), Argon2id.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Argon2id Config Specs:</span>
                  <button
                    onClick={() => copySnippet('Memory: 64 MB | Time Iterations: 4 | Parallelism Threads: 4', 'Argon2 Specs')}
                    className="text-cyan-400 flex items-center gap-1 hover:underline"
                  >
                    {copiedCode === 'Argon2 Specs' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-emerald-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
{`m_cost: 65536  // 64 MB RAM
t_cost: 4      // 4 iterations
p_cost: 4      // 4 parallel threads
hashLen: 32    // 256-bit output key`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'shredder' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-6 h-6 text-yellow-400" />
                4. Gutmann File Shredder
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Standard file deletion merely updates filesystem pointers. Cipherly's shredder overwrites raw file sectors with entropy patterns prior to unlinking:
              </p>
              <ul className="text-xs font-mono text-slate-400 space-y-2 list-disc list-inside p-4 rounded-xl bg-slate-950 border border-slate-800">
                <li><strong>DoD 5220.22-M:</strong> 3-pass overwrite (Pass 1: Zeros, Pass 2: Ones, Pass 3: CSPRNG Random).</li>
                <li><strong>Gutmann 35-Pass Standard:</strong> 35-pass pattern rotation targeting magnetic drive hysteresis.</li>
              </ul>
            </div>
          )}

          {activeTab === 'steganography' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <EyeOff className="w-6 h-6 text-purple-400" />
                5. Steganography Engine
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cipherly allows users to embed encrypted payload byte streams into PNG or WebP carrier images. By substituting the Least Significant Bit (LSB) of RGB pixel channels, the image appearance remains visually identical to human eyes while housing a hidden cryptographic vault.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
