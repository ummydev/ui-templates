---
version: alpha
name: "Pantry"
description: "Warm, friendly and appetizing, for food and ordering apps. Pantry feels warm and appetizing: a cream background, tomato red for ordering, herb green for freshness, big rounded food cards and a friendly grotesque headline face."
colors:
  primary: "#C9381E"
  on-primary: "#FFFFFF"
  secondary: "#2F7A4F"
  tertiary: "#D99121"
  neutral: "#6F5D50"
  surface: "#FFFAF3"
  on-surface: "#2A1A12"
typography:
  display-lg:
    fontFamily: "Bricolage Grotesque"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Bricolage Grotesque"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.015em
  headline-md:
    fontFamily: "Bricolage Grotesque"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: "Bricolage Grotesque"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: "DM Sans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "DM Sans"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 16px
  md: 18px
  lg: 20px
  xl: 24px
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

Pantry feels warm and appetizing: a cream background, tomato red for ordering, herb green for freshness, big rounded food cards and a friendly grotesque headline face.

## Colors

- **primary (#C9381E):** Tomato red, for add-to-cart, checkout and the active tab.
- **on-primary (#FFFFFF)**
- **secondary (#2F7A4F):** Herb green, for vegetarian labels, success and delivery status.
- **tertiary (#D99121):** Saffron, for ratings and offers.
- **neutral (#6F5D50):** Warm brown-grey for descriptions and metadata.
- **surface (#FFFAF3):** Cream; cards are white so food photos stand out.
- **on-surface (#2A1A12)**

## Typography

Bricolage Grotesque bold for titles and prices; DM Sans at 16px for body text and descriptions.

## Layout

Phone screens with 16px side padding, a bottom tab bar with a cart badge, and a sticky cart button on menu screens.

## Shapes

20px corners on cards and photos; pill buttons and chips; soft, low shadows only on floating elements.

## Components

Large photo cards with name, price and an add button; category chips; a sticky checkout bar; order status as a simple step tracker.

## Do's and Don'ts

- Do let food photos take most of each card.
- Do show the price in bold next to every add button.
- Don't use red for errors and ordering on the same screen.
- Don't crowd the menu with badges.
