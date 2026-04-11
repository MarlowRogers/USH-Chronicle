# USH Chronicle — CLAUDE.md

## Project Overview

**The Thacher Chronicle** is a static HTML website for Thacher School's US Honors History class (Ojai, CA). It displays a curated archive of current events, organized by date and category in a newspaper-style layout.

- **Repo:** https://github.com/MarlowRogers/USH-Chronicle
- **Live site:** https://marlowrogers.github.io/USH-Chronicle
- **Hosted via:** GitHub Pages (no build step, serves static files directly)

---

## Architecture

Single-file static site. No framework, no build step, no dependencies.

- `index.html` — the entire site: HTML structure, all CSS, all JS, and all article data in one file
- `README.md` — project description with VS Code badge

The article data lives as a JavaScript array called `ARTICLES` inside `index.html`, starting around line 430.

---

## Article Data Format

Each entry in the `ARTICLES` array:

```js
{
  date: "April 10, 2026",       // full date string
  month: "April",               // used for month filter
  cat: "International",         // "International", "National", or "Local"
  headline: "Headline text",
  source: "Source Name",
  url: "https://...",
  good: true                    // optional — only present for Good News stories
}
```

## Raw Google Doc Input Format

The teacher pastes entries in this format:

```
**Friday, April 10, 2026**
**International:**
[Headline text](https://url.com) (Source Name)

**National:**
[Headline text](https://url.com) (Source Name)

**Local:**
[Headline text](https://url.com) (Source Name)
```

---

## What Needs to Be Built

The main priority is making the weekly update workflow faster. In order of priority:

1. **Separate data from UI** — move `ARTICLES` out of `index.html` into `articles.js` or `articles.json` so new entries can be added without touching the HTML/CSS
2. **Parser script** — a script (Node.js or plain JS) that takes raw Google Doc markdown and converts it to the correct JS object format automatically
3. **Update workflow** — clear, fast process for pasting new Google Doc entries and getting them into the site

---

## Design Notes

- **Fonts:** Playfair Display (headlines), Source Serif 4 (body), Courier Prime (metadata) — loaded from Google Fonts
- **Color scheme:**
  - International: navy (`#1a3a5c`)
  - National: dark green (`#2d5016`)
  - Local: brown (`#5c3d1a`)
  - Good News: teal green (`#1a5c3d`)
  - Paper background: `#f5f0e8`
- **Aesthetic:** newspaper — paper texture overlay, ink colors, double-rule borders
- **Filters:** month (January–April), category (International/National/Local), Good News toggle
- **Featured card:** first article per category gets a slightly larger treatment

---

## Key Constraints

- Keep it a single-file site unless there is a strong reason to split (GitHub Pages serves it with zero config this way)
- No build tools, no npm, no frameworks — this needs to be maintainable by a teacher
- The data separation (if done) should not require any server or build step to work
- New entries are added frequently (roughly daily during the school year)
