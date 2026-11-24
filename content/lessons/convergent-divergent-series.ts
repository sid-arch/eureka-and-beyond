import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "convergent-divergent-series",
  title: "Defining convergent and divergent infinite series",
  summary: "Define an infinite series as the limit of its partial sums, decide convergence from partial sums, and evaluate telescoping series.",
  minutes: 25,
  objectives: [
    "Write the sequence of partial sums Sₙ of a series.",
    "Define convergence: the series converges to S if Sₙ → S.",
    "Find sums of telescoping series.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Series and partial sums", r`For $\sum_{n=1}^{\infty} a_n$, the $n$th partial sum is $S_n = a_1 + a_2 + \cdots + a_n$. The series converges to $S$ if $\lim_{n \to \infty} S_n = S$; otherwise it diverges.`),
    example(r`Telescoping: $\sum_{n=1}^{\infty} \dfrac{1}{n(n + 1)}$`, [
      [r`\frac{1}{n(n + 1)} = \frac{1}{n} - \frac{1}{n + 1}`, "Partial fractions."],
      [r`S_n = 1 - \frac{1}{n + 1}`, "Middle terms cancel."],
      [r`\lim S_n = 1`, "Converges to 1."],
    ]),
    activity("series", { title: "Partial sums settle or grow", params: { series: "harmonic", n: 20 } }),
    callout("tip", "Try this", r`The harmonic series' terms shrink toward 0, yet its partial sums keep climbing (slowly, like $\ln n$). Switch to $\sum \frac{1}{n^2}$ and the sums level off.`, "experiment"),
    callout("application", "Where this shows up", r`Repeating decimals, compound-interest annuities and the total distance of a bouncing ball are infinite series; calculators evaluate $e^x$ and $\sin x$ with series.`),
  ],
  questions: [
    num(1, r`Find $S_3$ for $\sum_{n=1}^{\infty} \frac{1}{2^n}$.`, 0.875, { tolerance: 0.001 }, [], r`$\frac{1}{2} + \frac{1}{4} + \frac{1}{8}$.`),
    num(2, r`$S_n = \frac{3n}{n + 1}$ for some series. What is its sum?`, 3, {}, [], r`$\lim \frac{3n}{n + 1} = 3$.`),
    mc(2, r`$\sum_{n=1}^{\infty}\left(\frac{1}{n} - \frac{1}{n + 2}\right)$ equals…`, ["1", "1.5", "2", "diverges"], 1, [r`Write out several terms.`], r`$S_n = 1 + \frac{1}{2} - \frac{1}{n + 1} - \frac{1}{n + 2} \to 1.5$.`),
    mc(3, r`$\lim_{n \to \infty} a_n = 0$. What can you conclude about $\sum a_n$?`, ["It converges", "It diverges", "Nothing yet", "Its sum is 0"], 2, [], r`The harmonic series shows terms → 0 doesn't guarantee convergence.`, "review"),
  ],
});
