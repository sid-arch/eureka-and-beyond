import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "torque-work-power",
  title: "Torque and work",
  summary: "Compute the work done by torques (constant or varying), read torque–angle graphs, relate rotational power to torque and angular speed, and follow energy transfer in rotating systems.",
  minutes: 35,
  objectives: [
    "Compute work by a constant torque, W = τΔθ, and by a varying torque as the area under a τ–θ graph.",
    "Use rotational power P = τω.",
    "Apply the work–energy theorem to rotating systems, including friction torques.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Work by a torque", r`A force applied at radius $r$ moves its point of application through an arc $s = r\Delta\theta$, so the work is $W = Fr\Delta\theta = \tau\Delta\theta$ ($\Delta\theta$ in radians). If the torque varies, the work is the area under the torque–angle graph. A torque opposite the rotation, such as friction, does negative work.`),
    example(r`Torque rises steadily from 0 to 4 N·m over the first 2 rad, then stays at 4 N·m for 3 more rad`, [
      [r`W_1 = \tfrac12(2)(4) = 4\ \text{J}`, "Triangle under the graph."],
      [r`W_2 = 4(3) = 12\ \text{J}`, "Rectangle."],
      [r`W = 16\ \text{J}`, ""],
    ]),
    example(r`Pushing a door: 10 N at 0.8 m from the hinge, always perpendicular, through 90°`, [
      [r`W = \tau\Delta\theta = (10)(0.8)\left(\tfrac{\pi}{2}\right) \approx 12.6\ \text{J}`, ""],
    ]),
    def("Power and energy transfer", r`Rotational power is $P = \tau\omega$. By the work–energy theorem, $W_{net} = \Delta K_{rot}$: the net work of all torques changes the rotational kinetic energy, and friction torques turn it into thermal energy.`),
    example(r`A wheel with 50 J of rotational kinetic energy is stopped by a 2 N·m friction torque`, [
      [r`-\tau\Delta\theta = -50\ \text{J} \Rightarrow \Delta\theta = 25\ \text{rad}`, ""],
      [r`\tfrac{25}{2\pi} \approx 4.0\ \text{revolutions}`, ""],
    ]),
    callout("application", "Where this shows up", r`Engine and motor ratings give torque and rpm, and power is their product: a drill delivering 0.5 N·m at 300 rad/s supplies 150 W.`),
  ],
  questions: [
    num(2, r`A motor exerts 0.5 N·m at 300 rad/s. Find its power.`, 150, { unit: "W" }, ["P = τω."], r`$P = \tau\omega$.`),
    num(2, r`A 3 N·m torque turns a wheel through 4 revolutions. Find the work, to the nearest joule.`, 75, { tolerance: 0.5, unit: "J" }, ["W = τθ, with θ in radians: one revolution is 2π rad."], r`$3 \times 8\pi \approx 75.4$ J.`),
    num(3, r`A flywheel (I = 2 kg·m²) at 20 rad/s is stopped by a constant friction torque in 10 revolutions. Find the torque's size, to two decimal places.`, 6.37, { tolerance: 0.02, unit: "N·m" }, ["The friction work equals the flywheel's initial kinetic energy ½Iω².", "Convert 10 revolutions to radians, then τ = W/θ."], r`$K = 400$ J; $\tau = \frac{400}{20\pi} \approx 6.37$.`),
    mc(3, r`A τ–θ graph is a horizontal line at 5 N·m from 0 to 6 rad. The work done is…`, ["5 J", "30 J", "11 J", "1.2 J"], 1, ["Work is the area under a τ–θ graph."], r`Area: $5 \times 6$.`, "review"),
  ],
});
