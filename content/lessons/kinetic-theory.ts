import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "kinetic-theory",
  title: "Kinetic theory of temperature and pressure",
  summary: "Explain gas pressure as molecular collisions, connect temperature to average kinetic energy, and compute rms speeds of gas molecules.",
  minutes: 30,
  objectives: [
    "Explain pressure as the result of molecules colliding with container walls.",
    "Use average kinetic energy K_avg = (3/2)k_BT.",
    "Compute rms speed v_rms = √(3k_BT/m) and predict how it changes with temperature and mass.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  blocks: [
    def("The model", r`An ideal gas is a huge number of tiny particles in random motion that collide elastically and don't otherwise interact. Each collision with a wall gives it a small impulse; the average force per area from billions of collisions is the pressure.`),
    def("Temperature", r`Absolute temperature measures the average translational kinetic energy per molecule: $K_{avg} = \frac32 k_B T$, with $k_B = 1.38\times10^{-23}$ J/K. So $v_{rms} = \sqrt{\frac{3k_BT}{m}}$: lighter molecules move faster at the same temperature.`),
    example(r`Nitrogen (N₂, m = 4.65 × 10⁻²⁶ kg) at 300 K`, [
      [r`K_{avg} = \tfrac32(1.38\times10^{-23})(300)`, ""],
      [r`K_{avg} \approx 6.21\times10^{-21}\ \text{J}`, ""],
      [r`v_{rms} = \sqrt{\tfrac{3(1.38\times10^{-23})(300)}{4.65\times10^{-26}}}`, ""],
      [r`v_{rms} \approx 517\ \text{m/s}`, "Faster than the speed of sound, though each molecule zigzags constantly."],
    ]),
    activity("ideal-gas", { title: "Heat the gas and watch the pressure" }),
    callout("note", "Distribution", r`Molecules don't all share one speed: the Maxwell–Boltzmann distribution spreads them out, and a few are much faster than average. Those fast ones drive evaporation.`),
    callout("application", "Where this shows up", r`Hydrogen and helium escape Earth's atmosphere because their light molecules reach escape speed more often; tire pressure rises on a hot day.`),
  ],
  questions: [
    num(2, r`The absolute temperature of a gas doubles. By what factor does v_rms change? Give a decimal to three places.`, 1.414, { tolerance: 0.002 }, [], r`$v_{rms} \propto \sqrt T$.`),
    num(2, r`Find the average kinetic energy per molecule at 600 K, in units of $10^{-21}$ J.`, 12.42, { tolerance: 0.02 }, [], r`$\frac32(1.38\times10^{-23})(600)$.`),
    mc(2, r`Helium and oxygen are at the same temperature. Compared with oxygen molecules, helium atoms have…`, ["the same average KE and higher rms speed", "higher average KE", "lower rms speed", "the same rms speed"], 0, [], r`Same T, same $K_{avg}$; lighter mass, faster.`),
    mc(3, r`Gas in a rigid container is heated. Pressure rises because molecules…`, ["get bigger", "hit the walls harder and more often", "attract each other more", "multiply"], 1, [], r`Higher speed means a larger impulse per collision and more collisions per second.`, "review"),
  ],
});
