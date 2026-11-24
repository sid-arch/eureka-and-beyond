import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "implicit-differentiation",
  title: "Implicit differentiation",
  summary: "Find dy/dx for curves defined by equations in x and y by differentiating both sides and treating y as a function of x.",
  minutes: 30,
  objectives: [
    "Differentiate terms involving y using the Chain Rule (dy/dx factor).",
    "Solve for dy/dx and evaluate it at a point on the curve.",
    "Find horizontal and vertical tangents of implicitly defined curves.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["chain-rule"],
  blocks: [
    def("The method", r`Differentiate both sides with respect to $x$. Each time you differentiate an expression in $y$, multiply by $\frac{dy}{dx}$ (Chain Rule). Then collect the $\frac{dy}{dx}$ terms and solve.`),
    example(r`The circle $x^2 + y^2 = 25$ at $(3, 4)$`, [
      [r`2x + 2y\frac{dy}{dx} = 0`, ""],
      [r`\frac{dy}{dx} = -\frac{x}{y} = -\frac{3}{4}`, ""],
    ]),
    example(r`$x^3 + y^3 = 6xy$ at $(3, 3)$`, [
      [r`3x^2 + 3y^2 y' = 6y + 6xy'`, "Product Rule on 6xy."],
      [r`y'(3y^2 - 6x) = 6y - 3x^2`, ""],
      [r`y'(27 - 18) = 18 - 27 \Rightarrow y' = -1`, ""],
    ]),
    activity("slope-field", { title: "Circles hidden in dy/dx = −x/y", params: { eq: "circle", x0: 3, y0: 4 } }),
    callout("tip", "Try this", r`The slope field of $\frac{dy}{dx} = -\frac{x}{y}$ is exactly the slope found implicitly from $x^2 + y^2 = r^2$. Each solution curve through a starting point is (half of) a circle.`, "experiment"),
    callout("application", "Where this shows up", r`Curves like orbits and level curves of a temperature map are often given by equations in $x$ and $y$ that can't be solved for $y$; implicit differentiation still gives their slopes.`),
  ],
  questions: [
    num(1, r`For $xy = 6$, find $\frac{dy}{dx}$ at $(2, 3)$.`, -1.5, { tolerance: 0.001 }, [], r`$y + xy' = 0 \Rightarrow y' = -\frac{y}{x} = -1.5$.`),
    num(2, r`For $x^2 + 3y^2 = 21$, find $\frac{dy}{dx}$ at $(3, 2)$.`, -0.5, { tolerance: 0.001 }, [], r`$2x + 6yy' = 0 \Rightarrow y' = -\frac{x}{3y} = -\frac{3}{6}$.`),
    mc(2, r`$\frac{d}{dx}(y^2)$ is…`, [r`$2y$`, r`$2y\frac{dy}{dx}$`, r`$2x$`, r`$y^2\frac{dy}{dx}$`], 1, [], r`Chain Rule: $y$ is a function of $x$.`),
    mc(3, r`On $x^2 + y^2 = 25$, where are the tangent lines vertical?`, ["(0, ±5)", "(±5, 0)", "(3, 4)", "Nowhere"], 1, [], r`$\frac{dy}{dx} = -\frac{x}{y}$ is undefined when $y = 0$ (and $x \ne 0$).`, "review"),
  ],
});
