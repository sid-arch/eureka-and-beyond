import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-work-energy-theorem",
  title: "Translational kinetic energy",
  summary: "Derive the work–energy theorem from Newton's second law with calculus, and use it to find speeds after variable forces act.",
  minutes: 30,
  objectives: [
    "Derive W_net = ΔK from F = m dv/dt using a = v dv/dx.",
    "Use the theorem to find speeds after variable forces act.",
    "Explain why kinetic energy is always nonnegative and frame-dependent.",
  ],
  concepts: [
    { slug: "energy", name: "Work and energy", description: "Work, kinetic and potential energy, conservation of energy and power.", subject: "subj_phys" },
  ],
  formulas: ["work-energy", "calculus-mechanics"],
  blocks: [
    def("Derivation", r`By the chain rule, $a = \frac{dv}{dt} = \frac{dv}{dx}\frac{dx}{dt} = v\frac{dv}{dx}$. So $W_{net} = \int F_{net}\,dx = \int mv\frac{dv}{dx}\,dx = \int_{v_1}^{v_2} mv\,dv = \frac12mv_2^2 - \frac12mv_1^2$. Kinetic energy $K = \frac12mv^2$ is exactly what net work changes.`),
    example(r`F = 3x² newtons pushes a 2 kg block from rest from x = 0 to 2 m (no friction)`, [
      [r`W = \int_0^2 3x^2\,dx = 8\ \text{J}`, ""],
      [r`\tfrac12(2)v^2 = 8 \Rightarrow v \approx 2.83\ \text{m/s}`, ""],
    ]),
    callout("note", "Frames", r`Kinetic energy depends on the reference frame: a passenger has zero K relative to the train but plenty relative to the ground. The work–energy theorem holds in any single inertial frame.`),
    callout("application", "Where this shows up", r`Braking distance grows with v², because brakes must remove all the kinetic energy: doubling speed quadruples the stopping distance.`),
  ],
  questions: [
    num(2, r`A net force F = 10 − 2x (N) acts on a 1 kg cart from rest, from x = 0 to 5 m. Find its final speed, to two decimal places.`, 7.07, { tolerance: 0.01, unit: "m/s" }, ["W = ∫F dx from 0 to 5 m; then W = ½mv²."], r`$W = 50 - 25 = 25$ J $= \frac12v^2$.`),
    num(2, r`A 1500 kg car brakes from 20 m/s to rest. Find the work done by the brakes.`, -300000, { unit: "J" }, ["Work by the brakes equals the change in kinetic energy."], r`$-\frac12(1500)(400)$.`),
    mc(2, r`Doubling speed multiplies stopping distance (same braking force) by…`, ["2", "4", "√2", "8"], 1, ["Braking work Fd equals the initial kinetic energy. How does K scale with v?"], r`$Fd = \frac12mv^2$.`),
    mc(3, r`A net force does negative work on an object. Its speed…`, ["increases", "decreases", "stays the same", "becomes negative"], 1, ["Net work equals ΔK. A negative ΔK means…"], r`$\Delta K < 0$.`, "review"),
  ],
});
