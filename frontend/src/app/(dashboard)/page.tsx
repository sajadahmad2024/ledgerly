'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useAccounts } from '@/features/accounts/use-accounts';
import { useTransactions } from '@/features/transactions/use-transactions';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const { accounts, isLoading: accountsLoading } = useAccounts();
  const {
    transactions,
    isLoading: transactionsLoading,
    totalIncome,
    totalExpense,
    totalBalance,
  } = useTransactions();

  return (
    <div className="space-y-8">
      {/* Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back, {user?.name || 'User'} 👋
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Here is your financial summary and recent transactions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/transactions"
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
          >
            <Plus className="h-4 w-4" />
            Add Transaction
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Balance */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-5 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Balance
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">
              {transactionsLoading ? '...' : formatCurrency(totalBalance)}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">Net portfolio value</p>
          </div>
        </div>

        {/* Card 2: Total Income */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-5 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Income
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-emerald-400">
              {transactionsLoading ? '...' : formatCurrency(totalIncome)}
            </h3>
            <p className="mt-1 text-xs text-emerald-500/80 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> Income received
            </p>
          </div>
        </div>

        {/* Card 3: Total Expenses */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-5 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Expenses
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-red-400">
              {transactionsLoading ? '...' : formatCurrency(totalExpense)}
            </h3>
            <p className="mt-1 text-xs text-red-400/80 flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3" /> Expenses recorded
            </p>
          </div>
        </div>

        {/* Card 4: Active Accounts */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-5 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Accounts
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">
              {accountsLoading ? '...' : accounts.length}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">Active accounts linked</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Activity & Accounts Overview */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Transactions Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <Link
              href="/transactions"
              className="text-xs font-medium text-emerald-400 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 backdrop-blur-xl overflow-hidden">
            {transactionsLoading ? (
              <div className="p-8 text-center text-sm text-zinc-500">
                Loading transactions...
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <p className="text-sm text-zinc-400">No transactions recorded yet.</p>
                <Link
                  href="/transactions"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" /> Record your first expense
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/60">
                {transactions.slice(0, 5).map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-xl border',
                          t.type === 'INCOME'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400',
                        )}
                      >
                        {t.type === 'INCOME' ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t.description || (t.type === 'INCOME' ? 'Income' : 'Expense')}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {formatDate(t.transactionDate)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-bold',
                        t.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400',
                      )}
                    >
                      {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accounts Summary Cards Side */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Accounts</h2>
            <Link
              href="/accounts"
              className="text-xs font-medium text-emerald-400 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {accountsLoading ? (
              <div className="p-4 text-center text-xs text-zinc-500">
                Loading accounts...
              </div>
            ) : accounts.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-6 text-center">
                <p className="text-xs text-zinc-400">No accounts linked yet.</p>
                <Link
                  href="/accounts"
                  className="mt-2 inline-block text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            ) : (
              accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-[#18181B]/60 p-4 transition-all hover:border-zinc-700/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{acc.name}</p>
                      <p className="text-xs text-zinc-400">{acc.type}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-zinc-300">
                    {acc.currency}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
