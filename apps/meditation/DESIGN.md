---
version: alpha
name: "Calm"
description: "Soft sage, a gentle serif and room to breathe. Calm slows the screen down: a sage background, deep green for actions, a gentle serif for titles and plenty of space between elements. Each screen asks for one thing at a time."
colors:
  primary: "#2F5446"
  on-primary: "#F1F3EE"
  secondary: "#B5784A"
  tertiary: "#5F86B8"
  neutral: "#56655C"
  surface: "#F1F3EE"
  on-surface: "#1E2A24"
typography:
  display-lg:
    fontFamily: "Newsreader"
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: "Newsreader"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Newsreader"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
  headline-sm:
    fontFamily: "Newsreader"
    fontSize: 19px
    fontWeight: 500
    lineHeight: 1.3
  body-md:
    fontFamily: "Figtree"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Figtree"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sm: 20px
  md: 22px
  lg: 24px
  xl: 28px
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

Calm slows the screen down: a sage background, deep green for actions, a gentle serif for titles and plenty of space between elements. Each screen asks for one thing at a time.

## Colors

- **primary (#2F5446):** Deep forest green, for the main action and progress.
- **on-primary (#F1F3EE)**
- **secondary (#B5784A):** Clay, for warmth in illustrations and a second series.
- **tertiary (#5F86B8):** Soft blue, for sleep and evening content.
- **neutral (#56655C):** Muted green-grey for supporting text.
- **surface (#F1F3EE):** Pale sage; cards are almost white.
- **on-surface (#1E2A24)**

## Typography

Newsreader at weight 500 for titles; Figtree at 17px with 1.6 line height for body text.

## Layout

Phone screens with 24px side padding, a 3-item bottom tab bar and one primary action per screen. Lots of vertical space between groups.

## Shapes

24px corners on cards and sheets; pill buttons; very soft shadows only on sheets.

## Components

Large session cards, a full-width primary button, gentle progress bars and a simple mood picker.

## Do's and Don'ts

- Do ask for one action per screen.
- Do use the serif only for titles and quotes.
- Don't use red or urgent badges.
- Don't fill every gap; space is part of the design.
