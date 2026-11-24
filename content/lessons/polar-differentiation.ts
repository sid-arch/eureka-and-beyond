import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "polar-differentiation",
  title: "Defining polar coordinates and differentiating in polar form",
  summary: "Treat a polar curve r = f(θ) as the parametric curve x = r cos θ, y = r sin θ, and compute slopes dy/dx and rates dr/dθ.",
  minutes: 30,
  objectives: [
    "Write x = f(θ)cos θ and y = f(θ)sin θ.",
    "Compute dy/dx = (dy/dθ)/(dx/dθ) for a polar curve.",
    "Distinguish dr/dθ (moving toward or away from the pole) from dy/dx (slope).",
  ],
  concepts: [
    { slug: "polar-coordinates", name: "Polar coordinates", description: "Locating points by distance r from the pole and angle θ.", subject: "subj_math" },
  ],
  formulas: ["polar-conversion"],
  blocks: [
    def("Slope in polar form", r`With $x = r\cos\theta$, $y = r\sin\theta$ and $r' = \frac{dr}{d\theta}$: $\frac{dy}{dx} = \frac{r'\sin\theta + r\cos\theta}{r'\cos\theta - r\sin\theta}$.`),
    example(r`$r = 1 + \sin\theta$ at $\theta = 0$`, [
      [r`r = 1,\ r' = \cos 0 = 1`, ""],
      [r`\frac{dy}{dx} = \frac{1 \cdot 0 + 1 \cdot 1}{1 \cdot 1 - 1 \cdot 0} = 1`, ""],
    ]),
    example(r`$r = 2\cos\theta$ at $\theta = \frac{\pi}{4}$`, [
      [r`r = \sqrt{2},\ r' = -2\sin\theta = -\sqrt{2}`, ""],
      [r`\text{numerator: } -1 + 1 = 0`, "Horizontal tangent: the top of this circle."],
    ]),
    activity("polar-graph", { title: "Trace a limaçon", params: { kind: "limacon", a: 1, b: 1, n: 1 } }),
    callout("warning", "dr/dθ isn't the slope", r`$\frac{dr}{d\theta}$ tells whether the point moves toward or away from the pole; the slope of the curve is $\frac{dy}{dx}$.`),
    callout("application", "Where this shows up", r`Radar returns and antenna patterns are recorded in polar form; finding where their boundary is horizontal or vertical uses this formula.`),
  ],
  questions: [
    num(2, r`For $r = \theta$, find $\frac{dy}{dx}$ at $\theta = \frac{\pi}{2}$, to three decimal places.`, -0.637, { tolerance: 0.002 }, [r`$r = \frac{\pi}{2}$, $r' = 1$.`], r`$\frac{1 \cdot 1 + \frac{\pi}{2}\cdot 0}{1 \cdot 0 - \frac{\pi}{2}\cdot 1} = -\frac{2}{\pi}$.`),
    mc(2, r`For $r = 3$ (a circle), $\frac{dr}{d\theta}$ is…`, ["3", "0", "undefined", "−3"], 1, [], r`The distance from the pole never changes.`),
    mc(2, r`For $r = 4\sin\theta$ on $0 < \theta < \frac{\pi}{2}$, as $\theta$ increases the point moves…`, ["toward the pole", "away from the pole", "in a straight line", "it doesn't move"], 1, [], r`$r' = 4\cos\theta > 0$ and $r > 0$.`),
    num(3, r`For $r = 1 + \cos\theta$, find $\frac{dr}{d\theta}$ at $\theta = \frac{\pi}{2}$.`, -1, {}, [], r`$-\sin\frac{\pi}{2} = -1$: moving toward the pole.`, "review"),
  ],
});
