# Kiln design system

A warm, friendly look for project management: bone paper, charcoal ink, one kiln-orange accent, and a soft color per project. Rounded, bold and calm, so a busy week still reads at a glance.

## Colors (shadcn tokens in `src/index.css`)
| Token | Value | Use |
| --- | --- | --- |
| `--background` | `oklch(0.968 0.007 80)` bone | The main content area |
| `--sidebar` | `oklch(0.94 0.01 78)` warm stone | The frame and sidebar around the content |
| `--card` | `oklch(0.995 0.003 85)` | Cards (`.card-k`), table, task cards |
| `--foreground` / `--primary` | `oklch(0.24 0.012 60)` charcoal | Text, the one dark "Needs attention" card, active tab underline |
| `--kiln` | `oklch(0.66 0.17 45)` | Main action buttons, the today line, logo. Never for text on white |
| `--kiln-ink` / `--accent-foreground` | darker orange | Orange text (today's date, counts, "At risk") |
| `--ok` / `--risk` | green / red | "On track", "Behind", over-capacity hours, late tasks |
| `--p-{clay,sky,lime,lilac,sand}` and `-ink` | soft fill + strong tone | One per project: timeline bars, project tiles, sidebar dots, progress bars. Text on a fill uses the matching `-ink` |

## Type
- Manrope Variable for everything; Geist Mono (`.code`) for task and project keys such as `HAL-52`.
- Page title 28px / bold / -0.03em. Card titles 15px bold. Body 13–13.5px. Labels 12px semibold, muted.
- Numbers use `.num` (tabular figures).

## Shape and depth
- The app sits in a 22px-rounded stone frame; the content is a 16px-rounded bone panel inside it.
- Cards: 16px radius, hairline border, no shadow. Buttons and inputs 12px. Tags 6–8px. People are circles.
- Only the active sidebar item and segmented-control tab get a 1px shadow.

## Patterns
- Sidebar: workspace, search with `/`, nav with orange count badges, the project list with color dots, the signed-in person.
- Overview: greeting, 4 KPI cards, "This week" (Mon–Fri pill bars per project with avatars and a today line), team load bars (red when over capacity), a projects table (status, progress, team, due), upcoming milestones, and one dark card for the project that needs attention.
- Board: project header with status and team, tabs, task progress, four tinted columns with counts; cards show a type tag, key, title, subtask progress, people, comments and due date. Late dates get a red chip.
- Timeline: 12 weeks under month headers, three phase bars per project, a diamond and label for each launch, shaded studio holiday, the today line.

## Data
Everything is read from `src/data.ts`; KPIs, progress, board counts and timeline dates are computed from the same arrays, so the screens agree (Halden: 34 of 52 tasks done, 9 + 5 + 4 open on the board, launch Dec 12 everywhere).
