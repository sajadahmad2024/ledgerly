'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaginationMeta } from '@/types/api';

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  meta,
  onPageChange,
  className,
}: PaginationProps) {
  const { currentPage, totalPages, totalItems, itemCount } = meta;

  if (totalPages <= 1 && totalItems <= 10) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80 px-6 py-4 bg-zinc-900/40',
        className,
      )}
    >
      <p className="text-xs text-zinc-400">
        Showing <span className="font-semibold text-white">{itemCount}</span> of{' '}
        <span className="font-semibold text-white">{totalItems}</span> items
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 transition-all cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        <div className="flex items-center gap-1 px-2 text-xs font-medium text-zinc-400">
          <span>Page</span>
          <span className="font-bold text-white">{currentPage}</span>
          <span>of</span>
          <span className="font-bold text-white">{totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 transition-all cursor-pointer"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
