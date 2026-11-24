import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ph-and-pka",
  title: "pH and pKa",
  summary: "Compare pH with pKa to predict which form of an acid dominates, and calculate the fraction ionized at a given pH.",
  minutes: 30,
  objectives: [
    "State the rule: pH < pKa favors HA; pH > pKa favors A⁻; pH = pKa gives equal amounts.",
    "Convert a pH − pKa difference into a ratio [A⁻]/[HA].",
    "Calculate the percent of an acid present in each form.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers"],
  blocks: [
    def("The ratio rule", r`Rearranging $K_a$ gives $\frac{[\text{A}^-]}{[\text{HA}]} = 10^{\,\text{pH} - \text{p}K_a}$. Every unit of pH above the pKa multiplies the ratio by 10. The pH of the solution is set by everything in it; this rule tells you how one acid distributes itself at that pH.`),
    def("Fraction ionized", r`Fraction as A⁻ $= \frac{R}{1+R}$ where $R = 10^{\,\text{pH}-\text{p}K_a}$. At pH = pKa + 1 that is 10/11 = 91%; at pKa + 2 it is 99%.`),
    example(r`Acetic acid (pKa 4.74) in a solution at pH 5.74`, [
      [r`R = 10^{5.74-4.74} = 10`, ""],
      [r`\tfrac{10}{11} = 0.909`, "91% acetate, 9% acetic acid."],
    ]),
    example(r`The same acid at pH 2.74 (stomach-like)`, [
      [r`R = 10^{-2} = 0.01`, ""],
      [r`\tfrac{0.01}{1.01} \approx 1\%`, "Almost entirely neutral HA."],
    ]),
    callout("tip", "Quick table", r`pH − pKa = −2, −1, 0, +1, +2 gives about 1%, 9%, 50%, 91%, 99% as A⁻. Indicators change color across this ±1 window, which is why their ranges span about 2 pH units.`),
    callout("application", "Where this shows up", r`Aspirin (pKa 3.5) is mostly neutral in the stomach and can cross cell membranes there; amino acids switch charge states as pH moves past each pKa, which lets electrophoresis separate proteins by charge.`),
  ],
  questions: [
    num(2, r`An acid with pKa 4.0 is in a solution of pH 6.0. Find the ratio [A⁻]/[HA].`, 100, { tolerance: 0.5 }, ["10 to the power (pH − pKa)."], r`$10^{2} = 100$.`),
    num(3, r`What percent of acetic acid (pKa 4.74) is ionized at pH 5.74? Give one decimal place.`, 90.9, { tolerance: 0.1, unit: "%" }, ["R = 10.", "Fraction = R/(1 + R)."], r`$10/11 = 90.9\%$.`),
    mc(2, r`At pH 9.0, an acid with pKa 7.0 is mostly…`, ["HA", "A⁻", "equal amounts", "fully neutral"], 1, ["pH above pKa."], r`Ratio 100:1 in favor of A⁻.`),
    mc(2, r`At what pH are HA and A⁻ present in equal amounts?`, ["pH 7", "pH = pKa", "pH = pKw", "pH 0"], 1, ["In pH = pKa + log([A⁻]/[HA]), what is log 1?"], r`log 1 = 0.`),
    mc(3, r`Phenol red has pKa 7.9. Its color changes over roughly…`, ["pH 3–5", "pH 6.9–8.9", "pH 10–12", "pH 7.9 only"], 1, ["About pKa ± 1."], r`The visible change spans pKa ± 1.`, "review"),
  ],
});
