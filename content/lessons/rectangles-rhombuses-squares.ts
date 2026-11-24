import { callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rectangles-rhombuses-squares",
  title: "Rectangles, rhombuses and squares",
  summary: "Use the special diagonal properties of rectangles, rhombuses and squares, and classify quadrilaterals from their properties or coordinates.",
  minutes: 25,
  objectives: [
    "Define rectangles, rhombuses and squares as special parallelograms.",
    "Use diagonal properties: congruent diagonals (rectangle), perpendicular diagonals that bisect the angles (rhombus).",
    "Classify a parallelogram from given information or coordinates.",
  ],
  concepts: [
    { slug: "special-parallelograms", name: "Special parallelograms", description: "Rectangles, rhombuses and squares and their diagonal properties.", subject: "subj_math" },
  ],
  formulas: ["slope", "distance-formula"],
  blocks: [
    def("Definitions", r`A rectangle is a parallelogram with four right angles. A rhombus is a parallelogram with four congruent sides. A square is both a rectangle and a rhombus. Each has every property of a parallelogram.`),
    def("Diagonal theorems", r`A parallelogram is a rectangle if and only if its diagonals are congruent. A parallelogram is a rhombus if and only if its diagonals are perpendicular, and also if and only if each diagonal bisects a pair of opposite angles.`),
    text(r`Why are a rhombus's diagonals perpendicular? Each vertex at the end of one diagonal is equidistant from the endpoints of the other diagonal (all sides are equal). By the Perpendicular Bisector Theorem, the first diagonal is the perpendicular bisector of the second.`),
    example(r`In rectangle $ABCD$, $AC = 4x - 6$ and $BD = 2x + 10$. Find $AC$.`, [
      [r`4x - 6 = 2x + 10 \Rightarrow x = 8`, "Diagonals of a rectangle are congruent."],
      [r`AC = 26`, ""],
    ]),
    example(r`Rhombus $PQRS$ has diagonals of 10 and 24. Find its side length.`, [
      [r`\text{half-diagonals: } 5 \text{ and } 12`, "Diagonals bisect each other at right angles."],
      [r`s = \sqrt{5^2 + 12^2} = 13`, "Each side is the hypotenuse of a right triangle."],
    ], "The area of a rhombus is half the product of its diagonals: ½ · 10 · 24 = 120."),
    example(r`Classify $A(1, 2)$, $B(4, 6)$, $C(8, 3)$, $D(5, -1)$`, [
      [r`AB = BC = CD = DA = 5`, "All sides equal: at least a rhombus."],
      [r`m_{AB} = \tfrac{4}{3},\ m_{BC} = -\tfrac{3}{4}`, "Product −1: a right angle."],
      [r`\text{square}`, "A rhombus with a right angle is a square."],
    ]),
    callout("warning", "Every square is a rectangle, not vice versa", r`Think in terms of nested sets: squares ⊂ rectangles ⊂ parallelograms and squares ⊂ rhombuses ⊂ parallelograms. A property true of all rectangles is true of squares too.`),
    callout("application", "Where this shows up", r`Builders check that a frame is square by measuring both diagonals: if they're equal, the parallelogram is a rectangle. Rhombus-shaped linkages and diamond patterns use the perpendicular diagonals.`),
  ],
  questions: [
    mc(1, r`Which quadrilateral always has perpendicular diagonals?`, ["Rectangle", "Rhombus", "Parallelogram", "Trapezoid"], 1, [], r`Rhombus (and therefore square).`),
    num(2, r`In rectangle $WXYZ$, $WY = 7a - 2$ and $XZ = 4a + 13$. Find $WY$.`, 33, {}, ["Diagonals are congruent."], r`$a = 5$, $WY = 33$.`),
    num(2, r`A rhombus has diagonals 16 and 30. Find its side length.`, 17, {}, ["Half-diagonals 8 and 15."], r`$\sqrt{64 + 225} = 17$.`),
    num(2, r`In rhombus $ABCD$, $m\angle ABC = 110^\circ$. Diagonal $\overline{BD}$ bisects it. Find $m\angle ABD$.`, 55, { unit: "°" }, [], r`$110 \div 2 = 55^\circ$.`),
    mc(3, r`A parallelogram has congruent diagonals that are also perpendicular. What is it?`, ["Rectangle only", "Rhombus only", "Square", "Kite"], 2, ["Congruent → rectangle; perpendicular → rhombus."], r`Both a rectangle and a rhombus: a square.`, "review"),
  ],
});
