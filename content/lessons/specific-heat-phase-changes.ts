import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "specific-heat-phase-changes",
  title: "Specific heat and phase changes",
  summary: "Compute heat with Q = mcΔT and Q = mL, read heating curves, and solve calorimetry problems with conservation of energy.",
  minutes: 35,
  objectives: [
    "Use Q = mcΔT for temperature changes.",
    "Use Q = mL for melting and boiling, at constant temperature.",
    "Solve mixing problems: heat lost = heat gained.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  formulas: ["heat-thermodynamics"],
  blocks: [
    def("Specific heat", r`The heat needed to change a mass's temperature is $Q = mc\Delta T$, where $c$ is the specific heat. Water has an unusually large $c = 4186$ J/(kg·°C); aluminum's is about 900 and copper's 385.`),
    example(r`Heat 2 kg of water from 20 °C to 100 °C`, [
      [r`Q = 2(4186)(80) = 669{,}760\ \text{J} \approx 670\ \text{kJ}`, ""],
    ]),
    def("Phase changes", r`During melting or boiling, added heat breaks bonds instead of raising the temperature: $Q = mL$. For water, $L_f = 3.34\times10^5$ J/kg and $L_v = 2.26\times10^6$ J/kg. A heating curve shows rising slopes (one phase warming) separated by flat plateaus (phase changes).`),
    example(r`Melt 0.5 kg of ice at 0 °C, then boil 0.1 kg of water at 100 °C`, [
      [r`Q_{melt} = 0.5(3.34\times10^5) = 167{,}000\ \text{J}`, ""],
      [r`Q_{boil} = 0.1(2.26\times10^6) = 226{,}000\ \text{J}`, "Boiling takes far more energy per kilogram."],
    ]),
    example(r`Mix 0.2 kg of water at 80 °C with 0.3 kg at 20 °C`, [
      [r`0.2c(80 - T) = 0.3c(T - 20)`, "Heat lost by the hot water equals heat gained by the cool water."],
      [r`16 - 0.2T = 0.3T - 6 \Rightarrow T = 44\ °\text{C}`, ""],
    ]),
    callout("application", "Where this shows up", r`Water's high specific heat keeps coastal climates mild and makes it a good coolant; steam burns are worse than boiling-water burns because condensing steam releases its latent heat.`),
  ],
  questions: [
    num(2, r`How much heat warms 0.5 kg of aluminum (c = 900) by 30 °C?`, 13500, { unit: "J" }, [], r`$0.5(900)(30)$.`),
    num(2, r`How much heat melts 2 kg of ice at 0 °C?`, 668000, { unit: "J" }, [], r`$2(3.34\times10^5)$.`),
    num(3, r`Mix 1 kg of water at 90 °C with 2 kg at 30 °C. Find the final temperature.`, 50, { unit: "°C" }, [], r`$\frac{1(90) + 2(30)}{3}$.`),
    mc(3, r`On a heating curve, the temperature stays constant during boiling because…`, ["no heat is added", "the energy goes into breaking bonds between molecules", "the thermometer breaks", "heat flows out as fast as it enters"], 1, [], r`Energy changes the potential energy of the molecules, not their kinetic energy.`, "review"),
  ],
});
