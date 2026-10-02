# Roland Frunza, videographer: website design

Static site, no build step. Open `index.html` or run `npx serve projects/roland-frunza`.

- `DESIGN.md` the design read, dials, tokens, section plan and image slots
- `index.html`, `styles.css`, `script.js` the page
- `assets/` placeholder stills and self-hosted fonts (Bricolage Grotesque, Geist; SIL OFL)
- `screenshots/` desktop 1440x900 and mobile 390x844, first viewport, full page, and a hovered film frame
- Motion: see the motion map in `DESIGN.md`. The footer "Reduce motion" button and the system
  reduced-motion setting turn every animation off; the choice is remembered in the browser.

## Research status

The brief gave two sources, instagram.com/rolandfrunza and a Facebook page. Both hosts, every Instagram
mirror and every image host are denied by the cloud session's network policy, and web search returned
no profile data. The design is built from the brief and stated assumptions (see
`atelier/briefs/roland-frunza.md`). Nothing on the page is presented as a verified fact about Roland
except his name, handle and role.

## Placeholders to replace

Every image is a locally generated graded frame, not a photograph. Each slot is marked in `index.html`
with a `<!-- SLOT -->` comment.

| File | Ratio | Replace with |
|---|---|---|
| `assets/hero-reel.jpg` | 16:9 | Showreel poster frame, or swap the `<img>` for a muted autoplay MP4 with this poster |
| `assets/film-01.jpg` | 16:9 | Strongest wedding film still |
| `assets/film-02.jpg` | 4:5 | Vertical frame, reels style |
| `assets/film-03.jpg` | 16:9 | Brand or commercial still |
| `assets/film-04.jpg` | 4:5 | Vertical detail shot |
| `assets/film-05.jpg` | 16:9 | Event or festival still |
| `assets/portrait.jpg` | 4:5 | Portrait of Roland on set |
| `assets/contact.jpg` | 12:5 | Wide atmospheric frame behind the booking form |

## Verify before launch

Sample content, written to look real so the layout can be judged. Replace all of it.

- Film titles, types and lengths in Selected films (Ana and Mihai, Northline Coffee, A night in Cluj,
  Ioana and Dan, Festival recap). The names and the coffee brand are invented.
- Both quotes and their attributions.
- Services, delivery times and what is included (About, What I film, How a film happens).
- Location ("Romania, with shoots across Europe").
- Email `hello@rolandfrunza.com` appears twice (contact line and footer).
- The showreel link and every film link currently point to the Instagram profile.
- The booking form only validates and shows a confirmation. Connect it to a form backend
  (Formspree, Netlify Forms, a serverless function) in `script.js` before launch.
- Decide whether a Romanian version is wanted; the fonts already carry the diacritics.

## QA

Checked with playwright-cli on bundled Chromium.

- No horizontal overflow at 1440 and 390 wide. No console errors. Both fonts report loaded. Every
  reveal target reports visible after one scroll through the page; a 4s safety timer reveals the rest.
- Screenshots come from `atelier/qa-shots.sh`, which serves the project and drives playwright-cli.
- Hero fits the first viewport at both widths, headline on two lines at desktop.
- taste-skill pre-flight: zero em-dashes, one theme, one accent, all-sharp radius, 3 eyebrows for 9
  sections, one marquee with a pause control, no equal-cards row, no scroll cue, no numbering, no
  decoration strip in the hero, one label per CTA intent ("Book a date").
- web-design-guidelines: skip link, labels on every control, inline errors with focus on the first
  invalid field, placeholders end with an ellipsis, `aria-live` on status text, `prefers-reduced-motion`
  honored, every autoplaying loop (grain, marquee) has a pause control, explicit `width`/`height` on every image, lazy loading below the fold, `theme-color` meta,
  `color-scheme: dark`, `scroll-margin-top` under the sticky nav, `translate="no"` on the name and email.
- Deliberate deviation: headings and buttons use sentence case, not Title Case, to match the quiet
  register set in DESIGN.md.
