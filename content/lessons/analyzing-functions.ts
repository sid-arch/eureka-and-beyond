import { activity, callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "analyzing-functions",
  title: "Domain, range and intervals of increase and decrease",
  summary: "Read domain and range in interval notation, find intervals where a function increases, decreases or is constant, locate relative extrema, and compute average rates of change.",
  minutes: 30,
  objectives: [
    "Write domain and range in interval notation from graphs and formulas.",
    "Identify intervals of increase and decrease and relative maxima and minima.",
    "Compute the average rate of change of a function on an interval.",
  ],
  concepts: [
    { slug: "domain-range", name: "Domain and range", description: "The set of possible inputs and the set of resulting outputs of a function.", subject: "subj_math" },
    { slug: "rate-of-change", name: "Average rate of change", description: "The change in output divided by the change in input over an interval.", subject: "subj_math" },
  ],
  formulas: ["slope"],
  blocks: [
    def("Increasing and decreasing", r`$f$ is increasing on an interval if $x_1 < x_2$ implies $f(x_1) < f(x_2)$ there (the graph rises left to right), and decreasing if it falls. A relative maximum is a point higher than all nearby points; a relative minimum is lower.`),
    def("Average rate of change", r`On $[a, b]$: $\dfrac{f(b) - f(a)}{b - a}$, the slope of the secant line through $(a, f(a))$ and $(b, f(b))$.`),
    activity("polynomial-zeros", { title: "Find where it rises and falls", params: { a: 0.25, r1: -3, m1: 1, r2: 1, m2: 2, r3: 4, m3: 1 } }),
    callout("tip", "Try this", r`Estimate the x-values of the relative maximum and minimum by eye. Between them the graph decreases. Intervals of increase or decrease are stated with x-values, never y-values.`, "experiment"),
    example(r`For $f(x) = x^3 - 3x$, find the extrema (given: turning points at $x = \pm 1$) and intervals`, [
      [r`f(-1) = 2,\ f(1) = -2`, "Relative max 2 at x = −1, relative min −2 at x = 1."],
      [r`\text{increasing on } (-\infty, -1) \cup (1, \infty),\ \text{decreasing on } (-1, 1)`, ""],
    ]),
    example(r`Average rate of change of $f(x) = x^2$ on $[1, 4]$`, [
      [r`\frac{16 - 1}{4 - 1} = 5`, ""],
    ]),
    callout("application", "Where this shows up", r`Average speed is the average rate of change of position, and economists describe growth "per year" over a period. Instantaneous rates (calculus) come from shrinking the interval.`),
  ],
  questions: [
    short(1, r`Write the domain of $f(x) = \sqrt{6 - x}$ in interval notation. Use the format (-inf,6].`, ["(-inf,6]", "(-∞,6]"], [], r`$6 - x \ge 0$, so $(-\infty, 6]$.`),
    short(2, r`Find the average rate of change of $f(x) = 2x^2 - x$ on $[0, 3]$.`, ["5"], [r`$f(3) = 15$, $f(0) = 0$.`], r`$15 / 3 = 5$.`),
    mc(2, r`$g(x) = -(x - 2)^2 + 5$ is increasing on…`, [r`$(2, \infty)$`, r`$(-\infty, 2)$`, r`$(-\infty, 5)$`, r`$(5, \infty)$`], 1, ["Opens down; vertex at x = 2."], r`It rises until the vertex: $(-\infty, 2)$.`),
    short(3, r`What is the range of $h(x) = 3 - |x + 1|$? Use the format (-inf,3].`, ["(-inf,3]", "(-∞,3]"], [], r`The maximum is 3 at $x = -1$, so $(-\infty, 3]$.`, "review"),
  ],
});
