import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "end-behavior-turning-points",
  title: "End behavior and turning points",
  summary: "Predict the end behavior of a polynomial from its degree and leading coefficient, bound the number of turning points, and identify local maxima and minima.",
  minutes: 25,
  objectives: [
    "Determine end behavior from the leading term.",
    "State that a degree-n polynomial has at most n − 1 turning points and at most n real zeros.",
    "Identify relative maxima and minima and intervals of increase and decrease from a graph.",
  ],
  concepts: [
    { slug: "polynomial-functions", name: "Polynomial functions", description: "Functions built from sums of powers of x with whole-number exponents.", subject: "subj_math" },
  ],
  blocks: [
    def("End behavior", r`For large $|x|$, the leading term $a_n x^n$ dominates. Even degree: both ends point the same way (up if $a_n > 0$, down if $a_n < 0$). Odd degree: the ends point opposite ways (down-left, up-right if $a_n > 0$; reversed if $a_n < 0$).`),
    def("Turning points", r`A degree-$n$ polynomial has at most $n - 1$ turning points (relative maxima or minima) and at most $n$ real zeros.`),
    example(r`Describe $f(x) = -2x^5 + 7x^3 - x + 4$`, [
      [r`\text{leading term } -2x^5`, "Odd degree, negative coefficient."],
      [r`x \to -\infty: f \to +\infty;\quad x \to +\infty: f \to -\infty`, "Up on the left, down on the right."],
      [r`\text{at most 4 turning points, at most 5 real zeros}`, ""],
    ]),
    activity("polynomial-zeros", { title: "Change degree and sign", params: { a: -0.2, r1: -4, m1: 1, r2: 0, m2: 1, r3: 3, m3: 2 } }),
    callout("tip", "Try this", r`The degree readout and end-behavior arrows update as you change multiplicities. Find a setting with degree 4 and only 1 turning point. (A degree-4 polynomial can have 1 or 3 turning points, never 2.)`, "experiment"),
    callout("application", "Where this shows up", r`End behavior tells you how a model behaves for extreme inputs, which is when polynomial models usually break down, a warning sign for extrapolation.`),
  ],
  questions: [
    mc(1, r`What is the end behavior of $f(x) = 3x^4 - x$?`, ["Both ends up", "Both ends down", "Left down, right up", "Left up, right down"], 0, [], r`Even degree, positive leading coefficient.`),
    mc(2, r`What is the end behavior of $f(x) = -x^3 + 2x^2$?`, ["Both ends up", "Both ends down", "Left down, right up", "Left up, right down"], 3, [], r`Odd degree, negative leading coefficient.`),
    num(2, r`What is the maximum number of turning points of a degree-6 polynomial?`, 5, {}, [], r`$n - 1 = 5$.`),
    mc(2, r`A polynomial graph has 3 turning points. What is the smallest possible degree?`, ["2", "3", "4", "5"], 2, [r`Turning points ≤ n − 1.`], r`$n - 1 \ge 3$, so $n \ge 4$.`),
    mc(3, r`A graph rises on both ends and has 3 turning points. Which degree is possible?`, ["3", "4", "5", "7"], 1, ["Both ends up: even degree."], r`Even degree with at least 4: degree 4 (or 6, 8, …).`, "review"),
  ],
});
