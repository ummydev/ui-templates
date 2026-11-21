import type { ReactNode } from 'react';
import { BarChart3, Bell, Boxes, CalendarDays, ChevronDown, LayoutDashboard, Megaphone, Search, Settings, ShieldCheck, ShoppingCart, UserCog, Users } from 'lucide-react';
import { me, statusCounts, store, users } from '@/data';
import { cn } from '@/lib/utils';

export type Screen = 'overview' | 'orders' | 'reports' | 'users' | 'roles';

const nav = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, count: statusCounts.Pending },
  { id: 'products', label: 'Products', icon: Boxes },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
];

const admin = [
  { id: 'users', label: 'Users', icon: UserCog, count: users.length },
  { id: 'roles', label: 'Roles & permissions', icon: ShieldCheck },
];

/** 1440×1000 frame: a slim dark sidebar and a top bar with the date range. */
export function Shell({ active, title, actions, children }: { active: Screen; title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-[1000px] w-[1440px] shrink-0 overflow-hidden rounded-[20px] bg-background text-foreground ring-1 ring-white/10">
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-5">
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary">
            <svg viewBox="0 0 24 24" className="size-4.5 text-primary-foreground" fill="none">
              <path d="M4 18 10 8l4 6 6-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[14px] font-semibold">{store.name}</div>
            <div className="text-[11.5px] text-muted-foreground">{store.plan}</div>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>

        <nav className="mt-8 space-y-1">
          {nav.map(({ id, label, icon: Icon, count }) => (
            <div
              key={id}
              className={cn(
                'flex h-10 items-center gap-3 rounded-[10px] px-3 text-[13.5px] font-medium',
                id === active ? 'bg-sidebar-accent text-foreground' : 'text-sidebar-foreground/80',
              )}
            >
              <Icon className={cn('size-[18px]', id === active && 'text-primary')} strokeWidth={1.8} />
              {label}
              {count !== undefined && <span className="num ml-auto rounded-md bg-accent px-1.5 text-[11px] text-accent-foreground">{count}</span>}
            </div>
          ))}
        </nav>

        <div className="mt-7 px-3 text-[11.5px] font-medium tracking-[0.06em] text-muted-foreground uppercase">Admin</div>
        <nav className="mt-2 space-y-1">
          {admin.map(({ id, label, icon: Icon, count }) => (
            <div
              key={id}
              className={cn(
                'flex h-10 items-center gap-3 rounded-[10px] px-3 text-[13.5px] font-medium',
                id === active ? 'bg-sidebar-accent text-foreground' : 'text-sidebar-foreground/80',
              )}
            >
              <Icon className={cn('size-[18px]', id === active && 'text-primary')} strokeWidth={1.8} />
              {label}
              {count !== undefined && <span className="num ml-auto text-[11.5px] text-muted-foreground">{count}</span>}
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          <div className="flex h-10 items-center gap-3 rounded-[10px] px-3 text-[13.5px] font-medium text-sidebar-foreground/80">
            <Settings className="size-[18px]" strokeWidth={1.8} /> Settings
          </div>
          <div className="mt-3 flex items-center gap-2.5 border-t border-sidebar-border px-2 pt-4">
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">{me.initials}</span>
            <div className="leading-tight">
              <div className="text-[13px] font-medium">{me.name}</div>
              <div className="text-[11.5px] text-muted-foreground">{me.role}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-border px-8">
          <h1 className="text-[20px] font-semibold tracking-[-0.02em]">{title}</h1>
          <div className="ml-6 flex h-9 w-[300px] items-center gap-2 rounded-[10px] bg-secondary px-3 text-[13px] text-muted-foreground">
            <Search className="size-4" /> Search orders, products, customers
            <kbd className="code ml-auto text-[11px]">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="flex h-9 items-center gap-2 rounded-[10px] border border-border px-3 text-[13px]">
              <CalendarDays className="size-4 text-muted-foreground" /> Last 30 days <span className="text-muted-foreground">· {store.period}</span>
            </span>
            <span className="relative flex size-9 items-center justify-center rounded-[10px] border border-border">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
            </span>
            {actions}
          </div>
        </header>
        <div className="min-h-0 flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

export function Delta({ v, invert }: { v: number; invert?: boolean }) {
  const good = invert ? v < 0 : v >= 0;
  return (
    <span className={cn('num rounded-md px-1.5 py-0.5 text-[12px]', good ? 'bg-up/12 text-up' : 'bg-down/12 text-down')}>
      {v >= 0 ? '↑' : '↓'} {Math.abs(v * 100).toFixed(1)}%
    </span>
  );
}
