import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "area-2d-shapes",
  title: "Area of triangles, quadrilaterals and circles",
  summary: "Derive and use area formulas for parallelograms, triangles, trapezoids and circles, and find areas of composite figures.",
  minutes: 30,
  objectives: [
    "Explain how the parallelogram, triangle and trapezoid formulas come from the rectangle formula.",
    "Find the area and circumference of a circle from its radius or diameter.",
    "Find the area of composite figures by adding and subtracting simpler shapes.",
  ],
  concepts: [
    { slug: "area", name: "Area", description: "The number of unit squares needed to cover a region.", subject: "subj_math" },
  ],
  formulas: ["triangle-area", "trapezoid-area", "circle-area"],
  blocks: [
    def("Area", r`The number of unit squares that cover a flat region, measured in square units such as cm² or ft².`),
    text(r`Every formula here starts from the rectangle, $A = bh$. Cut a triangle off one end of a parallelogram and slide it to the other end: you get a rectangle with the same base and height, so a parallelogram's area is also $bh$. Two copies of any triangle fit together into a parallelogram, so a triangle's area is $\frac{1}{2}bh$.`),
    text(r`Two copies of a trapezoid, one flipped, also form a parallelogram, with base $b_1 + b_2$. Halving gives $A = \frac{1}{2}(b_1 + b_2)h$. That is the average of the bases times the height.`),
    callout("warning", "Height is perpendicular", r`The height is the perpendicular distance between the base and the opposite side (or vertex), not the length of a slanted side. In obtuse triangles the height may fall outside the triangle.`),
    activity("area-volume", { title: "Shapes and their formulas", params: { shape: "triangle" } }),
    callout("tip", "Try this", r`On the triangle, compare the area with the dashed rectangle's area (the readout). The triangle is always exactly half. Switch to the trapezoid and set $b_2 = b_1$. Which shape does it become, and does the formula agree?`, "experiment"),
    text(r`For a circle, the circumference is $C = 2\pi r$ and the area is $A = \pi r^2$, where $\pi \approx 3.14159$. If you slice a circle into many thin wedges and arrange them alternately, they form a shape close to a parallelogram with base $\pi r$ (half the circumference) and height $r$, which gives area $\pi r \cdot r = \pi r^2$.`),
    example(r`A trapezoid has bases 9 cm and 15 cm and height 6 cm. Find its area.`, [
      [r`A = \tfrac{1}{2}(9 + 15)(6)`, ""],
      [r`= \tfrac{1}{2}(24)(6) = 72 \text{ cm}^2`, ""],
    ]),
    example(r`A circle has diameter 10 in. Find its area and circumference.`, [
      [r`r = 5 \text{ in}`, "The radius is half the diameter."],
      [r`A = \pi(5)^2 = 25\pi \approx 78.54 \text{ in}^2`, "Square the radius, not the diameter."],
      [r`C = \pi d = 10\pi \approx 31.42 \text{ in}`, ""],
    ]),
    example(r`A 10 m by 6 m rectangular lawn has a circular flower bed of radius 1.5 m cut out. Find the area of grass.`, [
      [r`10 \times 6 = 60 \text{ m}^2`, "Whole rectangle."],
      [r`\pi(1.5)^2 = 2.25\pi \approx 7.07 \text{ m}^2`, "Flower bed."],
      [r`60 - 7.07 \approx 52.93 \text{ m}^2`, "Subtract the hole."],
    ]),
    callout("application", "Where this shows up", r`Buying carpet, paint, sod or tiles; calculating a pizza's size (a 16-inch pizza has $64\pi \approx 201$ in², almost twice the 113 in² of a 12-inch one); and land surveying all depend on area.`),
  ],
  questions: [
    num(1, r`Find the area of a triangle with base 12 ft and height 7 ft.`, 42, { unit: "ft²" }, [r`$\frac{1}{2}bh$.`], r`$\frac{1}{2}(12)(7) = 42$ ft².`),
    num(1, r`Find the area of a parallelogram with base 8 m and height 5.5 m.`, 44, { unit: "m²" }, ["Base times height."], r`$8 \times 5.5 = 44$ m².`),
    num(2, r`Find the area of a trapezoid with bases 4 in and 10 in and height 5 in.`, 35, { unit: "in²" }, ["Average of the bases times the height."], r`$\frac{1}{2}(14)(5) = 35$ in².`),
    num(2, r`Find the area of a circle with radius 3 cm. Round to the nearest hundredth.`, 28.27, { unit: "cm²", tolerance: 0.01 }, [r`$A = \pi r^2 = 9\pi$.`], r`$9\pi \approx 28.27$ cm².`),
    num(2, r`A circular track has a diameter of 70 m. How far is one lap? Round to the nearest meter.`, 220, { unit: "m", tolerance: 0.5 }, [r`$C = \pi d$.`], r`$70\pi \approx 219.9$, about 220 m.`),
    mc(2, r`A triangle has sides 5, 5 and 8 and a height of 3 to the side of length 8. What is its area?`, ["12", "20", "24", "15"], 0,
      ["Use the base that matches the given height."], r`$\frac{1}{2}(8)(3) = 12$ square units. The slanted sides of length 5 are not heights.`),
    num(3, r`A window is a 4 ft by 3 ft rectangle topped by a semicircle with diameter 4 ft. Find its total area to the nearest hundredth.`, 18.28, { unit: "ft²", tolerance: 0.01 },
      ["Rectangle: 12 ft².", r`Semicircle: $\frac{1}{2}\pi(2)^2 = 2\pi$.`], r`$12 + 2\pi \approx 12 + 6.28 = 18.28$ ft².`, "review"),
    num(3, r`If the radius of a circle is doubled, by what factor does its area increase?`, 4, {}, [r`Compare $\pi(2r)^2$ with $\pi r^2$.`], r`$\pi(2r)^2 = 4\pi r^2$: four times the area.`, "review"),
  ],
});
