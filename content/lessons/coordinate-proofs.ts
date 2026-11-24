import { callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "coordinate-proofs",
  title: "Coordinate proofs",
  summary: "Place figures on the coordinate plane with general coordinates and prove properties with the slope, distance and midpoint formulas.",
  minutes: 35,
  objectives: [
    "Place a figure conveniently on the coordinate plane using variables for coordinates.",
    "Use slope, distance and midpoint formulas to prove properties of triangles and quadrilaterals.",
    "Explain why a proof with variable coordinates covers every case.",
  ],
  concepts: [
    { slug: "coordinate-geometry", name: "Coordinate geometry", description: "Studying geometric figures with coordinates and algebra.", subject: "subj_math" },
  ],
  formulas: ["midpoint-formula", "distance-formula", "slope"],
  blocks: [
    text(r`A coordinate proof translates geometry into algebra. Using letters like $(a, 0)$ and $(b, c)$ instead of specific numbers makes the result hold for every figure of that type, not just one example.`),
    def("Placing figures", r`Use the origin and the axes to reduce the number of variables: put a vertex at $(0, 0)$ and a side along the $x$-axis. Use coordinates like $2a$ when you'll need midpoints, to avoid fractions.`),
    example(r`Prove: the midpoint of the hypotenuse of a right triangle is equidistant from all three vertices`, [
      [r`O(0, 0),\ A(2a, 0),\ B(0, 2b)`, "Right angle at the origin, legs on the axes."],
      [r`M = (a, b)`, "Midpoint of the hypotenuse AB."],
      [r`MO = \sqrt{a^2 + b^2},\ MA = \sqrt{(2a - a)^2 + b^2} = \sqrt{a^2 + b^2}`, ""],
      [r`MB = \sqrt{a^2 + (b - 2b)^2} = \sqrt{a^2 + b^2}`, "All three are equal. ∎"],
    ]),
    example(r`Prove: the diagonals of a parallelogram bisect each other`, [
      [r`O(0, 0),\ A(2a, 0),\ B(2a + 2b, 2c),\ C(2b, 2c)`, "A general parallelogram: OA and CB are horizontal and equal."],
      [r`\text{midpoint of } \overline{OB} = (a + b, c)`, ""],
      [r`\text{midpoint of } \overline{AC} = (a + b, c)`, "Same point, so the diagonals bisect each other. ∎"],
    ]),
    example(r`Prove: the segment joining midpoints of two sides of a triangle is parallel to the third side and half as long`, [
      [r`A(0, 0),\ B(2a, 0),\ C(2b, 2c)`, ""],
      [r`M = (b, c),\ N = (a + b, c)`, "Midpoints of AC and BC."],
      [r`m_{MN} = 0 = m_{AB},\ MN = a = \tfrac{1}{2}AB`, "Parallel (both horizontal) and half the length. ∎"],
    ]),
    callout("warning", "Don't assume extra properties", r`If the theorem is about any parallelogram, your coordinates must describe a general one. Using a rectangle or square would prove a weaker result.`),
    callout("application", "Where this shows up", r`Computer graphics, CAD and robotics do geometry entirely in coordinates. Analytic geometry, Descartes's idea of merging algebra with geometry, underpins calculus.`),
  ],
  questions: [
    mc(1, r`Which is the most convenient placement for a general rectangle?`, [r`$(0, 0), (a, 0), (a, b), (0, b)$`, r`$(1, 2), (5, 2), (5, 7), (1, 7)$`, r`$(0, 0), (a, 0), (b, c), (0, c)$`, r`$(a, b), (c, d), (e, f), (g, h)$`], 0, [], r`One vertex at the origin, sides on the axes, only two variables.`),
    mc(2, r`To prove a quadrilateral is a parallelogram with coordinates, which is sufficient?`, ["Show one pair of sides are equal", "Show both pairs of opposite sides have equal slopes", "Show the diagonals are equal", "Show one angle is 90°"], 1, [], r`Equal slopes for both pairs of opposite sides means both pairs are parallel.`),
    mc(2, r`Why use $2a$ and $2b$ instead of $a$ and $b$ as coordinates?`, ["It makes the figure bigger", "Midpoints come out without fractions", "It's required", "It makes slopes zero"], 1, [], r`Midpoints are averages, so even coordinates keep them free of fractions.`),
    mc(3, r`With $A(0, 0)$, $B(2a, 0)$, $C(a, b)$, what kind of triangle is $ABC$ for all $a, b > 0$?`, ["Equilateral", "Isosceles", "Right", "Scalene"], 1, [r`Compare $AC$ and $BC$.`], r`$AC = BC = \sqrt{a^2 + b^2}$: always isosceles.`, "review"),
  ],
});
