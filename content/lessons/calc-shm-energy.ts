import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-shm-energy",
  title: "Energy of simple harmonic oscillators",
  summary: "Show that total energy is constant in SHM using the sinusoidal solution, find speeds from energy, and compute time-averaged kinetic and potential energy.",
  minutes: 30,
  objectives: [
    "Show K + U = ½kA² is constant using x(t) and v(t).",
    "Find v at any x from energy conservation.",
    "Show the time averages of K and U are each ½E.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  formulas: ["work-energy"],
  blocks: [
    def("Constant energy", r`With $x = A\cos\omega t$ and $v = -A\omega\sin\omega t$: $U = \frac12kA^2\cos^2\omega t$ and $K = \frac12mA^2\omega^2\sin^2\omega t = \frac12kA^2\sin^2\omega t$, since $m\omega^2 = k$. Their sum is $\frac12kA^2$ at every instant.`),
    def("Averages", r`Over a full cycle, $\cos^2$ and $\sin^2$ each average to $\frac12$, so $\langle K\rangle = \langle U\rangle = \frac12E$.`),
    example(r`k = 50 N/m, A = 0.2 m`, [
      [r`E = \tfrac12(50)(0.04) = 1\ \text{J}`, ""],
      [r`\text{at}\ x = 0.1:\ U = 0.25\ \text{J},\ K = 0.75\ \text{J}`, ""],
      [r`K = U\ \text{at}\ x = \tfrac{A}{\sqrt2} \approx 0.141\ \text{m}`, ""],
    ]),
    activity("spring-oscillator", { title: "Energy bars through a cycle", params: { mass: 1, k: 50, amplitude: 0.2 } }),
    callout("application", "Where this shows up", r`The equipartition of energy in vibrating molecules, and the energy budget of tuned mass dampers in skyscrapers.`),
  ],
  questions: [
    num(2, r`A 2 kg oscillator has ω = 3 rad/s and A = 0.4 m. Find its total energy.`, 1.44, { tolerance: 0.001, unit: "J" }, ["E = ½mω²A²."], r`$\frac12m\omega^2A^2 = \frac12(2)(9)(0.16)$.`),
    num(2, r`For that oscillator, find the speed at x = 0.2 m, to two decimal places.`, 1.04, { tolerance: 0.01, unit: "m/s" }, ["v = ω√(A² − x²)."], r`$3\sqrt{0.16 - 0.04} \approx 1.04$.`),
    mc(2, r`Averaged over one period, the kinetic energy equals…`, ["E", "½E", "0", "2E"], 1, ["K = E sin²(ωt). What is the average of sin² over a cycle?"], r`$\langle\sin^2\rangle = \frac12$.`),
    mc(3, r`Doubling ω (same A and m) multiplies the energy by…`, ["2", "4", "√2", "1"], 1, ["E = ½mω²A². How does E scale with ω?"], r`$E = \frac12m\omega^2A^2$.`, "review"),
  ],
});
