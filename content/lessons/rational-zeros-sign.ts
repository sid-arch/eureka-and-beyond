import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "rational-zeros-sign",
  title: "Rational functions and zeros",
  summary: "Find the zeros of rational functions, tell them apart from holes, and use sign charts to solve rational inequalities.",
  minutes: 25,
  objectives: [
    "Find the real zeros of a rational function from its numerator.",
    "Exclude inputs that are also zeros of the denominator (holes or asymptotes).",
    "Build a sign chart to solve rational inequalities.",
  ],
  concepts: [
    { slug: "rational-functions", name: "Rational functions", description: "Functions that are ratios of polynomials, with asymptotes and holes.", subject: "subj_math" },
  ],
  blocks: [
    def("Zeros of a rational function", r`The real zeros of $r(x) = \frac{p(x)}{q(x)}$ are the real zeros of $p$ that are in the domain of $r$. An input that makes both $p$ and $q$ zero is not a zero of $r$: after cancelling, it's usually a hole.`),
    example(r`Zeros of $r(x) = \dfrac{(x - 2)(x + 1)}{(x - 3)(x + 1)}$`, [
      [r`p(x) = 0 \text{ at } x = 2, -1`, ""],
      [r`x = -1 \text{ also zeros } q`, "Not in the domain: a hole."],
      [r`\text{Zero: } x = 2`, ""],
    ]),
    def("Sign charts", r`A rational function can change sign only at a real zero of the numerator or denominator. Mark those points on a number line, then test one value in each interval.`),
    example(r`Solve $\dfrac{x - 1}{x + 2} \ge 0$`, [
      [r`\text{Critical points: } x = 1,\ x = -2`, ""],
      [r`x = -3: \tfrac{-4}{-1} > 0;\ x = 0: \tfrac{-1}{2} < 0;\ x = 2: \tfrac{1}{4} > 0`, "Test each interval."],
      [r`x < -2 \text{ or } x \ge 1`, "Include x = 1 (the function equals 0) but never x = −2."],
    ]),
    callout("warning", "Never include the denominator's zeros", r`Even with $\ge$ or $\le$, an input that makes the denominator 0 is never part of the solution.`),
    callout("application", "Where this shows up", r`Lens and circuit formulas are rational. Asking "when is the output positive?" (a real image, a positive current) is a rational inequality.`),
  ],
  questions: [
    num(1, r`Find the zero of $\dfrac{x^2 - 9}{x + 3}$.`, 3, {}, ["Factor the numerator."], r`$\frac{(x - 3)(x + 3)}{x + 3}$: $x = -3$ is a hole, so the only zero is $x = 3$.`),
    mc(2, r`How many real zeros does $\dfrac{x^2 + 4}{x - 1}$ have?`, ["0", "1", "2", "Infinitely many"], 0, [], r`$x^2 + 4 > 0$ for every real $x$.`),
    mc(2, r`Solve $\dfrac{x + 4}{x - 3} < 0$.`, [r`$-4 < x < 3$`, r`$x < -4$ or $x > 3$`, r`$-4 \le x < 3$`, r`$x > 3$`], 0, ["Test a value between −4 and 3, such as 0."], r`At $x = 0$: $\frac{4}{-3} < 0$. Outside the interval the sign is positive.`),
    mc(3, r`Which set solves $\dfrac{x}{(x - 2)^2} \ge 0$?`, [r`$x \ge 0$`, r`$x \ge 0,\ x \ne 2$`, r`$0 \le x < 2$`, r`$x > 2$`], 1, ["A squared factor doesn't change sign."], r`The denominator is positive except at $x = 2$, where it's undefined. So the sign is the sign of $x$: $x \ge 0$ with $x \ne 2$.`, "review"),
  ],
});
