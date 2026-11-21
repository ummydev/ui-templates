# Vantage design system

A dark analytics look for people who watch numbers all day: graphite night, one signal-lime accent, cyan as the second series, and monospaced figures that line up. Built for admin and analytics dashboards.

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.16 0.006 260)` graphite | App background |
| `--sidebar` | `oklch(0.14 0.006 260)` | Sidebar, one step darker |
| `--card` | `oklch(0.2 0.007 260)` | `.tile` panels |
| `--secondary` / `--muted` | `oklch(0.24–0.25 0.008 260)` | Search field, bar tracks, inner panels, table header band |
| `--primary` | `oklch(0.89 0.19 125)` signal lime | Main buttons, the first chart series, active nav icon, selected checkbox, funnel bars |
| `--primary-foreground` | `oklch(0.2 0.03 125)` | Text on lime |
| `--chart-2` | `oklch(0.78 0.12 210)` cyan | Second series, country bars, "Fulfilled" |
| `--chart-3…5` | violet, amber, grey | Further categories |
| `--up` / `--down` | green / coral | Deltas only |
| `--accent` | lime at 14% | Selected row, count badges |

Every text color passes WCAG AA (4.5:1) on the surface it sits on. Heatmap cells use two bands so their text always does too: dim cells with light text, bright cells with dark text.

## Type
- Geist Variable for text; Geist Mono (`.num`) for every number, ID and path, with tabular figures and -0.03em tracking.
- Page title 20px semibold in the top bar. Tile titles 15px semibold. Body 13–13.5px. Labels 12–12.5px muted.
- KPI values 34px mono.

## Shape and depth
- Tiles: 16px radius, 1px border at 8% white, no shadow. Controls 9–10px radius. The app frame 20px.
- Charts: no axis lines, faint horizontal grid only, lime area with a fading fill, a dashed cyan line for the second series.

## Patterns
- Shell: 220px sidebar (store switcher, nav with a pending-orders badge, settings, user), 72px top bar (page title, ⌘K search, date range, notifications, the page's main action).
- Overview: four KPI tiles (value, delta vs previous period, sparkline), traffic-and-orders area chart with a live-visitors chip, visitors by channel bars, top pages table with bounce bars, top countries bar chart.
- Orders: status tabs with counts, an orders table, and an order detail panel with customer, line items, subtotal, shipping, tax and total, plus Refund and Fulfil actions.
- Reports: a five-step conversion funnel with step-to-step rates, a cohort repeat-purchase heatmap, and revenue by category.

## Data
Everything is read from `src/data.ts`. Daily visitors, orders and revenue are generated from a fixed formula, and the KPIs, deltas, channel and country splits, funnel ends (sessions = visitors, purchases = orders), the "All" order count and each order's totals are computed from them. The previous-period totals, status counts other than "All" and "Fulfilled", the middle funnel rates, top pages and cohort percentages are set by hand in the same file.
