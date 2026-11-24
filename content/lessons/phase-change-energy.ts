import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "phase-change-energy",
  title: "Energy of phase changes",
  summary: "Use molar enthalpies of fusion and vaporization, read heating curves, and compute the total energy to take a substance through several phases.",
  minutes: 35,
  objectives: [
    "Use ΔH_fus and ΔH_vap per mole.",
    "Interpret flat (phase change) and sloped (warming) regions of a heating curve.",
    "Add up the energy for multi-step heating, and relate ΔH_vap to IMF strength.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("Molar enthalpies", r`For water, $\Delta H_{fus} = 6.01$ kJ/mol and $\Delta H_{vap} = 40.7$ kJ/mol. Vaporizing takes far more energy than melting because it separates molecules completely, overcoming all their intermolecular forces.`),
    example(r`Heat 18.0 g (1.00 mol) of ice at −10 °C into steam at 110 °C`, [
      [r`\text{ice: } 18.0(2.09)(10) = 0.38\ \text{kJ}`, ""],
      [r`6.01\ \text{kJ}`, "Melting."],
      [r`18.0(4.184)(100) = 7.53\ \text{kJ}`, "Warming the water to 100 °C."],
      [r`40.7\ \text{kJ}`, "Boiling."],
      [r`18.0(2.01)(10) = 0.36\ \text{kJ}`, "Warming the steam."],
      [r`q_{total} \approx 55.0\ \text{kJ}`, "Boiling is three-quarters of it."],
    ]),
    callout("application", "Where this shows up", r`Sweating cools you by evaporation; steam burns are worse than boiling-water burns; refrigerators move heat by evaporating and condensing a refrigerant.`),
  ],
  questions: [
    num(2, r`How much energy melts 36.0 g of ice at 0 °C, in kJ?`, 12.01, { tolerance: 0.02, unit: "kJ" }, ["Convert grams to moles (18.02 g/mol), then multiply by ΔH_fus = 6.01 kJ/mol."], r`2.00 mol × 6.01 ≈ 12.0.`),
    num(2, r`How much energy vaporizes 9.0 g of water at 100 °C, in kJ, to one decimal place?`, 20.3, { tolerance: 0.1, unit: "kJ" }, ["Convert grams to moles, then multiply by ΔH_vap = 40.7 kJ/mol."], r`0.50 mol × 40.7 = 20.35.`),
    mc(2, r`On a heating curve, a flat segment means…`, ["no heat is added", "a phase change is happening", "the substance is cooling", "the temperature is rising fast"], 1, ["During a flat segment the temperature isn't changing. Where is the added energy going?"], r`Energy goes into separating particles.`),
    mc(3, r`Which has the highest ΔH_vap?`, ["CH₄", "H₂O", "Ne", "N₂"], 1, ["Vaporizing means overcoming intermolecular forces. Which substance has the strongest?"], r`Hydrogen bonding.`, "review"),
  ],
});
