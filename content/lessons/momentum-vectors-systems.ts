import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "momentum-vectors-systems",
  title: "Linear momentum",
  summary: "Treat momentum as a vector, add the momenta of objects in a system, and connect total momentum to the velocity of the center of mass.",
  minutes: 25,
  objectives: [
    "Compute momentum p = mv with direction, in one and two dimensions.",
    "Add momenta of objects as vectors to find the system's total momentum.",
    "Relate total momentum to the center of mass: p_total = M v_cm.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Momentum is a vector", r`$\vec p = m\vec v$, in kg·m/s, pointing along the velocity. In one dimension, the sign gives the direction; in two dimensions, add components separately.`),
    example(r`A 2 kg puck moves east at 3 m/s; a 1 kg puck moves north at 4 m/s`, [
      [r`\vec p = (6,\ 4)\ \text{kg·m/s}`, ""],
      [r`|\vec p| = \sqrt{6^2 + 4^2} \approx 7.21\ \text{kg·m/s}`, ""],
    ]),
    def("Systems", r`A system's total momentum is $\vec p_{tot} = \sum m_i\vec v_i = M\vec v_{cm}$. So the center of mass moves at $\vec v_{cm} = \frac{\vec p_{tot}}{M}$, and Newton's second law becomes $\sum\vec F_{ext} = \frac{\Delta\vec p_{tot}}{\Delta t}$.`),
    example(r`A 3 kg cart at +2 m/s and a 1 kg cart at −4 m/s`, [
      [r`p_{tot} = 3(2) + 1(-4) = 2\ \text{kg·m/s}`, ""],
      [r`v_{cm} = \tfrac{2}{4} = 0.5\ \text{m/s}`, "This won't change in any collision between them."],
    ]),
    callout("warning", "A common mistake", r`Two objects with equal and opposite momenta have zero total momentum, even though each is moving and the system has plenty of kinetic energy.`),
    callout("application", "Where this shows up", r`Air-traffic and ship-collision models track momenta as vectors, and accident reconstruction adds the momenta of cars that skid off at angles.`),
  ],
  questions: [
    num(1, r`Find the momentum of a 0.15 kg ball moving at 40 m/s.`, 6, { unit: "kg·m/s" }, ["p = mv."], r`$0.15 \times 40$.`),
    num(2, r`A 5 kg object moves at +2 m/s and a 2 kg object at −5 m/s. Find the total momentum.`, 0, { unit: "kg·m/s" }, ["Momentum is a vector: keep the signs and add."], r`$10 - 10$.`),
    num(2, r`Find the center-of-mass velocity of a 4 kg cart at 3 m/s and a 2 kg cart at rest.`, 2, { unit: "m/s" }, ["v_cm = total momentum / total mass."], r`$\frac{12}{6}$.`),
    mc(3, r`A ball bounces straight back off a wall with the same speed. Its momentum…`, ["is unchanged", "changes by 2mv", "changes by mv", "becomes zero"], 1, ["Δp = p_final − p_initial, and the direction reverses."], r`$\Delta p = mv - (-mv)$.`, "review"),
  ],
});
