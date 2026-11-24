import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "gibbs-free-energy",
  title: "Gibbs free energy and thermodynamic favorability",
  summary: "Combine enthalpy and entropy into ΔG = ΔH − TΔS, decide whether a process is thermodynamically favorable, and find the temperature where favorability switches.",
  minutes: 40,
  objectives: [
    "Calculate ΔG° from ΔH° and ΔS° with consistent units.",
    "Classify the four sign combinations of ΔH and ΔS by temperature dependence.",
    "Calculate the crossover temperature T = ΔH°/ΔS°.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["free-energy"],
  blocks: [
    def("Gibbs free energy", r`$\Delta G = \Delta H - T\Delta S$ at constant temperature and pressure. $\Delta G < 0$: thermodynamically favorable (proceeds without continuous outside energy). $\Delta G > 0$: the reverse is favorable. $\Delta G = 0$: equilibrium. The $\Delta H$ term accounts for the entropy change of the surroundings ($\Delta S_{surr} = -\Delta H/T$).`),
    example(r`Haber process at 298 K: ΔH° = −92.2 kJ, ΔS° = −198.7 J/K`, [
      [r`\Delta S^\circ = -0.1987\ \text{kJ/K}`, "Convert to kJ first."],
      [r`\Delta G^\circ = -92.2 - 298(-0.1987)`, ""],
      [r`= -92.2 + 59.2 = -33.0\ \text{kJ}`, "Favorable at room temperature."],
      [r`T = \tfrac{-92.2}{-0.1987} = 464\ \text{K}`, "Above this, ΔG° > 0."],
    ]),
    activity("free-energy", { title: "ΔG° against temperature", params: { dH: -92.2, dS: -198.7, T: 298 } }),
    callout("tip", "Try this", r`Drag the temperature past 464 K and watch ΔG° change sign. Then flip ΔS° to positive and see the line slope downward instead.`, "experiment"),
    def("The four cases", r`ΔH < 0, ΔS > 0: favorable at all T. ΔH > 0, ΔS < 0: never favorable. ΔH < 0, ΔS < 0: favorable at low T (enthalpy-driven). ΔH > 0, ΔS > 0: favorable at high T (entropy-driven), such as melting ice above 273 K.`),
    callout("application", "Where this shows up", r`Limestone kilns run above about 1100 K because CaCO₃ → CaO + CO₂ is entropy-driven; ammonia plants balance a favorable low temperature against a slow rate.`),
  ],
  questions: [
    num(2, r`For CaCO₃ → CaO + CO₂, ΔH° = +178.3 kJ and ΔS° = +159.0 J/K. Find ΔG° at 298 K, to one decimal place.`, 130.9, { tolerance: 0.2, unit: "kJ" }, ["Convert ΔS° to kJ/K."], r`$178.3 - 298(0.1590) = 130.9$ kJ: not favorable.`),
    num(3, r`Above what temperature does CaCO₃ decomposition become favorable? Nearest kelvin.`, 1121, { tolerance: 2, unit: "K" }, ["Set ΔG° = 0."], r`$178{,}300 / 159.0 = 1121$ K.`),
    mc(2, r`ΔH > 0 and ΔS > 0. The process is favorable…`, ["at all temperatures", "at high temperatures", "at low temperatures", "never"], 1, ["Which term wins as T grows?"], r`−TΔS eventually outweighs ΔH.`),
    mc(2, r`ΔG < 0 tells you a reaction…`, ["is fast", "is thermodynamically favorable", "is exothermic", "has a large Ea"], 1, ["ΔG is about which direction is favored, not about speed or heat."], r`It says nothing about rate.`),
    mc(3, r`Water freezing at −10 °C has which signs?`, ["ΔH > 0, ΔS > 0", "ΔH < 0, ΔS < 0", "ΔH < 0, ΔS > 0", "ΔH > 0, ΔS < 0"], 1, ["Freezing releases heat and orders molecules."], r`Enthalpy-driven, favorable below 273 K.`, "review"),
  ],
});
