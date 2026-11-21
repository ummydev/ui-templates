# Morrow design system

An editorial storefront look for a small maker brand: oat paper, espresso ink, one sage accent and a tall serif for headlines. The product photos do the talking; the interface stays quiet around them.

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.975 0.008 85)` oat paper | Page background |
| `--card` | `oklch(0.955 0.012 80)` warm plaster | Photo wells, the order summary, review cards, the studio band. Matches the photo backdrops |
| `--foreground` / `--primary` | espresso `oklch(0.25–0.27 0.02 55)` | Text, main buttons, the announcement bar, the newsletter band, the gift-card tile |
| `--sage` / `--accent-foreground` | `oklch(0.38 0.06 135)` | Eyebrow labels, small icons, the bag count, "Bestseller" badge text |
| `--accent` | `oklch(0.9 0.035 135)` pale sage | The free-shipping bar, badges |
| `--muted-foreground` | `oklch(0.49 0.02 60)` | Secondary text; 5.1:1 or better on every surface |

Every text color passes WCAG AA (4.5:1) on the surface it sits on.

## Type
- Instrument Serif for display: hero 84px, page titles 60–64px, section titles 44px, quotes 22–24px. Italic for one word in the hero.
- Geist Variable for everything else: nav and body 14–17px, product names 15px medium, prices with tabular figures.
- Eyebrows: 13px medium, uppercase, 0.08em tracking, in sage. At most one per section.

## Shape and depth
- 6px corners on photos, 10px on bands and cards, full pills for buttons, chips, quantity steppers and swatches.
- No shadows and no gradients. Separation comes from the warm card color and 1px borders.

## Patterns
- Announcement bar, then a header with nav left, a centered serif wordmark and icons right (bag count in a sage dot).
- Product card: square or 4:5 photo with an optional pill badge, name and price on one line, glaze below, glaze swatches (the shown one ringed) and the star rating.
- Shop page: filter sidebar (piece, glaze swatches with counts, price range, in-stock toggle), quick-filter chips, a four-column grid, and a dark editorial tile.
- Product page: large photo with two detail photos below; title, rating, price, story, glaze pills, size, quantity stepper and a full-width add button, delivery and returns, accordions, one review.
- Cart: free-shipping progress, line items with stepper and remove, cross-sells, and a sticky-looking summary card with discount code and checkout.

## Data and images
Everything comes from `src/data.ts`: product counts, starting prices, glaze counts, the review total and the cart subtotal and shipping are computed from it. The product photos in `public/images` were made for this template with AI image generation; swap in your own photos at the same aspect ratios.
