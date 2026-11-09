---
version: alpha
name: "Wallet"
description: "Clear balances, calm green and numbers you can trust. Wallet makes money feel under control: a pale grey-green background, emerald for positive actions, white cards with soft shadows and balances set in tabular figures so columns line up. Adding a transaction is always one tap away, in the middle of the tab bar."
colors:
  primary: "#0E7C5A"
  on-primary: "#FFFFFF"
  secondary: "#2F6FD6"
  tertiary: "#E09A2D"
  neutral: "#55625C"
  surface: "#F5F7F6"
  on-surface: "#0F1A16"
typography:
  display-lg:
    fontFamily: "Manrope"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Manrope"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Manrope"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
  headline-sm:
    fontFamily: "Manrope"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: "Manrope"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: "Manrope"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 14px
  md: 16px
  lg: 18px
  xl: 22px
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

Wallet makes money feel under control: a pale grey-green background, emerald for positive actions, white cards with soft shadows and balances set in tabular figures so columns line up. Adding a transaction is always one tap away, in the middle of the tab bar.

## Colors

- **primary (#0E7C5A):** Emerald green, for the add button, income and confirmed actions. Mint in dark mode.
- **on-primary (#FFFFFF)**
- **secondary (#2F6FD6):** Blue, for transfers, accounts and the second spending category.
- **tertiary (#E09A2D):** Amber, for bills due soon, budget warnings and a third category.
- **neutral (#55625C):** Grey-green for dates, merchant details and labels.
- **surface (#F5F7F6):** Pale grey-green; cards are white so balances stand out.
- **on-surface (#0F1A16)**

## Typography

Manrope throughout: bold 700 for titles and balances (balances up to 40px with tabular figures), weight 500 at 16px for body and transaction rows.

## Layout

Phone screens with 20px side padding and a 64px bottom tab bar: four labeled tabs around a center add button. The balance sits at the top of the home screen, with recent transactions below.

## Shapes

18px corners on cards and sheets; pill buttons; touch targets of at least 48px. Soft, low shadows on cards and the add button.

## Components

A balance card with a period switch, transaction rows with merchant icon, category and amount, budget progress bars, a spending donut chart and a number keypad sheet for new entries.

## Do's and Don'ts

- Do right-align every amount with tabular figures.
- Do mark spending with a minus sign, not color alone.
- Don't paint all spending red; keep red for overspent budgets and errors.
- Don't hide the balance behind an extra tap.
