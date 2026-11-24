import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "implicit-relations-behavior",
  title: "Exploring behaviors of implicit relations",
  summary: "Use implicit derivatives to find horizontal and vertical tangents, and to describe where an implicitly defined curve rises, falls and bends.",
  minutes: 25,
  objectives: [
    "Find horizontal tangents (numerator of dy/dx zero) and vertical tangents (denominator zero).",
    "Check that candidate points actually lie on the curve.",
    "Interpret the sign of dy/dx at points of the curve.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Tangents of implicit curves", r`Write $\frac{dy}{dx} = \frac{N}{D}$. Horizontal tangents occur where $N = 0$ and $D \ne 0$; vertical tangents where $D = 0$ and $N \ne 0$. Substitute back into the original equation to find the actual points.`),
    example(r`$x^2 + xy + y^2 = 3$`, [
      [r`2x + y + xy' + 2yy' = 0 \Rightarrow y' = -\frac{2x + y}{x + 2y}`, ""],
      [r`\text{horizontal: } y = -2x \Rightarrow 3x^2 = 3`, ""],
      [r`(1, -2) \text{ and } (-1, 2)`, ""],
      [r`\text{vertical: } x = -2y \Rightarrow 3y^2 = 3 \Rightarrow (-2, 1),\ (2, -1)`, ""],
    ]),
    callout("warning", "Both zero?", r`If the numerator and denominator are both 0 at a point, the test is inconclusive; examine the curve near that point.`),
    callout("application", "Where this shows up", r`Orbits and level curves of physical quantities are implicit; their highest and lowest points come from horizontal tangents.`),
  ],
  questions: [
    num(1, r`For $x^2 + xy + y^2 = 3$, find $\frac{dy}{dx}$ at $(1, 1)$.`, -1, {}, [], r`$-\frac{2 + 1}{1 + 2} = -1$.`),
    mc(2, r`For $x^2 + y^2 = 16$, horizontal tangents occur at…`, ["(±4, 0)", "(0, ±4)", "(4, 4)", "none"], 1, [], r`$y' = -\frac{x}{y} = 0$ when $x = 0$.`),
    num(2, r`For $y^2 = x^3$, find $\frac{dy}{dx}$ at $(1, 1)$.`, 1.5, { tolerance: 0.001 }, [], r`$2yy' = 3x^2 \Rightarrow y' = \frac{3}{2}$.`),
    mc(3, r`For $y^2 = x^3$, what happens at $(0, 0)$?`, ["Horizontal tangent", "Vertical tangent", "dy/dx = 0/0: inconclusive (the curve has a cusp there)", "dy/dx = 1"], 2, [], r`$y' = \frac{3x^2}{2y}$ gives $\frac{0}{0}$; the curve has a cusp.`, "review"),
  ],
});
