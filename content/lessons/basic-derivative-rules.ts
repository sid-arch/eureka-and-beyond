import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "basic-derivative-rules",
  title: "Derivative rules: constant, sum, difference and constant multiple",
  summary: "Differentiate polynomials and sums of powers term by term using the constant, constant multiple, sum and difference rules, and find horizontal tangents.",
  minutes: 25,
  objectives: [
    "Apply the constant, constant multiple, sum and difference rules.",
    "Differentiate polynomials and sums of power functions.",
    "Find where a graph has horizontal tangent lines.",
  ],
  concepts: [
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["power-rule", "derivative-rules"],
  blocks: [
    def("Rules", r`$\frac{d}{dx}c = 0$; $\frac{d}{dx}[c f(x)] = c f'(x)$; $\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$.`),
    example(r`$f(x) = 3x^4 - 5x^2 + 7x - 2$`, [
      [r`f'(x) = 12x^3 - 10x + 7`, "Term by term."],
    ]),
    example(r`Where does $y = x^3 - 3x$ have horizontal tangents?`, [
      [r`y' = 3x^2 - 3 = 0`, ""],
      [r`x = \pm 1`, "Points (1, −2) and (−1, 2)."],
    ]),
    activity("derivative-graph", { title: "Find the flat spots", params: { fn: "cubic", a: -1 } }),
    callout("tip", "Try this", r`Move $a$ to $-1$ and to $1$: the tangent is horizontal and $f'(a) = 0$. Then switch to $\frac{1}{4}x^4 - x^2$ and find its three flat spots.`, "experiment"),
    callout("application", "Where this shows up", r`If revenue is $R(q) = 50q - 0.02q^2$, then $R'(q) = 50 - 0.04q$ tells how much each additional sale adds, and $R' = 0$ at $q = 1250$ marks maximum revenue.`),
  ],
  questions: [
    num(1, r`If $f(x) = 4x^3 - \frac{2}{x}$, find $f'(1)$.`, 14, {}, [r`$-\frac{2}{x} = -2x^{-1}$.`], r`$12x^2 + 2x^{-2} = 14$ at 1.`),
    num(2, r`At what $x$ does $y = x^2 - 8x + 3$ have a horizontal tangent?`, 4, {}, [], r`$2x - 8 = 0$.`),
    mc(2, r`$\frac{d}{dx}(\pi^2 + 5x)$ is…`, [r`$2\pi + 5$`, "5", r`$\pi^2 + 5$`, "0"], 1, [], r`$\pi^2$ is a constant.`),
    num(3, r`Revenue is $R(q) = 50q - 0.02q^2$. Find $R'(1000)$ in dollars per item.`, 10, { unit: "dollars per item" }, [], r`$50 - 0.04(1000) = 10$.`, "review"),
  ],
});
