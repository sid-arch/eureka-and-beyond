import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "parallel-lines-transversals",
  title: "Angles formed by parallel lines and a transversal",
  summary: "Name corresponding, alternate interior, alternate exterior and same-side interior angles, and use the parallel-line angle relationships to find unknown angles.",
  minutes: 25,
  objectives: [
    "Identify angle pairs formed by two lines and a transversal.",
    "State the postulate and theorems relating these angles when the lines are parallel.",
    "Write and solve equations using these angle relationships.",
  ],
  concepts: [
    { slug: "parallel-lines", name: "Parallel lines and transversals", description: "Angle relationships formed when a transversal crosses two parallel lines.", subject: "subj_math" },
  ],
  blocks: [
    def("Transversal", r`A line that crosses two or more lines at different points. Two lines cut by a transversal make eight angles: four at each intersection.`),
    def("Angle pairs", r`Corresponding angles are in matching positions at the two intersections. Alternate interior angles are between the lines on opposite sides of the transversal. Alternate exterior angles are outside the lines on opposite sides. Same-side (consecutive) interior angles are between the lines on the same side.`),
    def("When the lines are parallel", r`Corresponding Angles Postulate: corresponding angles are congruent. From it follow: alternate interior angles are congruent, alternate exterior angles are congruent, and same-side interior angles are supplementary.`),
    text(r`Why are alternate interior angles congruent? Let $\angle 3$ and $\angle 6$ be alternate interior angles. $\angle 3$ corresponds to $\angle 7$ at the other intersection, so $\angle 3 \cong \angle 7$. And $\angle 7$ and $\angle 6$ are vertical angles, so $\angle 7 \cong \angle 6$. By the transitive property, $\angle 3 \cong \angle 6$.`),
    example(r`Parallel lines are cut by a transversal. Alternate interior angles measure $(5x - 12)^\circ$ and $(3x + 20)^\circ$. Find both angles.`, [
      [r`5x - 12 = 3x + 20`, "Alternate interior angles are congruent."],
      [r`x = 16 \Rightarrow 5(16) - 12 = 68^\circ`, "Both measure 68°."],
    ]),
    example(r`Same-side interior angles measure $(2x + 15)^\circ$ and $(4x - 9)^\circ$. Find $x$.`, [
      [r`(2x + 15) + (4x - 9) = 180`, "Same-side interior angles are supplementary."],
      [r`6x + 6 = 180 \Rightarrow x = 29`, "The angles are 73° and 107°."],
    ]),
    callout("tip", "Only two sizes", r`When a transversal crosses two parallel lines, all eight angles come in just two sizes: four acute angles that are equal and four obtuse angles that are equal (unless the transversal is perpendicular, when all eight are 90°). Any acute one and any obtuse one are supplementary.`),
    callout("warning", "The lines must be parallel", r`These congruences and supplements hold only when the lines are parallel. If they aren't marked or given as parallel, you can't use them.`),
    callout("application", "Where this shows up", r`Railroad tracks, lane markings and staircase railings use parallel lines. Carpenters cut stair stringers using alternate interior angles so every step is level.`),
  ],
  questions: [
    mc(1, r`Two angles lie between two parallel lines on opposite sides of the transversal. They are…`, ["Corresponding", "Alternate interior", "Alternate exterior", "Same-side interior"], 1, [], r`Between the lines and on opposite sides: alternate interior.`),
    num(1, r`Parallel lines are cut by a transversal. One angle is $63^\circ$. What is the measure of its corresponding angle?`, 63, { unit: "°" }, [], r`Corresponding angles are congruent: $63^\circ$.`),
    num(2, r`Same-side interior angles measure $3x^\circ$ and $(x + 40)^\circ$. Find $x$.`, 35, {}, ["They are supplementary."], r`$4x + 40 = 180$, $x = 35$.`),
    num(2, r`Alternate exterior angles measure $(6x + 4)^\circ$ and $(8x - 18)^\circ$. Find the angle.`, 70, { unit: "°" }, ["Set them equal: x = 11."], r`$6(11) + 4 = 70^\circ$.`),
    num(2, r`A transversal makes a $118^\circ$ angle with one of two parallel lines. What is the measure of each acute angle formed?`, 62, { unit: "°" }, ["Acute and obtuse angles are supplementary."], r`$180 - 118 = 62^\circ$.`),
    mc(3, r`Which reasoning shows that alternate interior angles are congruent?`, ["Linear pair + definition of parallel", "Corresponding Angles Postulate + Vertical Angles Theorem", "Angle Addition only", "Triangle angle sum"], 1, [], r`Each alternate interior angle is vertical to an angle that corresponds to the other.`, "review"),
  ],
});
