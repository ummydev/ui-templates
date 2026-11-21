import type { ReactNode } from 'react';
import { ArrowLeftRight, Home, PieChart, Target, User } from 'lucide-react';
import { cn } from '@/lib/utils';

/** A 390×844 phone screen on the sage backdrop, with the status bar. */
export function Phone({ children, nav }: { children: ReactNode; nav?: Tab }) {
  return (
    <div className="sage-backdrop relative flex h-[844px] w-[390px] shrink-0 flex-col overflow-hidden rounded-[44px] text-foreground ring-1 ring-black/5">
      <div className="flex h-12 items-center justify-between px-8 pt-2 text-[13px] font-semibold">
        <span className="num">9:41</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-4 rounded-[3px] border border-current opacity-80" />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-28">{children}</div>
      {nav && <BottomNav active={nav} />}
    </div>
  );
}

export type Tab = 'home' | 'activity' | 'insights' | 'goals' | 'me';
const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'activity', icon: ArrowLeftRight, label: 'Activity' },
  { id: 'insights', icon: PieChart, label: 'Insights' },
  { id: 'goals', icon: Target, label: 'Goals' },
  { id: 'me', icon: User, label: 'Me' },
];

/** The floating pill navigation; the active tab expands to show its label. */
function BottomNav({ active }: { active: Tab }) {
  return (
    <nav className="glass absolute inset-x-5 bottom-6 flex items-center justify-between rounded-full p-1.5">
      {tabs.map(({ id, icon: Icon, label }) => (
        <span
          key={id}
          className={cn(
            'flex h-11 items-center justify-center gap-2 rounded-full text-[13px] font-medium',
            id === active ? 'bg-primary px-4 text-primary-foreground' : 'w-11 text-muted-foreground',
          )}
        >
          <Icon className="size-[18px]" strokeWidth={1.8} />
          {id === active && label}
        </span>
      ))}
    </nav>
  );
}

/** Large money figure: light whole part, smaller cents. */
export function Amount({ whole, cents, className }: { whole: string; cents: string; className?: string }) {
  return (
    <span className={cn('num font-light', className)}>
      <span className="align-top text-[0.45em] font-normal opacity-70">$</span>
      {whole}
      <span className="text-[0.45em] opacity-60">.{cents}</span>
    </span>
  );
}
