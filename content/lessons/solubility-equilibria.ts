import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solubility-equilibria",
  title: "Introduction to solubility equilibria",
  summary: "Write Ksp expressions, convert between Ksp and molar solubility, and predict precipitation by comparing Q with Ksp.",
  minutes: 40,
  objectives: [
    "Write Ksp expressions for slightly soluble salts.",
    "Convert between Ksp and molar solubility s.",
    "Predict whether a precipitate forms (Q > Ksp).",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("Ksp", r`For AgCl(s) ⇌ Ag⁺ + Cl⁻, $K_{sp} = [\text{Ag}^+][\text{Cl}^-]$ (the solid is left out). For CaF₂ ⇌ Ca²⁺ + 2F⁻, $K_{sp} = [\text{Ca}^{2+}][\text{F}^-]^2$. If s mol/L dissolves, then for AgCl $K_{sp} = s^2$ and for CaF₂ $K_{sp} = s(2s)^2 = 4s^3$.`),
    example(r`AgCl (Ksp = 1.8 × 10⁻¹⁰) and CaF₂ (Ksp = 3.9 × 10⁻¹¹)`, [
      [r`\text{AgCl}: s = \sqrt{1.8\times10^{-10}} = 1.3\times10^{-5}\ \text{M}`, "About 1.9 mg per liter."],
      [r`\text{CaF}_2: s = \sqrt[3]{\tfrac{3.9\times10^{-11}}{4}} = 2.1\times10^{-4}\ \text{M}`, "More soluble despite its smaller Ksp."],
    ]),
    def("Predicting precipitation", r`Compute Q from the ion concentrations after mixing. Q > Ksp: precipitate forms. Q < Ksp: no precipitate. Q = Ksp: saturated.`),
    callout("application", "Where this shows up", r`Kidney stones, hard-water scale, fluoride strengthening tooth enamel, and barium sulfate X-ray contrast (very low Ksp, so safe).`),
  ],
  questions: [
    num(2, r`BaSO₄ has s = 1.05 × 10⁻⁵ M. Find Ksp, in units of $10^{-10}$, to one decimal place.`, 1.1, { tolerance: 0.01 }, ["BaSO₄ → Ba²⁺ + SO₄²⁻, so both ions have concentration s.", "Ksp = [Ba²⁺][SO₄²⁻]."], r`$s^2$.`),
    num(3, r`Find the molar solubility of Ag₂CrO₄ (Ksp = 1.1 × 10⁻¹²), in units of $10^{-5}$ M, to one decimal place.`, 6.5, { tolerance: 0.1 }, ["Ag₂CrO₄ → 2Ag⁺ + CrO₄²⁻: [Ag⁺] = 2s, [CrO₄²⁻] = s.", "Ksp = (2s)²(s) = 4s³; solve for s."], r`$4s^3 = 1.1\times10^{-12}$.`),
    mc(2, r`Equal volumes of 0.010 M Pb(NO₃)₂ and 0.020 M KI are mixed (PbI₂ Ksp = 9.8 × 10⁻⁹). A precipitate…`, ["forms, because Q = 5 × 10⁻⁷ > Ksp", "doesn't form", "forms only when heated", "can't be predicted"], 0, ["Mixing equal volumes halves each concentration.", "Q = [Pb²⁺][I⁻]²; compare with Ksp."], r`After mixing: 0.0050 M Pb²⁺ and 0.010 M I⁻; $Q = 0.005(0.01)^2$.`),
    mc(3, r`Comparing solubilities with Ksp alone is valid only when the salts…`, ["have the same ion ratio", "are both chlorides", "have similar mass", "are colorless"], 0, ["The formula for s from Ksp depends on how many ions each salt makes."], r`Different formulas give different s expressions.`, "review"),
  ],
});
