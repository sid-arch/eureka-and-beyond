import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "henderson-hasselbalch",
  title: "Henderson–Hasselbalch equation",
  summary: "Derive the Henderson–Hasselbalch equation from Ka, use it to find buffer pH, and design a buffer to hit a target pH.",
  minutes: 35,
  objectives: [
    "Derive pH = pKa + log([A⁻]/[HA]) from the Ka expression.",
    "Use moles or concentrations in the ratio, since both share one volume.",
    "Design a buffer: choose an acid by pKa and calculate the base-to-acid ratio and mass of salt needed.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("Derivation", r`Start from $K_a = \frac{[\text{H}_3\text{O}^+][\text{A}^-]}{[\text{HA}]}$, take $-\log$ of both sides and rearrange: $\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}$. It assumes the initial amounts barely change by ionization, which holds when both are much larger than $K_a$.`),
    example(r`Design a pH 5.00 acetate buffer from 1.00 L of 0.10 M acetic acid`, [
      [r`\log\tfrac{[\text{A}^-]}{[\text{HA}]} = 5.00 - 4.74`, "= 0.26."],
      [r`\tfrac{[\text{A}^-]}{[\text{HA}]} = 10^{0.26} = 1.82`, ""],
      [r`n_{\text{A}^-} = 1.82(0.10) = 0.182\ \text{mol}`, ""],
      [r`m = 0.182 \times 82.03 = 14.9\ \text{g}`, "Mass of NaCH₃COO to dissolve."],
    ]),
    example(r`pH of 0.30 M NH₃ with 0.20 M NH₄Cl (NH₄⁺ pKa 9.25)`, [
      [r`\text{pH} = 9.25 + \log\tfrac{0.30}{0.20}`, "NH₃ is the base, NH₄⁺ the acid."],
      [r`= 9.43`, ""],
    ]),
    callout("warning", "Common mistake", r`Put the base on top. Writing $\log\frac{[\text{HA}]}{[\text{A}^-]}$ flips the sign of the correction. Sanity check: more base than acid must give pH above pKa.`),
    callout("application", "Where this shows up", r`Blood: the H₂CO₃/HCO₃⁻ pair has pKa 6.10 at body temperature, so pH 7.40 needs [HCO₃⁻]/[H₂CO₃] = 20. Doctors read acid–base disorders straight from this ratio.`),
  ],
  questions: [
    num(2, r`Find the pH of 0.30 M NH₃ with 0.20 M NH₄Cl (pKa 9.25), to two decimal places.`, 9.43, { tolerance: 0.01 }, ["Base over acid."], r`$9.25 + \log 1.5 = 9.43$.`),
    num(3, r`Blood buffer: pKa 6.10, pH 7.40. Find [HCO₃⁻]/[H₂CO₃], to the nearest whole number.`, 20, { tolerance: 0.5 }, ["Ratio = 10^(pH − pKa)."], r`$10^{1.30} = 20$.`),
    num(3, r`How many grams of NaCH₃COO (82.03 g/mol) must be added to 1.00 L of 0.10 M acetic acid to make a pH 5.00 buffer? One decimal place.`, 14.9, { tolerance: 0.2, unit: "g" }, ["Ratio 1.82.", "Moles × molar mass."], r`$0.182 \times 82.03 = 14.9$ g.`),
    mc(2, r`To make a pH 9.0 buffer, the best acid has pKa…`, ["4.74 (acetic)", "7.2 (H₂PO₄⁻)", "9.25 (NH₄⁺)", "3.2 (HF)"], 2, ["Closest pKa wins."], r`Within 1 unit of the target pH.`),
    mc(3, r`A buffer has [A⁻]/[HA] = 0.1. Its pH is…`, ["pKa + 1", "pKa − 1", "pKa", "10 × pKa"], 1, ["Use pH = pKa + log([A⁻]/[HA]). What is log 0.1?"], r`log 0.1 = −1.`, "review"),
  ],
});
