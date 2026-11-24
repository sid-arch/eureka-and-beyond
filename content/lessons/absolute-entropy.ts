import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "absolute-entropy",
  title: "Absolute entropy and entropy change",
  summary: "Use the third law and tabulated standard molar entropies to calculate ΔS° for a reaction, and check the result against a sign prediction.",
  minutes: 35,
  objectives: [
    "State the third law: a perfect crystal at 0 K has S = 0, so absolute entropies can be tabulated.",
    "Calculate ΔS° = ΣnS°(products) − ΣnS°(reactants).",
    "Check calculated values against qualitative predictions.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["free-energy"],
  blocks: [
    def("The third law", r`A perfect crystal at absolute zero has only one microstate, so $S = k\ln 1 = 0$. Measuring heat absorbed while warming from 0 K gives each substance an absolute standard molar entropy $S^\circ$ (J/(mol·K)). Unlike $\Delta H_f^\circ$, elements do not have $S^\circ = 0$.`),
    def("Reaction entropy", r`$\Delta S^\circ_{\text{rxn}} = \sum nS^\circ(\text{products}) - \sum nS^\circ(\text{reactants})$, using the coefficients $n$ from the balanced equation. Gases have large $S^\circ$ (130–250), liquids moderate, solids small.`),
    example(r`ΔS° for N₂(g) + 3H₂(g) → 2NH₃(g)`, [
      [r`S^\circ:\ \text{NH}_3\ 192.5,\ \text{N}_2\ 191.6,\ \text{H}_2\ 130.7`, "J/(mol·K)"],
      [r`\text{products: } 2(192.5) = 385.0`, ""],
      [r`\text{reactants: } 191.6 + 3(130.7) = 583.7`, ""],
      [r`\Delta S^\circ = -198.7\ \text{J/K}`, "Negative, as predicted from 4 → 2 mol gas."],
    ]),
    callout("warning", "Common mistakes", r`Multiply by coefficients, include elements (their S° is not zero) and keep units straight: ΔS° comes out in J/K while ΔH° is in kJ. Convert before combining them in ΔG.`),
    callout("application", "Where this shows up", r`Engineers use tabulated entropies to find the maximum efficiency of engines and the conditions that make industrial reactions such as ammonia synthesis worthwhile.`),
  ],
  questions: [
    num(2, r`Find ΔS° for CaCO₃(s) → CaO(s) + CO₂(g). S° values: CaCO₃ 92.9, CaO 38.1, CO₂ 213.8 J/(mol·K).`, 159.0, { tolerance: 0.2, unit: "J/K" }, ["Products minus reactants."], r`$38.1 + 213.8 - 92.9 = 159.0$ J/K.`),
    num(3, r`Find ΔS° for 2H₂(g) + O₂(g) → 2H₂O(l). S°: H₂ 130.7, O₂ 205.2, H₂O(l) 69.9 J/(mol·K).`, -326.8, { tolerance: 0.2, unit: "J/K" }, ["Remember the coefficients of 2."], r`$2(69.9) - [2(130.7) + 205.2] = -326.8$ J/K.`),
    mc(2, r`According to the third law, S = 0 for…`, ["every element at 298 K", "a perfect crystal at 0 K", "any gas at STP", "water at its freezing point"], 1, ["S = k ln W. Which situation has exactly one possible arrangement?"], r`Only one microstate.`),
    mc(2, r`Standard molar entropy of an element at 298 K is…`, ["zero by definition", "positive", "negative", "undefined"], 1, ["Contrast with ΔH°f."], r`Elements have positive absolute entropies.`),
    mc(3, r`A calculated ΔS° of +150 J/K would be surprising for…`, ["C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)", "2NH₃(g) → N₂(g) + 3H₂(g)", "NH₄Cl(s) → NH₃(g) + HCl(g)", "PCl₅(g) → PCl₃(g) + Cl₂(g)"], 0, ["Count moles of gas on each side."], r`6 → 3 mol gas and a liquid formed: ΔS° should be negative.`, "review"),
  ],
});
