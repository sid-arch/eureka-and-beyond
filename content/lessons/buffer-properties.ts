import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "buffer-properties",
  title: "Properties of buffers",
  summary: "Identify buffer systems, prepare them by mixing or by partial neutralization, and explain why dilution barely changes a buffer's pH.",
  minutes: 35,
  objectives: [
    "Recognize buffer pairs: weak acid with conjugate base, or weak base with conjugate acid.",
    "Prepare a buffer by partially neutralizing a weak acid with strong base.",
    "Explain how a buffer neutralizes added H⁺ and OH⁻, and why dilution leaves pH nearly unchanged.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("What makes a buffer", r`Significant amounts of both a weak acid and its conjugate base (HNO₂/NO₂⁻, NH₄⁺/NH₃, H₂PO₄⁻/HPO₄²⁻). The acid neutralizes added OH⁻, the base neutralizes added H⁺. A strong acid with its salt (HCl/NaCl) is not a buffer: Cl⁻ is too weak a base to take back protons.`),
    def("Two ways to make one", r`Mix HA with a salt of A⁻, or start with HA alone and add strong base until part of it is converted to A⁻. Adding less than one equivalent of NaOH to a weak acid always produces a buffer, which is why the middle of a titration curve is flat.`),
    example(r`0.30 mol acetic acid + 0.10 mol NaOH in 1.0 L`, [
      [r`\text{HA: } 0.30 - 0.10 = 0.20\ \text{mol}`, "OH⁻ reacts completely."],
      [r`\text{A}^-: 0.10\ \text{mol}`, ""],
      [r`\text{pH} = 4.74 + \log\tfrac{0.10}{0.20}`, ""],
      [r`= 4.44`, ""],
    ]),
    def("Dilution", r`pH depends on the ratio $n_{\text{A}^-}/n_{\text{HA}}$. Diluting with water changes both concentrations by the same factor, so the ratio and the pH stay put (until the solution is so dilute that water's own ions matter). Dilution does lower the capacity.`),
    activity("buffer", { title: "Buffer response", params: { acid: 0.2, base: 0.1, added: 0.02 } }),
    callout("tip", "Try this", r`Set equal acid and base, then add small amounts of strong acid and strong base. Compare the pH change of the buffer and of pure water side by side.`, "experiment"),
    callout("application", "Where this shows up", r`Phosphate buffers (pKa 7.2) hold cell-culture media and biochemistry experiments near pH 7; blood relies on H₂CO₃/HCO₃⁻.`),
  ],
  questions: [
    num(2, r`Find the pH of the buffer made from 0.30 mol acetic acid and 0.10 mol NaOH in 1.0 L, to two decimal places.`, 4.44, { tolerance: 0.01 }, ["React first, then use the ratio."], r`$4.74 + \log 0.5 = 4.44$.`),
    num(3, r`0.20 mol NH₃ is mixed with 0.050 mol HCl in 500 mL. Find the pH (NH₄⁺ pKa 9.25), to two decimal places.`, 9.73, { tolerance: 0.01 }, ["HCl converts NH₃ to NH₄⁺.", "Base is NH₃, acid is NH₄⁺."], r`NH₃ 0.15, NH₄⁺ 0.050: $9.25 + \log 3 = 9.73$.`),
    mc(2, r`Which mixture is a buffer?`, ["HNO₃ + KNO₃", "NH₃ + NH₄Cl", "NaOH + NaCl", "HCl + KCl"], 1, ["Look for a weak conjugate pair."], r`NH₄⁺ and NH₃ are a weak acid–base pair.`),
    mc(2, r`A buffer is diluted to ten times its volume with water. Its pH…`, ["rises by 1", "falls by 1", "stays about the same", "becomes 7"], 2, ["What happens to the ratio?"], r`The ratio is unchanged.`),
    mc(3, r`Which added amount of NaOH turns 0.10 mol HF into a buffer?`, ["0.050 mol", "0.10 mol", "0.15 mol", "0.20 mol"], 0, ["You need both HF and F⁻ left."], r`Only less than 0.10 mol leaves both forms.`, "review"),
  ],
});
