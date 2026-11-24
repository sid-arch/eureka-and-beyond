import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "special-right-triangles",
  title: "Special right triangles",
  summary: "Derive and use the side ratios of 45°-45°-90° and 30°-60°-90° triangles to find exact side lengths.",
  minutes: 25,
  objectives: [
    "Derive the side ratios of 45-45-90 and 30-60-90 triangles.",
    "Find missing sides exactly, in simplest radical form.",
    "Apply the ratios to squares, equilateral triangles and hexagons.",
  ],
  concepts: [
    { slug: "special-right-triangles", name: "Special right triangles", description: "45-45-90 and 30-60-90 triangles with fixed side ratios.", subject: "subj_math" },
  ],
  formulas: ["special-right-triangles", "pythagorean-theorem"],
  blocks: [
    def("45°-45°-90° triangle", r`The legs are congruent and the hypotenuse is $\sqrt{2}$ times a leg: $x : x : x\sqrt{2}$.`),
    text(r`Why: cut a square of side $x$ along a diagonal. Each half is an isosceles right triangle, and the Pythagorean theorem gives the diagonal: $\sqrt{x^2 + x^2} = \sqrt{2x^2} = x\sqrt{2}$.`),
    def("30°-60°-90° triangle", r`The hypotenuse is twice the short leg, and the long leg is $\sqrt{3}$ times the short leg: $x : x\sqrt{3} : 2x$. The short leg is opposite $30^\circ$.`),
    text(r`Why: cut an equilateral triangle of side $2x$ with an altitude. Each half has hypotenuse $2x$, short leg $x$ (half the base), and long leg $\sqrt{(2x)^2 - x^2} = \sqrt{3x^2} = x\sqrt{3}$.`),
    example(r`A 45-45-90 triangle has hypotenuse 10. Find each leg.`, [
      [r`x\sqrt{2} = 10 \Rightarrow x = \tfrac{10}{\sqrt{2}}`, ""],
      [r`x = \tfrac{10\sqrt{2}}{2} = 5\sqrt{2} \approx 7.07`, "Rationalize the denominator."],
    ]),
    example(r`In a 30-60-90 triangle the long leg is 9. Find the short leg and hypotenuse.`, [
      [r`x\sqrt{3} = 9 \Rightarrow x = \tfrac{9}{\sqrt{3}} = 3\sqrt{3}`, "Short leg."],
      [r`2x = 6\sqrt{3} \approx 10.39`, "Hypotenuse."],
    ]),
    example(r`Find the area of an equilateral triangle with side 8.`, [
      [r`h = 4\sqrt{3}`, "The altitude is the long leg of a 30-60-90 triangle with short leg 4."],
      [r`A = \tfrac{1}{2} \cdot 8 \cdot 4\sqrt{3} = 16\sqrt{3} \approx 27.71`, r`In general $A = \frac{\sqrt{3}}{4}s^2$.`],
    ]),
    callout("warning", "Which leg is which?", r`In a 30-60-90 triangle, the short leg is opposite the $30^\circ$ angle and the long leg opposite $60^\circ$. Check: the hypotenuse must be the longest side, and $2 > \sqrt{3} \approx 1.73 > 1$.`),
    callout("application", "Where this shows up", r`Carpenters' 45° and 30-60 set squares, the diagonal of a square tile, the height of an equilateral roof truss and hexagonal bolt heads all use these ratios.`),
  ],
  questions: [
    short(1, r`A 45-45-90 triangle has legs of 6. Find the hypotenuse in simplest radical form. Use the format 6sqrt(2).`, ["6sqrt(2)", "6√2", "6sqrt2"], [], r`$6\sqrt{2}$.`),
    num(2, r`A 30-60-90 triangle has hypotenuse 14. Find the short leg.`, 7, {}, [], r`Half the hypotenuse: 7.`),
    short(2, r`A 30-60-90 triangle has short leg 5. Find the long leg. Use the format 5sqrt(3).`, ["5sqrt(3)", "5√3", "5sqrt3"], [], r`$5\sqrt{3}$.`),
    num(2, r`A square has a diagonal of 12. Find its side length to the nearest hundredth.`, 8.49, { tolerance: 0.006 }, [r`$s\sqrt{2} = 12$.`], r`$s = 6\sqrt{2} \approx 8.49$.`),
    num(3, r`Find the area of an equilateral triangle with side 10, to the nearest tenth.`, 43.3, { tolerance: 0.06 }, [r`$\frac{\sqrt{3}}{4} \cdot 100$.`], r`$25\sqrt{3} \approx 43.3$.`),
    mc(3, r`A ladder makes a $60^\circ$ angle with the ground and reaches 6 m up the wall. How long is the ladder?`, [r`$3$ m`, r`$2\sqrt{3}$ m`, r`$4\sqrt{3}$ m`, r`$12$ m`], 2, ["The height is the long leg (opposite 60°)."], r`$x\sqrt{3} = 6$ gives $x = 2\sqrt{3}$, and the ladder (hypotenuse) is $4\sqrt{3} \approx 6.93$ m.`, "review"),
  ],
});
