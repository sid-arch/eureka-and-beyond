import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "physical-pendulum",
  title: "Simple and physical pendulums",
  summary: "Derive the small-angle equation of motion for simple and physical pendulums from τ = Iα, and compute their periods.",
  minutes: 40,
  objectives: [
    "Derive d²θ/dt² = −(g/L)θ for a simple pendulum using sin θ ≈ θ.",
    "Derive T = 2π√(I/(mgd)) for a physical pendulum.",
    "Compute periods for rods, hoops and other extended objects.",
  ],
  concepts: [
    { slug: "simple-harmonic-motion", name: "Simple harmonic motion", description: "Periodic motion produced by a restoring force proportional to displacement.", subject: "subj_phys" },
  ],
  blocks: [
    def("Simple pendulum", r`Gravity's torque about the pivot is $-mgL\sin\theta$ and $I = mL^2$, so $mL^2\ddot\theta = -mgL\sin\theta$. For small angles, $\sin\theta \approx \theta$: $\ddot\theta = -\frac gL\theta$, which is SHM with $\omega = \sqrt{\frac gL}$ and $T = 2\pi\sqrt{\frac Lg}$.`),
    def("Physical pendulum", r`An extended object pivoting a distance $d$ from its center of mass: $I\ddot\theta = -mgd\sin\theta \approx -mgd\,\theta$, so $T = 2\pi\sqrt{\frac{I}{mgd}}$, where $I$ is about the pivot.`),
    example(r`A uniform 1 m rod swinging from one end`, [
      [r`I = \tfrac13 mL^2,\ d = \tfrac L2`, ""],
      [r`T = 2\pi\sqrt{\tfrac{2L}{3g}} \approx 1.64\ \text{s}`, "Faster than a 1 m simple pendulum (2.01 s)."],
    ]),
    example(r`A hoop of radius 0.5 m hanging on a nail at its rim`, [
      [r`I = MR^2 + MR^2 = 2MR^2,\ d = R`, "Parallel-axis theorem."],
      [r`T = 2\pi\sqrt{\tfrac{2R}{g}} \approx 2.01\ \text{s}`, "The same as a simple pendulum of length 2R."],
    ]),
    activity("pendulum", { title: "The simple pendulum for comparison", params: { planet: "earth", length: 1, amplitude: 10 } }),
    callout("application", "Where this shows up", r`Walking legs swing roughly as physical pendulums, which sets natural walking pace; pendulum clocks use compensated physical pendulums.`),
  ],
  questions: [
    num(2, r`A uniform 0.6 m rod swings from one end. Find its period, to two decimal places.`, 1.27, { tolerance: 0.01, unit: "s" }, ["T = 2π√(I/(mgd)), with I = ⅓mL² and d = L/2."], r`$2\pi\sqrt{\frac{2(0.6)}{3(9.8)}}$.`),
    num(3, r`A meter stick pivots 0.25 m from its center. Find its period, to two decimal places.`, 1.53, { tolerance: 0.01, unit: "s" }, ["Parallel axis: I = (1/12)m(1)² + m(0.25)²; d = 0.25 m.", "Then T = 2π√(I/(mgd))."], r`$I = \frac{1}{12}m + m(0.0625)$; $T = 2\pi\sqrt{\frac{0.14583}{9.8(0.25)}} \approx 1.53$.`),
    mc(2, r`The small-angle approximation for pendulums uses…`, ["cos θ ≈ θ", "sin θ ≈ θ", "tan θ ≈ 1", "θ ≈ 0 exactly"], 1, ["For small angles, which trig function is approximately equal to the angle itself?"], r`Valid for θ under about 15°.`),
    mc(3, r`A physical pendulum's period does NOT depend on…`, ["its mass, for a given shape", "its shape", "g", "the pivot location"], 0, ["In T = 2π√(I/(mgd)), I is proportional to m. What happens to m?"], r`Mass cancels in I/(md).`, "review"),
  ],
});
