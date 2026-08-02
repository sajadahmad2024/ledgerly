'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Loader2, Archive } from 'lucide-react';
import { useAccounts } from '@/features/accounts/use-accounts';

export default function AccountsPage() {
  const {
    accounts,
    isLoading,
    createAccount,
    isCreating,
    archiveAccount,
  } = useAccounts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'CASH' | 'BANK' | 'CREDIT_CARD' | 'WALLET'>('BANK');
  const [currency, setCurrency] = useState('INR');

  const handleCreate = async () => {
    if (!name) return;
    await createAccount({ name, type, currency });
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Accounts
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your bank accounts, credit cards, cash, and wallets
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Account
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-sm text-zinc-500">
          Loading accounts...
        </div>
      ) : accounts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-12 text-center">
          <p className="text-sm text-zinc-400">No active accounts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="group relative rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-6 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <button
                  onClick={() => archiveAccount(account.id)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                  title="Archive Account"
                >
                  <Archive className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-white">{account.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-block rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                    {account.type}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    {account.currency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#18181B] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Add Financial Account</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. HDFC Salary Account"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Account Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option value="BANK">BANK</option>
                  <option value="CASH">CASH</option>
                  <option value="CREDIT_CARD">CREDIT_CARD</option>
                  <option value="WALLET">WALLET</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="INR"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name || isCreating}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
              >
                {isCreating && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Save Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
