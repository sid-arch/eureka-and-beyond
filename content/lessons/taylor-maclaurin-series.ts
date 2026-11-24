import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "taylor-maclaurin-series",
  title: "Finding Taylor or Maclaurin series for a function",
  summary: "Know the Maclaurin series for eˣ, sin x, cos x and 1/(1 − x), and build new series from them by substitution, multiplication and differentiation.",
  minutes: 30,
  objectives: [
    "Recall the four core Maclaurin series and their intervals of convergence.",
    "Build new series by substitution (e.g. e^(−x²)) and multiplication.",
    "Find Taylor series about a center other than 0.",
  ],
  concepts: [
    { slug: "taylor-series", name: "Taylor polynomials and series", description: "Polynomials and series built from a function's derivatives at a point, used to approximate it.", subject: "subj_math" },
  ],
  formulas: ["taylor-series"],
  blocks: [
    def("Core series", r`$e^x = \sum \frac{x^n}{n!}$, $\sin x = \sum \frac{(-1)^n x^{2n+1}}{(2n + 1)!}$, $\cos x = \sum \frac{(-1)^n x^{2n}}{(2n)!}$ (all for every $x$); $\frac{1}{1 - x} = \sum x^n$ for $|x| < 1$.`),
    example(r`Series for $e^{-x^2}$`, [
      [r`e^u = 1 + u + \tfrac{u^2}{2!} + \cdots,\ u = -x^2`, ""],
      [r`e^{-x^2} = 1 - x^2 + \tfrac{x^4}{2} - \tfrac{x^6}{6} + \cdots`, "Substitute; no new derivatives needed."],
    ]),
    example(r`Series for $x\sin x$`, [
      [r`x\left(x - \tfrac{x^3}{6} + \tfrac{x^5}{120} - \cdots\right)`, ""],
      [r`= x^2 - \tfrac{x^4}{6} + \tfrac{x^6}{120} - \cdots`, ""],
    ]),
    activity("taylor", { title: "sin x from its Maclaurin series", params: { fn: "sin", n: 7, x: 3 } }),
    callout("application", "Where this shows up", r`$\int e^{-x^2}\,dx$, central to probability, has no elementary antiderivative, but integrating its series term by term computes it to any accuracy.`),
  ],
  questions: [
    mc(1, r`The Maclaurin series for $\cos x$ begins…`, [r`$x - \frac{x^3}{6} + \cdots$`, r`$1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots$`, r`$1 + x + \frac{x^2}{2} + \cdots$`, r`$1 + x^2 + x^4 + \cdots$`], 1, [], r`Even powers, alternating signs.`),
    num(2, r`Find the coefficient of $x^4$ in the Maclaurin series for $e^{-x^2}$.`, 0.5, { tolerance: 0.001 }, [], r`$\frac{(-x^2)^2}{2!} = \frac{x^4}{2}$.`),
    mc(2, r`The Maclaurin series for $\frac{1}{1 + x^2}$ is…`, [r`$1 - x^2 + x^4 - \cdots$`, r`$1 + x^2 + x^4 + \cdots$`, r`$1 - x + x^2 - \cdots$`, r`$x - \frac{x^3}{3} + \cdots$`], 0, [], r`Substitute $-x^2$ into $\frac{1}{1 - u}$.`),
    num(3, r`The Taylor series of $f$ about 2 has $(x - 2)^3$ coefficient $-\frac{1}{4}$. Find $f'''(2)$.`, -1.5, { tolerance: 0.001 }, [], r`$\frac{f'''(2)}{3!} = -\frac{1}{4}$.`, "review"),
  ],
});
