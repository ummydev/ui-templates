import { Download } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { aov, change, channels, conversion, countries, days, fmt, live, pct, prevAov, prevConversion, previous, topPages, totals, usd } from '@/data';
import { Delta, Shell } from '@/shell';

function Kpi({ label, value, delta, spark, k }: { label: string; value: string; delta: number; spark: number[]; k: string }) {
  const data = spark.map((v, i) => ({ i, v }));
  return (
    <div className="tile relative overflow-hidden p-5">
      <div className="flex items-center justify-between text-[13px] text-muted-foreground">
        {label} <Delta v={delta} />
      </div>
      <div className="num mt-3 text-[34px] leading-none font-medium">{value}</div>
      <div className="mt-2 text-[12px] text-muted-foreground">vs previous 30 days</div>
      <div className="h-6" />
      <div className="absolute right-4 bottom-4">
      <AreaChart width={110} height={40} data={data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        <defs>
          <linearGradient id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area dataKey="v" stroke="var(--chart-1)" strokeWidth={1.6} fill={`url(#g-${k})`} isAnimationActive={false} />
      </AreaChart>
      </div>
    </div>
  );
}

export function Overview() {
  const maxCh = Math.max(...channels.map((c) => c.visitors));
  return (
    <Shell
      active="overview"
      title="Overview"
      actions={
        <Button className="h-9 gap-1.5 rounded-[10px] px-3.5 text-[13px] font-semibold">
          <Download className="size-4" /> Export
        </Button>
      }
    >
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-5">
        <div className="grid grid-cols-4 gap-5">
          <Kpi k="v" label="Visitors" value={fmt(totals.visitors)} delta={change(totals.visitors, previous.visitors)} spark={days.map((d) => d.visitors)} />
          <Kpi k="r" label="Revenue" value={usd(totals.revenue)} delta={change(totals.revenue, previous.revenue)} spark={days.map((d) => d.revenue)} />
          <Kpi k="c" label="Conversion rate" value={pct(conversion, 2)} delta={change(conversion, prevConversion)} spark={days.map((d) => d.orders / d.visitors)} />
          <Kpi k="a" label="Average order" value={usd(Math.round(aov))} delta={change(aov, prevAov)} spark={days.map((d) => d.revenue / d.orders)} />
        </div>

        <div className="grid min-h-0 grid-cols-[1fr_340px] gap-5">
          <section className="tile flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[15px] font-semibold">Traffic and orders</h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground">Daily visitors and orders, last 30 days</p>
              </div>
              <div className="flex items-center gap-4 text-[12.5px] text-muted-foreground">
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-foreground">
                  <span className="size-1.5 rounded-full bg-primary" /> <span className="num">{live.now}</span> visitors right now
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-1" /> Visitors
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-2" /> Orders ×25
                </span>
              </div>
            </div>
            <AreaChart width={770} height={318} data={days.map((d) => ({ ...d, scaled: d.orders * 25 }))} margin={{ top: 20, right: 6, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="oklch(1 0 0 / 6%)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} interval={4} tick={{ fill: 'var(--muted-foreground)', fontSize: 11.5 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11.5 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Area dataKey="visitors" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gv)" isAnimationActive={false} />
              <Area dataKey="scaled" stroke="var(--chart-2)" strokeWidth={1.6} strokeDasharray="4 3" fill="none" isAnimationActive={false} />
            </AreaChart>
          </section>

          <section className="tile p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Visitors by channel</h2>
              <span className="num text-[12.5px] text-muted-foreground">{fmt(totals.visitors)}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {channels.map((c) => (
                <li key={c.name}>
                  <div className="flex justify-between text-[13px]">
                    <span>{c.name}</span>
                    <span className="num text-muted-foreground">
                      {fmt(c.visitors)} · {pct(c.visitors / totals.visitors, 0)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${(c.visitors / maxCh) * 100}%`, background: c.color }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-5">
          <section className="tile overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <h2 className="text-[15px] font-semibold">Top pages</h2>
              <span className="text-[12.5px] text-muted-foreground">by views</span>
            </div>
            <div className="grid grid-cols-[1fr_110px_90px_120px] border-y border-border bg-secondary/50 px-5 py-2 text-[12px] text-muted-foreground">
              <span>Page</span>
              <span className="text-right">Views</span>
              <span className="text-right">Avg. time</span>
              <span className="text-right">Bounce</span>
            </div>
            {topPages.map((p) => (
              <div key={p.path} className="grid grid-cols-[1fr_110px_90px_120px] items-center border-b border-border px-5 py-[7px] text-[13px] last:border-0">
                <span className="flex items-baseline gap-2.5">
                  {p.title} <span className="code truncate text-[11.5px] text-muted-foreground">{p.path}</span>
                </span>
                <span className="num text-right">{fmt(p.views)}</span>
                <span className="num text-right text-muted-foreground">{p.avg}</span>
                <span className="flex items-center justify-end gap-2">
                  <span className="h-1 w-12 overflow-hidden rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-chart-2" style={{ width: `${p.bounce * 100}%` }} />
                  </span>
                  <span className="num w-9 text-right text-muted-foreground">{pct(p.bounce, 0)}</span>
                </span>
              </div>
            ))}
          </section>

          <section className="tile p-5">
            <h2 className="text-[15px] font-semibold">Top countries</h2>
            <BarChart
              width={300}
              height={200}
              layout="vertical"
              data={countries.filter((c) => c.code !== '··').map((c) => ({ ...c, visitors: Math.round(c.share * totals.visitors) }))}
              margin={{ top: 14, right: 40, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="code" tickLine={false} axisLine={false} width={34} tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontFamily: 'var(--font-mono)' }} />
              <Bar
                dataKey="visitors"
                fill="var(--chart-2)"
                radius={6}
                barSize={18}
                isAnimationActive={false}
                label={{ position: 'right', fill: 'var(--foreground)', fontSize: 12, fontFamily: 'var(--font-mono)', formatter: (v: unknown) => fmt(Number(v)) }}
              />
            </BarChart>
            <div className="num mt-1 flex justify-between border-t border-border pt-3 text-[12.5px] text-muted-foreground">
              <span>Other countries</span>
              <span>{fmt(Math.round(countries[countries.length - 1].share * totals.visitors))}</span>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
