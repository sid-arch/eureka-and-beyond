import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mole-molar-mass",
  title: "The mole and molar mass",
  summary: "Count particles with the mole, compute molar masses from the periodic table, and convert among grams, moles and particles.",
  minutes: 35,
  objectives: [
    "Define the mole: 6.022 × 10²³ particles.",
    "Compute molar mass from a formula.",
    "Convert between mass, moles and number of particles.",
  ],
  concepts: [
    { slug: "the-mole", name: "The mole", description: "6.022 × 10²³ particles; the chemist's counting unit.", subject: "subj_chem" },
  ],
  formulas: ["molar-mass-moles"],
  blocks: [
    def("The mole", r`One mole is $6.022\times10^{23}$ particles (Avogadro's number), chosen so that one mole of an element has a mass in grams equal to its atomic mass. Molar mass (g/mol) of a compound is the sum of its atoms' masses: H₂O is $2(1.008) + 16.00 = 18.02$ g/mol.`),
    def("Conversions", r`grams $\xrightarrow{\div M}$ moles $\xrightarrow{\times N_A}$ particles, and back the other way.`),
    example(r`How many moles and molecules are in 36.04 g of water?`, [
      [r`n = \tfrac{36.04}{18.02} = 2.000\ \text{mol}`, ""],
      [r`N = 2.000(6.022\times10^{23}) = 1.204\times10^{24}`, ""],
    ]),
    example(r`What is the mass of 0.250 mol of NaCl?`, [
      [r`M = 22.99 + 35.45 = 58.44\ \text{g/mol}`, ""],
      [r`m = 0.250(58.44) = 14.6\ \text{g}`, ""],
    ]),
    callout("application", "Where this shows up", r`Every recipe in a chemistry lab, drug dosages calculated per mole, and the reason a teaspoon of water holds roughly as many molecules as there are stars in the observable universe.`),
  ],
  questions: [
    num(1, r`Find the molar mass of CO₂ (C 12.01, O 16.00).`, 44.01, { tolerance: 0.01, unit: "g/mol" }, [], r`$12.01 + 2(16.00)$.`),
    num(2, r`How many molecules are in 0.500 mol of O₂, in units of $10^{23}$?`, 3.011, { tolerance: 0.001 }, [], r`$0.5 \times 6.022$.`),
    num(2, r`How many moles are in 100. g of CaCO₃ (100.09 g/mol)? Give three decimal places.`, 0.999, { tolerance: 0.0005, unit: "mol" }, [], r`$\frac{100}{100.09}$.`),
    mc(3, r`Which contains the most atoms?`, ["1 mol of He", "1 mol of H₂O", "1 mol of CH₄", "1 mol of NaCl"], 2, [], r`CH₄ has 5 atoms per molecule.`, "review"),
  ],
});
