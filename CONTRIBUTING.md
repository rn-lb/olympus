# Contributing to Olympus Archive

Thank you for helping make the archive clearer and more reliable.

## Good contributions

- Correct an inaccurate or overly absolute statement
- Add a missing figure with concise, neutral language
- Improve keyboard, screen-reader, or mobile behavior
- Add a focused test or documentation example
- Improve performance without reducing clarity

## Entry format

Entries live in `data.js` and use this structure:

```js
{
  name: "Name",
  group: "Olympian | Titan | Hero | Primordial",
  domain: "Short description",
  symbol: "A single representative character",
  summary: "One or two careful sentences.",
  parents: "Names or a note that traditions vary",
  symbols: "Comma-separated symbols"
}
```

## Editorial guidelines

1. Avoid presenting one literary version as the only version.
2. Prefer clear language over dramatic but unsupported claims.
3. Cite a primary text or reputable reference in the pull-request description for factual changes.
4. Keep summaries concise; this interface is an index, not a replacement for scholarship.
5. Do not copy paragraphs from other websites.

## Development

The site has no build step. Open `index.html` or run a local static server. Before submitting:

1. Test search with a name, domain, and symbol.
2. Test every group filter.
3. Open and close the detail dialog using a keyboard.
4. Check the layout at a narrow viewport.
