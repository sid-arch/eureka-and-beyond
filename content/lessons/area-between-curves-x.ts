import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "area-between-curves-x",
  title: "Finding the area between curves expressed as functions of x",
  summary: "Find the area between two graphs by integrating (top − bottom) with respect to x between their intersection points.",
  minutes: 30,
  objectives: [
    "Find intersection points to get the limits of integration.",
    "Decide which function is on top.",
    "Evaluate ∫ₐᵇ (top − bottom) dx.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Area between curves", r`If $f(x) \ge g(x)$ on $[a, b]$, the area between them is $\int_a^b [f(x) - g(x)]\,dx$. Think of thin vertical strips of height (top − bottom) and width $dx$.`),
    figure("/figures/area-between-curves.svg", "Two shaded regions. Left: the region between y = x above and y = x squared below, from x = 0 to 1, with one thin vertical rectangle. Right: the region between the parabola x = y squared on the left and the line x = y + 2 on the right, from y = −1 to 2, with one thin horizontal rectangle.", "Vertical strips measure top minus bottom; horizontal strips measure right minus left."),
    example(r`Area between $y = x$ and $y = x^2$`, [
      [r`x = x^2 \Rightarrow x = 0, 1`, "Intersections."],
      [r`\int_0^1 (x - x^2)\,dx = \tfrac{1}{2} - \tfrac{1}{3} = \tfrac{1}{6}`, "y = x is on top (test x = 0.5)."],
    ]),
    example(r`Area between $y = 4 - x^2$ and $y = x + 2$`, [
      [r`4 - x^2 = x + 2 \Rightarrow x = -2, 1`, ""],
      [r`\int_{-2}^{1} (2 - x - x^2)\,dx = \tfrac{7}{6} + \tfrac{10}{3} = 4.5`, ""],
    ]),
    callout("application", "Where this shows up", r`Economists measure consumer surplus as the area between a demand curve and a price line; engineers find cross-sectional areas of beams between two boundary curves.`),
  ],
  questions: [
    num(1, r`Find the area between $y = x^2$ and $y = 4$.`, 10.667, { tolerance: 0.002 }, [r`Intersections at $\pm 2$.`], r`$\int_{-2}^{2} (4 - x^2)\,dx = \frac{32}{3}$.`),
    num(2, r`Find the area between $y = \sqrt{x}$ and $y = x$ on $[0, 1]$, to three decimal places.`, 0.167, { tolerance: 0.001 }, [], r`$\frac{2}{3} - \frac{1}{2} = \frac{1}{6}$.`),
    mc(2, r`Which integral gives the area between $y = e^x$ and $y = 1$ on $[0, 2]$?`, [r`$\int_0^2 (1 - e^x)\,dx$`, r`$\int_0^2 (e^x - 1)\,dx$`, r`$\int_0^2 e^x\,dx$`, r`$\int_1^2 (e^x - 1)\,dx$`], 1, [], r`$e^x \ge 1$ for $x \ge 0$.`),
    num(3, r`Find the area between $y = x^2 - 2x$ and $y = 0$ on $[0, 2]$, to three decimal places.`, 1.333, { tolerance: 0.002 }, [r`The parabola is below the axis.`], r`$\int_0^2 (2x - x^2)\,dx = 4 - \frac{8}{3} = \frac{4}{3}$.`, "review"),
  ],
});
