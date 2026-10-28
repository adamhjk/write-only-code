# AGENTS.md

Slide deck for a GitHub Universe ’26 breakout session, presented by
**Adam Jacob** (Swamp Club) and **Dylan Ratcliffe** (Until).

Stack: Bun + Vite + React 19 + [`@revealjs/react`](https://revealjs.com/react)
(reveal.js 6) + d3. 1920×1080 slides. TypeScript, strict.

## Commands

Run everything from the repo root. Bun is pinned in `mise.toml`.

```sh
mise install       # installs the pinned bun
bun install
bun run dev        # Vite dev server (5173, or the next free port)
bun run build      # tsc --noEmit + vite build → dist/
bun run typecheck
```

`bun run build` must pass before you call a change done. Pin exact versions
for any new dependency.

## Layout

```
mise.toml              bun version
index.html             Vite entry
public/speakers/       square headshots (adam.jpg, dylan.jpg, 480×480)
src/
  main.tsx             fonts + reveal.css + theme.css, mounts <App>
  App.tsx              <Deck> config, then <Talk />, then the boneyard
  talk/                THE TALK
    topics.ts          every section: id, title, speaker
    Talk.tsx           running order; section slides go here
    Agenda.tsx         the agenda slide (reused)
    Section.tsx        section wrapper: title slide → your slides → agenda
  slides/
    Openers.tsx        TitleSlide, SpeakersSlide (“hello”), sample layouts
    Content.tsx        sample layouts
    Viz.tsx            sample d3 diagram + chart slides
    Boneyard.tsx       the BONEYARD divider
  components/
    Frame.tsx          slide chrome; SectionContext; SpeakerChip; Kicker
    Brand.tsx          Until + Swamp Club logos (inline SVG)
    FitHeading.tsx     display heading that shrinks to fit its column
    Ticker.tsx, Starfield.tsx, useSlideActive.ts
  viz/                 d3 components (FlowDiagram, LineChart) + palette.ts
  theme/
    tokens.css         colors, fonts, type scale: the design tokens
    theme.css          reveal theme + all component styles
```

## Structure of the deck

```
Title
Hello            both speakers + the “code review” line
Agenda
├─ Coding @ Until            (Dylan)   ┐
├─ Coding @ Swamp            (Adam)    │ intros: top row of the agenda
├─ Software Factories        (Adam)    ┐
├─ Plan Review               (Dylan)   │
├─ Tribal Knowledge          (Dylan)   │
├─ Compliance                (Adam)    │ topic grid, 4×2
├─ What happens to Product   (Adam)    │
├─ Flow                      (Dylan)   │
├─ Creativity                (Adam)    │
├─ Team Dynamics             (Dylan)   ┘
└─ Question                  (both)      full-width row under the grid
BONEYARD         end of talk; sample layouts after this are reference only
```

The talk is non-linear: the audience shouts a topic, the presenters click it
on the agenda, present that section, and land back on the agenda.
Sections appear in `Talk.tsx` in agenda order so linear arrow-key navigation
still walks the whole talk.

### Every section follows the same rules

These are enforced by `<Section>` in `src/talk/Section.tsx`. Don't
re-implement them by hand.

1. **First slide is the section title.** It shows the topic title, with the
   speaker's photo, name and company underneath (both speakers for `"both"`).
   This slide has the HTML id `topic.id`, so it lives at `#/<topic.id>`; that's
   what the agenda links to.
2. **Every slide in the section shows the speaker's name in the upper right.**
   `<Section>` provides `SectionContext`, and `<Frame>` reads it to fill in
   the speaker chip and the `universe26/<topic.id>/` path. Slides inside a
   section should use a plain `<Frame>` and **not** pass `speaker` or `section`.
3. **Last slide returns to the agenda.** `<Section>` appends `<Agenda />`
   after your slides. Don't add your own.

To fill a section, put slides inside it in `Talk.tsx`:

```tsx
<Section topic={TOPICS.softwareFactories}>
  <Slide>
    <Frame>…</Frame>
  </Slide>
  <Slide>
    <Frame>…</Frame>
  </Slide>
</Section>
```

### The agenda

- One component, `<Agenda />`, reused after Hello and at the end of every
  section. Change it once and it changes everywhere.
- Each cell is an `<a href="#/<topic.id>">` link to that section's title slide.
- **No speaker names on the agenda.** Not in cells, not in the top chrome.
  `<Agenda />` sits outside `SectionContext`, so it never shows a chip.
- No numbers or labels in the cells, only titles.
- Its speaker notes are the presenters' script for explaining the format.

### Adding, renaming or reordering a section

- Titles, speakers and ids live in `src/talk/topics.ts`. The agenda and the
  title slide both read from it.
- Changing an `id` changes the URL (`#/<id>`).
- A new topic needs an entry in `topics.ts`, a cell on the agenda (automatic
  for `TOPICS`), and a `<Section>` in `Talk.tsx`.

### Speaker notes

Use `<aside className="notes">` inside the `<Slide>` for anything longer than
a line (lists, multiple paragraphs). The `notes` prop only takes plain text.
A section's title slide takes its notes from `<Section notes={…}>` (a string
or JSX).
Press `S` in the browser to open the speaker view.

## The boneyard: style reference

Everything after the BONEYARD slide is a library of sample layouts built in
the deck's style. It is not part of the talk. It's the visual reference for
building section slides. Open it at `#/boneyard` and arrow forward, or press
`O` for the overview.

| Layout | Component | File | Use it for |
| --- | --- | --- | --- |
| Agenda list | `AgendaSlide` | `slides/Openers.tsx` | numbered hairline list with click-to-reveal rows |
| Section divider | `SectionSlide` | `slides/Openers.tsx` | giant Orbitron number + HUD title |
| Statement | `StatementSlide` | `slides/Content.tsx` | one big idea, highlighted words |
| Title + bullets | `BulletsSlide` | `slides/Content.tsx` | headline left, list right, bullets reveal one by one |
| Two-column compare | `CompareSlide` | `slides/Content.tsx` | before/after, ✓/× lists |
| Code | `CodeSlide` | `slides/Content.tsx` | explanation + code window with stepped line highlights |
| Diagram | `DiagramSlide` | `slides/Viz.tsx` → `viz/FlowDiagram.tsx` | animated d3 node/flow diagram |
| Chart | `ChartSlide` | `slides/Viz.tsx` → `viz/LineChart.tsx` | animated d3 line chart, hover tooltip |
| Stats | `StatsSlide` | `slides/Content.tsx` | four KPI cells |
| Quote | `QuoteSlide` | `slides/Content.tsx` | quote on the light “paper” surface |
| Media + caption | `MediaSlide` | `slides/Content.tsx` | image cell + text cell |
| Demo handoff | `DemoSlide` | `slides/Content.tsx` | LIVE_DEMO glitch screen |
| Closer | `ThanksSlide` | `slides/Content.tsx` | lime Until surface, links |

The title and hello slides (`slides/Openers.tsx`) are also good references
for the logos, the ticker and speaker photos.

How to use it:

- **Copy, don't import.** Boneyard components hard-code their content and
  pass `speaker`/`section` to `<Frame>` themselves. To use one, copy its
  JSX into a `<Section>` in `Talk.tsx` (or a new component under
  `src/talk/`), then:
  - delete the `speaker` and `section` props from `<Frame>`, since the section
    supplies them (see the section rules above);
  - replace all copy and data. Stats, chart data, the quote and the code
    sample are placeholders.
- **Use a close match; otherwise follow the author.** If a boneyard layout is
  a close match for the slide you need, use it and reuse its classes
  (`.cells`, `.kicker`, `.hud`, `.comment`, `.list`, `.stat`, `.quote`,
  `.code-window`, …). If the author describes a different style or slide,
  build what they describe, but keep it on theme: same tokens, fonts, type
  scale, surfaces and chrome.
- **Leave the boneyard intact.** Don't edit or delete samples while building
  the talk; they're the reference. If you make a genuinely new reusable
  layout, add a sample of it to the boneyard too.
- Never link to or present boneyard slides during the talk.

## Style rules

The theme is a mash-up of Until (near-black, lime `#d9e61e`, starfield on the title slide only),
Swamp Club (neon cyan/pink/green, Orbitron + Chakra Petch, glitch titles,
`// comment //` subtitles) and GitHub Universe (Mona Sans, mono labels with a
green ■, hairline cell grid, light “paper” surface).

- Use tokens from `src/theme/tokens.css`; don't hard-code colors.
- Speaker colors: Adam = Swamp cyan, Dylan = Until lime.
- **Type is sized for a large conference room.** On the 1920×1080 canvas:
  running text ≥ 36px, secondary text ≥ 30px, short uppercase/mono labels
  ≥ 26px. Only the chrome (path bar, footer, slide number) goes down to 20px.
  Use the `--t-*` scale; never go below `--t-label` for audience-facing text.
- Chart/data colors come from `--data-*` / `src/viz/palette.ts`. They're
  validated for color-blind separation on the dark surface. Use them in
  order and always direct-label series. Never use a second y-axis.
- d3 figures replay their entrance with `useSlideActive()`. Pass them stable
  data (module constants or `useMemo`).
- SVG presentation attributes can't use CSS `var()`. Set fonts with
  `.style("font-family", "var(--font-mono)")`, not `.attr(...)`.
- Fonts are bundled via `@fontsource`, so the deck works offline. Keep it
  that way: no CDN fonts or scripts.

## Working on this repo

- Use copy the presenters give you exactly as written. Fixing spelling and making capitalization consistent is fine; don't change the words.
- Check your changes in the browser, not just the build. A dev server is
  usually already running; reuse it instead of starting another, and don't
  kill it.
- Reveal ignores a fragment index in the URL hash. To check click-to-reveal
  steps, press the arrow keys, don't link to `#/n/0/k`.
