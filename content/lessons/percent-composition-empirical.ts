import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "percent-composition-empirical",
  title: "Percent composition and empirical formulas",
  summary: "Compute percent composition by mass, find empirical formulas from percentages or masses, and find molecular formulas from molar mass.",
  minutes: 40,
  objectives: [
    "Compute percent by mass of each element in a compound.",
    "Find an empirical formula: grams → moles → simplest ratio.",
    "Find a molecular formula from the empirical formula and molar mass.",
  ],
  concepts: [
    { slug: "the-mole", name: "The mole", description: "6.022 × 10²³ particles; the chemist's counting unit.", subject: "subj_chem" },
  ],
  formulas: ["molar-mass-moles"],
  blocks: [
    def("Percent composition", r`$\%\ \text{element} = \frac{\text{mass of element in 1 mol}}{\text{molar mass}}\times100\%$. In water, $\frac{2.016}{18.015} \approx 11.19\%$ hydrogen.`),
    def("Empirical formula", r`The simplest whole-number ratio of atoms. Assume 100 g so percentages become grams, convert to moles, divide by the smallest, and multiply to clear simple fractions such as .5 or .33.`),
    example(r`A sugar is 40.0% C, 6.7% H and 53.3% O by mass; its molar mass is 180 g/mol`, [
      [r`\text{C}: \tfrac{40.0}{12.01} = 3.33\ \text{mol}`, "Moles in 100 g."],
      [r`\text{H}: \tfrac{6.7}{1.008} = 6.65\ \text{mol}`, ""],
      [r`\text{O}: \tfrac{53.3}{16.00} = 3.33\ \text{mol}`, ""],
      [r`\div 3.33:\ 1 : 2 : 1 \Rightarrow \text{CH}_2\text{O}`, "Empirical formula, 30.03 g/mol."],
      [r`\tfrac{180}{30.03} \approx 6 \Rightarrow \text{C}_6\text{H}_{12}\text{O}_6`, "Glucose."],
    ]),
    callout("application", "Where this shows up", r`Combustion analysis identifies new compounds in pharmaceutical labs, and fertilizer bags list percent N, P and K.`),
  ],
  questions: [
    num(2, r`Find the percent oxygen in CO₂, to one decimal place.`, 72.7, { tolerance: 0.1, unit: "%" }, [], r`$\frac{32.00}{44.01}$.`),
    mc(2, r`A compound is 75% C and 25% H by mass. Its empirical formula is…`, ["CH₂", "CH₃", "CH₄", "C₂H₅"], 2, [], r`$\frac{75}{12.01} = 6.24$, $\frac{25}{1.008} = 24.8$: ratio 1 : 4.`),
    num(3, r`A compound with empirical formula CH₂ has molar mass 84.16 g/mol. How many carbon atoms are in its molecular formula?`, 6, {}, [], r`$\frac{84.16}{14.03} = 6$: C₆H₁₂.`),
    mc(3, r`Which pair has the same empirical formula?`, ["C₂H₂ and C₆H₆", "CO and CO₂", "H₂O and H₂O₂", "CH₄ and C₂H₆"], 0, [], r`Both reduce to CH.`, "review"),
  ],
});
