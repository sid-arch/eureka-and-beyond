import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-torque-work",
  title: "Torque and work",
  summary: "Compute the work done by torques that vary with angle as W = ∫τ dθ, including torsion springs, and relate rotational power to τω.",
  minutes: 30,
  objectives: [
    "Compute W = ∫τ dθ for torques that vary with angle.",
    "Find the energy stored in a torsion spring, ½κθ².",
    "Use P = τω and the rotational work–energy theorem.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Work by a varying torque", r`As a torque turns an object through $d\theta$, it does work $dW = \tau\,d\theta$, so $W = \int_{\theta_1}^{\theta_2}\tau\,d\theta$. Power is $P = \frac{dW}{dt} = \tau\omega$, and $W_{net} = \Delta(\frac12I\omega^2)$.`),
    example(r`τ(θ) = 2θ N·m from θ = 0 to π`, [
      [r`W = \int_0^\pi 2\theta\,d\theta = \pi^2 \approx 9.87\ \text{J}`, ""],
    ]),
    def("Torsion springs", r`A twisted wire or coil exerts $\tau = -\kappa\theta$. Twisting it to angle $\theta$ stores $\int_0^\theta\kappa\theta'\,d\theta' = \frac12\kappa\theta^2$.`),
    callout("application", "Where this shows up", r`Mousetraps, clothespins and mechanical watch balance springs are torsion springs; Cavendish measured G with a torsion balance.`),
  ],
  questions: [
    num(2, r`A torsion spring (κ = 0.8 N·m/rad) is twisted through 1.5 rad. Find the stored energy.`, 0.9, { unit: "J" }, ["Torsion spring: U = ½κθ², like ½kx² for a linear spring."], r`$\frac12(0.8)(2.25)$.`),
    num(3, r`τ(θ) = 3θ² N·m acts on a wheel (I = 0.5 kg·m²) from rest, from θ = 0 to 2 rad. Find ω.`, 5.66, { tolerance: 0.01, unit: "rad/s" }, ["W = ∫τ dθ from 0 to 2, and W = ½Iω²."], r`$W = \theta^3 = 8$ J $= \frac12(0.5)\omega^2$, so $\omega = \sqrt{32}$.`),
    mc(2, r`A torque opposes a wheel's rotation. The work it does is…`, ["positive", "negative", "zero", "infinite"], 1, ["W = ∫τ dθ. If τ and the rotation are opposite, what is the sign?"], r`$\tau$ and $d\theta$ have opposite signs.`),
    mc(3, r`On a τ–θ graph, the work done is…`, ["the slope", "the area under the curve", "the maximum torque", "τ times ω"], 1, ["W = ∫τ dθ. Geometrically, that's what on the graph?"], r`$W = \int\tau\,d\theta$.`, "review"),
  ],
});
