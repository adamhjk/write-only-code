// Data-mark colors. Mirrors --data-* in tokens.css; validated against the
// --ink-1 surface with the dataviz skill's validator (all checks pass, worst
// adjacent CVD ΔE 6.7 → always direct-label series).
export const DATA = {
  lime: "#979c00",
  cyan: "#00a4c0",
  pink: "#df3c8c",
  green: "#2e9e52",
  purple: "#926fe3",
  orange: "#da720d",
} as const;

/** Fixed categorical order. Never cycle; fold extras into "Other". */
export const CATEGORICAL = [DATA.lime, DATA.cyan, DATA.pink, DATA.green, DATA.purple, DATA.orange];

// Brand accents for diagrams (UI color, not data encoding).
export const BRAND = {
  lime: "#d9e61e",
  cyan: "#22d3ee",
  pink: "#ec4899",
  green: "#3ee08f",
  ghGreen: "#1fd14a",
  purple: "#b48cff",
  fg: "#f2f5f3",
  fg2: "rgb(242 245 243 / 0.68)",
  fg3: "rgb(242 245 243 / 0.44)",
  line: "rgb(255 255 255 / 0.1)",
  lineStrong: "rgb(255 255 255 / 0.22)",
  ink1: "#0b0c0e",
  ink2: "#13161a",
} as const;
