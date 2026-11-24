import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "increasing-decreasing-intervals",
  title: "Determining intervals on which a function is increasing or decreasing",
  summary: "Use the sign of f′ on a sign chart to find where f increases and decreases, and justify the answer in words.",
  minutes: 25,
  objectives: [
    "Find critical points and build a sign chart for f′.",
    "State intervals of increase and decrease.",
    "Justify the conclusion using the sign of f′.",
  ],
  concepts: [
    { slug: "extrema", name: "Extrema", description: "Maximum and minimum values of a function, locally or over its whole domain.", subject: "subj_math" },
  ],
  blocks: [
    def("The test", r`If $f'(x) > 0$ on an interval, $f$ is increasing there; if $f'(x) < 0$, $f$ is decreasing. (This follows from the Mean Value Theorem.)`),
    example(r`$f(x) = x^3 - 12x + 1$`, [
      [r`f'(x) = 3(x - 2)(x + 2)`, "Critical points −2 and 2."],
      [r`f'(-3) = 15 > 0,\ f'(0) = -12 < 0`, "Test a point in each interval."],
      [r`f'(3) = 15 > 0`, ""],
      [r`\text{increasing on } (-\infty, -2) \text{ and } (2, \infty)`, ""],
      [r`\text{decreasing on } (-2, 2)`, "Because f′ < 0 there."],
    ]),
    activity("derivative-graph", { title: "Read increase and decrease from f′", params: { fn: "cubic", a: 0 } }),
    callout("tip", "Justification", r`A complete answer names the reason: "$f$ is decreasing on $(-2, 2)$ because $f'(x) < 0$ on that interval." Pointing to the graph of $f'$ is fine if it's given.`),
    callout("application", "Where this shows up", r`If a profit function's derivative is positive, increasing production raises profit; where it turns negative, producing more starts to cost money.`),
  ],
  questions: [
    mc(1, r`$f'(x) = (x - 4)(x + 1)$. On which interval is $f$ decreasing?`, [r`$(-\infty, -1)$`, r`$(-1, 4)$`, r`$(4, \infty)$`, r`$(-\infty, 4)$`], 1, [], r`$f'(0) = -4 < 0$.`),
    num(2, r`$f(x) = xe^{-x}$. $f$ is increasing for $x < k$. Find $k$.`, 1, {}, [], r`$f' = e^{-x}(1 - x) > 0$ when $x < 1$.`),
    mc(2, r`$f'(x) = x^2 + 1$. Then $f$ is…`, ["increasing everywhere", "decreasing everywhere", "increasing then decreasing", "constant"], 0, [], r`$f' > 0$ for all $x$.`),
    mc(3, r`The graph of $f'$ is below the $x$-axis on $(1, 3)$. What does this tell you about $f$?`, ["f is negative on (1, 3)", "f is decreasing on (1, 3)", "f is concave down on (1, 3)", "f has a minimum at 1"], 1, [], r`The sign of $f'$ gives the direction of $f$, not its sign.`, "review"),
  ],
});
