# Fieldstone design system

A confident, photo-first look for a local real estate agency: limestone white, deep pine ink, one brass accent and a big grotesk for headlines. Houses fill the frame; the interface stays out of their way.

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.982 0.004 95)` limestone | Page background |
| `--card` | white | Fact strips, booking card, reviews, the map's controls |
| `--foreground` | `oklch(0.22 0.02 165)` | Text |
| `--primary` / `--pine` | `oklch(0.27 0.035 165)` deep pine | Main buttons, the footer, the saved-search tile, the selected map pin and day |
| `--brass` | `oklch(0.75 0.11 78)` | Stars, "Price cut" badges, small icons on pine. Never text on white |
| `--accent` / `--accent-foreground` | pale brass / `oklch(0.42 0.08 70)` | "New" badges, feature icons, eyebrow labels |
| `--secondary` | `oklch(0.95 0.008 110)` | Feature chips, the valuation band, the agent card |
| `--muted-foreground` | `oklch(0.48 0.015 160)` | Secondary text; 5.6:1 or better on every surface |

Every text color passes WCAG AA (4.5:1) on the surface it sits on.

## Type
- Bricolage Grotesque Variable, semibold, -0.035em, for display: hero 104px, page titles 56–88px, section titles 44–52px, prices 24–44px.
- Geist Variable for everything else: nav 15px medium, body 15–18px, labels 13–14px.
- Prices and counts use tabular figures.

## Shape and depth
- Photos 14px (cards) to 24px (agent portrait) corners; panels 16–20px; buttons, chips and filters are full pills.
- One soft shadow, only on things that float over photos: the hero search bar and map pins. Dark scrims under text on photos.

## Patterns
- Home: full-bleed hero photo with the header overlaid, a giant headline and a three-field search bar; new listings; neighbourhood tiles with live counts; a valuation band with the agents; reviews.
- Listing card: 4:3 photo with status pill and save heart, price in display type, address, area and agent, then beds, baths and square feet.
- Listings page: filter pills, sort, a two-column list beside an illustrated map with price pins (the active one dark), and a saved-search tile.
- Property detail page: five-photo mosaic, title and address, a fact strip, description, feature chips, a monthly cost estimate with a stacked bar, and a sticky booking card with day and time choices and the listing agent.
- Agent profile: large portrait, name, bio, areas, a stat strip, contact buttons, the agent's listings and reviews.

## Data and images
Everything comes from `src/data.ts`: listing counts, the price range, neighbourhood counts, each agent's active listings and total, and the monthly cost estimate (computed from price, deposit, rate, tax and insurance). The house, interior and portrait photos in `public/images` were made for this template with AI image generation and show fictional homes and people; replace them with your own listing photos.
