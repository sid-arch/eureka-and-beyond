import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solubility-dissolving",
  title: "Solubility and the dissolving process",
  summary: "Describe how solutes dissolve, apply 'like dissolves like', read solubility curves, and explain how temperature and pressure affect solubility.",
  minutes: 30,
  objectives: [
    "Describe dissolving at the particle level (solvation).",
    "Predict solubility with 'like dissolves like'.",
    "Classify solutions as unsaturated, saturated or supersaturated using solubility data.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  blocks: [
    def("Dissolving", r`Solvent molecules surround and pull apart solute particles. Water's partial charges pull ions out of a crystal and surround each one. Polar and ionic solutes dissolve in polar solvents; nonpolar solutes in nonpolar solvents: like dissolves like. Oil and water don't mix.`),
    def("Saturation", r`Solubility is the maximum amount that dissolves in a given amount of solvent at a given temperature, often in g per 100 g of water. Below it: unsaturated; at it: saturated; above it, for a while: supersaturated and unstable.`),
    def("Temperature and pressure", r`Most solids dissolve better in hotter water. Gases do the opposite: they're less soluble when warm (warm soda goes flat) and more soluble at higher pressure (Henry's law).`),
    example(r`KNO₃'s solubility is 64 g/100 g water at 40 °C. Is 50 g in 100 g of water at 40 °C saturated?`, [
      [r`50 < 64`, "Unsaturated: 14 g more could dissolve."],
    ]),
    callout("application", "Where this shows up", r`Carbonated drinks bottled under pressure, the bends in divers (nitrogen coming out of solution), and fish kills when warm water holds too little oxygen.`),
  ],
  questions: [
    mc(1, r`Which dissolves best in hexane (nonpolar)?`, ["salt", "sugar", "oil", "ammonia"], 2, [], r`Like dissolves like.`),
    num(2, r`A salt's solubility is 36 g/100 g water. How many grams dissolve in 250 g of water?`, 90, { unit: "g" }, [], r`$36 \times 2.5$.`),
    mc(2, r`A soda goes flat faster when warm because…`, ["sugar evaporates", "gases are less soluble at higher temperature", "pressure rises", "CO₂ reacts"], 1, [], r`Opposite to most solids.`),
    mc(3, r`Adding a seed crystal to a supersaturated solution causes…`, ["nothing", "rapid crystallization of the excess solute", "more dissolving", "boiling"], 1, [], r`It's unstable.`, "review"),
  ],
});
