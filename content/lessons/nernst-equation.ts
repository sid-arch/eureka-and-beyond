import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "nernst-equation",
  title: "Cell potential under nonstandard conditions",
  summary: "Use the Nernst equation to find cell potential at any concentrations, explain why batteries run down, and analyze concentration cells.",
  minutes: 40,
  objectives: [
    "Write Q for a cell reaction and apply E = E° − (0.0592/n) log Q at 298 K.",
    "Predict qualitatively how concentration changes raise or lower E.",
    "Calculate the potential of a concentration cell, where E° = 0.",
  ],
  concepts: [
    { slug: "electrochemistry", name: "Electrochemistry", description: "Redox reactions and the cells that convert chemical and electrical energy.", subject: "subj_chem" },
  ],
  formulas: ["electrochemistry"],
  blocks: [
    def("The Nernst equation", r`From $\Delta G = \Delta G^\circ + RT\ln Q$ and $\Delta G = -nFE$: $E = E^\circ - \frac{RT}{nF}\ln Q$. At 298 K this is $E = E^\circ - \frac{0.0592}{n}\log Q$. Solids are left out of Q.`),
    example(r`Zn/Cu cell with [Zn²⁺] = 1.0 M, [Cu²⁺] = 0.010 M`, [
      [r`Q = \tfrac{[\text{Zn}^{2+}]}{[\text{Cu}^{2+}]} = 100`, "Zn²⁺ is a product, Cu²⁺ a reactant."],
      [r`E = 1.10 - \tfrac{0.0592}{2}\log 100`, ""],
      [r`= 1.10 - 0.059 = 1.04\ \text{V}`, "Less reactant, lower voltage."],
    ]),
    activity("galvanic-cell", { title: "Nernst equation", params: { left: "Zn", right: "Cu", leftConc: 1, rightConc: 0.01 } }),
    callout("tip", "Try this", r`Lower the Cu²⁺ concentration step by step. Each factor of 10 drops E by about 0.03 V. As the cell discharges toward equilibrium, Q → K and E → 0: a dead battery.`, "experiment"),
    def("Concentration cells", r`Two half-cells of the same metal with different ion concentrations: $E^\circ = 0$, so the voltage comes entirely from the Nernst term. Electrons flow so as to equalize the concentrations: the dilute side is the anode.`),
    example(r`Cu | Cu²⁺(0.010 M) || Cu²⁺(1.0 M) | Cu`, [
      [r`Q = \tfrac{0.010}{1.0} = 0.010`, ""],
      [r`E = 0 - \tfrac{0.0592}{2}\log 0.010`, ""],
      [r`= +0.0592\ \text{V}`, ""],
    ]),
    callout("application", "Where this shows up", r`pH meters are concentration cells for H⁺; nerve cells keep a resting potential of about −70 mV from ion concentration differences across their membranes.`),
  ],
  questions: [
    num(2, r`Find E for the Zn/Cu cell (E° = 1.10 V) with [Zn²⁺] = 0.10 M and [Cu²⁺] = 1.0 M, to two decimal places.`, 1.13, { tolerance: 0.01, unit: "V" }, ["Q = 0.10."], r`$1.10 - 0.0296\log 0.10 = 1.13$ V.`),
    num(3, r`Find E for the Zn/Cu cell with [Zn²⁺] = 0.50 M and [Cu²⁺] = 0.010 M, to two decimal places.`, 1.05, { tolerance: 0.01, unit: "V" }, ["Q = 50.", "n = 2."], r`$1.10 - 0.0296\log 50 = 1.05$ V.`),
    num(3, r`A silver concentration cell (n = 1) has 1.0 M Ag⁺ and 1.0 × 10⁻⁵ M Ag⁺. Find E in V, to three decimal places.`, 0.296, { tolerance: 0.002, unit: "V" }, ["E° = 0; Q = 10⁻⁵."], r`$-0.0592\log(10^{-5}) = 0.296$ V.`),
    mc(2, r`In a galvanic cell, increasing the concentration of a reactant ion…`, ["lowers E", "raises E", "leaves E unchanged", "makes E° larger"], 1, ["Q falls."], r`Smaller Q, larger E.`),
    mc(3, r`When a battery is completely dead…`, ["E° = 0", "Q = K and E = 0", "Q = 0", "n = 0"], 1, ["A dead battery can't push any more current. What state has the reaction reached?"], r`The reaction has reached equilibrium.`, "review"),
  ],
});
