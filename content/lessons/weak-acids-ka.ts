import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "weak-acids-ka",
  title: "Weak acids, weak bases and Ka",
  summary: "Write Ka and Kb expressions, compute the pH of weak acid and base solutions with ICE tables, find percent ionization, and use KaKb = Kw.",
  minutes: 45,
  objectives: [
    "Write Ka and Kb expressions and relate them by KaKb = Kw.",
    "Compute the pH of weak acid and weak base solutions.",
    "Compute percent ionization and explain how it changes with dilution.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["weak-acids-buffers", "ph-scale"],
  blocks: [
    def("Ka", r`For HA ⇌ H⁺ + A⁻, $K_a = \frac{[\text{H}^+][\text{A}^-]}{[\text{HA}]}$. A larger Ka means a stronger acid; $\text{p}K_a = -\log K_a$. For a weak base, $K_b = \frac{[\text{BH}^+][\text{OH}^-]}{[\text{B}]}$, and for a conjugate pair $K_aK_b = K_w = 1.0\times10^{-14}$.`),
    example(r`pH of 0.10 M acetic acid (Ka = 1.8 × 10⁻⁵)`, [
      [r`\tfrac{x^2}{0.10 - x} = 1.8\times10^{-5},\ x \ll 0.10`, ""],
      [r`x = \sqrt{1.8\times10^{-6}} = 1.34\times10^{-3}\ \text{M}`, "1.3% of 0.10: the approximation is fine."],
      [r`\text{pH} = 2.87`, ""],
    ]),
    example(r`pH of 0.10 M ammonia (Kb = 1.8 × 10⁻⁵)`, [
      [r`[\text{OH}^-] = 1.34\times10^{-3} \Rightarrow \text{pOH} = 2.87`, ""],
      [r`\text{pH} = 14 - 2.87 = 11.13`, ""],
    ]),
    activity("titration", { title: "Weak acid at the start of a titration", params: { acid: "weak", acidConc: 0.1, baseConc: 0.1, baseVolume: 0 } }),
    callout("application", "Where this shows up", r`Vinegar, citric acid and the carbonic acid in blood are weak acids; aspirin's pKa decides where in your digestive tract it's absorbed.`),
  ],
  questions: [
    num(2, r`Find the pH of 0.050 M HF (Ka = 6.8 × 10⁻⁴), solving exactly. Two decimal places.`, 2.26, { tolerance: 0.01 }, [], r`$x^2 + 6.8\times10^{-4}x - 3.4\times10^{-5} = 0$ gives $x \approx 5.5\times10^{-3}$.`),
    num(2, r`Find Kb of acetate (acetic acid Ka = 1.8 × 10⁻⁵), in units of $10^{-10}$, to two decimal places.`, 5.56, { tolerance: 0.01 }, [], r`$\frac{10^{-14}}{1.8\times10^{-5}}$.`),
    num(3, r`Find the percent ionization of 0.010 M acetic acid, to one decimal place.`, 4.2, { tolerance: 0.1, unit: "%" }, [], r`$x = \sqrt{1.8\times10^{-7}} = 4.24\times10^{-4}$, about 4.2% (higher than at 0.10 M).`),
    mc(3, r`Diluting a weak acid makes its percent ionization…`, ["decrease", "increase", "stay the same", "zero"], 1, [], r`Le Châtelier: more particles in solution are favored.`, "review"),
  ],
});
