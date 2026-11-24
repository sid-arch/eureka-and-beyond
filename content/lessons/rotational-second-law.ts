import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rotational-second-law",
  title: "Newton's second law in rotational form",
  summary: "Apply τ = Iα to rigid bodies, combine it with F = ma for systems with massive pulleys, and use the parallel-axis theorem.",
  minutes: 35,
  objectives: [
    "Apply τ_net = Iα to rotating objects.",
    "Solve systems combining linear and rotational motion (massive pulleys).",
    "Use the parallel-axis theorem, I = I_cm + Md².",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Rotational second law", r`$\alpha = \frac{\tau_{net}}{I}$: a net torque produces angular acceleration, resisted by rotational inertia, just as $a = \frac{F_{net}}{m}$. A massive pulley has different tensions on its two sides; their difference times $R$ is its net torque.`),
    example(r`A 2 kg mass hangs from a rope wrapped around a 4 kg solid-disk pulley (R = 0.1 m)`, [
      [r`mg - T = ma \quad\text{and}\quad TR = \tfrac12 MR^2\cdot\tfrac{a}{R}`, "Rope doesn't slip, so α = a/R."],
      [r`T = \tfrac12 Ma`, "From the torque equation."],
      [r`a = \tfrac{mg}{m + M/2} = \tfrac{19.6}{4} = 4.9\ \text{m/s}^2`, "Substituting into the hanging mass's equation."],
      [r`T = \tfrac12(4)(4.9) = 9.8\ \text{N}`, ""],
      [r`\alpha = \tfrac{4.9}{0.1} = 49\ \text{rad/s}^2`, "Half of free fall: the disk's inertia acts like an extra 2 kg."],
    ]),
    def("Parallel-axis theorem", r`For an axis parallel to one through the center of mass, a distance $d$ away: $I = I_{cm} + Md^2$. A uniform rod: $I_{cm} = \frac{1}{12}ML^2$, so about one end $I = \frac{1}{12}ML^2 + M\left(\frac L2\right)^2 = \frac13ML^2$.`),
    callout("application", "Where this shows up", r`Flywheels resist speed changes, and a tightrope walker's long pole has a large I, so a small torque gives a small, correctable wobble.`),
  ],
  questions: [
    num(2, r`Find the rotational inertia of a 3 kg, 1 m rod about one end.`, 1, { unit: "kg·m²" }, ["A rod about one end: I = ⅓ML²."], r`$\frac13(3)(1)^2$.`),
    num(2, r`A grinding wheel (I = 0.2 kg·m²) is slowed by a 0.8 N·m friction torque. Find α.`, -4, { unit: "rad/s²" }, ["Use τ = Iα; a slowing torque is negative."], r`$\frac{-0.8}{0.2}$.`),
    num(3, r`Repeat the pulley example with a massless pulley. Find a.`, 9.8, { unit: "m/s²" }, ["Set the pulley's mass to zero in the example's result. What is left to resist the hanging mass?"], r`With $M = 0$, $a = g$: nothing else holds the mass back.`),
    mc(3, r`On a massive pulley with an accelerating rope, the tensions on the two sides are…`, ["always equal", "different, and their difference produces the angular acceleration", "zero", "equal to the weights"], 1, ["A pulley with rotational inertia needs a net torque to speed up. Where does that torque come from?"], r`$(T_1 - T_2)R = I\alpha$.`, "review"),
  ],
});
