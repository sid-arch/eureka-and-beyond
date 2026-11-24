import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "areas-of-polygons",
  title: "Areas of polygons",
  summary: "Use area formulas for triangles, parallelograms, trapezoids, rhombuses and kites, find areas of regular polygons with the apothem, and compute area on the coordinate plane.",
  minutes: 30,
  objectives: [
    "Apply area formulas for triangles, parallelograms, trapezoids, rhombuses and kites.",
    "Find the area of a regular polygon using A = ½aP.",
    "Find areas of polygons on the coordinate plane.",
  ],
  concepts: [
    { slug: "area", name: "Area", description: "The number of unit squares needed to cover a region.", subject: "subj_math" },
  ],
  formulas: ["triangle-area", "trapezoid-area", "special-right-triangles"],
  blocks: [
    text(r`Every polygon area formula comes from cutting and rearranging into rectangles and triangles. Parallelogram: $A = bh$. Triangle: $A = \frac{1}{2}bh$. Trapezoid: $A = \frac{1}{2}(b_1 + b_2)h$. Rhombus or kite: $A = \frac{1}{2}d_1 d_2$, because the perpendicular diagonals split it into four right triangles.`),
    activity("area-volume", { title: "Polygon formulas", params: { shape: "trapezoid" } }),
    def("Regular polygon area", r`The apothem $a$ is the perpendicular distance from the center to a side. A regular $n$-gon splits into $n$ congruent triangles of height $a$, so $A = \frac{1}{2}aP$, where $P$ is the perimeter.`),
    example(r`Find the area of a regular hexagon with side 10.`, [
      [r`P = 60`, ""],
      [r`a = 5\sqrt{3}`, "Each of the 6 triangles is equilateral; the apothem is its altitude, the long leg of a 30-60-90 triangle with short leg 5."],
      [r`A = \tfrac{1}{2}(5\sqrt{3})(60) = 150\sqrt{3} \approx 259.81`, ""],
    ]),
    example(r`Find the area of the triangle with vertices $(1, 1)$, $(7, 1)$, $(4, 6)$.`, [
      [r`b = 6,\ h = 5`, "The base is horizontal, so the height is the vertical distance to (4, 6)."],
      [r`A = \tfrac{1}{2}(6)(5) = 15`, ""],
    ], "For a slanted polygon, enclose it in a rectangle and subtract the corner triangles."),
    callout("warning", "Height, not slant side", r`For triangles, parallelograms and trapezoids, use the height perpendicular to the base. A slanted side is longer than the height.`),
    callout("application", "Where this shows up", r`Floor plans, land parcels (often irregular polygons), solar-panel layouts and stop signs (regular octagons) all need these formulas.`),
  ],
  questions: [
    num(1, r`Find the area of a kite with diagonals 12 and 9.`, 54, {}, [r`$\frac{1}{2}d_1 d_2$.`], r`$\frac{1}{2}(12)(9) = 54$.`),
    num(2, r`A trapezoid has bases 7 and 13 and height 6. Find its area.`, 60, {}, [], r`$\frac{1}{2}(20)(6) = 60$.`),
    num(2, r`A regular pentagon has side 8 and apothem 5.5. Find its area.`, 110, {}, [r`$P = 40$.`], r`$\frac{1}{2}(5.5)(40) = 110$.`),
    num(2, r`Find the area of the parallelogram with vertices $(0, 0)$, $(5, 0)$, $(7, 4)$, $(2, 4)$.`, 20, {}, ["Base 5, height 4."], r`$5 \cdot 4 = 20$.`),
    num(3, r`Find the area of a regular hexagon with side 6, to the nearest tenth.`, 93.5, { tolerance: 0.06 }, [r`Apothem $3\sqrt{3}$, perimeter 36.`], r`$\frac{1}{2}(3\sqrt{3})(36) = 54\sqrt{3} \approx 93.5$.`, "review"),
    mc(3, r`A rhombus has side 13 and one diagonal 10. What is its area?`, ["65", "120", "130", "60"], 1, ["Half-diagonal 5, hypotenuse 13: the other half-diagonal is 12."], r`The diagonals are 10 and 24, so the area is $\frac{1}{2}(10)(24) = 120$.`, "review"),
  ],
});
