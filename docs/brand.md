# Brand & Design System

Reference for anyone writing copy, designing pages, or extending the
component library for Commonwealth AI Partners. Pair this with the
hands-on token reference in `tailwind.config.mjs`.

## Brand essence

> **Commonwealth AI Partners** is a "standup" AI &amp; automation
> consultancy. The name plays on three meanings of *standup*: the daily
> meeting (rhythm), the reputation ("a standup person", character), and
> the act of standing up new systems (execution). The brand pillars
> derive from these three.

**Tagline (current):** *Systems you can swear by.*

**Promise:** Operators come to us when their backend is held together
with digital duct tape. We architect the system, stand it up, and keep
it running. We are the antithesis of grifters in a market flooded with
them.

**Audience:** business owners and operators of scaling, complex
operations who can no longer hold the org together by force of will.
They don't need more software — they need a centralized nervous system.

## The three brand pillars

When writing any new section or page, the copy should serve at least one
of these:

1. **Rhythm — The Meeting.** Automation isn't set-and-forget. Systems
   need a pulse. We bring standup-style cadence, alignment, and
   discipline to chaotic ops.
2. **Character — The Reputation.** Brutally honest. We say no to projects
   we can't execute, give realistic timelines, and tell you when an
   automation isn't worth building.
3. **Execution — The Deployment.** We build. We get our hands dirty in
   the operational mechanics — Stripe webhooks, schema migrations,
   workflow error branches no one else wants to own.

## Voice principles

### Direct & optimistic
Focus on the tangible relief automation brings. Use concrete language
about real outcomes (hours saved, error rates dropped, cycles
shortened).

> **Don't:** "We leverage synergistic ML to drive transformational
> outcomes."
> **Do:** "We build systems that work so you don't have to."

### Technical but grounded
Show that we know the stack inside out — but speak in business outcomes.
Translate "complex relational architecture" into "single source of truth
instead of fragmented spreadsheets."

> **Don't:** "Our PostgreSQL schemas leverage normalized 3NF compliance
> with hash-partitioned indexes."
> **Do:** "One update reflects everywhere, instantly."

### Brutally honest
The market is flooded with grifters. Lean into it. Reject grandiose
claims, vague promises, and AI-hype theater.

> **Don't:** "Revolutionary AI agents that will transform your business."
> **Do:** "Claude, GPT, and Gemini deployed as an invisible Chief of
> Staff — not generic chatbots glued to the surface."

### Earned authority
We sound like we've actually shipped this stuff before. Specific tools,
specific outcomes, specific numbers. Avoid vague consultant-speak.

> **Don't:** "We help organizations unlock the power of AI."
> **Do:** "Built on Make.com, n8n, Supabase, and Claude. Documented like
> an engineering firm, delivered like a small team that gives a damn."

### Light, never twee
Wit is welcome — irreverence isn't. We're confident, not snarky.

> **OK:** "Receipts, not slides."
> **OK:** "Two stacks. Both stood up by the same hands that designed
> them."
> **Avoid:** any meme references, any "let's get nerdy", any "✨" or
> excessive exclamation marks.

## Typography rules

- **Headlines** (`font-display` / Space Grotesk Bold) — tight tracking
  (`tracking-tightest`, `-0.045em`), `text-balance`, never sentence-cased
  or ALL-CAPS. Treat headlines as editorial display type. Use periods at
  the end of declarative headlines ("We build the architecture.") for
  weight.
- **Body** (Inter, regular/medium) — leading-relaxed for paragraphs,
  leading-snug for subheads. `text-pretty` for paragraphs longer than a
  sentence.
- **Mono / meta** (`font-mono` / JetBrains Mono) — uppercase, letter
  spacing `0.16–0.18em`, used exclusively for: kickers, file codes,
  metadata strips, button labels, captions.
- **Never mix** display and mono in the same word/phrase. Mono is for
  the supporting cast, never the main act.

## Color tokens

Defined in `tailwind.config.mjs`.

### Carbon (the canvas)
Default body bg + most surfaces.

| Token | Hex | Use |
|---|---|---|
| `carbon-950` | `#050505` | Footer / deepest sections |
| `carbon` / `carbon-900` | `#0A0A0A` | Default body bg |
| `carbon-800` | `#141414` | Cards on a dark page (Industries, Services cards) |
| `carbon-700` | `#1C1C1C` | Hover states on dark cards |
| `carbon-600` | `#262626` | Rare — subtle dividers |

### Cobalt (the brand accent)
The single hero accent. Use **sparingly** — it should only show up in
moments that genuinely matter.

| Token | Hex | Use |
|---|---|---|
| `cobalt-500` | `#2E5BFF` | Hero block, Contact block, primary CTAs, highlights |
| `cobalt-400` | `#4C74FF` | Hover state on cobalt-500 buttons; small accent text on dark |
| `cobalt-600` | `#1A47E6` | Hover state below 500 |

**Don't use** cobalt for body backgrounds, large fields, or anything
"informational." Reserve it for emphasis.

### Ash (text on dark)
Body copy hierarchy on dark surfaces.

| Token | Hex | Use |
|---|---|---|
| `ash-200` | `#E8E8E8` | High-emphasis paragraph copy |
| `ash-300` | `#D6D6D6` | Standard paragraph copy on dark |
| `ash-400` | `#B8B8B8` | Secondary paragraph copy |
| `ash-500` | `#9A9A9A` | Captions, labels |

### Foreground rules
- On `bg-cobalt-500`: use `text-carbon` for headings + body, `text-white`
  for small/secondary text where contrast at lower opacity would fail.
  **Avoid `text-carbon/60` or below — it gets washed out.**
- On `bg-carbon` and friends: use `text-white` or `text-foreground` for
  display, `text-ash-300` for body, `text-ash-500` for captions.

## Recurring visual motifs

These are the consistent design patterns that give the site its
"engineering firm" feel. Use them when building new sections.

### Metadata strips
Small uppercase mono labels under a hairline border. Used as section
kickers and corner metadata.

```astro
<div class="meta-strip text-cobalt-400 border-t border-cobalt-500/40 pt-4 max-w-xs">
  Diagnosis
</div>
```

The `meta-strip` utility class is defined in `globals.css` and bakes in
the right size, weight, and tracking.

### File codes
Treat each section / card / page as if it were a labeled drawing. Use a
short alphanumeric code in the corner.

| Pattern | Example | Used for |
|---|---|---|
| `DEP.0X` | `DEP.01` | Service / deployment cards (4 of them) |
| `IND.0X` | `IND.02` | Industry pages |
| `CS.0X` | `CS.01` | Case studies |
| `FILE 0X.0X` | `File 02.01` | Generic spec card / contact card |
| `DWG NO. 0XX.0X.0X` | `DWG NO. 158.01.00` | Technical drawings (the wireframe block) |

These don't need to "mean" anything — they're a visual rhythm device.

### Drawing-style spec blocks
A bordered grid with title rows: title / drawing number / scale, with a
small logo in the leftmost cell. See `SystemBlueprint.astro` for the
canonical implementation.

### Hairline grid lines
Vertical 1/3 + 2/3 hairlines on cobalt sections (Hero, Contact). Subtle —
`bg-carbon/15`. Use sparingly to add architectural framing without
clutter.

### "Open file →" affordances
Cards that link somewhere should label the action with the metaphor
intact: `Open file →`, `Read →`, `Open spec →`. Avoid generic "Learn
more" — it's softer than the brand register.

### Architectural drawing motifs (advanced)
The `Wireframe.astro` component uses corner crosshairs (`+` markers
in the corners of a frame), dashed alignment lines, and labeled boxes.
If you build a similar diagram, keep these motifs.

## Tone of CTAs

Primary CTAs should feel imperative and concrete. The current language:

- **Book a Systems Audit** (the canonical CTA)
- **Tell us what's broken** (alternate)
- **Open file →** (for navigation cards)
- **Read →** (for case study cards)

Avoid:
- "Learn more" (too soft)
- "Click here" (always)
- "Get started" (vague)
- "Schedule a consultation" (consultant-speak)

## Spacing rhythm

Sections use vertical breathing room: `py-24 md:py-36`. Cards inside
grids use `p-8 sm:p-10`. Stack tokens are 16–24px between elements,
opening up to 48px+ between major content blocks. Don't pack content
density too tight — the whitespace IS part of the brand.

## Component patterns

### Section header pattern
```astro
<div class="grid grid-cols-12 gap-6 mb-12 md:mb-20 items-end">
  <div class="col-span-12 md:col-span-3 meta-strip text-ash-500 border-t border-white/15 pt-4">
    Section Kicker
  </div>
  <h2 class="col-span-12 md:col-span-9 font-display text-display-lg tracking-tightest text-balance">
    The big thing we're saying.
  </h2>
</div>
```

### Card grid pattern
Use `gap-px bg-white/10 border border-white/10` on the wrapper to get a
subtle 1px divider between cards. Each card has its own
`bg-carbon-{800,900}` so they sit cleanly on the divider color.

### Cobalt block
For the hero / contact / future emphasis blocks: full bleed
`bg-cobalt-500 text-carbon`. Add the two vertical hairlines:

```astro
<div aria-hidden="true" class="absolute inset-y-0 left-1/3 w-px bg-carbon/15 hidden md:block"></div>
<div aria-hidden="true" class="absolute inset-y-0 left-2/3 w-px bg-carbon/15 hidden md:block"></div>
```

## Things to actively avoid

- **Generic AI brain / glowing orb / neural network imagery.** Use
  technical drawings, architectural blueprints, structural cutaways.
- **Soft pastel SaaS gradients.** Stick to high-contrast carbon + cobalt.
- **Stock photography of "diverse team in a meeting."** If we add
  photography, use industrial / macro / cinematic lighting on real
  spaces or hardware.
- **Icon sets that read "fintech" or "bootstrap."** If icons are needed,
  reach for `lucide-react` (already a dep) and use them sparingly with
  consistent stroke weight.
- **Sentence-case headlines.** Capitalize first word + proper nouns.
  "The AI industry is flooded with grifters." not "The Ai Industry Is
  Flooded With Grifters."
- **Exclamation marks.** Almost never. The brand voice is confident
  enough that they read as compensation.

## Reference: tagline alternates

Originally explored, can be brought back for specific contexts:

- "Systems you can swear by." (current primary)
- "Built right. Stood up fast."
- "Automation with integrity."
- "The rhythm of modern business."

Useful as section subheads or in social/ad copy when "Systems you can
swear by." has already been used in the same context.
