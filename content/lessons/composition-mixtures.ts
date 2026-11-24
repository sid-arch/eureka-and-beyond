import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "composition-mixtures",
  title: "Composition of mixtures",
  summary: "Use elemental analysis to find the composition and purity of mixtures, solving with mass percent and mole relationships.",
  minutes: 35,
  objectives: [
    "Distinguish pure substances (fixed composition) from mixtures (variable).",
    "Find percent purity from a measured product.",
    "Solve for the composition of a two-component mixture from elemental analysis.",
  ],
  concepts: [
    { slug: "the-mole", name: "The mole", description: "6.022 × 10²³ particles; the chemist's counting unit.", subject: "subj_chem" },
  ],
  formulas: ["molar-mass-moles"],
  blocks: [
    def("Pure vs mixture", r`A pure compound always has the same mass percent of each element (law of definite proportions). A mixture's composition varies, so measuring one element's mass tells you the proportions.`),
    example(r`Heating a 2.00 g sample of impure limestone releases 0.86 g of CO₂ (CaCO₃ → CaO + CO₂). Find the percent CaCO₃`, [
      [r`m_{\text{CaCO}_3} = 0.86\ \text{g CO}_2\times\tfrac{100.09}{44.01} = 1.96\ \text{g}`, "1 : 1 mole ratio."],
      [r`\tfrac{1.96}{2.00}\times100\% \approx 98\%`, ""],
    ]),
    example(r`A 10.00 g mixture of NaCl and KCl contains 5.50 g of chlorine. Find the mass of NaCl`, [
      [r`x\tfrac{35.45}{58.44} + (10.00 - x)\tfrac{35.45}{74.55} = 5.50`, "x = grams of NaCl."],
      [r`x \approx 5.68\ \text{g NaCl}`, ""],
    ]),
    callout("application", "Where this shows up", r`Assaying ores, checking drug purity, and food labs measuring protein from nitrogen content.`),
  ],
  questions: [
    num(2, r`A 5.00 g sample of impure NaCl gives 11.48 g of AgCl (143.32 g/mol). Find the percent NaCl, to the nearest percent.`, 94, { tolerance: 1, unit: "%" }, ["All the Cl in the AgCl came from NaCl, one Cl per formula unit.", "Moles AgCl = moles NaCl; convert to grams of NaCl and divide by 5.00 g."], r`$\frac{11.48}{143.32} = 0.0801$ mol; ×58.44 = 4.68 g; 93.6%.`),
    mc(2, r`Which always has the same composition by mass?`, ["air", "brass", "water", "seawater"], 2, ["Mixtures can vary in composition; pure compounds can't."], r`A pure compound.`),
    num(3, r`A mixture of CaCO₃ and inert sand (5.00 g) loses 1.10 g as CO₂ when heated. Find the mass of CaCO₃, to two decimal places.`, 2.5, { tolerance: 0.01, unit: "g" }, ["Only the CaCO₃ releases CO₂: CaCO₃ → CaO + CO₂, 1 : 1.", "Moles CO₂ lost = moles CaCO₃ present."], r`$1.10\times\frac{100.09}{44.01} = 2.50$.`),
    mc(3, r`Elemental analysis of a mixture can find its composition because…`, ["each component has a fixed element percent", "mixtures are compounds", "mass isn't conserved", "elements change"], 0, ["Think about what is fixed for each pure component, even when the mixture's proportions vary."], r`The components' fixed compositions set up equations.`, "review"),
  ],
});
