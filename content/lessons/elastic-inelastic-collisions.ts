import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "elastic-inelastic-collisions",
  title: "Elastic and inelastic collisions",
  summary: "Classify collisions by what happens to kinetic energy, solve one-dimensional elastic collisions, and find the energy lost in inelastic ones.",
  minutes: 35,
  objectives: [
    "Distinguish elastic, inelastic and perfectly inelastic collisions.",
    "Solve 1D elastic collisions using momentum and kinetic energy conservation.",
    "Compute kinetic energy lost in inelastic collisions.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Types of collision", r`Momentum is conserved in every collision of an isolated system. Kinetic energy is conserved only in elastic collisions. In inelastic ones some KE becomes heat, sound and deformation; in perfectly inelastic ones the objects stick together and the most KE is lost.`),
    def("1D elastic collision, target at rest", r`$v_1' = \frac{m_1 - m_2}{m_1 + m_2}v_1$ and $v_2' = \frac{2m_1}{m_1 + m_2}v_1$. Equal masses swap velocities, as in Newton's cradle.`),
    example(r`A 2 kg cart at 3 m/s hits a 1 kg cart at rest, elastically`, [
      [r`v_1' = \tfrac{1}{3}(3) = 1\ \text{m/s}`, ""],
      [r`v_2' = \tfrac{4}{3}(3) = 4\ \text{m/s}`, ""],
      [r`K_{before} = \tfrac12(2)(9) = 9\ \text{J}`, ""],
      [r`K_{after} = \tfrac12(2)(1) + \tfrac12(1)(16) = 9\ \text{J}`, "Kinetic energy is conserved. ✓"],
    ]),
    example(r`The same carts stick together instead`, [
      [r`v' = \tfrac{2(3)}{3} = 2\ \text{m/s}`, ""],
      [r`K' = \tfrac12(3)(4) = 6\ \text{J}`, "3 J of kinetic energy is lost."],
    ]),
    callout("application", "Where this shows up", r`Crumple zones make car crashes very inelastic on purpose, so energy goes into deformation instead of passengers; billiard balls are nearly elastic.`),
    activity("collisions", { title: "Elastic or sticky?", params: { m1: 2, m2: 1, v1: 3, v2: 0, e: 1 } }),
    callout("tip", "Try this", r`Run the example's carts, then drag the bounciness from 1 to 0. Momentum stays the same every time; only the kinetic energy changes.`, "experiment"),
  ],
  questions: [
    num(2, r`A 1000 kg car at 20 m/s hits a 1500 kg car at rest; they lock together. Find their speed.`, 8, { unit: "m/s" }, ["Momentum is conserved; the cars move together afterward with one shared speed."], r`$\frac{20{,}000}{2500}$.`),
    num(3, r`How much kinetic energy is lost in that crash?`, 120000, { unit: "J" }, ["Find the kinetic energy before and after the crash, then subtract."], r`$200{,}000 - \frac12(2500)(64) = 120{,}000$ J.`),
    mc(2, r`A ball hits an identical ball at rest head-on, elastically. Afterward…`, ["both move at half speed", "the first stops and the second moves at the original speed", "both stop", "the first bounces back"], 1, ["Elastic and equal masses: conserve both momentum and kinetic energy. What simple outcome satisfies both?"], r`Equal masses swap velocities.`),
    mc(3, r`In which collision is momentum NOT conserved (isolated system)?`, ["elastic", "inelastic", "perfectly inelastic", "none of these"], 3, ["In an isolated system, which quantity is always conserved, whatever the type of collision?"], r`Momentum is conserved in all of them.`, "review"),
  ],
});
