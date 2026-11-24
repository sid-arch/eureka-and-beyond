import { callout, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "equations-of-circles",
  title: "Equations of circles",
  summary: "Derive the equation of a circle from the distance formula, write equations from a center and radius, and find the center and radius by completing the square.",
  minutes: 25,
  objectives: [
    "Derive (x − h)² + (y − k)² = r² from the distance formula.",
    "Write the equation of a circle from its center and radius or from a center and a point.",
    "Find the center and radius from general form by completing the square, and decide whether a point lies on a circle.",
  ],
  concepts: [
    { slug: "circle-equations", name: "Equations of circles", description: "Center-radius form (x − h)² + (y − k)² = r².", subject: "subj_math" },
    { slug: "completing-the-square", name: "Completing the square", description: "Adding (b/2)² to x² + bx to form a perfect-square trinomial.", subject: "subj_math" },
  ],
  formulas: ["circle-equation", "distance-formula"],
  blocks: [
    text(r`A point $(x, y)$ is on the circle with center $(h, k)$ and radius $r$ exactly when its distance from the center is $r$: $\sqrt{(x - h)^2 + (y - k)^2} = r$. Squaring both sides gives the standard equation.`),
    formula(r`(x - h)^2 + (y - k)^2 = r^2`, "Circle in center-radius form"),
    example(r`Write the circle with center $(-3, 2)$ through $(1, 5)$`, [
      [r`r = \sqrt{(1 + 3)^2 + (5 - 2)^2} = 5`, "The radius is the distance from the center to the point."],
      [r`(x + 3)^2 + (y - 2)^2 = 25`, ""],
    ]),
    example(r`Find the center and radius of $x^2 + y^2 - 6x + 10y + 9 = 0$`, [
      [r`(x^2 - 6x + 9) + (y^2 + 10y + 25) = -9 + 9 + 25`, "Complete the square in x and in y; add the same amounts to both sides."],
      [r`(x - 3)^2 + (y + 5)^2 = 25`, ""],
      [r`\text{center } (3, -5),\ r = 5`, ""],
    ]),
    callout("warning", "Signs and the radius", r`$(x + 3)^2$ means $h = -3$. And the right side is $r^2$: $(x - 1)^2 + y^2 = 49$ has radius 7, not 49.`),
    callout("application", "Where this shows up", r`GPS locates you by intersecting circles (spheres in 3D) of known radius around satellites. Phone towers' coverage areas and earthquake epicenters are found the same way.`),
  ],
  questions: [
    short(1, r`Write the equation of the circle with center $(0, 0)$ and radius 6.`, ["x^2+y^2=36"], [], r`$x^2 + y^2 = 36$.`),
    short(2, r`Write the equation of the circle with center $(4, -1)$ and radius 3.`, ["(x-4)^2+(y+1)^2=9"], [], r`$(x - 4)^2 + (y + 1)^2 = 9$.`),
    short(2, r`Find the center of $(x + 7)^2 + (y - 2)^2 = 10$. Enter as (h,k).`, ["(-7,2)"], [], r`$(-7, 2)$.`),
    num(2, r`Find the radius of $x^2 + y^2 + 4x - 2y - 20 = 0$.`, 5, {}, [r`$(x + 2)^2 + (y - 1)^2 = 20 + 4 + 1$.`], r`$r^2 = 25$, so $r = 5$.`),
    mc(3, r`Is $(5, 3)$ on the circle $(x - 1)^2 + (y + 0)^2 = 25$?`, ["Yes", "No, it's inside", "No, it's outside", "Can't tell"], 0, ["Substitute the point."], r`$(4)^2 + 3^2 = 25$, so yes.`, "review"),
  ],
});
