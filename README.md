# Olympus Archive

A lightweight, dependency-free encyclopedia for exploring figures from Greek mythology.

## Features

- Search by name, domain, symbol, or description
- Filter entries by Olympian, Titan, hero, and primordial groups
- Responsive gold-on-black interface
- Keyboard-friendly controls and reduced-motion support
- Data separated from presentation for straightforward expansion

## Run locally

Open `index.html` directly in a modern browser, or serve the directory:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Project structure

- `index.html` — semantic application shell
- `styles.css` — responsive visual system
- `data.js` — mythology entries
- `app.js` — rendering, search, filters, and detail dialog
- `about.html` — project scope and editorial principles
- `CONTRIBUTING.md` — contribution workflow and data guidelines
- `bot/` — optional Discord bot for translating community messages into Vietnamese

## Discord translator

The companion bot supports an on-demand `/translate` command and opt-in automatic translation for selected channels. See [`bot/README.md`](bot/README.md) for the Discord invite flow, privacy considerations, and local setup.

## Content note

Myths have multiple surviving traditions. Entries in this project are concise orientation material, not definitive translations or historical claims.

## License

Code is available under the MIT License.
