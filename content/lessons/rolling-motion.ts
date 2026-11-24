import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rolling-motion",
  title: "Rolling",
  summary: "Describe rolling without slipping, split kinetic energy into translational and rotational parts, and predict which shape wins a race down a ramp.",
  minutes: 35,
  objectives: [
    "Use the rolling condition v = Rω.",
    "Compute total kinetic energy K = ½mv²(1 + β), with β = I/(mR²).",
    "Find speeds and accelerations of rolling objects on inclines.",
  ],
  concepts: [
    { slug: "rotation", name: "Rotational motion", description: "Angular kinematics, torque, rotational inertia and angular momentum.", subject: "subj_phys" },
  ],
  formulas: ["rotational-dynamics"],
  blocks: [
    def("Rolling without slipping", r`The contact point is momentarily at rest, so $v_{cm} = R\omega$ and $a_{cm} = R\alpha$. Static friction provides the torque that makes the object spin, but it does no work, because the contact point doesn't slide.`),
    def("Energy", r`$K = \frac12mv^2 + \frac12I\omega^2 = \frac12mv^2(1 + \beta)$ with $\beta = \frac{I}{mR^2}$ (sphere $\frac25$, disk $\frac12$, hoop 1). Rolling from rest down a height $h$: $v = \sqrt{\frac{2gh}{1 + \beta}}$, the same for any mass or radius.`),
    example(r`Speeds at the bottom of a 1 m drop`, [
      [r`\text{sphere: } \sqrt{\tfrac{2(9.8)}{1.4}} \approx 3.74\ \text{m/s}`, ""],
      [r`\text{disk: } \sqrt{\tfrac{19.6}{1.5}} \approx 3.61\ \text{m/s}`, ""],
      [r`\text{hoop: } \sqrt{\tfrac{19.6}{2}} \approx 3.13\ \text{m/s}`, ""],
      [r`\text{frictionless block: } \sqrt{19.6} \approx 4.43\ \text{m/s}`, "No energy goes into spinning."],
    ]),
    activity("rolling-race", { title: "Race the shapes", params: { height: 1, angle: 20 } }),
    callout("tip", "Try this", r`Change the height and angle: the finishing order never changes, and the speeds at the bottom depend only on the height.`, "experiment"),
    callout("application", "Where this shows up", r`Bowling balls, wheels and tires. Racers lighten wheel rims specifically, because rim mass counts double: it adds both weight and rotational inertia.`),
  ],
  questions: [
    num(2, r`What fraction of a rolling solid disk's kinetic energy is rotational? Give a decimal to two places.`, 0.33, { tolerance: 0.01 }, ["For rolling, K_rot / K_total = β/(1 + β), where I = βMR²; a solid disk has β = ½."], r`$\frac{\beta}{1 + \beta} = \frac{0.5}{1.5}$.`),
    num(2, r`A bowling ball (solid sphere) rolls at 5 m/s. What is ω if R = 0.11 m? Round to one decimal place.`, 45.5, { tolerance: 0.1, unit: "rad/s" }, ["Rolling without slipping: v = ωR."], r`$\frac{5}{0.11}$.`),
    num(3, r`Find the acceleration of a solid sphere rolling down a 30° incline.`, 3.5, { tolerance: 0.01, unit: "m/s²" }, ["For rolling, a = g sin θ / (1 + β); a solid sphere has β = 2/5."], r`$\frac{g\sin 30°}{1.4} = \frac{4.9}{1.4}$.`),
    mc(3, r`A heavy and a light solid cylinder of different radii roll down the same ramp. Which reaches the bottom first?`, ["the heavy one", "the light one", "they tie", "the larger one"], 2, ["Rolling speed at the bottom is v = √(2gh/(1 + β)). Do mass or radius appear?"], r`The speed depends only on h and β.`, "review"),
  ],
});
