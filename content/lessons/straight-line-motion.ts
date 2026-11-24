import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "straight-line-motion",
  title: "Straight-line motion: connecting position, velocity and acceleration",
  summary: "Use derivatives of position to find velocity and acceleration, decide when a particle moves left or right, is at rest, or is speeding up or slowing down.",
  minutes: 30,
  objectives: [
    "Compute v(t) = s′(t) and a(t) = v′(t) = s″(t).",
    "Determine direction of motion and when the particle is at rest.",
    "Decide whether the particle is speeding up (v and a same sign) or slowing down.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Motion along a line", r`Position $s(t)$; velocity $v(t) = s'(t)$ (sign gives direction); speed $|v(t)|$; acceleration $a(t) = v'(t)$. The particle is speeding up when $v$ and $a$ have the same sign, and slowing down when their signs differ.`),
    example(r`$s(t) = t^3 - 6t^2 + 9t$ meters, $t \ge 0$`, [
      [r`v(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)`, ""],
      [r`\text{at rest at } t = 1, 3;\ \text{moving left on } (1, 3)`, "v < 0 there."],
      [r`a(t) = 6t - 12`, "a < 0 for t < 2, a > 0 for t > 2."],
      [r`\text{speeding up on } (1, 2) \text{ and } (3, \infty)`, "Where v and a share a sign."],
    ]),
    example(r`Total distance traveled on $[0, 3]$`, [
      [r`s(0) = 0,\ s(1) = 4,\ s(3) = 0`, "Split at the turn (t = 1)."],
      [r`|4 - 0| + |0 - 4| = 8 \text{ m}`, "Displacement is 0, but distance is 8."],
    ]),
    callout("warning", "Speeding up isn't 'a > 0'", r`A car moving left ($v < 0$) with $a < 0$ is speeding up. Compare signs of $v$ and $a$.`),
    callout("application", "Where this shows up", r`Elevator controllers, robot arms and self-driving cars all track position, velocity and acceleration as derivatives of one another.`),
  ],
  questions: [
    num(1, r`For $s(t) = t^3 - 6t^2 + 9t$, find the velocity at $t = 2$, in m/s.`, -3, { unit: "m/s" }, [], r`$12 - 24 + 9 = -3$.`),
    num(1, r`What is the speed at $t = 2$?`, 3, { unit: "m/s" }, [], r`$|{-3}| = 3$.`),
    mc(2, r`At $t = 2.5$, is the particle speeding up or slowing down?`, ["Speeding up", "Slowing down", "At rest", "Can't tell"], 1, [r`Find the signs of $v(2.5)$ and $a(2.5)$ separately.`, r`Same signs mean speeding up; opposite signs mean slowing down.`], r`Opposite signs: slowing down.`),
    num(3, r`A ball's height is $h(t) = -16t^2 + 48t$ feet. Find its acceleration in ft/s².`, -32, { unit: "ft/s²" }, [], r`$h'' = -32$.`, "review"),
  ],
});
