import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "torque-equilibrium",
  title: "Torque and static equilibrium",
  summary: "Compute torque from force, lever arm and angle, and use the two conditions for static equilibrium to balance seesaws and beams.",
  minutes: 30,
  objectives: [
    "Compute torque τ = rF sin θ and identify its direction.",
    "State the two conditions for static equilibrium: ΣF = 0 and Στ = 0.",
    "Solve balance problems by choosing a convenient pivot.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Torque", r`Torque measures a force's turning effect: $\tau = rF\sin\theta$, where $r$ is the distance from the pivot and $\theta$ the angle between $\vec r$ and $\vec F$. It's largest when you push perpendicular to the lever, and zero when you push straight toward the pivot. Units: N·m.`),
    example(r`A 40 N force on a 0.25 m wrench`, [
      [r`\text{perpendicular: } \tau = 0.25(40) = 10\ \text{N·m}`, ""],
      [r`\text{at 60°: } \tau = 0.25(40)\sin 60° \approx 8.66\ \text{N·m}`, ""],
    ]),
    def("Static equilibrium", r`An object at rest stays at rest only if both the net force and the net torque about any point are zero: $\sum F = 0$ and $\sum\tau = 0$. For a seesaw: $m_1 g d_1 = m_2 g d_2$.`),
    activity("torque-balance", { title: "Balance the seesaw", params: { m1: 4, d1: 1.5, m2: 6, d2: 1 } }),
    callout("tip", "Try this", r`The default setup balances: $4 \times 1.5 = 6 \times 1$. Move the 6 kg mass to 1.5 m and watch which way it tips, then find a new spot for the 4 kg mass that balances it.`, "experiment"),
    callout("application", "Where this shows up", r`Door handles sit far from the hinges, cranes carry counterweights, and engineers check $\sum\tau = 0$ for every bridge and balcony.`),
  ],
  questions: [
    num(2, r`A 30 kg child sits 2 m from a seesaw's pivot. How far on the other side must a 40 kg child sit to balance?`, 1.5, { unit: "m" }, [], r`$30(2) = 40d$.`),
    num(2, r`A 50 N force pushes at 30° to a 0.4 m lever. Find the torque.`, 10, { unit: "N·m" }, [], r`$0.4(50)\sin 30°$.`),
    num(3, r`A uniform 4 m, 10 kg plank rests on supports at its ends. A 20 kg box sits 1 m from the left end. Find the force from the right support (g = 9.8).`, 98, { tolerance: 0.1, unit: "N" }, [], r`Torques about the left end: $F_R(4) = 98(2) + 196(1)$, so $F_R = 98$ N.`),
    mc(3, r`Why is a door hard to open if you push near the hinges?`, ["The force is smaller", "The lever arm is small, so the torque is small", "Friction is greater there", "The door is heavier there"], 1, [], r`$\tau = rF$.`, "review"),
  ],
});
