import { activity, callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "geometric-sequences",
  title: "Geometric sequences and recursive rules",
  summary: "Identify geometric sequences, write explicit and recursive rules, and connect them to exponential functions with whole-number inputs.",
  minutes: 25,
  objectives: [
    "Identify a geometric sequence and its common ratio.",
    "Write explicit and recursive rules for arithmetic and geometric sequences and translate between them.",
    "Relate geometric sequences to exponential functions and solve applied problems.",
  ],
  concepts: [
    { slug: "geometric-sequences", name: "Geometric sequences", description: "Sequences with a constant ratio between consecutive terms.", subject: "subj_math" },
    { slug: "arithmetic-sequences", name: "Arithmetic sequences", description: "Sequences with a constant difference between consecutive terms.", subject: "subj_math" },
  ],
  formulas: ["geometric-sequence", "arithmetic-sequence"],
  blocks: [
    def("Geometric sequence", r`A sequence in which each term after the first is found by multiplying the previous term by the same nonzero number $r$, the common ratio. Example: 3, 6, 12, 24, … has $r = 2$.`),
    formula(r`a_n = a_1 \cdot r^{\,n-1}`, "Explicit rule", r`Start at $a_1$ and multiply by $r$ a total of $n - 1$ times.`),
    def("Recursive rule", r`Geometric: $a_1$ given and $a_n = r \cdot a_{n-1}$. Arithmetic: $a_1$ given and $a_n = a_{n-1} + d$. A recursive rule always needs a starting term.`),
    example(r`Find the 8th term of 80, 40, 20, 10, …`, [
      [r`r = \tfrac{40}{80} = \tfrac{1}{2}`, "Divide any term by the one before."],
      [r`a_8 = 80 \cdot \left(\tfrac{1}{2}\right)^7 = \tfrac{80}{128} = 0.625`, ""],
    ]),
    example(r`A geometric sequence has $a_2 = 12$ and $a_5 = 324$. Find $a_1$ and $r$.`, [
      [r`a_5 = a_2 \cdot r^3 \Rightarrow 324 = 12r^3`, "Three steps from term 2 to term 5."],
      [r`r^3 = 27 \Rightarrow r = 3`, ""],
      [r`a_1 = 12 \div 3 = 4`, r`So $a_n = 4 \cdot 3^{n-1}$.`],
    ]),
    text(r`A geometric sequence is an exponential function restricted to whole-number inputs: $a_n = 4 \cdot 3^{n-1}$ matches $f(x) = \frac{4}{3} \cdot 3^x$ at $x = 1, 2, 3, \dots$ Its points lie on an exponential curve, just as an arithmetic sequence's points lie on a line.`),
    activity("growth-models", { title: "Arithmetic vs geometric", params: { a: 4, b: 2, d: 4, compare: true } }),
    callout("tip", "Try this", r`The dots on the exponential curve are the terms 4, 8, 16, 32, … (starting from $x = 0$). The line adds 4 each step: 4, 8, 12, 16, … They agree for two terms and then separate. Try a ratio below 1 to see a decreasing geometric sequence.`, "experiment"),
    callout("warning", "Negative and fractional ratios", r`With $r = -2$, the terms alternate signs: 3, −6, 12, −24, … With $0 < r < 1$, they shrink toward 0 but never reach it.`),
    callout("application", "Where this shows up", r`A ball rebounding to 60% of its previous height, a population growing 5% a year, and the number of people reached when each person tells 3 more all form geometric sequences.`),
  ],
  questions: [
    num(1, r`What is the common ratio of 5, −15, 45, −135, …?`, -3, {}, ["Divide a term by the previous term."], r`$-15 \div 5 = -3$.`),
    num(1, r`Find the next term of 2, 8, 32, …`, 128, {}, ["Multiply by 4."], r`$32 \cdot 4 = 128$.`),
    num(2, r`Find $a_6$ for $a_n = 3 \cdot 2^{n-1}$.`, 96, {}, [r`$3 \cdot 2^5$.`], r`$3 \cdot 32 = 96$.`),
    short(2, r`Write a recursive rule for 7, 21, 63, … in the form a_n=…a_(n-1).`, ["a_n=3a_(n-1)", "a_n=3*a_(n-1)", "an=3a(n-1)"], ["What do you multiply by each time?"], r`$a_1 = 7$ and $a_n = 3a_{n-1}$.`),
    mc(2, r`Which sequence is geometric?`, ["2, 4, 6, 8, …", "1, 4, 9, 16, …", "81, 27, 9, 3, …", "10, 7, 4, 1, …"], 2, ["Check for a constant ratio."], r`81, 27, 9, 3 has ratio $\frac{1}{3}$.`),
    num(3, r`A ball is dropped from 10 m and each bounce reaches 60% of the previous height. How high does it go after the 4th bounce? Round to the nearest hundredth.`, 1.3, { unit: "m", tolerance: 0.006 }, [r`$10 \cdot 0.6^4$.`], r`$10 \cdot 0.1296 = 1.296 \approx 1.30$ m.`),
    num(3, r`In a geometric sequence, $a_1 = 2$ and $a_4 = 54$. Find $a_7$.`, 1458, {}, [r`$r^3 = 27$, so $r = 3$.`], r`$a_7 = 2 \cdot 3^6 = 2 \cdot 729 = 1458$.`, "review"),
  ],
});
