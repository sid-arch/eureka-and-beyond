import { callout, def, example, figure, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "differentiability-continuity",
  title: "Connecting differentiability and continuity",
  summary: "Show that differentiability implies continuity but not the reverse, recognize corners, cusps, vertical tangents and discontinuities, and make piecewise functions differentiable.",
  minutes: 25,
  objectives: [
    "Explain why a differentiable function must be continuous.",
    "Identify where a function fails to be differentiable.",
    "Choose constants to make a piecewise function differentiable.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
    { slug: "continuity", name: "Continuity", description: "A function is continuous at c when its limit at c exists and equals f(c).", subject: "subj_math" },
  ],
  blocks: [
    def("The connection", r`If $f$ is differentiable at $a$, then $f$ is continuous at $a$. The converse is false: $|x|$ is continuous at 0 but not differentiable there.`),
    figure("/figures/not-differentiable.svg", "Four graphs that are not differentiable at x = 0: a corner on the absolute value graph, a cusp on x to the two-thirds power, a vertical tangent on the cube root graph, and a jump discontinuity.", "Four ways to fail: corner, cusp, vertical tangent, discontinuity."),
    example(r`Make $f(x) = x^2$ for $x \le 1$ and $f(x) = ax + b$ for $x > 1$ differentiable.`, [
      [r`\text{continuity: } 1 = a + b`, "The pieces must meet."],
      [r`\text{slopes: } 2x \big|_{x = 1} = a \Rightarrow a = 2`, "The slopes must match."],
      [r`b = -1`, r`So $f(x) = 2x - 1$ for $x > 1$: the tangent line at 1.`],
    ]),
    callout("warning", "Matching slopes isn't enough", r`Both conditions are needed. Pieces with equal slopes that don't meet give a jump, which isn't even continuous.`),
    callout("application", "Where this shows up", r`Roller-coaster and road designers join curves so both position and slope match; a corner would mean a sudden change in direction.`),
  ],
  questions: [
    mc(1, r`$f$ is differentiable at 3. Which must be true?`, ["f is continuous at 3", "f′(3) = 0", "f(3) = 0", "f is increasing"], 0, [], r`Differentiable implies continuous.`),
    mc(2, r`At $x = 0$, $f(x) = x^{1/3}$ has…`, ["a corner", "a cusp", "a vertical tangent", "a jump"], 2, [], r`$f'(x) = \frac{1}{3}x^{-2/3}$ grows without bound near 0.`),
    num(2, r`$f(x) = x^3$ for $x \le 2$ and $f(x) = mx + c$ for $x > 2$ is differentiable. Find $m$.`, 12, {}, [], r`$m = 3(2)^2 = 12$.`),
    num(3, r`For that function, find $c$.`, -16, {}, [], r`$8 = 24 + c$, so $c = -16$.`, "review"),
  ],
});
