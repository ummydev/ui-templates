import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  PhoneCall,
  Sparkles,
  StickyNote,
  UserRoundCheck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { activity, dealStages, focus, owners, stageProbability, tasks, usd } from '@/data';
import { cn } from '@/lib/utils';
import { Avatar, ContactMark, Shell } from '@/shell';

const kindIcon = {
  email: Mail,
  call: PhoneCall,
  meeting: Users,
  note: StickyNote,
  lead: Sparkles,
};

export function LeadDetail() {
  const { lead, deal } = focus;
  const stageIndex = dealStages.findIndex((s) => s.name === deal.stage);
  return (
    <Shell
      active="lead"
      title={
        <>
          Sales <span className="mx-1.5 text-border">/</span> Leads <span className="mx-1.5 text-border">/</span>{' '}
          <span className="text-foreground">{lead.name}</span>
        </>
      }
      actions={
        <Button size="sm" className="h-8 gap-1.5 rounded-lg px-3 text-[13px]">
          <Mail className="size-3.5" /> Email
        </Button>
      }
    >
      <div className="flex h-full flex-col px-7 pt-6">
        <div className="flex items-center gap-4">
          <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
            <ArrowLeft className="size-4" />
          </span>
          <ContactMark name={lead.name} className="size-12 rounded-xl text-[15px]" />
          <div>
            <h1 className="flex items-center gap-2.5 text-[22px] font-semibold tracking-[-0.02em]">
              {lead.name}
              <span className="flex items-center gap-1.5 rounded-md bg-[oklch(0.95_0.05_32)] px-2 py-0.5 text-[12px] font-medium text-hot">
                <span className="size-1.5 rounded-full bg-hot" /> Hot · {lead.score}
              </span>
            </h1>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {focus.title} at <span className="text-foreground">{lead.company}</span> · <span className="code">{lead.id}</span>
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-[13px]">
              <PhoneCall className="size-3.5" /> Log call
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-[13px]">
              <CalendarDays className="size-3.5" /> Book meeting
            </Button>
          </div>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-[280px_1fr_320px] gap-5 pb-6">
          {/* Left: who they are */}
          <div className="space-y-4">
            <section className="panel p-4">
              <h2 className="text-[13px] font-medium">Contact</h2>
              <dl className="mt-3 space-y-3 text-[13px]">
                {[
                  { icon: Mail, value: lead.email },
                  { icon: Phone, value: focus.phone },
                  { icon: MapPin, value: focus.location },
                  { icon: Building2, value: `${lead.company} · ${focus.companySize}` },
                ].map(({ icon: Icon, value }) => (
                  <div key={value} className="flex items-center gap-2.5">
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span>{value}</span>
                  </div>
                ))}
              </dl>
            </section>
            <section className="panel p-4 text-[13px]">
              <h2 className="font-medium">Details</h2>
              <dl className="mt-3 grid grid-cols-[96px_1fr] gap-y-2.5">
                <dt className="text-muted-foreground">Owner</dt>
                <dd className="flex items-center gap-2">
                  <Avatar id={lead.owner} size="sm" /> {owners[lead.owner].name}
                </dd>
                <dt className="text-muted-foreground">Stage</dt>
                <dd>{lead.stage}</dd>
                <dt className="text-muted-foreground">Source</dt>
                <dd>{lead.source}</dd>
                <dt className="text-muted-foreground">Last touch</dt>
                <dd>{lead.lastTouch}</dd>
              </dl>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {focus.tags.map((t) => (
                  <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[12px] text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </section>
            <section className="panel p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium">Lead score</h2>
                <span className="num text-[13px]">{lead.score}/100</span>
              </div>
              <div className="mt-3 space-y-2.5 text-[12.5px]">
                {[
                  { label: 'Fit', value: 92 },
                  { label: 'Engagement', value: 84 },
                  { label: 'Timing', value: 80 },
                ].map((s) => (
                  <div key={s.label} className="grid grid-cols-[84px_1fr_28px] items-center gap-2">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${s.value}%` }} />
                    </span>
                    <span className="num text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Middle: what happened */}
          <section className="panel flex min-h-0 flex-col">
            <div className="flex items-center gap-5 border-b border-border px-5 pt-3.5 text-[13px]">
              {['Activity', 'Emails', 'Calls', 'Notes', 'Files'].map((t, i) => (
                <span key={t} className={cn('-mb-px border-b-2 pb-3', i === 0 ? 'border-primary font-medium' : 'border-transparent text-muted-foreground')}>
                  {t}
                </span>
              ))}
            </div>
            <div className="mx-5 mt-4 flex items-center gap-2.5 rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] text-muted-foreground">
              <MessageSquareText className="size-4" /> Add a note, @mention a teammate…
            </div>
            <ol className="relative mt-5 space-y-5 px-5 pb-5">
              <span className="absolute top-2 bottom-8 left-[35px] w-px bg-border" />
              {activity.map((a) => {
                const Icon = kindIcon[a.kind];
                return (
                  <li key={a.title} className="relative flex gap-3.5">
                    <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                      <Icon className="size-3.5" />
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[13.5px] font-medium">{a.title}</span>
                        <span className="shrink-0 text-[12px] text-muted-foreground">{a.when}</span>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{a.body}</p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <Avatar id={a.who} size="sm" className="size-5 text-[9px] ring-0" /> {owners[a.who].name}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Right: the deal and what's next */}
          <div className="space-y-4">
            <section className="panel p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium">Deal</h2>
                <span className="code text-[12px] text-muted-foreground">{deal.id}</span>
              </div>
              <div className="mt-3 text-[13.5px] font-medium">
                {deal.company} · {deal.title}
              </div>
              <div className="num mt-1 text-[26px] leading-none font-medium">{usd(deal.value)}</div>
              <div className="mt-1.5 text-[12px] text-muted-foreground">
                Weighted <span className="num text-foreground">{usd(deal.value * stageProbability(deal.stage))}</span> · {deal.days} days in {deal.stage}
              </div>
              <div className="mt-4 flex gap-1">
                {dealStages.map((s, i) => (
                  <span key={s.name} className={cn('h-1.5 flex-1 rounded-full', i <= stageIndex ? 'bg-primary' : 'bg-secondary')} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11.5px] text-muted-foreground">
                {dealStages.map((s, i) => (
                  <span key={s.name} className={cn(i === stageIndex && 'font-medium text-foreground')}>
                    {s.name}
                  </span>
                ))}
              </div>
            </section>

            <section className="panel p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-medium">Tasks</h2>
                <span className="text-[12px] text-primary">+ Add</span>
              </div>
              <ul className="mt-3 space-y-3">
                {tasks.map((t) => (
                  <li key={t.title} className="flex items-start gap-2.5 text-[13px]">
                    <span
                      className={cn(
                        'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border',
                        t.done ? 'border-won bg-won text-white' : 'border-input',
                      )}
                    >
                      {t.done && <Check className="size-2.5" strokeWidth={3} />}
                    </span>
                    <div className="flex-1 leading-snug">
                      <div className={cn(t.done && 'text-muted-foreground line-through')}>{t.title}</div>
                      <div className="num mt-0.5 text-[11.5px] text-muted-foreground">Due {t.due}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl bg-ink p-4 text-white">
              <div className="flex items-center gap-2 text-[13px] font-medium">
                <UserRoundCheck className="size-4 text-[var(--tone-1)]" /> Buying committee
              </div>
              <ul className="mt-3 space-y-2.5 text-[13px]">
                {[
                  { name: lead.name, role: 'Champion', note: 'Head of Operations' },
                  { name: 'Ethan Brooks', role: 'Signs', note: 'CFO, approves above $40k' },
                  { name: 'Nadia Chen', role: 'Reviews', note: 'IT, needs SSO' },
                ].map((p) => (
                  <li key={p.name} className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-[11px]">
                      {p.name
                        .split(' ')
                        .map((x) => x[0])
                        .join('')}
                    </span>
                    <div className="flex-1 leading-tight">
                      <div>{p.name}</div>
                      <div className="text-[11.5px] text-white/55">{p.note}</div>
                    </div>
                    <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">{p.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Shell>
  );
}
