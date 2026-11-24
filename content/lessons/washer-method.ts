import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "washer-method",
  title: "Volume with washer method: revolving around the x- or y-axis",
  summary: "Find volumes of solids with holes by subtracting the inner disc from the outer: V = π∫ (R² − r²) dx.",
  minutes: 30,
  objectives: [
    "Identify outer and inner radii.",
    "Set up V = π∫ (R(x)² − r(x)²) dx, not π∫ (R − r)² dx.",
    "Revolve about the x- or y-axis.",
  ],
  concepts: [
    { slug: "volume-integrals", name: "Volume by integration", description: "Finding volumes by adding up the areas of thin slices with an integral.", subject: "subj_math" },
  ],
  blocks: [
    def("Washer method", r`When the region lies between an outer curve $R(x)$ and an inner curve $r(x)$ (distances from the axis), each slice is a washer with area $\pi R^2 - \pi r^2$, so $V = \pi\int_a^b \left[R(x)^2 - r(x)^2\right]dx$.`),
    example(r`Region between $y = \sqrt{x}$ and $y = \frac{x}{2}$, revolved about the $x$-axis`, [
      [r`\sqrt{x} = \tfrac{x}{2} \Rightarrow x = 0, 4`, ""],
      [r`V = \pi\int_0^4 \left(x - \tfrac{x^2}{4}\right)dx`, "Outer √x, inner x/2."],
      [r`= \pi\left(8 - \tfrac{16}{3}\right) = \tfrac{8\pi}{3} \approx 8.38`, ""],
    ]),
    activity("volume-slicing", { title: "Washers", params: { mode: "washer", n: 10, x: 2 } }),
    callout("warning", "Square, then subtract", r`$\pi(R^2 - r^2) \ne \pi(R - r)^2$. Each disc is squared before subtracting.`),
    callout("application", "Where this shows up", r`Pipes, bearings and pulleys are washer-shaped solids; their material volume is outer minus inner.`),
  ],
  questions: [
    num(2, r`Region between $y = x$ and $y = x^2$, revolved about the $x$-axis. Volume to three decimal places.`, 0.419, { tolerance: 0.002 }, [], r`$\pi\int_0^1 (x^2 - x^4)\,dx = \frac{2\pi}{15}$.`),
    mc(2, r`For the region between $y = 3$ and $y = 1$ on $[0, 2]$, revolved about the $x$-axis, the volume is…`, [r`$\pi\int_0^2 (3 - 1)^2\,dx$`, r`$\pi\int_0^2 (9 - 1)\,dx = 16\pi$`, r`$\pi\int_0^2 9\,dx$`, r`$2\pi\int_0^2 3\,dx$`], 1, [], r`A thick-walled cylinder: $\pi(9 - 1) \cdot 2$.`),
    num(2, r`Region between $y = x$ and $y = x^2$, revolved about the $y$-axis. Volume to three decimal places.`, 0.524, { tolerance: 0.002 }, [r`In $y$: outer $x = \sqrt{y}$, inner $x = y$.`], r`$\pi\int_0^1 (y - y^2)\,dy = \frac{\pi}{6}$.`),
    mc(3, r`Which mistake gives $\pi\int_0^4 (\sqrt{x} - \frac{x}{2})^2\,dx$ for the example?`, ["Wrong limits", "Squaring the difference instead of subtracting squares", "Using y instead of x", "Nothing; it's correct"], 1, [], r`That's the volume of a different solid.`, "review"),
  ],
});
