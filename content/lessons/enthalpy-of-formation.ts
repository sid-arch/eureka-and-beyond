import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "enthalpy-of-formation",
  title: "Enthalpy of formation",
  summary: "Write formation reactions from standard-state elements, and compute ΔH°_rxn from tables of standard enthalpies of formation.",
  minutes: 35,
  objectives: [
    "Write the formation reaction of a compound (1 mol product from standard-state elements).",
    "Recognize that ΔH°_f is zero for elements in their standard states.",
    "Use ΔH°_rxn = ΣnΔH°_f(products) − ΣnΔH°_f(reactants).",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Formation reactions", r`ΔH°_f forms exactly 1 mol of a compound from its elements in their standard states (25 °C, 1 atm): for ammonia, $\frac12\text{N}_2(g) + \frac32\text{H}_2(g) \to \text{NH}_3(g)$, ΔH°_f = −46.1 kJ/mol. Fractions are allowed in formation equations.`),
    example(r`Combustion of ethanol: C₂H₅OH(l) + 3O₂ → 2CO₂ + 3H₂O(l) (ΔH°_f: C₂H₅OH −277.7, CO₂ −393.5, H₂O(l) −285.8 kJ/mol)`, [
      [r`\textstyle\sum_{prod} = 2(-393.5) + 3(-285.8) = -1644.4`, "Products."],
      [r`\Delta H^\circ = -1644.4 - (-277.7)`, "O₂ is zero."],
      [r`\Delta H^\circ = -1366.7\ \text{kJ}`, ""],
    ]),
    callout("application", "Where this shows up", r`Every thermodynamic table in engineering and the energy content of biofuels are computed this way.`),
  ],
  questions: [
    num(2, r`Find ΔH° for CaCO₃(s) → CaO(s) + CO₂(g) (ΔH°_f: CaCO₃ −1207, CaO −635, CO₂ −393.5 kJ/mol), to one decimal place.`, 178.5, { tolerance: 0.1, unit: "kJ" }, ["ΔH° = Σ ΔH°_f(products) − Σ ΔH°_f(reactants)."], r`$-635 - 393.5 + 1207$.`),
    mc(2, r`Which equation represents the standard formation of water?`, ["2H₂ + O₂ → 2H₂O(l)", "H₂(g) + ½O₂(g) → H₂O(l)", "H₂O(l) → H₂ + ½O₂", "2H + O → H₂O"], 1, ["A formation equation makes exactly 1 mol of product from elements in their standard states."], r`One mole of product from standard-state elements.`),
    mc(2, r`ΔH°_f of Br₂(l) is…`, ["0", "positive", "negative", "undefined"], 0, ["What is ΔH°_f for any element in its standard state? What state is bromine in at 25 °C?"], r`Bromine is a liquid at standard conditions.`),
    mc(3, r`Why is ΔH°_f of Br₂(g) not zero?`, ["it's an element", "gas is not bromine's standard state", "it's unstable", "it's a compound"], 1, ["Compare Br₂(g) with bromine's standard state at 25 °C. What extra step is needed to make the gas?"], r`It includes vaporization.`, "review"),
  ],
});
