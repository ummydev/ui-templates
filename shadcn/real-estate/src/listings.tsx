import { BellRing, ChevronDown, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import { listings, priceRange, short } from '@/data';
import { cn } from '@/lib/utils';
import { ListingCard, Site } from '@/layout';

/** An illustrated map: coastline, roads and price pins positioned from each listing's map coordinates. */
function MapPanel({ active }: { active: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[18px] bg-[oklch(0.95_0.015_140)]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d="M0 88 C 18 82, 30 94, 46 90 S 78 80, 100 86 L100 100 L0 100Z" fill="oklch(0.88 0.04 230)" />
        <path d="M0 62 C 10 60, 14 70, 8 78 S 0 86, 0 86Z" fill="oklch(0.88 0.04 230)" />
        <path d="M8 0 C 20 30, 36 40, 50 50 S 76 70, 92 100" stroke="white" strokeWidth="1.6" fill="none" />
        <path d="M0 40 C 30 42, 60 34, 100 30" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M60 0 C 58 30, 64 60, 56 100" stroke="white" strokeWidth="0.9" fill="none" />
        <ellipse cx="22" cy="16" rx="12" ry="5" fill="oklch(0.9 0.04 150)" />
        <ellipse cx="12" cy="44" rx="9" ry="4" fill="oklch(0.9 0.04 150)" />
        <ellipse cx="76" cy="12" rx="11" ry="4.5" fill="oklch(0.9 0.04 150)" />
      </svg>
      {[
        { name: 'Northwood', x: 22, y: 10 },
        { name: 'Millbrook', x: 72, y: 8 },
        { name: 'Old Town', x: 52, y: 44 },
        { name: 'Ridgeview', x: 8, y: 36 },
        { name: 'Shoreline', x: 16, y: 72 },
        { name: 'Southridge', x: 78, y: 66 },
      ].map((a) => (
        <span key={a.name} className="absolute text-[12px] font-semibold tracking-[0.06em] text-foreground/45 uppercase" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
          {a.name}
        </span>
      ))}
      {listings.map((l) => (
        <span
          key={l.id}
          className={cn(
            'num absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-[13px] font-semibold shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]',
            l.id === active ? 'z-10 scale-110 bg-foreground text-background' : 'bg-white text-foreground',
          )}
          style={{ left: `${l.map.x}%`, top: `${l.map.y}%` }}
        >
          {short(l.price)}
        </span>
      ))}
      <span className="absolute right-4 bottom-4 flex flex-col overflow-hidden rounded-[10px] bg-white text-[18px] font-medium shadow-sm">
        <span className="flex size-9 items-center justify-center border-b border-border">+</span>
        <span className="flex size-9 items-center justify-center">−</span>
      </span>
    </div>
  );
}

export function Listings() {
  const sorted = [...listings].sort((a, b) => b.price - a.price);
  return (
    <Site active="listings">
      <div className="mx-auto max-w-[1312px] pt-8">
        <div className="flex items-center gap-3">
          {[
            { l: 'Anywhere in the bay', on: true },
            { l: 'Any type' },
            { l: `${short(priceRange.min)} – ${short(priceRange.max)}` },
            { l: '2+ beds' },
          ].map((f) => (
            <span key={f.l} className={cn('flex h-11 items-center gap-2 rounded-full border px-4.5 text-[14.5px] font-medium', f.on ? 'border-foreground' : 'border-border')}>
              {f.l} <ChevronDown className="size-4 text-muted-foreground" />
            </span>
          ))}
          <span className="flex h-11 items-center gap-2 rounded-full border border-border px-4.5 text-[14.5px] font-medium">
            <SlidersHorizontal className="size-4" /> More filters
          </span>
          <span className="ml-auto flex h-11 items-center gap-2 rounded-full bg-secondary px-4.5 text-[14.5px] font-medium">
            <MapIcon className="size-4" /> Map on
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <h1 className="display text-[56px] leading-none">Homes for sale</h1>
            <p className="mt-3 text-[16px] text-muted-foreground">
              <span className="num text-foreground">{listings.length}</span> property listings around the bay, from {short(priceRange.min)} to {short(priceRange.max)}.
            </p>
          </div>
          <span className="flex items-center gap-2 text-[14.5px]">
            Sort: <span className="font-medium">Price, high to low</span> <ChevronDown className="size-4" />
          </span>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_520px] gap-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10">
            {sorted.map((l) => (
              <ListingCard key={l.id} l={l} compact />
            ))}
            <div className="flex flex-col justify-between rounded-[14px] bg-pine p-7 text-primary-foreground">
              <BellRing className="size-6 text-brass" strokeWidth={1.6} />
              <div>
                <div className="display text-[30px] leading-[1.05]">Hear about new homes first.</div>
                <p className="mt-3 text-[14.5px] text-primary-foreground/70">
                  Most of our homes sell within three weeks. Get an email the day one matching this search is listed.
                </p>
                <span className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-foreground">Save this search</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <MapPanel active="larkspur" />
          </div>
        </div>
      </div>
    </Site>
  );
}
