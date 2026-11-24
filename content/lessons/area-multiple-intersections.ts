import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "area-multiple-intersections",
  title: "Finding the area between curves that intersect at more than two points",
  summary: "Find total area when curves cross several times: split at each intersection or integrate the absolute value of the difference.",
  minutes: 25,
  objectives: [
    "Find all intersection points in the interval.",
    "Split the integral where the top curve changes.",
    "Use ∫|f − g| dx and symmetry to simplify.",
  ],
  concepts: [
    { slug: "integrals", name: "Definite integrals", description: "The accumulated (signed) change of a quantity over an interval: area under a rate curve.", subject: "subj_math" },
  ],
  blocks: [
    def("Several crossings", r`Area $= \int_a^b |f(x) - g(x)|\,dx$. By hand, split $[a, b]$ at each crossing and use (top − bottom) on each piece.`),
    example(r`Area between $y = x^3$ and $y = x$`, [
      [r`x^3 = x \Rightarrow x = -1, 0, 1`, ""],
      [r`\int_{-1}^{0} (x^3 - x)\,dx + \int_0^1 (x - x^3)\,dx`, "The top curve switches at 0."],
      [r`= \tfrac{1}{4} + \tfrac{1}{4} = \tfrac{1}{2}`, "Symmetric pieces."],
    ]),
    example(r`Area between $\sin x$ and $\cos x$ on $[0, \pi]$`, [
      [r`\text{they cross at } x = \tfrac{\pi}{4}`, ""],
      [r`\int_0^{\pi/4}(\cos x - \sin x)\,dx = \sqrt{2} - 1`, ""],
      [r`\int_{\pi/4}^{\pi}(\sin x - \cos x)\,dx = 1 + \sqrt{2}`, ""],
      [r`\text{total } 2\sqrt{2} \approx 2.828`, ""],
    ]),
    callout("warning", "Signed integrals cancel", r`$\int_{-1}^{1} (x - x^3)\,dx = 0$, but the area is $\frac{1}{2}$. Without splitting, positive and negative pieces cancel.`),
    callout("application", "Where this shows up", r`The total gap between a planned and actual budget over a year is an area between curves that cross several times.`),
  ],
  questions: [
    num(2, r`Find the area between $y = x^3$ and $y = 4x$.`, 8, {}, [r`Crossings at $-2, 0, 2$.`], r`$2\int_0^2 (4x - x^3)\,dx = 2(8 - 4) = 8$.`),
    mc(2, r`$\int_{-1}^{1} (x - x^3)\,dx = 0$. The area between $y = x$ and $y = x^3$ on $[-1, 1]$ is…`, ["0", "0.5", "1", "0.25"], 1, [], r`Signed areas cancel; the actual area is 0.5.`),
    num(2, r`Find the area between $y = \sin x$ and $y = 0$ on $[0, 2\pi]$.`, 4, {}, [], r`$2 + 2$.`),
    num(3, r`Find the area between $y = x^2 - 1$ and $y = 0$ on $[0, 2]$, to three decimal places.`, 2, { tolerance: 0.002 }, [r`Split at $x = 1$.`], r`$\int_0^1 (1 - x^2) = \frac{2}{3}$, $\int_1^2 (x^2 - 1) = \frac{4}{3}$; total 2.`, "review"),
  ],
});
