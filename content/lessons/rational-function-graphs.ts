import { activity, callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-function-graphs",
  title: "Graphs of rational functions and asymptotes",
  summary: "Find vertical and horizontal asymptotes, holes, intercepts and domain of rational functions, and sketch their graphs.",
  minutes: 30,
  objectives: [
    "Graph transformations of y = 1/x and identify their asymptotes.",
    "Find vertical asymptotes and holes from the factored denominator.",
    "Find horizontal asymptotes by comparing degrees.",
  ],
  concepts: [
    { slug: "rational-functions", name: "Rational functions", description: "Functions that are ratios of polynomials, with asymptotes and holes.", subject: "subj_math" },
  ],
  blocks: [
    activity("rational-graph", { title: "Shift and stretch 1/x", params: { a: 2, h: 1, k: -1 } }),
    callout("tip", "Try this", r`The dashed lines are the asymptotes $x = h$ and $y = k$. Move $h$ and $k$: the asymptotes move with the graph. What happens to the curve when $a$ is negative?`, "experiment"),
    def("Vertical asymptotes and holes", r`Factor and simplify $f(x) = \frac{P(x)}{Q(x)}$. A factor that cancels gives a hole at that $x$. A zero of the denominator that remains after canceling gives a vertical asymptote.`),
    def("Horizontal asymptote", r`Compare the degrees $n$ (numerator) and $d$ (denominator). If $n < d$: $y = 0$. If $n = d$: $y = \frac{\text{leading coefficient of } P}{\text{leading coefficient of } Q}$. If $n > d$: no horizontal asymptote.`),
    example(r`Analyze $f(x) = \dfrac{2x^2 - 2}{x^2 - 3x + 2}$`, [
      [r`\frac{2(x - 1)(x + 1)}{(x - 1)(x - 2)}`, "Factor."],
      [r`\text{hole at } x = 1,\ \text{VA } x = 2`, "x − 1 cancels; x − 2 remains."],
      [r`\text{HA } y = \tfrac{2}{1} = 2`, "Equal degrees."],
      [r`x\text{-intercept } -1,\ y\text{-intercept } f(0) = -1`, ""],
    ], r`The hole is at $\left(1, \frac{2(2)}{-1}\right) = (1, -4)$, from the simplified form $\frac{2(x + 1)}{x - 2}$.`),
    callout("warning", "A graph can cross a horizontal asymptote", r`Horizontal asymptotes describe end behavior only. The graph may cross one at a finite $x$; it can never cross a vertical asymptote.`),
    callout("application", "Where this shows up", r`Average cost per item, $\frac{C}{x}$, falls toward a horizontal asymptote as production grows; drug concentration and lens equations also have asymptotes.`),
  ],
  questions: [
    short(1, r`Find the vertical asymptote of $f(x) = \dfrac{3}{x + 4}$. Enter like x=….`, ["x=-4"], [], r`$x = -4$.`),
    short(2, r`Find the horizontal asymptote of $f(x) = \dfrac{6x + 1}{2x - 5}$. Enter like y=….`, ["y=3"], ["Equal degrees."], r`$y = \frac{6}{2} = 3$.`),
    short(2, r`Find the horizontal asymptote of $f(x) = \dfrac{x + 2}{x^2 - 1}$.`, ["y=0"], [], r`Numerator degree is lower: $y = 0$.`),
    mc(2, r`Where does $f(x) = \dfrac{x^2 - 9}{x - 3}$ have a hole?`, [r`$x = 3$`, r`$x = -3$`, r`$x = 9$`, "No hole"], 0, [], r`$x - 3$ cancels, leaving $x + 3$ with a hole at $x = 3$.`),
    short(3, r`Find the vertical asymptote(s) of $f(x) = \dfrac{x - 1}{x^2 - x - 6}$, smaller first, like x=a,x=b.`, ["x=-2,x=3"], [r`$(x - 3)(x + 2)$.`], r`$x = -2$ and $x = 3$.`, "review"),
  ],
});
