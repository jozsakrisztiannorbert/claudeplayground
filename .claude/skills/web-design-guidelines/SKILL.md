---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance (accessibility, focus, forms, animation, typography, images, dark mode, copy). Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or before shipping any Atelier page.
metadata:
  author: vercel (vendored by Atelier)
  upstream: https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
  version: "1.0.0-atelier"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Vercel's Web Interface Guidelines.

## How It Works

1. Read the rules in `references/web-interface-guidelines.md` (vendored copy of
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`).
   If network access allows, fetch the upstream URL first and prefer it when it is newer.
2. Read the specified files (or ask for files/pattern).
3. Check against every rule.
4. Output findings in the terse `file:line` format defined at the end of the rules file.

## Atelier usage

The QA agent runs this skill on every page in `projects/*/` before the page is
considered done. Findings are fixed, not filed. A page ships only when every
file reads `✓ pass` or the remaining findings are listed in the project README
with a reason.
