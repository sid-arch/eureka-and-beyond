import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sketching-slope-fields",
  title: "Sketching slope fields",
  summary: "Draw slope fields by evaluating dy/dx at grid points, use isoclines to speed up sketching, and sketch solution curves through given points.",
  minutes: 25,
  objectives: [
    "Compute slopes at grid points and draw short segments.",
    "Use isoclines (curves of constant slope) to organize the sketch.",
    "Sketch a solution curve that follows the field.",
  ],
  concepts: [
    { slug: "differential-equations", name: "Differential equations", description: "Equations relating a function to its derivatives, used to model how quantities change.", subject: "subj_math" },
  ],
  blocks: [
    def("Slope field", r`For $\frac{dy}{dx} = f(x, y)$, draw at each grid point a short segment with slope $f(x, y)$. Solution curves are tangent to the segments everywhere.`),
    example(r`$\frac{dy}{dx} = x - y$`, [
      [r`(1, 0): 1;\ (0, 1): -1;\ (2, 2): 0`, "Slopes at a few points."],
      [r`\text{slope 0 along } y = x`, "An isocline: all segments there are flat."],
      [r`\text{slope 1 along } y = x - 1`, r`And that line is itself a solution, since $y' = 1 = x - (x - 1)$.`],
    ]),
    activity("slope-field", { title: "dy/dx = x − y", params: { eq: "x-y", x0: 0, y0: 1 } }),
    callout("tip", "Try this", r`Start at $(0, -1)$: the solution is the straight line $y = x - 1$. Start anywhere else and the curve approaches that line as $x$ grows.`, "experiment"),
    callout("application", "Where this shows up", r`Weather maps of wind direction and ocean current charts are slope fields; a drifting buoy traces a solution curve.`),
  ],
  questions: [
    num(1, r`For $\frac{dy}{dx} = x - y$, what slope is drawn at $(3, 1)$?`, 2, {}, [], r`$3 - 1 = 2$.`),
    num(2, r`For $\frac{dy}{dx} = xy$, what slope is drawn at $(-1, 2)$?`, -2, {}, [], r`$(-1)(2)$.`),
    mc(2, r`In the slope field of $\frac{dy}{dx} = x^2$, segments along any vertical line…`, ["are all parallel", "are all horizontal", "get steeper as y increases", "are undefined"], 0, [], r`The slope depends only on $x$.`),
    mc(3, r`For $\frac{dy}{dx} = y(2 - y)$, which horizontal lines are solutions?`, ["y = 0 and y = 2", "y = 1 only", "x = 0 and x = 2", "none"], 0, [], r`$\frac{dy}{dx} = 0$ there for all $x$: equilibrium solutions.`, "review"),
  ],
});
