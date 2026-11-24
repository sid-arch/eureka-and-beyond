import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "laws-of-thermodynamics",
  title: "Laws of thermodynamics",
  summary: "Apply the first law, ΔU = Q − W, understand entropy and the second law, and compute heat-engine and Carnot efficiencies.",
  minutes: 35,
  objectives: [
    "State the zeroth, first and second laws of thermodynamics.",
    "Apply ΔU = Q − W with correct signs.",
    "Compute engine efficiency and the Carnot limit 1 − T_c/T_h.",
  ],
  concepts: [
    { slug: "thermal-physics", name: "Thermal physics", description: "Temperature, heat, phase changes and the laws of thermodynamics.", subject: "subj_phys" },
  ],
  formulas: ["heat-thermodynamics"],
  blocks: [
    def("Zeroth and first laws", r`Zeroth: two systems each in equilibrium with a third are in equilibrium with each other, which is what makes thermometers work. First: energy is conserved, $\Delta U = Q - W$, where $Q$ is heat added to the system and $W$ is work done by the system.`),
    example(r`500 J of heat is added to a gas, which does 200 J of work pushing a piston`, [
      [r`\Delta U = 500 - 200 = 300\ \text{J}`, "The gas's internal energy, and so its temperature, rises."],
    ]),
    def("Second law and entropy", r`Heat flows spontaneously only from hot to cold, and the total entropy (disorder) of an isolated system never decreases. One consequence: no engine can turn heat entirely into work.`),
    def("Heat engines", r`An engine takes heat $Q_h$ from a hot reservoir, does work $W$ and exhausts $Q_c$: $W = Q_h - Q_c$ and efficiency $e = \frac{W}{Q_h}$. The best possible (Carnot) efficiency is $e = 1 - \frac{T_c}{T_h}$, in kelvin.`),
    example(r`An engine takes in 2000 J and exhausts 1400 J, running between 600 K and 300 K`, [
      [r`W = 2000 - 1400 = 600\ \text{J}, \ e = \tfrac{600}{2000} = 30\%`, ""],
      [r`e_{Carnot} = 1 - \tfrac{300}{600} = 50\%`, "The engine reaches 60% of the theoretical limit."],
    ]),
    callout("application", "Where this shows up", r`Car engines reach about 25–30% efficiency and power plants 33–60%; refrigerators and heat pumps run the cycle backward, using work to move heat from cold to hot.`),
    activity("pv-diagram", { title: "PV diagrams and the first law", params: { process: "isothermal", target: 20 } }),
    callout("tip", "Try this", r`Compare the four processes ending at 20 L. The shaded area is the work done by the gas; check that Q = ΔU + W for each.`, "experiment"),
  ],
  questions: [
    num(2, r`A gas loses 300 J of heat while 100 J of work is done on it (W = −100 J). Find ΔU.`, -200, { unit: "J" }, [], r`$-300 - (-100)$.`),
    num(2, r`Find the Carnot efficiency, in percent, between 500 K and 350 K.`, 30, { unit: "%" }, [], r`$1 - \frac{350}{500} = 0.30$.`),
    mc(2, r`For an ideal gas at constant temperature, ΔU = 0, so…`, ["Q = 0", "W = 0", "Q = W", "Q = −W"], 2, [], r`$0 = Q - W$.`),
    mc(3, r`An inventor claims an engine with 70% efficiency between 400 K and 300 K. This is…`, ["possible", "impossible: the limit is 25%", "possible if well insulated", "impossible: the limit is 75%"], 1, [], r`$1 - \frac{300}{400} = 25\%$.`, "review"),
  ],
});
