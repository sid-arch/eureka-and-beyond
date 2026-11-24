import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "free-body-diagrams",
  title: "Free-body diagrams",
  summary: "Draw free-body diagrams with every force on one object, write Newton's second law along each axis, and solve for unknown forces and accelerations, including in elevators.",
  minutes: 30,
  objectives: [
    "Identify weight, normal force, tension, friction and applied forces.",
    "Draw one arrow per force acting on the chosen object.",
    "Apply ΣF = ma along chosen axes.",
  ],
  concepts: [
    { slug: "free-body-diagrams", name: "Free-body diagrams", description: "Diagrams showing every force acting on one object.", subject: "subj_phys" },
    { slug: "newtons-laws", name: "Newton's laws of motion", description: "Three laws relating forces to changes in motion.", subject: "subj_phys" },
  ],
  blocks: [
    def("Common forces", r`Weight $mg$ (down); normal force $F_N$ (perpendicular to a surface, pushing); tension $T$ (along a rope, pulling); friction (along a surface, opposing sliding); applied forces.`),
    example(r`A 5 kg mass hangs from a cable in an elevator accelerating upward at 2 m/s²`, [
      [r`T - mg = ma`, "Up is positive."],
      [r`T = 5(9.8 + 2) = 59\ \text{N}`, "More than the weight, 49 N."],
    ]),
    example(r`A 60 kg person stands on a scale in an elevator accelerating downward at 1.5 m/s²`, [
      [r`mg - F_N = ma`, "Down is positive."],
      [r`F_N = 60(9.8 - 1.5) = 498\ \text{N}`, "The scale reads less than the weight (588 N)."],
    ]),
    activity("forces-incline", { title: "A free-body diagram on a ramp" }),
    callout("warning", "Only forces ON the object", r`Don't include forces the object exerts on others, and don't add "ma" as a force. Velocity isn't a force either.`),
    callout("application", "Where this shows up", r`Structural engineers draw free-body diagrams of every joint in a bridge; elevator designers use them to size cables for the largest acceleration.`),
  ],
  questions: [
    num(1, r`A 2 kg book rests on a table. What normal force acts on it, in newtons?`, 19.6, { tolerance: 0.01, unit: "N" }, [], r`$F_N = mg$.`),
    num(2, r`A 10 kg box is pulled across a frictionless floor by a 30 N horizontal rope. Find its acceleration.`, 3, { unit: "m/s²" }, [], r`$\frac{30}{10}$.`),
    num(2, r`A 70 kg person in an elevator accelerating upward at 1 m/s² stands on a scale. What does the scale read, in newtons?`, 756, { unit: "N" }, [], r`$70(9.8 + 1) = 756$.`),
    mc(3, r`Which force does NOT belong on a free-body diagram of a block sliding down a ramp?`, ["Weight", "Normal force", "Friction", "The force the block exerts on the ramp"], 3, [], r`That force acts on the ramp.`, "review"),
  ],
});
