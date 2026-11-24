import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ph-solubility",
  title: "pH and solubility",
  summary: "Predict how pH changes the solubility of hydroxides and of salts with basic anions, and calculate solubility at a given pH.",
  minutes: 30,
  objectives: [
    "Explain why salts with basic anions (OH⁻, CO₃²⁻, F⁻) dissolve better in acid.",
    "Calculate hydroxide solubility at a fixed pH.",
    "Recognize that salts of strong-acid anions (Cl⁻, NO₃⁻) are unaffected.",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant", "ph-scale"],
  blocks: [
    def("Why pH matters", r`If a salt's anion is a base, H⁺ removes it (OH⁻ → H₂O, CO₃²⁻ → HCO₃⁻), pulling the dissolving equilibrium forward. Lower pH means more solubility. Anions of strong acids (Cl⁻) don't react with H⁺, so their salts aren't affected.`),
    example(r`Mg(OH)₂ (Ksp = 5.6 × 10⁻¹²)`, [
      [r`4s^3 = K_{sp} \Rightarrow s = 1.1\times10^{-4}\ \text{M}`, "In pure water."],
      [r`s = \tfrac{K_{sp}}{(10^{-4})^2} = 5.6\times10^{-4}\ \text{M}`, "Buffered at pH 10, so [OH⁻] is fixed at 10⁻⁴ M."],
    ]),
    callout("application", "Where this shows up", r`Acid rain dissolves limestone and marble; tooth enamel (a hydroxide mineral) erodes in acidic drinks; antacids like Mg(OH)₂ dissolve in stomach acid.`),
  ],
  questions: [
    num(3, r`Find the solubility of Mg(OH)₂ in a solution buffered at pH 9, in units of $10^{-2}$ M.`, 5.6, { tolerance: 0.01 }, ["At pH 9, pOH = 5, so [OH⁻] = 10⁻⁵ M is fixed by the buffer.", "Ksp = [Mg²⁺][OH⁻]²; solve for [Mg²⁺]."], r`$[\text{OH}^-] = 10^{-5}$; $\frac{5.6\times10^{-12}}{10^{-10}}$.`),
    mc(2, r`Which salt is more soluble in acidic solution than in pure water?`, ["AgCl", "CaCO₃", "NaNO₃", "KCl"], 1, ["Acid dissolves a salt better if its anion is a base that grabs H⁺. Which anion is basic?"], r`Carbonate is a base.`),
    mc(2, r`Lowering the pH of a saturated Mg(OH)₂ solution…`, ["decreases solubility", "increases solubility", "has no effect", "precipitates MgCl₂"], 1, ["H⁺ reacts with OH⁻. What does removing OH⁻ do to Mg(OH)₂ ⇌ Mg²⁺ + 2OH⁻?"], r`H⁺ removes OH⁻.`),
    mc(3, r`AgCl's solubility barely changes with pH because Cl⁻…`, ["is very basic", "is the conjugate base of a strong acid", "is insoluble", "is a cation"], 1, ["Does Cl⁻ react with H⁺ to any real extent? Think about what HCl does in water."], r`It has essentially no affinity for H⁺.`, "review"),
  ],
});
