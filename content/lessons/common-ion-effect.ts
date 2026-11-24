import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "common-ion-effect",
  title: "Common-ion effect",
  summary: "Explain and calculate how a common ion lowers the solubility of a salt or the ionization of a weak acid.",
  minutes: 30,
  objectives: [
    "Explain the common-ion effect with Le Châtelier's principle.",
    "Calculate reduced solubility in a solution containing a common ion.",
    "Connect the effect to buffers (a weak acid with its conjugate base).",
  ],
  concepts: [
    { slug: "equilibrium", name: "Chemical equilibrium", description: "The balance of forward and reverse reactions and how it responds to change.", subject: "subj_chem" },
  ],
  formulas: ["equilibrium-constant"],
  blocks: [
    def("The effect", r`Adding an ion already in an equilibrium shifts it away from that ion. A salt dissolves less in a solution that already contains one of its ions, and a weak acid ionizes less when its conjugate base is present (the basis of buffers).`),
    example(r`AgCl (Ksp = 1.8 × 10⁻¹⁰) in 0.10 M NaCl`, [
      [r`[\text{Cl}^-] \approx 0.10,\ [\text{Ag}^+] = s`, ""],
      [r`s = \tfrac{1.8\times10^{-10}}{0.10} = 1.8\times10^{-9}\ \text{M}`, "About 7000 times less than in pure water."],
    ]),
    callout("application", "Where this shows up", r`Salting out soap in manufacturing, and gravimetric analysis, where excess reagent is added to precipitate an ion completely.`),
  ],
  questions: [
    num(3, r`Find the solubility of CaF₂ (Ksp = 3.9 × 10⁻¹¹) in 0.10 M NaF, in units of $10^{-9}$ M.`, 3.9, { tolerance: 0.01 }, ["CaF₂ → Ca²⁺ + 2F⁻. The F⁻ already present (0.10 M) dwarfs what dissolves.", "Ksp ≈ s(0.10)²."], r`$s(0.10)^2 = 3.9\times10^{-11}$.`),
    mc(2, r`Adding NaCl to a saturated AgCl solution causes…`, ["more AgCl to dissolve", "AgCl to precipitate", "no change", "AgCl to melt"], 1, ["NaCl adds Cl⁻. Compare the new Q for AgCl with Ksp."], r`Q > Ksp.`),
    mc(2, r`Adding sodium acetate to acetic acid makes the pH…`, ["fall", "rise", "stay the same", "reach 7"], 1, ["Acetate is a product of acetic acid's ionization. Which way does adding it shift that equilibrium?"], r`Less ionization means less H⁺.`),
    mc(3, r`The common-ion effect is an application of…`, ["Hess's law", "Le Châtelier's principle", "Charles's law", "the Pauli principle"], 1, ["Adding a common ion is a stress on an equilibrium. Which principle predicts the response?"], r`A stress shifts the equilibrium.`, "review"),
  ],
});
