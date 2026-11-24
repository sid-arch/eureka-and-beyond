import { callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "pythagorean-theorem",
  title: "The Pythagorean theorem and its converse",
  summary: "Relate the side lengths of right triangles, find missing sides, and test whether a triangle is right.",
  minutes: 30,
  objectives: [
    "State the Pythagorean theorem and identify the hypotenuse.",
    "Find a missing side length of a right triangle.",
    "Use the converse to decide whether three lengths form a right triangle.",
    "Connect the theorem to the distance formula.",
  ],
  concepts: [{ slug: "right-triangles", name: "Right triangles", description: "Triangles with one 90° angle; their sides satisfy the Pythagorean theorem.", subject: "subj_math" }],
  formulas: ["pythagorean-theorem", "distance-formula"],
  blocks: [
    def("Hypotenuse", r`The side opposite the right angle in a right triangle. It is always the longest side. The other two sides are the legs.`),
    formula(r`a^2 + b^2 = c^2`, "The Pythagorean theorem", r`In any right triangle with legs $a$ and $b$ and hypotenuse $c$.`),
    text(r`One classic proof arranges four copies of the right triangle inside a square of side $a + b$. The uncovered region is a tilted square of side $c$, so $(a + b)^2 = 4 \cdot \tfrac{1}{2}ab + c^2$. Expanding the left side gives $a^2 + 2ab + b^2 = 2ab + c^2$, and subtracting $2ab$ leaves $a^2 + b^2 = c^2$.`),
    example(r`A ladder 13 ft long leans against a wall with its base 5 ft from the wall. How high does it reach?`, [
      [r`5^2 + b^2 = 13^2`, "The ladder is the hypotenuse; the ground distance is a leg."],
      [r`25 + b^2 = 169`, "Square the known lengths."],
      [r`b^2 = 144 \Rightarrow b = 12`, "Take the positive square root; lengths are positive."],
    ], r`$5^2 + 12^2 = 25 + 144 = 169 = 13^2$. The ladder reaches 12 ft up the wall.`),
    text(r`The converse is also true: if the side lengths of a triangle satisfy $a^2 + b^2 = c^2$, where $c$ is the longest side, then the triangle is a right triangle. If $a^2 + b^2 > c^2$ the triangle is acute, and if $a^2 + b^2 < c^2$ it is obtuse.`),
    example(r`Is a triangle with sides 7, 24 and 25 a right triangle?`, [
      [r`7^2 + 24^2 = 49 + 576 = 625`, "Add the squares of the two shorter sides."],
      [r`25^2 = 625`, "Square the longest side."],
      [r`625 = 625`, "They are equal, so by the converse the triangle is right."],
    ]),
    formula(r`d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`, "Distance formula", r`The horizontal and vertical changes between two points are the legs of a right triangle; the distance is its hypotenuse.`),
    callout("application", "Where this shows up", r`TV and monitor sizes are measured along the diagonal. A screen 48 inches wide and 27 inches tall has a diagonal of $\sqrt{48^2 + 27^2} = \sqrt{3033} \approx 55.1$ inches.`),
  ],
  questions: [
    num(1, r`A right triangle has legs 6 and 8. How long is the hypotenuse?`, 10, {}, [r`$c^2 = 6^2 + 8^2$.`], r`$c^2 = 36 + 64 = 100$, so $c = 10$.`),
    num(2, r`A right triangle has hypotenuse 17 and one leg 8. Find the other leg.`, 15, {}, [r`$8^2 + b^2 = 17^2$.`], r`$b^2 = 289 - 64 = 225$, so $b = 15$.`),
    mc(2, r`Which side lengths form a right triangle?`, ["4, 5, 6", "5, 12, 13", "6, 7, 9", "2, 3, 4"], 1, ["Check whether the two smaller squares add to the largest square."],
      r`$25 + 144 = 169 = 13^2$. For the others the sums don't match (e.g. $16 + 25 = 41 \neq 36$).`),
    num(2, r`Find the distance between $(1, 2)$ and $(7, 10)$.`, 10, {}, [r`$\Delta x = 6$ and $\Delta y = 8$.`], r`$\sqrt{6^2 + 8^2} = \sqrt{100} = 10$.`),
    num(3, r`A square has a diagonal of 10 cm. What is its area in cm²?`, 50, { unit: "cm²" }, [r`If the side is $s$, then $s^2 + s^2 = 10^2$.`], r`$2s^2 = 100$, so $s^2 = 50$. The area is $s^2 = 50$ cm².`),
    mc(3, r`A triangle has sides 8, 9 and 13. Is it acute, right or obtuse?`, ["Acute", "Right", "Obtuse", "Not a triangle"], 2, [r`Compare $8^2 + 9^2$ with $13^2$.`],
      r`$64 + 81 = 145 < 169$, so the angle opposite the longest side is greater than 90°: obtuse.`, "review"),
  ],
});
