---
name: design-md-library
description: Library of 74 DESIGN.md design-system analyses of real websites (Apple, Nike, Runway, Linear, Stripe, Spotify, The Verge, Wired and more). Use when a brief names a reference brand, when the creative director needs a precedent for an aesthetic ("cinematic", "editorial", "dark tech", "luxury"), or to extract concrete tokens (type scale, spacing, color roles) before building.
metadata:
  upstream: https://github.com/VoltAgent/awesome-design-md
  license: MIT (VoltAgent)
---

# DESIGN.md Library

Each file in `references/` is a plain-text design system extracted from a real
site: visual theme, color roles, typography table, component styling, layout
principles, do/don't rules. Read one or two before building. Never copy a
brand's identity; borrow the *structure* of its decisions (how tight the
display type is, how the grid mixes sizes, how restrained the chrome is).

## How to use

1. Map the brief's vibe words to precedents with the table below.
2. Read the matching `references/<name>.md` in full.
3. Write the project's own token block (color, type, spacing, radius) in the
   project's `DESIGN.md`, citing which precedents informed which decision.
4. Hand that `DESIGN.md` to the builder together with `taste-skill`.

## Precedent map

| Brief reads as | Start with | Also look at |
|---|---|---|
| Cinematic, film, video, image-led, dark | `runwayml`, `elevenlabs` | `playstation`, `nvidia`, `apple` |
| Editorial, magazine, journalism | `theverge`, `wired` | `cal`, `intercom` |
| Minimal dev tool, "Linear-style" | `linear.app`, `vercel` | `raycast`, `warp`, `resend` |
| Premium consumer, luxury | `apple`, `bugatti`, `ferrari` | `tesla`, `bmw-m`, `lamborghini` |
| Sport, energy, motion | `nike`, `playstation` | `spotify`, `nintendo-2001` |
| Fintech, trust-first | `stripe`, `wise`, `revolut` | `mastercard`, `coinbase`, `kraken` |
| Creative tools, designer audience | `figma`, `framer`, `webflow` | `miro`, `lovable`, `cursor` |
| Enterprise, data-dense | `ibm`, `hashicorp`, `clickhouse` | `mongodb`, `dell-1996`, `hp` |
| Marketplace, hospitality, travel | `airbnb`, `uber`, `starbucks` | `pinterest`, `shopify` |

Full list: `ls .claude/skills/design-md-library/references`.

## Rules

- One precedent family per project. Do not blend Apple and Wired in one page.
- A precedent informs tokens and rhythm, never copy, logos or brand colors.
- Record the precedents used in the project's `DESIGN.md` so a later redesign
  pass knows the lineage.
