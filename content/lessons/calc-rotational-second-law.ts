import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-rotational-second-law",
  title: "Newton's second law in rotational form",
  summary: "Apply τ = Iα to extended objects using calculated rotational inertias, including rods pivoted at one end and massive pulleys.",
  minutes: 35,
  objectives: [
    "Apply τ_net = Iα with I about the actual axis.",
    "Find the angular acceleration of a rod released from horizontal.",
    "Combine linear and rotational equations for pulley systems.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics", "calculus-rotation"],
  blocks: [
    def("The law", r`$\sum\tau = I\alpha$ about a fixed axis (or about the center of mass). Gravity acts at the center of mass, so its torque on an extended object is $mg$ times the horizontal distance from the pivot to the center of mass.`),
    example(r`A uniform 1.5 m rod pivoted at one end is released from horizontal`, [
      [r`\tau = mg\tfrac L2,\ I = \tfrac13 mL^2`, ""],
      [r`\alpha = \tfrac{3g}{2L} = \tfrac{3(9.8)}{2(1.5)} = 9.8\ \text{rad/s}^2`, ""],
      [r`a_{tip} = \alpha L = 1.5g = 14.7\ \text{m/s}^2`, "Faster than free fall: a coin on the tip gets left behind."],
    ]),
    callout("tip", "Systems", r`For a mass hanging from a pulley with rotational inertia $I$: $mg - T = ma$, $TR = I\alpha$ and $a = R\alpha$. Then $a = \frac{mg}{m + I/R^2}$.`),
    callout("application", "Where this shows up", r`Falling chimneys break apart because the top wants a larger tangential acceleration than free fall allows; trebuchets exploit the same physics.`),
  ],
  questions: [
    num(2, r`A uniform 2 m rod pivoted at one end is released horizontal. Find α.`, 7.35, { unit: "rad/s²" }, ["τ = Mg(L/2) about the pivot, and I = ⅓ML². Then α = τ/I."], r`$\frac{3(9.8)}{4}$.`),
    num(3, r`A 1 kg mass hangs from a light string wrapped around a pulley with I = 0.02 kg·m² and R = 0.1 m. Find a.`, 3.27, { tolerance: 0.01, unit: "m/s²" }, ["Write mg − T = ma and TR = Iα with a = αR, then eliminate T."], r`$\frac{9.8}{1 + 2} \approx 3.27$.`),
    mc(2, r`Where does gravity's torque on a uniform rod act?`, ["at the pivot", "at the center of mass", "at the free end", "everywhere equally"], 1, ["The total gravitational torque is as if all the weight acted at one point. Which?"], r`Summing $\int x\,g\,dm$ gives $Mg\,x_{cm}$.`),
    mc(3, r`As a released rod swings down to vertical, its angular acceleration…`, ["stays constant", "decreases to zero", "increases", "reverses"], 1, ["The torque is Mg times a lever arm. What happens to that lever arm as the rod approaches vertical?"], r`The lever arm, $\frac L2\cos\theta$, shrinks to zero.`, "review"),
  ],
});
