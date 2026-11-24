import { callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "geometric-series",
  title: "Geometric sequences and series",
  summary: "Find terms of geometric sequences and derive and use the formula for the sum of a finite geometric series, including loan and savings problems.",
  minutes: 30,
  objectives: [
    "Write rules for geometric sequences.",
    "Derive S_n = a₁(1 − rⁿ)/(1 − r) by multiplying and subtracting.",
    "Apply geometric series to savings, loans and repeated doubling.",
  ],
  concepts: [
    { slug: "geometric-sequences", name: "Geometric sequences", description: "Sequences with a constant ratio between consecutive terms.", subject: "subj_math" },
    { slug: "series", name: "Series", description: "The sum of the terms of a sequence.", subject: "subj_math" },
  ],
  formulas: ["geometric-sequence", "series-sums"],
  blocks: [
    text(r`Write $S_n = a_1 + a_1 r + \cdots + a_1 r^{n-1}$, then multiply by $r$: $rS_n = a_1 r + \cdots + a_1 r^n$. Subtracting, almost everything cancels: $S_n - rS_n = a_1 - a_1 r^n$. So for $r \ne 1$:`),
    def("Geometric series sum", r`$S_n = a_1 \dfrac{1 - r^n}{1 - r}$.`),
    example(r`Find $3 + 6 + 12 + \cdots$ to 10 terms`, [
      [r`S_{10} = 3 \cdot \frac{1 - 2^{10}}{1 - 2} = 3 \cdot 1023 = 3069`, ""],
    ]),
    example(r`You save 100 dollars the first month and 5% more each month after. How much in total after 12 months?`, [
      [r`S_{12} = 100 \cdot \frac{1 - 1.05^{12}}{1 - 1.05}`, ""],
      [r`\approx 100 \cdot 15.917 \approx 1591.71`, ""],
    ]),
    callout("application", "Where this shows up", r`Loan payment formulas, annuities, the total number of ancestors over generations and chain-letter growth all sum geometric series.`),
  ],
  questions: [
    num(1, r`Find the 6th term of 2, 6, 18, …`, 486, {}, [r`$2 \cdot 3^5$.`], r`486.`),
    num(2, r`Find $1 + 2 + 4 + \cdots + 512$.`, 1023, {}, ["10 terms, r = 2."], r`$\frac{1 - 2^{10}}{1 - 2} = 1023$.`),
    num(2, r`Find the sum of the first 5 terms of 81, 27, 9, …`, 121, {}, [r`$r = \frac{1}{3}$.`], r`$81 + 27 + 9 + 3 + 1 = 121$.`),
    num(3, r`A gift of 1 cent on day 1, doubling each day: what is the total after 20 days, in dollars?`, 10485.75, { tolerance: 0.01, unit: "dollars" }, [r`$0.01(2^{20} - 1)$.`], r`$0.01 \cdot 1{,}048{,}575 = 10{,}485.75$ dollars.`, "review"),
  ],
});
