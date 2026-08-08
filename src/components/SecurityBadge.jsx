import React from 'react';
import { ShieldCheck, Lock, EyeOff, Cpu } from 'lucide-react';

export default function SecurityBadge({ text = "Zero-Trust Architecture", variant = "cyan" }) {
  const isEmerald = variant === 'emerald';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border backdrop-blur-md ${
        isEmerald
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
          : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
      }`}
    >
      <span className={`w-2 h-2 rounded-full animate-ping ${isEmerald ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
}
