import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "temperature-thermal-energy",
  title: "Temperature and thermal energy",
  summary: "Connect temperature to molecular motion, convert between temperature scales, distinguish heat from temperature, and compute thermal expansion.",
  minutes: 30,
  objectives: [
    "Relate temperature to the average kinetic energy of particles.",
    "Convert among Celsius, Fahrenheit and kelvin.",
    "Describe conduction, convection and radiation, and compute ΔL = αLΔT.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  blocks: [
    def("Temperature and heat", r`Temperature measures the average kinetic energy of a substance's particles. Thermal energy is the total kinetic and potential energy of all of them. Heat is energy transferred because of a temperature difference, always from hot to cold, until thermal equilibrium.`),
    def("Scales", r`$T_K = T_C + 273.15$ and $T_F = \frac95 T_C + 32$. Absolute zero (0 K, −273.15 °C) is where particle motion is at its minimum. Gas laws need kelvin.`),
    example(r`Convert 25 °C`, [
      [r`T_K = 25 + 273.15 = 298.15\ \text{K}`, ""],
      [r`T_F = \tfrac95(25) + 32 = 77\ °\text{F}`, ""],
    ]),
    def("Heat transfer and expansion", r`Heat moves by conduction (contact), convection (moving fluid) and radiation (electromagnetic waves, even through vacuum). Most materials expand when heated: $\Delta L = \alpha L \Delta T$.`),
    example(r`A 100 m steel bridge (α = 12 × 10⁻⁶ /°C) warms by 40 °C`, [
      [r`\Delta L = (12\times10^{-6})(100)(40) = 0.048\ \text{m}`, "Nearly 5 cm, so bridges need expansion joints."],
    ]),
    activity("ideal-gas", { title: "Temperature as molecular motion" }),
    callout("application", "Where this shows up", r`Thermostats use bimetallic strips that bend as two metals expand differently; double-pane windows slow conduction; the Sun warms Earth by radiation.`),
  ],
  questions: [
    num(1, r`Convert 100 °F to Celsius, to one decimal place.`, 37.8, { tolerance: 0.1, unit: "°C" }, [], r`$\frac59(100 - 32)$.`),
    num(1, r`Convert 300 K to Celsius, to two decimal places.`, 26.85, { tolerance: 0.01, unit: "°C" }, [], r`$300 - 273.15$.`),
    num(2, r`A 2 m aluminum rod (α = 23 × 10⁻⁶ /°C) heats by 50 °C. Find its expansion in mm.`, 2.3, { tolerance: 0.01, unit: "mm" }, [], r`$23\times10^{-6}(2)(50) = 0.0023$ m.`),
    mc(3, r`A metal spoon feels colder than a wooden one at the same temperature because…`, ["metal is colder", "metal conducts heat away from your hand faster", "wood is warmer", "metal radiates more"], 1, [], r`Same temperature; different conductivity.`, "review"),
  ],
});
