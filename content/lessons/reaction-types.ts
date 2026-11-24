import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reaction-types",
  title: "Types of chemical reactions",
  summary: "Classify reactions as synthesis, decomposition, single replacement, double replacement or combustion, and predict products using the activity series and solubility rules.",
  minutes: 35,
  objectives: [
    "Classify reactions into the five basic types.",
    "Predict single-replacement products with the activity series.",
    "Predict double-replacement products and precipitates with solubility rules.",
  ],
  concepts: [
    { slug: "chemical-reactions", name: "Chemical reactions", description: "How substances rearrange into new ones, described by balanced equations.", subject: "subj_chem" },
  ],
  blocks: [
    def("Five patterns", r`Synthesis: A + B → AB. Decomposition: AB → A + B. Single replacement: A + BC → AC + B. Double replacement: AB + CD → AD + CB. Combustion: a fuel + O₂ → CO₂ + H₂O (for hydrocarbons).`),
    def("Activity series", r`A metal replaces another metal (or H) only if it is more active: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au. Zinc displaces copper from CuSO₄; copper does nothing in ZnSO₄.`),
    def("Precipitates", r`A double replacement goes forward when it forms a precipitate, a gas or water. All nitrates and Group 1 and ammonium compounds are soluble; most chlorides are soluble except those of Ag⁺, Pb²⁺ and Hg₂²⁺.`),
    example(r`Silver nitrate and sodium chloride solutions are mixed`, [
      [r`\text{AgNO}_3(aq) + \text{NaCl}(aq) \to`, "Double replacement: the ions swap partners."],
      [r`\text{AgCl}(s) + \text{NaNO}_3(aq)`, "AgCl precipitates as a white solid."],
    ]),
    callout("application", "Where this shows up", r`Water softening (precipitating calcium), galvanizing steel with zinc (the more active metal corrodes first), and every flame from gas stoves to rockets.`),
  ],
  questions: [
    mc(1, r`2H₂O → 2H₂ + O₂ is…`, ["synthesis", "decomposition", "combustion", "single replacement"], 1, [], r`One reactant breaks apart.`),
    mc(2, r`Will copper metal react with zinc sulfate solution?`, ["yes, forming CuSO₄", "no, copper is less active than zinc", "yes, producing H₂", "only when heated"], 1, [], r`Check the activity series.`),
    mc(2, r`Which pair of solutions forms a precipitate?`, ["NaCl + KNO₃", "AgNO₃ + KCl", "NaNO₃ + KCl", "NH₄Cl + NaNO₃"], 1, [], r`AgCl is insoluble.`),
    mc(3, r`What are the products of burning methane completely?`, ["C + H₂O", "CO + H₂", "CO₂ + H₂O", "CO₂ + H₂"], 2, [], r`Complete hydrocarbon combustion.`, "review"),
  ],
});
