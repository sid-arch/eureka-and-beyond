import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "nth-term-test",
  title: "The nth term test for divergence",
  summary: "Use the nth term test to show a series diverges when its terms don't approach 0, and understand why the test can never prove convergence.",
  minutes: 20,
  objectives: [
    "State the nth term test.",
    "Apply it to show divergence.",
    "Explain why lim aₙ = 0 is inconclusive.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("nth term test", r`If $\lim_{n \to \infty} a_n \ne 0$ (or the limit doesn't exist), then $\sum a_n$ diverges. If $\lim a_n = 0$, the test says nothing.`),
    example(r`$\sum_{n=1}^{\infty} \dfrac{2n}{3n + 1}$`, [
      [r`\lim \frac{2n}{3n + 1} = \tfrac{2}{3} \ne 0`, ""],
      [r`\text{diverges by the nth term test}`, "Adding terms near 2/3 forever grows without bound."],
    ]),
    example(r`$\sum (-1)^n$`, [
      [r`\lim (-1)^n \text{ does not exist}`, "Diverges."],
    ]),
    callout("warning", "One direction only", r`The test can show divergence but never convergence. $\frac{1}{n} \to 0$, yet $\sum \frac{1}{n}$ diverges.`),
    callout("application", "Where this shows up", r`A quick first check before any harder test: if the pieces you're adding don't shrink to nothing, the total can't settle down.`),
  ],
  questions: [
    mc(1, r`$\sum_{n=1}^{\infty} \frac{n^2}{n^2 + 5}$…`, ["converges", "diverges by the nth term test", "the test is inconclusive", "converges to 1"], 1, [], r`Terms approach 1.`),
    mc(2, r`$\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}}$: what does the nth term test say?`, ["Converges", "Diverges", "Inconclusive", "Sum is 0"], 2, [], r`Terms → 0. (It's a divergent p-series, shown by another test.)`),
    mc(2, r`$\sum_{n=1}^{\infty} \cos\frac{1}{n}$…`, ["converges", "diverges, since cos(1/n) → 1", "is inconclusive", "converges to 0"], 1, [], r`$\cos 0 = 1$.`),
    mc(3, r`$\sum a_n$ converges. Which must be true?`, [r`$a_n \to 0$`, r`$a_n$ is decreasing`, r`$a_n > 0$`, r`$\sum |a_n|$ converges`], 0, [], r`This is the contrapositive of the nth term test.`, "review"),
  ],
});
