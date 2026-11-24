import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "energy-heat-chem",
  title: "Energy, heat and specific heat",
  summary: "Distinguish heat from temperature, classify processes as endothermic or exothermic, and compute heat with q = mcΔT.",
  minutes: 30,
  objectives: [
    "Distinguish heat (energy transfer) from temperature.",
    "Classify reactions and changes as endothermic or exothermic, from the system's view.",
    "Use q = mcΔT and convert between joules and calories.",
  ],
  concepts: [
    { slug: "thermochemistry", name: "Thermochemistry", description: "Heat changes in reactions and physical processes.", subject: "subj_chem" },
  ],
  formulas: ["heat-enthalpy"],
  blocks: [
    def("System and surroundings", r`In an exothermic process the system releases heat to the surroundings, which warm up (combustion, freezing). In an endothermic process the system absorbs heat, so the surroundings cool (melting, cold packs). 1 cal = 4.184 J, and a food Calorie is 1000 cal.`),
    def("Specific heat", r`$q = mc\Delta T$, with water's $c = 4.184$ J/(g·°C). Positive q means heat absorbed.`),
    example(r`Heat 50.0 g of water from 25.0 °C to 75.0 °C`, [
      [r`q = 50.0(4.184)(50.0)`, ""],
      [r`q = 10{,}460\ \text{J} \approx 10.5\ \text{kJ}`, ""],
    ]),
    callout("application", "Where this shows up", r`Instant cold packs (dissolving NH₄NO₃ is endothermic), hand warmers (iron oxidizing is exothermic) and nutrition labels.`),
  ],
  questions: [
    num(2, r`How much heat warms 200. g of water by 15.0 °C, in kJ? Two decimal places.`, 12.55, { tolerance: 0.01, unit: "kJ" }, [], r`$200(4.184)(15.0) = 12{,}552$ J.`),
    num(2, r`A 25.0 g metal absorbs 450. J and warms by 40.0 °C. Find its specific heat, in J/(g·°C), to three decimal places.`, 0.45, { tolerance: 0.001, unit: "J/(g·°C)" }, [], r`$\frac{450}{25.0(40.0)}$ (iron).`),
    mc(2, r`Ice melting in your hand is…`, ["exothermic", "endothermic", "neither", "both"], 1, [], r`The ice absorbs heat from your hand.`),
    mc(3, r`Equal masses of water and iron absorb the same heat. Which warms more?`, ["water", "iron", "equal", "depends on the starting temperature"], 1, [], r`Iron's specific heat is much lower.`, "review"),
  ],
});
