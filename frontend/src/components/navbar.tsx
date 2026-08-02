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

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090B]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Ledgerly<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Top Navigation Links (Desktop First, No Left Sidebar) */}
        <nav className="hidden md:flex items-center space-x-1">
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
                  'flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-zinc-800/80 text-emerald-400 border border-zinc-700/50 shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200',
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-400' : 'text-zinc-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-all"
            title="Log Out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
