---
version: alpha
name: "Stride"
description: "Big condensed numbers and an energetic orange for movement apps. Stride puts live numbers first: pace, distance and time in a big condensed face, an energetic orange for the action, and a dark background that reads well outdoors and at night."
colors:
  primary: "#C83A08"
  on-primary: "#FFFFFF"
  secondary: "#0F9C8C"
  tertiary: "#C99400"
  neutral: "#5B6068"
  surface: "#F6F6F4"
  on-surface: "#111214"
typography:
  display-lg:
    fontFamily: "Barlow Condensed"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: "Barlow Condensed"
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.05
  headline-md:
    fontFamily: "Barlow Condensed"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.15
  headline-sm:
    fontFamily: "Barlow Condensed"
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.25
  body-md:
    fontFamily: "Barlow"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.45
  body-sm:
    fontFamily: "Barlow"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 0.02em
rounded:
  sm: 12px
  md: 14px
  lg: 16px
  xl: 20px
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

Stride puts live numbers first: pace, distance and time in a big condensed face, an energetic orange for the action, and a dark background that reads well outdoors and at night.

## Colors

- **primary (#C83A08):** Orange, for start and record buttons, progress and the active tab.
- **on-primary (#FFFFFF)**
- **secondary (#0F9C8C):** Teal, for heart rate and a second metric.
- **tertiary (#C99400):** Yellow, for personal bests and achievements.
- **neutral (#5B6068):** Cool grey for labels and units.
- **surface (#F6F6F4):** Near-black; cards are one step lighter.
- **on-surface (#111214)**

## Typography

Barlow Condensed bold for metrics and titles (metrics up to 72px with tabular figures); Barlow at 16px for body text and labels.

## Layout

Phone screens with 20px side padding, a 4-item bottom tab bar 64px tall and large-title headers. One primary action per screen, placed within thumb reach.

## Shapes

16px corners on cards; pill-shaped primary buttons; 48px minimum touch targets.

## Components

Big metric cards, a full-width start button, progress rings and bars in orange, and a bottom tab bar with icons and labels.

## Do's and Don'ts

- Do make the key number the largest element on the screen.
- Do keep primary buttons in the bottom half of the screen.
- Don't put small text on orange.
- Don't use more than two accent colors on one screen.
