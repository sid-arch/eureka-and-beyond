import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-induced-forces",
  title: "Induced currents and magnetic forces",
  summary: "Solve the sliding-rod problem with calculus: induced emf, current, magnetic drag force, exponential slowdown and terminal velocity, and connect it to eddy-current braking.",
  minutes: 40,
  objectives: [
    "Find the drag force on a moving conductor, F = B²L²v/R.",
    "Solve m dv/dt = −B²L²v/R for v(t).",
    "Find terminal velocity when a constant force drives the rod.",
  ],
  concepts: [
    { slug: "magnetism", name: "Magnetism", description: "Magnetic fields from magnets and currents, magnetic forces and electromagnetic induction.", subject: "subj_phys" },
  ],
  formulas: ["induction-circuits", "magnetism-induction"],
  blocks: [
    def("Magnetic drag", r`A rod of length L sliding at v on rails through field B has $\varepsilon = BLv$, current $I = \frac{BLv}{R}$, and feels $F = BIL = \frac{B^2L^2v}{R}$ opposing the motion: a drag force proportional to v.`),
    example(r`A 0.1 kg rod (L = 0.5 m) coasts at 4 m/s through 0.8 T on rails joined by a 2 Ω resistor`, [
      [r`m\tfrac{dv}{dt} = -\tfrac{B^2L^2}{R}v`, ""],
      [r`v = v_0e^{-t/\tau}`, ""],
      [r`\tau = \tfrac{mR}{B^2L^2} = \tfrac{0.1(2)}{0.64(0.25)} = 1.25\ \text{s}`, ""],
      [r`v(1.25) \approx 4e^{-1} \approx 1.47\ \text{m/s}`, ""],
    ]),
    def("Terminal velocity", r`If a constant force F pulls the rod (gravity on a vertical rail, say), it speeds up until $F = \frac{B^2L^2v}{R}$: $v_T = \frac{FR}{B^2L^2}$.`),
    callout("application", "Where this shows up", r`Eddy-current brakes on trains and roller coasters, induction cooktops, and the damping of balance needles all use induced currents.`),
  ],
  questions: [
    num(2, r`In the example, a constant 0.4 N force pulls the rod. Find its terminal speed.`, 5, { unit: "m/s" }, ["At terminal speed the magnetic drag B²L²v/R equals the applied force."], r`$\frac{0.4(2)}{0.16}$.`),
    num(3, r`How far does the coasting rod travel before stopping?`, 5, { unit: "m" }, ["The speed decays as v₀e^(−t/τ). Distance is the integral of v over time."], r`$\int_0^\infty v_0e^{-t/\tau}\,dt = v_0\tau = 4(1.25)$.`),
    mc(2, r`Where does the rod's kinetic energy go as it slows?`, ["into the magnet", "heat in the resistor", "it's destroyed", "back into the rod"], 1, ["The induced current flows through the resistor. What does current through a resistor produce?"], r`$\int I^2R\,dt = \frac12mv_0^2$.`),
    mc(3, r`Doubling B makes the magnetic braking force (same v)…`, ["2× larger", "4× larger", "½", "the same"], 1, ["The emf is ∝ B, so the current is ∝ B, and the force ILB has another B."], r`$F \propto B^2$.`, "review"),
  ],
});
