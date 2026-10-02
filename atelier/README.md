# Atelier pipeline

Atelier takes a creator or brand with only a social presence and delivers a website design as a
static site, with a documented design system and QA evidence.

## Roles

| Role | Agent | Reads | Writes |
|---|---|---|---|
| Research | `atelier-researcher` | brief URLs | `atelier/research/<client>/notes.md`, screenshots |
| Direction | `atelier-director` | brief, research, taste-skill, DESIGN.md library | `projects/<client>/DESIGN.md` |
| Build | `atelier-builder` | DESIGN.md, taste-skill, image-to-code | `projects/<client>/index.html`, css, js, assets |
| QA | `atelier-qa` | the built page, web-design-guidelines, redesign, playwright-cli | `screenshots/`, README QA section |

## Skills and where they came from

| Skill | Upstream | License | Used by |
|---|---|---|---|
| `taste-skill` | github.com/Leonxlnx/taste-skill (tasteskill.dev) | MIT | director, builder |
| `image-to-code` | github.com/Leonxlnx/taste-skill | MIT | builder |
| `redesign` | github.com/Leonxlnx/taste-skill | MIT | QA |
| `web-design-guidelines` | github.com/vercel-labs/agent-skills + web-interface-guidelines | MIT | QA |
| `playwright-cli` | github.com/microsoft/playwright-cli | Apache-2.0 | researcher, QA |
| `design-md-library` | github.com/VoltAgent/awesome-design-md | MIT | director |

To refresh a vendored skill, re-clone the upstream and copy the SKILL.md over; keep the Atelier README
notes next to it.

## Placeholder stills

When no image-generation tool and no image host is reachable, the builder generates graded frames so the
layout can be judged with real weight and contrast. Each frame is a 16:9 or 4:5 JPEG made with
ImageMagick: a two-stop gradient in the project's grade, fractal noise at low opacity for grain, and a
vignette. Every placeholder is listed in the project README with the real shot that should replace it.

## Definition of done

1. `DESIGN.md` exists and the page follows it.
2. taste-skill Section 14 pre-flight passes.
3. web-design-guidelines review passes or remaining findings are documented.
4. Desktop and mobile screenshots exist in `screenshots/`.
5. README lists every placeholder and every fact to verify before launch.
