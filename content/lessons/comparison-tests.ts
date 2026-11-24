import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "comparison-tests",
  title: "Comparison tests for convergence",
  summary: "Decide convergence of positive-term series by comparing them with known series, using the direct comparison and limit comparison tests.",
  minutes: 30,
  objectives: [
    "Apply the direct comparison test with an inequality in the right direction.",
    "Apply the limit comparison test with a well-chosen benchmark.",
    "Choose benchmarks from geometric and p-series by dominant terms.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Direct comparison", r`For $0 \le a_n \le b_n$: if $\sum b_n$ converges, so does $\sum a_n$; if $\sum a_n$ diverges, so does $\sum b_n$. (Smaller than convergent converges; bigger than divergent diverges.)`),
    def("Limit comparison", r`For $a_n, b_n > 0$, if $\lim \frac{a_n}{b_n} = L$ with $0 < L < \infty$, then both series converge or both diverge.`),
    example(r`$\sum \dfrac{1}{n^2 + 5}$`, [
      [r`\frac{1}{n^2 + 5} < \frac{1}{n^2}`, ""],
      [r`\sum \tfrac{1}{n^2} \text{ converges} \Rightarrow \text{converges}`, "Direct comparison."],
    ]),
    example(r`$\sum \dfrac{3n + 1}{n^3 - 2}$`, [
      [r`\text{dominant terms: } \tfrac{3n}{n^3} \sim \tfrac{1}{n^2}`, "Choose b_n = 1/n²."],
      [r`\lim \frac{(3n + 1)/(n^3 - 2)}{1/n^2} = 3`, "Finite and positive."],
      [r`\text{converges}`, "Limit comparison with a p-series, p = 2."],
    ]),
    callout("warning", "Inequalities that prove nothing", r`Showing $\frac{1}{n^2 - 5} > \frac{1}{n^2}$ (bigger than a convergent series) proves nothing. Use limit comparison instead.`),
    callout("application", "Where this shows up", r`Engineers bound complicated error sums by simpler geometric ones to guarantee that an algorithm's total error stays finite.`),
  ],
  questions: [
    mc(1, r`$\sum \frac{1}{2^n + 3}$ converges by comparison with…`, [r`$\sum \frac{1}{n}$`, r`$\sum \frac{1}{2^n}$`, r`$\sum \frac{1}{3}$`, r`$\sum 2^n$`], 1, [], r`Smaller than a convergent geometric series.`),
    mc(2, r`$\sum \frac{1}{\sqrt{n} - 0.5}$…`, ["converges", "diverges"], 1, [r`Compare with $\frac{1}{\sqrt{n}}$.`], r`Bigger than a divergent p-series ($p = \frac{1}{2}$).`),
    mc(2, r`For $\sum \frac{n^2 + 1}{n^4 + n}$, the best benchmark is…`, [r`$\frac{1}{n}$`, r`$\frac{1}{n^2}$`, r`$\frac{1}{n^4}$`, r`$\frac{1}{2^n}$`], 1, [], r`Dominant terms $\frac{n^2}{n^4}$. The series converges.`),
    mc(3, r`Limit comparison gives $L = 0$ with a divergent $\sum b_n$. Conclusion?`, ["Converges", "Diverges", "Inconclusive", "Sum is 0"], 2, [], r`The test needs $0 < L < \infty$.`, "review"),
  ],
});
