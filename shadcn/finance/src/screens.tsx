import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronLeft,
  Delete,
  Eye,
  Lock,
  Plus,
  Search,
  Snowflake,
  Sparkles,
} from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, Cell, XAxis } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Amount, Phone } from '@/components/phone';
import {
  balance,
  categories,
  contacts,
  goals,
  money,
  monthSpend,
  transactions,
  user,
  weekSpend,
  type Txn,
} from '@/data';
import { cn } from '@/lib/utils';

const spendChart = { amount: { label: 'Spent', color: 'var(--chart-2)' } } satisfies ChartConfig;

/** Two-option pill switch used at the top of most screens. */
function Segment({ items, active }: { items: string[]; active: number }) {
  return (
    <div className="glass inline-flex rounded-full p-1 text-[13px] font-medium">
      {items.map((item, i) => (
        <span
          key={item}
          className={cn(
            'rounded-full px-4 py-1.5',
            i === active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground',
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function Header({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between pt-2 pb-5">
      {left}
      {right ?? (
        <Avatar className="size-10 ring-2 ring-white/70">
          <AvatarFallback className="bg-accent text-sm font-medium text-accent-foreground">
            {user.initials}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function TxnRow({ t }: { t: Txn }) {
  const Icon = t.icon;
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Icon className="size-[18px]" strokeWidth={1.7} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium">{t.title}</div>
        <div className="truncate text-[12.5px] text-muted-foreground">{t.note}</div>
      </div>
      <span className={cn('num text-[15px] font-medium', t.amount > 0 && 'text-chart-2')}>
        {money(t.amount)}
      </span>
    </div>
  );
}

/* 1. Home ---------------------------------------------------------------- */
export function HomeScreen() {
  return (
    <Phone nav="home">
      <Header left={<Segment items={['Overview', 'Accounts']} active={0} />} />
      <p className="text-[13px] text-muted-foreground">Good morning, {user.first}</p>
      <h1 className="mt-0.5 text-[28px] leading-tight font-medium tracking-[-0.02em]">Your money, calm and clear</h1>

      <div className="mt-5 rounded-[28px] bg-primary p-5 text-primary-foreground shadow-[0_24px_40px_-24px] shadow-primary/70">
        <div className="flex items-center justify-between text-[12.5px] opacity-75">
          <span>Everyday account</span>
          <span className="num">•••• {balance.card}</span>
        </div>
        <Amount whole={balance.whole} cents={balance.cents} className="mt-3 block text-[44px] leading-none" />
        <div className="mt-2 flex items-center gap-2 text-[12.5px]">
          <Badge className="rounded-full bg-accent/90 px-2 text-accent-foreground">{balance.change}</Badge>
          <span className="opacity-70">vs. last month</span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {[
            ['Send', ArrowUpRight],
            ['Request', ArrowDownLeft],
            ['Top up', Plus],
            ['Card', Lock],
          ].map(([label, Icon]) => {
            const I = Icon as typeof Plus;
            return (
              <span key={label as string} className="flex flex-col items-center gap-1.5 text-[11.5px] opacity-90">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <I className="size-[18px]" strokeWidth={1.8} />
                </span>
                {label as string}
              </span>
            );
          })}
        </div>
      </div>

      <div className="glass mt-4 rounded-[24px] p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-muted-foreground">Spent this week</span>
          <span className="num text-[17px] font-medium">$319.00</span>
        </div>
        <ChartContainer config={spendChart} className="mt-2 h-[84px] w-full">
          <BarChart data={weekSpend} barSize={18}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
            <Bar dataKey="amount" radius={[8, 8, 8, 8]} isAnimationActive={false}>
              {weekSpend.map((_, i) => (
                <Cell key={i} fill={i === 4 ? 'var(--chart-1)' : 'var(--chart-3)'} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[15px] font-medium">Recent</span>
        <span className="text-[13px] text-muted-foreground">See all</span>
      </div>
      {transactions.slice(0, 2).map((t) => (
        <TxnRow key={t.id} t={t} />
      ))}
    </Phone>
  );
}

/* 2. Activity ------------------------------------------------------------ */
export function ActivityScreen() {
  const days = ['Today', 'Yesterday', 'Mon, Nov 17'] as const;
  return (
    <Phone nav="activity">
      <Header left={<h1 className="text-[28px] font-medium tracking-[-0.02em]">Activity</h1>} right={<Bell className="size-5" />} />
      <div className="relative">
        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          readOnly
          placeholder="Search payments, people, notes"
          className="glass h-12 rounded-full border-0 pl-11 text-[14px]"
        />
      </div>
      <div className="mt-3 flex gap-2">
        {['All', 'Money in', 'Money out', 'Cards'].map((f, i) => (
          <span
            key={f}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-[13px] font-medium',
              i === 0 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground',
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="glass mt-4 flex items-center justify-between rounded-[22px] p-4">
        <div>
          <div className="text-[12.5px] text-muted-foreground">In</div>
          <div className="num text-[19px] font-medium text-chart-2">+$4,200.00</div>
        </div>
        <span className="h-9 w-px bg-border" />
        <div className="text-right">
          <div className="text-[12.5px] text-muted-foreground">Out</div>
          <div className="num text-[19px] font-medium">−$1,661.59</div>
        </div>
      </div>
      <div className="mt-2 min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
        {days.map((d) => (
          <div key={d}>
            <div className="mt-3 text-[12px] font-medium tracking-wide text-muted-foreground uppercase">{d}</div>
            {transactions
              .filter((t) => t.day === d)
              .map((t) => (
                <TxnRow key={t.id} t={t} />
              ))}
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* 3. Insights ------------------------------------------------------------ */
export function InsightsScreen() {
  return (
    <Phone nav="insights">
      <Header left={<Segment items={['November', 'Year']} active={0} />} />
      <p className="text-[13px] text-muted-foreground">Spent in November</p>
      <Amount whole="2,140" cents="00" className="mt-1 block text-[48px] leading-none" />
      <p className="mt-2 text-[13px] text-muted-foreground">
        <span className="font-medium text-chart-2">$318 less</span> than October, nicely done.
      </p>
      <ChartContainer config={spendChart} className="mt-4 h-[150px] w-full">
        <AreaChart data={monthSpend} margin={{ left: 4, right: 4 }}>
          <defs>
            <linearGradient id="fern" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} />
          <Area dataKey="amount" type="monotone" isAnimationActive={false} stroke="var(--chart-1)" strokeWidth={2} fill="url(#fern)" />
        </AreaChart>
      </ChartContainer>
      <div className="glass mt-4 space-y-4 rounded-[24px] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium">Budgets</span>
          <span className="text-[13px] text-muted-foreground">4 of 6</span>
        </div>
        {categories.map((c) => {
          const pct = Math.min(100, Math.round((c.spent / c.budget) * 100));
          const over = c.spent > c.budget;
          return (
            <div key={c.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-[13.5px]">
                <span className="font-medium">{c.name}</span>
                <span className={cn('num', over ? 'text-destructive' : 'text-muted-foreground')}>
                  ${c.spent} / ${c.budget}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: over ? 'var(--destructive)' : c.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Phone>
  );
}

/* 4. Goals --------------------------------------------------------------- */
export function GoalsScreen() {
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <Phone nav="goals">
      <Header left={<Segment items={['Goals', 'Challenges']} active={1} />} />
      <h1 className="text-[28px] font-medium tracking-[-0.02em]">No-spend weekdays</h1>
      <p className="mt-1 text-[13.5px] text-muted-foreground">Skip takeaway coffee Monday to Friday.</p>

      <div className="mt-5 rounded-[28px] bg-primary p-5 text-primary-foreground">
        <div className="flex items-center justify-between text-[12.5px] opacity-75">
          <span>Saved so far</span>
          <Sparkles className="size-4" />
        </div>
        <Amount whole="27" cents="00" className="mt-2 block text-[44px] leading-none" />
        <p className="mt-1 text-[12.5px] opacity-70">of a $45 weekly target</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[60%] rounded-full bg-honey" />
        </div>
        <div className="mt-5 rounded-[20px] bg-white/8 p-3.5 ring-1 ring-white/12">
          <div className="text-center text-[12.5px] opacity-80">Day 3 of 5</div>
          <div className="mt-2.5 flex justify-between">
            {week.map((d, i) => (
              <span key={i} className="flex flex-col items-center gap-1.5 text-[11px] opacity-80">
                {d}
                <span
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full text-[11px]',
                    i < 3 ? 'bg-accent text-accent-foreground' : i < 5 ? 'bg-white/10' : 'border border-dashed border-white/20',
                  )}
                >
                  {i < 3 ? '✓' : ''}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[15px] font-medium">Savings goals</span>
        <Plus className="size-5 text-muted-foreground" />
      </div>
      {goals.map((g) => {
        const Icon = g.icon;
        const pct = Math.round((g.saved / g.target) * 100);
        return (
          <div key={g.name} className="glass mt-3 rounded-[22px] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Icon className="size-[18px]" strokeWidth={1.7} />
              </span>
              <div className="flex-1">
                <div className="text-[15px] font-medium">{g.name}</div>
                <div className="num text-[12.5px] text-muted-foreground">
                  ${g.saved.toLocaleString()} of ${g.target.toLocaleString()}
                </div>
              </div>
              <span className="num text-[15px] font-medium">{pct}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-chart-2" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </Phone>
  );
}

/* 5. Send ---------------------------------------------------------------- */
export function SendScreen() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];
  return (
    <Phone>
      <Header
        left={
          <span className="glass flex size-10 items-center justify-center rounded-full">
            <ChevronLeft className="size-5" />
          </span>
        }
        right={<span className="text-[15px] font-medium">Send money</span>}
      />
      <div className="flex gap-3 overflow-hidden">
        {contacts.map((c, i) => (
          <span key={c.name} className="flex flex-col items-center gap-1.5 text-[12px]">
            <Avatar className={cn('size-14', i === 1 && 'ring-2 ring-primary ring-offset-2 ring-offset-background')}>
              <AvatarFallback className={cn('text-[14px] font-medium', i === 1 ? 'bg-primary text-primary-foreground' : 'bg-card')}>
                {c.initials}
              </AvatarFallback>
            </Avatar>
            {c.name}
          </span>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-[13px] text-muted-foreground">To Priya Shah</p>
        <Amount whole="120" cents="00" className="mt-2 block text-[64px] leading-none" />
        <Badge variant="secondary" className="mt-3 rounded-full px-3 font-normal">
          From Everyday •••• {balance.card}
        </Badge>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-y-1 text-center">
        {keys.map((k) => (
          <span key={k} className="flex h-14 items-center justify-center text-[24px] font-light">
            {k === 'del' ? <Delete className="size-6" strokeWidth={1.5} /> : k}
          </span>
        ))}
      </div>
      <Button className="mt-3 h-14 w-full rounded-full text-[15px]">Send $120.00</Button>
    </Phone>
  );
}

/* 6. Card ---------------------------------------------------------------- */
export function CardScreen() {
  return (
    <Phone nav="me">
      <Header left={<h1 className="text-[28px] font-medium tracking-[-0.02em]">Your card</h1>} />
      <div className="relative aspect-[1.586] overflow-hidden rounded-[24px] bg-primary p-5 text-primary-foreground">
        <div className="absolute -top-16 -right-10 size-56 rounded-full bg-accent/25 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 size-48 rounded-full bg-honey/25 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium tracking-[-0.01em]">fernwise</span>
            <span className="text-[12px] opacity-70">Debit</span>
          </div>
          <div>
            <div className="num text-[17px] tracking-[0.12em] opacity-90">•••• •••• •••• {balance.card}</div>
            <div className="mt-1 flex justify-between text-[12px] opacity-70">
              <span>{user.name}</span>
              <span className="num">09/29</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ['Freeze', Snowflake],
          ['Details', Eye],
          ['PIN', Lock],
        ].map(([label, Icon]) => {
          const I = Icon as typeof Lock;
          return (
            <span key={label as string} className="glass flex flex-col items-center gap-1.5 rounded-[20px] py-3 text-[12.5px] font-medium">
              <I className="size-[18px]" strokeWidth={1.7} />
              {label as string}
            </span>
          );
        })}
      </div>
      <div className="glass mt-4 rounded-[24px] p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] font-medium">Monthly limit</span>
          <span className="num text-[13px] text-muted-foreground">$1,240 / $3,000</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[41%] rounded-full bg-chart-1" />
        </div>
      </div>
      <div className="glass mt-4 divide-y divide-border rounded-[24px] px-4">
        {[
          ['Online payments', true],
          ['Contactless', true],
          ['Withdrawals abroad', false],
        ].map(([label, on]) => (
          <div key={label as string} className="flex items-center justify-between py-3.5 text-[14.5px]">
            {label as string}
            <Switch checked={on as boolean} />
          </div>
        ))}
      </div>
    </Phone>
  );
}

export const screens = {
  home: HomeScreen,
  activity: ActivityScreen,
  insights: InsightsScreen,
  goals: GoalsScreen,
  send: SendScreen,
  card: CardScreen,
};
