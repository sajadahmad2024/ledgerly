'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useAccounts } from '@/features/accounts/use-accounts';
import { useTransactions } from '@/features/transactions/use-transactions';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { Button } from '@/components/ui/button';
import { DashboardKpiCards } from './_components/dashboard-kpi-cards';
import { RecentActivityList } from './_components/recent-activity-list';

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
          <Button asChild>
            <Link href="/transactions">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <DashboardKpiCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        accountsCount={accounts.length}
        transactionsLoading={transactionsLoading}
        accountsLoading={accountsLoading}
      />

      {/* Main Grid: Recent Activity & Accounts Overview */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityList
            transactions={transactions}
            isLoading={transactionsLoading}
          />
        </div>
      </div>
    </div>
  );
}
