import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "momentum-conservation",
  title: "Conservation of momentum in collisions",
  summary: "Use conservation of momentum to analyze collisions and explosions, and classify collisions as elastic or inelastic by what happens to kinetic energy.",
  minutes: 30,
  objectives: [
    "Apply total momentum before = total momentum after for an isolated system.",
    "Solve perfectly inelastic collisions and recoil problems.",
    "Compare kinetic energy before and after to classify collisions.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Conservation of momentum", r`If no external net force acts on a system, its total momentum is constant: $m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$. This follows from Newton's third law: the objects exert equal and opposite impulses on each other.`),
    example(r`A 2 kg cart at 3 m/s hits a 1 kg cart at rest; they stick together`, [
      [r`2(3) + 1(0) = (3)v' \Rightarrow v' = 2\ \text{m/s}`, ""],
      [r`KE: 9\ \text{J before},\ 6\ \text{J after}`, "Perfectly inelastic: 3 J became heat and sound."],
    ]),
    example(r`Recoil: a 4 kg rifle fires a 0.01 kg bullet at 400 m/s`, [
      [r`0 = 0.01(400) + 4v_r \Rightarrow v_r = -1\ \text{m/s}`, "The rifle moves backward."],
    ]),
    def("Collision types", r`Elastic: kinetic energy is conserved (billiard balls, approximately). Inelastic: some KE becomes other forms. Perfectly inelastic: the objects stick together. Momentum is conserved in all three.`),
    callout("application", "Where this shows up", r`Crash investigators use momentum conservation to work out cars' speeds before a collision from where the wreckage ended up.`),
    activity("collisions", { title: "Momentum before and after", params: { m1: 1, m2: 1, v1: 4, v2: 0, e: 0 } }),
    callout("tip", "Try this", r`Change the masses and speeds, then compare the momentum readout before and after. It never changes, whatever the bounciness.`, "experiment"),
  ],
  questions: [
    num(1, r`A 60 kg skater at rest pushes a 40 kg skater, who moves off at 3 m/s. Find the first skater's speed.`, 2, { unit: "m/s" }, [], r`$60v = 40(3)$.`),
    num(2, r`A 1500 kg car at 20 m/s rear-ends a 1000 kg car at 10 m/s; they lock together. Find their speed.`, 16, { unit: "m/s" }, [], r`$\frac{30000 + 10000}{2500} = 16$.`),
    mc(2, r`In which collision is kinetic energy conserved?`, ["Perfectly inelastic", "Elastic", "Any collision", "None"], 1, [], r`That's the definition of elastic.`),
    mc(3, r`Two equal masses collide head-on elastically, one moving at 5 m/s and the other at rest. Afterward…`, ["both move at 2.5 m/s", "the first stops and the second moves at 5 m/s", "both stop", "the first bounces back at 5 m/s"], 1, [], r`Equal masses exchange velocities in an elastic head-on collision (Newton's cradle).`, "review"),
  ],
});
