import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "classifying-matter",
  title: "Classifying matter",
  summary: "Sort matter into elements, compounds and mixtures, tell homogeneous from heterogeneous mixtures, and choose separation methods.",
  minutes: 25,
  objectives: [
    "Distinguish elements, compounds and mixtures.",
    "Tell homogeneous mixtures (solutions) from heterogeneous ones.",
    "Choose a method to separate a mixture: filtration, distillation, evaporation or chromatography.",
  ],
  concepts: [
    { slug: "matter", name: "Matter", description: "Anything with mass and volume, classified as pure substances or mixtures.", subject: "subj_chem" },
  ],
  blocks: [
    def("Pure substances", r`An element contains only one kind of atom (iron, oxygen gas). A compound has two or more elements chemically combined in a fixed ratio (water is always 2 H : 1 O by atoms) and can only be separated by chemical reactions.`),
    def("Mixtures", r`A mixture is a physical combination in any proportion. Homogeneous mixtures (solutions such as salt water, air or brass) look uniform throughout. Heterogeneous mixtures (salad, sand in water) have visibly different parts.`),
    def("Separating mixtures", r`Filtration removes undissolved solids; evaporation recovers a dissolved solid; distillation separates liquids by boiling point; chromatography separates by how strongly components stick to a surface.`),
    example(r`A mixture contains 20 g of salt dissolved in 80 g of water`, [
      [r`\text{mass percent salt} = \tfrac{20}{20 + 80}\times100\% = 20\%`, "A homogeneous mixture; evaporation recovers the salt."],
    ]),
    callout("application", "Where this shows up", r`Water treatment plants filter, settle and disinfect; oil refineries use fractional distillation; forensic labs use chromatography to identify inks and drugs.`),
  ],
  questions: [
    mc(1, r`Which is a compound?`, ["oxygen gas", "salt water", "carbon dioxide", "brass"], 2, [], r`CO₂ has two elements chemically combined.`),
    mc(2, r`Air is best classified as…`, ["an element", "a compound", "a homogeneous mixture", "a heterogeneous mixture"], 2, [], r`Uniform, with variable composition.`),
    num(2, r`15 g of sugar dissolves in 135 g of water. Find the mass percent of sugar.`, 10, { unit: "%" }, [], r`$\frac{15}{150}\times100$.`),
    mc(3, r`To separate ethanol (bp 78 °C) from water, the best method is…`, ["filtration", "distillation", "a magnet", "decanting"], 1, [], r`Different boiling points.`, "review"),
  ],
});
