# Vantage: admin and analytics dashboard template (shadcn/ui + Tailwind)

Live preview and details: [codexdesign.io/templates/dashboards](https://codexdesign.io/templates/dashboards)

A dark admin and analytics dashboard for an online store, with three screens: an analytics overview (KPIs, traffic chart, channels, top pages, countries), an orders admin with an order detail panel, and reports with a conversion funnel, a cohort heatmap and revenue by category. Built with React, shadcn/ui, Tailwind CSS v4, Recharts and Lucide icons. The design system is in [DESIGN.md](DESIGN.md) and the theme tokens in `src/index.css`.

![Analytics overview](screenshots/overview.png)

![Orders admin](screenshots/orders.png)

![Reports](screenshots/reports.png)

```bash
npx degit ummydev/ui-templates/shadcn/analytics-dashboard my-dashboard
cd my-dashboard && npm install && npm run dev
```

| Screen | URL |
| --- | --- |
| Overview | `/` or `/?screen=overview` |
| Orders | `/?screen=orders` |
| Reports | `/?screen=reports` |

Each screen is 1440×1000. All sample data is in `src/data.ts`; see DESIGN.md for which numbers are computed.

Ask your agent to make it yours:

```text
This is the Vantage admin and analytics dashboard template. Rename it to [your product], replace the sample data in src/data.ts with [your metrics API], and keep the design system in DESIGN.md.
```

All names, stores, people and numbers are made up for the template.
