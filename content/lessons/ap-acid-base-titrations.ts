import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ap-acid-base-titrations",
  title: "Acid-base titrations",
  summary: "Read titration curves for strong and weak acids, find concentrations from the equivalence point, and calculate pH in each region of a weak-acid titration.",
  minutes: 45,
  objectives: [
    "Use moles at equivalence to find an unknown concentration.",
    "Calculate pH at the start, half-equivalence, equivalence and past equivalence of a weak acid titrated with NaOH.",
    "Read pKa from a curve and choose an indicator whose range covers the equivalence pH.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers", "ph-scale"],
  blocks: [
    def("Equivalence point", r`The point where moles of added base equal the moles of acid originally present: $M_aV_a = M_bV_b$ for a 1:1 reaction. For a strong acid with a strong base the solution is neutral there (pH 7). For a weak acid, the solution holds only the conjugate base A⁻, so the pH is above 7.`),
    def("The four regions of a weak-acid curve", r`(1) Start: weak acid only, use $K_a$. (2) Buffer region: HA and A⁻ both present, use Henderson–Hasselbalch. At half-equivalence [HA] = [A⁻] and pH = pKa. (3) Equivalence: A⁻ only, use $K_b = K_w/K_a$. (4) Past equivalence: excess OH⁻ controls the pH.`),
    example(r`25.0 mL of 0.100 M acetic acid (Ka 1.8 × 10⁻⁵) titrated with 0.100 M NaOH`, [
      [r`\text{Start: } [\text{H}^+] = \sqrt{K_aC}`, ""],
      [r`= 1.34\times10^{-3} \Rightarrow \text{pH } 2.87`, ""],
      [r`\text{12.5 mL: pH} = \text{p}K_a = 4.74`, "Half the acid is converted to A⁻."],
      [r`\text{25.0 mL: } [\text{A}^-] = \tfrac{0.00250}{0.0500}`, "= 0.0500 M in 50.0 mL."],
      [r`[\text{OH}^-] = \sqrt{K_b(0.0500)}`, "K_b = 5.6 × 10⁻¹⁰."],
      [r`\Rightarrow \text{pH } 8.72`, "Basic at equivalence."],
      [r`\text{35.0 mL: excess OH}^- = 0.00100\ \text{mol}`, ""],
      [r`[\text{OH}^-] = \tfrac{0.00100}{0.0600} \Rightarrow \text{pH } 12.22`, ""],
    ]),
    activity("titration", { title: "Titration curve", params: { acid: "weak", acidConc: 0.1, baseConc: 0.1, baseVolume: 12.5 } }),
    callout("tip", "Try this", r`Switch between strong and weak acid. The curves join past equivalence, but the weak acid starts higher, has a flat buffer region and a shorter, higher jump.`, "experiment"),
    def("Indicators", r`An indicator is itself a weak acid whose two forms differ in color; it changes over roughly pKa(In) ± 1. Pick one whose range covers the steep jump: phenolphthalein (8.2–10) for weak acid with strong base, methyl red (4.4–6.2) for weak base with strong acid.`),
    callout("application", "Where this shows up", r`Titrations measure acidity in wine and vinegar, nitrogen in food (Kjeldahl method) and alkalinity in water treatment.`),
  ],
  questions: [
    num(2, r`20.0 mL of HCl needs 32.0 mL of 0.125 M NaOH to reach equivalence. Find [HCl] in M.`, 0.200, { tolerance: 0.001, unit: "M" }, ["Moles NaOH = moles HCl."], r`$0.125 \times 32.0 / 20.0 = 0.200$ M.`),
    num(2, r`A weak acid's curve has pH 3.85 when half the equivalence volume has been added. What is its pKa?`, 3.85, { tolerance: 0.01 }, ["At half-equivalence [HA] = [A⁻]."], r`pH = pKa there.`),
    num(3, r`In the acetic acid example, what is the pH after 20.0 mL of NaOH? Give two decimal places.`, 5.34, { tolerance: 0.01 }, ["Moles A⁻ = 0.00200, HA left = 0.00050.", "Use Henderson–Hasselbalch."], r`$4.74 + \log 4 = 5.34$.`),
    mc(2, r`Titrating a weak acid with NaOH, the pH at equivalence is…`, ["below 7", "exactly 7", "above 7", "equal to pKa"], 2, ["What species remains?"], r`Only A⁻, a weak base.`),
    mc(3, r`Which indicator suits NH₃ titrated with HCl (equivalence pH ≈ 5.3)?`, ["phenolphthalein (8.2–10)", "methyl red (4.4–6.2)", "thymol blue (8.0–9.6)", "alizarin yellow (10–12)"], 1, ["Match the range to the equivalence pH."], r`Methyl red changes around pH 5.`, "review"),
  ],
});
