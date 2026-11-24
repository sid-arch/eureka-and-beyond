import { callout, def, example, lesson, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "arithmetic-series",
  title: "Arithmetic sequences and series",
  summary: "Review arithmetic sequences and find the sum of an arithmetic series with Gauss's pairing method.",
  minutes: 25,
  objectives: [
    "Write explicit and recursive rules for arithmetic sequences.",
    "Derive and use S_n = n(a₁ + aₙ)/2.",
    "Solve problems about totals that grow by a constant amount.",
  ],
  concepts: [
    { slug: "arithmetic-sequences", name: "Arithmetic sequences", description: "Sequences with a constant difference between consecutive terms.", subject: "subj_math" },
    { slug: "series", name: "Series", description: "The sum of the terms of a sequence.", subject: "subj_math" },
  ],
  formulas: ["arithmetic-sequence", "series-sums"],
  blocks: [
    def("Series", r`A series is the sum of the terms of a sequence. $S_n$ is the sum of the first $n$ terms.`),
    text(r`Legend says young Gauss summed 1 to 100 instantly. Write the sum forwards and backwards and add: each column is $1 + 100 = 101$, and there are 100 columns, so twice the sum is $100 \cdot 101$, and the sum is 5050. The same pairing works for any arithmetic series.`),
    def("Arithmetic series sum", r`$S_n = \dfrac{n(a_1 + a_n)}{2}$: the number of terms times the average of the first and last terms. With $a_n = a_1 + (n - 1)d$, also $S_n = \frac{n}{2}[2a_1 + (n - 1)d]$.`),
    example(r`Find the sum of the first 40 terms of 7, 11, 15, …`, [
      [r`a_{40} = 7 + 39 \cdot 4 = 163`, ""],
      [r`S_{40} = \tfrac{40(7 + 163)}{2} = 3400`, ""],
    ]),
    example(r`A theater has 25 rows. Row 1 has 20 seats and each row has 2 more. How many seats in all?`, [
      [r`a_{25} = 20 + 24 \cdot 2 = 68`, ""],
      [r`S_{25} = \tfrac{25(20 + 68)}{2} = 1100`, ""],
    ]),
    callout("application", "Where this shows up", r`Stacked objects (cans in a pyramid display), savings plans with steadily increasing deposits, and the distance a car travels while accelerating evenly second by second.`),
  ],
  questions: [
    num(1, r`Find $1 + 2 + 3 + \cdots + 50$.`, 1275, {}, [], r`$\frac{50 \cdot 51}{2} = 1275$.`),
    num(2, r`Find the sum of the first 20 terms of 3, 8, 13, …`, 1010, {}, [r`$a_{20} = 98$.`], r`$\frac{20(3 + 98)}{2} = 1010$.`),
    num(2, r`Find the sum of the odd numbers from 1 to 99.`, 2500, {}, ["50 terms."], r`$\frac{50(1 + 99)}{2} = 2500$.`),
    num(3, r`An arithmetic series has $a_1 = 4$, $d = 3$ and $S_n = 175$. Find $n$.`, 10, {}, [r`$\frac{n}{2}[8 + 3(n - 1)] = 175$.`], r`$3n^2 + 5n - 350 = 0$, $n = 10$.`, "review"),
  ],
});
