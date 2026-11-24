import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "enthalpy-calorimetry",
  title: "Enthalpy and calorimetry",
  summary: "Use enthalpy change ΔH with thermochemical equations, measure ΔH with a coffee-cup calorimeter, and combine reactions with Hess's law.",
  minutes: 40,
  objectives: [
    "Interpret ΔH and its sign in thermochemical equations.",
    "Calculate ΔH from calorimetry data: q_rxn = −q_solution.",
    "Use Hess's law to add reactions and their ΔH values.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Enthalpy", r`ΔH is the heat absorbed by a reaction at constant pressure; negative means exothermic. In $\text{CH}_4 + 2\text{O}_2 \to \text{CO}_2 + 2\text{H}_2\text{O}$, ΔH = −890 kJ: that much heat per mole of CH₄ as written. Doubling the equation doubles ΔH; reversing it flips the sign.`),
    def("Calorimetry", r`In a coffee-cup calorimeter, the reaction's heat goes into the solution: $q_{rxn} = -q_{soln} = -mc\Delta T$. Then $\Delta H = \frac{q_{rxn}}{n}$.`),
    example(r`50.0 mL of 1.00 M HCl and 50.0 mL of 1.00 M NaOH mix; the temperature rises 6.7 °C`, [
      [r`q_{soln} = 100.0(4.184)(6.7) \approx 2800\ \text{J}`, "About 100 g of solution."],
      [r`n = 0.0500\ \text{mol of water formed}`, ""],
      [r`\Delta H = \tfrac{-2.80\ \text{kJ}}{0.0500\ \text{mol}} \approx -56\ \text{kJ/mol}`, ""],
    ]),
    def("Hess's law", r`If a reaction is the sum of steps, its ΔH is the sum of their ΔH values, whatever the path.`),
    callout("application", "Where this shows up", r`Food calorie values come from bomb calorimetry; engineers compare fuels by kJ per gram; Hess's law gives ΔH for reactions too slow or dangerous to measure.`),
  ],
  questions: [
    num(2, r`2H₂ + O₂ → 2H₂O has ΔH = −572 kJ. Find ΔH for forming 1 mol of water.`, -286, { unit: "kJ" }, [], r`Halve the equation.`),
    num(3, r`Dissolving 2.00 g of NH₄NO₃ (80.04 g/mol) in water drops the temperature of 100. g of solution by 1.53 °C. Find ΔH in kJ/mol, to one decimal place.`, 25.6, { tolerance: 0.1, unit: "kJ/mol" }, [], r`$q_{soln} = 100(4.184)(-1.53) = -640$ J, so $q_{rxn} = +640$ J; $n = \frac{2.00}{80.04} = 0.0250$ mol; $\Delta H = \frac{0.640}{0.0250} \approx +25.6$ kJ/mol (endothermic).`),
    mc(2, r`If A → B has ΔH = +40 kJ, then B → A has ΔH =`, ["+40 kJ", "−40 kJ", "0", "+80 kJ"], 1, [], r`Reversing flips the sign.`),
    mc(3, r`A calorimeter's temperature rises. The reaction is…`, ["endothermic", "exothermic", "neither", "impossible to tell"], 1, [], r`It released heat into the solution.`, "review"),
  ],
});
