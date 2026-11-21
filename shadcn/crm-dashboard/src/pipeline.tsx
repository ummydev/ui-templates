import { CalendarClock, LayoutList, Kanban, MoreHorizontal, Plus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dealStages, deals, openDeals, pipelineTotals, usd, usdK, type DealStage } from '@/data';
import { cn } from '@/lib/utils';
import { Avatar, Shell } from '@/shell';

const stageColor: Record<DealStage, string> = {
  Discovery: 'bg-chart-3',
  Proposal: 'bg-chart-2',
  Negotiation: 'bg-primary',
  'Closed won': 'bg-won',
};

export function Pipeline() {
  const avgDeal = pipelineTotals.open / openDeals.length;
  const summary = [
    { label: 'Open pipeline', value: usd(pipelineTotals.open), note: `${openDeals.length} deals` },
    { label: 'Weighted forecast', value: usd(pipelineTotals.weighted), note: 'by stage probability' },
    { label: 'Won in November', value: usd(pipelineTotals.wonThisMonth), note: `${Math.round((pipelineTotals.wonThisMonth / pipelineTotals.quota) * 100)}% of ${usdK(pipelineTotals.quota)} quota` },
    { label: 'Average deal', value: usd(Math.round(avgDeal)), note: 'open deals' },
  ];
  // Share of open pipeline per stage, for the stacked bar.
  const openStages = dealStages.filter((s) => s.name !== 'Closed won');

  return (
    <Shell
      active="pipeline"
      title={
        <>
          Sales <span className="mx-1.5 text-border">/</span> <span className="text-foreground">Pipeline</span>
        </>
      }
      actions={
        <Button size="sm" className="h-8 gap-1.5 rounded-lg px-3 text-[13px]">
          <Plus className="size-3.5" /> New deal
        </Button>
      }
    >
      <div className="flex h-full flex-col px-7 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-[24px] font-semibold tracking-[-0.02em]">Pipeline</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Every open deal by stage, with its next step.</p>
          </div>
          <div className="flex rounded-lg border border-border bg-card p-0.5 text-[12.5px]">
            <span className="flex h-7 items-center gap-1.5 rounded-md bg-secondary px-2.5 font-medium">
              <Kanban className="size-3.5" /> Board
            </span>
            <span className="flex h-7 items-center gap-1.5 rounded-md px-2.5 text-muted-foreground">
              <LayoutList className="size-3.5" /> List
            </span>
          </div>
        </div>

        <div className="panel mt-5 px-5 py-4">
          <div className="grid grid-cols-4 gap-6">
            {summary.map((s) => (
              <div key={s.label}>
                <div className="text-[12.5px] text-muted-foreground">{s.label}</div>
                <div className="num mt-1.5 text-[24px] leading-none font-medium">{s.value}</div>
                <div className="mt-1.5 text-[12px] text-muted-foreground">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full">
            {openStages.map((s) => {
              const v = openDeals.filter((d) => d.stage === s.name).reduce((a, d) => a + d.value, 0);
              return <span key={s.name} className={stageColor[s.name]} style={{ flexGrow: v }} />;
            })}
          </div>
          <div className="mt-2 flex gap-5 text-[12px] text-muted-foreground">
            {openStages.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span className={cn('size-2 rounded-sm', stageColor[s.name])} /> {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-4 gap-4 pb-6">
          {dealStages.map((stage) => {
            const list = deals.filter((d) => d.stage === stage.name);
            const total = list.reduce((a, d) => a + d.value, 0);
            return (
              <section key={stage.name} className="flex min-h-0 flex-col rounded-xl bg-secondary/70 p-2.5">
                <div className="flex items-center gap-2 px-1.5 pt-0.5 pb-2.5">
                  <span className={cn('size-2 rounded-full', stageColor[stage.name])} />
                  <span className="text-[13px] font-medium">{stage.name}</span>
                  <span className="num text-[12px] text-muted-foreground">{list.length}</span>
                  <span className="num ml-auto text-[12px] text-muted-foreground">
                    {usdK(total)}
                    {stage.name !== 'Closed won' && <span className="ml-1 opacity-70">· {Math.round(stage.probability * 100)}%</span>}
                  </span>
                </div>
                <div className="space-y-2">
                  {list.map((d) => (
                    <article key={d.id} className="panel p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="leading-tight">
                          <div className="text-[13.5px] font-medium">{d.company}</div>
                          <div className="mt-0.5 text-[12.5px] text-muted-foreground">{d.title}</div>
                        </div>
                        <MoreHorizontal className="size-4 shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="num text-[15px] font-medium">{usd(d.value)}</span>
                        <Avatar id={d.owner} size="sm" />
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[12px]">
                        {stage.name === 'Closed won' ? (
                          <span className="flex items-center gap-1.5 text-won">
                            <Trophy className="size-3.5" /> Won {d.due}
                          </span>
                        ) : (
                          <span className={cn('flex items-center gap-1.5', d.overdue ? 'text-hot' : 'text-muted-foreground')}>
                            <CalendarClock className="size-3.5" />
                            {d.next} · {d.due}
                          </span>
                        )}
                        {stage.name !== 'Closed won' && <span className="num text-muted-foreground">{d.days}d</span>}
                      </div>
                    </article>
                  ))}
                  {stage.name !== 'Closed won' && (
                    <div className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-dashed border-input text-[12.5px] text-muted-foreground">
                      <Plus className="size-3.5" /> Add deal
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
