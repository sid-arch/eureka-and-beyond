import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "shm-differential-equation",
  title: "Defining simple harmonic motion",
  summary: "Derive the SHM differential equation d²x/dt² = −ω²x from Newton's second law, verify its sinusoidal solutions, and fit amplitude and phase to initial conditions.",
  minutes: 40,
  objectives: [
    "Show that a linear restoring force gives d²x/dt² = −(k/m)x.",
    "Verify that x = A cos(ωt + φ) solves it, with ω = √(k/m).",
    "Find A and φ from the initial position and velocity.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("The equation", r`A mass on a spring obeys $m\frac{d^2x}{dt^2} = -kx$, so $\frac{d^2x}{dt^2} = -\omega^2 x$ with $\omega = \sqrt{\frac km}$. Any system with this form, where acceleration is proportional to minus the displacement, is in simple harmonic motion.`),
    def("The solution", r`$x(t) = A\cos(\omega t + \phi)$: differentiating twice gives $-A\omega^2\cos(\omega t + \phi) = -\omega^2 x$. ✓ The amplitude $A$ and phase $\phi$ come from the initial conditions: $x_0 = A\cos\phi$ and $v_0 = -A\omega\sin\phi$.`),
    example(r`ω = 5 rad/s, x₀ = 0.1 m, v₀ = 0.5 m/s`, [
      [r`A = \sqrt{x_0^2 + \left(\tfrac{v_0}{\omega}\right)^2}`, ""],
      [r`A = \sqrt{0.01 + 0.01} \approx 0.141\ \text{m}`, ""],
      [r`\tan\phi = -\tfrac{v_0}{\omega x_0} = -1 \Rightarrow \phi = -45°`, ""],
      [r`x(t) = 0.141\cos(5t - \tfrac{\pi}{4})`, ""],
    ]),
    activity("spring-oscillator", { title: "Watch the solution in motion", params: { mass: 2, k: 50, amplitude: 0.14 } }),
    callout("application", "Where this shows up", r`Small vibrations of almost anything near a stable equilibrium (molecules, bridges, quartz crystals in watches) obey this same equation.`),
  ],
  questions: [
    num(1, r`Find ω for a 2 kg mass on a 50 N/m spring.`, 5, { unit: "rad/s" }, ["ω = √(k/m)."], r`$\sqrt{25}$.`),
    num(2, r`x(t) = 0.2cos(3t). Find the maximum acceleration.`, 1.8, { unit: "m/s²" }, ["a_max = Aω²."], r`$A\omega^2 = 0.2(9)$.`),
    num(3, r`ω = 4 rad/s, released from x₀ = 0 with v₀ = 2 m/s. Find the amplitude.`, 0.5, { unit: "m" }, ["Starting at x = 0, all the energy is kinetic, so v₀ = v_max = Aω."], r`$A = \frac{v_0}{\omega}$.`),
    mc(3, r`Which equation describes SHM?`, ["d²x/dt² = −9x", "d²x/dt² = −9", "dx/dt = −9x", "d²x/dt² = 9x"], 0, ["SHM means a = −ω²x: acceleration proportional to minus position."], r`Acceleration proportional to minus displacement.`, "review"),
  ],
});
