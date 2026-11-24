import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "free-energy-dissolution",
  title: "Free energy of dissolution",
  summary: "Explain dissolving with enthalpy (breaking and forming interactions) and entropy, and use ΔG = ΔH − TΔS to see why even endothermic dissolving can be favorable.",
  minutes: 30,
  objectives: [
    "Break dissolving into separating the solute, separating the solvent and solvation.",
    "Explain the role of entropy in dissolving.",
    "Use ΔG = ΔH − TΔS to judge whether dissolving is favorable.",
  ],
  concepts: [
    { slug: "solutions", name: "Solutions", description: "Homogeneous mixtures, their concentrations and properties.", subject: "subj_chem" },
  ],
  formulas: ["free-energy"],
  blocks: [
    def("Energy steps", r`Dissolving takes energy to break solute–solute and solvent–solvent interactions, and releases energy as solute–solvent interactions form. If more is released, dissolving is exothermic; if less, endothermic, and the solution cools.`),
    def("Entropy", r`Dispersing ions or molecules through a solvent usually increases entropy (ΔS > 0). That's why some salts dissolve even though it costs energy: $\Delta G = \Delta H - T\Delta S < 0$.`),
    example(r`NH₄NO₃ dissolving: ΔH = +25.7 kJ/mol, ΔS = +108.7 J/(mol·K), at 298 K`, [
      [r`\Delta G = 25.7 - 298(0.1087)`, "Convert ΔS to kJ."],
      [r`\Delta G \approx -6.7\ \text{kJ/mol}`, "Favorable, though endothermic: entropy wins."],
    ]),
    callout("application", "Where this shows up", r`Instant cold packs, and why some gases (with negative ΔS of dissolving) become less soluble as temperature rises.`),
  ],
  questions: [
    num(2, r`A salt dissolves with ΔH = +15 kJ/mol and ΔS = +40 J/(mol·K). Find ΔG at 298 K, to one decimal place.`, 3.1, { tolerance: 0.1, unit: "kJ/mol" }, ["ΔG = ΔH − TΔS; convert ΔS to kJ/(mol·K) first."], r`$15 - 298(0.040) = 3.08$: not favorable.`),
    num(3, r`Above what temperature does that salt dissolve favorably?`, 375, { unit: "K" }, ["Dissolving becomes favorable where ΔG = 0, that is T = ΔH/ΔS. Use matching units."], r`$T = \frac{\Delta H}{\Delta S} = \frac{15{,}000}{40}$.`),
    mc(2, r`A cold pack gets cold because dissolving NH₄NO₃ is…`, ["exothermic", "endothermic", "a phase change", "a combustion"], 1, ["The pack gets cold, so heat flows into the dissolving process from your hand."], r`It absorbs heat from its surroundings.`),
    mc(3, r`Endothermic dissolving can still be spontaneous because…`, ["ΔH is negative", "the entropy increase outweighs the enthalpy cost", "K is zero", "temperature is irrelevant"], 1, ["ΔG = ΔH − TΔS. ΔH is positive, so which term must make ΔG negative?"], r`$-T\Delta S$ dominates.`, "review"),
  ],
});
