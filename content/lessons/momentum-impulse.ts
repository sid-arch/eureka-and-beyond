import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "momentum-impulse",
  title: "Momentum and impulse",
  summary: "Define momentum p = mv, relate force and time to change in momentum through impulse, and explain how increasing collision time reduces force.",
  minutes: 25,
  objectives: [
    "Compute momentum as a vector with sign.",
    "Apply J = FΔt = Δp.",
    "Explain safety designs that extend collision time.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Momentum and impulse", r`Momentum $\vec{p} = m\vec{v}$ (kg·m/s). Impulse $\vec{J} = \vec{F}_{\text{avg}}\Delta t$ (N·s) equals the change in momentum: $\vec{J} = \Delta\vec{p}$. This is Newton's second law rewritten.`),
    example(r`A 0.15 kg baseball at 40 m/s is caught and stopped in 0.01 s`, [
      [r`\Delta p = 0 - 0.15(40) = -6\ \text{kg·m/s}`, ""],
      [r`F = \tfrac{-6}{0.01} = -600\ \text{N}`, "Pulling the glove back (longer time) lowers the force."],
    ]),
    example(r`The same ball bounces off a wall at 40 m/s back`, [
      [r`\Delta p = 0.15(-40) - 0.15(40) = -12\ \text{kg·m/s}`, "Bouncing doubles the impulse."],
    ]),
    callout("application", "Where this shows up", r`Airbags, crumple zones, helmets and gym mats all extend the stopping time, so the same change in momentum happens with a smaller force.`),
  ],
  questions: [
    num(1, r`Find the momentum of a 1200 kg car at 15 m/s, in kg·m/s.`, 18000, { unit: "kg·m/s" }, [], r`$1200 \times 15$.`),
    num(2, r`A 0.5 kg ball's velocity changes from 6 m/s to −4 m/s. Find the impulse, in N·s.`, -5, { unit: "N·s" }, [], r`$0.5(-4 - 6)$.`),
    num(2, r`A 2000 N force acts on a 1000 kg car for 3 s from rest. Find its final speed.`, 6, { unit: "m/s" }, [], r`$\Delta p = 6000$, so $v = 6$.`),
    mc(3, r`Why do you bend your knees when landing from a jump?`, ["To reduce your momentum change", "To increase the stopping time and reduce the force", "To increase the impulse", "To lower your mass"], 1, [], r`Same impulse over a longer time means less force.`, "review"),
  ],
});
