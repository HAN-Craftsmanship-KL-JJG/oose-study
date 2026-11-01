# Contributing

This guide explains how the site is built and how to change it.

## Content rules

- Theory only: no information about the exam itself, such as dates, points, criteria, question numbers or exam advice.
- English only, with no Dutch translations.
- Little text: no page intros, no text about the site, no summary boxes.

## Run it

You need Node.js 20 or later.

```sh
npm install
npm run dev        # open http://localhost:3000
```

For a fast version without the development tools, run `npm run build` and then `npm start`.

## Publish it

The site is public at https://han-craftsmanship-kl-jjg.github.io/oose-study/.
Every push to `main` runs `.github/workflows/pages.yml`.
It builds a static site to `out/` and publishes it on GitHub Pages.
The workflow sets `BASE_PATH` to `/oose-study`, so every page link must use `next/link` (MDX links do so).

## Check your changes

```sh
npm run check
```

This runs every check, and any warning fails it:

- `format:check`: Prettier, with Tailwind classes sorted. Run `npm run format` to fix.
  MDX pages are not formatted by Prettier, because they keep one sentence per line.
- `lint`: ESLint with the strictest typescript-eslint rules, the Next.js rules and `--max-warnings 0`.
- `typecheck`: TypeScript with every strict option on.
- `check:size`: the size limits below.
- `check:uml`: every diagram has an up-to-date SVG in `uml/svg/`.
- `build`: Next.js builds every page. It fails on a missing example file or a broken question.

| Files                    | Maximum lines per file | Maximum characters per line       |
| ------------------------ | ---------------------- | --------------------------------- |
| `.ts`, `.tsx`, `.mjs`    | 250                    | 100                               |
| `content/**/*.ts` (data) | 450                    | 100, strings excepted             |
| `.mdx` pages             | 500                    | 160, tables and diagrams excepted |
| `.java`, `.ps1` examples | 120                    | 100                               |

A page that grows over 500 lines moves its sections into `app/<topic>/_sections/*.mdx`.

## Where things are

| Path                   | What it holds                                                                  |
| ---------------------- | ------------------------------------------------------------------------------ |
| `app/<topic>/page.mdx` | One page per topic, in MDX (Markdown with components)                          |
| `lib/pages.ts`         | The list of pages: menu order, sections and titles                             |
| `examples/<topic>/`    | Code examples: `<name>.java`, `<name>.ps1` and an optional `<name>.notes.json` |
| `content/questions/`   | The question bank, one file per topic                                          |
| `components/`          | The React components that pages use                                            |
| `lib/`                 | Shared types and helpers                                                       |
| `lib/search-index.ts`  | Builds the search index from the MDX pages, served as `/search-index.json`     |
| `uml/`                 | The diagram style and the rendered diagrams                                    |

## Components you can use in a page

- `<Example name="topic/name" title="..." />` shows a code example with a tab per language.
  Add `label="Creator" tone="green"` to put a coloured pill before the title.
  The tones are `blue`, `green`, `rose`, `amber`, `violet` and `stone`.
- End a code line with the comment `// [!code highlight]` (`# [!code highlight]` in PowerShell) to give it a coloured band.
  This works in example files, fenced code blocks and question code. Use it for the one line that the reader should look at.
  When the line is too long, put the marker on its own line just above it.
- A fenced code block with the language `plantuml` becomes a UML diagram. See "Diagrams" below.
- `<Callout type="note">` shows a quiet box.
- `<Compare>` with two `<Side kind="bad|good|neutral" title="...">` shows two things side by side.
- `<Reveal title="...">` hides an answer until the student opens it.
- `<Checklist id="..." items={[...]} />` shows checkboxes that the browser remembers.
- `<UmlSymbol kind="..." />` draws one UML symbol, such as an arrow or a stick figure, for a table cell.
  The kinds are in `components/symbols/`.
- `<Questions topic="..." />` shows every question of a topic; `<Questions ids={[...]} />` shows the ones you name.

## Diagrams

Diagrams are PlantUML.
Write only the body of the diagram in a fenced block, without `@startuml`, `@enduml` or `skinparam` lines:

````md
```plantuml
class Animal {
  - name: String
  + eat(): void
}
Animal <|-- Lion
```
````

`uml/style.puml` gives every diagram the same look.
`npm run uml` draws each new or changed diagram to `uml/svg/<hash>.svg` and deletes the unused ones.
It runs PlantUML 1.2026.8 in a container: Apple `container`, Docker or Podman, whichever is installed (or set `UML_RUNTIME`).
It downloads the font Source Serif 4 to `.cache/` the first time.
Commit the SVG files: the build reads them, so `npm run dev` and `npm run build` need no container.

## Add a page

1. Create `app/<topic>/page.mdx` and start it with `export const metadata = { title: "..." };`.
2. Add the page to `lib/pages.ts`.
3. Create `content/questions/<topic>.ts` and import it in `content/questions/index.ts`.

## Add a language

Add it to `lib/languages.ts`, then add files with its extension to `examples/`.
