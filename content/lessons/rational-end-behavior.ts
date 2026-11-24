import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-end-behavior",
  title: "Rational functions and end behavior",
  summary: "Predict what a rational function does as x grows without bound by comparing the degrees and leading terms of its numerator and denominator.",
  minutes: 25,
  objectives: [
    "Determine a rational function's end behavior from the ratio of leading terms.",
    "Find horizontal asymptotes by comparing degrees.",
    "Find a slant asymptote by polynomial division when the numerator's degree is one more.",
  ],
  concepts: [
    { slug: "rational-functions", name: "Rational functions", description: "Functions that are ratios of polynomials, with asymptotes and holes.", subject: "subj_math" },
  ],
  blocks: [
    def("End behavior from leading terms", r`For large $|x|$, a polynomial behaves like its leading term. So $r(x) = \frac{p(x)}{q(x)}$ behaves like the ratio of the leading terms of $p$ and $q$.`),
    def("Three cases", r`If $\deg p < \deg q$, $r(x) \to 0$: horizontal asymptote $y = 0$. If the degrees are equal, $r(x) \to \frac{a}{b}$, the ratio of leading coefficients. If $\deg p > \deg q$, $r(x)$ grows without bound; when $\deg p = \deg q + 1$, the quotient from division is a slant asymptote.`),
    example(r`$r(x) = \dfrac{3x^2 + 1}{x^2 - 4}$`, [
      [r`\frac{3x^2}{x^2} = 3`, "Equal degrees: ratio of leading coefficients."],
      [r`\lim_{x \to \pm\infty} r(x) = 3`, "Horizontal asymptote y = 3."],
    ]),
    example(r`$r(x) = \dfrac{2x + 1}{x^2 + 1}$`, [
      [r`\frac{2x}{x^2} = \frac{2}{x} \to 0`, "Lower degree on top: y = 0."],
    ]),
    example(r`$r(x) = \dfrac{x^2 + 1}{x - 1}$`, [
      [r`x^2 + 1 = (x - 1)(x + 1) + 2`, "Divide."],
      [r`r(x) = x + 1 + \frac{2}{x - 1}`, "The remainder term goes to 0."],
      [r`y = x + 1`, "Slant asymptote."],
    ]),
    activity("rational-graph", { title: "Watch the graph flatten toward its asymptote", params: { a: 2, h: 1, k: -1 } }, "experiment"),
    callout("tip", "Try this", r`Here $y = \frac{2}{x - 1} - 1$. Drag far left and right on the graph in your mind: the outputs approach $k = -1$. Change $k$ and the horizontal asymptote moves with it.`, "experiment"),
    callout("application", "Where this shows up", r`The average cost per item, $\frac{5000 + 3x}{x}$, approaches 3 dollars as production $x$ grows: the fixed cost spreads out, and the end behavior is the long-run cost per item.`),
  ],
  questions: [
    num(1, r`Find the horizontal asymptote $y = ?$ of $\dfrac{5x^3 - x}{2x^3 + 7}$.`, 2.5, { tolerance: 0.001 }, ["Equal degrees."], r`$\frac{5}{2} = 2.5$.`),
    num(1, r`What does $\dfrac{4x}{x^2 + 1}$ approach as $x \to \infty$?`, 0, { tolerance: 0.001 }, [], r`Degree 1 over degree 2: it approaches 0.`),
    mc(2, r`Which function has a slant asymptote?`, [r`$\frac{x^2}{x^2 + 1}$`, r`$\frac{x^3 + 2}{x - 1}$`, r`$\frac{x^2 - 3}{x + 2}$`, r`$\frac{x}{x^2 - 9}$`], 2, ["The numerator's degree must be exactly one more."], r`$\frac{x^2 - 3}{x + 2}$ has degrees 2 and 1. (The cubic over linear grows like $x^2$, a parabola-like end behavior, not a line.)`),
    num(2, r`The average cost of making $x$ items is $C(x) = \dfrac{1200 + 8x}{x}$ dollars. What value does the average cost approach for very large $x$?`, 8, { tolerance: 0.001, unit: "dollars" }, [], r`$\frac{8x}{x} = 8$.`),
    mc(3, r`As $x \to -\infty$, $\dfrac{-2x^2 + x}{x - 5}$…`, ["approaches −2", "approaches 0", "increases without bound", "decreases without bound"], 2, [r`Leading-term ratio $\frac{-2x^2}{x} = -2x$.`], r`For large negative $x$, $-2x$ is large and positive, so the function increases without bound.`, "review"),
  ],
});
