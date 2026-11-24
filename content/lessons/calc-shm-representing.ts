import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-shm-representing",
  title: "Representing and analyzing SHM",
  summary: "Differentiate sinusoidal position functions to get velocity and acceleration, read phase relationships from graphs, and evaluate the motion at any instant.",
  minutes: 30,
  objectives: [
    "Differentiate x = A sin(ωt + φ) to get v and a.",
    "Explain the 90° phase lead of v and the 180° phase of a relative to x.",
    "Evaluate position, velocity and acceleration at a given time.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("Derivatives", r`If $x = A\sin(\omega t + \phi)$, then $v = A\omega\cos(\omega t + \phi)$ and $a = -A\omega^2\sin(\omega t + \phi) = -\omega^2x$. Velocity leads position by a quarter cycle; acceleration is exactly opposite to position.`),
    example(r`x(t) = 0.1 sin(4t + π/6) m, at t = 0`, [
      [r`x = 0.1\sin\tfrac\pi6 = 0.05\ \text{m}`, ""],
      [r`v = 0.4\cos\tfrac\pi6 \approx 0.346\ \text{m/s}`, ""],
      [r`a = -16(0.05) = -0.8\ \text{m/s}^2`, ""],
    ]),
    activity("sinusoid", { title: "Amplitude, period and phase shift" }),
    callout("application", "Where this shows up", r`Engineers read phase lags between displacement and force to diagnose vibrating machinery; AC circuits use the same phase language.`),
  ],
  questions: [
    num(2, r`x(t) = 0.3cos(2t) m. Find v at t = π/4 s.`, -0.6, { unit: "m/s" }, ["v = dx/dt; evaluate at t = π/4."], r`$v = -0.6\sin(2t)$ and $\sin\frac\pi2 = 1$.`),
    num(2, r`For x(t) = 0.3cos(2t), find the maximum acceleration.`, 1.2, { unit: "m/s²" }, ["a_max = Aω²."], r`$A\omega^2 = 0.3(4)$.`),
    mc(2, r`When x is at its maximum, v is…`, ["maximum", "zero", "minimum (most negative)", "equal to x"], 1, ["At the maximum of x, the object momentarily turns around."], r`A turning point.`),
    mc(3, r`Compared with position, acceleration in SHM is…`, ["in phase", "90° ahead", "180° out of phase", "unrelated"], 2, ["a = −ω²x. What does the minus sign mean for the phase?"], r`$a = -\omega^2x$.`, "review"),
  ],
});
