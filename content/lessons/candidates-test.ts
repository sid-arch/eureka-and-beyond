import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "candidates-test",
  title: "Using the Candidates Test to determine absolute extrema",
  summary: "Find absolute maximum and minimum values on a closed interval by comparing f at critical points and endpoints.",
  minutes: 25,
  objectives: [
    "List the candidates: critical points inside the interval and both endpoints.",
    "Evaluate f at each candidate and compare.",
    "Report the absolute extrema with their locations.",
  ],
  concepts: [
    { slug: "extrema", name: "Extrema", description: "Maximum and minimum values of a function, locally or over its whole domain.", subject: "subj_math" },
  ],
  blocks: [
    def("Candidates Test (closed interval method)", r`For $f$ continuous on $[a, b]$: 1. Find the critical points in $(a, b)$. 2. Evaluate $f$ at them and at $a$ and $b$. 3. The largest value is the absolute maximum; the smallest is the absolute minimum.`),
    example(r`$f(x) = x^3 - 12x + 1$ on $[-3, 5]$`, [
      [r`\text{critical points: } x = \pm 2`, "Both inside."],
      [r`f(-3) = 10,\ f(-2) = 17`, "Endpoint and critical point on the left."],
      [r`f(2) = -15,\ f(5) = 66`, "Critical point and endpoint on the right."],
      [r`\text{abs max } 66 \text{ at } x = 5;\ \text{abs min } -15 \text{ at } x = 2`, "The relative max at −2 isn't the absolute max."],
    ]),
    callout("warning", "Only critical points inside the interval", r`Ignore critical points outside $[a, b]$, and don't forget the endpoints: they're often where the absolute extremes occur.`),
    callout("application", "Where this shows up", r`A business limited to producing between 0 and 500 units checks the profit at each critical point and at 0 and 500 to find the best plan.`),
  ],
  questions: [
    num(1, r`Find the absolute maximum value of $f(x) = x^2 - 4x$ on $[0, 5]$.`, 5, {}, [], r`Candidates: $f(0) = 0$, $f(2) = -4$, $f(5) = 5$.`),
    num(1, r`Find the absolute minimum value of $f(x) = x^2 - 4x$ on $[0, 5]$.`, -4, {}, [], r`At $x = 2$.`),
    num(2, r`Find the absolute maximum value of $f(x) = \sin x + \cos x$ on $[0, \pi]$, to three decimal places.`, 1.414, { tolerance: 0.001 }, [r`$f' = \cos x - \sin x = 0$ at $\frac{\pi}{4}$.`], r`$f(\frac{\pi}{4}) = \sqrt{2}$; $f(0) = 1$; $f(\pi) = -1$.`),
    mc(3, r`On $[1, 4]$, $f(x) = x + \frac{4}{x}$. Where is the absolute minimum?`, ["x = 1", "x = 2", "x = 4", "x = −2"], 1, [r`$f'(x) = 1 - \frac{4}{x^2}$.`], r`$f(1) = 5$, $f(2) = 4$, $f(4) = 5$.`, "review"),
  ],
});
