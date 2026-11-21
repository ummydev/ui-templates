import { ArrowUpRight, CalendarDays, Flag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deadlines, people, projects, today, totals, me, type Health, type PersonId } from '@/data';
import { cn } from '@/lib/utils';
import { Face, Faces, Shell, fill, ink, text } from '@/shell';

const days = ['Mon 17', 'Tue 18', 'Wed 19', 'Thu 20', 'Fri 21'];

export const healthStyle: Record<Health, string> = {
  'On track': 'bg-[oklch(0.94_0.04_150)] text-ok',
  'At risk': 'bg-accent text-accent-foreground',
  Behind: 'bg-[oklch(0.94_0.04_28)] text-risk',
};

function Kpi({ label, value, note, children }: { label: string; value: string; note: string; children?: React.ReactNode }) {
  return (
    <div className="card-k px-5 py-4">
      <div className="text-[12.5px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <span className="num text-[30px] leading-none font-bold tracking-[-0.03em]">{value}</span>
        {children}
      </div>
      <div className="mt-2.5 text-[12px] text-muted-foreground">{note}</div>
    </div>
  );
}

export function Overview() {
  const load = Math.round((totals.hours / totals.capacity) * 100);
  const byProject = projects.find((p) => p.id === 'ORC')!; // the one that is behind
  return (
    <Shell active="overview">
      <div className="flex h-full flex-col px-8 pt-7 pb-7">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
              <CalendarDays className="size-4" /> {today.label}
            </div>
            <h1 className="mt-1.5 text-[28px] font-bold tracking-[-0.03em]">Good morning, {people[me].name.split(' ')[0]}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 rounded-xl px-3.5 text-[13px] font-semibold">
              Invite
            </Button>
            <Button size="sm" className="h-9 gap-1.5 rounded-xl bg-kiln px-3.5 text-[13px] font-semibold text-white hover:bg-kiln/90">
              <Plus className="size-4" /> New project
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-4">
          <Kpi label="Active projects" value={String(totals.active)} note={`${totals.onTrack} on track, ${totals.atRisk} at risk, ${totals.behind} behind`}>
            <span className="flex gap-1">
              {projects.map((p) => (
                <span key={p.id} className={cn('h-6 w-1.5 rounded-full', ink[p.color])} />
              ))}
            </span>
          </Kpi>
          <Kpi label="Open tasks" value={String(totals.open)} note="Across all projects" />
          <Kpi label="Due this week" value={String(totals.dueThisWeek)} note="Open tasks due by Friday" />
          <Kpi label="Team load" value={`${load}%`} note={`${totals.hours} of ${totals.capacity} hours booked`}>
            <span className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
              <span className="block h-full rounded-full bg-kiln" style={{ width: `${load}%` }} />
            </span>
          </Kpi>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_300px] gap-4">
          <section className="card-k p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold">This week</h2>
              <span className="text-[12.5px] text-muted-foreground">Nov 17 – 21</span>
            </div>
            <div className="mt-4 grid grid-cols-[150px_1fr]">
              <div />
              <div className="grid grid-cols-5 text-[12px] font-medium text-muted-foreground">
                {days.map((d, i) => (
                  <span key={d} className={cn('pb-2', i === today.weekday && 'font-bold text-kiln-ink')}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative grid grid-cols-[150px_1fr]">
              <div className="space-y-1.5">
                {projects.map((p) => (
                  <div key={p.id} className="flex h-8 items-center gap-2 text-[12.5px] font-semibold">
                    <span className={cn('size-2 rounded-[3px]', ink[p.color])} />
                    <span className="truncate">{p.name.split(' ')[0]}</span>
                    <span className="code text-[10.5px] text-muted-foreground">{p.id}</span>
                  </div>
                ))}
              </div>
              <div className="relative space-y-1.5 border-l border-border">
                <div className="pointer-events-none absolute inset-0 grid grid-cols-5">
                  {days.map((d) => (
                    <span key={d} className="border-r border-dashed border-border" />
                  ))}
                </div>
                <span
                  className="absolute -top-1 -bottom-1 z-10 w-0.5 rounded-full bg-kiln"
                  style={{ left: `${((today.weekday + 0.45) / 5) * 100}%` }}
                />
                {projects.map((p) => (
                  <div key={p.id} className="relative h-8">
                    <div
                      className={cn('absolute top-0 flex h-8 items-center justify-between gap-2 rounded-full pr-1.5 pl-3', fill[p.color])}
                      style={{ left: `${(p.week.from / 5) * 100}%`, width: `${((p.week.to - p.week.from) / 5) * 100}%` }}
                    >
                      <span className={cn('truncate text-[12px] font-semibold', text[p.color])}>{p.week.label}</span>
                      <Faces ids={p.team.slice(0, 2)} size={5} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card-k p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold">Team load</h2>
              <span className="text-[12.5px] text-muted-foreground">hours this week</span>
            </div>
            <ul className="mt-3.5 space-y-2.5">
              {(Object.keys(people) as PersonId[]).map((id) => {
                const p = people[id];
                const over = p.hours > p.capacity;
                return (
                  <li key={id} className="flex items-center gap-2.5">
                    <Face id={id} size={8} className="ring-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between text-[12.5px]">
                        <span className="font-semibold">{p.name}</span>
                        <span className={cn('num', over ? 'font-bold text-risk' : 'text-muted-foreground')}>
                          {p.hours}/{p.capacity}h
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn('h-full rounded-full', over ? 'bg-risk' : 'bg-foreground/70')}
                          style={{ width: `${Math.min(100, (p.hours / p.capacity) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[1fr_300px] gap-4">
          <section className="card-k overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-[15px] font-bold">Projects</h2>
              <span className="flex items-center gap-1 text-[12.5px] font-semibold text-muted-foreground">
                All projects <ArrowUpRight className="size-3.5" />
              </span>
            </div>
            <div className="grid grid-cols-[1fr_120px_190px_92px_74px] border-y border-border bg-muted/60 px-5 py-2 text-[11.5px] font-semibold text-muted-foreground">
              <span>Project</span>
              <span>Status</span>
              <span>Progress</span>
              <span>Team</span>
              <span className="text-right">Due</span>
            </div>
            {projects.map((p) => {
              const pct = Math.round((p.done / p.total) * 100);
              return (
                <div key={p.id} className="grid grid-cols-[1fr_120px_190px_92px_74px] items-center border-b border-border px-5 py-2.5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={cn('flex size-8 items-center justify-center rounded-[10px] text-[11px] font-bold', fill[p.color], text[p.color])}>
                      {p.name[0]}
                    </span>
                    <div className="leading-tight">
                      <div className="text-[13.5px] font-semibold">{p.name}</div>
                      <div className="text-[12px] text-muted-foreground">{p.client}</div>
                    </div>
                  </div>
                  <span>
                    <span className={cn('rounded-lg px-2 py-1 text-[11.5px] font-semibold', healthStyle[p.health])}>{p.health}</span>
                  </span>
                  <div className="flex items-center gap-2.5 pr-5">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <span className={cn('block h-full rounded-full', ink[p.color])} style={{ width: `${pct}%` }} />
                    </span>
                    <span className="num w-[58px] text-right text-[12px] text-muted-foreground">
                      {p.done}/{p.total}
                    </span>
                  </div>
                  <Faces ids={p.team} />
                  <span className="num text-right text-[12.5px] font-medium">{p.due}</span>
                </div>
              );
            })}
          </section>

          <section className="flex flex-col gap-4">
            <div className="card-k p-5">
              <h2 className="text-[15px] font-bold">Coming up</h2>
              <ul className="mt-3 space-y-2.5">
                {deadlines.map((d) => {
                  const p = projects.find((x) => x.id === d.project)!;
                  return (
                    <li key={d.title} className="flex items-center gap-3">
                      <span className={cn('flex size-8 items-center justify-center rounded-[10px]', fill[p.color])}>
                        <Flag className={cn('size-3.5', text[p.color])} />
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <div className="truncate text-[13px] font-semibold">{d.title}</div>
                        <div className="text-[12px] text-muted-foreground">{d.date}</div>
                      </div>
                      <Face id={d.who} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex-1 rounded-[16px] bg-foreground px-5 py-4 text-background">
              <div className="text-[12px] font-semibold text-background/60">Needs attention</div>
              <div className="mt-2 text-[15px] leading-snug font-bold">
                {byProject.name} is behind: {byProject.done} of {byProject.total} tasks done, files due {byProject.due}.
              </div>
              <div className="mt-2.5 flex items-center gap-2 text-[12.5px] text-background/70">
                <Face id={byProject.lead} className="ring-foreground" /> {people[byProject.lead].name} owns it
              </div>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
