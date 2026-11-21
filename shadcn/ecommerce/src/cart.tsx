import { Gift, Lock, Minus, Plus, Truck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { byId, cart, cartCount, money, shipping, shop, subtotal } from '@/data';
import { ProductCard, Site } from '@/layout';

export function Cart() {
  const total = subtotal + shipping;
  const free = shipping === 0;
  return (
    <Site active="cart">
      <div className="mx-auto max-w-[1280px] pt-10">
        <h1 className="serif text-[64px] leading-none">
          Your bag <span className="num text-[28px] text-muted-foreground">({cartCount})</span>
        </h1>

        <div className="mt-10 grid grid-cols-[1fr_420px] gap-14">
          <div>
            <div className="rounded-[10px] bg-accent px-5 py-4 text-[14px] text-accent-foreground">
              <div className="flex items-center gap-2.5">
                <Truck className="size-4" strokeWidth={1.8} />
                {free ? (
                  <span>
                    Your order ships free. Orders over {money(shop.freeShippingOver)} always do.
                  </span>
                ) : (
                  <span>Add {money(shop.freeShippingOver - subtotal)} more for free shipping.</span>
                )}
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-accent-foreground/15">
                <div className="h-full rounded-full bg-accent-foreground" style={{ width: `${Math.min(100, (subtotal / shop.freeShippingOver) * 100)}%` }} />
              </div>
            </div>

            <ul className="mt-4 divide-y divide-border border-b border-border">
              {cart.map((l) => {
                const p = byId(l.id);
                const g = p.glazes.find((x) => x.name === l.glaze)!;
                return (
                  <li key={l.id} className="flex gap-6 py-7">
                    <div className="photo size-[132px] shrink-0">
                      <img src={p.image} alt={p.name} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-[17px] font-medium">{p.name}</div>
                          <div className="mt-1 flex items-center gap-2 text-[14px] text-muted-foreground">
                            <span className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: g.color }} /> {l.glaze} · {p.size}
                          </div>
                        </div>
                        <div className="num text-right text-[17px]">
                          {money(p.price * l.qty)}
                          {l.qty > 1 && <div className="text-[13px] text-muted-foreground">{money(p.price)} each</div>}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="flex h-10 items-center gap-5 rounded-full border border-border px-4 text-[14px]">
                          <Minus className="size-3.5" /> <span className="num">{l.qty}</span> <Plus className="size-3.5" />
                        </span>
                        <span className="flex items-center gap-1.5 text-[13.5px] text-muted-foreground underline decoration-1 underline-offset-4">
                          <X className="size-3.5" /> Remove
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-3 text-[14px] text-muted-foreground">
              <Gift className="size-4 text-sage" strokeWidth={1.6} /> Add a handwritten gift note at checkout. We never put prices in the box.
            </div>

            <section className="mt-16">
              <h2 className="serif text-[36px] leading-none">Goes with your mugs</h2>
              <div className="mt-6 grid grid-cols-3 gap-5">
                {['ember-plate', 'hollow-teapot', 'reed-vase'].map((id) => (
                  <ProductCard key={id} p={byId(id)} />
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[10px] bg-card p-8">
            <h2 className="text-[17px] font-medium">Order summary</h2>
            <dl className="mt-6 space-y-3.5 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal ({cartCount} items)</dt>
                <dd className="num">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{free ? 'Free' : money(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Taxes</dt>
                <dd className="text-muted-foreground">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
              <span className="text-[17px] font-medium">Total</span>
              <span className="num text-[26px]">{money(total)}</span>
            </div>
            <div className="mt-6 flex items-center rounded-full border border-border bg-background p-1 pl-4 text-[14px]">
              <span className="flex-1 text-muted-foreground">Discount code</span>
              <span className="rounded-full bg-secondary px-4 py-2 font-medium">Apply</span>
            </div>
            <Button className="mt-5 h-13 w-full rounded-full text-[15px]">
              <Lock className="size-4" /> Check out · {money(total)}
            </Button>
            <p className="mt-4 text-center text-[12.5px] text-muted-foreground">Ships in 3–5 working days, wrapped in recycled paper.</p>
          </aside>
        </div>
      </div>
    </Site>
  );
}
