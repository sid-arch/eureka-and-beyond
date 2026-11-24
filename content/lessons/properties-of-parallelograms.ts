import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "properties-of-parallelograms",
  title: "Properties of parallelograms",
  summary: "Use the side, angle and diagonal properties of parallelograms, and prove that a quadrilateral is a parallelogram.",
  minutes: 30,
  objectives: [
    "State and use the properties of parallelograms: opposite sides and angles congruent, consecutive angles supplementary, diagonals bisect each other.",
    "Solve for unknowns using these properties.",
    "Prove a quadrilateral is a parallelogram using one of the standard tests.",
  ],
  concepts: [
    { slug: "parallelograms", name: "Parallelograms", description: "Quadrilaterals with both pairs of opposite sides parallel.", subject: "subj_math" },
  ],
  blocks: [
    def("Parallelogram", r`A quadrilateral with both pairs of opposite sides parallel.`),
    def("Properties", r`In a parallelogram: opposite sides are congruent; opposite angles are congruent; consecutive angles are supplementary; the diagonals bisect each other.`),
    text(r`Why? Draw diagonal $\overline{AC}$ in parallelogram $ABCD$. The parallel sides give two pairs of congruent alternate interior angles, and $\overline{AC}$ is shared, so $\triangle ABC \cong \triangle CDA$ by ASA. By CPCTC, opposite sides and opposite angles are congruent. Consecutive angles are same-side interior angles between parallel lines, so they're supplementary.`),
    example(r`In parallelogram $ABCD$, $m\angle A = (3x + 15)^\circ$ and $m\angle B = (5x - 3)^\circ$. Find each angle.`, [
      [r`3x + 15 + 5x - 3 = 180`, "Consecutive angles are supplementary."],
      [r`8x + 12 = 180 \Rightarrow x = 21`, ""],
      [r`m\angle A = 78^\circ,\ m\angle B = 102^\circ`, ""],
      [r`m\angle C = 78^\circ,\ m\angle D = 102^\circ`, "Opposite angles are congruent."],
    ]),
    example(r`The diagonals of parallelogram $PQRS$ meet at $T$. $PT = 2y + 1$ and $TR = 4y - 7$. Find $PR$.`, [
      [r`2y + 1 = 4y - 7 \Rightarrow y = 4`, "Diagonals bisect each other."],
      [r`PT = 9,\ PR = 18`, ""],
    ]),
    def("Proving a quadrilateral is a parallelogram", r`It's enough to show any one of: both pairs of opposite sides parallel; both pairs of opposite sides congruent; both pairs of opposite angles congruent; the diagonals bisect each other; or one pair of opposite sides both parallel and congruent.`),
    callout("warning", "One pair isn't enough (usually)", r`One pair of parallel sides makes a trapezoid. One pair of congruent sides proves nothing by itself. The exception: one pair that is both parallel and congruent.`),
    callout("application", "Where this shows up", r`Scissor lifts, folding gates and car-jack linkages are parallelograms: as they move, opposite sides stay parallel, which keeps a platform level.`),
  ],
  questions: [
    num(1, r`In a parallelogram one angle measures $65^\circ$. What is the measure of a consecutive angle?`, 115, { unit: "°" }, [], r`$180 - 65 = 115^\circ$.`),
    num(2, r`In parallelogram $ABCD$, $AB = 3x - 2$ and $CD = x + 12$. Find $AB$.`, 19, {}, ["Opposite sides are congruent."], r`$x = 7$, so $AB = 19$.`),
    num(2, r`The diagonals of a parallelogram meet at $M$. One diagonal has halves $5n$ and $n + 12$. Find the length of that diagonal.`, 30, {}, [], r`$5n = n + 12$, $n = 3$, halves are 15, so the diagonal is 30.`),
    mc(2, r`Which is NOT always true of a parallelogram?`, ["Opposite sides are congruent", "Diagonals bisect each other", "Diagonals are congruent", "Opposite angles are congruent"], 2, [], r`Congruent diagonals happen only in rectangles.`),
    mc(3, r`Which information proves $ABCD$ is a parallelogram?`, [r`$AB = CD$ and $BC \parallel AD$`, r`$AB \parallel CD$ and $AB = CD$`, r`$\angle A \cong \angle C$ only`, r`$AC = BD$`], 1, [], r`One pair of opposite sides that is both parallel and congruent is enough. Option A can describe an isosceles trapezoid.`, "review"),
  ],
});
