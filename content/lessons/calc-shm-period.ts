import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-shm-period",
  title: "Frequency and period of SHM",
  summary: "Read ω directly from any SHM differential equation, and find periods of springs, torsion pendulums and other oscillators.",
  minutes: 30,
  objectives: [
    "Read ω from equations of the form d²x/dt² = −ω²x.",
    "Compute periods for mass–spring systems, including vertical springs.",
    "Compute periods for torsion pendulums, T = 2π√(I/κ).",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("The recipe", r`Write Newton's second law for a small displacement, rearrange to $\ddot q = -C q$, and read off $\omega = \sqrt C$, $T = \frac{2\pi}{\omega}$, $f = \frac1T$. The period never depends on amplitude for true SHM.`),
    example(r`Two oscillators`, [
      [r`\ddot x = -\tfrac km x`, "Spring: a 0.5 kg mass, k = 200 N/m, horizontal or vertical."],
      [r`T = 2\pi\sqrt{\tfrac{0.5}{200}} \approx 0.314\ \text{s}`, ""],
      [r`I\ddot\theta = -\kappa\theta`, "Torsion pendulum: I = 0.02 kg·m², κ = 0.5 N·m/rad."],
      [r`T = 2\pi\sqrt{\tfrac{0.02}{0.5}} \approx 1.26\ \text{s}`, ""],
    ]),
    activity("spring-oscillator", { title: "Period depends on m and k, not amplitude", params: { mass: 0.5, k: 200, amplitude: 0.2 } }),
    callout("application", "Where this shows up", r`Quartz watches count a crystal's oscillations, and the period of a torsion pendulum measures the moment of inertia of odd-shaped objects.`),
  ],
  questions: [
    num(2, r`Find ω for d²x/dt² = −16x.`, 4, { unit: "rad/s" }, ["Compare with d²x/dt² = −ω²x."], r`$\sqrt{16}$.`),
    num(2, r`A mass on a vertical spring stretches it 0.1 m at equilibrium. Find the period of oscillation, to two decimal places.`, 0.63, { tolerance: 0.01, unit: "s" }, ["At equilibrium, k·0.1 = mg, so k/m = g/0.1. Then T = 2π√(m/k)."], r`$\frac km = \frac g{0.1}$, so $T = 2\pi\sqrt{\frac{0.1}{9.8}}$.`),
    mc(2, r`Hanging a spring vertically instead of horizontally changes its period by…`, ["a factor of g", "nothing", "doubling", "halving"], 1, ["Gravity is constant. Does it change k or m, or only where equilibrium is?"], r`Gravity only shifts the equilibrium.`),
    mc(3, r`Four times the mass on the same spring gives…`, ["4× the period", "2× the period", "½ the period", "the same period"], 1, ["T = 2π√(m/k). What is √4?"], r`$T \propto \sqrt m$.`, "review"),
  ],
});
