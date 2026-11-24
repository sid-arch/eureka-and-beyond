import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reflections",
  title: "Reflections",
  summary: "Reflect figures across the axes and the lines y = x and y = −x, describe reflections with coordinate rules, and find lines of symmetry.",
  minutes: 25,
  objectives: [
    "Define a reflection using the perpendicular bisector.",
    "Use coordinate rules for reflections across the x-axis, y-axis, y = x and y = −x, and across horizontal or vertical lines.",
    "Identify lines of symmetry and explain how reflections change orientation.",
  ],
  concepts: [
    { slug: "rigid-motions", name: "Rigid motions", description: "Transformations that preserve distance and angle measure: translations, reflections and rotations.", subject: "subj_math" },
  ],
  blocks: [
    def("Reflection", r`A reflection across line $\ell$ maps each point $P$ to $P'$ so that $\ell$ is the perpendicular bisector of $\overline{PP'}$. Points on $\ell$ stay where they are.`),
    def("Coordinate rules", r`Across the $x$-axis: $(x, y) \to (x, -y)$. Across the $y$-axis: $(x, y) \to (-x, y)$. Across $y = x$: $(x, y) \to (y, x)$. Across $y = -x$: $(x, y) \to (-y, -x)$.`),
    activity("transformations", { title: "Reflect a triangle", params: { kind: "reflect" } }),
    callout("tip", "Try this", r`Choose each line of reflection and compare A′ with A(1, 1). Which line leaves A fixed? (Points on the mirror line don't move.) Also notice the vertex order: A, B, C runs counterclockwise, but A′, B′, C′ runs clockwise.`, "experiment"),
    example(r`Reflect $P(3, -2)$ across the line $x = 1$`, [
      [r`3 - 1 = 2`, "P is 2 units right of the mirror line."],
      [r`P'(1 - 2, -2) = (-1, -2)`, "Go the same distance on the other side; y doesn't change."],
    ]),
    example(r`Reflect $\overline{AB}$ with $A(2, 5)$, $B(-1, 3)$ across $y = x$`, [
      [r`A'(5, 2),\ B'(3, -1)`, "Swap the coordinates."],
    ], r`Check: the midpoint of $AA'$ is $(3.5, 3.5)$, which lies on $y = x$, and $\overline{AA'}$ has slope $-1$, perpendicular to $y = x$. ✓`),
    text(r`A reflection is a rigid motion, so lengths and angles are preserved, but it reverses orientation: a clockwise labeling becomes counterclockwise. A figure has line symmetry if some reflection maps it onto itself. A square has 4 lines of symmetry, a (non-square) rectangle 2, an isosceles triangle that isn't equilateral 1, and an equilateral triangle 3.`),
    callout("application", "Where this shows up", r`Mirrors, symmetric logos and the left-right symmetry of the human face are reflections. Light reflecting from a flat mirror follows the same perpendicular-bisector rule.`),
  ],
  questions: [
    short(1, r`Reflect $(4, 7)$ across the $x$-axis. Enter as (x,y).`, ["(4,-7)"], [], r`$(4, -7)$.`),
    short(1, r`Reflect $(-5, 2)$ across the $y$-axis. Enter as (x,y).`, ["(5,2)"], [], r`$(5, 2)$.`),
    short(2, r`Reflect $(6, -1)$ across $y = -x$. Enter as (x,y).`, ["(1,-6)"], [r`$(x, y) \to (-y, -x)$.`], r`$(-(-1), -6) = (1, -6)$.`),
    short(2, r`Reflect $(2, 4)$ across the line $y = 1$. Enter as (x,y).`, ["(2,-2)"], ["The point is 3 above the line."], r`3 below the line: $(2, -2)$.`),
    mc(2, r`How many lines of symmetry does a regular hexagon have?`, ["2", "3", "6", "12"], 2, ["Lines through opposite vertices and through midpoints of opposite sides."], r`3 through opposite vertices and 3 through opposite side midpoints: 6.`),
    short(3, r`$P(1, 3)$ reflects to $P'(7, 3)$. What is the equation of the line of reflection?`, ["x=4"], ["The mirror is the perpendicular bisector of PP′."], r`The midpoint is $(4, 3)$ and $PP'$ is horizontal, so the mirror line is $x = 4$.`, "review"),
  ],
});
