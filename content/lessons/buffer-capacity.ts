import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "buffer-capacity",
  title: "Buffer capacity",
  summary: "Define buffer capacity, calculate how much strong acid or base a buffer absorbs before its pH moves by one unit, and compare concentrated and dilute buffers.",
  minutes: 30,
  objectives: [
    "Define capacity as the amount of strong acid or base a buffer can absorb with little pH change.",
    "Show that capacity grows with the amounts of HA and A⁻ and is largest when they are equal.",
    "Calculate the pH after an addition and the amount needed for a one-unit change.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("Capacity", r`Buffer capacity is the amount of strong acid or base a buffer can neutralize before its pH changes significantly. Two buffers with the same ratio share a pH, but the one with more moles of each component has more capacity. Capacity toward base is limited by HA; toward acid, by A⁻.`),
    example(r`1.00 L of 0.10 M HA / 0.10 M A⁻: how much NaOH raises the pH by 1.00?`, [
      [r`\tfrac{0.10 + x}{0.10 - x} = 10`, "The ratio must rise 10-fold."],
      [r`0.10 + x = 1.0 - 10x`, ""],
      [r`x = 0.0818\ \text{mol}`, "About 82% of the HA is used up."],
    ]),
    example(r`The same pH, but 0.010 M of each`, [
      [r`x = 0.00818\ \text{mol}`, "Ten times less capacity."],
    ]),
    activity("buffer", { title: "Finding the capacity", params: { acid: 0.1, base: 0.1, added: 0.05 } }),
    callout("tip", "Try this", r`Step the added base up toward 0.10 mol. The pH creeps for a while, then jumps once the acetic acid is nearly gone. Repeat with 0.5 mol of each component.`, "experiment"),
    callout("note", "Why equal amounts work best", r`At a 1:1 ratio, a given addition changes the log term least. With a 10:1 ratio, the minor component is used up quickly in one direction.`),
    callout("application", "Where this shows up", r`Ocean carbonate buffering absorbs much of the CO₂ we emit; as its capacity is used, the oceans acidify measurably.`),
  ],
  questions: [
    num(2, r`0.050 mol NaOH is added to 1.00 L of 0.10 M acetic acid / 0.10 M acetate (pKa 4.74). Find the pH, to two decimal places.`, 5.22, { tolerance: 0.01 }, ["HA 0.05, A⁻ 0.15."], r`$4.74 + \log 3 = 5.22$.`),
    num(3, r`How many moles of NaOH raise the pH of 1.00 L of 0.50 M HA / 0.50 M A⁻ by exactly 1 unit? Three decimal places.`, 0.409, { tolerance: 0.002, unit: "mol" }, ["Solve (0.50 + x)/(0.50 − x) = 10."], r`$x = 0.50 \cdot 9/11 = 0.409$ mol.`),
    mc(2, r`Which buffer has the greatest capacity?`, ["0.01 M HA / 0.01 M A⁻", "0.1 M HA / 0.1 M A⁻", "1.0 M HA / 1.0 M A⁻", "1.0 M HA / 0.01 M A⁻"], 2, ["Large and equal amounts."], r`The most of both components.`),
    mc(2, r`A buffer with [A⁻] much larger than [HA] resists added…`, ["base better than acid", "acid better than base", "both equally", "neither"], 1, ["Which component neutralizes H⁺?"], r`A⁻ consumes H⁺; HA is scarce for OH⁻.`),
    mc(3, r`Two buffers have pH 4.74. Buffer X uses 0.5 M of each component and Y uses 0.05 M. Compared to Y, X has…`, ["higher pH", "lower pH", "ten times the capacity", "the same capacity"], 2, ["pH depends on the ratio; capacity depends on how many moles of each component there are."], r`Same ratio, ten times the moles.`, "review"),
  ],
});
