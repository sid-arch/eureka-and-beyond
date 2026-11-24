import { callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "geometric-mean-right-triangles",
  title: "Geometric mean in right triangles",
  summary: "Show that the altitude to the hypotenuse forms three similar triangles, and use the geometric mean relationships to find lengths.",
  minutes: 30,
  objectives: [
    "Prove that the altitude to the hypotenuse creates two triangles similar to the original and to each other.",
    "Find the geometric mean of two numbers.",
    "Apply the altitude and leg geometric-mean relationships, and derive the Pythagorean theorem from them.",
  ],
  concepts: [
    { slug: "similarity", name: "Similarity", description: "Figures with the same shape: corresponding angles congruent and corresponding sides proportional.", subject: "subj_math" },
    { slug: "geometric-mean", name: "Geometric mean", description: "For positive a and b, the number x with a/x = x/b, so x = √(ab).", subject: "subj_math" },
  ],
  blocks: [
    def("Geometric mean", r`The geometric mean of positive numbers $a$ and $b$ is the positive $x$ with $\frac{a}{x} = \frac{x}{b}$, so $x = \sqrt{ab}$. The geometric mean of 4 and 9 is 6.`),
    text(r`In right $\triangle ABC$ with right angle $C$, draw altitude $\overline{CD}$ to the hypotenuse. Each smaller triangle shares an acute angle with $\triangle ABC$ and has a right angle, so by AA all three triangles are similar: $\triangle ACB \sim \triangle ADC \sim \triangle CDB$.`),
    def("Geometric mean theorems", r`Let the altitude split the hypotenuse into $AD = m$ and $DB = n$, with $c = m + n$. Altitude: $CD = \sqrt{mn}$. Legs: $AC = \sqrt{m \cdot c}$ and $BC = \sqrt{n \cdot c}$ (each leg is the geometric mean of the hypotenuse and the adjacent segment).`),
    example(r`The altitude to the hypotenuse splits it into 4 and 9. Find the altitude and both legs.`, [
      [r`h = \sqrt{4 \cdot 9} = 6`, ""],
      [r`a = \sqrt{4 \cdot 13} = 2\sqrt{13} \approx 7.21,\ b = \sqrt{9 \cdot 13} = 3\sqrt{13} \approx 10.82`, ""],
    ], r`Check: $(2\sqrt{13})^2 + (3\sqrt{13})^2 = 52 + 117 = 169 = 13^2$. ✓`),
    text(r`These relationships prove the Pythagorean theorem: $a^2 = nc$ and $b^2 = mc$, so $a^2 + b^2 = (m + n)c = c^2$.`),
    callout("tip", "Draw the three triangles separately", r`Redraw the two small triangles and the large one in the same orientation, with right angles matching. The proportions are then easy to read off.`),
    callout("application", "Where this shows up", r`Geometric means appear in average growth rates (the geometric mean of yearly growth factors), in camera f-stops and in the classic construction of $\sqrt{n}$ with a semicircle.`),
  ],
  questions: [
    num(1, r`Find the geometric mean of 3 and 27.`, 9, {}, [], r`$\sqrt{81} = 9$.`),
    num(2, r`The altitude to the hypotenuse divides it into segments 2 and 8. Find the altitude.`, 4, {}, [], r`$\sqrt{16} = 4$.`),
    num(2, r`The hypotenuse is 25 and the altitude divides it into 9 and 16. Find the leg adjacent to the segment of length 9.`, 15, {}, [r`$\sqrt{9 \cdot 25}$.`], r`$15$.`),
    num(3, r`The altitude to the hypotenuse is 12 and one segment of the hypotenuse is 9. Find the other segment.`, 16, {}, [r`$12^2 = 9x$.`], r`$x = 16$.`, "review"),
  ],
});
