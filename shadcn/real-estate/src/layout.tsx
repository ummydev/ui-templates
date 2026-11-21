import type { ReactNode } from 'react';
import { Bath, BedDouble, Heart, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents, brand, usd, type Listing } from '@/data';
import { cn } from '@/lib/utils';

export type Page = 'home' | 'listings' | 'property' | 'agent';

const nav: { label: string; page?: Page }[] = [{ label: 'Buy', page: 'listings' }, { label: 'Sell' }, { label: 'Neighbourhoods' }, { label: 'Agents', page: 'agent' }, { label: 'Journal' }];

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className={cn('display flex items-center gap-2 text-[22px]', light && 'text-white')}>
      <svg viewBox="0 0 24 24" className="size-6" fill="none">
        <path d="M3 20h18M5 20V10l7-6 7 6v10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="2" />
      </svg>
      {brand.name}
    </span>
  );
}

function Header({ active, overlay }: { active: Page; overlay?: boolean }) {
  return (
    <header className={cn('z-20 w-full', overlay ? 'absolute top-0 left-0 text-white' : 'border-b border-border')}>
      <div className="mx-auto flex h-[84px] max-w-[1312px] items-center justify-between">
        <Logo light={overlay} />
        <nav className="flex gap-9 text-[15px] font-medium">
          {nav.map((n) => (
            <span key={n.label} className={cn(overlay ? 'text-white/85' : 'text-foreground/70', n.page === active && (overlay ? 'text-white' : 'text-foreground'))}>
              {n.label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-[14.5px] font-medium">
          <span className={overlay ? 'text-white/85' : 'text-foreground/70'}>{brand.phone}</span>
          <Button className={cn('h-11 rounded-full px-5 text-[14.5px]', overlay && 'bg-white text-foreground hover:bg-white/90')}>Book a valuation</Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    { t: 'Buy', i: ['Homes for sale', 'New listings', 'Open houses', 'Mortgage calculator'] },
    { t: 'Sell', i: ['Free valuation', 'How we sell', 'Sold homes', 'Staging'] },
    { t: 'Company', i: ['Agents', 'Neighbourhood guides', 'Journal', 'Contact'] },
  ];
  return (
    <footer className="mt-28 bg-pine text-primary-foreground">
      <div className="mx-auto grid max-w-[1312px] grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 py-16">
        <div>
          <Logo light />
          <p className="mt-5 max-w-[320px] text-[14.5px] leading-relaxed text-primary-foreground/70">
            An independent agency selling homes around {brand.region} since 2011. Two agents, one office, and the phone always gets answered.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <div className="text-[14px] font-semibold">{c.t}</div>
            <ul className="mt-4 space-y-2.5 text-[14.5px] text-primary-foreground/70">
              {c.i.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1312px] justify-between border-t border-white/10 py-6 text-[13px] text-primary-foreground/60">
        <span>© 2026 {brand.name} Realty · Licensed real estate broker</span>
        <span>Fair housing · Privacy · Terms</span>
      </div>
    </footer>
  );
}

export function Site({ active, overlay, children }: { active: Page; overlay?: boolean; children: ReactNode }) {
  return (
    <div className="relative w-[1440px] shrink-0 bg-background text-foreground">
      <Header active={active} overlay={overlay} />
      {children}
      <Footer />
    </div>
  );
}

export function Specs({ l, className }: { l: Listing; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-[13.5px] text-muted-foreground', className)}>
      <span className="flex items-center gap-1.5">
        <BedDouble className="size-4" strokeWidth={1.6} /> {l.beds} bd
      </span>
      <span className="flex items-center gap-1.5">
        <Bath className="size-4" strokeWidth={1.6} /> {l.baths} ba
      </span>
      <span className="flex items-center gap-1.5">
        <Ruler className="size-4" strokeWidth={1.6} /> <span className="num">{l.sqft.toLocaleString('en-US')}</span> sq ft
      </span>
    </div>
  );
}

export function ListingCard({ l, compact }: { l: Listing; compact?: boolean }) {
  return (
    <article className="group">
      <div className={cn('photo relative rounded-[14px]', compact ? 'aspect-[16/11]' : 'aspect-[4/3]')}>
        <img src={l.image} alt={l.title} />
        {l.status && (
          <span className={cn('absolute top-3.5 left-3.5 rounded-full px-3 py-1 text-[12px] font-semibold', l.status === 'Price cut' ? 'bg-brass text-foreground' : 'bg-white text-foreground')}>
            {l.status}
          </span>
        )}
        <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90">
          <Heart className="size-4" strokeWidth={1.8} />
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="display num text-[24px]">{usd(l.price)}</span>
        <span className="text-[13px] text-muted-foreground">{l.type}</span>
      </div>
      <div className="mt-1 text-[15px] font-medium">{l.address}</div>
      <div className="text-[14px] text-muted-foreground">
        {l.area} · listed by {agents[l.agent].name.split(' ')[0]}
      </div>
      <Specs l={l} className="mt-3 border-t border-border pt-3" />
    </article>
  );
}
