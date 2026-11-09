---
version: alpha
name: "Ledger"
description: "A dense, dark interface for numbers, with a terminal-amber accent. Ledger is built for screens full of numbers. It is dark first, compact and calm, like a trading terminal, with tabular figures in a monospace face and one amber accent for the active state and key values."
colors:
  primary: "#0F1210"
  on-primary: "#FFB224"
  secondary: "#1F7AA8"
  tertiary: "#4C7A12"
  neutral: "#5A615B"
  surface: "#F7F8F5"
  on-surface: "#0F1210"
typography:
  display-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: "IBM Plex Sans"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  headline-md:
    fontFamily: "IBM Plex Sans"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: "IBM Plex Sans"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
  body-md:
    fontFamily: "IBM Plex Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "IBM Plex Sans"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.01em
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
---

## Overview

Ledger is built for screens full of numbers. It is dark first, compact and calm, like a trading terminal, with tabular figures in a monospace face and one amber accent for the active state and key values.

## Colors

- **primary (#0F1210):** Amber in dark mode, black in light mode, for primary actions and the active state.
- **on-primary (#FFB224)**
- **secondary (#1F7AA8):** Sky blue, the second chart series.
- **tertiary (#4C7A12):** Green, the third chart series and positive changes.
- **neutral (#5A615B):** Grey-green for labels, axes and secondary text.
- **surface (#F7F8F5):** Near-black with a hint of green; cards one step lighter.
- **on-surface (#0F1210)**

## Typography

IBM Plex Sans for UI and headings at 14px body size; IBM Plex Mono with tabular figures for numbers, IDs and code.

## Layout

A 12-column grid up to 1440px with 16px gutters and a 4px spacing unit. Dense tables, sidebar navigation and cards in a tight grid.

## Shapes

6px corners on cards, inputs and buttons. 1px borders define surfaces; no shadows.

## Components

Primary buttons are amber on black. Tables have zebra-free rows with hairline dividers. Status uses small dots, not big colored badges.

## Do's and Don'ts

- Do set numbers in the monospace face with tabular figures.
- Do keep amber for the one thing that matters on a screen.
- Don't use more than three chart colors at once.
- Don't add gradients or glow effects.
