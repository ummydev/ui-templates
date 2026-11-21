import { CalendarDays, ListChecks, MessageSquare, MoreHorizontal, Plus, Share2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { boardCounts, people, projects, tasks, type Column, type Task } from '@/data';
import { cn } from '@/lib/utils';
import { Faces, Shell, fill, ink, text } from '@/shell';
import { healthStyle } from '@/overview';

const columns: Column[] = ['To do', 'In progress', 'In review', 'Done'];
const columnDot: Record<Column, string> = {
  'To do': 'border-2 border-muted-foreground/50 bg-transparent',
  'In progress': 'bg-kiln',
  'In review': 'bg-[var(--p-lilac-ink)]',
  Done: 'bg-ok',
};
const tagStyle: Record<Task['tag'], string> = {
  Design: 'bg-[var(--p-lilac)] text-[var(--p-lilac-ink)]',
  Build: 'bg-[var(--p-sky)] text-[var(--p-sky-ink)]',
  Content: 'bg-[var(--p-sand)] text-[var(--p-sand-ink)]',
  QA: 'bg-[var(--p-lime)] text-[var(--p-lime-ink)]',
};

function Card({ t }: { t: Task }) {
  const done = t.column === 'Done';
  return (
    <article className={cn('card-k p-3.5', done && 'bg-card/70')}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className={cn('rounded-md px-1.5 py-0.5 text-[11px] font-semibold', tagStyle[t.tag])}>{t.tag}</span>
          {t.priority && <span className="rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-accent-foreground">High</span>}
        </span>
        <span className="code text-[10.5px] text-muted-foreground">{t.id}</span>
      </div>
      <div className={cn('mt-2.5 text-[13.5px] leading-snug font-semibold', done && 'text-muted-foreground line-through decoration-muted-foreground/40')}>
        {t.title}
      </div>
      {t.subtasks && (
        <div className="mt-3 flex items-center gap-2">
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            <span className="block h-full rounded-full bg-foreground/70" style={{ width: `${(t.subtasks[0] / t.subtasks[1]) * 100}%` }} />
          </span>
          <span className="num flex items-center gap-1 text-[11.5px] text-muted-foreground">
            <ListChecks className="size-3.5" /> {t.subtasks[0]}/{t.subtasks[1]}
          </span>
        </div>
      )}
      {!done && (
        <div className="mt-3 flex items-center justify-between">
          <Faces ids={t.who} />
          <span className="flex items-center gap-3 text-[12px] text-muted-foreground">
            {t.comments && (
              <span className="flex items-center gap-1">
                <MessageSquare className="size-3.5" /> {t.comments}
              </span>
            )}
            {t.due && (
              <span className={cn('flex items-center gap-1 font-medium', t.late && 'rounded-md bg-[oklch(0.94_0.04_28)] px-1.5 py-0.5 text-risk')}>
                <CalendarDays className="size-3.5" /> {t.late ? `Late · ${t.due}` : t.due}
              </span>
            )}
          </span>
        </div>
      )}
    </article>
  );
}

export function Board() {
  const p = projects.find((x) => x.id === 'HAL')!;
  const pct = Math.round((p.done / p.total) * 100);
  return (
    <Shell active="board" activeProject="HAL">
      <div className="flex h-full flex-col">
        <div className="px-8 pt-7">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <span className={cn('flex size-11 items-center justify-center rounded-[13px] text-[17px] font-extrabold', fill[p.color], text[p.color])}>H</span>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[24px] font-bold tracking-[-0.03em]">{p.name}</h1>
                  <span className={cn('rounded-lg px-2 py-1 text-[11.5px] font-semibold', healthStyle[p.health])}>{p.health}</span>
                </div>
                <div className="mt-0.5 text-[13px] text-muted-foreground">
                  {p.client} · led by {people[p.lead].name} · launch {p.due}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Faces ids={p.team} />
              <Button variant="outline" size="sm" className="ml-2 h-9 gap-1.5 rounded-xl px-3.5 text-[13px] font-semibold">
                <Share2 className="size-4" /> Share
              </Button>
              <Button size="sm" className="h-9 gap-1.5 rounded-xl bg-kiln px-3.5 text-[13px] font-semibold text-white hover:bg-kiln/90">
                <Plus className="size-4" /> Add task
              </Button>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-6 border-b border-border text-[13.5px] font-semibold">
            {['Board', 'List', 'Timeline', 'Files', 'Notes'].map((t, i) => (
              <span key={t} className={cn('-mb-px border-b-2 pb-3', i === 0 ? 'border-foreground' : 'border-transparent text-muted-foreground')}>
                {t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-3 pb-3 text-[12.5px] font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-28 overflow-hidden rounded-full bg-secondary">
                  <span className={cn('block h-full rounded-full', ink[p.color])} style={{ width: `${pct}%` }} />
                </span>
                <span className="num text-foreground">
                  {p.done}/{p.total}
                </span>{' '}
                tasks done
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1">
                <SlidersHorizontal className="size-3.5" /> Filter
              </span>
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-4 gap-4 px-8 pt-5 pb-7">
          {columns.map((c) => {
            const list = tasks.filter((t) => t.column === c);
            const more = boardCounts[c] - list.length;
            return (
              <section key={c} className="flex min-h-0 flex-col rounded-[16px] bg-secondary/60 p-2.5">
                <div className="flex items-center gap-2 px-1.5 pt-1 pb-3">
                  <span className={cn('size-2.5 rounded-full', columnDot[c])} />
                  <span className="text-[13.5px] font-bold">{c}</span>
                  <span className="num rounded-md bg-card px-1.5 text-[11.5px] font-semibold text-muted-foreground">{boardCounts[c]}</span>
                  <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
                    <Plus className="size-4" />
                    <MoreHorizontal className="size-4" />
                  </span>
                </div>
                <div className="space-y-2.5">
                  {list.map((t) => (
                    <Card key={t.id} t={t} />
                  ))}
                  {more > 0 && (
                    <div className="flex h-9 items-center justify-center rounded-xl text-[12.5px] font-semibold text-muted-foreground">
                      + {more} more {c === 'Done' ? 'done' : 'tasks'}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

