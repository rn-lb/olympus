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

## Content note

Myths have multiple surviving traditions. Entries in this project are concise orientation material, not definitive translations or historical claims.

## License

Code is available under the MIT License.
