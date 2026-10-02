# Atelier

A small design agency that runs inside Claude Code: four agent roles, six vendored skills, and one
static site per client.

| Path | What it is |
|---|---|
| `CLAUDE.md` | How the agency works and its non-negotiable design rules |
| `.claude/agents/` | `atelier-researcher`, `atelier-director`, `atelier-builder`, `atelier-qa` |
| `.claude/skills/` | taste-skill, image-to-code, redesign, web-design-guidelines, playwright-cli, design-md-library |
| `atelier/` | Pipeline description, client briefs, research notes |
| `projects/roland-frunza/` | Website design for videographer Roland Frunza |

## Run a new client

1. Write `atelier/briefs/<client>.md` with the sources and what is known.
2. Ask Claude Code to run the pipeline: research, direction, build, QA (see `CLAUDE.md`).
3. Review `projects/<client>/screenshots/` and the README's "Verify before launch" list.

## Tooling

- `npm install -g @playwright/cli` for screenshots and research; `.playwright/cli.config.json` points it
  at a local Chromium.
- ImageMagick for placeholder stills when no image host is reachable.
- `atelier/qa-shots.sh projects/<client>` captures the QA screenshots and prints overflow, font and image checks.
- `npx serve projects/<client>` to preview.
