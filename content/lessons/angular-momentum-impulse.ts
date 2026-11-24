import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "angular-momentum-impulse",
  title: "Angular momentum and angular impulse",
  summary: "Compute angular momentum for rigid bodies and point masses, and relate angular impulse to the change in angular momentum.",
  minutes: 30,
  objectives: [
    "Compute L = Iω for a rigid body and L = mvr⊥ for a point mass.",
    "Apply the angular impulse–momentum theorem, τΔt = ΔL.",
    "Read τ–t graphs: the area is the change in angular momentum.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Angular momentum", r`A rigid body spinning about a fixed axis has $L = I\omega$ (kg·m²/s). A point mass moving in a straight line also has angular momentum about any point not on its path: $L = mvr_\perp$, where $r_\perp$ is the perpendicular distance from the point to the line of motion.`),
    def("Angular impulse", r`$\tau_{net}\Delta t = \Delta L$: a torque applied for a time changes angular momentum. On a graph of torque against time, the area under the curve is $\Delta L$.`),
    example(r`A 5 N·m torque acts for 2 s on a disk (I = 0.5 kg·m²) starting at rest`, [
      [r`\Delta L = 5(2) = 10\ \text{kg·m}^2/\text{s}`, ""],
      [r`\omega = \tfrac{10}{0.5} = 20\ \text{rad/s}`, ""],
    ]),
    example(r`A 0.1 kg ball moves at 3 m/s along a line passing 0.5 m from a pivot`, [
      [r`L = mvr_\perp = 0.1(3)(0.5) = 0.15\ \text{kg·m}^2/\text{s}`, ""],
    ]),
    callout("application", "Where this shows up", r`Spacecraft use small thrusters for a measured time to change their spin, and a figure skater's push-off sets the angular momentum she keeps throughout a spin.`),
  ],
  questions: [
    num(2, r`Find the angular momentum of a 2 kg solid disk (R = 0.3 m) spinning at 10 rad/s.`, 0.9, { tolerance: 0.001, unit: "kg·m²/s" }, ["L = Iω, with I = ½MR² for a solid disk."], r`$\frac12(2)(0.09)(10)$.`),
    num(2, r`A torque varies from 0 to 6 N·m linearly over 4 s. Find ΔL.`, 12, { unit: "kg·m²/s" }, ["ΔL is the area under the τ–t graph."], r`Triangle area: $\frac12(4)(6)$.`),
    mc(2, r`A ball moves straight toward a pivot point. Its angular momentum about that point is…`, ["maximum", "zero", "negative", "equal to mv"], 1, ["L = r_⊥mv. What is the perpendicular distance from the pivot to a line through it?"], r`$r_\perp = 0$.`),
    mc(3, r`Two wheels get the same torque for the same time. The one with larger I ends with…`, ["more L", "the same L but less ω", "less L", "the same ω"], 1, ["Same torque for the same time gives the same ΔL. Then ω = L/I."], r`Same $\tau\Delta t$, same $\Delta L$; $\omega = \frac{L}{I}$.`, "review"),
  ],
});
