import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "shm-energy",
  title: "Energy of simple harmonic oscillators",
  summary: "Track kinetic and potential energy through an oscillation, use E = ½kA², and find the speed at any position.",
  minutes: 30,
  objectives: [
    "Show that total mechanical energy of an ideal oscillator is E = ½kA².",
    "Find the speed at any position using v = ω√(A² − x²).",
    "Interpret energy bar charts and energy–position graphs for SHM.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  formulas: ["work-energy"],
  blocks: [
    def("Energy in SHM", r`Without friction, $E = \frac12mv^2 + \frac12kx^2$ is constant. At the turning points it's all potential, $E = \frac12kA^2$; at equilibrium it's all kinetic, $E = \frac12mv_{max}^2$. Solving for speed gives $v = \omega\sqrt{A^2 - x^2}$.`),
    example(r`1 kg on a 100 N/m spring with A = 0.2 m`, [
      [r`E = \tfrac12(100)(0.2^2) = 2\ \text{J}`, ""],
      [r`U(0.1) = \tfrac12(100)(0.01) = 0.5\ \text{J}`, "At x = 0.1 m."],
      [r`K = 2 - 0.5 = 1.5\ \text{J}`, ""],
      [r`v = 10\sqrt{0.04 - 0.01} \approx 1.73\ \text{m/s}`, ""],
    ]),
    def("On a graph", r`On an energy–position graph, $U = \frac12kx^2$ is a parabola, $E$ is a horizontal line, and the gap between them is $K$. The turning points are where the line meets the parabola.`),
    activity("spring-oscillator", { title: "Energy bars during an oscillation", params: { mass: 1, k: 100, amplitude: 0.2 } }),
    callout("note", "Damping", r`Real oscillators lose energy to friction, so the amplitude shrinks over time; the energy turns into heat. Car shock absorbers are designed to damp oscillations quickly.`),
    callout("application", "Where this shows up", r`Bungee jumps, guitar strings and atoms vibrating in a crystal all trade kinetic and potential energy back and forth.`),
  ],
  questions: [
    num(2, r`A 200 N/m spring oscillates with amplitude 0.1 m. Find the total energy.`, 1, { unit: "J" }, ["Total energy = ½kA²."], r`$\frac12(200)(0.01)$.`),
    num(2, r`At what fraction of the amplitude is the energy half kinetic and half potential? Give a decimal to three places.`, 0.707, { tolerance: 0.002 }, ["Set U = ½kx² equal to half the total ½kA², and solve for x/A."], r`$\frac12kx^2 = \frac14kA^2$, so $x = \frac{A}{\sqrt2}$.`),
    num(3, r`A 0.5 kg mass on a spring has E = 4 J. Find v_max.`, 4, { unit: "m/s" }, ["At the equilibrium point all the energy is kinetic: ½mv_max² = E."], r`$\frac12(0.5)v^2 = 4$.`),
    mc(3, r`Doubling the amplitude multiplies the total energy by…`, ["2", "4", "√2", "1"], 1, ["E = ½kA². How does E scale with A?"], r`$E \propto A^2$.`, "review"),
  ],
});
