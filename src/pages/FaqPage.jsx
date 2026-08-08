import React, { useState } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { Search, ChevronDown, HelpCircle, ShieldAlert, Key } from 'lucide-react';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Does Cipherly store my master passphrase or keys on any server?',
      a: 'No. Cipherly is built under a 100% zero-trust, local-first paradigm. Your passphrase is processed only in volatile memory (RAM) and never saved to disk or transmitted to any server.',
      category: 'Privacy'
    },
    {
      q: 'What happens if I forget my Master Passphrase?',
      a: 'Because Cipherly does not maintain backdoors or escrow keys, lost master passphrases cannot be recovered by Orientis Digital or anyone else. We strongly advise backing up your passphrase in a secure physical location or password manager.',
      category: 'Vault Recovery'
    },
    {
      q: 'What encryption algorithms does Cipherly use?',
      a: 'Cipherly supports AES-256-GCM (Hardware accelerated via AES-NI) and XChaCha20-Poly1305. Both provide Authenticated Encryption with Associated Data (AEAD) to prevent ciphertext tampering.',
      category: 'Cryptography'
    },
    {
      q: 'Is Cipherly open-source and auditable?',
      a: 'Yes! The codebase is 100% open-source under the MIT license on GitHub. Anyone can inspect, build, and verify the cryptographic integrity of the application.',
      category: 'General'
    },
    {
      q: 'How does the Gutmann File Shredder work?',
      a: 'When you shred a file using Cipherly, the application overwrites the file’s raw sectors with 3-pass DoD or 35-pass Gutmann pseudo-random bit patterns before unlinking it from the filesystem.',
      category: 'Security'
    },
    {
      q: 'Can I use Cipherly on Linux and Windows?',
      a: 'Yes! We provide standalone AppImage, Debian DEB, and tarball packages for Linux, as well as standalone portable ZIP binaries for 64-bit Windows.',
      category: 'General'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <SecurityBadge text="Frequently Asked Questions" variant="cyan" />
        <h1 className="text-4xl font-extrabold text-white">Have Questions? We Have Answers.</h1>
        <p className="text-slate-300 text-sm">
          Everything you need to know about Cipherly's zero-trust model, key derivation, and file vault security.
        </p>

        {/* Search Bar */}
        <div className="relative pt-4">
          <Search className="absolute left-4 top-7 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords (e.g. Passphrase, AES-256, Shredder)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500/50 shadow-xl"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No matching questions found for "{searchTerm}".
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-glass border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-100 text-base hover:text-cyan-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p>{faq.a}</p>
                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>Category: {faq.category}</span>
                      <span>Verified Zero-Trust</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
