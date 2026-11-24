import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "capacitors",
  title: "Capacitors",
  summary: "Define capacitance, compute parallel-plate capacitance and stored energy, see how dielectrics help, and combine capacitors.",
  minutes: 35,
  objectives: [
    "Use C = Q/V and C = κε₀A/d.",
    "Compute stored energy U = ½CV² = ½QV.",
    "Combine capacitors in parallel and series.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  formulas: ["electric-potential"],
  blocks: [
    def("Capacitance", r`A capacitor is two conductors that store equal and opposite charges $\pm Q$. Capacitance $C = \frac{Q}{V}$, in farads. For parallel plates, $C = \frac{\kappa\varepsilon_0 A}{d}$ with $\varepsilon_0 = 8.85\times10^{-12}$ F/m; a dielectric of constant $\kappa$ between the plates multiplies $C$.`),
    example(r`Plates of area 0.01 m², 1 mm apart, air between`, [
      [r`C = \tfrac{(8.85\times10^{-12})(0.01)}{0.001} \approx 88.5\ \text{pF}`, "Tiny: a farad is enormous."],
    ]),
    def("Energy", r`$U = \frac12 CV^2 = \frac12QV = \frac{Q^2}{2C}$, stored in the electric field between the plates.`),
    example(r`A 100 μF capacitor charged to 9 V`, [
      [r`U = \tfrac12(100\times10^{-6})(9^2) \approx 4.05\ \text{mJ}`, ""],
    ]),
    def("Combinations", r`Parallel (same V): $C = C_1 + C_2$. Series (same Q): $\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}$, which is the reverse of the rules for resistors.`),
    callout("application", "Where this shows up", r`Camera flashes dump stored energy in a millisecond, defibrillators store hundreds of joules, and touchscreens sense the change in capacitance from your finger.`),
  ],
  questions: [
    num(2, r`Find the equivalent of 2 μF and 3 μF capacitors in series.`, 1.2, { unit: "μF" }, [], r`$\frac{1}{1/2 + 1/3}$.`),
    num(2, r`A 5 μF capacitor holds 60 μC. Find its voltage.`, 12, { unit: "V" }, [], r`$\frac{Q}{C}$.`),
    mc(2, r`Inserting a dielectric (κ = 3) into a capacitor connected to a battery…`, ["triples C and Q", "triples V", "cuts Q to a third", "changes nothing"], 0, [], r`V is fixed by the battery; C triples, so Q = CV triples.`),
    mc(3, r`Doubling the voltage on a capacitor multiplies its stored energy by…`, ["2", "4", "½", "1"], 1, [], r`$U \propto V^2$.`, "review"),
  ],
});
