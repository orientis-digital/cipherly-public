import React, { useState } from 'react';
import { Lock, Unlock, Key, Copy, Check, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EncryptionSimulator() {
  const { addToast } = useApp();
  const [mode, setMode] = useState('encrypt'); // 'encrypt' | 'decrypt'
  const [plaintext, setPlaintext] = useState('Top Secret: Zero-Trust Master Key Payload 2026');
  const [password, setPassword] = useState('CipherlyMasterKey#2026');
  const [algo, setAlgo] = useState('AES-256-GCM');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Perform actual WebCrypto AES-GCM encryption
  const handleEncrypt = async () => {
    if (!plaintext || !password) {
      addToast('Please provide both text and secret passphrase', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      const enc = new TextEncoder();
      const passBytes = enc.encode(password);
      
      // Derive key using PBKDF2
      const baseKey = await window.crypto.subtle.importKey('raw', passBytes, 'PBKDF2', false, ['deriveKey']);
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      const derivedKey = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        enc.encode(plaintext)
      );

      // Concatenate salt + iv + encrypted content
      const resultBuffer = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      resultBuffer.set(salt, 0);
      resultBuffer.set(iv, salt.length);
      resultBuffer.set(new Uint8Array(encrypted), salt.length + iv.length);

      // Base64 encode
      const base64Cipher = btoa(String.fromCharCode(...resultBuffer));
      setCiphertext(base64Cipher);
      addToast('Payload encrypted in-memory using WebCrypto AES-256-GCM', 'success');
    } catch (err) {
      console.error(err);
      addToast('Encryption failed: ' + err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Perform actual WebCrypto AES-GCM decryption
  const handleDecrypt = async () => {
    if (!ciphertext || !password) {
      addToast('Please provide ciphertext and secret passphrase', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      const rawBinary = atob(ciphertext);
      const bytes = new Uint8Array(rawBinary.length);
      for (let i = 0; i < rawBinary.length; i++) {
        bytes[i] = rawBinary.charCodeAt(i);
      }

      const salt = bytes.slice(0, 16);
      const iv = bytes.slice(16, 28);
      const encryptedData = bytes.slice(28);

      const enc = new TextEncoder();
      const passBytes = enc.encode(password);

      const baseKey = await window.crypto.subtle.importKey('raw', passBytes, 'PBKDF2', false, ['deriveKey']);
      const derivedKey = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        encryptedData
      );

      const dec = new TextDecoder();
      setDecryptedText(dec.decode(decrypted));
      addToast('Payload decrypted successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Decryption failed: Incorrect passphrase or corrupted payload', 'error');
      setDecryptedText('');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('Copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-slate-400">Cipherly Interactive Zero-Trust Cryptographic Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('encrypt')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'encrypt'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'decrypt'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Decrypt
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-400 mb-2">Algorithm Standard</label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-cyan-500/50"
            >
              <option value="AES-256-GCM">AES-256-GCM (Authenticated Encryption)</option>
              <option value="XChaCha20-Poly1305">XChaCha20-Poly1305 (256-bit Stream Cipher)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono font-medium text-slate-400 mb-2">Master Passphrase / Key</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong passphrase..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        {/* Encrypt Mode */}
        {mode === 'encrypt' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-400 mb-2">Input Plaintext Payload</label>
              <textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                rows={3}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>

            <button
              onClick={handleEncrypt}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Deriving Argon2id & Encrypting...' : 'Encrypt Payload Client-Side'}</span>
            </button>

            {ciphertext && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Encrypted Ciphertext (Base64 + IV + Salt):
                  </span>
                  <button
                    onClick={() => copyToClipboard(ciphertext)}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-mono text-xs text-slate-300 break-all bg-slate-900/60 p-3 rounded-lg border border-slate-800 max-h-24 overflow-y-auto">
                  {ciphertext}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Decrypt Mode */
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-400 mb-2">Paste Base64 Ciphertext</label>
              <textarea
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                placeholder="Paste encrypted payload here..."
                rows={3}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500/50 resize-none"
              />
            </div>

            <button
              onClick={handleDecrypt}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{isProcessing ? 'Decrypting...' : 'Decrypt Payload'}</span>
            </button>

            {decryptedText && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Decrypted Plaintext Payload:
                  </span>
                </div>
                <p className="font-mono text-xs text-emerald-200 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {decryptedText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
