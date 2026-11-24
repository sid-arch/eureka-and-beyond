import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ph-poh",
  title: "pH and pOH",
  summary: "Use the self-ionization of water, compute pH and pOH from concentrations and back, and interpret the logarithmic pH scale.",
  minutes: 35,
  objectives: [
    "Use Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C.",
    "Compute pH = −log[H⁺], pOH = −log[OH⁻] and pH + pOH = 14.",
    "Convert pH back to [H⁺] = 10^(−pH), and interpret factor-of-10 changes.",
  ],
  concepts: [
    { slug: "acids-bases", name: "Acids and bases", description: "Proton donors and acceptors, pH and neutralization.", subject: "subj_chem" },
  ],
  formulas: ["ph-scale"],
  blocks: [
    def("Water and Kw", r`Water ionizes slightly: $[\text{H}^+][\text{OH}^-] = 1.0\times10^{-14}$ at 25 °C. Neutral water has both at $10^{-7}$ M, pH 7. Acidic: pH < 7; basic: pH > 7.`),
    example(r`[OH⁻] = 2.5 × 10⁻⁴ M`, [
      [r`\text{pOH} = -\log(2.5\times10^{-4}) \approx 3.60`, ""],
      [r`\text{pH} = 14 - 3.60 = 10.40`, "Basic."],
    ]),
    example(r`A solution has pH 4.50. Find [H⁺]`, [
      [r`[\text{H}^+] = 10^{-4.50} \approx 3.2\times10^{-5}\ \text{M}`, ""],
    ]),
    callout("note", "A log scale", r`Each pH unit is a factor of 10 in [H⁺]: pH 3 is 100 times more acidic than pH 5.`),
    callout("application", "Where this shows up", r`Blood is held near pH 7.4; swimming pools are kept at 7.2–7.8; acid rain is below 5.6.`),
  ],
  questions: [
    num(1, r`Find the pH of 0.001 M HCl.`, 3, {}, [], r`$[\text{H}^+] = 10^{-3}$.`),
    num(2, r`Find the pH of 0.020 M NaOH, to two decimal places.`, 12.3, { tolerance: 0.01 }, [], r`$\text{pOH} = 1.70$, so pH = 12.30.`),
    num(2, r`How many times more [H⁺] does pH 2 have than pH 5?`, 1000, {}, [], r`$10^3$.`),
    mc(3, r`[H⁺] = 1 × 10⁻⁹ M. The solution is…`, ["acidic", "neutral", "basic", "impossible"], 2, [], r`pH 9.`, "review"),
  ],
});
