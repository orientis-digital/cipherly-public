import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border bg-slate-900/95 backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'border-emerald-500/40 text-emerald-300 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'border-red-500/40 text-red-300 shadow-red-950/40'
              : 'border-cyan-500/40 text-cyan-300 shadow-cyan-950/40'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
            <span className="text-sm font-medium text-slate-100">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
