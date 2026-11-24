import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "limiting-reactant",
  title: "Limiting reactant and percent yield",
  summary: "Use mole ratios to find which reactant runs out first, how much product can form, what's left over, and the percent yield.",
  minutes: 40,
  objectives: [
    "Convert between mass and moles using molar mass.",
    "Identify the limiting and excess reactants from given amounts.",
    "Calculate theoretical yield, leftover excess reactant and percent yield.",
  ],
  concepts: [
    { slug: "stoichiometry", name: "Stoichiometry", description: "Quantitative relationships between reactants and products in a balanced equation.", subject: "subj_chem" },
    { slug: "the-mole", name: "The mole", description: "6.022 × 10²³ particles; the chemist's counting unit.", subject: "subj_chem" },
  ],
  formulas: ["molar-mass-moles", "percent-yield"],
  blocks: [
    text(r`A balanced equation is a recipe in moles. $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$ says that 2 mol of hydrogen react with exactly 1 mol of oxygen to make 2 mol of water. If you have more of one reactant than the recipe needs, the other runs out first and limits how much product you can make.`),
    def("Limiting reactant", r`The reactant that is completely used up first. It determines the maximum amount of product, the theoretical yield. The other reactant is in excess.`),
    formula(r`n = \frac{m}{M}`, "Mass to moles", r`Molar masses: H₂ = 2.016 g/mol, O₂ = 32.00 g/mol, H₂O = 18.02 g/mol.`),
    example(r`10.0 g H₂ reacts with 64.0 g O₂. Find the limiting reactant and the mass of water formed.`, [
      [r`n_{\text{H}_2} = \frac{10.0}{2.016} = 4.96\ \text{mol},\quad n_{\text{O}_2} = \frac{64.0}{32.00} = 2.00\ \text{mol}`, "Convert to moles."],
      [r`\text{O}_2 \text{ needed for all H}_2 = \frac{4.96}{2} = 2.48\ \text{mol}`, "The ratio is 2 H₂ : 1 O₂."],
      [r`2.48 > 2.00 \Rightarrow \text{O}_2 \text{ is limiting}`, "There isn't enough oxygen."],
      [r`n_{\text{H}_2\text{O}} = 2 \times 2.00 = 4.00\ \text{mol}`, "1 O₂ makes 2 H₂O."],
      [r`m = 4.00 \times 18.02 = 72.1\ \text{g}`, "Theoretical yield."],
    ], r`Mass is conserved: H₂ used $= 4.00$ mol $\times 2.016 = 8.06$ g, so $8.06 + 64.0 = 72.1$ g of water, with $10.0 - 8.06 = 1.94$ g of H₂ left over.`),
    callout("tip", "A quick test", r`Divide each reactant's moles by its coefficient. The smallest result is the limiting reactant. Here H₂: $\frac{4.96}{2} = 2.48$; O₂: $\frac{2.00}{1} = 2.00$, so O₂ limits.`),
    formula(r`\text{percent yield} = \frac{\text{actual}}{\text{theoretical}} \times 100\%`, "Percent yield", r`Real reactions lose product to side reactions, incomplete reaction and handling, so the actual yield is usually less than theoretical.`),
    callout("application", "Where this shows up", r`Pharmaceutical manufacturers add the cheaper reagent in excess so the expensive one is fully converted. Rocket engines are tuned to a fuel-oxidizer ratio for the same reason.`),
    activity("stoichiometry", { title: "Mix hydrogen and oxygen" }),
    callout("tip", "Investigate", r`Find the exact amounts of H₂ and O₂ (in moles) that leave nothing over. What ratio do they always have? Then give 3 mol H₂ and 3 mol O₂: which is limiting and how much is left?`, "experiment"),
  ],
  questions: [
    num(1, r`How many moles are in 36.04 g of water (18.02 g/mol)?`, 2, { tolerance: 0.001, unit: "mol" }, [r`$n = m/M$.`], r`$36.04 / 18.02 = 2.000$ mol.`),
    mc(2, r`For $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$, which is limiting with 3.0 mol H₂ and 2.0 mol O₂?`, ["H₂", "O₂", "Neither", "Both"], 0,
      ["Divide moles by coefficients: H₂ 3.0/2, O₂ 2.0/1."], r`H₂: 1.5; O₂: 2.0. The smaller value is H₂, so H₂ runs out first.`),
    num(2, r`With 3.0 mol H₂ and 2.0 mol O₂, how many moles of water form?`, 3, { tolerance: 0.001, unit: "mol" }, ["Use the limiting reactant, H₂: 2 H₂ → 2 H₂O."], r`3.0 mol H₂ × (2 H₂O / 2 H₂) = 3.0 mol H₂O.`),
    num(2, r`In that reaction, how many moles of O₂ are left over?`, 0.5, { tolerance: 0.001, unit: "mol" }, ["3.0 mol H₂ uses 1.5 mol O₂."], r`$2.0 - 1.5 = 0.5$ mol O₂ remains.`),
    num(3, r`A reaction has a theoretical yield of 72.1 g, but 65.0 g is collected. What is the percent yield? (one decimal)`, 90.2, { tolerance: 0.1, unit: "%" },
      ["actual ÷ theoretical × 100."], r`$\frac{65.0}{72.1} \times 100 \approx 90.2\%$.`, "review"),
  ],
});
