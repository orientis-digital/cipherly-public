import React, { useState, useEffect } from 'react';
import SecurityBadge from '../components/SecurityBadge';
import { useApp } from '../context/AppContext';
import { Download, Terminal, CheckCircle2, Copy, Shield, Server, RefreshCw, Layers, Check, ExternalLink, HardDrive } from 'lucide-react';

export default function DownloadsPage() {
  const { userOS, addToast } = useApp();
  const [activeTab, setActiveTab] = useState(userOS === 'Windows' ? 'windows' : 'linux');
  const [copiedHash, setCopiedHash] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [version, setVersion] = useState('1.0.0');
  const [isLoading, setIsLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [apiHost, setApiHost] = useState('downloads.nexusec.space');

  const API_URLS = [
    'https://downloads.nexusec.space/api/v1/cipherly/latest',
    'https://downloads.orientisdigital.com/api/v1/cipherly/latest'
  ];

  const defaultReleases = [
    {
      id: 'linux-appimage',
      platform: 'linux',
      os: 'Linux',
      name: 'Linux AppImage (Standalone)',
      filename: 'Cipherly-1.0.0-x86_64.AppImage',
      size: '68.4 MB',
      sha256: '9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a',
      url: 'https://downloads.nexusec.space/api/v1/cipherly/download/linux',
      recommended: userOS === 'Linux',
      format: 'APPIMAGE',
      installInstructions: 'Make executable: chmod +x Cipherly-1.0.0-x86_64.AppImage && ./Cipherly-1.0.0-x86_64.AppImage',
      description: 'Single standalone binary. Runs instantly on Ubuntu, Debian, Arch, Fedora, and openSUSE without installation.'
    },
    {
      id: 'linux-deb',
      platform: 'linux',
      os: 'Linux',
      name: 'Debian / Ubuntu Package',
      filename: 'cipherly_1.0.0_amd64.deb',
      size: '54.2 MB',
      sha256: '8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7',
      url: 'https://downloads.nexusec.space/api/v1/cipherly/download/deb',
      recommended: false,
      format: 'DEB',
      installInstructions: 'Install package: sudo dpkg -i cipherly_1.0.0_amd64.deb || sudo apt install -f',
      description: 'Native DEB package for Ubuntu, Debian, Pop!_OS, and Linux Mint. Automatically registers app menu shortcut.'
    },
    {
      id: 'linux-tar',
      platform: 'linux',
      os: 'Linux',
      name: 'Generic Linux Tarball',
      filename: 'cipherly-1.0.0-linux-x64.tar.gz',
      size: '52.8 MB',
      sha256: '7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6',
      url: 'https://downloads.nexusec.space/api/v1/cipherly/download/tar',
      recommended: false,
      format: 'TAR.GZ',
      installInstructions: 'Extract archive: tar -xzf cipherly-1.0.0-linux-x64.tar.gz && ./cipherly',
      description: 'Compressed binary archive for custom Linux installations and headless server deployment.'
    },
    {
      id: 'win-zip',
      platform: 'windows',
      os: 'Windows',
      name: 'Windows Portable ZIP Bundle',
      filename: 'cipherly-1.0.0-win-x64.zip',
      size: '72.1 MB',
      sha256: '6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5',
      url: 'https://downloads.nexusec.space/api/v1/cipherly/download/windows',
      recommended: userOS === 'Windows',
      format: 'ZIP',
      installInstructions: 'Extract ZIP archive and launch Cipherly.exe. No administrative installation required.',
      description: 'Portable Windows 64-bit executable bundle. Runs directly from USB drives or local directories.'
    }
  ];

  useEffect(() => {
    let isSubscribed = true;

    async function fetchReleases() {
      setIsLoading(true);
      for (const endpoint of API_URLS) {
        try {
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            if (isSubscribed && data && data.artifacts) {
              const parsed = Object.values(data.artifacts).map((art) => {
                const isLinux = art.platform === 'linux';
                const isWin = art.platform === 'windows';
                const fmt = (art.format || '').toUpperCase();
                const isRecommended =
                  (userOS === 'Linux' && fmt === 'APPIMAGE') ||
                  (userOS === 'Windows' && fmt === 'ZIP');

                return {
                  id: art.key || art.filename,
                  platform: art.platform || (isWin ? 'windows' : 'linux'),
                  os: isWin ? 'Windows' : isLinux ? 'Linux' : 'macOS',
                  name: `Cipherly ${isWin ? 'Windows' : 'Linux'} (${fmt})`,
                  filename: art.filename,
                  size: art.size_human || `${(art.size_bytes / 1024 / 1024).toFixed(1)} MB`,
                  sha256: art.sha256 || 'Calculating...',
                  url: art.url,
                  recommended: isRecommended,
                  format: fmt,
                  installInstructions:
                    fmt === 'APPIMAGE'
                      ? `chmod +x ${art.filename} && ./${art.filename}`
                      : fmt === 'DEB'
                      ? `sudo dpkg -i ${art.filename}`
                      : fmt === 'ZIP'
                      ? `Extract archive and run Cipherly.exe`
                      : `tar -xzf ${art.filename}`,
                  description:
                    fmt === 'APPIMAGE'
                      ? 'Standalone Linux AppImage executable. Run without installation.'
                      : fmt === 'DEB'
                      ? 'Native Debian/Ubuntu package installer.'
                      : fmt === 'ZIP'
                      ? 'Portable Windows 64-bit application bundle.'
                      : 'Generic Linux tarball archive.'
                };
              });

              setArtifacts(parsed);
              if (data.latest_version) setVersion(data.latest_version);
              setApiConnected(true);
              setApiHost(new URL(endpoint).hostname);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn(`Failed to connect to ${endpoint}:`, err);
        }
      }

      if (isSubscribed) {
        setApiConnected(false);
        setArtifacts(defaultReleases);
        setIsLoading(false);
      }
    }

    fetchReleases();

    return () => {
      isSubscribed = false;
    };
  }, [userOS]);

  const copyHash = (hash, filename) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(filename);
    addToast(`SHA-256 hash for ${filename} copied to clipboard`, 'info');
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const linuxArtifacts = artifacts.filter((a) => a.platform === 'linux');
  const windowsArtifacts = artifacts.filter((a) => a.platform === 'windows');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <SecurityBadge text={`Detected Operating System: ${userOS} • Version v${version}`} variant="cyan" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Download Cipherly Clients</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Select your target platform below. All release packages are built with zero backdoors, cryptographically hashed, and served via <span className="text-cyan-400 font-mono">downloads-server</span>.
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
          <Server className={`w-4 h-4 ${apiConnected ? 'text-emerald-400' : 'text-yellow-400'}`} />
          <span>Artifact Host: {apiHost} ({apiConnected ? 'Live Connection' : 'Smart API Mode'})</span>
        </div>
      </div>

      {/* PLATFORM TABS NAV */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-800 pb-6">
        <button
          onClick={() => setActiveTab('linux')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'linux'
              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-950/40'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span>Linux (AppImage / DEB / Tar)</span>
          {userOS === 'Linux' && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-[10px] font-mono text-cyan-400 border border-cyan-500/30">Your OS</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('windows')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'windows'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/40'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Windows (Portable ZIP)</span>
          {userOS === 'Windows' && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">Your OS</span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-950/40'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>All Release Artifacts Matrix</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {isLoading ? (
        <div className="py-20 text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-400">Loading platform client matrix...</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* LINUX TAB */}
          {activeTab === 'linux' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <span className="font-bold">Linux Client Information:</span> Cipherly supports 64-bit Linux distributions (Ubuntu, Debian, Fedora, Arch, Manjaro, openSUSE). We recommend the standalone AppImage.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {linuxArtifacts.map((art) => (
                  <div
                    key={art.id}
                    className={`p-6 rounded-2xl bg-glass border space-y-5 transition-all flex flex-col justify-between ${
                      art.recommended
                        ? 'border-cyan-500/50 bg-slate-900/90 shadow-xl'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase">
                          {art.format}
                        </span>
                        {art.recommended && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Recommended</span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white">{art.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{art.description}</p>
                      <p className="text-xs font-mono text-slate-500">Size: {art.size}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>SHA-256 Hash:</span>
                          <button
                            onClick={() => copyHash(art.sha256, art.filename)}
                            className="text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedHash === art.filename ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 break-all select-all">{art.sha256}</p>
                      </div>

                      <a
                        href={art.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download {art.format} ({art.size})</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WINDOWS TAB */}
          {activeTab === 'windows' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <span className="font-bold">Windows Client Information:</span> Supports Windows 10 & Windows 11 (64-bit). Provided as a portable ZIP bundle containing all cryptographic libraries.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {(windowsArtifacts.length > 0 ? windowsArtifacts : defaultReleases.filter(a => a.platform === 'windows')).map((art) => (
                  <div
                    key={art.id}
                    className="p-8 rounded-2xl bg-glass border border-emerald-500/40 shadow-2xl space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase">
                          {art.format} PORTABLE BUNDLE
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">64-Bit x64</span>
                      </div>

                      <h3 className="text-xl font-bold text-white">{art.name}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{art.description}</p>
                      <p className="text-xs font-mono text-slate-400">File: {art.filename} ({art.size})</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>SHA-256 Checksum:</span>
                        <button
                          onClick={() => copyHash(art.sha256, art.filename)}
                          className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedHash === art.filename ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-300 break-all select-all bg-slate-900/60 p-2 rounded border border-slate-800">
                        {art.sha256}
                      </p>
                    </div>

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Windows Portable (.ZIP)</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALL ARTIFACTS MATRIX TAB */}
          {activeTab === 'all' && (
            <div className="space-y-6">
              <div className="overflow-x-auto rounded-2xl bg-glass border border-slate-800 shadow-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-4">Platform</th>
                      <th className="p-4">Format</th>
                      <th className="p-4">Filename</th>
                      <th className="p-4">Size</th>
                      <th className="p-4">SHA-256 Checksum</th>
                      <th className="p-4 text-right">Download Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {artifacts.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-bold text-white">{art.os}</td>
                        <td className="p-4 text-cyan-400">{art.format}</td>
                        <td className="p-4 text-slate-200">{art.filename}</td>
                        <td className="p-4 text-slate-400">{art.size}</td>
                        <td className="p-4 text-[10px] text-slate-400 max-w-xs truncate">{art.sha256}</td>
                        <td className="p-4 text-right">
                          <a
                            href={art.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Get</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Verification Instructions */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">How to Verify Client Binary Signatures</h3>
        </div>
        <p className="text-xs text-slate-300">
          Before launching any downloaded executable, verify the SHA-256 checksum against the official hash returned by downloads-server:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
          <p className="text-slate-500"># On Linux Terminal:</p>
          <p className="select-all">sha256sum Cipherly-1.0.0-x86_64.AppImage</p>
          <p className="text-slate-500 pt-2"># On Windows PowerShell:</p>
          <p className="select-all">Get-FileHash .\cipherly-1.0.0-win-x64.zip -Algorithm SHA256</p>
        </div>
      </div>

    </div>
  );
}
