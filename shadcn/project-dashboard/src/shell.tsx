import type { ReactNode } from 'react';
import { Bell, ChevronDown, CircleCheck, GanttChart, Home, Inbox, Plus, Search, Users } from 'lucide-react';
import { people, projects, studio, me, type Color, type PersonId } from '@/data';
import { cn } from '@/lib/utils';

export type Screen = 'overview' | 'board' | 'timeline';

export const fill: Record<Color, string> = {
  clay: 'bg-[var(--p-clay)]',
  sky: 'bg-[var(--p-sky)]',
  lime: 'bg-[var(--p-lime)]',
  lilac: 'bg-[var(--p-lilac)]',
  sand: 'bg-[var(--p-sand)]',
};
export const ink: Record<Color, string> = {
  clay: 'bg-[var(--p-clay-ink)]',
  sky: 'bg-[var(--p-sky-ink)]',
  lime: 'bg-[var(--p-lime-ink)]',
  lilac: 'bg-[var(--p-lilac-ink)]',
  sand: 'bg-[var(--p-sand-ink)]',
};
export const text: Record<Color, string> = {
  clay: 'text-[var(--p-clay-ink)]',
  sky: 'text-[var(--p-sky-ink)]',
  lime: 'text-[var(--p-lime-ink)]',
  lilac: 'text-[var(--p-lilac-ink)]',
  sand: 'text-[var(--p-sand-ink)]',
};

export function Face({ id, size = 6, className }: { id: PersonId; size?: 5 | 6 | 8; className?: string }) {
  const p = people[id];
  return (
    <span
      title={p.name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-foreground/80 ring-2 ring-card',
        size === 5 && 'size-5 text-[8.5px]',
        size === 6 && 'size-6 text-[9.5px]',
        size === 8 && 'size-8 text-[11px]',
        p.tone,
        className,
      )}
    >
      {p.initials}
    </span>
  );
}

export function Faces({ ids, size = 6 }: { ids: PersonId[]; size?: 5 | 6 }) {
  return (
    <span className="flex -space-x-1">
      {ids.map((id) => (
        <Face key={id} id={id} size={size} />
      ))}
    </span>
  );
}

const nav = [
  { id: 'overview', label: 'Home', icon: Home },
  { id: 'mine', label: 'My tasks', icon: CircleCheck, count: 7 },
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
  { id: 'timeline', label: 'Timeline', icon: GanttChart },
  { id: 'team', label: 'Team', icon: Users },
];

/** 1440×1000 frame: warm sidebar, content on a rounded card that floats inside it. */
export function Shell({ active, activeProject, children }: { active: Screen; activeProject?: string; children: ReactNode }) {
  return (
    <div className="flex h-[1000px] w-[1440px] shrink-0 overflow-hidden rounded-[22px] bg-sidebar p-2 text-foreground ring-1 ring-black/5">
      <aside className="flex w-[228px] shrink-0 flex-col px-3 py-3">
        <div className="flex items-center gap-2.5 px-1.5">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-kiln text-[15px] font-extrabold text-white">n</span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[14px] font-bold tracking-[-0.01em]">{studio.name}</div>
            <div className="text-[11.5px] text-muted-foreground">{studio.plan}</div>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>

        <div className="mt-5 flex h-9 items-center gap-2 rounded-xl bg-secondary px-3 text-[13px] text-muted-foreground">
          <Search className="size-4" /> Search
          <kbd className="code ml-auto text-[11px]">/</kbd>
        </div>

        <nav className="mt-4 space-y-0.5">
          {nav.map(({ id, label, icon: Icon, count }) => (
            <div
              key={id}
              className={cn(
                'flex h-9 items-center gap-2.5 rounded-xl px-3 text-[13.5px] font-medium',
                id === active ? 'bg-card text-foreground shadow-[0_1px_2px_oklch(0.24_0.012_60/8%)]' : 'text-sidebar-foreground/75',
              )}
            >
              <Icon className="size-[17px]" strokeWidth={1.9} />
              {label}
              {count !== undefined && (
                <span className="num ml-auto rounded-md bg-accent px-1.5 text-[11px] font-semibold text-accent-foreground">{count}</span>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-7 flex items-center justify-between px-3 text-[12px] font-semibold text-muted-foreground">
          Projects <Plus className="size-3.5" />
        </div>
        <div className="mt-1.5 space-y-0.5">
          {projects.map((p) => (
            <div
              key={p.id}
              className={cn(
                'flex h-9 items-center gap-2.5 rounded-xl px-3 text-[13px]',
                p.id === activeProject ? 'bg-card font-semibold shadow-[0_1px_2px_oklch(0.24_0.012_60/8%)]' : 'text-sidebar-foreground/75',
              )}
            >
              <span className={cn('size-2.5 rounded-[4px]', ink[p.color])} />
              <span className="truncate">{p.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2.5 rounded-xl px-1.5 py-1">
          <Face id={me} size={8} className="ring-0" />
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[13px] font-semibold">{people[me].name}</div>
            <div className="text-[11.5px] text-muted-foreground">{people[me].role}</div>
          </div>
          <span className="relative">
            <Bell className="size-[17px] text-muted-foreground" strokeWidth={1.9} />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-kiln ring-2 ring-sidebar" />
          </span>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-hidden rounded-[16px] bg-background ring-1 ring-border">{children}</main>
    </div>
  );
}
