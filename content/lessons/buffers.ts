import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "buffers",
  title: "Buffers",
  summary: "Explain how a weak acid and its conjugate base resist pH changes, use the Henderson–Hasselbalch equation, and calculate pH after adding strong acid or base.",
  minutes: 40,
  objectives: [
    "Identify buffer pairs and explain how they neutralize added acid or base.",
    "Use pH = pKa + log([A⁻]/[HA]).",
    "Calculate pH after adding strong acid or base: react first, then apply Henderson–Hasselbalch.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("How buffers work", r`A buffer contains a weak acid and its conjugate base in similar amounts. Added OH⁻ is consumed by HA (HA + OH⁻ → A⁻ + H₂O); added H⁺ is consumed by A⁻. Only the ratio $\frac{[\text{A}^-]}{[\text{HA}]}$ changes, slowly, so the pH barely moves.`),
    def("Henderson–Hasselbalch", r`$\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}$. Equal amounts give pH = pKa. A buffer works best within about ±1 of its pKa.`),
    example(r`1.00 L with 0.10 mol acetic acid and 0.10 mol acetate (pKa 4.74), after adding 0.010 mol NaOH`, [
      [r`n_{\text{HA}} = 0.10 - 0.010 = 0.090\ \text{mol}`, "React first: OH⁻ converts HA to A⁻."],
      [r`n_{\text{A}^-} = 0.10 + 0.010 = 0.11\ \text{mol}`, ""],
      [r`\text{pH} = 4.74 + \log\tfrac{0.11}{0.090} \approx 4.83`, "Up only 0.09; pure water would jump from 7 to 12."],
    ]),
    activity("buffer", { title: "Buffer vs pure water", params: { acid: 0.1, base: 0.1, added: 0.01 } }),
    callout("tip", "Try this", r`Push the added base past 0.10 mol: the acetic acid runs out and the buffer's pH shoots up. That limit is the buffer capacity.`, "experiment"),
    callout("application", "Where this shows up", r`Blood stays near pH 7.4 with the carbonic acid–bicarbonate buffer; shampoos, eye drops and lab media are all buffered.`),
  ],
  questions: [
    num(2, r`Find the pH of a buffer with 0.15 M acetate and 0.10 M acetic acid, to two decimal places.`, 4.92, { tolerance: 0.01 }, [], r`$4.74 + \log 1.5$.`),
    num(3, r`To 1.00 L of 0.20 M NH₃ / 0.20 M NH₄⁺ (pKa 9.25) you add 0.050 mol HCl. Find the pH, to two decimal places.`, 9.03, { tolerance: 0.01 }, [], r`NH₃ 0.15, NH₄⁺ 0.25: $9.25 + \log\frac{0.15}{0.25}$.`),
    mc(2, r`Which pair makes a buffer?`, ["HCl / NaCl", "HNO₂ / NaNO₂", "NaOH / NaCl", "HCl / NaOH"], 1, [], r`A weak acid and its conjugate base.`),
    mc(3, r`For a buffer at pH 5.0, the best choice is a weak acid with pKa near…`, ["2", "5", "9", "14"], 1, [], r`pH = pKa at maximum capacity.`, "review"),
  ],
});
