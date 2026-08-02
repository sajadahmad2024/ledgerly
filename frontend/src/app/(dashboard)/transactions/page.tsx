'use client';

import React, { useState } from 'react';
import {
  Plus,
  Loader2,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react';
import { useTransactions } from '@/features/transactions/use-transactions';
import { useAccounts } from '@/features/accounts/use-accounts';
import { useCategories } from '@/features/categories/use-categories';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

export default function TransactionsPage() {
  const {
    transactions,
    isLoading,
    createTransaction,
    isCreating,
    deleteTransaction,
  } = useTransactions();

  const { accounts } = useAccounts();
  const { categories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');

  // Form State
  const [accountId, setAccountId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (!accountId || !amount) return;
    await createTransaction({
      accountId,
      categoryId: categoryId || undefined,
      type,
      amount: parseFloat(amount),
      description: description || undefined,
    });
    setIsModalOpen(false);
    setAmount('');
    setDescription('');
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'ALL') return true;
    return t.type === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            View, filter, and record all income and expense items
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Record Transaction
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#18181B]/60 p-1.5 w-fit">
        <Filter className="h-4 w-4 text-zinc-500 ml-2" />
        {['ALL', 'INCOME', 'EXPENSE'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer',
              filterType === t
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 backdrop-blur-xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-zinc-500">
            Loading transactions...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-900/50 text-xs uppercase font-semibold text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Account</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredTransactions.map((t) => {
                  const account = accounts.find((a) => a.id === t.accountId);
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-zinc-800/30 transition-all"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold',
                            t.type === 'INCOME'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20',
                          )}
                        >
                          {t.type === 'INCOME' ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        {t.description || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400">
                        {account?.name || 'Account'}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400">
                        {formatDate(t.transactionDate)}
                      </td>
                      <td
                        className={cn(
                          'px-6 py-4 text-right font-bold',
                          t.type === 'INCOME'
                            ? 'text-emerald-400'
                            : 'text-red-400',
                        )}
                      >
                        {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                          title="Delete Transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#18181B] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              Record New Transaction
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Transaction Type
                </label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as 'INCOME' | 'EXPENSE')
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option value="EXPENSE">EXPENSE</option>
                  <option value="INCOME">INCOME</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Account
                </label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option value="">Select Account</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Category (Optional)
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter((c) => c.type === type)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 450.00"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. DMart Groceries"
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
                disabled={!accountId || !amount || isCreating}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
              >
                {isCreating && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
