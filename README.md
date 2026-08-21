# Syifara — Mobile App Developer Portfolio

A dark, single-page portfolio built with plain HTML, CSS, and JavaScript — no framework, no build step.

🔗 Live :https://syifara-portfolio.netlify.app/

## Features

- **Hero** — full-bleed intro with a link straight to LinkedIn
- **Running skills marquee** — an infinite scrolling strip of the tech stack
- **Projects** — a spinning clock-face layout with a glowing WhatsApp button at the center and six project links placed around the ring like hour marks
- **Skills** — two rows of rounded tiles auto-scrolling in opposite directions
- **Background music** — autoplays on load (falls back to starting on first click/scroll if the browser blocks autoplay), no visible toggle
- Fully responsive down to mobile, with the clock and marquees adapting to smaller screens

## Tech Stack

- HTML5
- CSS3 (custom properties, `conic-gradient`, `repeating-conic-gradient`, CSS animations — no framework)
- Vanilla JavaScript (no dependencies)
- Google Fonts: Geist, Geist Mono, Instrument Serif

## File Structure

```
.
├── index.html     # Page markup
├── style.css       # All styling
├── script.js       # Music autoplay logic
├── music.mp3        # Background audio track
└── README.md
```

## Running Locally

No build tools needed. Just serve the folder:

```bash
# Option 1 — Python
python3 -m http.server 8000

# Option 2 — Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

You can also just double-click `index.html` to open it directly, though some browsers restrict audio autoplay more strictly under the `file://` protocol.

## Customizing

- **WhatsApp number** — update the `wa.me` links in `index.html` (currently a placeholder: `6281234567890`)
- **Email** — update any `mailto:` links
- **Projects** — edit the `.clock-mark` links inside `<section id="projects">`
- **Skills** — edit the `.flow-chip` items inside `<section id="skills">`
- **Colors** — all controlled via CSS custom properties at the top of `style.css` (`:root`)

## Credits

Designed & built for Syifa Rizka Angeli.