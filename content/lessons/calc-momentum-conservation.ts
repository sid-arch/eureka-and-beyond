import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "calc-momentum-conservation",
  title: "Conservation of linear momentum",
  summary: "Derive momentum conservation from Newton's third law, and solve explosions and the ballistic pendulum by combining momentum and energy.",
  minutes: 35,
  objectives: [
    "Derive conservation of momentum from the third law and F = dp/dt.",
    "Solve explosions and recoil problems.",
    "Solve the ballistic pendulum, using momentum for the collision and energy for the swing.",
  ],
  concepts: [
    { slug: "momentum", name: "Momentum", description: "Mass times velocity; conserved in isolated systems.", subject: "subj_phys" },
  ],
  formulas: ["momentum-impulse"],
  blocks: [
    def("Why it's conserved", r`For two interacting objects, $\frac{d\vec p_1}{dt} = \vec F_{21}$ and $\frac{d\vec p_2}{dt} = \vec F_{12} = -\vec F_{21}$. Adding gives $\frac{d}{dt}(\vec p_1 + \vec p_2) = 0$. With no external force, total momentum is constant, whatever the internal forces do.`),
    example(r`A 3 kg object at rest explodes into 1 kg at +6 m/s and a 2 kg piece`, [
      [r`0 = 1(6) + 2v \Rightarrow v = -3\ \text{m/s}`, ""],
    ]),
    example(r`Ballistic pendulum: a 0.01 kg bullet embeds in a 2 kg block, which swings up 0.1 m`, [
      [r`V = \sqrt{2gh} = \sqrt{2(9.8)(0.1)} = 1.4\ \text{m/s}`, "Energy is conserved during the swing."],
      [r`v_{bullet} = \tfrac{(2.01)(1.4)}{0.01} \approx 281\ \text{m/s}`, "Momentum is conserved in the collision (energy is not)."],
    ]),
    callout("warning", "Order matters", r`Don't apply energy conservation to the embedding collision itself: most of the bullet's kinetic energy becomes heat and deformation.`),
    callout("application", "Where this shows up", r`Rocket staging, gun recoil and forensic ballistics; before electronic chronographs, ballistic pendulums were how bullet speeds were measured.`),
    activity("collisions", { title: "Collision lab", params: { m1: 3, m2: 1, v1: 2, v2: -2, e: 0 } }),
    callout("tip", "Try this", r`With e = 0 the carts stick. Check that their shared velocity equals total momentum divided by total mass.`, "experiment"),
  ],
  questions: [
    num(2, r`A 60 kg skater at rest throws a 3 kg ball forward at 10 m/s. Find the skater's recoil speed.`, 0.5, { unit: "m/s" }, ["Total momentum starts at zero, so the skater's and ball's momenta must cancel."], r`$\frac{30}{60}$.`),
    num(3, r`A 0.02 kg bullet hits a 1.98 kg block, which rises 0.2 m. Find the bullet's speed, to the nearest m/s.`, 198, { tolerance: 1, unit: "m/s" }, ["Two stages: energy conservation for the rise gives the block's speed V = √(2gh).", "Momentum conservation in the collision then gives the bullet's speed."], r`$V = \sqrt{3.92} = 1.98$; $v = \frac{2(1.98)}{0.02}$.`),
    mc(2, r`In a ballistic pendulum, which is conserved during the collision?`, ["kinetic energy", "momentum", "both", "neither"], 1, ["The bullet embeds, so the collision is perfectly inelastic. Which quantity survives that?"], r`It's perfectly inelastic.`),
    mc(3, r`Total momentum is conserved when…`, ["no internal forces act", "the net external force is zero", "the collision is elastic", "objects stick"], 1, ["dp/dt for the system equals the net external force."], r`Internal forces cancel in pairs.`, "review"),
  ],
});
