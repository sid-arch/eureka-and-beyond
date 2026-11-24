import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "enthalpy-of-reaction",
  title: "Introduction to enthalpy of reaction",
  summary: "Interpret ΔH_rxn per mole of reaction as written, and use stoichiometry to find the heat released or absorbed by a given amount of reactant.",
  minutes: 30,
  objectives: [
    "Read ΔH as the heat per mole of reaction as written.",
    "Convert grams of a reactant into heat using the coefficients.",
    "Find ΔH from a measured heat and the amount reacted.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Per mole of reaction", r`In $2\text{H}_2 + \text{O}_2 \to 2\text{H}_2\text{O}$, ΔH = −572 kJ means 572 kJ is released when 2 mol of H₂ react with 1 mol of O₂. That's −286 kJ per mole of H₂.`),
    example(r`Heat released when 10.0 g of H₂ burns`, [
      [r`n = \tfrac{10.0}{2.016} = 4.96\ \text{mol H}_2`, ""],
      [r`q = 4.96\ \text{mol}\times\tfrac{-572\ \text{kJ}}{2\ \text{mol H}_2} \approx -1420\ \text{kJ}`, ""],
    ]),
    callout("application", "Where this shows up", r`Rocket designers choose fuels by heat per kilogram; hydrogen releases about 142 kJ per gram, three times as much as gasoline.`),
  ],
  questions: [
    num(2, r`CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −890 kJ. How much heat comes from 8.02 g of CH₄ (16.04 g/mol)?`, -445, { unit: "kJ" }, ["Find moles of CH₄; ΔH is per mole of CH₄ as written.", "Released heat carries a negative sign."], r`0.500 mol × −890.`),
    num(3, r`N₂ + 3H₂ → 2NH₃, ΔH = −92 kJ. How much heat is released forming 34.0 g of NH₃ (17.03 g/mol)?`, 92, { tolerance: 0.5, unit: "kJ" }, ["The equation makes 2 mol NH₃ per 92 kJ. How many moles of NH₃ is 34.0 g?"], r`2.00 mol NH₃ is one mole of reaction.`),
    mc(2, r`ΔH = +180 kJ for N₂ + O₂ → 2NO. Forming 4 mol of NO requires…`, ["180 kJ", "360 kJ", "90 kJ", "720 kJ"], 1, ["The given ΔH is for making 2 mol NO. How many times does the reaction run to make 4 mol?"], r`Twice the reaction.`),
    mc(3, r`If an equation is multiplied by 3, ΔH…`, ["stays the same", "triples", "changes sign", "is divided by 3"], 1, ["ΔH scales with the amount of reaction."], r`Enthalpy is extensive.`, "review"),
  ],
});
