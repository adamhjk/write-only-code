// The untl dashboard story from until.dev, adapted from overmindtech/until-landing
// (src/lib/waitlist/feature-story.ts). The row text is the site's; what changed
// is how it plays. The site redraws from scroll progress; here the story moves
// in discrete steps (STORY), and each step returns keyed lines so the component
// can glide rows to their new places, glow the rows that changed and add a short
// "← what happened" trail, the way the real CLI does (until/cli/dashboard_motion.go).
// The rows are built as HTML strings from constants only (no input reaches them).

// where each beat falls in the site's 0–1 story; frame(p) shows everything at or before p
const T = {
  start: 0.06,
  written: 0.28,
  bugRepro: 0.32,
  sent: 0.38,
  yes: 0.52,
  c1: 0.52,
  c2: 0.61,
  c3: 0.69,
  check: 0.78,
  finds: 0.84,
  bugPlan: 2, // never: the bug stays put so nothing changes without being explained
  ask: 0.91,
} as const;

export type Tone = "brand" | "ok" | "warn" | "dec";

/** One step of the story: where it is, which rows changed, and what the trail says. */
export type Step = {
  p: number;
  /** Rows that changed on this step; they glow as they arrive. */
  lit: string[];
  /** A trail after one row, saying what just happened. */
  note?: { row: string; text: string; tone: Tone };
  /** How long to hold this step before the next, in ms. */
  dwell: number;
};

export const STORY: Step[] = [
  { p: 0, lit: [], dwell: 2200 },
  { p: T.start, lit: ["feat", "plan"], note: { row: "plan", text: "you started the plan", tone: "brand" }, dwell: 2600 },
  { p: T.written, lit: ["wait", "review", "done"], note: { row: "feat", text: "✓ plan written", tone: "ok" }, dwell: 2800 },
  { p: T.bugRepro, lit: ["bug"], note: { row: "bug", text: "codex picked it up", tone: "brand" }, dwell: 2200 },
  { p: T.sent, lit: ["review"], note: { row: "review", text: "sent to Dylan", tone: "brand" }, dwell: 2600 },
  { p: T.c1, lit: ["feat", "j1"], note: { row: "feat", text: "✓ Dylan said yes", tone: "ok" }, dwell: 2800 },
  { p: T.c2, lit: ["j2"], note: { row: "j2", text: "codex claimed it", tone: "brand" }, dwell: 2000 },
  { p: T.c3, lit: ["j3"], note: { row: "j3", text: "cursor claimed it", tone: "brand" }, dwell: 2400 },
  { p: T.check, lit: ["chk", "done"], note: { row: "done", text: "✓ 3 jobs done", tone: "ok" }, dwell: 2600 },
  { p: T.finds, lit: ["f3"], note: { row: "f3", text: "not in the plan", tone: "warn" }, dwell: 2400 },
  { p: T.ask, lit: ["wait", "chk"], note: { row: "wait", text: "your call", tone: "dec" }, dwell: 7000 },
];

/** The four steps from the site, and the stretch of the story each covers. */
export const CHAPTERS: { title: string; from: number; to: number }[] = [
  { title: "You write the plan.", from: 0, to: 0.25 },
  { title: "Someone signs it off.", from: 0.25, to: 0.5 },
  { title: "Agents take the jobs.", from: 0.5, to: 0.75 },
  { title: "Check the difference.", from: 0.75, to: 1 },
];

export type Line = { key: string; html: string; cls?: string };

const f = (s: string): string => `<span class="f">${s}</span>`;
const separator = f("  ·  ");
const ag = (s: string): string => `<span class="ag">${s}</span>`;
const you = '<span class="you">you</span>';
const mate = (s: string): string => `<span class="pp">${s}</span>`;
const W = '<span class="br">◐</span>';
const WORK = '<span class="br">◧</span>';
const DONE = '<span class="ok">✓</span>';
const heading = (key: string, n: string): Line => ({ key, html: `<span class="h">${n}</span>` });
const blank = (key: string): Line => ({ key, html: "" });

const JOBS: [key: string, title: string, who: string, sec: string, claim: number][] = [
  ["j1", "Add the export endpoint", "claude code", "§1", T.c1],
  ["j2", "Stream rows into the CSV writer", "codex", "§2", T.c2],
  ["j3", "Add --csv to untl ticket list", "cursor", "§3", T.c3],
];

/** The footer never changes, so nothing ticks while the story plays. */
export const FOOTER = `<span><span class="ok">●</span> local daemon <span class="ok">ready</span>  ${f("│")}  <b>origin</b> <span class="ok">✓ synchronized</span></span>${f("↑↓ select · e everyone · q quit")}`;

/** The dashboard at story progress p, as keyed lines (header first). */
export function frame(p: number): Line[] {
  const isPast = (at: number): boolean => p >= at;

  const working =
    (isPast(T.check) ? 0 : JOBS.filter((job) => isPast(job[4])).length) +
    (isPast(T.check) && !isPast(T.ask) ? 1 : 0) +
    (isPast(T.bugRepro) ? 1 : 0);
  const done = (isPast(T.written) ? 1 : 0) + (isPast(T.yes) ? 1 : 0) + (isPast(T.check) ? 3 : 0);
  const waiting = (isPast(T.written) && !isPast(T.sent) ? 1 : 0) + (isPast(T.ask) ? 1 : 0);

  const counts = [`${waiting} waiting on you`];
  if (isPast(T.start)) counts.push("1 in progress");
  if (working) counts.push(`${working} working`);
  if (!isPast(T.bugRepro)) counts.push("1 agent ready");
  const hd: Line = {
    key: "hd",
    cls: " hd",
    html: `<span><b>until</b>${separator}${counts.join(separator)}</span>${done ? `<span class="ok">✓ ${done} done</span>` : "<span></span>"}`,
  };

  let wait: [string, string];
  if (isPast(T.ask))
    wait = [
      `<span class="dec">?</span> Keep the extra --delimiter flag?  <span class="dec">decision</span>  ${f("FEAT-12.4")}`,
      `    ${f("the plan didn't ask for it")}`,
    ];
  else if (isPast(T.written) && !isPast(T.sent))
    wait = [
      `${f("◷")} Review the plan  <span class="br">Send this to a reviewer</span>  ${f("FEAT-12.2")}`,
      `    ${f("you wrote it, so a teammate signs it off")}`,
    ];
  else wait = [`  ${f("Nothing is waiting on you right now.")}`, ""];

  const phase = isPast(T.c1) ? "Implementing" : isPast(T.start) ? "Planning" : "";
  const kids: [key: string, html: string, cls?: string, nested?: boolean][] = [];
  if (isPast(T.c1)) {
    if (!isPast(T.check))
      for (const [key, title, who, sec, c] of JOBS) {
        const tail = isPast(c) ? ag(who) : f("agent ready");
        kids.push([key, `${isPast(c) ? WORK : "□"} ${title}  ${tail}  ${f("← plan " + sec)}`]);
      }
    if (isPast(T.check)) {
      kids.push([
        "chk",
        `${isPast(T.ask) ? '<span class="dec">▣</span>' : WORK} Check the difference  ${ag("claude code")}${isPast(T.ask) ? '  <span class="br">↑ waiting on you</span>' : ""}`,
      ]);
      if (isPast(T.finds))
        kids.push(["f3", `${f("│   └── ")}<span class="warn">△</span> ${f("beyond the plan")}  Adds a --delimiter flag`, "", true]);
    } else {
      kids.push(["chk", `□ Check the difference  ${ag("agent")}  ${f("starts when the jobs finish")}`, " dim"]);
    }
  } else {
    if (!isPast(T.written)) kids.push(["plan", `${isPast(T.start) ? W : "○"} Write the plan  ${you}  ${f("FEAT-12.1")}`]);
    if (!isPast(T.yes)) {
      const st = isPast(T.sent)
        ? `<span class="pp">waits on Dylan</span>`
        : isPast(T.written)
          ? '<span class="br">ready to send</span>'
          : f("FEAT-12.2");
      kids.push(["review", `${f("◷")} Review the plan  ${isPast(T.sent) ? "" : mate("a teammate") + "  "}${st}`]);
    }
    kids.push(["jobs", `□ 2 jobs for ${ag("agents")}  ${f(isPast(T.written) ? "wait on the review" : "wait on your plan")}`, " dim"]);
  }
  if (done)
    kids.push([
      "done",
      `${DONE} <span class="ok">${done} done</span>  ${f(isPast(T.check) ? "" : isPast(T.yes) ? "plan written · yes from dylan" : "plan written")}`,
    ]);
  const lastTop = kids.map((k) => !k[3]).lastIndexOf(true);
  const tree: Line[] = kids.map(([key, html, cls = "", nested], index) => ({
    key,
    cls,
    html: nested ? html : f(index === lastTop ? "└── " : "├── ") + html,
  }));
  const feat: Line = {
    key: "feat",
    html: `${isPast(T.start) ? W : "○"} Export tickets as CSV  <span class="lb">[feat]</span>${phase ? `  <span class="br">${phase}</span>` : ""}  ${f("FEAT-12")}`,
  };

  const bugState = isPast(T.bugPlan)
    ? `  <span class="br">Planning</span>  ${ag("codex")}  ${f("BUG-14")}  <span class="ok">✓ 1 done</span>`
    : isPast(T.bugRepro)
      ? `  <span class="br">Reproducing</span>  ${ag("codex")}  ${f("BUG-14")}`
      : `  ${f("BUG-14")}`;
  const bug: Line = {
    key: "bug",
    html: `${isPast(T.bugRepro) ? W : "○"} Dashboard flickers when the daemon restarts  <span class="bad">[bug]</span>${bugState}`,
  };

  return [
    hd,
    blank("b1"),
    heading("h-wait", "WAITING ON YOU"),
    { key: "wait", html: wait[0] },
    { key: "wait2", html: wait[1] },
    blank("b2"),
    heading("h-prog", "IN PROGRESS"),
    feat,
    ...tree,
    ...(isPast(T.bugRepro) ? [bug] : [blank("b3"), heading("h-ready", "AGENT READY"), bug]),
  ];
}

/** Lines the board must have room for, across the whole story. */
export const MAX_LINES = Math.max(...STORY.map((s) => frame(s.p).length));
