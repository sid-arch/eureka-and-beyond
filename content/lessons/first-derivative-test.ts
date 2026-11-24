import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "first-derivative-test",
  title: "Using the First Derivative Test to determine relative extrema",
  summary: "Classify critical points as relative maxima, minima or neither by how the sign of f′ changes across them.",
  minutes: 25,
  objectives: [
    "Apply the First Derivative Test at each critical point.",
    "Recognize critical points where f′ doesn't change sign.",
    "Write a complete justification.",
  ],
  concepts: [
    { slug: "extrema", name: "Extrema", description: "Maximum and minimum values of a function, locally or over its whole domain.", subject: "subj_math" },
  ],
  blocks: [
    def("First Derivative Test", r`At a critical point $c$ (with $f$ continuous at $c$): if $f'$ changes from positive to negative, $f(c)$ is a relative maximum; from negative to positive, a relative minimum; if $f'$ doesn't change sign, there is no relative extremum.`),
    example(r`$f(x) = x^3 - 12x + 1$`, [
      [r`f' > 0 \text{ on } (-\infty, -2),\ f' < 0 \text{ on } (-2, 2),\ f' > 0 \text{ on } (2, \infty)`, ""],
      [r`\text{relative max at } x = -2:\ f(-2) = 17`, "f′ changes from + to −."],
      [r`\text{relative min at } x = 2:\ f(2) = -15`, "f′ changes from − to +."],
    ]),
    example(r`$f'(x) = (x - 1)^2(x + 3)$`, [
      [r`\text{sign change at } -3 \ (- \text{ to } +)`, "Relative minimum at x = −3."],
      [r`\text{no sign change at } 1`, "(x − 1)² ≥ 0: no extremum at x = 1."],
    ]),
    callout("application", "Where this shows up", r`Reading a speed graph: when a runner's velocity changes from positive to negative, they've reached their farthest point and turned around, a relative maximum of position.`),
  ],
  questions: [
    num(1, r`$f'$ changes from negative to positive at $x = 3$ and $f(3) = -4$. What is the relative minimum value?`, -4, {}, [], r`A relative minimum at 3 with value $f(3) = -4$.`),
    mc(2, r`$f'(x) = x(x - 5)$. At $x = 5$, $f$ has…`, ["a relative max", "a relative min", "neither", "an inflection point only"], 1, [], r`$f'$ goes from − (between 0 and 5) to + (after 5).`),
    mc(2, r`$f'(x) = x^2(x - 2)$. At $x = 0$, $f$ has…`, ["a relative max", "a relative min", "neither", "a cusp"], 2, [], r`$f'$ is negative on both sides of 0.`),
    mc(3, r`Which justification for a relative maximum at $x = 4$ is complete?`, ["f′(4) = 0", "f(4) is the largest value", "f′ changes from positive to negative at x = 4", "f″(4) = 0"], 2, [], r`The sign change is the justification.`, "review"),
  ],
});
