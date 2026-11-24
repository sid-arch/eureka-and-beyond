import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "mean-value-theorem",
  title: "Using the Mean Value Theorem",
  summary: "State the Mean Value Theorem and Rolle's Theorem, check their hypotheses, find the guaranteed value c, and justify conclusions about instantaneous rates.",
  minutes: 25,
  objectives: [
    "State the MVT and verify continuity and differentiability hypotheses.",
    "Find values c where f′(c) equals the average rate of change.",
    "Use the MVT to justify that a rate was reached at some instant.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  blocks: [
    def("Mean Value Theorem", r`If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there is at least one $c$ in $(a, b)$ with $f'(c) = \frac{f(b) - f(a)}{b - a}$. Rolle's Theorem is the special case $f(a) = f(b)$, which guarantees $f'(c) = 0$.`),
    figure("/figures/mean-value-theorem.svg", "The curve y = x cubed minus 3x from x = 0 to x = 2. A dashed secant line joins the endpoints. At one point c between them, a tangent line is drawn parallel to the secant.", "The tangent at c has the same slope as the secant from a to b."),
    example(r`$f(x) = x^3 - 3x$ on $[0, 2]$`, [
      [r`\frac{f(2) - f(0)}{2 - 0} = \frac{2 - 0}{2} = 1`, "Polynomial: continuous and differentiable."],
      [r`f'(c) = 3c^2 - 3 = 1 \Rightarrow c^2 = \tfrac{4}{3}`, ""],
      [r`c = \tfrac{2}{\sqrt{3}} \approx 1.155`, "Inside (0, 2); reject the negative root."],
    ]),
    example(r`A car travels 120 miles in 2 hours.`, [
      [r`\text{average speed } 60 \text{ mph}`, ""],
      [r`\text{position is differentiable, so by the MVT the speedometer read exactly 60 mph at some instant}`, ""],
    ]),
    callout("warning", "Check the hypotheses", r`$f(x) = |x|$ on $[-1, 1]$ has average rate 0, but $f'(c)$ is never 0: $f$ isn't differentiable at 0, so the MVT doesn't apply.`),
    callout("application", "Where this shows up", r`Average-speed cameras on highways use the MVT's logic: if your average speed between two cameras exceeded the limit, you were going faster than the limit at some instant.`),
  ],
  questions: [
    num(1, r`For $f(x) = x^2$ on $[1, 3]$, find the $c$ guaranteed by the MVT.`, 2, {}, [], r`Average rate $\frac{9 - 1}{2} = 4 = 2c$.`),
    num(2, r`For $f(x) = \sqrt{x}$ on $[0, 4]$, find $c$.`, 1, {}, [], r`Average rate $\frac{1}{2} = \frac{1}{2\sqrt{c}}$, so $c = 1$.`),
    mc(2, r`$f$ is differentiable, $f(1) = 5$ and $f(4) = -1$. What must be true?`, ["f′(c) = −2 for some c in (1, 4)", "f′(c) = 0 for some c in (1, 4)", "f(c) = 0 for some c only", "f′(x) = −2 everywhere"], 0, [], r`Average rate $\frac{-1 - 5}{3} = -2$.`),
    mc(3, r`Why doesn't the MVT apply to $f(x) = \frac{1}{x}$ on $[-1, 1]$?`, ["f(−1) ≠ f(1)", "f isn't continuous on [−1, 1]", "f is decreasing", "It does apply"], 1, [], r`$f$ is undefined at 0.`, "review"),
  ],
});
