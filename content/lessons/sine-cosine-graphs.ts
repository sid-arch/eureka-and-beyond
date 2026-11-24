import { activity, callout, def, example, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sine-cosine-graphs",
  title: "Graphs of sine and cosine",
  summary: "Build the sine and cosine graphs from the unit circle and identify their period, amplitude, midline, zeros, maximums and minimums.",
  minutes: 25,
  objectives: [
    "Generate the graphs of y = sin x and y = cos x from the unit circle.",
    "Identify period, amplitude, midline, zeros and extrema of the parent graphs.",
    "Relate sine and cosine as horizontal shifts of each other.",
  ],
  concepts: [
    { slug: "trig-functions", name: "Trigonometric functions", description: "Sine, cosine and related functions of an angle, defined on the unit circle.", subject: "subj_math" },
  ],
  formulas: ["sinusoid"],
  blocks: [
    text(r`As an angle $x$ (in radians) turns around the unit circle, $\sin x$ is the height of the point and $\cos x$ is its horizontal position. Plot those values against $x$ and you get waves that repeat every $2\pi$.`),
    activity("unit-circle", { title: "Trace sine and cosine on the unit circle" }),
    def("Key features", r`Both have period $2\pi$, amplitude 1, midline $y = 0$ and range $[-1, 1]$. $\sin x$: zeros at $0, \pi, 2\pi$; max at $\frac{\pi}{2}$; min at $\frac{3\pi}{2}$. $\cos x$: max at $0$; zeros at $\frac{\pi}{2}, \frac{3\pi}{2}$; min at $\pi$.`),
    text(r`The cosine graph is the sine graph shifted left by $\frac{\pi}{2}$: $\cos x = \sin\left(x + \frac{\pi}{2}\right)$. Sine is odd (symmetric about the origin) and cosine is even (symmetric about the y-axis).`),
    activity("sinusoid", { title: "Switch between sin and cos", params: { A: 1, B: 1, C: 0, D: 0 } }),
    example(r`Where on $[0, 2\pi]$ is $\sin x = -1$, and what is $\cos\pi$?`, [
      [r`x = \tfrac{3\pi}{2}`, "The bottom of the unit circle."],
      [r`\cos\pi = -1`, "The leftmost point."],
    ]),
    callout("application", "Where this shows up", r`Sound waves, alternating current, tides, daylight hours over a year and circular motion are all modeled by sine and cosine.`),
  ],
  questions: [
    num(1, r`What is the period of $y = \sin x$, as a multiple of π? Enter the coefficient (for 2π, enter 2).`, 2, {}, [], r`$2\pi$.`),
    mc(2, r`Where on $[0, 2\pi)$ does $\cos x = 0$?`, [r`$0, \pi$`, r`$\frac{\pi}{2}, \frac{3\pi}{2}$`, r`$\frac{\pi}{4}, \frac{5\pi}{4}$`, r`$\pi$ only`], 1, [], r`At the top and bottom of the unit circle.`),
    mc(2, r`Which is true?`, [r`$\sin x = \cos\left(x - \frac{\pi}{2}\right)$`, r`$\sin x = \cos x$ for all x`, r`$\cos x = -\sin x$`, r`$\sin(-x) = \sin x$`], 0, [], r`Cosine shifted right by $\frac{\pi}{2}$ is sine.`),
    num(3, r`What is the maximum value of $y = \cos x$ on $[0, 2\pi]$, and at how many points does it occur? Enter the number of points.`, 2, {}, ["Max 1 at x = 0 and x = 2π."], r`Two points: $0$ and $2\pi$.`, "review"),
  ],
});
