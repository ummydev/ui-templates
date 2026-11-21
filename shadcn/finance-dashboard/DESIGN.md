# Fernwise design system

A calm personal-finance look: sage paper, deep forest ink, frosted panels, and one honey accent for progress.

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.955 0.009 150)` sage paper | Screen backdrop (with the `.sage-backdrop` gradient) |
| `--primary` | `oklch(0.32 0.055 165)` deep forest | Balance and challenge cards, active nav, main buttons |
| `--accent` | `oklch(0.88 0.06 155)` mint | Positive badges, avatars, completed days |
| `--honey` | `oklch(0.83 0.1 85)` | Progress toward a target (one per screen at most) |
| `--chart-1…5` | forest → sage → mint → honey → cream | Charts and budget bars |
| `--destructive` | `oklch(0.6 0.17 30)` | Over budget only |

## Type
- Geist Variable. Headings 28px / medium / -0.02em. Body 15px. Labels 12.5–13px muted.
- Money: light weight, tabular numbers, -0.03em tracking; `$` and cents at 45% size (`<Amount>`).

## Shape and depth
- Radius 20–28px for cards, full pills for tabs, filters and the bottom nav.
- `.glass` panels: 72% card color, 18px blur, a white inner highlight and a soft forest shadow.
- One dark forest card per screen carries the key number; everything else is glass.

## Patterns
- Two-option pill segment at the top left, avatar top right.
- Floating pill bottom nav; the active tab expands with its label.
- Lists: 40px round icon, title + muted note, amount right-aligned; income in sage green.
