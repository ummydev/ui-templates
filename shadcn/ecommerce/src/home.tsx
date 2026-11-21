import { ArrowRight, Flame, Hand, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { byId, money, products, reviews, shop, type Category } from '@/data';
import { ProductCard, Site, Stars } from '@/layout';

const tiles: { name: Category; label: string; image: string }[] = [
  { name: 'Mugs', label: 'Mugs & cups', image: '/images/mug-hand.webp' },
  { name: 'Bowls', label: 'Bowls', image: '/images/bowls.webp' },
  { name: 'Plates', label: 'Plates', image: '/images/plate.webp' },
  { name: 'Vases', label: 'Vases', image: '/images/vase.webp' },
];

export function Home() {
  const best = ['dune-mug', 'tide-bowls', 'hollow-teapot', 'brook-jug'].map(byId);
  const from = (c: Category) => Math.min(...products.filter((p) => p.category === c).map((p) => p.price));
  return (
    <Site active="home">
      <section className="mx-auto grid max-w-[1280px] grid-cols-[1fr_1.35fr] items-center gap-14 pt-6">
        <div>
          <div className="text-[13px] font-medium tracking-[0.08em] text-sage uppercase">Winter kiln, now open</div>
          <h1 className="serif mt-5 text-[84px] leading-[0.95]">
            Pottery for <em>slow</em> mornings.
          </h1>
          <p className="mt-6 max-w-[420px] text-[17px] leading-relaxed text-muted-foreground">
            Mugs, bowls and plates thrown by hand in small batches, in glazes that look like sand, sea and late sun.
          </p>
          <div className="mt-9 flex items-center gap-5">
            <Button className="h-12 rounded-full px-7 text-[15px]">Shop the collection</Button>
            <span className="flex items-center gap-1.5 text-[15px] underline decoration-1 underline-offset-4">
              Visit the studio <ArrowRight className="size-4" />
            </span>
          </div>
          <div className="mt-12 flex items-center gap-3 text-[13.5px] text-muted-foreground">
            <Stars rating={4.9} />
            <span>
              <span className="num text-foreground">4.9</span> from {products.reduce((s, p) => s + p.reviews, 0)} reviews
            </span>
          </div>
        </div>
        <div className="photo aspect-[3/2] rounded-[10px]">
          <img src="/images/hero.webp" alt="A breakfast table set with Morrow stoneware" />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1280px]">
        <div className="flex items-end justify-between">
          <h2 className="serif text-[44px] leading-none">Shop by piece</h2>
          <span className="text-[14px] underline decoration-1 underline-offset-4">All {products.length} pieces</span>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-5">
          {tiles.map((t) => (
            <div key={t.name}>
              <div className="photo aspect-[4/5]">
                <img src={t.image} alt={t.label} />
              </div>
              <div className="mt-3 flex justify-between text-[15px]">
                <span className="font-medium">{t.label}</span>
                <span className="num text-muted-foreground">from {money(from(t.name))}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1280px]">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="serif text-[44px] leading-none">Most loved</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">The pieces people come back for, and buy as gifts.</p>
          </div>
          <span className="text-[14px] underline decoration-1 underline-offset-4">Shop bestsellers</span>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-5">
          {best.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-[1280px] grid-cols-2 overflow-hidden rounded-[10px] bg-card">
        <div className="photo rounded-none">
          <img src="/images/maker.webp" alt="Hands shaping a bowl on the wheel" />
        </div>
        <div className="flex flex-col justify-center px-16 py-14">
          <div className="text-[13px] font-medium tracking-[0.08em] text-sage uppercase">The studio</div>
          <h2 className="serif mt-4 text-[48px] leading-[1.02]">Two people, one wheel, and a kiln that runs on Sundays.</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
            {shop.studio}. Every piece is trimmed and glazed by hand and fired twice, so no two are quite the same.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 text-[14px]">
            {[
              { icon: Hand, t: 'Thrown by hand' },
              { icon: Flame, t: 'Fired twice' },
              { icon: Package, t: 'Plastic-free packing' },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-2.5">
                <Icon className="size-5 text-sage" strokeWidth={1.6} /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1280px]">
        <h2 className="serif text-[44px] leading-none">In your kitchens</h2>
        <div className="mt-8 grid grid-cols-3 gap-5">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-[10px] border border-border p-7">
              <Stars rating={5} />
              <blockquote className="serif mt-4 text-[24px] leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-[13.5px] text-muted-foreground">
                {r.name}, {r.where} · on the {byId(r.product).name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 flex max-w-[1280px] items-center justify-between rounded-[10px] bg-primary px-14 py-12 text-primary-foreground">
        <div>
          <h2 className="serif text-[40px] leading-none">First pick of every kiln.</h2>
          <p className="mt-3 text-[15px] text-primary-foreground/75">New glazes and studio sales go to the list a day early. About once a month.</p>
        </div>
        <div className="flex w-[460px] items-center rounded-full bg-primary-foreground/10 p-1.5 pl-5">
          <span className="flex-1 text-[14.5px] text-primary-foreground/60">Your email</span>
          <span className="rounded-full bg-primary-foreground px-5 py-2.5 text-[14px] font-medium text-primary">Join the list</span>
        </div>
      </section>
    </Site>
  );
}
