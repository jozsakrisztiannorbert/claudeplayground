// Renders composition.html frame by frame with Playwright, then encodes with ffmpeg.
// Usage: node render.js [--preview]   (preview writes six key stills only)
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const FPS = 30, DURATION = 21.0, W = 1920, H = 1080;
const here = __dirname;
const framesDir = path.join(here, 'frames');
const preview = process.argv.includes('--preview');

(async () => {
  fs.mkdirSync(framesDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--force-device-scale-factor=1'] });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(here, 'composition.html'));
  await page.evaluate(() => window.ready);
  await page.waitForTimeout(300);

  if (preview) {
    for (const t of [1.2, 2.6, 6.2, 10.9, 14.6, 17.9, 20.0]) {
      await page.evaluate((ms) => window.seek(ms), t * 1000);
      await page.waitForTimeout(40);
      await page.screenshot({ path: path.join(here, `preview-${t.toFixed(1)}.png`), type: 'png' });
    }
    await browser.close();
    console.log('preview stills written');
    return;
  }

  const total = Math.round(DURATION * FPS);
  const started = Date.now();
  for (let i = 0; i < total; i++) {
    await page.evaluate((ms) => window.seek(ms), (i / FPS) * 1000);
    await page.screenshot({ path: path.join(framesDir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 94 });
    if (i % 90 === 0) console.log(`frame ${i}/${total} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  }
  await browser.close();

  const out = path.join(here, '..', 'brag.mp4');
  const music = path.join(here, 'music.wav');
  const audio = fs.existsSync(music) ? `-i "${music}" -map 0:v -map 1:a -c:a aac -b:a 192k -shortest` : '';
  execSync(`ffmpeg -y -framerate ${FPS} -i "${path.join(framesDir, 'f%04d.jpg')}" ${audio} -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${out}"`, { stdio: 'inherit' });
  console.log('rendered', out);
})();
