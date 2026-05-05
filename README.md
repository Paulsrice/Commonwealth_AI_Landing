# Commonwealth AI Partners

> Systems you can swear by.

Marketing site for Commonwealth AI Partners, a standup AI &amp; automation
consultancy. Built with Astro + React, Tailwind CSS, and shadcn/ui primitives.

## Stack

- **Astro 4** &mdash; static-first, MPA, with islands of React where needed
- **React 18** &mdash; for the few interactive pieces (shadcn primitives)
- **Tailwind CSS 3.4** &mdash; design tokens defined in `tailwind.config.mjs`
- **shadcn/ui** &mdash; Button + Card primitives in `src/components/ui/`
- **Type-safe** via Astro&rsquo;s strict tsconfig + path aliases (`@/*`)

## Brand tokens

| Token | Value | Usage |
| --- | --- | --- |
| `carbon` | `#0A0A0A` | Default body background |
| `carbon-800` | `#141414` | Cards, secondary surfaces |
| `cobalt-500` | `#2E5BFF` | Primary accent, hero block, CTA |
| `ash-300/400` | gray scale | Body copy, captions |
| `font-display` | Space Grotesk | Hero + section heads |
| `font-sans` | Inter | Body |
| `font-mono` | JetBrains Mono | Metadata strips, codes |

Colors are also exposed as shadcn semantic tokens (`--background`,
`--primary`, etc.) inside `src/styles/globals.css` so additional shadcn
components drop in cleanly.

## Project structure

```
commonwealth-ai-partners/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── components.json          # shadcn config
├── public/
│   └── favicon.svg
└── src/
    ├── env.d.ts
    ├── layouts/
    │   └── Layout.astro
    ├── lib/
    │   └── utils.ts          # shadcn `cn()` helper
    ├── pages/
    │   └── index.astro       # the home page
    ├── styles/
    │   └── globals.css       # Tailwind + theme tokens
    └── components/
        ├── Logo.astro
        ├── Header.astro
        ├── Footer.astro
        ├── Wireframe.astro   # workflow blueprint SVG
        ├── ui/
        │   ├── button.tsx    # shadcn Button (5 variants)
        │   └── card.tsx      # shadcn Card
        └── sections/
            ├── Hero.astro
            ├── SystemBlueprint.astro
            ├── Approach.astro
            ├── SpecStrip.astro
            ├── Industries.astro
            ├── Services.astro
            ├── CaseStudies.astro
            └── Contact.astro
```

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build into ./dist
npm run preview  # serve the build locally
```

## Adding pages

The home page is the only fully populated route. As you grow:

- Industry detail pages &mdash; create `src/pages/industries/[slug].astro`
- Service detail pages &mdash; create `src/pages/services/[slug].astro`
- Case studies &mdash; the cleanest path is Astro content collections at
  `src/content/case-studies/*.md` with a `[slug].astro` route under
  `src/pages/case-studies/`.

## Adding shadcn components

```bash
npx shadcn@latest add accordion dialog input textarea
```

The config in `components.json` is already pointed at `src/components/ui/`
and the `@/*` alias.

## Notes on the visual language

The reference is editorial, industrial, almost engineering-firm in feel
(see Enerblock&rsquo;s site as the visual touchstone). Three motifs to keep using
as the site grows:

1. **Metadata strips** &mdash; small uppercase mono labels under hairlines
   (`SYSTEM`, `EST. 2025`, file numbers like `IND.01`, `DWG NO. 158.01.00`).
2. **Drawing-style framing** &mdash; corner crosshairs, dashed alignment lines,
   and labeled spec blocks on diagrams.
3. **Hairline grid lines** &mdash; vertical 1/3 + 2/3 hairlines under headlines
   and in cobalt blocks. Use sparingly.
