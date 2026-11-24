import { callout, def, example, lesson, num, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "sigma-notation",
  title: "Sigma notation",
  summary: "Read and write sums with Σ notation, evaluate them, and use properties of sums and the series formulas.",
  minutes: 25,
  objectives: [
    "Read the index, limits and expression in Σ notation.",
    "Write a series in Σ notation.",
    "Evaluate sums by listing terms or using series formulas.",
  ],
  concepts: [
    { slug: "series", name: "Series", description: "The sum of the terms of a sequence.", subject: "subj_math" },
  ],
  formulas: ["series-sums"],
  blocks: [
    def("Sigma notation", r`$\displaystyle\sum_{k=1}^{n} a_k = a_1 + a_2 + \cdots + a_n$. The index $k$ starts at the lower limit and goes up by 1 to the upper limit.`),
    example(r`Evaluate $\displaystyle\sum_{k=1}^{5} (2k + 1)$`, [
      [r`3 + 5 + 7 + 9 + 11`, ""],
      [r`35`, r`Or: arithmetic with 5 terms, $\frac{5(3 + 11)}{2} = 35$.`],
    ]),
    example(r`Write $4 + 8 + 16 + \cdots + 1024$ in sigma notation`, [
      [r`4 = 2^2,\ 1024 = 2^{10}`, ""],
      [r`\sum_{k=2}^{10} 2^k`, r`Or equivalently $\sum_{k=1}^{9} 4 \cdot 2^{k-1}$.`],
    ]),
    def("Properties", r`$\sum (a_k + b_k) = \sum a_k + \sum b_k$, $\sum c\,a_k = c\sum a_k$, and $\sum_{k=1}^{n} c = cn$. Also $\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}$.`),
    callout("application", "Where this shows up", r`Statistics formulas (the mean is $\frac{1}{n}\sum x_i$), spreadsheet SUM functions, and the integrals of calculus all use sigma notation.`),
  ],
  questions: [
    num(1, r`Evaluate $\sum_{k=1}^{4} k^2$.`, 30, {}, [], r`$1 + 4 + 9 + 16 = 30$.`),
    num(2, r`Evaluate $\sum_{k=1}^{100} 3$.`, 300, {}, [], r`300.`),
    num(2, r`Evaluate $\sum_{k=1}^{20} (4k - 1)$.`, 820, {}, [r`$4 \cdot 210 - 20$.`], r`$840 - 20 = 820$.`),
    short(3, r`Write $5 + 10 + 15 + \cdots + 100$ in sigma notation, using k from 1. Use the format sum_(k=1)^20 5k.`, ["sum_(k=1)^205k", "sum_(k=1)^(20)5k"], ["How many terms?"], r`$\sum_{k=1}^{20} 5k$ (sum 1050).`, "review"),
  ],
});
