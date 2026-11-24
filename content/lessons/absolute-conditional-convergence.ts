import { callout, def, example, lesson, mc } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "absolute-conditional-convergence",
  title: "Determining absolute or conditional convergence",
  summary: "Classify convergent series as absolutely convergent (Σ|aₙ| converges) or conditionally convergent, and know that absolute convergence implies convergence.",
  minutes: 25,
  objectives: [
    "Test Σ|aₙ| first; if it converges, Σaₙ converges absolutely.",
    "If Σ|aₙ| diverges but Σaₙ converges, the convergence is conditional.",
    "Choose tests in a sensible order.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  blocks: [
    def("Definitions", r`$\sum a_n$ converges absolutely if $\sum |a_n|$ converges; then $\sum a_n$ also converges. It converges conditionally if $\sum a_n$ converges but $\sum |a_n|$ diverges.`),
    example(r`Classify three series`, [
      [r`\sum \frac{(-1)^n}{n^2}:\ \sum \frac{1}{n^2} \text{ converges}`, "Absolutely convergent."],
      [r`\sum \frac{(-1)^n}{n}:\ \sum \frac{1}{n} \text{ diverges; AST converges}`, "Conditionally convergent."],
      [r`\sum (-1)^n:\ \text{terms don't} \to 0`, "Divergent."],
    ]),
    callout("note", "Why it matters", r`Rearranging the terms of an absolutely convergent series doesn't change its sum. A conditionally convergent series can be rearranged to add up to any number you like (Riemann's rearrangement theorem).`),
    callout("application", "Where this shows up", r`Numerical software prefers absolutely convergent series because adding terms in any order (or in parallel) gives the same answer.`),
  ],
  questions: [
    mc(1, r`$\sum \frac{(-1)^n}{3^n}$ is…`, ["absolutely convergent", "conditionally convergent", "divergent"], 0, [], r`$\sum \frac{1}{3^n}$ converges.`),
    mc(2, r`$\sum \frac{(-1)^n}{\sqrt{n}}$ is…`, ["absolutely convergent", "conditionally convergent", "divergent"], 1, [], r`$\sum \frac{1}{\sqrt{n}}$ diverges; the AST gives convergence.`),
    mc(2, r`$\sum \frac{\sin n}{n^2}$ is…`, ["absolutely convergent", "conditionally convergent", "divergent"], 0, [r`$\left|\frac{\sin n}{n^2}\right| \le \frac{1}{n^2}$.`], r`Comparison on the absolute values.`),
    mc(3, r`If $\sum |a_n|$ diverges, then $\sum a_n$…`, ["diverges", "converges conditionally", "could converge or diverge", "converges absolutely"], 2, [], r`Compare $\sum \frac{(-1)^n}{n}$ and $\sum \frac{1}{n}$.`, "review"),
  ],
});
