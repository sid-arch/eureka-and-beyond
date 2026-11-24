import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "interpreting-accumulation",
  title: "Interpreting the behavior of accumulation functions involving area",
  summary: "Analyze g(x) = ∫ₐˣ f(t) dt from the graph of f: values from areas, increase and decrease from the sign of f, extrema and concavity.",
  minutes: 30,
  objectives: [
    "Evaluate g at points from areas of geometric regions.",
    "Find where g increases, decreases and has extrema from the sign of f.",
    "Find concavity of g from whether f is increasing or decreasing.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  formulas: ["ftc"],
  blocks: [
    def("Reading g from f", r`$g' = f$ and $g'' = f'$. So $g$ increases where $f > 0$, has a relative max where $f$ changes from positive to negative, and is concave up where $f$ is increasing.`),
    example(r`$f(t) = 2 - t$ on $[0, 5]$ and $g(x) = \int_0^x f(t)\,dt$`, [
      [r`g(2) = \tfrac{1}{2}(2)(2) = 2`, "Triangle above the axis."],
      [r`g(4) = 2 - 2 = 0`, "Equal triangle below."],
      [r`g \text{ max at } x = 2`, "f changes from + to −."],
      [r`g \text{ concave down everywhere}`, "f is decreasing (g″ = −1)."],
    ]),
    activity("accumulation", { title: "Where is g largest?", params: { fn: "linear", x: 2 } }),
    callout("tip", "Try this", r`Find the $x$ where the lower graph peaks, then look at the upper graph: it's exactly where $f$ crosses zero.`, "experiment"),
    callout("application", "Where this shows up", r`Water in a reservoir is the accumulation of inflow minus outflow; the reservoir is fullest exactly when net inflow turns from positive to negative.`),
  ],
  questions: [
    num(1, r`Using $f(t) = 2 - t$, find $g(5) = \int_0^5 f(t)\,dt$.`, -2.5, { tolerance: 0.001 }, [], r`$2 - \frac{1}{2}(3)(3) = 2 - 4.5 = -2.5$.`),
    mc(2, r`$g(x) = \int_0^x f(t)\,dt$, and $f$ is positive and decreasing on $(1, 3)$. On $(1, 3)$, $g$ is…`, ["increasing, concave up", "increasing, concave down", "decreasing, concave up", "decreasing, concave down"], 1, [], r`$g' = f > 0$; $g'' = f' < 0$.`),
    mc(2, r`Where does $g(x) = \int_0^x \sin t\,dt$ have its relative maximum on $(0, 2\pi)$?`, [r`$\frac{\pi}{2}$`, r`$\pi$`, r`$\frac{3\pi}{2}$`, r`$2\pi$`], 1, [], r`$\sin t$ changes from positive to negative at $\pi$.`),
    num(3, r`Find $g(\pi)$ for $g(x) = \int_0^x \sin t\,dt$.`, 2, {}, [], r`$1 - \cos\pi = 2$.`, "review"),
  ],
});
