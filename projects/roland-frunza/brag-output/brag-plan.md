# brag plan: Roland Frunza, videography

Made with the vendored `/brag-slim` skill (no Hyperframes on this machine). Input: the project in
`projects/roland-frunza/`, with its real markup, CSS, fonts, logo and placeholder stills.

## Nine answers

1. **What is it?** A one-page site for Roland Frunza, a wedding and brand videographer, built around his leaf logo.
2. **Who is it for, what does it do for them?** Couples and marketing leads arriving from Instagram; it shows the films and gets a date booked.
3. **What sets it apart?** The whole page behaves like footage: a film leader, a title card, graded frames, a hand-graded before/after.
4. **Most impressive claim?** "Films that still feel like the day." and "Every frame is graded by hand."
5. **Visual hook?** The leaf drawing itself in one stroke out of black.
6. **Real UI to show?** Hero title card, the film reel with the play ring and ambient glow, the grade slider, the booking form.
7. **Tone?** `cinematic`, restrained: big type, slow pushes, dips to black, no jokes.
8. **Share caption?** "The leaf from Roland Frunza's photography logo now opens his videography site. One stroke, then the films."
9. **Format?** Landscape 1920x1080, 30 fps, 21 seconds.

## Angle

A trailer for the site that behaves like one of Roland's films: it opens on the logo drawing itself,
cuts to the title card, then shows three things a visitor can do (watch, compare the grade, book).

## Visual identity

From `styles.css`: ground `#0c0e11`, bone text `#e9e6df`, slate `#9ea4ab`, one tungsten accent
`#d8c29b`. Bricolage Grotesque for display, Geist for UI, Quicksand only inside the logo lockup.
Film grain over everything, letterbox bars at the top and tail.

## Storyboard (21.0 s)

| # | Time | Scene | What moves | Text on screen | Sound |
|---|---|---|---|---|---|
| 1 | 0.0 to 3.6 | Hook: ident | Leaf draws stem to tip and back (0.3 to 1.8), midrib (1.5 to 2.1), wordmark settles (1.6), "videography" tracks in (2.0). Dip to black at 3.3. | roland frunza, videography | pad enters at 0; soft bell at 1.9 when the stroke closes |
| 2 | 3.6 to 8.0 | Reveal: title card | Hero frame pushes in from 1.12, light leak sweeps, viewfinder marks breathe in, headline words rise one by one, buttons land. | Films that still feel like the day. Book a consultation, Play showreel | pad swells, low note at 3.6 |
| 3 | 8.0 to 12.0 | Highlight: the reel | Five frames shutter-wipe in, staggered. A cursor glides to the first frame: play ring pulses, section glows with the film's colours, caption turns gold. | Five films from the last two seasons. | soft click at 10.4 |
| 4 | 12.0 to 15.6 | Highlight: the grade | Comparison frame; the handle sweeps from 12% to 78% revealing the graded side, then rests. | Every frame is graded by hand. Camera original, Graded | pad chord change at 12.0 |
| 5 | 15.6 to 18.4 | Highlight: book a consultation | Form card rises; name types in, button fills, confirmation line appears. | Tell me about the day. Request sent. | typing taps (soft), chime at 17.6 |
| 6 | 18.4 to 21.0 | Outro: lockup | Dip to black, leaf and wordmark fade up with the handle and the ask. | roland frunza, videography, @rolandfrunza, Book a consultation | pad resolves and fades |

Readability: every headline holds at least 1.6 s fully settled; the hero headline holds 3.2 s.
Transitions: dips through the page ground, never crossfades between two busy layouts.

## Audio

One piece, written for this cut: a slow pad in D minor (Dm, Bb, F, C over four bars of roughly
5 s), a low drone, filtered air, three plucked notes on scene changes and the CC0 `impactBell_heavy_003`
from the brag library at the leaf's close, mixed under the pad at low level and low-passed so nothing
is spiky. Rendered with ffmpeg's `aevalsrc` and `sine` sources into `work/music.wav`.

## Poster

Frame at 7.4 s: the hero title card with the headline fully settled and both buttons in.

## Deliverables

`brag.mp4`, `brag.jpg` (also baked as frame 0), `share-copy.txt`, `work/` (composition page, render
script, audio script).
