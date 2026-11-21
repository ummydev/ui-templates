import {
  ArrowDownUp,
  Check,
  Download,
  Flame,
  ListFilter,
  MoreHorizontal,
  Plus,
  Send,
  Tag,
  Upload,
  UserRoundPlus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { leadKpis, leadTotals, leads, usd, type Heat, type LeadStage } from '@/data';
import { cn } from '@/lib/utils';
import { Avatar, ContactMark, Shell } from '@/shell';

/** A 7-point sparkline drawn as plain SVG, so it renders instantly and prints cleanly. */
export function Spark({ data, good }: { data: number[]; good: boolean }) {
  const w = 84;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 3 - ((v - min) / (max - min || 1)) * (h - 6)]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const color = good ? 'var(--primary)' : 'var(--hot)';
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={line} fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r={2.6} fill={color} stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

const heatStyle: Record<Heat, { dot: string; label: string }> = {
  hot: { dot: 'bg-hot', label: 'Hot' },
  warm: { dot: 'bg-warm', label: 'Warm' },
  cold: { dot: 'bg-cold', label: 'Cold' },
};

const stageStyle: Record<LeadStage, string> = {
  New: 'bg-accent text-accent-foreground',
  Contacted: 'bg-secondary text-secondary-foreground',
  Qualified: 'bg-[oklch(0.95_0.04_160)] text-[oklch(0.42_0.1_160)]',
  Unqualified: 'bg-muted text-muted-foreground line-through decoration-muted-foreground/40',
};

function Checkbox({ checked }: { checked?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-4 items-center justify-center rounded-[5px] border',
        checked ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-card',
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </span>
  );
}

function Score({ value, heat }: { value: number; heat: Heat }) {
  return (
    <div className="flex items-center gap-2">
      <span className="num w-6 text-right text-[12.5px]">{value}</span>
      <span className="h-1 w-14 overflow-hidden rounded-full bg-secondary">
        <span className={cn('block h-full rounded-full', heatStyle[heat].dot)} style={{ width: `${value}%` }} />
      </span>
    </div>
  );
}

const tabs = [
  { label: 'All leads', count: leadTotals.all },
  { label: 'Assigned to me', count: leadTotals.mine },
  { label: 'Hot', count: leadTotals.hot },
  { label: 'Needs follow-up', count: leadTotals.followUp },
];

export function Leads() {
  const selected = leads.filter((l) => l.selected).length;
  return (
    <Shell
      active="leads"
      title={
        <>
          Sales <span className="mx-1.5 text-border">/</span> <span className="text-foreground">Leads</span>
        </>
      }
      actions={
        <Button size="sm" className="h-8 gap-1.5 rounded-lg px-3 text-[13px]">
          <Plus className="size-3.5" /> Add lead
        </Button>
      }
    >
      <div className="relative flex h-full flex-col px-7 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="flex items-baseline gap-2.5 text-[24px] font-semibold tracking-[-0.02em]">
              Leads <span className="num text-[15px] font-normal text-muted-foreground">{leadTotals.all}</span>
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">Everyone who raised a hand in the last 90 days, newest first.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-[13px]">
              <Upload className="size-3.5" /> Import
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-[13px]">
              <Download className="size-3.5" /> Export
            </Button>
          </div>
        </div>

        <div className="panel mt-5 grid grid-cols-4 divide-x divide-border">
          {leadKpis.map((k) => (
            <div key={k.label} className="flex items-end justify-between px-5 py-4">
              <div>
                <div className="text-[12.5px] text-muted-foreground">{k.label}</div>
                <div className="num mt-1.5 text-[26px] leading-none font-medium">{k.value}</div>
                <div className={cn('num mt-2 text-[12px]', k.good ? 'text-won' : 'text-hot')}>
                  {k.delta} <span className="font-sans text-muted-foreground">vs last week</span>
                </div>
              </div>
              <Spark data={k.spark} good={k.good} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-b border-border">
          <div className="flex gap-6">
            {tabs.map((t, i) => (
              <div
                key={t.label}
                className={cn(
                  '-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-[13px]',
                  i === 0 ? 'border-primary font-medium text-foreground' : 'border-transparent text-muted-foreground',
                )}
              >
                {t.label === 'Hot' && <Flame className="size-3.5 text-hot" />}
                {t.label}
                <span className={cn('num rounded-md px-1.5 text-[11px]', i === 0 ? 'bg-accent text-accent-foreground' : 'bg-secondary')}>{t.count}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pb-2">
            <span className="flex h-7 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-[12.5px] text-muted-foreground">
              <ListFilter className="size-3.5" /> Owner: <span className="text-foreground">Anyone</span>
            </span>
            <span className="flex h-7 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-[12.5px] text-muted-foreground">
              <ArrowDownUp className="size-3.5" /> Last touch
            </span>
          </div>
        </div>

        <div className="panel mt-4 overflow-hidden">
          <Table className="text-[13px]">
            <TableHeader>
              <TableRow className="bg-muted/60 hover:bg-muted/60 [&>th]:h-9 [&>th]:text-[12px] [&>th]:font-medium [&>th]:text-muted-foreground">
                <TableHead className="w-10 pl-4">
                  <Checkbox />
                </TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Heat</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Est. value</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last touch</TableHead>
                <TableHead className="w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id} className={cn('[&>td]:py-1.5', l.selected && 'bg-accent/60 hover:bg-accent/60')}>
                  <TableCell className="pl-4">
                    <Checkbox checked={l.selected} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <ContactMark name={l.name} />
                      <div className="leading-tight">
                        <div className="font-medium">{l.name}</div>
                        <div className="text-[12px] text-muted-foreground">{l.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{l.company}</TableCell>
                  <TableCell>
                    <span className={cn('rounded-md px-2 py-0.5 text-[12px] font-medium', stageStyle[l.stage])}>{l.stage}</span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-[12.5px]">
                      <span className={cn('size-1.5 rounded-full', heatStyle[l.heat].dot)} />
                      {heatStyle[l.heat].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{l.source}</TableCell>
                  <TableCell>
                    <Score value={l.score} heat={l.heat} />
                  </TableCell>
                  <TableCell className="num text-right">{usd(l.value)}</TableCell>
                  <TableCell>
                    <Avatar id={l.owner} size="sm" />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{l.lastTouch}</TableCell>
                  <TableCell>
                    <MoreHorizontal className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[12.5px] text-muted-foreground">
            <span>
              Showing <span className="num text-foreground">1–{leads.length}</span> of <span className="num text-foreground">{leadTotals.all}</span>
            </span>
            <span className="flex gap-1.5">
              <span className="rounded-md border border-border px-2 py-0.5">Previous</span>
              <span className="rounded-md border border-border bg-card px-2 py-0.5 text-foreground">Next</span>
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl bg-ink py-1.5 pr-1.5 pl-4 text-[13px] text-white shadow-[0_16px_40px_-12px_oklch(0.22_0.03_262/55%)]">
          <span className="num mr-3">{selected} selected</span>
          {[
            { icon: UserRoundPlus, label: 'Assign' },
            { icon: Send, label: 'Add to sequence' },
            { icon: Tag, label: 'Tag' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-white/85">
              <Icon className="size-3.5" /> {label}
            </span>
          ))}
          <span className="mx-1 h-5 w-px bg-white/15" />
          <span className="flex size-8 items-center justify-center rounded-lg text-white/60">
            <X className="size-4" />
          </span>
        </div>
      </div>
    </Shell>
  );
}
