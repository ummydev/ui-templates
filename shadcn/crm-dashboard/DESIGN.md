# Tideline design system

A focused CRM look for people who live in tables: cool paper, navy ink, one cobalt accent, hairline borders and very little decoration. Color is reserved for meaning (heat, stage, overdue).

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.975 0.004 250)` cool paper | App background |
| `--card` | white | Panels, table, deal cards |
| `--ink` | `oklch(0.22 0.03 262)` navy | Text, logo tile, bulk-action bar, one dark panel per screen at most |
| `--primary` | `oklch(0.52 0.19 262)` cobalt | Main buttons, active tab underline, checked boxes, progress |
| `--accent` | `oklch(0.95 0.03 262)` | Selected rows, "New" badge, active counts |
| `--hot` / `--warm` / `--cold` | coral / amber / slate blue | Lead heat dot and score bar only; `--hot` also marks overdue and falling KPIs |
| `--won` | `oklch(0.6 0.13 160)` green | Closed won, rising KPIs, done tasks |
| `--tone-1…4` | pale cobalt / rose / mint / sand | Teammate avatars (one tone per person, always the same) |
| `--chart-1…3` | cobalt → light blue | Pipeline stages, darkest = closest to closing |

Every text color passes WCAG AA (4.5:1) on the surface it sits on.

## Type
- Geist Variable for everything. Page title 24px / semibold / -0.02em. Table and body 13px. Labels 12–12.5px muted.
- Numbers use `.num` (tabular figures) so columns line up. IDs, shortcuts and record numbers use `.code` (Geist Mono).

## Shape and depth
- Radius 10px (`--radius`), 12px for `.panel`, 8px for buttons and inputs, full circles for people.
- `.panel`: white, 1px hairline border at 9% ink, a 1–2px shadow. No gradients, no glass.
- Only floating things get a real shadow: the bulk-action bar.

## Patterns
- Shell: 232px sidebar (workspace switcher, search with ⌘K, nav with counts, saved views as colored dots, quota card, user), 56px top bar with breadcrumbs, team avatars and the page's main action.
- KPI strip: one panel split into 4 cells; label, number, delta vs last period, 7-point SVG sparkline (cobalt when good, coral when bad).
- Tabs with counts under the title, filters as small bordered chips on the right.
- Lead table: checkbox, initials tile + name + email, company, stage badge, heat dot, source, score (number + thin bar in heat color), value, owner avatar, last touch.
- Selecting rows tints them with `--accent` and shows a dark floating bar: count, Assign, Add to sequence, Tag, close.
- Pipeline board: tinted columns with stage, count, total and win probability; white deal cards with value, owner, next step and days in stage. Overdue next steps turn coral.
- Record page: three columns (who they are · activity timeline · deal, tasks and the dark buying-committee panel).

## Data
All screens read from `src/data.ts`, and totals are computed from it: open pipeline, weighted forecast, won this month and the quota bar always agree. Lead values match their deals (Priya Raman at Lumen Labs is lead L-2041 and deal D-312, $48,000).
