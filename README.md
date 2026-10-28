# Universe ’26 deck — Swamp Club × Until

Adam Jacob (Swamp Club) and Dylan Ratcliffe (Until) at GitHub Universe ’26.
Bun + Vite + React + [`@revealjs/react`](https://revealjs.com/react) + d3.

```sh
mise install          # bun is pinned in mise.toml
bun install
bun run dev           # http://localhost:5173
bun run build         # typecheck + static build in dist/ (fonts bundled, works offline)
```

Presenting: `S` opens speaker notes, `O` overview, `F` fullscreen. Slides are 1920×1080.

## Style

The theme mixes three sources (`src/theme/tokens.css` has the tokens):

| From | What we took |
| --- | --- |
| **Until** | near-black ink, lime `#d9e61e`, starfield on the title slide, lime glow buttons, the lime closing slide |
| **Swamp Club** | neon cyan/pink/green, Orbitron numerals + Chakra Petch HUD labels, RGB-split glitch titles, `// comment //` subtitles, corner brackets |
| **GitHub Universe** | Mona Sans display type (expanded caps), mono labels with a blinking green ■, hairline cell grid, the light "paper" surface, colored ticker strip |

Speakers keep their own colour: Adam = Swamp cyan, Dylan = Until lime. Every slide's
top-right chip says who is talking.

Type is sized for a large room (1920×1080 canvas, 36px ≈ 24pt). Floors:
running text 36px, secondary text 30px, short uppercase/mono labels 26px.
Only the chrome (path bar, footer, slide number) goes smaller, at 20px. The
scale lives in `tokens.css` (`--t-*`); don't hard-code sizes below it.

Data marks use `--data-*` / `src/viz/palette.ts`, the brand hues moved into a
range that passes colour-blind checks on the dark surface. Keep series in that
order and always label them directly.

## Writing the talk

The talk lives in `src/talk/`:

- `topics.ts` lists the sections: two intros and eight topics, each with an `id`, a title and a speaker.
- `Agenda.tsx` is the agenda slide. Every cell links to `#/<id>`. No speakers on it.
- `Section.tsx` renders a section's title slide (title + speaker, anchored at `#/<id>`),
  then your slides, then the `<Agenda />` again.
- `Talk.tsx` is the running order. Fill a section by putting slides inside it:

```tsx
<Section topic={TOPICS.softwareFactories}>
  <Slide>…</Slide>
</Section>
```

## Building slides

Each slide is `<Slide><Frame …>…</Frame></Slide>`. `Frame` provides the chrome:

- `section` — path in the top bar (`universe26/<section>/`)
- `speaker` — `"adam" | "dylan" | "both"`
- `variant` — `"ink"` (default), `"paper"` (Universe light), `"lime"` (Until)
- `flush` — no padding, for `.cells` layouts; `center`, `grid`, `bare`

The sample layouts aren't in the talk deck. View them on their own at
`/?boneyard` and copy one into the talk, then edit it. They live in
`src/slides/`:

| Layout | Component |
| --- | --- |
| Title | `TitleSlide` |
| Speakers | `SpeakersSlide` |
| Agenda | `AgendaSlide` |
| Section divider | `SectionSlide` |
| Statement | `StatementSlide` |
| Title + bullets (fragments) | `BulletsSlide` |
| Two-column compare | `CompareSlide` |
| Code with stepped highlights | `CodeSlide` |
| d3 diagram | `DiagramSlide` → `viz/FlowDiagram.tsx` |
| d3 chart | `ChartSlide` → `viz/LineChart.tsx` |
| KPI stats | `StatsSlide` |
| Quote (paper) | `QuoteSlide` |
| Media + caption | `MediaSlide` |
| Live demo handoff | `DemoSlide` |
| Thanks / Q&A (lime) | `ThanksSlide` |

d3 figures use `useSlideActive()` so their enter animation replays every time
the slide is shown. Pass them stable data (module constants or `useMemo`).
