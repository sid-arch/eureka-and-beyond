import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "simple-harmonic-motion",
  title: "Simple harmonic motion",
  summary: "Model a mass on a spring: restoring force, period, and the exchange of kinetic and elastic potential energy.",
  minutes: 40,
  objectives: [
    "Identify simple harmonic motion from a linear restoring force.",
    "Calculate period and frequency of a mass-spring system.",
    "Track kinetic and potential energy through an oscillation.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
    { slug: "conservation-of-energy", name: "Conservation of energy", description: "In a closed system without dissipation, total mechanical energy stays constant.", subject: "subj_phys" },
  ],
  formulas: ["hookes-law", "spring-period", "kinetic-energy", "spring-potential-energy"],
  blocks: [
    formula(r`F_s = -kx`, "Hooke's law", r`An ideal spring pulls back toward equilibrium with a force proportional to the stretch $x$.`),
    def("Simple harmonic motion (SHM)", r`Motion in which the restoring force is proportional to displacement and opposite to it. The position follows a sine or cosine curve in time: $x(t) = A\cos(2\pi t / T)$.`),
    text(r`Three numbers describe the motion. The amplitude $A$ is the maximum displacement. The period $T$ is the time for one full cycle, and the frequency $f = \frac{1}{T}$ is cycles per second, measured in hertz.`),
    formula(r`T = 2\pi\sqrt{\frac{m}{k}}`, "Period of a mass on a spring", r`A heavier mass oscillates more slowly; a stiffer spring oscillates faster. Amplitude does not appear: for an ideal spring, big and small oscillations take the same time.`),
    example(r`A 0.50 kg mass hangs on a spring with $k = 200$ N/m. Find the period and frequency.`, [
      [r`T = 2\pi\sqrt{\frac{0.50}{200}} = 2\pi(0.05)`, "Substitute."],
      [r`T \approx 0.314\ \text{s}`, "One full oscillation."],
      [r`f = \frac{1}{T} \approx 3.18\ \text{Hz}`, "About 3 oscillations per second."],
    ]),
    text(r`Energy moves back and forth between two forms. At the turning points ($x = \pm A$) the mass stops for an instant, so all the energy is elastic potential energy $\tfrac{1}{2}kA^2$. At equilibrium ($x = 0$) the spring is relaxed and all the energy is kinetic, so the speed is greatest there.`),
    example(r`For that system pulled 0.10 m and released, find the maximum speed.`, [
      [r`E = \tfrac{1}{2}kA^2 = \tfrac{1}{2}(200)(0.10)^2 = 1.0\ \text{J}`, "Total energy at the turning point."],
      [r`\tfrac{1}{2}mv_{\max}^2 = 1.0 \Rightarrow v_{\max}^2 = \frac{2(1.0)}{0.50} = 4`, "All kinetic at equilibrium."],
      [r`v_{\max} = 2.0\ \text{m/s}`, ""],
    ]),
    callout("warning", "Model limits", r`Real springs lose energy to friction and air, so the amplitude slowly decreases (damping). Very large stretches can also go beyond the spring's linear range. The simulator models an ideal, undamped spring unless you turn damping on.`),
    callout("application", "Where this shows up", r`Car suspensions, building sway in earthquakes, quartz watch crystals and the vibration of molecules are all modeled as harmonic oscillators.`),
    activity("spring-oscillator", { title: "Mass on a spring" }),
    callout("tip", "Investigate", r`Double the amplitude. Does the period change? Now quadruple the mass: by what factor does the period change? Turn on damping and watch the energy bars.`, "experiment"),
    activity("spring-oscillator", {
      title: "Walkthrough: energy in an oscillator",
      steps: [
        { title: "Pull and release", body: "At maximum stretch the mass is momentarily at rest: all potential energy.", params: { mass: 0.5, k: 20, amplitude: 0.3 } },
        { title: "Heavier mass", body: "Four times the mass doubles the period: T ∝ √m.", params: { mass: 2, k: 20, amplitude: 0.3 } },
        { title: "Stiffer spring", body: "A spring four times stiffer halves the period.", params: { mass: 0.5, k: 80, amplitude: 0.3 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`A spring with $k = 50$ N/m is stretched 0.20 m. What is the magnitude of the restoring force?`, 10, { unit: "N" }, [r`$|F| = kx$.`], r`$50 \times 0.20 = 10$ N.`),
    num(2, r`Find the period of a 2.0 kg mass on a spring with $k = 80$ N/m. Round to two decimals.`, 0.99, { tolerance: 0.01, unit: "s" },
      [r`$T = 2\pi\sqrt{m/k}$.`], r`$2\pi\sqrt{0.025} \approx 2\pi(0.158) \approx 0.99$ s.`),
    mc(2, r`The mass on a spring is replaced by one 4 times heavier. The period becomes:`, ["4 times longer", "2 times longer", "Half as long", "Unchanged"], 1,
      [r`$T \propto \sqrt{m}$.`], r`$\sqrt{4} = 2$, so the period doubles.`),
    mc(2, r`Where is the speed of an oscillating mass greatest?`, ["At maximum stretch", "At maximum compression", "At equilibrium", "Speed is constant"], 2,
      ["Where is the potential energy smallest?"], r`At equilibrium the spring stores no energy, so all of it is kinetic and the speed is maximum.`),
    num(3, r`A 0.25 kg mass on a spring ($k = 100$ N/m) oscillates with amplitude 0.05 m. What is its maximum speed?`, 1, { tolerance: 0.001, unit: "m/s" },
      [r`$\tfrac{1}{2}kA^2 = \tfrac{1}{2}mv^2$.`], r`$v = A\sqrt{k/m} = 0.05\sqrt{400} = 1.0$ m/s.`, "review"),
  ],
});
