# DESIGN.md: Roland Frunza

## Design Read

Reading this as: personal portfolio for a videographer, for couples and marketing leads arriving from
Instagram, with a cinematic dark, image-led language, leaning toward native CSS + a single sans family +
restrained scroll reveals (precedent family: Runway, with ElevenLabs for the dark surface rhythm).

## Dials

- DESIGN_VARIANCE 8: asymmetric editorial grid, left-weighted hero, mixed aspect ratios.
- MOTION_INTENSITY 5: reveals on scroll, hover scale on frames, one marquee of client types. No GSAP.
- VISUAL_DENSITY 3: one idea per section, large frames, lots of air.

## Precedents

`.claude/skills/design-md-library/references/runwayml.md` (image as UI, single typeface, tight display,
zero shadows, uppercase micro labels as structure) and `elevenlabs.md` (dark surface layering).

## Tokens

Theme: single dark theme, locked. `color-scheme: dark`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0c0e11` | page ground, cool off-black |
| `--bg-2` | `#13161a` | raised surface (nav scrim, process rows) |
| `--line` | `#262b31` | hairlines |
| `--fg` | `#e9e6df` | primary text, warm bone so it is not clinical |
| `--fg-2` | `#9ea4ab` | secondary text, cool slate |
| `--fg-3` | `#6d737a` | tertiary text, captions |
| `--accent` | `#d8c29b` | the only accent: tungsten highlight, used for links, focus, the play glyph |

Type: `Bricolage Grotesque` for display (optical sizing, width axis, has character without a serif),
`Geist` for body and UI. Fallback stacks declared. Display tracking -0.03em, line-height 0.95 to 1.0.
Scale: 13 / 15 / 17 / 22 / 32 / 48 / clamp(44px, 8vw, 112px).

Spacing: 8px base. Section padding-block clamp(72px, 10vw, 140px). Container 1440px, gutter clamp(16px, 4vw, 56px).

Radius: all-sharp (0) on frames and buttons. Pill only on the single tag chip in the showreel frame.

## Sections and layout families (no family repeats)

1. Nav: single line, 64px, wordmark left, three links right, one CTA "Book a date".
2. Hero: left-weighted headline over a full-bleed showreel frame, 1 eyebrow, 1 subline, 1 CTA pair. Fits 100dvh.
3. Selected films: editorial masonry, 5 frames in a 12-column grid with mixed 16:9 and 4:5 ratios, captions below frames.
4. About: 2-column, portrait right, text left with a short facts list (not a spec table).
5. What I film: horizontal marquee of film types (the one marquee on the page), then a 2-column stacked list with large headings. No equal cards.
6. How a film happens: vertical timeline of 4 real steps, verb-noun labels, no numbering.
7. Kind words: two quotes, max 3 lines each, marked as sample in README.
8. Book a date: full-bleed frame with a short form (name, email, date, type) that prevents default and shows an inline confirmation; email shown as text with a copy button.
9. Footer: wordmark, Instagram, Facebook, email, year.

Eyebrow budget: ceil(9/3) = 3. Used: hero (1), selected films (1), book a date (1).

CTA intent map: "Book a date" is the only contact label (nav, hero, section 8). "See the films" is the
only portfolio label (hero secondary).

## Image slots

| File | Ratio | Replace with |
|---|---|---|
| assets/hero-reel.jpg | 16:9 | showreel poster frame, or a muted autoplay MP4 |
| assets/film-01.jpg | 16:9 | strongest wedding film still |
| assets/film-02.jpg | 4:5 | vertical frame, reels-style |
| assets/film-03.jpg | 16:9 | brand or commercial still |
| assets/film-04.jpg | 4:5 | vertical frame, detail shot |
| assets/film-05.jpg | 16:9 | event or music video still |
| assets/portrait.jpg | 4:5 | portrait of Roland on set |
| assets/contact.jpg | 12:5 | wide atmospheric frame |

## Copy register

Second person, plain, short. Film vocabulary used as content (frame rate, grade, delivery formats),
never as decoration. No em-dashes. No "elevate", "seamless", "unleash".
