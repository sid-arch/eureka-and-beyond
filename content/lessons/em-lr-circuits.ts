import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "em-lr-circuits",
  title: "Circuits with resistors and inductors (LR circuits)",
  summary: "Solve the differential equations for current rising and decaying in LR circuits, with time constant τ = L/R, and analyze circuits just after and long after switching.",
  minutes: 40,
  objectives: [
    "Write ε − IR − L dI/dt = 0 and solve: I = (ε/R)(1 − e^(−t/τ)), τ = L/R.",
    "Solve the decay I = I₀e^(−t/τ).",
    "Use the rules: inductors keep their current at the instant of switching, and act as wires at steady state.",
  ],
  concepts: [
    { slug: "circuits", name: "Electric circuits", description: "Current, voltage and resistance in series and parallel circuits.", subject: "subj_phys" },
  ],
  formulas: ["induction-circuits"],
  blocks: [
    def("Rising current", r`Around the loop, $\varepsilon - IR - L\frac{dI}{dt} = 0$. Separating variables gives $I = \frac\varepsilon R(1 - e^{-t/\tau})$ with $\tau = \frac LR$. The inductor's voltage, $\varepsilon e^{-t/\tau}$, starts at the full emf and fades.`),
    example(r`12 V, 4 Ω, 0.5 H`, [
      [r`I_{final} = \tfrac{12}{4} = 3\ \text{A},\ \tau = \tfrac{0.5}{4} = 0.125\ \text{s}`, ""],
      [r`I(\tau) = 3(1 - e^{-1}) \approx 1.90\ \text{A}`, ""],
      [r`t_{1/2} = \tau\ln 2 \approx 0.087\ \text{s}`, "After the battery is removed, the current halves in this time."],
    ]),
    def("Switching rules", r`At the instant of switching, an inductor's current can't jump, since that would need infinite emf. Long afterward, it acts like a wire. That's the mirror image of a capacitor, whose voltage can't jump.`),
    activity("inductor-circuit", { title: "LR rise and decay", params: { mode: "rise", emf: 12, resistance: 4, inductance: 0.5 } }),
    callout("application", "Where this shows up", r`Relay coils, motor windings and ignition coils are LR circuits; flyback diodes give the inductor's current somewhere to go when switched off.`),
  ],
  questions: [
    num(2, r`Find τ for a 2 H inductor with a 50 Ω resistor, in ms.`, 40, { unit: "ms" }, ["τ = L/R."], r`$\frac{2}{50} = 0.04$ s.`),
    num(3, r`In the example, find the energy stored in the inductor at t = τ, to two decimal places.`, 0.9, { tolerance: 0.01, unit: "J" }, ["At t = τ the current is 63.2% of its final value; then U = ½LI²."], r`$\frac12(0.5)(1.896^2) \approx 0.90$ J.`),
    mc(2, r`Just after the switch closes in an LR circuit, the current is…`, ["ε/R", "zero", "maximum", "ε/L"], 1, ["An inductor opposes sudden changes in current. What was the current just before?"], r`It can't jump from zero.`),
    mc(3, r`Doubling R in an LR circuit makes the current reach its (new) final value…`, ["faster", "slower", "at the same rate", "never"], 0, ["τ = L/R. What does doubling R do to τ?"], r`$\tau = \frac LR$ halves.`, "review"),
  ],
});
