import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "p-series-harmonic",
  title: "Harmonic series and p-series",
  summary: "Know that the p-series Σ1/nᵖ converges exactly when p > 1, that the harmonic series diverges, and use p-series as benchmarks.",
  minutes: 25,
  objectives: [
    "State the p-series test.",
    "Explain why the harmonic series diverges.",
    "Rewrite series to recognize p-series.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("p-series", r`$\sum_{n=1}^{\infty} \frac{1}{n^p}$ converges if $p > 1$ and diverges if $p \le 1$ (by the integral test with $\int_1^\infty x^{-p}\,dx$). The case $p = 1$ is the harmonic series.`),
    example(r`Why $1 + \tfrac{1}{2} + \tfrac{1}{3} + \cdots$ diverges (grouping argument)`, [
      [r`\tfrac{1}{3} + \tfrac{1}{4} > \tfrac{1}{2}`, ""],
      [r`\tfrac{1}{5} + \cdots + \tfrac{1}{8} > \tfrac{1}{2}`, "Four terms, each at least 1/8."],
      [r`\text{infinitely many groups, each above } \tfrac{1}{2}`, "So the sum is unbounded."],
    ]),
    example(r`Recognize p-series`, [
      [r`\sum \frac{1}{n\sqrt{n}} = \sum \frac{1}{n^{1.5}}`, "p = 1.5: converges."],
      [r`\sum \frac{1}{\sqrt[3]{n}}`, "p = 1/3: diverges."],
    ]),
    activity("series", { title: "p = 1 versus p = 2", params: { series: "p2", n: 30 } }),
    callout("application", "Where this shows up", r`Stacking blocks so they overhang a table edge uses the harmonic series: since it diverges, the overhang can in principle be as large as you like.`),
  ],
  questions: [
    mc(1, r`$\sum \frac{1}{n^{0.99}}$…`, ["converges", "diverges"], 1, [], r`$p = 0.99 \le 1$.`),
    mc(2, r`$\sum \frac{5}{n^3}$…`, ["converges", "diverges"], 0, [], r`5 times a p-series with $p = 3$.`),
    num(2, r`Find $S_5$ for the harmonic series, to three decimal places.`, 2.283, { tolerance: 0.001 }, [], r`$1 + 0.5 + 0.333 + 0.25 + 0.2 = 2.283$.`),
    mc(3, r`For which values of $p$ does $\sum \frac{1}{n^{2p}}$ converge?`, ["p > 1", "p > ½", "p ≥ ½", "all p > 0"], 1, [], r`Need $2p > 1$.`, "review"),
  ],
});
