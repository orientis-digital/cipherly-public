import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function Error404Page() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="p-8 md:p-12 rounded-3xl bg-glass border border-slate-800 max-w-lg w-full space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">Error 404 • Access Denied</span>
          <h1 className="text-3xl font-extrabold text-white">Cryptographic Node Not Found</h1>
          <p className="text-sm text-slate-400">
            The requested location does not exist or has been shredded beyond recovery.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Vault Home</span>
        </Link>
      </div>
    </div>
  );
}
