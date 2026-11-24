import { activity, callout, def, example, lesson, mc, num } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "alternating-error-bound",
  title: "Alternating series error bound",
  summary: "Bound the error in approximating an alternating series by a partial sum: it is at most the size of the first omitted term.",
  minutes: 25,
  objectives: [
    "State the alternating series error bound |S − Sₙ| ≤ bₙ₊₁.",
    "Find how many terms guarantee a given accuracy.",
    "Tell whether Sₙ overestimates or underestimates S.",
  ],
  concepts: [
    { slug: "infinite-series", name: "Infinite series", description: "Sums of infinitely many terms, defined as limits of partial sums.", subject: "subj_math" },
  ],
  formulas: ["series-error-bounds"],
  blocks: [
    def("Error bound", r`If $\sum (-1)^{n+1}b_n$ satisfies the alternating series test, then $|S - S_n| \le b_{n+1}$. The error has the same sign as the first omitted term.`),
    example(r`Approximate $\ln 2 = 1 - \tfrac{1}{2} + \tfrac{1}{3} - \tfrac{1}{4} + \cdots$ with $S_4$`, [
      [r`S_4 = \tfrac{7}{12} \approx 0.583`, ""],
      [r`|\ln 2 - S_4| \le b_5 = \tfrac{1}{5} = 0.2`, "Actual error ≈ 0.110."],
      [r`\text{first omitted term is } +\tfrac{1}{5} \Rightarrow S_4 \text{ underestimates}`, ""],
    ]),
    example(r`How many terms of $\sum \frac{(-1)^{n+1}}{n^2}$ guarantee error below 0.01?`, [
      [r`b_{n+1} = \frac{1}{(n + 1)^2} < 0.01 \Rightarrow n + 1 > 10`, ""],
      [r`n = 10 \text{ terms}`, ""],
    ]),
    activity("series", { title: "Watch the error shrink", params: { series: "alternating", n: 8 } }),
    callout("application", "Where this shows up", r`Calculators decide when to stop adding series terms with error bounds like this one, guaranteeing the digits they display are correct.`),
  ],
  questions: [
    num(1, r`Bound the error of $S_3$ for $\sum \frac{(-1)^{n+1}}{n^2}$.`, 0.0625, { tolerance: 0.0001 }, [], r`$b_4 = \frac{1}{16}$.`),
    num(2, r`How many terms of $\sum \frac{(-1)^{n+1}}{n}$ guarantee error at most 0.001?`, 999, {}, [r`Need $\frac{1}{n + 1} \le 0.001$.`], r`$n + 1 \ge 1000$, so 999 terms.`),
    mc(2, r`For $\sum \frac{(-1)^{n+1}}{n!}$, $S_3$ compared with the sum is…`, ["an overestimate", "an underestimate", "exact", "can't tell"], 0, [r`The first omitted term is $-\frac{1}{4!}$.`], r`A negative omitted term means $S_3$ is too high.`),
    mc(3, r`Why can't you use this bound for $\sum \frac{1}{n^2}$?`, ["Its terms don't approach 0", "It isn't alternating", "It diverges", "It's geometric"], 1, [], r`Use an integral bound instead.`, "review"),
  ],
});
