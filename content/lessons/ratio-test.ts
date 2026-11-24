import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "ratio-test",
  title: "Ratio test for convergence",
  summary: "Use the ratio test, L = lim |aₙ₊₁/aₙ|, to decide convergence for series with factorials and exponentials, and know when it's inconclusive.",
  minutes: 25,
  objectives: [
    "Compute L = lim |aₙ₊₁ / aₙ|.",
    "Conclude: L < 1 converges absolutely; L > 1 diverges; L = 1 inconclusive.",
    "Simplify ratios with factorials and powers.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Ratio test", r`Let $L = \lim_{n \to \infty}\left|\frac{a_{n+1}}{a_n}\right|$. If $L < 1$, $\sum a_n$ converges absolutely; if $L > 1$ (or $\infty$), it diverges; if $L = 1$, the test is inconclusive.`),
    example(r`$\sum_{n=1}^{\infty} \dfrac{2^n}{n!}$`, [
      [r`\frac{2^{n+1}/(n + 1)!}{2^n/n!} = \frac{2}{n + 1}`, r`Using $(n + 1)! = (n + 1)\,n!$.`],
      [r`L = 0 < 1 \Rightarrow \text{converges}`, r`Its sum is $e^2 - 1$.`],
    ]),
    example(r`$\sum \dfrac{n}{3^n}$`, [
      [r`\frac{n + 1}{3^{n+1}}\cdot\frac{3^n}{n} = \frac{n + 1}{3n} \to \tfrac{1}{3}`, "Converges."],
    ]),
    callout("warning", "L = 1 tells you nothing", r`Both $\sum \frac{1}{n}$ (divergent) and $\sum \frac{1}{n^2}$ (convergent) give $L = 1$. Use another test for p-series-like terms.`),
    callout("application", "Where this shows up", r`The ratio test finds the radius of convergence of power series, telling where formulas like the series for $e^x$ or $\ln(1 + x)$ are valid.`),
  ],
  questions: [
    num(1, r`Find $L$ for $\sum \frac{5^n}{6^n}$.`, 0.833, { tolerance: 0.001 }, [], r`$\frac{5}{6}$: converges.`),
    mc(2, r`$\sum \frac{n!}{10^n}$…`, ["converges", "diverges", "inconclusive"], 1, [], r`Ratio $\frac{n + 1}{10} \to \infty$.`),
    mc(2, r`For which series is the ratio test inconclusive?`, [r`$\sum \frac{3^n}{n!}$`, r`$\sum \frac{1}{n^3}$`, r`$\sum \frac{n}{2^n}$`, r`$\sum \frac{4^n}{n}$`], 1, [], r`p-series give $L = 1$.`),
    num(3, r`Find $L$ for $\sum \frac{n^2}{2^n}$.`, 0.5, { tolerance: 0.001 }, [], r`$\frac{(n + 1)^2}{2n^2} \to \frac{1}{2}$.`, "review"),
  ],
});
