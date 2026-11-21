import { Mail, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { agents, listings, reviews, short, usd } from '@/data';
import { ListingCard, Site } from '@/layout';

export function Agent() {
  const id = 'elena' as const;
  const a = agents[id];
  const mine = listings.filter((l) => l.agent === id);
  const theirs = reviews.filter((r) => r.agent === id);
  const value = mine.reduce((s, l) => s + l.price, 0);
  return (
    <Site active="agent">
      <div className="mx-auto max-w-[1312px] pt-12">
        <section className="grid grid-cols-[440px_1fr] gap-16">
          <div className="photo aspect-[4/5] rounded-[24px]">
            <img src={a.photo} alt={a.name} />
          </div>
          <div className="flex flex-col pt-4">
            <div className="text-[15px] font-medium text-accent-foreground">{a.title}</div>
            <h1 className="display mt-3 text-[88px] leading-[0.92]">{a.name}</h1>
            <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-foreground/80">{a.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {a.areas.map((x) => (
                <span key={x} className="flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-[14px]">
                  <MapPin className="size-3.5" /> {x}
                </span>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-4 divide-x divide-border rounded-[18px] border border-border bg-card">
              {[
                { k: 'Years in the bay', v: a.years },
                { k: 'Homes sold last year', v: a.soldLastYear },
                { k: 'Active listings', v: mine.length },
                { k: 'Client rating', v: `${a.rating} (${a.reviews})` },
              ].map((s) => (
                <div key={s.k} className="px-6 py-5">
                  <div className="display num text-[34px] leading-none">{s.v}</div>
                  <div className="mt-2 text-[13.5px] text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <Button className="h-12 rounded-full px-6 text-[15px]">Message {a.name.split(' ')[0]}</Button>
              <span className="flex h-12 items-center gap-2 rounded-full border border-border px-5 text-[15px] font-medium">
                <Phone className="size-4" /> {a.phone}
              </span>
              <span className="flex h-12 items-center gap-2 rounded-full border border-border px-5 text-[15px] font-medium">
                <Mail className="size-4" /> Email
              </span>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="flex items-end justify-between">
            <h2 className="display text-[44px] leading-none">{a.name.split(' ')[0]}’s listings</h2>
            <span className="text-[15px] text-muted-foreground">
              {mine.length} homes, {usd(value)} in total, from {short(Math.min(...mine.map((l) => l.price)))}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-7">
            {mine.map((l) => (
              <ListingCard key={l.id} l={l} />
            ))}
          </div>
        </section>

        <section className="mt-24 grid grid-cols-[360px_1fr] gap-16">
          <div>
            <h2 className="display text-[44px] leading-none">Reviews</h2>
            <div className="mt-6 flex items-center gap-3">
              <span className="display num text-[64px] leading-none">{a.rating}</span>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 fill-brass text-brass" />
                  ))}
                </div>
                <div className="mt-1 text-[14px] text-muted-foreground">from {a.reviews} clients</div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            {theirs.map((r) => (
              <figure key={r.name} className="rounded-[18px] border border-border bg-card p-7">
                <blockquote className="text-[18px] leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-[14px]">
                  <span className="font-semibold">{r.name}</span> <span className="text-muted-foreground">· {r.when}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </Site>
  );
}
