'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/types/api';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface RecentActivityListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function RecentActivityList({
  transactions,
  isLoading,
}: RecentActivityListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
        <Link
          href="/transactions"
          className="text-xs font-medium text-emerald-400 hover:underline"
        >
          View All
        </Link>
      </div>

      <Card className="p-0 overflow-hidden">
        {isLoading ? (
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
      </Card>
    </div>
  );
}
