'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Wallet,
  LayoutDashboard,
  CreditCard,
  Tag,
  Receipt,
  User,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/features/auth/use-current-user';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userInitials } = useCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Accounts', href: '/accounts', icon: CreditCard },
    { name: 'Categories', href: '/categories', icon: Tag },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800/80 bg-[#18181B]/40 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-zinc-800/60">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Ledgerly<span className="text-emerald-500">.</span>
          </span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold border border-transparent transition-colors duration-150',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200',
              )}

            >
              <Icon
                className={cn(
                  'h-4 w-4',
                  isActive ? 'text-emerald-400' : 'text-zinc-400',
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Bar */}
      <div className="p-3 border-t border-zinc-800/60 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-zinc-900/60 p-2.5 border border-zinc-800/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {userInitials}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-zinc-400 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
