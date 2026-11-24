import { callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "integral-test",
  title: "Integral test for convergence",
  summary: "Compare a series with positive decreasing terms to an improper integral: both converge or both diverge.",
  minutes: 25,
  objectives: [
    "Check the hypotheses: f continuous, positive and decreasing for x ≥ some N.",
    "Evaluate the improper integral to decide convergence.",
    "Bound the remainder with an integral.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Integral test", r`If $a_n = f(n)$ where $f$ is continuous, positive and decreasing for $x \ge 1$, then $\sum_{n=1}^{\infty} a_n$ and $\int_1^\infty f(x)\,dx$ both converge or both diverge. The sum and the integral are usually not equal.`),
    example(r`$\sum_{n=2}^{\infty} \dfrac{1}{n\ln n}$`, [
      [r`f(x) = \tfrac{1}{x\ln x} \text{ is positive and decreasing for } x \ge 2`, ""],
      [r`\int_2^\infty \frac{dx}{x\ln x} = \lim_{b \to \infty} \ln(\ln b) - \ln(\ln 2) = \infty`, "u = ln x."],
      [r`\text{the series diverges}`, ""],
    ]),
    def("Remainder estimate", r`If the test applies, the error after $n$ terms satisfies $\int_{n+1}^\infty f(x)\,dx \le S - S_n \le \int_n^\infty f(x)\,dx$.`),
    callout("application", "Where this shows up", r`Computer scientists bound sums like $\sum \frac{1}{k}$ (the cost of some algorithms) by integrals, which is how $\ln n$ appears in running times.`),
  ],
  questions: [
    mc(1, r`Which hypothesis is NOT required for the integral test?`, ["f is positive", "f is decreasing", "f is continuous", "f(n) is an integer"], 3, [], r`Only positivity, continuity and decrease.`),
    mc(2, r`Using the integral test, $\sum_{n=1}^{\infty} \frac{n}{e^{n^2}}$…`, ["converges", "diverges", "is inconclusive", "sums to 1/2"], 0, [r`$\int_1^\infty xe^{-x^2}\,dx = \frac{1}{2e}$.`], r`The integral converges, so the series converges (its sum isn't $\frac{1}{2e}$).`),
    num(2, r`Bound the error $S - S_{10}$ for $\sum \frac{1}{n^2}$ from above using $\int_{10}^\infty \frac{dx}{x^2}$.`, 0.1, { tolerance: 0.001 }, [], r`$\frac{1}{10}$.`),
    mc(3, r`$\int_1^\infty \frac{dx}{x^2} = 1$. Then $\sum_{n=1}^{\infty} \frac{1}{n^2}$…`, ["equals 1", "converges, but not necessarily to 1", "diverges", "equals 2"], 1, [], r`It converges, to $\frac{\pi^2}{6} \approx 1.645$.`, "review"),
  ],
});
