import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "inverse-function-derivatives",
  title: "Differentiating inverse functions",
  summary: "Find the derivative of an inverse function at a point with (f⁻¹)′(a) = 1/f′(f⁻¹(a)), using equations, tables and graphs.",
  minutes: 25,
  objectives: [
    "Explain why the slope of an inverse is the reciprocal of the original slope at the reflected point.",
    "Compute (f⁻¹)′(a) without finding a formula for f⁻¹.",
    "Use the result with tables of values.",
  ],
  concepts: [
    { slug: "inverse-functions", name: "Inverse functions", description: "Functions that undo each other: f⁻¹(f(x)) = x.", subject: "subj_math" },
    { slug: "derivatives", name: "Derivatives", description: "The instantaneous rate of change of a function; the slope of its tangent line.", subject: "subj_math" },
  ],
  formulas: ["inverse-derivatives"],
  blocks: [
    def("Derivative of an inverse", r`If $f$ is differentiable and one-to-one with $f'(f^{-1}(a)) \ne 0$, then $(f^{-1})'(a) = \frac{1}{f'(f^{-1}(a))}$. Reflecting across $y = x$ swaps rise and run, so slopes become reciprocals.`),
    example(r`$f(x) = x^3 + x$. Find $(f^{-1})'(2)$.`, [
      [r`f(1) = 2 \Rightarrow f^{-1}(2) = 1`, "Find the matching input."],
      [r`f'(x) = 3x^2 + 1,\ f'(1) = 4`, ""],
      [r`(f^{-1})'(2) = \tfrac{1}{4}`, "No formula for f⁻¹ needed."],
    ]),
    example(r`Derivative of $\ln x$ from $e^x$`, [
      [r`y = \ln x \iff e^y = x`, ""],
      [r`e^y y' = 1 \Rightarrow y' = \frac{1}{e^y} = \frac{1}{x}`, ""],
    ]),
    callout("warning", "Evaluate at the right point", r`Use $f'$ at $f^{-1}(a)$, not at $a$. In the example, $f'(2) = 13$ would give the wrong answer.`),
    callout("application", "Where this shows up", r`If a thermometer's reading is a known function of temperature, the inverse converts readings back to temperature, and its derivative tells how sensitive that conversion is.`),
  ],
  questions: [
    num(1, r`$f(2) = 5$ and $f'(2) = 4$. Find $(f^{-1})'(5)$.`, 0.25, { tolerance: 0.001 }, [], r`$\frac{1}{f'(2)} = \frac{1}{4}$.`),
    num(2, r`$f(x) = 2x + \sin x$. Find $(f^{-1})'(0)$.`, 0.333, { tolerance: 0.001 }, [r`$f(0) = 0$.`], r`$f'(0) = 2 + \cos 0 = 3$, so $\frac{1}{3}$.`),
    num(2, r`$f(x) = e^{x} + x$. Find $(f^{-1})'(1)$.`, 0.5, { tolerance: 0.001 }, [r`$f(0) = 1$.`], r`$f'(0) = e^0 + 1 = 2$.`),
    mc(3, r`The graph of $f$ passes through $(1, 3)$ with slope 6 there. The graph of $f^{-1}$…`, ["passes through (1, 3) with slope 6", "passes through (3, 1) with slope 1/6", "passes through (3, 1) with slope 6", "passes through (1, 3) with slope 1/6"], 1, [], r`Swap coordinates; take the reciprocal slope.`, "review"),
  ],
});
