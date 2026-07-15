KUMA TSEGAYE PORTFOLIO — "TERMINAL" REDESIGN
==============================================

WHAT'S IN THIS ZIP
- index.html   (full redesign: dark IDE/terminal theme)
- script.js    (typing hero handled in pure CSS; JS runs the cert slider,
                people carousel, image modal, copy-to-clipboard, and
                scroll-based active-tab highlighting)

DESIGN CONCEPT
Instead of another glass-card site, this leans directly into your own world
as a developer: the top bar looks like editor tabs (home.tsx, about.md,
projects/, experience.log, collaborators.json, contact.sh), the hero is a
terminal window "running" whoami / cat mission.txt / ls skills/, and each
project is styled like a file entry with a live git-status badge (green
pulsing dot for "live", amber for "dev"). Dark background, mint-green accent,
JetBrains Mono + Space Grotesk type pairing.

HOW TO USE IT
Same drop-in approach as before — I don't have network access to pull your
actual images/PDF from GitHub, so index.html references them by the exact
filenames already in your repo. Unzip these two files into your repo root,
overwriting the old index.html and script.js.

FILES index.html EXPECTS NEXT TO IT (already in your repo):
  favicon.ico
  profilepic.png
  nuner-screenshot.png
  exploromia-screenshot.png
  taximate-screenshot.png
  litloom-screenshot.png
  IMG_20250628_115425_802.jpg
  ITcertificate.jpg
  ITcertificate2.jpg
  Benchmarkcertificate.jpg
  udacityimg.jpg
  recomendations.pdf
  flower.jpg
  feyu.jpg
  nasir.jpg
  yosen.jpg

If a filename doesn't match what's in your repo, rename the file or update
the matching src="" in index.html — no separate stylesheet to touch, styling
is all inline in index.html.

DEPLOY
Push both files to your GitHub repo's main branch. If Netlify is connected,
kumatsegaye.netlify.app redeploys automatically.

NOTES
- Respects prefers-reduced-motion (disables the blinking cursor / pulse dot).
- All copy fixes from the last pass carried over (Software Engineer typo,
  honest "in progress" status instead of dead links, etc).
