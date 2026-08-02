'use client';

import React from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useCurrentUser } from '@/features/auth/use-current-user';

export function ProfileView() {
  const { user } = useCurrentUser();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          User Profile
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Account details and security settings
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-6 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-zinc-800/80 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xl font-bold">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name || 'User'}</h2>
            <p className="text-xs text-emerald-400 font-medium">Standard Account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Mail className="h-3.5 w-3.5" /> Email Address
            </div>
            <p className="text-sm font-semibold text-white">{user?.email || 'N/A'}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <User className="h-3.5 w-3.5" /> User ID
            </div>
            <p className="text-xs font-mono text-zinc-300 truncate">{user?.id || 'N/A'}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Calendar className="h-3.5 w-3.5" /> Account Created
            </div>
            <p className="text-sm font-semibold text-white">
              {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Shield className="h-3.5 w-3.5" /> Security Status
            </div>
            <p className="text-sm font-semibold text-emerald-400">JWT Authenticated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
