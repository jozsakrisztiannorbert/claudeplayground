#!/usr/bin/env bash
# Usage: atelier/qa-shots.sh projects/<client> [port]
# Serves the project, captures desktop/mobile first-viewport and full-page screenshots,
# a hovered film frame, and prints overflow, font and image checks. Run from the repo root.
set -euo pipefail
P=${1:?project dir}; PORT=${2:-4173}
mkdir -p "$P/screenshots"
if ! curl -sS -o /dev/null "http://127.0.0.1:$PORT/" 2>/dev/null; then
  (setsid nohup npx --yes serve -l "$PORT" -n "$P" >/dev/null 2>&1 < /dev/null &)
  for i in $(seq 1 10); do sleep 1; curl -sS -o /dev/null "http://127.0.0.1:$PORT/" 2>/dev/null && break; done
fi
export PLAYWRIGHT_MCP_CONFIG="$PWD/.playwright/cli.config.json"
pw() { playwright-cli "$@"; }
settle() { pw eval "new Promise(r=>setTimeout(r,$1))" >/dev/null; }
scrollall() { pw eval "new Promise(r=>{let y=0;const h=document.documentElement.scrollHeight;const t=setInterval(()=>{y+=500;window.scrollTo(0,y);if(y>h){clearInterval(t);setTimeout(()=>{window.scrollTo(0,0);setTimeout(r,1600)},1800)}},120)})" >/dev/null; }
pw close >/dev/null 2>&1 || true
pw open "http://127.0.0.1:$PORT/" >/dev/null
for vp in "1440 900 desktop" "390 844 mobile"; do
  set -- $vp
  pw resize "$1" "$2" >/dev/null; pw reload >/dev/null; settle 3800
  pw screenshot --filename="$P/screenshots/$3.png" >/dev/null
  scrollall
  pw screenshot --full-page --filename="$P/screenshots/$3-full.png" >/dev/null
  echo "$3: $(pw eval "document.documentElement.scrollWidth + 'x' + document.documentElement.clientWidth + ' fonts:' + document.fonts.status + ' unloaded-images:' + [...document.images].filter(i=>!i.complete||i.naturalWidth===0).length + ' hidden-reveals:' + [...document.querySelectorAll('[data-reveal]')].filter(e=>!e.classList.contains('in')).length" | grep -A1 Result | tail -1)"
done
pw resize 1440 900 >/dev/null; pw reload >/dev/null; settle 3800
pw eval "document.querySelector('#films') && document.querySelector('#films').scrollIntoView(); new Promise(r=>setTimeout(r,900))" >/dev/null
pw mousemove 400 480 >/dev/null; settle 1400
pw screenshot --filename="$P/screenshots/desktop-films-hover.png" >/dev/null
echo "hover: $(pw eval "document.getElementById('films') ? 'lit:' + document.getElementById('films').classList.contains('is-lit') : 'n/a'" | grep -A1 Result | tail -1)"
echo "console: $(pw console | grep -E 'Total messages' || true)"
pw close >/dev/null 2>&1 || true
