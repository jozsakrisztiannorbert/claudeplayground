# Atelier

This repository is the Atelier design agency: a set of Claude Code agents and vendored skills that
turn a creator's or brand's public presence into a finished website design.

## Layout

- `.claude/agents/` the four agency roles: researcher, director, builder, QA.
- `.claude/skills/` vendored skills (taste-skill, image-to-code, redesign, web-design-guidelines,
  playwright-cli, design-md-library). Each folder has a README with its upstream and license.
- `atelier/` the pipeline description and per-client briefs and research.
- `projects/<client>/` one static site per client: `DESIGN.md`, `index.html`, `styles.css`,
  `script.js`, `assets/`, `screenshots/`, `README.md`.

## Pipeline

brief -> `atelier-researcher` -> `atelier-director` (DESIGN.md) -> `atelier-builder` -> `atelier-qa`.
Run the roles with the Agent tool, or do the steps inline in that order on a small job.

## Non-negotiables (from the vendored skills)

- Zero em-dashes in anything a visitor reads.
- One theme, one accent color, one corner-radius system per page.
- Hero fits in the first viewport; at most 4 text elements in it.
- Eyebrows: at most ceil(sections / 3) per page.
- No three-equal-cards feature rows, no fake div screenshots, no scroll cues, no section numbering.
- Every image slot is either a real client asset or a clearly labeled local placeholder.
- Facts that could not be verified are listed in the project README, never silently invented.

## Tooling

- `playwright-cli` (npm i -g @playwright/cli) for research screenshots and QA.
- ImageMagick (`convert`) for placeholder stills when no image host is reachable.
- `npx serve` to preview a project locally.
