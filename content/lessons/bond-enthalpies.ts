import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "bond-enthalpies",
  title: "Bond enthalpies",
  summary: "Estimate ΔH_rxn from average bond enthalpies: energy to break reactant bonds minus energy released forming product bonds.",
  minutes: 35,
  objectives: [
    "Count the bonds broken and formed using Lewis structures.",
    "Estimate ΔH ≈ Σ(bonds broken) − Σ(bonds formed).",
    "Explain why bond-enthalpy estimates differ from measured values.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  blocks: [
    def("The estimate", r`$\Delta H \approx \sum D(\text{broken}) - \sum D(\text{formed})$. Average values (kJ/mol): C–H 413, O=O 498, C=O (in CO₂) 799, O–H 463, H–H 436, Cl–Cl 243, H–Cl 431.`),
    example(r`CH₄ + 2O₂ → CO₂ + 2H₂O(g)`, [
      [r`\text{broken: } 4(413) + 2(498) = 2648\ \text{kJ}`, ""],
      [r`\text{formed: } 2(799) + 4(463) = 3450\ \text{kJ}`, ""],
      [r`\Delta H \approx 2648 - 3450 = -802\ \text{kJ}`, "The measured value is −802 kJ for water vapor."],
    ]),
    callout("note", "Why only estimates", r`Table values are averages over many molecules; a C–H bond's strength depends on its neighbors. Formation enthalpies give more accurate results.`),
    callout("application", "Where this shows up", r`Quick estimates of fuel energies, and checking whether proposed reactions are energetically reasonable.`),
  ],
  questions: [
    num(2, r`Estimate ΔH for H₂ + Cl₂ → 2HCl.`, -183, { unit: "kJ" }, ["ΔH ≈ bonds broken − bonds formed. Break H–H and Cl–Cl; form two H–Cl.", "Bond enthalpies: H–H 436, Cl–Cl 243, H–Cl 431 kJ/mol."], r`$436 + 243 - 2(431)$.`),
    num(3, r`Estimate ΔH for 2H₂ + O₂ → 2H₂O(g).`, -482, { unit: "kJ" }, ["Break 2 H–H and 1 O=O; form 4 O–H (two per water).", "ΔH ≈ bonds broken − bonds formed."], r`$2(436) + 498 - 4(463)$.`),
    mc(2, r`A reaction is exothermic when the bonds formed are…`, ["weaker than those broken", "stronger than those broken", "the same", "fewer"], 1, ["Breaking bonds absorbs energy; forming bonds releases it. Which must win for a net release?"], r`More energy released than absorbed.`),
    mc(3, r`Bond-enthalpy estimates are least reliable because…`, ["bonds don't exist", "table values are averages across many compounds", "they ignore mass", "they're always zero"], 1, ["Where do table values for, say, a C–H bond come from? Is every C–H bond identical?"], r`Each bond's environment matters.`, "review"),
  ],
});
