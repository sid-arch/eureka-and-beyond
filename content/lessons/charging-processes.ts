import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "charging-processes",
  title: "Conservation of charge and charging processes",
  summary: "Apply conservation of charge, and explain charging by friction, conduction and induction, polarization and grounding.",
  minutes: 30,
  objectives: [
    "Apply conservation of charge to contact between conductors.",
    "Describe charging by friction, conduction and induction.",
    "Explain polarization and grounding, and interpret electroscopes.",
  ],
  concepts: [
    { slug: "electrostatics", name: "Electrostatics", description: "Forces and fields produced by electric charges at rest.", subject: "subj_phys" },
  ],
  blocks: [
    def("Conservation of charge", r`The net charge of an isolated system never changes; charge only moves. When identical conducting spheres touch, they share their total charge equally.`),
    example(r`Identical spheres with +6 μC and −2 μC touch and then separate`, [
      [r`Q_{total} = 6 + (-2) = 4\ \mu\text{C}`, ""],
      [r`\text{each: } +2\ \mu\text{C}`, "Electrons flowed from the negative sphere to the positive one."],
    ]),
    def("Three ways to charge", r`Friction: rubbing transfers electrons between materials (rubber takes electrons from fur). Conduction: touching a charged object shares charge, so the object ends with the same sign. Induction: bring a charged rod near a conductor (without touching), ground the far side, remove the ground, then the rod; the conductor ends with the opposite sign.`),
    def("Polarization and grounding", r`A charged object shifts charges within a nearby neutral object (polarization), so the neutral object is attracted. Grounding connects an object to Earth, a huge reservoir that can supply or absorb electrons.`),
    callout("application", "Where this shows up", r`Fuel trucks ground themselves before pumping, and electroscopes, whose leaves spread when charged, were among the first instruments used to detect radiation.`),
  ],
  questions: [
    num(2, r`Three identical spheres hold +8, 0 and −2 nC. Sphere A touches B, then B touches C. Find C's final charge.`, 1, { unit: "nC" }, [], r`A and B: +4 each. B and C: $\frac{4 - 2}{2} = 1$.`),
    mc(2, r`A negatively charged rod charges a sphere by induction. The sphere ends up…`, ["negative", "positive", "neutral", "it depends on the sphere's size"], 1, [], r`Grounding lets electrons be pushed away to Earth.`),
    mc(2, r`A negatively charged rod touches a neutral electroscope. The leaves become…`, ["positive and spread", "negative and spread", "neutral", "negative and collapse"], 1, [], r`Charging by conduction gives the same sign.`),
    mc(3, r`A charged comb picks up neutral bits of paper because…`, ["the paper is charged", "the paper polarizes, and the nearer opposite charge is pulled more strongly", "of gravity", "of magnetism"], 1, [], r`Force falls off with distance.`, "review"),
  ],
});
