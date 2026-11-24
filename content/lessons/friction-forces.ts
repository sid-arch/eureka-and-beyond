import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "friction-forces",
  title: "Friction",
  summary: "Model static and kinetic friction with coefficients, decide whether an object starts sliding, and find accelerations with friction.",
  minutes: 30,
  objectives: [
    "Distinguish static friction (up to μₛF_N) from kinetic friction (μₖF_N).",
    "Decide whether an applied force overcomes static friction.",
    "Find acceleration when kinetic friction acts.",
  ],
  concepts: [
    { slug: "friction", name: "Friction", description: "Forces that oppose sliding between surfaces in contact.", subject: "subj_phys" },
  ],
  formulas: ["kinetic-friction"],
  blocks: [
    def("Static and kinetic friction", r`Static friction adjusts to prevent sliding, up to a maximum $f_s \le \mu_s F_N$. Once sliding, kinetic friction is $f_k = \mu_k F_N$, usually with $\mu_k < \mu_s$. Both act parallel to the surface, opposing (attempted) sliding.`),
    example(r`A 20 kg box on a floor with $\mu_s = 0.5$, $\mu_k = 0.3$ is pushed with 120 N`, [
      [r`f_{s,\max} = 0.5(20)(9.8) = 98\ \text{N}`, "120 N > 98 N: it starts to slide."],
      [r`f_k = 0.3(196) = 58.8\ \text{N}`, ""],
      [r`a = \tfrac{120 - 58.8}{20} \approx 3.06\ \text{m/s}^2`, ""],
    ]),
    activity("forces-incline", { title: "Friction on a slope" }),
    callout("tip", "Static friction isn't always maximum", r`If you push a heavy box with 30 N and it doesn't move, static friction is exactly 30 N, not $\mu_s F_N$.`),
    callout("application", "Where this shows up", r`Anti-lock brakes keep tires rolling so static friction (larger) acts instead of kinetic friction, keeping steering control and usually shortening stopping distances on paved roads.`),
  ],
  questions: [
    num(1, r`A 50 N push doesn't move a box. What is the static friction force, in newtons?`, 50, { unit: "N" }, [], r`It matches the push.`),
    num(2, r`A 10 kg sled slides on snow with $\mu_k = 0.1$. What is the kinetic friction force, in newtons?`, 9.8, { tolerance: 0.01, unit: "N" }, [], r`$0.1 \times 98$.`),
    num(2, r`That sled is pulled horizontally with 30 N. Find its acceleration.`, 2.02, { tolerance: 0.01, unit: "m/s²" }, [], r`$\frac{30 - 9.8}{10} = 2.02$.`),
    mc(3, r`A car skids to a stop. Doubling its mass (same tires and road) makes the deceleration…`, ["half as large", "the same", "twice as large", "four times as large"], 1, [], r`$a = \frac{\mu_k mg}{m} = \mu_k g$.`, "review"),
  ],
});
