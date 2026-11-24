import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "proving-lines-parallel",
  title: "Proving lines parallel",
  summary: "Use the converses of the parallel-line angle theorems to prove two lines are parallel, and find values that make lines parallel.",
  minutes: 25,
  objectives: [
    "State the converses of the corresponding, alternate interior, alternate exterior and same-side interior angle theorems.",
    "Decide which lines in a figure are parallel from given angle measures.",
    "Find the value of a variable that makes two lines parallel, and prove lines parallel.",
  ],
  concepts: [
    { slug: "parallel-lines", name: "Parallel lines and transversals", description: "Angle relationships formed when a transversal crosses two parallel lines.", subject: "subj_math" },
  ],
  blocks: [
    text(r`The previous lesson started with parallel lines and concluded things about angles. Now go the other way: if the angles have the right relationship, the lines must be parallel. These converses are how you prove lines are parallel.`),
    def("Converses", r`If two lines are cut by a transversal so that any of these hold, the lines are parallel: corresponding angles are congruent; alternate interior angles are congruent; alternate exterior angles are congruent; same-side interior angles are supplementary.`),
    def("Other parallel theorems", r`Two lines parallel to the same line are parallel to each other. Two lines perpendicular to the same line (in a plane) are parallel to each other.`),
    example(r`Find $x$ so that lines $\ell$ and $m$ are parallel, if corresponding angles measure $(4x - 7)^\circ$ and $(2x + 31)^\circ$.`, [
      [r`4x - 7 = 2x + 31`, "Converse of the Corresponding Angles Postulate."],
      [r`x = 19`, "Both angles are 69°, so ℓ ∥ m."],
    ]),
    example(r`Two lines are cut by a transversal, and same-side interior angles measure $75^\circ$ and $105^\circ$. Are the lines parallel?`, [
      [r`75 + 105 = 180`, "Same-side interior angles are supplementary."],
      [r`\text{yes, the lines are parallel}`, "Converse of the Same-Side Interior Angles Theorem."],
    ]),
    callout("warning", "Pick the right pair of lines", r`In a figure with several lines, congruent angles prove parallel only the two lines that the transversal crosses to form those angles. Trace the angle's sides to see which lines they lie on.`),
    callout("application", "Where this shows up", r`Builders check that walls are parallel by measuring the angles a crossing beam makes with each. Surveyors verify that property lines are parallel the same way.`),
  ],
  questions: [
    num(1, r`Alternate interior angles measure $(3x + 12)^\circ$ and $(5x - 20)^\circ$. What value of $x$ makes the lines parallel?`, 16, {}, ["Set the angles equal."], r`$2x = 32$, $x = 16$.`),
    num(2, r`Same-side interior angles measure $(2x + 10)^\circ$ and $(3x - 5)^\circ$. What value of $x$ makes the lines parallel?`, 35, {}, ["They must be supplementary."], r`$5x + 5 = 180$, $x = 35$.`),
    mc(2, r`Corresponding angles measure $72^\circ$ and $78^\circ$. What can you conclude?`, ["The lines are parallel", "The lines are not parallel", "The lines are perpendicular", "Nothing"], 1, ["If the lines were parallel, the angles would be equal."], r`If the lines were parallel, corresponding angles would be congruent. They aren't, so the lines are not parallel.`),
    mc(2, r`Lines $a$ and $b$ are both perpendicular to line $c$ in the same plane. What is true?`, [r`$a \perp b$`, r`$a \parallel b$`, r`$a = c$`, "Nothing can be concluded"], 1, [], r`Two lines perpendicular to the same line are parallel.`),
    mc(3, r`Which condition does NOT prove two lines parallel?`, ["Alternate interior angles congruent", "Corresponding angles congruent", "Same-side interior angles congruent", "Alternate exterior angles congruent"], 2, ["Same-side interior angles need a different relationship."], r`Same-side interior angles must be supplementary. They are congruent only if both are $90^\circ$, which isn't guaranteed.`, "review"),
  ],
});
