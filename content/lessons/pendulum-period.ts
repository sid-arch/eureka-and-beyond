import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "pendulum-period",
  title: "Frequency and period of SHM",
  summary: "Find the periods of mass–spring systems and pendulums, identify what they depend on (and don't), and use measured periods to find g or k.",
  minutes: 30,
  objectives: [
    "Use T = 2π√(m/k) for a mass on a spring and T = 2π√(L/g) for a simple pendulum.",
    "Explain why period doesn't depend on amplitude (for small oscillations).",
    "Solve for k, g or L from a measured period.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("Two oscillators", r`Mass on a spring: $T = 2\pi\sqrt{\frac{m}{k}}$, independent of gravity and amplitude. Simple pendulum (small angles): $T = 2\pi\sqrt{\frac{L}{g}}$, independent of the bob's mass and amplitude. Frequency is $f = \frac1T$; angular frequency is $\omega = 2\pi f$.`),
    example(r`Periods of two oscillators`, [
      [r`\text{spring: } 2\pi\sqrt{\tfrac{0.5}{200}} \approx 0.314\ \text{s}`, "A 0.5 kg mass on a 200 N/m spring."],
      [r`\text{pendulum: } 2\pi\sqrt{\tfrac{1}{9.8}} \approx 2.01\ \text{s}`, "A 1 m pendulum on Earth."],
      [r`\text{on the Moon: } 2\pi\sqrt{\tfrac{1}{1.62}} \approx 4.94\ \text{s}`, ""],
    ]),
    example(r`What length gives a 1 s period?`, [
      [r`L = g\left(\tfrac{T}{2\pi}\right)^2 = \tfrac{9.8}{4\pi^2} \approx 0.248\ \text{m}`, ""],
    ]),
    activity("pendulum", { title: "What changes the period?", params: { planet: "earth", length: 1, amplitude: 10 } }),
    callout("tip", "Try this", r`Quadruple the length from 0.5 m to 2 m: the period doubles. Raise the amplitude to 60°: the period grows by about 7%, so the small-angle rule is an approximation.`, "experiment"),
    callout("application", "Where this shows up", r`Pendulum clocks kept time for 300 years; geologists once measured local g with precise pendulums; tall buildings have tuned mass dampers that oscillate at the building's own frequency.`),
  ],
  questions: [
    num(2, r`Find the period of a 2 m pendulum on Earth.`, 2.84, { tolerance: 0.01, unit: "s" }, ["T = 2π√(L/g)."], r`$2\pi\sqrt{\frac{2}{9.8}}$.`),
    num(2, r`A 0.4 kg mass on a spring has a period of 0.5 s. Find k, to the nearest N/m.`, 63, { tolerance: 0.5, unit: "N/m" }, ["Rearrange T = 2π√(m/k) for k."], r`$k = \frac{4\pi^2 m}{T^2} \approx 63.2$.`),
    mc(2, r`Doubling the mass on a spring multiplies the period by…`, ["2", "√2", "½", "1"], 1, ["T = 2π√(m/k). How does T scale with m?"], r`$T \propto \sqrt m$.`),
    mc(3, r`A pendulum clock is taken from sea level to a high mountain, where g is slightly smaller. It runs…`, ["fast", "slow", "unchanged", "backward"], 1, ["T = 2π√(L/g). Smaller g makes each swing take longer or shorter?"], r`Smaller g gives a longer period, so fewer ticks per hour.`, "review"),
  ],
});
