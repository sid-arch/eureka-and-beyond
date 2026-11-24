import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mole-ratio-stoichiometry",
  title: "Mole ratios and stoichiometry",
  summary: "Use mole ratios from balanced equations to convert between amounts of reactants and products, with the grams → moles → moles → grams path.",
  minutes: 35,
  objectives: [
    "Read mole ratios from a balanced equation.",
    "Convert mass of one substance to mass of another through moles.",
    "Check answers with conservation of mass.",
  ],
  concepts: [
    { slug: "stoichiometry", name: "Stoichiometry", description: "Quantitative relationships between reactants and products in a balanced equation.", subject: "subj_chem" },
  ],
  formulas: ["molar-mass-moles"],
  blocks: [
    def("Mole ratios", r`Coefficients in a balanced equation give mole ratios, not mass ratios. In $2\text{H}_2 + \text{O}_2 \to 2\text{H}_2\text{O}$, 2 mol of H₂ react with 1 mol of O₂ to make 2 mol of H₂O.`),
    def("The path", r`grams A $\xrightarrow{\div M_A}$ mol A $\xrightarrow{\times\text{ratio}}$ mol B $\xrightarrow{\times M_B}$ grams B.`),
    example(r`What mass of CO₂ forms when 10.0 g of methane burns? CH₄ + 2O₂ → CO₂ + 2H₂O`, [
      [r`n_{\text{CH}_4} = \tfrac{10.0}{16.04} = 0.623\ \text{mol}`, ""],
      [r`n_{\text{CO}_2} = 0.623\ \text{mol}`, "A 1 : 1 ratio."],
      [r`m = 0.623(44.01) \approx 27.4\ \text{g}`, ""],
    ]),
    activity("stoichiometry", { title: "Reactant amounts and products" }),
    callout("application", "Where this shows up", r`Pharmaceutical manufacturing, airbag design (how much NaN₃ gives enough N₂) and spacecraft life support that scrubs CO₂ with LiOH.`),
  ],
  questions: [
    num(2, r`In 2H₂ + O₂ → 2H₂O, how many moles of O₂ react with 6 mol of H₂?`, 3, { unit: "mol" }, [], r`Ratio 1 : 2.`),
    num(2, r`How many grams of water form from 4.00 g of H₂ with excess O₂? Give one decimal place.`, 35.8,{ tolerance: 0.1, unit: "g" }, [], r`$\frac{4.00}{2.016} = 1.984$ mol H₂, so 1.984 mol H₂O $\times 18.02$.`),
    num(3, r`2KClO₃ → 2KCl + 3O₂. How many grams of O₂ come from 24.5 g of KClO₃ (122.55 g/mol)? Give two decimal places.`, 9.6, { tolerance: 0.02, unit: "g" }, [], r`$0.1999$ mol $\times \frac32 = 0.300$ mol $\times 32.00$.`),
    mc(3, r`Coefficients in a balanced equation give ratios of…`, ["masses", "moles", "volumes of liquids", "densities"], 1, [], r`They count particles.`, "review"),
  ],
});
