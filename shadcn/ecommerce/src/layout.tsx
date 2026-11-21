import type { ReactNode } from 'react';
import { Search, ShoppingBag, Star, User } from 'lucide-react';
import { cartCount, money, shop, type Product } from '@/data';
import { cn } from '@/lib/utils';

export type Page = 'home' | 'shop' | 'product' | 'cart';

const nav = ['Shop all', 'Mugs & cups', 'Bowls', 'Plates', 'Vases', 'The studio'];

function Header({ active }: { active: Page }) {
  return (
    <header>
      <div className="bg-primary py-2 text-center text-[12.5px] tracking-[0.01em] text-primary-foreground/90">
        Free shipping on orders over {money(shop.freeShippingOver)} · Every piece is made by hand, so each one is a little different
      </div>
      <div className="relative mx-auto flex h-[76px] max-w-[1280px] items-center justify-between">
        <nav className="flex gap-7 text-[14px]">
          {nav.slice(0, 4).map((n, i) => (
            <span key={n} className={cn('text-foreground/80', ((active === 'shop' && i === 0) || (active === 'product' && i === 1)) && 'text-foreground underline decoration-1 underline-offset-[6px]')}>
              {n}
            </span>
          ))}
        </nav>
        <span className="serif absolute left-1/2 -translate-x-1/2 text-[34px] leading-none">{shop.name}</span>
        <div className="flex items-center gap-6 text-[14px] text-foreground/80">
          <span>{nav[5]}</span>
          <Search className="size-[18px]" strokeWidth={1.6} />
          <User className="size-[18px]" strokeWidth={1.6} />
          <span className="relative">
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            <span className="num absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-sage text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const cols = [
    { title: 'Shop', items: ['Mugs & cups', 'Bowls', 'Plates', 'Vases', 'Gift cards'] },
    { title: 'Help', items: ['Shipping & returns', 'Care guide', 'Wholesale', 'Contact us'] },
    { title: 'Studio', items: ['Our story', 'Workshops', 'Journal', 'Stockists'] },
  ];
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 py-14">
        <div>
          <div className="serif text-[30px] leading-none">{shop.name}</div>
          <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-muted-foreground">
            {shop.studio}. Small batches, kiln-fired twice, and packed by the people who made them.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-[13px] font-medium">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted-foreground">
              {c.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] justify-between border-t border-border py-6 text-[12.5px] text-muted-foreground">
        <span>© 2026 {shop.name} Ceramics</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}

export function Site({ active, children }: { active: Page; children: ReactNode }) {
  return (
    <div className="relative w-[1440px] shrink-0 bg-background text-foreground">
      <Header active={active} />
      {children}
      <Footer />
    </div>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn('size-3.5', i <= Math.round(rating) ? 'fill-foreground text-foreground' : 'text-foreground/30')} strokeWidth={1.5} />
      ))}
    </span>
  );
}

export function ProductCard({ p, tall }: { p: Product; tall?: boolean }) {
  return (
    <article>
      <div className={cn('photo relative', tall ? 'aspect-[4/5]' : 'aspect-square')}>
        <img src={p.image} alt={p.name} />
        {p.badge && (
          <span
            className={cn(
              'absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11.5px] font-medium',
              p.badge === 'Low stock' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground',
            )}
          >
            {p.badge}
          </span>
        )}
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div>
          <div className="text-[15px] font-medium">{p.name}</div>
          <div className="mt-0.5 text-[13px] text-muted-foreground">{p.glaze}</div>
        </div>
        <div className="num text-[15px]">{money(p.price)}</div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="flex gap-1.5">
          {p.glazes.map((g, i) => (
            <span key={g.name} title={g.name} className={cn('size-3.5 rounded-full ring-1 ring-black/10', i === 0 && 'ring-2 ring-foreground ring-offset-2 ring-offset-background')} style={{ background: g.color }} />
          ))}
        </span>
        <span className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
          <Star className="size-3.5 fill-foreground text-foreground" strokeWidth={1.5} />
          <span className="num">{p.rating.toFixed(1)}</span> ({p.reviews})
        </span>
      </div>
    </article>
  );
}
