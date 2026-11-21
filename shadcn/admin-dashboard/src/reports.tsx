import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, categoryRevenue, cohorts, fmt, funnel, pct, totals, usd } from '@/data';
import { Shell } from '@/shell';

export function Reports() {
  const top = funnel[0].n;
  return (
    <Shell
      active="reports"
      title="Reports"
      actions={
        <Button className="h-9 gap-1.5 rounded-[10px] px-3.5 text-[13px] font-semibold">
          <Download className="size-4" /> Export CSV
        </Button>
      }
    >
      <div className="grid h-full grid-rows-[auto_1fr] gap-5">
        <section className="tile p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">Conversion funnel</h2>
              <p className="mt-1 text-[12.5px] text-muted-foreground">From first visit to purchase, last 30 days</p>
            </div>
            <div className="text-right">
              <div className="num text-[26px] font-medium">{pct(funnel[funnel.length - 1].n / top, 2)}</div>
              <div className="text-[12.5px] text-muted-foreground">of sessions end in a purchase</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-3">
            {funnel.map((f, i) => {
              const prev = i > 0 ? funnel[i - 1].n : f.n;
              return (
                <div key={f.step}>
                  <div className="flex h-[190px] items-end rounded-[12px] bg-secondary/60 p-1.5">
                    <div className="w-full rounded-[9px] bg-primary" style={{ height: `${Math.max(4, (f.n / top) * 100)}%`, opacity: 1 - i * 0.12 }} />
                  </div>
                  <div className="mt-3 text-[13px] text-muted-foreground">{f.step}</div>
                  <div className="num mt-0.5 text-[20px] font-medium">{fmt(f.n)}</div>
                  <div className="num mt-0.5 text-[12px] text-muted-foreground">{i === 0 ? '100%' : `${pct(f.n / prev, 1)} of previous step`}</div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid min-h-0 grid-cols-[1fr_360px] gap-5">
          <section className="tile p-6">
            <h2 className="text-[15px] font-semibold">Repeat purchases by cohort</h2>
            <p className="mt-1 text-[12.5px] text-muted-foreground">Share of each month’s new customers who ordered again, by months since their first order</p>
            <div className="mt-5 grid grid-cols-[90px_90px_repeat(6,1fr)] gap-1.5 text-[12px]">
              <span className="text-muted-foreground">Cohort</span>
              <span className="text-right text-muted-foreground">Customers</span>
              {[0, 1, 2, 3, 4, 5].map((m) => (
                <span key={m} className="text-center text-muted-foreground">
                  Month {m}
                </span>
              ))}
              {cohorts.map((c) => (
                <div key={c.month} className="contents">
                  <span className="flex h-11 items-center font-medium">{c.month} 2026</span>
                  <span className="num flex h-11 items-center justify-end">{fmt(c.customers)}</span>
                  {[0, 1, 2, 3, 4, 5].map((m) => {
                    const r = c.retention[m];
                    if (r === undefined) return <span key={m} className="h-11 rounded-[8px] border border-dashed border-border" />;
                    const raw = m === 0 ? 1 : Math.min(1, r / 0.4);
                    // Two bands so every cell keeps 4.5:1 text: dim cells with light text, bright cells with dark text.
                    const strength = raw < 0.55 ? 0.2 + (raw / 0.55) * 0.27 : 0.6 + ((raw - 0.55) / 0.45) * 0.4;
                    return (
                      <span
                        key={m}
                        className="num flex h-11 items-center justify-center rounded-[8px]"
                        style={{
                          background: `color-mix(in srgb, var(--primary) ${Math.round(strength * 85)}%, var(--secondary))`,
                          color: strength >= 0.6 ? 'var(--primary-foreground)' : 'var(--foreground)',
                        }}
                      >
                        {pct(r, 0)}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          <section className="tile p-6">
            <h2 className="text-[15px] font-semibold">Revenue by category</h2>
            <div className="num mt-3 text-[28px] font-medium">{usd(totals.revenue)}</div>
            <div className="mt-4 flex h-3 gap-1 overflow-hidden rounded-full">
              {categories.map((c, i) => (
                <span key={c.name} style={{ flexGrow: c.share, background: `var(--chart-${i + 1})` }} />
              ))}
            </div>
            <ul className="mt-5 space-y-3 text-[13px]">
              {categories.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2.5">
                  <span className="size-2.5 rounded-full" style={{ background: `var(--chart-${i + 1})` }} />
                  {c.name}
                  <span className="num ml-auto">{usd(categoryRevenue[i])}</span>
                  <span className="num w-10 text-right text-muted-foreground">{pct(c.share, 0)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Shell>
  );
}
