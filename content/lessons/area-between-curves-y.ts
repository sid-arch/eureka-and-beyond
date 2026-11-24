import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "area-between-curves-y",
  title: "Finding the area between curves expressed as functions of y",
  summary: "Integrate with respect to y, using (right − left) and horizontal strips, when a region is easier to describe with x as a function of y.",
  minutes: 25,
  objectives: [
    "Recognize when horizontal strips need fewer integrals.",
    "Rewrite curves as x = g(y) and find y-limits.",
    "Evaluate ∫ (right − left) dy.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Horizontal strips", r`If $f(y) \ge g(y)$ for $c \le y \le d$, the area is $\int_c^d [f(y) - g(y)]\,dy$, with $f$ the right curve and $g$ the left.`),
    figure("/figures/area-between-curves.svg", "Two shaded regions. Left: the region between y = x above and y = x squared below, from x = 0 to 1, with one thin vertical rectangle. Right: the region between the parabola x = y squared on the left and the line x = y + 2 on the right, from y = −1 to 2, with one thin horizontal rectangle.", "The right-hand region would need two integrals with vertical strips, but only one with horizontal strips."),
    example(r`Region between $x = y^2$ and $x = y + 2$`, [
      [r`y^2 = y + 2 \Rightarrow y = -1, 2`, ""],
      [r`\int_{-1}^{2} (y + 2 - y^2)\,dy`, "Right minus left."],
      [r`= \tfrac{10}{3} - \left(-\tfrac{7}{6}\right) = 4.5`, ""],
    ]),
    callout("tip", "Why switch?", r`With vertical strips, this region's bottom boundary changes from the parabola to the line at $x = 1$, which would need two integrals. With horizontal strips, right and left never switch.`),
    callout("application", "Where this shows up", r`Areas of regions like riverbanks or dam cross sections are often measured from depth (y) rather than horizontal position.`),
  ],
  questions: [
    num(2, r`Find the area between $x = 4 - y^2$ and $x = 0$, to three decimal places.`, 10.667, { tolerance: 0.002 }, [], r`$\int_{-2}^{2} (4 - y^2)\,dy = \frac{32}{3}$.`),
    mc(2, r`For horizontal strips, the integrand is…`, ["top − bottom", "right − left", "left − right", "outer² − inner²"], 1, [], r`Strip length is right minus left.`),
    num(2, r`Find the area between $x = y^2$ and $x = 1$, to three decimal places.`, 1.333, { tolerance: 0.002 }, [], r`$\int_{-1}^{1} (1 - y^2)\,dy = \frac{4}{3}$.`),
    mc(3, r`Region: $y = \sqrt{x}$, $y = 0$, $x = 4$. As a $dy$ integral, the area is…`, [r`$\int_0^2 (4 - y^2)\,dy$`, r`$\int_0^4 (4 - y^2)\,dy$`, r`$\int_0^2 y^2\,dy$`, r`$\int_0^2 (y^2 - 4)\,dy$`], 0, [], r`Right $x = 4$, left $x = y^2$, for $0 \le y \le 2$; value $\frac{16}{3}$.`, "review"),
  ],
});
