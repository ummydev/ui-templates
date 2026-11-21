import { ChevronDown, Gift } from 'lucide-react';
import { products, type Category } from '@/data';
import { cn } from '@/lib/utils';
import { ProductCard, Site } from '@/layout';

const categories: Category[] = ['Mugs', 'Bowls', 'Plates', 'Vases', 'Teapots', 'Jugs', 'Planters'];

export function Shop() {
  const glazes = Array.from(new Map(products.flatMap((p) => p.glazes).map((g) => [g.name, g])).values());
  const prices = products.map((p) => p.price);
  return (
    <Site active="shop">
      <div className="mx-auto max-w-[1280px] pt-8">
        <div className="text-[13px] text-muted-foreground">Home / Shop all</div>
        <div className="mt-5 flex items-end justify-between border-b border-border pb-8">
          <div>
            <h1 className="serif text-[64px] leading-none">Shop all</h1>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted-foreground">
              Everything from the current kiln. Small batches, so when a glaze sells out it may not come back until spring.
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[14px]">
            Sort: <span className="font-medium">Most loved</span> <ChevronDown className="size-4" />
          </span>
        </div>

        <div className="mt-8 grid grid-cols-[230px_1fr] gap-12">
          <aside className="space-y-8 text-[14px]">
            <div>
              <div className="font-medium">Piece</div>
              <ul className="mt-3.5 space-y-2.5">
                <li className="flex justify-between font-medium">
                  All pieces <span className="num">{products.length}</span>
                </li>
                {categories.map((c) => (
                  <li key={c} className="flex justify-between text-muted-foreground">
                    {c} <span className="num">{products.filter((p) => p.category === c).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-7">
              <div className="font-medium">Glaze</div>
              <ul className="mt-3.5 space-y-2.5">
                {glazes.map((g) => (
                  <li key={g.name} className="flex items-center gap-2.5 text-muted-foreground">
                    <span className="size-4 rounded-full ring-1 ring-black/10" style={{ background: g.color }} />
                    {g.name}
                    <span className="num ml-auto">{products.filter((p) => p.glazes.some((x) => x.name === g.name)).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-7">
              <div className="font-medium">Price</div>
              <div className="relative mt-5 h-1 rounded-full bg-secondary">
                <span className="absolute inset-y-0 left-0 right-0 rounded-full bg-foreground" />
                <span className="absolute -top-1.5 -left-1 size-4 rounded-full border-2 border-foreground bg-background" />
                <span className="absolute -top-1.5 -right-1 size-4 rounded-full border-2 border-foreground bg-background" />
              </div>
              <div className="num mt-3.5 flex justify-between text-muted-foreground">
                <span>${Math.min(...prices)}</span>
                <span>${Math.max(...prices)}</span>
              </div>
            </div>
            <div className="border-t border-border pt-7">
              <label className="flex items-center gap-2.5">
                <span className="flex h-5 w-9 items-center rounded-full bg-foreground p-0.5">
                  <span className="ml-auto size-4 rounded-full bg-background" />
                </span>
                In stock only
              </label>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex gap-2 text-[13px]">
              {['All', 'New', 'Bestsellers', 'Under $50'].map((c, i) => (
                <span key={c} className={cn('rounded-full border px-3.5 py-1.5', i === 0 ? 'border-foreground bg-foreground text-background' : 'border-border')}>
                  {c}
                </span>
              ))}
              <span className="ml-auto self-center text-muted-foreground">
                <span className="num">{products.length}</span> pieces
              </span>
            </div>
            <div className="grid grid-cols-4 gap-x-5 gap-y-10">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} tall />
              ))}
              <div className="flex aspect-[4/5] flex-col justify-between rounded-[6px] bg-primary p-6 text-primary-foreground">
                <Gift className="size-6" strokeWidth={1.5} />
                <div>
                  <div className="serif text-[30px] leading-[1.05]">Not sure which glaze?</div>
                  <p className="mt-3 text-[13.5px] text-primary-foreground/75">Send a gift card from $25 and let them choose.</p>
                  <span className="mt-5 inline-block rounded-full bg-primary-foreground px-4 py-2 text-[13px] font-medium text-primary">Buy a gift card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Site>
  );
}
