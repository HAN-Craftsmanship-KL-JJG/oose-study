# AGENTS.md

This file gives coding agents guidance for working in this repository.

A static Next.js + MDX study site for object-oriented analysis and design (HAN exam S_Toets1), published on GitHub Pages.
[CONTRIBUTING.md](CONTRIBUTING.md) is the full guide: content rules, size limits, the components a page can use, and how to add a page, a diagram or a question.
Read it before you change content.

## Commands

```sh
npm run dev      # http://localhost:3000
npm run check    # the full gate: format, lint, typecheck, size, UML, build; any warning fails it
npm run format   # fix Prettier issues
npm run uml      # render new or changed PlantUML diagrams to uml/svg/
```

There is no test suite.
`npm run build` is the closest thing: it fails on a missing SVG, a missing example file or an invalid question.

## Things that are easy to get wrong

- **Diagrams need a rendered SVG.** A `plantuml` block in MDX (or the `uml` field of a question) is looked up at build time as `uml/svg/<hash>.svg`, where the hash covers `uml/style.puml` and the block body (`lib/uml-hash.mjs`).
  Never edit or write an SVG by hand: change the PlantUML source, then run `npm run uml` to render it with the PlantUML container, and commit the SVGs.
  The development machine uses Apple `container`, which the script picks first (Docker or Podman also work; `UML_RUNTIME` overrides the choice).
  Editing `uml/style.puml` changes every hash and re-renders every diagram.
  If the container cannot run, stop and say so.
- **MDX keeps one sentence per line.** Prettier skips `.mdx` on purpose, and `check:size` caps lines at 160 characters.
  A page over 500 lines moves sections into `app/<topic>/_sections/*.mdx`.
- **The site runs under a base path.** Production serves from `/oose-study`, so internal links go through `next/link` (MDX `/...` links already do, via `mdx-components.tsx`), and `fetch()` must prefix `process.env.NEXT_PUBLIC_BASE_PATH`.
  It is a static export (`output: "export"`): no API routes, server actions or runtime server code.
- **Question ids are stable.** Student progress is stored in `localStorage` under each question id, so renaming an id resets progress.
  Ids must start with `<topic>-`; `content/questions/index.ts` validates the bank at build time.
- **A new MDX component must be registered** in `mdx-components.tsx` before pages can use it.
- **A new page touches three places:** `app/<topic>/page.mdx`, `lib/pages.ts` (menu order, pager, search index) and `content/questions/<topic>.ts` plus its import in `content/questions/index.ts`.

## Writing style

Site text, code comments, docs and commit messages all use short, plain English sentences.
Follow the content rules in CONTRIBUTING.md (theory only, no exam details, no intros or summaries).
Commit subjects use a conventional prefix and describe the change from the reader's side, for example `feat: turn the page with the left and right arrow keys`.
