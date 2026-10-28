// Generated from the Team Attention Lab simulation
// (https://claude.ai/artifact/VJkhBpoq4dwgDfBjP4RizG): 3 people, asynchronous
// plan review, simulated day 3 (09:00–18:00). Minutes are from 09:00.
// Stats are per person per day, averaged over simulated days 2–5.
// This is model output, not measured team data.

export type Activity = "flow" | "ramp" | "review" | "agent" | "off";
export type Segment = readonly [start: number, end: number, kind: Activity];
/** plan = being written, person = a human working on it, agent = agent working, wait = waiting on a person. */
export type TicketState = "plan" | "person" | "agent" | "wait";
export type Ticket = { id: string; owner: number; segs: (readonly [number, number, TicketState])[]; shipped: number | null };
export type Strategy = {
  name: string;
  desc: string;
  /** false = work piles up every day; the strategy can't keep up. */
  keepsUp: boolean;
  lanes: Segment[][];
  tickets: Ticket[];
  /** Per person: minutes they're on goalie duty. Empty when the strategy has no goalie. */
  goalie: (readonly [number, number])[][];
  stats: {
    deepFocusMin: number;
    switches: number;
    shippedPerPerson: number;
    leadMin: number;
    overCapPct: number;
  };
};

export const interrupt: Strategy = {
  name: "Interrupt-driven",
  desc: "Everyone handles everything the moment it arrives.",
  keepsUp: true,
  stats: { deepFocusMin: 26, switches: 15.3, shippedPerPerson: 4.33, leadMin: 193, overCapPct: 6 },
  goalie: [],
  lanes: [
    [[0, 8, "ramp"], [8, 12, "agent"], [12, 14, "ramp"], [14, 49, "review"], [49, 51, "ramp"], [51, 61, "review"], [61, 64, "ramp"], [64, 71, "flow"], [71, 81, "review"], [81, 92, "ramp"], [92, 94, "flow"], [94, 109, "review"], [109, 113, "agent"], [113, 117, "ramp"], [117, 152, "flow"], [152, 156, "agent"], [156, 160, "ramp"], [160, 161, "flow"], [161, 171, "review"], [171, 179, "ramp"], [179, 180, "flow"], [180, 240, "off"], [240, 255, "review"], [255, 270, "ramp"], [270, 288, "flow"], [288, 292, "agent"], [292, 295, "ramp"], [295, 331, "flow"], [331, 335, "agent"], [335, 337, "ramp"], [337, 339, "flow"], [339, 349, "review"], [349, 352, "ramp"], [352, 363, "flow"], [363, 388, "review"], [388, 390, "ramp"], [390, 394, "agent"], [394, 404, "ramp"], [404, 433, "flow"], [433, 437, "agent"], [437, 441, "ramp"], [441, 449, "flow"], [449, 459, "review"], [459, 468, "ramp"], [468, 471, "review"], [471, 473, "ramp"], [473, 495, "flow"], [495, 505, "review"], [505, 509, "ramp"], [509, 513, "agent"], [513, 528, "review"], [528, 540, "ramp"]],
    [[0, 4, "ramp"], [4, 14, "review"], [14, 23, "ramp"], [23, 26, "review"], [26, 28, "ramp"], [28, 48, "flow"], [48, 51, "review"], [51, 53, "ramp"], [53, 60, "flow"], [60, 63, "review"], [63, 65, "ramp"], [65, 66, "flow"], [66, 81, "review"], [81, 85, "agent"], [85, 89, "ramp"], [89, 124, "flow"], [124, 128, "agent"], [128, 138, "review"], [138, 141, "ramp"], [141, 179, "flow"], [179, 180, "agent"], [180, 240, "off"], [240, 243, "agent"], [243, 258, "review"], [258, 273, "ramp"], [273, 282, "flow"], [282, 286, "agent"], [286, 288, "ramp"], [288, 329, "flow"], [329, 339, "review"], [339, 343, "agent"], [343, 348, "ramp"], [348, 351, "review"], [351, 366, "ramp"], [366, 382, "flow"], [382, 386, "agent"], [386, 388, "ramp"], [388, 425, "flow"], [425, 429, "agent"], [429, 433, "ramp"], [433, 458, "flow"], [458, 468, "review"], [468, 472, "agent"], [472, 475, "ramp"], [475, 491, "flow"], [491, 506, "review"], [506, 510, "ramp"], [510, 514, "agent"], [514, 517, "ramp"], [517, 540, "flow"]],
    [[0, 15, "ramp"], [15, 26, "flow"], [26, 36, "review"], [36, 40, "agent"], [40, 45, "ramp"], [45, 60, "review"], [60, 67, "ramp"], [67, 117, "flow"], [117, 127, "review"], [127, 131, "agent"], [131, 137, "ramp"], [137, 140, "review"], [140, 154, "ramp"], [154, 170, "flow"], [170, 174, "agent"], [174, 176, "ramp"], [176, 179, "flow"], [179, 180, "review"], [180, 240, "off"], [240, 264, "review"], [264, 268, "agent"], [268, 281, "ramp"], [281, 291, "review"], [291, 299, "ramp"], [299, 307, "flow"], [307, 311, "agent"], [311, 313, "ramp"], [313, 340, "flow"], [340, 355, "review"], [355, 364, "ramp"], [364, 376, "flow"], [376, 386, "review"], [386, 389, "ramp"], [389, 404, "review"], [404, 412, "ramp"], [412, 416, "agent"], [416, 418, "ramp"], [418, 440, "flow"], [440, 455, "review"], [455, 459, "agent"], [459, 460, "ramp"], [460, 470, "review"], [470, 478, "ramp"], [478, 526, "flow"], [526, 540, "review"]],
  ],
  tickets: [
    { id: "C8", owner: 2, shipped: 39, segs: [[0, 14, "agent"], [14, 24, "wait"], [24, 39, "person"]] },
    { id: "B8", owner: 1, shipped: 60, segs: [[0, 45, "agent"], [45, 60, "person"]] },
    { id: "A8", owner: 0, shipped: 81, segs: [[0, 8, "agent"], [8, 12, "person"], [12, 66, "agent"], [66, 81, "person"]] },
    { id: "C9", owner: 2, shipped: 109, segs: [[0, 29, "agent"], [29, 36, "wait"], [36, 40, "person"], [40, 94, "agent"], [94, 109, "person"]] },
    { id: "B9", owner: 1, shipped: 264, segs: [[0, 26, "plan"], [26, 36, "person"], [36, 75, "agent"], [75, 81, "wait"], [81, 85, "person"], [85, 124, "agent"], [124, 128, "person"], [128, 182, "agent"], [182, 249, "wait"], [249, 264, "person"]] },
    { id: "A9", owner: 0, shipped: 258, segs: [[0, 4, "plan"], [4, 24, "person"], [23, 26, "person"], [26, 39, "wait"], [39, 49, "person"], [48, 61, "person"], [60, 63, "person"], [63, 102, "agent"], [102, 109, "wait"], [109, 113, "person"], [113, 152, "agent"], [152, 156, "person"], [156, 210, "agent"], [210, 243, "wait"], [243, 258, "person"]] },
    { id: "C10", owner: 2, shipped: 255, segs: [[0, 70, "plan"], [70, 71, "wait"], [71, 81, "person"], [81, 120, "agent"], [120, 127, "wait"], [127, 131, "person"], [131, 170, "agent"], [170, 174, "person"], [174, 228, "agent"], [228, 240, "wait"], [240, 255, "person"]] },
    { id: "A10", owner: 0, shipped: 404, segs: [[4, 179, "plan"], [179, 249, "person"], [249, 288, "agent"], [288, 292, "person"], [292, 331, "agent"], [331, 335, "person"], [335, 389, "agent"], [389, 404, "person"]] },
    { id: "B10", owner: 1, shipped: 355, segs: [[26, 117, "plan"], [117, 127, "person"], [127, 128, "wait"], [128, 138, "person"], [137, 140, "person"], [140, 179, "agent"], [179, 243, "person"], [243, 282, "agent"], [282, 286, "person"], [286, 340, "agent"], [340, 355, "person"]] },
    { id: "C11", owner: 2, shipped: 388, segs: [[70, 160, "plan"], [160, 161, "wait"], [161, 171, "person"], [171, 210, "agent"], [210, 264, "wait"], [264, 268, "person"], [268, 307, "agent"], [307, 311, "person"], [311, 365, "agent"], [365, 373, "wait"], [373, 388, "person"]] },
    { id: "B11", owner: 1, shipped: 455, segs: [[117, 281, "plan"], [281, 291, "person"], [291, 330, "agent"], [330, 339, "wait"], [339, 343, "person"], [343, 382, "agent"], [382, 386, "person"], [386, 440, "agent"], [440, 455, "person"]] },
    { id: "C12", owner: 2, shipped: 528, segs: [[160, 362, "plan"], [362, 363, "wait"], [363, 373, "person"], [373, 412, "agent"], [412, 416, "person"], [416, 455, "agent"], [455, 459, "person"], [459, 513, "agent"], [513, 528, "person"]] },
    { id: "A11", owner: 0, shipped: 506, segs: [[179, 329, "plan"], [329, 349, "person"], [348, 351, "person"], [351, 390, "agent"], [390, 394, "person"], [394, 433, "agent"], [433, 437, "person"], [437, 491, "agent"], [491, 506, "person"]] },
    { id: "B12", owner: 1, shipped: null, segs: [[281, 376, "plan"], [376, 386, "person"], [386, 425, "agent"], [425, 429, "person"], [429, 468, "agent"], [468, 472, "person"], [472, 526, "agent"], [526, 540, "person"]] },
    { id: "A12", owner: 0, shipped: null, segs: [[329, 460, "plan"], [460, 470, "person"], [470, 509, "agent"], [509, 513, "person"], [513, 540, "agent"]] },
    { id: "C13", owner: 2, shipped: null, segs: [[362, 494, "plan"], [494, 495, "wait"], [495, 505, "person"], [505, 540, "agent"]] },
    { id: "B13", owner: 1, shipped: null, segs: [[376, 448, "plan"], [448, 449, "wait"], [449, 459, "person"], [458, 471, "person"], [471, 510, "agent"], [510, 514, "person"], [514, 540, "agent"]] },
    { id: "B14", owner: 1, shipped: null, segs: [[448, 540, "plan"]] },
    { id: "A13", owner: 0, shipped: null, segs: [[460, 540, "plan"]] },
    { id: "C14", owner: 2, shipped: null, segs: [[494, 540, "plan"]] },
  ],
};

export const batchAlone: Strategy = {
  name: "Everyone batches alone",
  desc: "Private 20-minute windows at different times. Plan calls happen in the reviewer’s window, pulling the author in.",
  keepsUp: false,
  stats: { deepFocusMin: 277, switches: 4, shippedPerPerson: 1.92, leadMin: 1158, overCapPct: 100 },
  goalie: [],
  lanes: [
    [[0, 15, "ramp"], [15, 100, "flow"], [100, 110, "review"], [110, 114, "agent"], [114, 124, "review"], [124, 136, "ramp"], [136, 180, "flow"], [180, 240, "off"], [240, 255, "ramp"], [255, 280, "flow"], [280, 284, "agent"], [284, 302, "review"], [302, 311, "ramp"], [311, 400, "flow"], [400, 425, "review"], [425, 429, "ramp"], [429, 505, "flow"], [505, 509, "agent"], [509, 529, "review"], [529, 540, "ramp"]],
    [[0, 15, "ramp"], [15, 130, "flow"], [130, 145, "review"], [145, 149, "agent"], [149, 159, "review"], [159, 175, "ramp"], [175, 180, "flow"], [180, 240, "off"], [240, 255, "ramp"], [255, 310, "flow"], [310, 314, "agent"], [314, 329, "review"], [329, 333, "agent"], [333, 343, "ramp"], [343, 430, "flow"], [430, 434, "agent"], [434, 454, "review"], [454, 462, "ramp"], [462, 515, "flow"], [515, 525, "review"], [525, 533, "agent"], [533, 540, "review"]],
    [[0, 5, "review"], [5, 24, "ramp"], [24, 160, "flow"], [160, 164, "agent"], [164, 174, "review"], [174, 178, "agent"], [178, 180, "review"], [180, 240, "off"], [240, 241, "review"], [241, 256, "ramp"], [256, 340, "flow"], [340, 350, "review"], [350, 358, "agent"], [358, 373, "review"], [373, 393, "ramp"], [393, 460, "flow"], [460, 480, "review"], [480, 500, "ramp"], [500, 518, "flow"], [518, 530, "agent"], [530, 540, "review"]],
  ],
  tickets: [
    { id: "B4", owner: 1, shipped: 299, segs: [[0, 284, "wait"], [284, 299, "person"]] },
    { id: "C4", owner: 2, shipped: 415, segs: [[0, 400, "wait"], [400, 415, "person"]] },
    { id: "A4", owner: 0, shipped: 145, segs: [[0, 130, "wait"], [130, 145, "person"]] },
    { id: "C5", owner: 2, shipped: 329, segs: [[0, 314, "wait"], [314, 329, "person"]] },
    { id: "B5", owner: 1, shipped: null, segs: [[0, 30, "agent"], [30, 430, "wait"], [430, 434, "person"], [434, 473, "agent"], [473, 540, "wait"]] },
    { id: "A5", owner: 0, shipped: 373, segs: [[0, 37, "agent"], [37, 358, "wait"], [358, 373, "person"]] },
    { id: "C6", owner: 2, shipped: null, segs: [[0, 34, "agent"], [34, 354, "wait"], [354, 358, "person"], [358, 412, "agent"], [412, 540, "wait"]] },
    { id: "B6", owner: 1, shipped: null, segs: [[0, 310, "wait"], [310, 314, "person"], [314, 368, "agent"], [368, 540, "wait"]] },
    { id: "A6", owner: 0, shipped: null, segs: [[0, 8, "agent"], [8, 505, "wait"], [505, 509, "person"], [509, 540, "agent"]] },
    { id: "C7", owner: 2, shipped: null, segs: [[0, 299, "wait"], [299, 302, "person"], [302, 341, "agent"], [341, 540, "wait"]] },
    { id: "B7", owner: 1, shipped: null, segs: [[0, 178, "wait"], [178, 241, "person"], [241, 533, "wait"], [533, 540, "person"]] },
    { id: "A7", owner: 0, shipped: null, segs: [[0, 110, "wait"], [110, 114, "person"], [114, 153, "agent"], [153, 540, "wait"]] },
    { id: "C8", owner: 2, shipped: null, segs: [[0, 160, "wait"], [160, 164, "person"], [164, 203, "agent"], [203, 522, "wait"], [522, 526, "person"], [526, 540, "agent"]] },
    { id: "B8", owner: 1, shipped: null, segs: [[0, 145, "wait"], [145, 149, "person"], [149, 188, "agent"], [188, 525, "wait"], [525, 529, "person"], [529, 540, "agent"]] },
    { id: "C9", owner: 2, shipped: null, segs: [[0, 174, "wait"], [174, 178, "person"], [178, 217, "agent"], [217, 526, "wait"], [526, 530, "person"], [530, 540, "agent"]] },
    { id: "A8", owner: 0, shipped: null, segs: [[0, 280, "wait"], [280, 284, "person"], [284, 323, "agent"], [323, 540, "wait"]] },
    { id: "B9", owner: 1, shipped: null, segs: [[0, 18, "agent"], [18, 329, "wait"], [329, 333, "person"], [333, 372, "agent"], [372, 540, "wait"]] },
    { id: "A9", owner: 0, shipped: null, segs: [[0, 5, "person"], [5, 415, "wait"], [415, 425, "person"], [425, 540, "wait"]] },
    { id: "C10", owner: 2, shipped: null, segs: [[0, 32, "agent"], [32, 350, "wait"], [350, 354, "person"], [354, 393, "agent"], [393, 540, "wait"]] },
    { id: "B10", owner: 1, shipped: null, segs: [[0, 100, "wait"], [100, 110, "person"], [110, 515, "wait"], [515, 525, "person"], [525, 540, "wait"]] },
    { id: "A10", owner: 0, shipped: null, segs: [[0, 149, "wait"], [149, 159, "person"], [159, 198, "agent"], [198, 540, "wait"]] },
    { id: "C11", owner: 2, shipped: null, segs: [[0, 114, "wait"], [114, 124, "person"], [124, 163, "agent"], [163, 518, "wait"], [518, 522, "person"], [522, 540, "agent"]] },
    { id: "B11", owner: 1, shipped: null, segs: [[0, 164, "wait"], [164, 174, "person"], [174, 213, "agent"], [213, 529, "wait"], [529, 533, "person"], [533, 540, "agent"]] },
    { id: "C12", owner: 2, shipped: null, segs: [[0, 31, "plan"], [31, 434, "wait"], [434, 444, "person"], [444, 483, "agent"], [483, 540, "wait"]] },
    { id: "A11", owner: 0, shipped: null, segs: [[0, 30, "plan"], [30, 340, "wait"], [340, 350, "person"], [350, 540, "wait"]] },
    { id: "B12", owner: 1, shipped: null, segs: [[0, 50, "plan"], [50, 460, "wait"], [460, 470, "person"], [470, 509, "agent"], [509, 540, "wait"]] },
    { id: "A12", owner: 0, shipped: null, segs: [[30, 90, "plan"], [90, 444, "wait"], [444, 454, "person"], [454, 493, "agent"], [493, 540, "wait"]] },
    { id: "C13", owner: 2, shipped: null, segs: [[31, 91, "plan"], [91, 509, "wait"], [509, 519, "person"], [519, 540, "agent"]] },
    { id: "B13", owner: 1, shipped: null, segs: [[50, 110, "plan"], [110, 470, "wait"], [470, 480, "person"], [480, 540, "wait"]] },
    { id: "A13", owner: 0, shipped: null, segs: [[90, 245, "plan"], [245, 530, "wait"], [530, 540, "person"]] },
    { id: "C14", owner: 2, shipped: null, segs: [[91, 151, "plan"], [151, 519, "wait"], [519, 529, "person"], [529, 540, "agent"]] },
    { id: "B14", owner: 1, shipped: null, segs: [[110, 278, "plan"], [278, 540, "wait"]] },
    { id: "C15", owner: 2, shipped: null, segs: [[151, 301, "plan"], [301, 540, "wait"]] },
    { id: "A14", owner: 0, shipped: null, segs: [[245, 338, "plan"], [338, 540, "wait"]] },
    { id: "B15", owner: 1, shipped: null, segs: [[278, 368, "plan"], [368, 540, "wait"]] },
    { id: "C16", owner: 2, shipped: null, segs: [[301, 407, "plan"], [407, 540, "wait"]] },
    { id: "A15", owner: 0, shipped: null, segs: [[338, 398, "plan"], [398, 540, "wait"]] },
    { id: "B16", owner: 1, shipped: null, segs: [[368, 428, "plan"], [428, 540, "wait"]] },
    { id: "A16", owner: 0, shipped: null, segs: [[398, 486, "plan"], [486, 540, "wait"]] },
    { id: "C17", owner: 2, shipped: null, segs: [[407, 500, "plan"], [500, 540, "wait"]] },
    { id: "B17", owner: 1, shipped: null, segs: [[428, 540, "plan"]] },
    { id: "A17", owner: 0, shipped: null, segs: [[486, 540, "plan"]] },
    { id: "C18", owner: 2, shipped: null, segs: [[500, 540, "plan"]] },
  ],
};

export const makerMornings: Strategy = {
  name: "Maker mornings",
  desc: "Nobody is interrupted before lunch. After lunch everyone is interrupt-driven.",
  keepsUp: true,
  stats: { deepFocusMin: 177, switches: 10.7, shippedPerPerson: 4.58, leadMin: 336, overCapPct: 53 },
  goalie: [],
  lanes: [
    [[0, 11, "review"], [11, 26, "ramp"], [26, 180, "flow"], [180, 240, "off"], [240, 313, "review"], [313, 317, "agent"], [317, 342, "review"], [342, 346, "agent"], [346, 351, "ramp"], [351, 366, "review"], [366, 370, "agent"], [370, 380, "ramp"], [380, 383, "flow"], [383, 391, "agent"], [391, 393, "ramp"], [393, 401, "flow"], [401, 456, "review"], [456, 460, "agent"], [460, 475, "review"], [475, 486, "ramp"], [486, 528, "flow"], [528, 538, "review"], [538, 540, "agent"]],
    [[0, 15, "ramp"], [15, 180, "flow"], [180, 240, "off"], [240, 255, "review"], [255, 259, "agent"], [259, 289, "review"], [289, 299, "ramp"], [299, 302, "review"], [302, 303, "ramp"], [303, 307, "agent"], [307, 311, "ramp"], [311, 313, "flow"], [313, 317, "agent"], [317, 319, "ramp"], [319, 337, "flow"], [337, 347, "review"], [347, 355, "agent"], [355, 356, "ramp"], [356, 360, "agent"], [360, 362, "ramp"], [362, 390, "flow"], [390, 398, "agent"], [398, 402, "ramp"], [402, 424, "flow"], [424, 439, "review"], [439, 443, "agent"], [443, 445, "ramp"], [445, 460, "review"], [460, 464, "ramp"], [464, 488, "flow"], [488, 492, "agent"], [492, 496, "ramp"], [496, 531, "flow"], [531, 535, "agent"], [535, 537, "ramp"], [537, 540, "flow"]],
    [[0, 15, "ramp"], [15, 180, "flow"], [180, 240, "off"], [240, 250, "review"], [250, 254, "agent"], [254, 274, "review"], [274, 289, "ramp"], [289, 292, "review"], [292, 293, "ramp"], [293, 297, "agent"], [297, 299, "ramp"], [299, 303, "agent"], [303, 305, "ramp"], [305, 309, "flow"], [309, 313, "agent"], [313, 316, "review"], [316, 318, "ramp"], [318, 319, "flow"], [319, 323, "agent"], [323, 325, "ramp"], [325, 327, "flow"], [327, 337, "review"], [337, 341, "ramp"], [341, 344, "review"], [344, 348, "agent"], [348, 351, "review"], [351, 352, "ramp"], [352, 356, "agent"], [356, 360, "ramp"], [360, 362, "flow"], [362, 366, "agent"], [366, 368, "ramp"], [368, 409, "flow"], [409, 449, "review"], [449, 450, "ramp"], [450, 454, "agent"], [454, 464, "ramp"], [464, 488, "flow"], [488, 498, "review"], [498, 502, "agent"], [502, 532, "review"], [532, 540, "ramp"]],
  ],
  tickets: [
    { id: "C9", owner: 2, shipped: 11, segs: [[0, 11, "person"]] },
    { id: "A8", owner: 0, shipped: 255, segs: [[0, 19, "agent"], [19, 240, "wait"], [240, 255, "person"]] },
    { id: "B9", owner: 1, shipped: 332, segs: [[0, 33, "agent"], [33, 255, "wait"], [255, 259, "person"], [259, 313, "agent"], [313, 317, "wait"], [317, 332, "person"]] },
    { id: "C10", owner: 2, shipped: 366, segs: [[0, 34, "agent"], [34, 250, "wait"], [250, 254, "person"], [254, 293, "agent"], [293, 297, "person"], [297, 351, "agent"], [351, 366, "person"]] },
    { id: "A9", owner: 0, shipped: 532, segs: [[0, 22, "plan"], [22, 240, "wait"], [240, 250, "person"], [250, 280, "wait"], [280, 290, "person"], [289, 292, "person"], [292, 303, "wait"], [303, 316, "person"], [316, 332, "wait"], [332, 342, "person"], [341, 344, "person"], [344, 383, "agent"], [383, 387, "person"], [387, 426, "agent"], [426, 456, "wait"], [456, 460, "person"], [460, 514, "agent"], [514, 517, "wait"], [517, 532, "person"]] },
    { id: "B10", owner: 1, shipped: 475, segs: [[0, 16, "plan"], [16, 240, "wait"], [240, 250, "person"], [250, 279, "wait"], [279, 289, "person"], [289, 300, "wait"], [300, 303, "person"], [303, 342, "agent"], [342, 347, "wait"], [347, 351, "person"], [351, 390, "agent"], [390, 394, "person"], [394, 448, "agent"], [448, 460, "wait"], [460, 475, "person"]] },
    { id: "C11", owner: 2, shipped: 426, segs: [[0, 54, "plan"], [54, 250, "wait"], [250, 260, "person"], [260, 299, "agent"], [299, 303, "person"], [303, 342, "agent"], [342, 344, "wait"], [344, 348, "person"], [348, 402, "agent"], [402, 411, "wait"], [411, 426, "person"]] },
    { id: "B11", owner: 1, shipped: 424, segs: [[16, 76, "plan"], [76, 254, "wait"], [254, 264, "person"], [264, 303, "agent"], [303, 307, "person"], [307, 346, "agent"], [346, 351, "wait"], [351, 355, "person"], [355, 409, "agent"], [409, 424, "person"]] },
    { id: "A10", owner: 0, shipped: 439, segs: [[22, 84, "plan"], [84, 259, "wait"], [259, 269, "person"], [269, 308, "agent"], [308, 313, "wait"], [313, 317, "person"], [317, 356, "agent"], [356, 366, "wait"], [366, 370, "person"], [370, 424, "agent"], [424, 439, "person"]] },
    { id: "C12", owner: 2, shipped: 441, segs: [[54, 114, "plan"], [114, 260, "wait"], [260, 270, "person"], [270, 309, "agent"], [309, 313, "person"], [313, 352, "agent"], [352, 356, "person"], [356, 410, "agent"], [410, 426, "wait"], [426, 441, "person"]] },
    { id: "B12", owner: 1, shipped: 439, segs: [[76, 136, "plan"], [136, 264, "wait"], [264, 274, "person"], [274, 313, "agent"], [313, 317, "person"], [317, 356, "agent"], [356, 360, "person"], [360, 414, "agent"], [414, 424, "wait"], [424, 439, "person"]] },
    { id: "A11", owner: 0, shipped: 460, segs: [[84, 144, "plan"], [144, 269, "wait"], [269, 279, "person"], [279, 290, "wait"], [290, 300, "person"], [299, 302, "person"], [302, 341, "agent"], [341, 342, "wait"], [342, 346, "person"], [346, 385, "agent"], [385, 387, "wait"], [387, 391, "person"], [391, 445, "agent"], [445, 460, "person"]] },
    { id: "C13", owner: 2, shipped: 456, segs: [[114, 174, "plan"], [174, 270, "wait"], [270, 280, "person"], [280, 319, "agent"], [319, 323, "person"], [323, 362, "agent"], [362, 366, "person"], [366, 420, "agent"], [420, 441, "wait"], [441, 456, "person"]] },
    { id: "B13", owner: 1, shipped: 517, segs: [[136, 327, "plan"], [327, 347, "person"], [347, 348, "wait"], [348, 351, "person"], [351, 390, "agent"], [390, 394, "wait"], [394, 398, "person"], [398, 437, "agent"], [437, 439, "wait"], [439, 443, "person"], [443, 497, "agent"], [497, 502, "wait"], [502, 517, "person"]] },
    { id: "A12", owner: 0, shipped: null, segs: [[144, 488, "plan"], [488, 498, "person"], [498, 537, "agent"], [537, 538, "wait"], [538, 540, "person"]] },
    { id: "C14", owner: 2, shipped: null, segs: [[174, 400, "plan"], [400, 401, "wait"], [401, 411, "person"], [411, 450, "agent"], [450, 454, "person"], [454, 493, "agent"], [493, 498, "wait"], [498, 502, "person"], [502, 540, "agent"]] },
    { id: "B14", owner: 1, shipped: null, segs: [[327, 422, "plan"], [422, 439, "wait"], [439, 449, "person"], [449, 488, "agent"], [488, 492, "person"], [492, 531, "agent"], [531, 535, "person"], [535, 540, "agent"]] },
    { id: "C15", owner: 2, shipped: null, segs: [[400, 540, "plan"]] },
    { id: "B15", owner: 1, shipped: null, segs: [[422, 527, "plan"], [527, 528, "wait"], [528, 538, "person"], [538, 540, "agent"]] },
    { id: "A13", owner: 0, shipped: null, segs: [[488, 540, "plan"]] },
    { id: "B16", owner: 1, shipped: null, segs: [[527, 540, "plan"]] },
  ],
};

export const rhythmGoalie: Strategy = {
  name: "Team rhythm + goalie",
  desc: "Four shared windows; goalies (one per three people) rotating three times a day do teammate reviews immediately.",
  keepsUp: true,
  stats: { deepFocusMin: 216, switches: 6.7, shippedPerPerson: 4.17, leadMin: 547, overCapPct: 100 },
  goalie: [[[240, 390]], [[390, 540]], [[0, 180]]],
  lanes: [
    [[0, 15, "ramp"], [15, 150, "flow"], [150, 154, "agent"], [154, 169, "review"], [169, 173, "agent"], [173, 180, "ramp"], [180, 240, "off"], [240, 290, "review"], [290, 302, "agent"], [302, 322, "review"], [322, 333, "ramp"], [333, 337, "agent"], [337, 341, "ramp"], [341, 342, "flow"], [342, 346, "agent"], [346, 366, "review"], [366, 374, "ramp"], [374, 385, "flow"], [385, 389, "agent"], [389, 391, "ramp"], [391, 510, "flow"], [510, 513, "review"], [513, 517, "agent"], [517, 521, "ramp"], [521, 522, "flow"], [522, 526, "agent"], [526, 540, "review"]],
    [[0, 15, "ramp"], [15, 150, "flow"], [150, 180, "review"], [180, 240, "off"], [240, 255, "ramp"], [255, 300, "flow"], [300, 325, "review"], [325, 335, "ramp"], [335, 390, "flow"], [390, 398, "agent"], [398, 423, "review"], [423, 435, "agent"], [435, 465, "review"], [465, 473, "agent"], [473, 483, "review"], [483, 495, "agent"], [495, 504, "ramp"], [504, 514, "review"], [514, 519, "ramp"], [519, 529, "review"], [529, 537, "ramp"], [537, 540, "flow"]],
    [[0, 10, "review"], [10, 14, "agent"], [14, 16, "ramp"], [16, 24, "agent"], [24, 28, "ramp"], [28, 53, "review"], [53, 57, "agent"], [57, 67, "review"], [67, 76, "ramp"], [76, 92, "flow"], [92, 102, "review"], [102, 113, "ramp"], [113, 123, "review"], [123, 131, "ramp"], [131, 180, "flow"], [180, 240, "off"], [240, 255, "ramp"], [255, 300, "flow"], [300, 303, "review"], [303, 306, "ramp"], [306, 309, "flow"], [309, 312, "review"], [312, 313, "ramp"], [313, 420, "flow"], [420, 424, "agent"], [424, 454, "review"], [454, 461, "ramp"], [461, 510, "flow"], [510, 514, "agent"], [514, 529, "review"], [529, 533, "agent"], [533, 538, "ramp"], [538, 540, "flow"]],
  ],
  tickets: [
    { id: "B5", owner: 1, shipped: 43, segs: [[0, 28, "agent"], [28, 43, "person"]] },
    { id: "B6", owner: 1, shipped: 169, segs: [[0, 47, "agent"], [47, 154, "wait"], [154, 169, "person"]] },
    { id: "A6", owner: 0, shipped: 165, segs: [[0, 150, "wait"], [150, 165, "person"]] },
    { id: "C7", owner: 2, shipped: 423, segs: [[0, 16, "agent"], [16, 20, "person"], [20, 74, "agent"], [74, 408, "wait"], [408, 423, "person"]] },
    { id: "A7", owner: 0, shipped: 325, segs: [[0, 310, "wait"], [310, 325, "person"]] },
    { id: "C8", owner: 2, shipped: 180, segs: [[0, 165, "wait"], [165, 180, "person"]] },
    { id: "B7", owner: 1, shipped: null, segs: [[0, 300, "wait"], [300, 310, "person"], [309, 312, "person"], [312, 351, "agent"], [351, 431, "wait"], [431, 435, "person"], [435, 474, "agent"], [474, 491, "wait"], [491, 495, "person"], [495, 540, "agent"]] },
    { id: "C9", owner: 2, shipped: 265, segs: [[0, 20, "agent"], [20, 24, "person"], [24, 78, "agent"], [78, 250, "wait"], [250, 265, "person"]] },
    { id: "A9", owner: 0, shipped: 439, segs: [[0, 12, "agent"], [12, 150, "wait"], [150, 154, "person"], [154, 193, "agent"], [193, 294, "wait"], [294, 298, "person"], [298, 352, "agent"], [352, 424, "wait"], [424, 439, "person"]] },
    { id: "B8", owner: 1, shipped: null, segs: [[0, 390, "wait"], [390, 394, "person"], [394, 433, "agent"], [433, 465, "wait"], [465, 469, "person"], [469, 523, "agent"], [523, 526, "wait"], [526, 540, "person"]] },
    { id: "A10", owner: 0, shipped: 454, segs: [[0, 10, "person"], [10, 49, "agent"], [49, 169, "wait"], [169, 173, "person"], [173, 212, "agent"], [212, 298, "wait"], [298, 302, "person"], [302, 356, "agent"], [356, 439, "wait"], [439, 454, "person"]] },
    { id: "B9", owner: 1, shipped: null, segs: [[0, 394, "wait"], [394, 398, "person"], [398, 437, "agent"], [437, 469, "wait"], [469, 473, "person"], [473, 527, "agent"], [527, 540, "wait"]] },
    { id: "C10", owner: 2, shipped: 280, segs: [[0, 5, "agent"], [5, 10, "wait"], [10, 14, "person"], [14, 53, "agent"], [53, 57, "person"], [57, 111, "agent"], [111, 265, "wait"], [265, 280, "person"]] },
    { id: "B10", owner: 1, shipped: null, segs: [[0, 32, "plan"], [32, 43, "wait"], [43, 53, "person"], [53, 398, "wait"], [398, 408, "person"], [408, 540, "wait"]] },
    { id: "C11", owner: 2, shipped: null, segs: [[0, 145, "plan"], [145, 280, "wait"], [280, 290, "person"], [290, 329, "agent"], [329, 420, "wait"], [420, 424, "person"], [424, 463, "agent"], [463, 540, "wait"]] },
    { id: "A11", owner: 0, shipped: null, segs: [[0, 53, "plan"], [53, 57, "wait"], [57, 67, "person"], [67, 240, "wait"], [240, 250, "person"], [250, 300, "wait"], [300, 303, "person"], [303, 342, "agent"], [342, 346, "person"], [346, 385, "agent"], [385, 389, "person"], [389, 443, "agent"], [443, 540, "wait"]] },
    { id: "B11", owner: 1, shipped: null, segs: [[32, 92, "plan"], [92, 102, "person"], [102, 141, "agent"], [141, 423, "wait"], [423, 427, "person"], [427, 466, "agent"], [466, 483, "wait"], [483, 487, "person"], [487, 540, "agent"]] },
    { id: "A12", owner: 0, shipped: 529, segs: [[53, 113, "plan"], [113, 123, "person"], [123, 162, "agent"], [162, 290, "wait"], [290, 294, "person"], [294, 333, "agent"], [333, 337, "person"], [337, 391, "agent"], [391, 514, "wait"], [514, 529, "person"]] },
    { id: "B12", owner: 1, shipped: null, segs: [[92, 247, "plan"], [247, 302, "wait"], [302, 312, "person"], [312, 351, "agent"], [351, 427, "wait"], [427, 431, "person"], [431, 470, "agent"], [470, 487, "wait"], [487, 491, "person"], [491, 540, "agent"]] },
    { id: "A13", owner: 0, shipped: null, segs: [[113, 389, "plan"], [389, 445, "wait"], [445, 455, "person"], [455, 494, "agent"], [494, 513, "wait"], [513, 517, "person"], [517, 540, "agent"]] },
    { id: "C12", owner: 2, shipped: null, segs: [[145, 275, "plan"], [275, 312, "wait"], [312, 322, "person"], [322, 361, "agent"], [361, 510, "wait"], [510, 514, "person"], [514, 540, "agent"]] },
    { id: "B13", owner: 1, shipped: null, segs: [[247, 343, "plan"], [343, 346, "wait"], [346, 356, "person"], [356, 435, "wait"], [435, 445, "person"], [445, 510, "wait"], [510, 513, "person"], [513, 540, "agent"]] },
    { id: "C13", owner: 2, shipped: null, segs: [[275, 344, "plan"], [344, 356, "wait"], [356, 366, "person"], [366, 405, "agent"], [405, 529, "wait"], [529, 533, "person"], [533, 540, "agent"]] },
    { id: "B14", owner: 1, shipped: null, segs: [[343, 540, "plan"]] },
    { id: "C14", owner: 2, shipped: null, segs: [[344, 404, "plan"], [404, 455, "wait"], [455, 465, "person"], [465, 504, "agent"], [504, 540, "wait"]] },
    { id: "A14", owner: 0, shipped: null, segs: [[389, 450, "plan"], [450, 473, "wait"], [473, 483, "person"], [483, 522, "agent"], [522, 526, "person"], [526, 540, "agent"]] },
    { id: "C15", owner: 2, shipped: null, segs: [[404, 503, "plan"], [503, 504, "wait"], [504, 514, "person"], [514, 540, "agent"]] },
    { id: "A15", owner: 0, shipped: null, segs: [[450, 519, "plan"], [519, 529, "person"], [529, 540, "agent"]] },
    { id: "C16", owner: 2, shipped: null, segs: [[503, 540, "plan"]] },
    { id: "A16", owner: 0, shipped: null, segs: [[519, 540, "plan"]] },
  ],
};

export const breakpoint: Strategy = {
  name: "Breakpoint-driven",
  desc: "Nobody is pulled out of flow. People pick up waiting work only at a natural break (just finished a plan, already ramping, start of a session), or once something has waited 90 minutes.",
  keepsUp: true,
  stats: { deepFocusMin: 223, switches: 7.2, shippedPerPerson: 4.58, leadMin: 306, overCapPct: 55 },
  goalie: [],
  lanes: [
    [[0, 4, "agent"], [4, 29, "review"], [29, 39, "ramp"], [39, 49, "review"], [49, 54, "ramp"], [54, 71, "flow"], [71, 101, "review"], [101, 105, "agent"], [105, 107, "ramp"], [107, 132, "review"], [132, 136, "agent"], [136, 142, "ramp"], [142, 157, "review"], [157, 161, "agent"], [161, 180, "review"], [180, 240, "off"], [240, 241, "review"], [241, 245, "agent"], [245, 248, "review"], [248, 263, "ramp"], [263, 314, "flow"], [314, 324, "review"], [324, 332, "ramp"], [332, 389, "flow"], [389, 414, "review"], [414, 418, "ramp"], [418, 477, "flow"], [477, 507, "review"], [507, 511, "agent"], [511, 521, "review"], [521, 525, "agent"], [525, 540, "review"]],
    [[0, 3, "review"], [3, 11, "agent"], [11, 39, "review"], [39, 48, "ramp"], [48, 51, "review"], [51, 55, "agent"], [55, 58, "ramp"], [58, 83, "review"], [83, 84, "ramp"], [84, 94, "review"], [94, 102, "ramp"], [102, 167, "flow"], [167, 177, "review"], [177, 179, "ramp"], [179, 180, "flow"], [180, 240, "off"], [240, 270, "review"], [270, 280, "ramp"], [280, 284, "agent"], [284, 287, "ramp"], [287, 291, "agent"], [291, 293, "ramp"], [293, 346, "flow"], [346, 376, "review"], [376, 384, "agent"], [384, 394, "review"], [394, 402, "ramp"], [402, 459, "flow"], [459, 463, "agent"], [463, 465, "ramp"], [465, 525, "flow"], [525, 535, "review"], [535, 539, "agent"], [539, 540, "ramp"]],
    [[0, 8, "agent"], [8, 23, "ramp"], [23, 84, "flow"], [84, 92, "agent"], [92, 94, "ramp"], [94, 154, "flow"], [154, 162, "agent"], [162, 164, "ramp"], [164, 180, "flow"], [180, 240, "off"], [240, 248, "agent"], [248, 263, "ramp"], [263, 301, "flow"], [301, 305, "agent"], [305, 307, "ramp"], [307, 367, "flow"], [367, 387, "review"], [387, 391, "agent"], [391, 401, "review"], [401, 409, "ramp"], [409, 466, "flow"], [466, 469, "review"], [469, 477, "agent"], [477, 497, "review"], [497, 505, "ramp"], [505, 540, "flow"]],
  ],
  tickets: [
    { id: "C8", owner: 2, shipped: 26, segs: [[0, 11, "wait"], [11, 26, "person"]] },
    { id: "B7", owner: 1, shipped: 19, segs: [[0, 4, "wait"], [4, 19, "person"]] },
    { id: "B8", owner: 1, shipped: 101, segs: [[0, 3, "wait"], [3, 7, "person"], [7, 61, "agent"], [61, 86, "wait"], [86, 101, "person"]] },
    { id: "A8", owner: 0, shipped: 73, segs: [[0, 4, "person"], [4, 58, "agent"], [58, 73, "person"]] },
    { id: "C9", owner: 2, shipped: 86, segs: [[0, 4, "person"], [4, 58, "agent"], [58, 71, "wait"], [71, 86, "person"]] },
    { id: "A9", owner: 0, shipped: 270, segs: [[0, 3, "person"], [3, 19, "wait"], [19, 29, "person"], [29, 36, "wait"], [36, 49, "person"], [48, 51, "person"], [51, 90, "agent"], [90, 101, "wait"], [101, 105, "person"], [105, 144, "agent"], [144, 157, "wait"], [157, 161, "person"], [161, 215, "agent"], [215, 255, "wait"], [255, 270, "person"]] },
    { id: "B9", owner: 1, shipped: 132, segs: [[0, 7, "wait"], [7, 11, "person"], [11, 50, "agent"], [50, 51, "wait"], [51, 55, "person"], [55, 109, "agent"], [109, 117, "wait"], [117, 132, "person"]] },
    { id: "C10", owner: 2, shipped: 157, segs: [[0, 4, "wait"], [4, 8, "person"], [8, 47, "agent"], [47, 84, "wait"], [84, 88, "person"], [88, 142, "agent"], [142, 157, "person"]] },
    { id: "B10", owner: 1, shipped: 507, segs: [[0, 106, "plan"], [106, 107, "wait"], [107, 117, "person"], [117, 167, "wait"], [167, 177, "person"], [177, 245, "wait"], [245, 248, "person"], [248, 287, "agent"], [287, 291, "person"], [291, 330, "agent"], [330, 380, "wait"], [380, 384, "person"], [384, 438, "agent"], [438, 492, "wait"], [492, 507, "person"]] },
    { id: "A10", owner: 0, shipped: 376, segs: [[0, 70, "plan"], [70, 73, "wait"], [73, 83, "person"], [83, 122, "agent"], [122, 132, "wait"], [132, 136, "person"], [136, 175, "agent"], [175, 241, "wait"], [241, 245, "person"], [245, 299, "agent"], [299, 361, "wait"], [361, 376, "person"]] },
    { id: "C11", owner: 2, shipped: 255, segs: [[0, 23, "plan"], [23, 26, "wait"], [26, 36, "person"], [36, 75, "agent"], [75, 88, "wait"], [88, 92, "person"], [92, 131, "agent"], [131, 154, "wait"], [154, 158, "person"], [158, 212, "agent"], [212, 240, "wait"], [240, 255, "person"]] },
    { id: "C12", owner: 2, shipped: 361, segs: [[23, 83, "plan"], [83, 84, "wait"], [84, 94, "person"], [94, 133, "agent"], [133, 158, "wait"], [158, 162, "person"], [162, 201, "agent"], [201, 240, "wait"], [240, 244, "person"], [244, 298, "agent"], [298, 346, "wait"], [346, 361, "person"]] },
    { id: "A11", owner: 0, shipped: null, segs: [[70, 313, "plan"], [313, 367, "wait"], [367, 377, "person"], [377, 404, "wait"], [404, 414, "person"], [414, 466, "wait"], [466, 469, "person"], [469, 508, "agent"], [508, 521, "wait"], [521, 525, "person"], [525, 540, "agent"]] },
    { id: "C13", owner: 2, shipped: 404, segs: [[83, 153, "plan"], [153, 161, "wait"], [161, 171, "person"], [171, 210, "agent"], [210, 244, "wait"], [244, 248, "person"], [248, 287, "agent"], [287, 301, "wait"], [301, 305, "person"], [305, 359, "agent"], [359, 389, "wait"], [389, 404, "person"]] },
    { id: "B11", owner: 1, shipped: 492, segs: [[106, 166, "plan"], [166, 171, "wait"], [171, 241, "person"], [241, 280, "agent"], [280, 284, "person"], [284, 323, "agent"], [323, 376, "wait"], [376, 380, "person"], [380, 434, "agent"], [434, 477, "wait"], [477, 492, "person"]] },
    { id: "C14", owner: 2, shipped: null, segs: [[153, 300, "plan"], [300, 314, "wait"], [314, 324, "person"], [324, 363, "agent"], [363, 387, "wait"], [387, 391, "person"], [391, 430, "agent"], [430, 469, "wait"], [469, 473, "person"], [473, 527, "agent"], [527, 535, "wait"], [535, 540, "person"]] },
    { id: "B12", owner: 1, shipped: null, segs: [[166, 345, "plan"], [345, 377, "wait"], [377, 387, "person"], [387, 426, "agent"], [426, 459, "wait"], [459, 463, "person"], [463, 502, "agent"], [502, 535, "wait"], [535, 539, "person"], [539, 540, "agent"]] },
    { id: "C15", owner: 2, shipped: null, segs: [[300, 366, "plan"], [366, 384, "wait"], [384, 394, "person"], [394, 433, "agent"], [433, 473, "wait"], [473, 477, "person"], [477, 516, "agent"], [516, 540, "wait"]] },
    { id: "A12", owner: 0, shipped: null, segs: [[313, 388, "plan"], [388, 391, "wait"], [391, 401, "person"], [401, 440, "agent"], [440, 507, "wait"], [507, 511, "person"], [511, 540, "agent"]] },
    { id: "B13", owner: 1, shipped: null, segs: [[345, 458, "plan"], [458, 477, "wait"], [477, 487, "person"], [487, 525, "wait"], [525, 535, "person"], [535, 540, "wait"]] },
    { id: "C16", owner: 2, shipped: null, segs: [[366, 465, "plan"], [465, 511, "wait"], [511, 521, "person"], [521, 540, "wait"]] },
    { id: "A13", owner: 0, shipped: null, segs: [[388, 476, "plan"], [476, 487, "wait"], [487, 497, "person"], [497, 536, "agent"], [536, 540, "wait"]] },
    { id: "B14", owner: 1, shipped: null, segs: [[458, 524, "plan"], [524, 525, "wait"], [525, 535, "person"], [535, 540, "agent"]] },
    { id: "C17", owner: 2, shipped: null, segs: [[465, 540, "plan"]] },
    { id: "A14", owner: 0, shipped: null, segs: [[476, 540, "plan"]] },
    { id: "B15", owner: 1, shipped: null, segs: [[524, 540, "plan"]] },
  ],
};
