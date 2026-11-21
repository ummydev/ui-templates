import { CalendarDays, Car, Flame, Heart, Images, Leaf, MessageSquare, Phone, Share, Sun, Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents, byId, listings, mortgage, usd } from '@/data';
import { cn } from '@/lib/utils';
import { ListingCard, Site, Specs } from '@/layout';

export function Property() {
  const l = byId('larkspur');
  const a = agents[l.agent];
  const m = mortgage(l.price);
  const similar = listings.filter((x) => x.id !== l.id && x.type === 'House').slice(0, 3);
  const days = [
    { d: 'Sat', n: 22 },
    { d: 'Sun', n: 23 },
    { d: 'Mon', n: 24 },
    { d: 'Tue', n: 25 },
  ];
  const parts = [
    { label: 'Principal & interest', v: m.pi, c: 'bg-pine' },
    { label: 'Property tax', v: m.tax, c: 'bg-brass' },
    { label: 'Home insurance', v: m.insurance, c: 'bg-chart-4' },
  ];
  return (
    <Site active="listings">
      <div className="mx-auto max-w-[1312px] pt-8">
        <div className="flex items-center justify-between text-[14px] text-muted-foreground">
          <span>Homes for sale / {l.area} / {l.address}</span>
          <span className="flex gap-5 font-medium text-foreground">
            <span className="flex items-center gap-1.5">
              <Share className="size-4" /> Share
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="size-4" /> Save
            </span>
          </span>
        </div>

        <div className="mt-5 grid h-[560px] grid-cols-[2fr_1fr_1fr] grid-rows-2 gap-3 overflow-hidden rounded-[20px]">
          <div className="photo row-span-2">
            <img src={l.image} alt={l.title} />
          </div>
          <div className="photo col-span-2">
            <img src="/images/living.webp" alt="Living room" />
          </div>
          <div className="photo">
            <img src="/images/kitchen.webp" alt="Kitchen" />
          </div>
          <div className="photo relative">
            <img src="/images/bedroom.webp" alt="Main bedroom" />
            <span className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold">
              <Images className="size-4" /> All 24 photos
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-[1fr_400px] gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              {l.status && <span className="rounded-full bg-accent px-3 py-1 text-[12.5px] font-semibold text-accent-foreground">{l.status}</span>}
              <span className="text-[14px] text-muted-foreground">
                {l.type} · {l.area}
              </span>
            </div>
            <h1 className="display mt-4 text-[60px] leading-[0.95]">{l.title}</h1>
            <div className="mt-3 text-[17px] text-muted-foreground">{l.address}, {l.area}</div>

            <div className="mt-8 grid grid-cols-5 divide-x divide-border rounded-[16px] border border-border bg-card">
              {[
                { k: 'Bedrooms', v: l.beds },
                { k: 'Bathrooms', v: l.baths },
                { k: 'Living area', v: `${l.sqft.toLocaleString('en-US')} sq ft` },
                { k: 'Lot', v: `${l.lotAcres} acres` },
                { k: 'Built', v: l.year },
              ].map((f) => (
                <div key={f.k} className="px-5 py-4">
                  <div className="text-[13px] text-muted-foreground">{f.k}</div>
                  <div className="display num mt-1 text-[22px]">{f.v}</div>
                </div>
              ))}
            </div>

            <h2 className="display mt-14 text-[32px]">About this home</h2>
            <div className="mt-4 space-y-4 text-[16.5px] leading-relaxed text-foreground/80">
              <p>
                Built in {l.year} by a local architect for her own family, this cedar-clad house sits on {l.lotAcres} of an acre at the quiet end of Larkspur Lane, with tall
                pines on three sides. The ground floor is one open room: a living space around a stone fireplace, an oak kitchen with a stone island, and floor-to-ceiling
                glass onto the garden.
              </p>
              <p>
                Upstairs are {l.beds} bedrooms, including a main suite that looks straight into the trees. The house is heated by an air-source heat pump and the roof
                carries solar panels, so winter bills stay low.
              </p>
            </div>

            <h2 className="display mt-14 text-[32px]">Features</h2>
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                { i: Sun, t: 'Solar panels, 8 kW' },
                { i: Leaf, t: 'Heat pump heating' },
                { i: Flame, t: 'Stone wood-burning fireplace' },
                { i: Trees, t: 'Private wooded garden' },
                { i: Car, t: 'Two-car garage, EV charger' },
                { i: CalendarDays, t: 'Available from January' },
              ].map(({ i: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 rounded-[14px] bg-secondary px-4 py-3.5 text-[15px]">
                  <Icon className="size-5 text-accent-foreground" strokeWidth={1.6} /> {t}
                </div>
              ))}
            </div>

            <h2 className="display mt-14 text-[32px]">Monthly cost estimate</h2>
            <div className="mt-5 rounded-[18px] border border-border bg-card p-7">
              <div className="flex items-end justify-between">
                <div>
                  <div className="display num text-[40px] leading-none">
                    {usd(m.total)}
                    <span className="text-[18px] text-muted-foreground">/mo</span>
                  </div>
                  <div className="mt-2 text-[14px] text-muted-foreground">
                    {m.downPct}% down ({usd(m.down)}), {m.years}-year fixed at {m.rate}%
                  </div>
                </div>
                <span className="text-[14px] font-medium underline underline-offset-4">Change assumptions</span>
              </div>
              <div className="mt-6 flex h-3 gap-1 overflow-hidden rounded-full">
                {parts.map((p) => (
                  <span key={p.label} className={p.c} style={{ flexGrow: p.v }} />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4 text-[14.5px]">
                {parts.map((p) => (
                  <div key={p.label} className="flex items-center gap-2.5">
                    <span className={cn('size-2.5 rounded-full', p.c)} />
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="num ml-auto font-medium">{usd(p.v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[20px] border border-border bg-card p-7">
              <div className="text-[14px] text-muted-foreground">Asking price</div>
              <div className="display num mt-1 text-[44px] leading-none">{usd(l.price)}</div>
              <Specs l={l} className="mt-4" />
              <div className="mt-7 text-[15px] font-semibold">Book a viewing</div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <span key={d.n} className={cn('flex flex-col items-center rounded-[12px] border py-2.5', i === 0 ? 'border-foreground bg-foreground text-background' : 'border-border')}>
                    <span className="text-[12px] opacity-70">{d.d}</span>
                    <span className="display num text-[20px]">{d.n}</span>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2 text-[13.5px]">
                {['10:00', '11:30', '14:00'].map((t, i) => (
                  <span key={t} className={cn('num flex-1 rounded-full border py-2 text-center', i === 1 ? 'border-foreground font-semibold' : 'border-border')}>
                    {t}
                  </span>
                ))}
              </div>
              <Button className="mt-5 h-12 w-full rounded-full text-[15px]">Request Sat 22 Nov at 11:30</Button>
              <p className="mt-3 text-center text-[13px] text-muted-foreground">Open house this Saturday, 10:00–13:00</p>
            </div>

            <div className="rounded-[20px] bg-secondary p-6">
              <div className="flex items-center gap-4">
                <div className="photo size-16 rounded-full">
                  <img src={a.photo} alt={a.name} />
                </div>
                <div>
                  <div className="text-[16px] font-semibold">{a.name}</div>
                  <div className="text-[13.5px] text-muted-foreground">
                    {a.title} · {a.years} years
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2.5 text-[14px] font-medium">
                <span className="flex items-center justify-center gap-2 rounded-full bg-card py-2.5">
                  <Phone className="size-4" /> Call
                </span>
                <span className="flex items-center justify-center gap-2 rounded-full bg-card py-2.5">
                  <MessageSquare className="size-4" /> Message
                </span>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-24">
          <h2 className="display text-[44px] leading-none">Similar houses nearby</h2>
          <div className="mt-8 grid grid-cols-3 gap-7">
            {similar.map((x) => (
              <ListingCard key={x.id} l={x} />
            ))}
          </div>
        </section>
      </div>
    </Site>
  );
}
