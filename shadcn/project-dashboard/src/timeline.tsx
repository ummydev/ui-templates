import { ChevronLeft, ChevronRight, Diamond, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { people, projects, todayWeek, weeks } from '@/data';
import { cn } from '@/lib/utils';
import { Faces, Shell, fill, ink, text } from '@/shell';
import { healthStyle } from '@/overview';

const COLS = weeks.length;
const pct = (w: number) => `${(w / COLS) * 100}%`;

export function Timeline() {
  return (
    <Shell active="timeline">
      <div className="flex h-full flex-col px-8 pt-7 pb-7">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.03em]">Timeline</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Every project’s phases and launch dates, twelve weeks at a glance.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-secondary p-1 text-[12.5px] font-semibold">
              {['Weeks', 'Months', 'Quarter'].map((v, i) => (
                <span key={v} className={cn('rounded-lg px-3 py-1.5', i === 0 ? 'bg-card shadow-[0_1px_2px_oklch(0.24_0.012_60/10%)]' : 'text-muted-foreground')}>
                  {v}
                </span>
              ))}
            </div>
            <span className="flex h-9 items-center gap-1 rounded-xl border border-border bg-card px-1.5 text-muted-foreground">
              <ChevronLeft className="size-4" />
              <span className="px-1 text-[12.5px] font-semibold text-foreground">Today</span>
              <ChevronRight className="size-4" />
            </span>
            <Button size="sm" className="h-9 gap-1.5 rounded-xl bg-kiln px-3.5 text-[13px] font-semibold text-white hover:bg-kiln/90">
              <Plus className="size-4" /> New project
            </Button>
          </div>
        </div>

        <section className="card-k mt-6 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="grid grid-cols-[260px_1fr] border-b border-border">
            <div className="flex items-end px-5 pb-2.5 text-[11.5px] font-semibold text-muted-foreground">Project</div>
            <div>
              <div className="grid grid-cols-[4fr_5fr_3fr] border-b border-border text-[12px] font-bold">
                <span className="border-r border-border px-3 py-2">November</span>
                <span className="border-r border-border px-3 py-2">December</span>
                <span className="px-3 py-2">January 2027</span>
              </div>
              <div className="grid text-[11.5px] font-medium text-muted-foreground" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                {weeks.map((w, i) => (
                  <span key={w} className={cn('border-r border-border px-2 py-2 last:border-0', i === 2 && 'font-bold text-kiln-ink')}>
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative grid min-h-0 flex-1 grid-cols-[260px_1fr]">
            <div>
              {projects.map((p) => (
                <div key={p.id} className="flex h-[144px] flex-col justify-center gap-2 border-b border-border px-5">
                  <div className="flex items-center gap-2.5">
                    <span className={cn('size-2.5 rounded-[4px]', ink[p.color])} />
                    <span className="truncate text-[13.5px] font-bold">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-5">
                    <span className={cn('rounded-lg px-2 py-0.5 text-[11px] font-semibold', healthStyle[p.health])}>{p.health}</span>
                    <span className="text-[12px] text-muted-foreground">{people[p.lead].name.split(' ')[0]} leads</span>
                  </div>
                  <div className="pl-5">
                    <Faces ids={p.team} size={5} />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                {weeks.map((w, i) => (
                  <span key={w} className={cn('border-r border-dashed border-border last:border-0', (i === 7 || i === 8) && 'bg-muted/70')} />
                ))}
              </div>
              <div className="absolute top-0 bottom-0 z-20 w-0.5 bg-kiln" style={{ left: pct(todayWeek) }}>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-md bg-kiln px-1.5 py-0.5 text-[10.5px] font-bold whitespace-nowrap text-white">
                  Nov 21
                </span>
              </div>

              {projects.map((p) => (
                <div key={p.id} className="relative h-[144px] border-b border-border">
                  {p.phases.map((ph, i) => (
                    <div
                      key={ph.name}
                      className={cn('absolute flex h-8 items-center rounded-[10px] px-2.5 text-[12px] font-semibold', fill[p.color], text[p.color], ph.to <= todayWeek && 'opacity-60')}
                      style={{ left: pct(ph.from), width: pct(ph.to - ph.from), top: 22 + i * 36 }}
                    >
                      <span className="truncate">{ph.name}</span>
                    </div>
                  ))}
                  <div
                    className={cn('absolute z-10 flex items-center gap-1.5', p.milestone.week > 9 && 'flex-row-reverse')}
                    style={{
                      ...(p.milestone.week > 9
                        ? { right: `calc(${pct(COLS - p.milestone.week)} - 10px)` }
                        : { left: `calc(${pct(p.milestone.week)} - 10px)` }),
                      top: 22 + (p.phases.length - 1) * 36 + 6,
                    }}
                  >
                    <Diamond className={cn('size-5 fill-current stroke-card', text[p.color])} strokeWidth={2} />
                    <span className="rounded-md bg-card px-1.5 py-0.5 text-[11px] font-bold whitespace-nowrap shadow-[0_1px_3px_oklch(0.24_0.012_60/15%)]">
                      {p.milestone.name} · {p.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Diamond className="size-3.5 fill-current" /> Launch or handover
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-5 rounded bg-muted" /> Studio closed Dec 22 – Jan 2
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-0.5 bg-kiln" /> Today
            </span>
          </div>
        </section>
      </div>
    </Shell>
  );
}
