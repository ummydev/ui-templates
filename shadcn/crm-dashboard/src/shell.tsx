import type { ReactNode } from 'react';
import {
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  ChevronsUpDown,
  Inbox,
  Kanban,
  Search,
  Settings,
  Users,
  Zap,
} from 'lucide-react';
import { owners, me, leadTotals, pipelineTotals, usdK, type OwnerId } from '@/data';
import { cn } from '@/lib/utils';

export type Screen = 'leads' | 'pipeline' | 'lead';

const nav = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 6 },
  { id: 'leads', label: 'Leads', icon: Users, count: leadTotals.all },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'tasks', label: 'Tasks', icon: CalendarCheck, count: 4 },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

const views = [
  { label: 'Hot this week', dot: 'bg-hot' },
  { label: 'Webinar sign-ups', dot: 'bg-primary' },
  { label: 'Renewals Q1', dot: 'bg-won' },
];

const quotaPct = Math.round((pipelineTotals.wonThisMonth / pipelineTotals.quota) * 100);

export function Avatar({ id, size = 'md', className }: { id: OwnerId; size?: 'sm' | 'md'; className?: string }) {
  const o = owners[id];
  return (
    <span
      title={o.name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-medium text-ink ring-2 ring-card',
        size === 'sm' ? 'size-6 text-[10px]' : 'size-7 text-[11px]',
        o.tone,
        className,
      )}
    >
      {o.initials}
    </span>
  );
}

/** Initials avatar for a contact (not a teammate): neutral, square-ish. */
export function ContactMark({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
  return (
    <span
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11.5px] font-medium text-secondary-foreground',
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** 1440×1000 app frame: sidebar on the left, a slim top bar, content on the right. */
export function Shell({ active, title, actions, children }: { active: Screen; title: ReactNode; actions?: ReactNode; children: ReactNode }) {
  const current = active === 'lead' ? 'leads' : active;
  return (
    <div className="flex h-[1000px] w-[1440px] shrink-0 overflow-hidden rounded-2xl bg-background text-foreground ring-1 ring-black/5">
      <aside className="flex w-[232px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-3 py-4">
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-white">
            <Zap className="size-3.5" fill="currentColor" strokeWidth={0} />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13.5px] font-semibold">{me.workspace}</div>
            <div className="text-[11.5px] text-muted-foreground">Sales · 4 seats</div>
          </div>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </div>

        <div className="mt-5 flex h-8 items-center gap-2 rounded-lg border border-sidebar-border bg-card px-2.5 text-[12.5px] text-muted-foreground">
          <Search className="size-3.5" />
          Search
          <kbd className="code ml-auto rounded border border-sidebar-border px-1 text-[10.5px]">⌘K</kbd>
        </div>

        <nav className="mt-5 space-y-0.5">
          {nav.map(({ id, label, icon: Icon, count }) => (
            <div
              key={id}
              className={cn(
                'flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[13px]',
                id === current
                  ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-[0_1px_2px_oklch(0.22_0.03_262/8%)] ring-1 ring-sidebar-border'
                  : 'text-sidebar-foreground/80',
              )}
            >
              <Icon className={cn('size-4', id === current ? 'text-primary' : 'text-muted-foreground')} strokeWidth={1.8} />
              {label}
              {count !== undefined && <span className="num ml-auto text-[11.5px] text-muted-foreground">{count}</span>}
            </div>
          ))}
        </nav>

        <div className="mt-7 px-2.5 text-[11.5px] font-medium text-muted-foreground">Saved views</div>
        <div className="mt-1.5 space-y-0.5">
          {views.map((v) => (
            <div key={v.label} className="flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-sidebar-foreground/80">
              <span className={cn('size-2 rounded-full', v.dot)} />
              {v.label}
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-xl border border-sidebar-border bg-card p-3">
          <div className="text-[12px] font-medium">November quota</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${quotaPct}%` }} />
          </div>
          <div className="num mt-2 text-[11.5px] text-muted-foreground">{usdK(pipelineTotals.wonThisMonth)} of {usdK(pipelineTotals.quota)} · 9 days left</div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 px-2">
          <Avatar id="ro" />
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13px] font-medium">{me.name}</div>
            <div className="text-[11.5px] text-muted-foreground">{me.role}</div>
          </div>
          <Settings className="size-4 text-muted-foreground" strokeWidth={1.8} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-7">
          <div className="text-[13px] text-muted-foreground">{title}</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex -space-x-0.5">
              {(['ro', 'hs', 'dp', 'mk'] as OwnerId[]).map((id) => (
                <Avatar key={id} id={id} size="sm" />
              ))}
            </div>
            <span className="mx-1 h-5 w-px bg-border" />
            <span className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground">
              <Bell className="size-4" strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-hot" />
            </span>
            {actions}
          </div>
        </header>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
