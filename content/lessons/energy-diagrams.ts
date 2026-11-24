import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "energy-diagrams",
  title: "Energy diagrams",
  summary: "Represent endothermic and exothermic reactions with energy diagrams, read ΔH from them, and connect them to bonds broken and formed.",
  minutes: 25,
  objectives: [
    "Draw and read energy diagrams for exothermic and endothermic reactions.",
    "Read ΔH as products' energy minus reactants' energy.",
    "Relate the diagram to energy absorbed breaking bonds and released forming them.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Reading the diagram", r`Energy is on the vertical axis. If the products sit lower, energy was released: exothermic, ΔH < 0. If higher, energy was absorbed: endothermic, ΔH > 0. Breaking bonds always takes energy; forming bonds always releases it. The balance sets the sign of ΔH.`),
    example(r`Reactants at 200 kJ, products at 50 kJ, peak at 250 kJ`, [
      [r`\Delta H = 50 - 200 = -150\ \text{kJ}`, "Exothermic."],
      [r`E_a = 250 - 200 = 50\ \text{kJ}`, ""],
    ]),
    callout("application", "Where this shows up", r`Hand warmers (exothermic iron oxidation), cold packs (endothermic dissolving) and photosynthesis (endothermic, driven by light).`),
  ],
  questions: [
    num(2, r`Reactants at 80 kJ, products at 130 kJ. Find ΔH.`, 50, { unit: "kJ" }, ["ΔH = energy of products − energy of reactants."], r`Endothermic.`),
    mc(2, r`In an exothermic reaction,…`, ["bonds formed release more energy than bonds broken absorb", "no bonds break", "products have more energy", "ΔH > 0"], 0, ["Exothermic means a net release of energy. Compare the energy to break bonds with the energy released forming them."], r`Net release.`),
    mc(2, r`Breaking a chemical bond…`, ["releases energy", "requires energy", "has no energy change", "depends on the bond"], 1, ["Atoms in a bond are more stable than separated atoms. What must you supply to pull them apart?"], r`Always endothermic.`),
    mc(3, r`A catalyst changes which feature of an energy diagram?`, ["the reactants' level", "the products' level", "the height of the peak", "ΔH"], 2, ["A catalyst changes the path, not the starting or ending energy levels."], r`Lower Eₐ.`, "review"),
  ],
});
