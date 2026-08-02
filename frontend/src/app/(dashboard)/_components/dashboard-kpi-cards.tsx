'use client';

import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface DashboardKpiCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  accountsCount: number;
  transactionsLoading: boolean;
  accountsLoading: boolean;
}

export function DashboardKpiCards({
  totalBalance,
  totalIncome,
  totalExpense,
  accountsCount,
  transactionsLoading,
  accountsLoading,
}: DashboardKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Balance */}
      <Card className="p-5">
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
      </Card>

      {/* Card 2: Total Income */}
      <Card className="p-5">
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
      </Card>

      {/* Card 3: Total Expenses */}
      <Card className="p-5">
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
      </Card>

      {/* Card 4: Active Accounts */}
      <Card className="p-5">
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
            {accountsLoading ? '...' : accountsCount}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">Active accounts linked</p>
        </div>
      </Card>
    </div>
  );
}
