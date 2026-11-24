import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "newtons-first-law",
  title: "Newton's first law and inertia",
  summary: "Understand that objects keep their velocity unless a net force acts, connect inertia to mass, and analyze objects in equilibrium.",
  minutes: 25,
  objectives: [
    "State Newton's first law.",
    "Explain inertia and its connection to mass.",
    "Use the equilibrium condition ΣF = 0 to find an unknown force.",
  ],
  concepts: [
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("First law", r`An object at rest stays at rest, and an object in motion keeps moving at constant velocity, unless acted on by a nonzero net force. Motion doesn't need a force; changes in motion do.`),
    def("Inertia and equilibrium", r`Inertia is the tendency to resist changes in velocity; mass measures it. An object with zero net force (at rest or at constant velocity) is in equilibrium: $\sum \vec{F} = 0$.`),
    example(r`A crate slides at constant velocity while pushed with 120 N. How large is the friction force?`, [
      [r`\text{constant velocity} \Rightarrow \sum F = 0`, ""],
      [r`f = 120\ \text{N, opposite the push}`, ""],
    ]),
    callout("warning", "A common misconception", r`A hockey puck gliding across ice doesn't need a force to keep moving; it slows only because of a little friction. The ancient idea that motion needs a constant push is wrong.`),
    callout("application", "Where this shows up", r`Seat belts exist because of inertia: in a sudden stop, your body keeps moving forward until a force (the belt, ideally) stops it.`),
  ],
  questions: [
    mc(1, r`A spacecraft far from any star or planet turns off its engines. It will…`, ["slow down and stop", "keep moving at constant velocity", "speed up", "fall"], 1, [], r`No net force, no change in velocity.`),
    num(2, r`A lamp hangs at rest from a cord. Its weight is 30 N. What is the tension in the cord, in newtons?`, 30, { unit: "N" }, [], r`Equilibrium: tension balances weight.`),
    mc(2, r`Which has more inertia?`, ["A 2 kg ball moving fast", "A 10 kg ball at rest", "They're equal", "Depends on speed"], 1, [], r`Inertia depends only on mass.`),
    mc(3, r`A car moves at a constant 25 m/s on a straight highway. The net force on it is…`, ["forward", "backward", "zero", "equal to its weight"], 2, [], r`Constant velocity means equilibrium; engine force balances drag and friction.`, "review"),
  ],
});
