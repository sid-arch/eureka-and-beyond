import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "second-derivative-test",
  title: "Using the Second Derivative Test to determine extrema",
  summary: "Classify critical points where f′(c) = 0 using the sign of f″(c), and know when the test is inconclusive.",
  minutes: 20,
  objectives: [
    "Apply the Second Derivative Test at critical points with f′(c) = 0.",
    "Recognize when the test fails (f″(c) = 0).",
    "Choose between the first and second derivative tests.",
  ],
  concepts: [
    { slug: "extrema", name: "Extrema", description: "Maximum and minimum values of a function, locally or over its whole domain.", subject: "subj_math" },
    { slug: "concavity", name: "Concavity", description: "Whether a function's rate of change is increasing (concave up) or decreasing (concave down).", subject: "subj_math" },
  ],
  blocks: [
    def("Second Derivative Test", r`If $f'(c) = 0$ and $f''(c) > 0$, then $f(c)$ is a relative minimum (concave up, like a cup). If $f'(c) = 0$ and $f''(c) < 0$, it is a relative maximum. If $f''(c) = 0$, the test is inconclusive.`),
    example(r`$f(x) = x^3 - 12x + 1$`, [
      [r`f''(x) = 6x`, ""],
      [r`f''(-2) = -12 < 0 \Rightarrow \text{relative max}`, ""],
      [r`f''(2) = 12 > 0 \Rightarrow \text{relative min}`, ""],
    ]),
    example(r`When it fails: $x^4$, $-x^4$ and $x^3$ at 0`, [
      [r`f'(0) = 0,\ f''(0) = 0 \text{ for all three}`, ""],
      [r`\text{min, max and neither}`, "Use the First Derivative Test instead."],
    ]),
    callout("application", "Where this shows up", r`In physics, an equilibrium is stable if the potential energy has a minimum there: $U'(x) = 0$ and $U''(x) > 0$.`),
  ],
  questions: [
    mc(1, r`$f'(3) = 0$ and $f''(3) = -5$. At $x = 3$, $f$ has…`, ["a relative min", "a relative max", "an inflection point", "no conclusion"], 1, [], r`Concave down at a critical point.`),
    mc(2, r`$f'(1) = 0$ and $f''(1) = 0$. What can you conclude?`, ["Relative max", "Relative min", "Inflection point", "Nothing from this test alone"], 3, [], r`Inconclusive.`),
    num(2, r`$f(x) = x^2 e^{-x}$ has critical points 0 and 2. $f''(x) = e^{-x}(x^2 - 4x + 2)$. Find $f''(0)$.`, 2, {}, [], r`$e^0(2) = 2 > 0$: relative min at 0.`),
    mc(3, r`For the same function, $f''(2) = e^{-2}(4 - 8 + 2)$. At $x = 2$, $f$ has…`, ["a relative min", "a relative max", "an inflection point", "no extremum"], 1, [], r`$f''(2) = -2e^{-2} < 0$.`, "review"),
  ],
});
