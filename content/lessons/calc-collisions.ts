import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-collisions",
  title: "Elastic and inelastic collisions",
  summary: "Solve 1D elastic collisions with the relative-velocity rule and analyze 2D collisions with components.",
  minutes: 40,
  objectives: [
    "Use the elastic-collision rule: relative velocity reverses, v₁ − v₂ = −(v₁′ − v₂′).",
    "Solve 2D collisions by conserving momentum in x and y separately.",
    "Show that equal masses in a 2D elastic collision (one at rest) leave at 90°.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Elastic shortcut", r`Combining momentum and kinetic-energy conservation in 1D gives a linear condition: the relative velocity reverses, $v_1 - v_2 = -(v_1' - v_2')$. Use it with the momentum equation instead of the squared energy equation.`),
    def("Two dimensions", r`Momentum is a vector, so conserve each component: $\sum p_x$ and $\sum p_y$ separately. For an elastic collision, kinetic energy is also conserved.`),
    example(r`A 1 kg puck at 4 m/s hits an identical puck at rest elastically; the first leaves at 30° from its original direction`, [
      [r`v_1' = 4\cos 30° \approx 3.46\ \text{m/s}`, ""],
      [r`v_2' = 4\sin 30° = 2\ \text{m/s}`, "At 60° on the other side: the angle between them is 90°."],
    ], r`Check: $3.46^2 + 2^2 = 16 = 4^2$. ✓`),
    callout("note", "Why 90°", r`For equal masses, $\vec v_1 = \vec v_1' + \vec v_2'$ and $v_1^2 = v_1'^2 + v_2'^2$. By the Pythagorean theorem, the two outgoing velocities must be perpendicular.`),
    callout("application", "Where this shows up", r`Billiards players use the 90° rule; particle physicists reconstruct invisible particles from momentum missing in collision products.`),
    activity("collisions", { title: "Collision lab", params: { m1: 1, m2: 4, v1: 6, v2: -1, e: 0.5 } }),
    callout("tip", "Try this", r`Set e = 1 and equal masses: the carts swap velocities. Then make one cart much heavier and see the light one bounce straight back.`, "experiment"),
  ],
  questions: [
    num(3, r`A 2 kg cart at 5 m/s hits a 3 kg cart at rest elastically. Find the 3 kg cart's final velocity.`, 4, { unit: "m/s" }, ["Elastic head-on with the target at rest: v₂′ = 2m₁v₁/(m₁ + m₂)."], r`$v_2' = \frac{2m_1}{m_1 + m_2}v_1 = \frac{4}{5}(5)$.`),
    num(2, r`Find the 2 kg cart's final velocity in that collision.`, -1, { unit: "m/s" }, ["Elastic head-on: v₁′ = (m₁ − m₂)v₁/(m₁ + m₂). A lighter cart bounces back."], r`$\frac{m_1 - m_2}{m_1 + m_2}v_1 = -\frac15(5)$.`),
    num(3, r`A 1 kg ball at 3 m/s east collides with a 1 kg ball at 4 m/s north; they stick. Find their speed.`, 2.5, { unit: "m/s" }, ["Conserve each momentum component separately: east and north.", "The combined mass moves with total momentum ÷ 2 kg."], r`$\frac{\sqrt{3^2 + 4^2}}{2}$.`),
    mc(3, r`In an elastic head-on collision, the speed of approach equals…`, ["zero", "the speed of separation", "twice the speed of separation", "the final speed of the heavier object"], 1, ["In an elastic collision, how does the relative velocity after compare with before?"], r`Relative velocity reverses.`, "review"),
  ],
});
