import { activity, callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "alternating-series-test",
  title: "Alternating series test for convergence",
  summary: "Show that alternating series converge when their terms decrease in size to 0, and see why the partial sums zigzag toward the sum.",
  minutes: 25,
  objectives: [
    "State the alternating series test and check both conditions.",
    "Explain the zigzag of partial sums.",
    "Recognize when the test doesn't apply.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Alternating series test", r`$\sum (-1)^{n+1}b_n$ with $b_n > 0$ converges if (1) $b_{n+1} \le b_n$ (eventually decreasing) and (2) $\lim b_n = 0$.`),
    example(r`Alternating harmonic series $1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots$`, [
      [r`b_n = \tfrac{1}{n} \text{ decreases and } \to 0`, ""],
      [r`\text{converges (to } \ln 2 \approx 0.693)`, "Even though Σ1/n diverges."],
    ]),
    activity("series", { title: "Zigzagging partial sums", params: { series: "alternating", n: 20 } }),
    callout("tip", "Try this", r`Each partial sum overshoots, then undershoots, the green line by less each time. The sum is always trapped between consecutive partial sums.`, "experiment"),
    callout("warning", "Check both conditions", r`$\sum (-1)^n \frac{n}{n + 1}$ alternates, but $b_n \to 1$, so it diverges (nth term test).`),
    callout("application", "Where this shows up", r`Many series for π and logarithms alternate; their slow zigzag explains why some of them need thousands of terms for a few digits.`),
  ],
  questions: [
    mc(1, r`$\sum (-1)^{n} \frac{1}{\sqrt{n}}$…`, ["converges by the alternating series test", "diverges", "diverges by the nth term test", "is not alternating"], 0, [], r`$\frac{1}{\sqrt{n}}$ decreases to 0.`),
    mc(2, r`$\sum (-1)^n \frac{n^2}{n^2 + 1}$…`, ["converges", "diverges"], 1, [], r`Terms don't approach 0.`),
    mc(2, r`Which condition might fail for $b_n = \frac{2 + (-1)^n}{n}$?`, ["b_n > 0", "b_n → 0", "b_n decreasing", "None"], 2, [], r`$b_n$ goes $\frac{1}{1}, \frac{3}{2}, \frac{1}{3}, \frac{3}{4}, \ldots$: not decreasing.`),
    mc(3, r`If an alternating series satisfies the test, its sum $S$ lies…`, ["above every partial sum", "between any two consecutive partial sums", "below every partial sum", "at S₁"], 1, [], r`The partial sums alternate around $S$.`, "review"),
  ],
});
