import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "compound-circuits",
  title: "Compound direct current circuits",
  summary: "Reduce series–parallel networks step by step, then work back out to find every current, voltage and power.",
  minutes: 35,
  objectives: [
    "Reduce combination circuits to one equivalent resistance.",
    "Work back through the network to find each branch's current and voltage.",
    "Predict how adding or removing a branch changes the other currents.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["dc-circuits"],
  blocks: [
    def("Strategy", r`Replace groups of resistors with their equivalents: series $R = R_1 + R_2$, parallel $\frac1R = \frac1{R_1} + \frac1{R_2}$. Repeat until one resistor remains, find the total current, then expand back: series parts share the current, parallel parts share the voltage.`),
    example(r`24 V across R₁ = 4 Ω in series with (R₂ = 6 Ω ∥ R₃ = 12 Ω)`, [
      [r`R_{23} = \left(\tfrac16 + \tfrac1{12}\right)^{-1} = 4\ \Omega`, ""],
      [r`R_{tot} = 4 + 4 = 8\ \Omega,\ I = \tfrac{24}{8} = 3\ \text{A}`, ""],
      [r`V_{23} = 3(4) = 12\ \text{V}`, "R₁ takes the other 12 V."],
      [r`I_2 = \tfrac{12}{6} = 2\ \text{A},\ I_3 = \tfrac{12}{12} = 1\ \text{A}`, "These add back to 3 A."],
      [r`P_1 = I^2R_1 = 9(4) = 36\ \text{W}`, ""],
    ]),
    activity("circuit-builder", { title: "Series and parallel building blocks" }),
    callout("tip", "Predicting changes", r`Removing R₃ leaves R₁ + R₂ = 10 Ω, so the total current drops to 2.4 A and R₂'s voltage rises from 12 V to 14.4 V. Changing one branch changes everything.`),
    callout("application", "Where this shows up", r`Home circuits are parallel branches on one breaker; adding appliances lowers the total resistance and raises the current, until the breaker trips.`),
  ],
  questions: [
    num(2, r`In the example, R₃ is removed. Find the new total current.`, 2.4, { unit: "A" }, [], r`$\frac{24}{4 + 6}$.`),
    num(2, r`Three 6 Ω resistors in parallel, in series with a 1 Ω resistor. Find the equivalent resistance.`, 3, { unit: "Ω" }, [], r`$2 + 1$.`),
    num(3, r`A 12 V battery drives 2 Ω in series with (3 Ω ∥ 6 Ω). Find the current through the 3 Ω resistor.`, 2, { unit: "A" }, [], r`$R = 4$, $I = 3$ A, $V_\parallel = 6$ V, $\frac{6}{3}$.`),
    mc(3, r`A bulb in a parallel branch burns out. The brightness of the other parallel bulbs (ideal battery, no series resistor)…`, ["increases", "decreases", "stays the same", "drops to zero"], 2, [], r`Each still gets the full battery voltage.`, "review"),
  ],
});
