import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "shm-graphs-analysis",
  title: "Representing and analyzing SHM",
  summary: "Write and interpret x(t) = A cos(ωt + φ), relate the position, velocity and acceleration graphs, and find maximum speed and acceleration.",
  minutes: 30,
  objectives: [
    "Write the position of a simple harmonic oscillator as x(t) = A cos(ωt + φ).",
    "Relate the graphs of x, v and a, including their phase differences.",
    "Compute v_max = Aω and a_max = Aω².",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("Equations of motion", r`Released from rest at $x = A$: $x(t) = A\cos(\omega t)$. Then $v(t) = -A\omega\sin(\omega t)$ and $a(t) = -A\omega^2\cos(\omega t) = -\omega^2 x$. The defining feature of SHM is that acceleration is proportional to displacement and opposite to it.`),
    def("Reading the graphs", r`Speed is greatest at equilibrium ($x = 0$) and zero at the turning points. Acceleration is greatest in magnitude at the turning points and zero at equilibrium. The velocity graph is a quarter-cycle ahead of the position graph.`),
    example(r`A 1 kg mass on a 100 N/m spring, pulled 0.2 m and released`, [
      [r`\omega = \sqrt{\tfrac{k}{m}} = 10\ \text{rad/s}`, ""],
      [r`v_{max} = A\omega = 2\ \text{m/s},\ a_{max} = A\omega^2 = 20\ \text{m/s}^2`, ""],
      [r`x(t) = 0.2\cos(10t)`, ""],
    ]),
    activity("spring-oscillator", { title: "Watch position and speed through a cycle", params: { mass: 1, k: 100, amplitude: 0.2 } }),
    activity("sinusoid", { title: "Amplitude, period and phase of a cosine", params: {} }),
    callout("application", "Where this shows up", r`Seismographs, AC voltage and audio signals are all described by sinusoids, and engineers read their phase lags from graphs like these.`),
  ],
  questions: [
    num(2, r`An oscillator has x(t) = 0.05 cos(4πt). Find its period.`, 0.5, { unit: "s" }, ["Compare with x = A cos(ωt): ω = 2π/T."], r`$\omega = 4\pi = \frac{2\pi}{T}$.`),
    num(2, r`Find v_max for that oscillator, to three decimal places.`, 0.628, { tolerance: 0.002, unit: "m/s" }, ["v_max = Aω."], r`$0.05(4\pi)$.`),
    mc(2, r`At the moment x = +A, the acceleration is…`, ["zero", "maximum and negative", "maximum and positive", "equal to the velocity"], 1, ["In SHM, a = −ω²x. At maximum displacement…"], r`$a = -\omega^2 x$.`),
    mc(3, r`Doubling the amplitude of a spring oscillator multiplies v_max by…`, ["1", "√2", "2", "4"], 2, ["v_max = Aω. Does changing the amplitude change ω?"], r`$v_{max} = A\omega$; ω is unchanged.`, "review"),
  ],
});
