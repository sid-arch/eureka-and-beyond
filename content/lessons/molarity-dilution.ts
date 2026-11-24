import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "molarity-dilution",
  title: "Molarity and dilution",
  summary: "Calculate molarity, prepare solutions from solids, and dilute stock solutions with M₁V₁ = M₂V₂.",
  minutes: 30,
  objectives: [
    "Calculate molarity, M = mol solute / L solution.",
    "Find the mass of solute needed to make a solution.",
    "Use M₁V₁ = M₂V₂ for dilutions.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  formulas: ["molarity-dilution"],
  blocks: [
    def("Molarity", r`$M = \frac{\text{moles of solute}}{\text{liters of solution}}$. Note: liters of solution, not of solvent. To make a solution, dissolve the solute and then add water up to the final volume.`),
    example(r`5.85 g of NaCl is dissolved to make 250.0 mL of solution`, [
      [r`n = \tfrac{5.85}{58.44} = 0.100\ \text{mol}`, ""],
      [r`M = \tfrac{0.100}{0.2500} = 0.400\ \text{M}`, ""],
    ]),
    def("Dilution", r`Adding water doesn't change the moles of solute: $M_1V_1 = M_2V_2$.`),
    example(r`Dilute 50.0 mL of 2.0 M HCl to 0.50 M`, [
      [r`V_2 = \tfrac{2.0(50.0)}{0.50} = 200\ \text{mL}`, "Add water to a total of 200 mL."],
    ]),
    callout("warning", "Safety", r`When diluting concentrated acids, add acid to water, never water to acid: the heat released can make water boil and spatter.`),
    callout("application", "Where this shows up", r`IV saline (0.154 M NaCl), blood tests reported in mmol/L, and lab stock solutions diluted for each experiment.`),
  ],
  questions: [
    num(2, r`How many grams of NaOH (40.00 g/mol) make 500. mL of 0.200 M solution?`, 4, { tolerance: 0.01, unit: "g" }, [], r`$0.200(0.500)(40.00)$.`),
    num(2, r`25.0 mL of 6.0 M H₂SO₄ is diluted to 300. mL. Find the new molarity.`, 0.5, { unit: "M" }, [], r`$\frac{6.0(25.0)}{300}$.`),
    num(2, r`How many moles of solute are in 75.0 mL of 0.40 M KCl?`, 0.03, { tolerance: 0.0001, unit: "mol" }, [], r`$0.40 \times 0.0750$.`),
    mc(3, r`Dissolving 1 mol of sugar in 1 L of water gives a concentration that is…`, ["exactly 1 M", "slightly less than 1 M", "slightly more than 1 M", "2 M"], 1, [], r`The final volume is more than 1 L.`, "review"),
  ],
});
