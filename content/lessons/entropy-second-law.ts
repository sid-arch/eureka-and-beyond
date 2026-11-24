import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "entropy-second-law",
  title: "Entropy and the second law of thermodynamics",
  summary: "Interpret entropy as a count of microscopic arrangements, compute entropy changes ΔS = Q/T, and apply the second law to heat flow, engines and refrigerators.",
  minutes: 35,
  objectives: [
    "Explain entropy as a measure of how many microscopic states fit a macroscopic state.",
    "Compute ΔS = Q/T at constant temperature.",
    "Use the second law to explain heat flow direction and the limits on engines and refrigerators.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  formulas: ["heat-thermodynamics"],
  blocks: [
    def("Entropy", r`Entropy $S$ measures disorder: how many microscopic arrangements produce the same overall state. Spread-out energy has far more arrangements than concentrated energy, so systems drift toward it. For heat $Q$ added at constant absolute temperature $T$: $\Delta S = \frac{Q}{T}$ (J/K).`),
    def("Second law", r`The total entropy of an isolated system never decreases: $\Delta S_{total} \ge 0$. Heat flows spontaneously from hot to cold, never the reverse, and no cyclic engine can convert heat entirely into work.`),
    example(r`Melting 1 kg of ice at 273 K`, [
      [r`\Delta S = \tfrac{334{,}000}{273} \approx 1220\ \text{J/K}`, "Liquid water's molecules have many more arrangements."],
    ]),
    example(r`1000 J flows from a 400 K reservoir to a 300 K reservoir`, [
      [r`\Delta S_{hot} = -\tfrac{1000}{400} = -2.5\ \text{J/K}`, ""],
      [r`\Delta S_{cold} = +\tfrac{1000}{300} \approx 3.33\ \text{J/K}`, ""],
      [r`\Delta S_{total} \approx +0.83\ \text{J/K} > 0`, "The reverse flow would decrease total entropy, so it doesn't happen on its own."],
    ]),
    def("Refrigerators", r`A refrigerator uses work $W$ to move heat $Q_c$ out of a cold space. Its coefficient of performance is $COP = \frac{Q_c}{W}$, at most $\frac{T_c}{T_h - T_c}$.`),
    callout("application", "Where this shows up", r`Every real process, from friction to mixing cream into coffee, increases total entropy. It's why perpetual-motion machines are impossible and why heat pumps need an energy input, such as electricity, to move heat from cold to hot.`),
  ],
  questions: [
    num(2, r`Find the maximum COP of a freezer at 268 K in a 298 K kitchen, to two decimal places.`, 8.93, { tolerance: 0.02 }, [], r`$\frac{268}{30}$.`),
    num(2, r`500 J of heat leaves a 250 K object. Find its entropy change.`, -2, { unit: "J/K" }, [], r`$-\frac{500}{250}$.`),
    mc(2, r`A refrigerator cools its inside, decreasing that entropy. This doesn't violate the second law because…`, ["fridges are exempt", "it dumps more entropy into the room", "entropy can't decrease", "the food is cold"], 1, [], r`Total entropy still rises.`),
    mc(3, r`Which has higher entropy?`, ["1 mol of ice at 0 °C", "1 mol of water at 0 °C", "1 mol of water vapor at 100 °C", "They're equal"], 2, [], r`Gas molecules have by far the most arrangements.`, "review"),
  ],
});
