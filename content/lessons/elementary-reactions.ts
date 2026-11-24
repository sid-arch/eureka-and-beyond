import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "elementary-reactions",
  title: "Elementary reactions and collision model",
  summary: "Write rate laws directly from elementary steps using molecularity, and use the collision model to explain orientation and energy requirements.",
  minutes: 30,
  objectives: [
    "Define elementary reactions and molecularity (uni-, bi-, termolecular).",
    "Write the rate law of an elementary step from its coefficients.",
    "Explain the energy and orientation requirements of the collision model, including the fraction e^(−Eₐ/RT).",
  ],
  concepts: [
    { slug: "kinetics", name: "Chemical kinetics", description: "Reaction rates, rate laws and what controls how fast reactions go.", subject: "subj_chem" },
  ],
  formulas: ["rate-laws"],
  blocks: [
    def("Elementary steps", r`An elementary reaction happens in a single collision, exactly as written. Only for elementary steps does the rate law follow from the coefficients: A → products, rate = k[A]; A + B → products, rate = k[A][B]; 2A → products, rate = k[A]². Three-particle collisions are rare.`),
    def("Collision model", r`Particles must collide with enough energy (at least Eₐ) and the right orientation. The fraction with enough energy is about $e^{-E_a/RT}$.`),
    example(r`Eₐ = 50 kJ/mol: fraction of collisions with enough energy`, [
      [r`298\ \text{K}: e^{-50{,}000/(8.314\cdot 298)} \approx 1.7\times10^{-9}`, ""],
      [r`308\ \text{K}: \approx 3.3\times10^{-9}`, "A 10 K rise nearly doubles it."],
    ]),
    callout("application", "Where this shows up", r`Atmospheric chemists model ozone with dozens of elementary steps; enzyme active sites work partly by holding reactants in the right orientation.`),
  ],
  questions: [
    mc(2, r`What is the rate law for the elementary step NO + O₃ → NO₂ + O₂?`, ["k[NO]", "k[NO][O₃]", "k[NO]²[O₃]", "k[NO₂][O₂]"], 1, ["For an elementary step, each reactant's coefficient becomes its exponent in the rate law."], r`Bimolecular.`),
    mc(2, r`Why can't you write an overall reaction's rate law from its coefficients?`, ["coefficients are wrong", "the overall reaction may involve several steps", "rates are constant", "it's always first order"], 1, ["The balanced overall equation may hide several steps. Which steps' coefficients actually set the rate law?"], r`Only elementary steps work that way.`),
    num(3, r`What fraction of collisions exceed Eₐ = 75 kJ/mol at 298 K? Give it in units of $10^{-14}$, to one decimal place.`, 7.1, { tolerance: 0.1 }, ["The fraction of collisions with at least Eₐ is e^(−Eₐ/RT). Use Eₐ in J/mol."], r`$e^{-75{,}000/(8.314\cdot298)} \approx 7.1\times10^{-14}$.`),
    mc(3, r`A collision with enough energy but the wrong orientation…`, ["always reacts", "doesn't react", "reacts slowly", "reverses"], 1, ["A successful collision needs two things: enough energy and the right…?"], r`Both requirements must be met.`, "review"),
  ],
});
