import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "triangle-inequalities",
  title: "Triangle inequalities",
  summary: "Use the Triangle Inequality Theorem to test side lengths and find the possible range of a third side, and relate the sizes of sides to the sizes of opposite angles.",
  minutes: 25,
  objectives: [
    "Decide whether three lengths can form a triangle.",
    "Find the range of possible lengths for the third side.",
    "Order the sides and angles of a triangle: the longest side is opposite the largest angle.",
  ],
  concepts: [
    { slug: "triangle-inequality", name: "Triangle inequality", description: "The sum of any two sides of a triangle is greater than the third side.", subject: "subj_math" },
  ],
  blocks: [
    def("Triangle Inequality Theorem", r`The sum of the lengths of any two sides of a triangle is greater than the length of the third side: $a + b > c$, $a + c > b$, $b + c > a$.`),
    text(r`Picture two short sticks hinged at one end, trying to span a long gap. If their combined length is less than the gap, or exactly equal to it, they can't rise to form a triangle; they lie flat. It's enough to check that the two shorter sides add up to more than the longest.`),
    example(r`Can 4, 7 and 12 be side lengths? What about 5, 8, 11?`, [
      [r`4 + 7 = 11 < 12`, "No triangle."],
      [r`5 + 8 = 13 > 11`, "Yes, a triangle."],
    ]),
    example(r`Two sides are 9 and 15. What lengths are possible for the third side $x$?`, [
      [r`x < 9 + 15 = 24`, ""],
      [r`x > 15 - 9 = 6`, ""],
      [r`6 < x < 24`, "The third side is between the difference and the sum."],
    ]),
    def("Sides and opposite angles", r`In a triangle, a longer side is opposite a larger angle, and a larger angle is opposite a longer side. So the longest side is across from the largest angle.`),
    activity("triangle-explorer", { title: "Compare sides and opposite angles", params: { show: "angles" } }),
    callout("tip", "Try this", r`Drag C until $\angle C$ is the largest angle. Is AB (opposite C) the longest side? Now try to drag C onto line AB: the simulation won't let the triangle flatten, because then the two sides would just add up to the third.`, "experiment"),
    example(r`In $\triangle PQR$, $m\angle P = 50^\circ$, $m\angle Q = 72^\circ$. Order the sides from shortest to longest.`, [
      [r`m\angle R = 58^\circ`, ""],
      [r`50 < 58 < 72`, "Angles in order: P, R, Q."],
      [r`QR < PQ < PR`, "Opposite sides: QR across from P, PQ across from R, PR across from Q."],
    ]),
    callout("application", "Where this shows up", r`The triangle inequality says a detour through a third point is never shorter than going straight, which is why GPS routing and network design use it to prune impossible shortcuts.`),
  ],
  questions: [
    mc(1, r`Which set of lengths can form a triangle?`, ["2, 3, 6", "3, 4, 7", "5, 6, 10", "1, 1, 3"], 2, ["Check the two shorter sides against the longest."], r`$5 + 6 = 11 > 10$. The others fail: $5 < 6$, $7 = 7$, $2 < 3$.`),
    short(2, r`Two sides of a triangle are 6 and 13. Give the range of the third side x as a<x<b.`, ["7<x<19"], ["Difference < x < sum."], r`$7 < x < 19$.`),
    mc(2, r`In $\triangle ABC$, $AB = 8$, $BC = 11$, $AC = 5$. Which angle is largest?`, [r`$\angle A$`, r`$\angle B$`, r`$\angle C$`, "They're equal"], 0, ["The largest angle is opposite the longest side."], r`$BC = 11$ is longest and is opposite $\angle A$.`),
    mc(2, r`In $\triangle XYZ$, $m\angle X = 40^\circ$ and $m\angle Y = 85^\circ$. Which side is shortest?`, [r`$\overline{XY}$`, r`$\overline{YZ}$`, r`$\overline{XZ}$`, "Can't tell"], 1, ["The smallest angle is ∠X (40°); ∠Z is 55°."], r`The shortest side is opposite the smallest angle, $\angle X$: that's $\overline{YZ}$.`),
    short(3, r`Two sides of an isosceles triangle are 4 and 9. What is the length of the third side?`, ["9"], ["Try 4 and 9 as the repeated side."], r`If the sides were 4, 4, 9, then $4 + 4 < 9$, impossible. So the sides are 4, 9, 9 and the third side is 9.`, "review"),
  ],
});
