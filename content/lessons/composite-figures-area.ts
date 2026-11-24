import { callout, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "composite-figures-area",
  title: "Areas of composite figures",
  summary: "Find areas of figures made of rectangles, triangles, trapezoids and circle parts by adding and subtracting pieces, and compare areas of similar figures.",
  minutes: 25,
  objectives: [
    "Decompose a composite figure into familiar shapes.",
    "Find areas by adding pieces or subtracting holes.",
    "Use area scaling (k²) for similar composite figures.",
  ],
  concepts: [
    { slug: "area", name: "Area", description: "The number of unit squares needed to cover a region.", subject: "subj_math" },
  ],
  formulas: ["circle-area", "triangle-area", "trapezoid-area"],
  blocks: [
    text(r`A composite figure is built from simpler shapes. Find its area by adding the pieces, or by finding a larger simple shape and subtracting the parts that are missing. Choose whichever needs fewer, easier calculations.`),
    example(r`An L-shaped room: a 12 ft by 10 ft rectangle with a 5 ft by 4 ft corner removed. Find the floor area.`, [
      [r`12 \cdot 10 = 120 \text{ ft}^2`, "Full rectangle."],
      [r`120 - 5 \cdot 4 = 100 \text{ ft}^2`, "Subtract the missing corner."],
    ]),
    example(r`A running track: a rectangle 100 m by 60 m with a semicircle on each 60 m end. Find the enclosed area.`, [
      [r`100 \cdot 60 = 6000`, "Rectangle."],
      [r`\pi(30)^2 = 900\pi \approx 2827.4`, "Two semicircles of radius 30 make one full circle."],
      [r`\approx 8827.4 \text{ m}^2`, ""],
    ]),
    example(r`A square of side 8 has a circle of radius 4 cut out. Find the remaining area.`, [
      [r`64 - 16\pi \approx 64 - 50.27 = 13.73`, ""],
    ], "The circle fits exactly inside the square, touching all four sides."),
    callout("tip", "Label every dimension", r`Missing lengths often come from subtracting: in an L-shape, the unlabeled side is a difference of two labeled ones. Write them on the diagram before computing.`),
    callout("application", "Where this shows up", r`Flooring estimates, lawn care, painting walls with windows cut out, and fabric patterns are all composite-area problems.`),
  ],
  questions: [
    num(1, r`A figure is a 10 by 6 rectangle with a triangle of base 6 and height 4 attached to one 6-unit side. Find its area.`, 72, {}, [], r`$60 + \frac{1}{2}(6)(4) = 72$.`),
    num(2, r`A rectangular garden 20 m by 15 m has a circular pond of radius 3 m. Find the area of land, to the nearest tenth.`, 271.7, { unit: "m²", tolerance: 0.06 }, [], r`$300 - 9\pi \approx 271.7$ m².`),
    num(2, r`A semicircle of diameter 10 sits on top of a 10 by 8 rectangle. Find the total area, to the nearest tenth.`, 119.3, { tolerance: 0.06 }, [r`Semicircle: $\frac{1}{2}\pi(25)$.`], r`$80 + 12.5\pi \approx 119.3$.`),
    num(2, r`A square picture 30 cm on a side has a 5 cm border around it. What is the area of the border alone?`, 700, { unit: "cm²" }, ["The outer square is 40 by 40."], r`$1600 - 900 = 700$ cm².`),
    num(3, r`An annulus (ring) has outer radius 9 and inner radius 5. Find its area to the nearest tenth.`, 175.9, { tolerance: 0.06 }, [r`$\pi(81 - 25)$.`], r`$56\pi \approx 175.9$.`, "review"),
  ],
});
