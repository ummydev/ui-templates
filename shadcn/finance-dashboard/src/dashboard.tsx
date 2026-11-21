import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CreditCard,
  Download,
  LayoutGrid,
  LineChart,
  PiggyBank,
  Plus,
  Receipt,
  Search,
  Settings,
  Target,
  Wallet,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categories, transactions, user, money } from '@/data';
import { cn } from '@/lib/utils';

const cashflow = [
  { m: 'Jun', income: 5200, spend: 3900 },
  { m: 'Jul', income: 5200, spend: 4300 },
  { m: 'Aug', income: 5600, spend: 4100 },
  { m: 'Sep', income: 5600, spend: 3700 },
  { m: 'Oct', income: 5800, spend: 4460 },
  { m: 'Nov', income: 6100, spend: 3980 },
];
const flowChart = {
  income: { label: 'Income', color: 'var(--chart-2)' },
  spend: { label: 'Spending', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const split = [
  { name: 'Home', value: 1450, color: 'var(--chart-1)' },
  { name: 'Groceries', value: 386, color: 'var(--chart-2)' },
  { name: 'Eating out', value: 212, color: 'var(--chart-4)' },
  { name: 'Transport', value: 92, color: 'var(--chart-3)' },
];

const accounts = [
  { name: 'Everyday', kind: 'Checking •••• 4821', balance: '$12,480.36', icon: Wallet },
  { name: 'Rainy day', kind: 'Savings •••• 0937', balance: '$18,200.00', icon: PiggyBank },
  { name: 'Travel card', kind: 'Credit •••• 5512', balance: '−$642.18', icon: CreditCard },
];

const bills = [
  { name: 'Rent', date: 'Dec 1', amount: '1,450.00' },
  { name: 'Electricity', date: 'Dec 3', amount: '68.40' },
  { name: 'Phone', date: 'Dec 5', amount: '24.00' },
];

const nav = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Transactions', icon: Receipt },
  { label: 'Cash flow', icon: LineChart },
  { label: 'Budgets', icon: Target },
  { label: 'Accounts', icon: Wallet },
  { label: 'Bills', icon: CalendarDays },
];

/** `rising` sets the arrow, `good` the color: falling spending is good news. */
function Kpi({ label, value, delta, rising, good }: { label: string; value: string; delta: string; rising: boolean; good: boolean }) {
  return (
    <div className="glass rounded-[22px] p-5">
      <div className="text-[13px] text-muted-foreground">{label}</div>
      <div className="num mt-2 text-[30px] leading-none font-light">{value}</div>
      <div className={cn('mt-3 flex items-center gap-1 text-[12.5px] font-medium', good ? 'text-chart-2' : 'text-destructive')}>
        {rising ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
        {delta}
        <span className="font-normal text-muted-foreground">vs. October</span>
      </div>
    </div>
  );
}

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('glass rounded-[24px] p-5', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Fernwise finance dashboard: one desktop screen, 1440×1000. */
export function Dashboard() {
  return (
    <div className="sage-backdrop flex h-[1000px] w-[1440px] shrink-0 overflow-hidden rounded-[28px] text-foreground ring-1 ring-black/5">
      <aside className="flex w-[232px] shrink-0 flex-col gap-1 p-5">
        <div className="mb-6 flex items-center gap-2 px-2 pt-1 text-[17px] font-semibold tracking-[-0.02em]">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">f</span>
          fernwise
        </div>
        {nav.map(({ label, icon: Icon }, i) => (
          <span
            key={label}
            className={cn(
              'flex items-center gap-3 rounded-full px-4 py-2.5 text-[14px]',
              i === 0 ? 'bg-primary font-medium text-primary-foreground' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
            {label}
          </span>
        ))}
        <div className="mt-auto rounded-[22px] bg-primary p-4 text-primary-foreground">
          <div className="text-[13px] opacity-75">Savings rate</div>
          <div className="num mt-1 text-[28px] font-light">34.8%</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[70%] rounded-full bg-honey" />
          </div>
          <div className="mt-2 text-[12px] opacity-70">Goal: 50% by spring</div>
        </div>
        <span className="mt-3 flex items-center gap-3 px-4 py-2 text-[14px] text-muted-foreground">
          <Settings className="size-[18px]" strokeWidth={1.8} /> Settings
        </span>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-5 py-5 pr-5">
        <header className="flex items-center gap-3">
          <div>
            <p className="text-[13px] text-muted-foreground">Friday, November 21</p>
            <h1 className="text-[26px] leading-tight font-medium tracking-[-0.02em]">Good afternoon, {user.first}</h1>
          </div>
          <div className="relative ml-auto w-[320px]">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input readOnly placeholder="Search transactions" className="glass h-11 rounded-full border-0 pl-11" />
          </div>
          <span className="glass flex size-11 items-center justify-center rounded-full">
            <Bell className="size-[18px]" strokeWidth={1.8} />
          </span>
          <Button variant="outline" className="glass h-11 rounded-full border-0 px-4">
            <Download /> Export
          </Button>
          <Button className="h-11 rounded-full px-5">
            <Plus /> Add transaction
          </Button>
          <Avatar className="size-11 ring-2 ring-white/70">
            <AvatarFallback className="bg-accent font-medium text-accent-foreground">{user.initials}</AvatarFallback>
          </Avatar>
        </header>

        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Net worth" value="$30,038" delta="+2.9%" rising good />
          <Kpi label="Income this month" value="$6,100" delta="+5.2%" rising good />
          <Kpi label="Spending this month" value="$3,980" delta="−10.8%" rising={false} good />
          <Kpi label="Eating out" value="$212" delta="+17.8%" rising good={false} />
        </div>

        <div className="grid min-h-0 grid-cols-[1fr_340px] gap-4">
          <Panel
            title="Cash flow"
            action={
              <div className="flex gap-1 text-[12.5px]">
                {['6M', '1Y', 'All'].map((r, i) => (
                  <span key={r} className={cn('rounded-full px-3 py-1', i === 0 ? 'bg-card shadow-sm' : 'text-muted-foreground')}>
                    {r}
                  </span>
                ))}
              </div>
            }
          >
            <div className="mb-2 flex gap-5 text-[12.5px] text-muted-foreground">
              <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-chart-2" />Income</span>
              <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-chart-4" />Spending</span>
            </div>
            <ChartContainer config={flowChart} className="h-[190px] w-full">
              <AreaChart data={cashflow} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={44} tickFormatter={(v) => `$${v / 1000}k`} />
                <Area dataKey="income" type="monotone" stroke="var(--chart-1)" strokeWidth={2} fill="url(#inc)" isAnimationActive={false} />
                <Area dataKey="spend" type="monotone" stroke="var(--chart-4)" strokeWidth={2} strokeDasharray="5 4" fill="transparent" isAnimationActive={false} />
              </AreaChart>
            </ChartContainer>
          </Panel>

          <Panel title="Where it went" action={<span className="text-[12.5px] text-muted-foreground">November</span>}>
            <div className="relative mx-auto size-[132px]">
              <ChartContainer config={{}} className="size-[132px]">
                <PieChart>
                  <Pie data={split} dataKey="value" innerRadius={46} outerRadius={64} paddingAngle={3} stroke="none" isAnimationActive={false}>
                    {split.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="num text-[22px] font-light">$2,140</span>
                <span className="text-[11.5px] text-muted-foreground">spent</span>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {categories.map((c) => {
                const over = c.spent > c.budget;
                return (
                  <div key={c.name} className="flex items-center gap-3 text-[13.5px]">
                    <i className="size-2.5 rounded-full" style={{ background: c.color }} />
                    <span className="flex-1">{c.name}</span>
                    <span className={cn('num', over ? 'text-destructive' : 'text-muted-foreground')}>
                      ${c.spent} / ${c.budget}
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_340px] gap-4">
          <Panel title="Recent transactions" action={<span className="text-[13px] text-muted-foreground">View all</span>} className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Merchant</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 4).map((t) => {
                  const Icon = t.icon;
                  const category = t.amount > 0 ? 'Income' : t.note.split(' · ')[0];
                  return (
                    <TableRow key={t.id} className="border-border hover:bg-white/40">
                      <TableCell className="py-2.5">
                        <span className="flex items-center gap-3 font-medium">
                          <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                            <Icon className="size-4" strokeWidth={1.7} />
                          </span>
                          {t.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-full font-normal">{category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t.day}</TableCell>
                      <TableCell className={cn('num text-right font-medium', t.amount > 0 && 'text-chart-2')}>{money(t.amount)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Panel>

          <div className="flex min-h-0 flex-col gap-4">
            <Panel title="Accounts">
              <div className="space-y-3">
                {accounts.map(({ name, kind, balance, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Icon className="size-4" strokeWidth={1.7} />
                    </span>
                    <div className="flex-1">
                      <div className="text-[14px] font-medium">{name}</div>
                      <div className="text-[12px] text-muted-foreground">{kind}</div>
                    </div>
                    <span className="num text-[14px] font-medium">{balance}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Upcoming bills" className="flex-1">
              <div className="space-y-2.5">
                {bills.map((b) => (
                  <div key={b.name} className="grid grid-cols-[1fr_64px_88px] items-center text-[13.5px]">
                    <span>{b.name}</span>
                    <span className="text-muted-foreground">{b.date}</span>
                    <span className="num text-right font-medium">${b.amount}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </main>
    </div>
  );
}
