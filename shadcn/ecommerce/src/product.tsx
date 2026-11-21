import { ChevronDown, Minus, Plus, RotateCcw, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { byId, money, reviews, shop } from '@/data';
import { cn } from '@/lib/utils';
import { ProductCard, Site, Stars } from '@/layout';

export function ProductPage() {
  const p = byId('dune-mug');
  const review = reviews.find((r) => r.product === p.id)!;
  const pairs = ['tide-bowls', 'ember-plate', 'reed-vase', 'brook-jug'].map(byId);
  return (
    <Site active="product">
      <div className="mx-auto max-w-[1280px] pt-8">
        <div className="text-[13px] text-muted-foreground">Home / Mugs & cups / {p.name}</div>
        <div className="mt-6 grid grid-cols-[1.25fr_1fr] gap-16">
          <div className="space-y-4">
            <div className="photo aspect-[4/5]">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="photo aspect-square">
                <img src="/images/mug-hand.webp" alt={`${p.name} held in a hand`} />
              </div>
              <div className="photo aspect-square">
                <img src="/images/hero.webp" alt={`${p.name} on a breakfast table`} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            {p.badge && <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-medium text-accent-foreground">{p.badge}</span>}
            <h1 className="serif mt-4 text-[60px] leading-none">{p.name}</h1>
            <div className="mt-4 flex items-center gap-3 text-[14px]">
              <Stars rating={p.rating} />
              <span className="num">{p.rating.toFixed(1)}</span>
              <span className="text-muted-foreground underline decoration-1 underline-offset-4">{p.reviews} reviews</span>
            </div>
            <div className="num mt-6 text-[26px]">{money(p.price)}</div>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
              A generous everyday mug with a thick, heat-holding wall, a raw clay foot and a handle that fits three fingers. The speckles come from iron in the
              clay and show through the glaze differently on every piece.
            </p>

            <div className="mt-8 border-t border-border pt-6">
              <div className="text-[14px]">
                Glaze: <span className="font-medium">{p.glaze}</span>
              </div>
              <div className="mt-3 flex gap-3">
                {p.glazes.map((g, i) => (
                  <span key={g.name} className={cn('flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-[13.5px]', i === 0 ? 'border-foreground' : 'border-border text-muted-foreground')}>
                    <span className="size-6 rounded-full ring-1 ring-black/10" style={{ background: g.color }} />
                    {g.name}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-[14px]">
                Size: <span className="text-muted-foreground">{p.size}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <span className="flex h-13 items-center gap-5 rounded-full border border-border px-5 text-[15px]">
                <Minus className="size-4" /> <span className="num">1</span> <Plus className="size-4" />
              </span>
              <Button className="h-13 flex-1 rounded-full text-[15px]">Add to bag · {money(p.price)}</Button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[13.5px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <Truck className="size-4 text-sage" strokeWidth={1.6} /> Free shipping over {money(shop.freeShippingOver)}
              </span>
              <span className="flex items-center gap-2">
                <RotateCcw className="size-4 text-sage" strokeWidth={1.6} /> 30-day returns
              </span>
            </div>

            <div className="mt-8 divide-y divide-border border-y border-border text-[15px]">
              <div className="py-5">
                <div className="flex items-center justify-between font-medium">
                  Details <ChevronDown className="size-4 rotate-180" />
                </div>
                <ul className="mt-3 space-y-1.5 text-[14px] text-muted-foreground">
                  <li>Stoneware, thrown by hand and fired twice</li>
                  <li>Holds {p.size.split(' · ')[0]}; {p.size.split(' · ')[1]}</li>
                  <li>Dishwasher and microwave safe</li>
                </ul>
              </div>
              {['Care', 'Shipping & returns'].map((t) => (
                <div key={t} className="flex items-center justify-between py-5 font-medium">
                  {t} <ChevronDown className="size-4" />
                </div>
              ))}
            </div>

            <figure className="mt-8 rounded-[10px] bg-card p-6">
              <Stars rating={5} />
              <blockquote className="serif mt-3 text-[22px] leading-snug">“{review.text}”</blockquote>
              <figcaption className="mt-3 text-[13px] text-muted-foreground">
                {review.name}, {review.where}
              </figcaption>
            </figure>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="serif text-[44px] leading-none">Set the table</h2>
          <div className="mt-8 grid grid-cols-4 gap-5">
            {pairs.map((x) => (
              <ProductCard key={x.id} p={x} />
            ))}
          </div>
        </section>
      </div>
    </Site>
  );
}
