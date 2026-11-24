import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "concavity-inflection",
  title: "Determining concavity of functions over their domains",
  summary: "Use the sign of f″ to find intervals of concavity and points of inflection, and read concavity from graphs of f′.",
  minutes: 25,
  objectives: [
    "Find where f is concave up or down from the sign of f″.",
    "Locate points of inflection, where concavity changes.",
    "Read concavity from where f′ is increasing or decreasing.",
  ],
  concepts: [
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("Concavity test", r`If $f''(x) > 0$ on an interval, $f$ is concave up there ($f'$ increasing); if $f''(x) < 0$, concave down ($f'$ decreasing). A point of inflection is where $f$ is continuous and its concavity changes.`),
    example(r`$f(x) = x^4 - 4x^3$`, [
      [r`f''(x) = 12x^2 - 24x = 12x(x - 2)`, ""],
      [r`f'' > 0 \text{ on } (-\infty, 0) \cup (2, \infty)`, "Concave up."],
      [r`f'' < 0 \text{ on } (0, 2)`, "Concave down."],
      [r`\text{inflection points at } x = 0 \text{ and } x = 2`, "f″ changes sign at both."],
    ]),
    activity("derivative-graph", { title: "Concavity from the slope of f′", params: { fn: "quartic", a: 0 } }),
    callout("warning", "f″ = 0 is not enough", r`$f(x) = x^4$ has $f''(0) = 0$, but it's concave up on both sides: no inflection point. The sign must change.`),
    callout("application", "Where this shows up", r`An epidemic's cumulative case curve has an inflection point where new cases per day peak: concave up before (accelerating), concave down after (slowing).`),
  ],
  questions: [
    num(1, r`Find the $x$-coordinate of the inflection point of $f(x) = x^3 - 6x^2$.`, 2, {}, [], r`$f'' = 6x - 12$ changes sign at 2.`),
    mc(2, r`On which interval is $f(x) = x^4 - 4x^3$ concave down?`, [r`$(-\infty, 0)$`, r`$(0, 2)$`, r`$(2, \infty)$`, "nowhere"], 1, [], r`$f'' = 12x(x - 2) < 0$ there.`),
    mc(2, r`The graph of $f'$ is decreasing on $(3, 7)$. Then on $(3, 7)$, $f$ is…`, ["decreasing", "concave down", "negative", "concave up"], 1, [], r`$f'$ decreasing means $f'' < 0$.`),
    mc(3, r`Does $f(x) = x^{1/3}$ have an inflection point at $x = 0$?`, ["Yes: concavity changes there and f is continuous", "No: f″(0) doesn't exist", "No: f′(0) doesn't exist", "No: it's a cusp"], 0, [r`Check the sign of $f'' = -\frac{2}{9}x^{-5/3}$ on each side.`], r`Concave up for $x < 0$, down for $x > 0$, and $f$ is continuous: an inflection point even though $f''(0)$ is undefined.`, "review"),
  ],
});
