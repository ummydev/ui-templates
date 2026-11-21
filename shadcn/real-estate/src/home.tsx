import { ArrowRight, ArrowUpRight, Home as HomeIcon, MapPin, Search, Star, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents, areas, brand, listings, priceRange, reviews, short, type AgentId } from '@/data';
import { ListingCard, Site } from '@/layout';

export function Home() {
  const featured = ['larkspur', 'orchard', 'dune'].map((id) => listings.find((l) => l.id === id)!);
  const areaImages: Record<string, string> = { Millbrook: '/images/h1.webp', 'Old Town': '/images/h2.webp', Ridgeview: '/images/h3.webp', Shoreline: '/images/h4.webp' };
  const shownAreas = areas.filter((a) => areaImages[a]);
  return (
    <Site active="home" overlay>
      <section className="relative h-[860px] overflow-hidden">
        <img src="/images/hero.webp" alt="A cedar house among pines at golden hour" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55" />
        <div className="relative mx-auto flex h-full max-w-[1312px] flex-col justify-end pb-16 text-white">
          <div className="text-[15px] font-medium text-white/85">Homes for sale around {brand.region}</div>
          <h1 className="display mt-4 max-w-[900px] text-[104px] leading-[0.92]">Find the house that feels like home.</h1>
          <div className="mt-12 flex items-center gap-2 rounded-[20px] bg-white p-2 text-foreground shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            {[
              { icon: MapPin, label: 'Location', value: 'Anywhere in the bay' },
              { icon: HomeIcon, label: 'Type', value: 'Houses, townhouses, condos' },
              { icon: Wallet, label: 'Price', value: `${short(priceRange.min)} – ${short(priceRange.max)}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-1 items-center gap-3 border-r border-border px-5 py-2 last:border-0">
                <Icon className="size-5 text-muted-foreground" strokeWidth={1.6} />
                <div>
                  <div className="text-[12.5px] text-muted-foreground">{label}</div>
                  <div className="text-[15.5px] font-medium">{value}</div>
                </div>
              </div>
            ))}
            <Button className="h-14 gap-2 rounded-[14px] px-7 text-[15.5px]">
              <Search className="size-4" /> Search {listings.length} homes
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1312px]">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="display text-[52px] leading-none">New on the market</h2>
            <p className="mt-4 text-[16.5px] text-muted-foreground">Hand-picked this week by our two agents. Every listing has been walked in person.</p>
          </div>
          <span className="flex items-center gap-2 text-[15px] font-medium">
            All {listings.length} property listings <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-7">
          {featured.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1312px]">
        <h2 className="display text-[52px] leading-none">Neighbourhoods</h2>
        <div className="mt-10 grid grid-cols-4 gap-5">
          {shownAreas.map((a) => {
            const n = listings.filter((l) => l.area === a).length;
            return (
              <div key={a} className="photo relative aspect-[3/4] rounded-[14px]">
                <img src={areaImages[a]} alt={a} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <div>
                    <div className="display text-[28px] leading-none">{a}</div>
                    <div className="mt-2 text-[14px] text-white/80">
                      {n} {n === 1 ? 'home' : 'homes'} for sale
                    </div>
                  </div>
                  <ArrowUpRight className="size-5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1312px] grid-cols-[1fr_1.1fr] gap-16 rounded-[24px] bg-secondary p-14">
        <div>
          <div className="text-[14px] font-semibold text-accent-foreground">Selling?</div>
          <h2 className="display mt-4 text-[52px] leading-[0.98]">Know what your home is worth in two days.</h2>
          <p className="mt-5 max-w-[460px] text-[16.5px] leading-relaxed text-muted-foreground">
            One of our agents visits, looks at the last year of sales on your street, and sends you a written valuation with a price range. Free, and no pressure to list.
          </p>
          <Button className="mt-8 h-12 rounded-full px-6 text-[15px]">Book a free valuation</Button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {(Object.keys(agents) as AgentId[]).map((id) => {
            const a = agents[id];
            return (
              <div key={id} className="rounded-[18px] bg-card p-4">
                <div className="photo aspect-square rounded-[12px]">
                  <img src={a.photo} alt={a.name} />
                </div>
                <div className="mt-4 text-[16px] font-semibold">{a.name}</div>
                <div className="text-[13.5px] text-muted-foreground">{a.title}</div>
                <div className="mt-3 flex items-center gap-1.5 text-[13.5px]">
                  <Star className="size-4 fill-brass text-brass" />
                  <span className="num font-medium">{a.rating}</span>
                  <span className="text-muted-foreground">
                    · {a.soldLastYear} homes sold last year
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1312px]">
        <h2 className="display text-[52px] leading-none">What clients say</h2>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-[18px] border border-border bg-card p-8">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-brass text-brass" />
                ))}
              </div>
              <blockquote className="mt-5 text-[18px] leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-[14px]">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted-foreground">
                  {' '}
                  · {r.when}, with {agents[r.agent].name.split(' ')[0]}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Site>
  );
}
