import { activity, callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "arithmetic-sequences",
  title: "Arithmetic sequences as functions",
  summary: "Recognize arithmetic sequences, write explicit and recursive rules, find any term, and connect sequences to linear functions with whole-number domains.",
  minutes: 25,
  objectives: [
    "Identify an arithmetic sequence and its common difference.",
    "Write explicit and recursive rules and use them to find terms.",
    "Explain an arithmetic sequence as a linear function whose domain is the positive integers.",
  ],
  concepts: [
    { slug: "arithmetic-sequences", name: "Arithmetic sequences", description: "Sequences with a constant difference between consecutive terms.", subject: "subj_math" },
  ],
  formulas: ["arithmetic-sequence"],
  blocks: [
    def("Arithmetic sequence", r`A list of numbers in which each term after the first is found by adding the same number $d$, the common difference. Example: 5, 9, 13, 17, … has $d = 4$.`),
    formula(r`a_n = a_1 + (n - 1)d`, "Explicit rule", r`The nth term: start at $a_1$ and add $d$ a total of $n - 1$ times.`),
    def("Recursive rule", r`Gives the first term and how to get each term from the one before: $a_1 = 5$, $a_n = a_{n-1} + 4$. Good for describing the process; slow for finding the 100th term.`),
    example(r`Find the 40th term of 7, 4, 1, −2, …`, [
      [r`d = 4 - 7 = -3`, "Subtract any term from the next one."],
      [r`a_{40} = 7 + (40 - 1)(-3)`, "Use the explicit rule."],
      [r`= 7 - 117 = -110`, ""],
    ]),
    example(r`An arithmetic sequence has $a_3 = 14$ and $a_8 = 39$. Find the rule.`, [
      [r`a_8 - a_3 = 5d = 25 \Rightarrow d = 5`, "Five steps take you from term 3 to term 8."],
      [r`a_1 = a_3 - 2d = 14 - 10 = 4`, "Step back two terms."],
      [r`a_n = 4 + (n - 1)5 = 5n - 1`, ""],
    ], r`Check: $a_8 = 40 - 1 = 39$. ✓`),
    text(r`Plot the points $(n, a_n)$ and they lie on a line with slope $d$. The rule $a_n = 5n - 1$ is the linear function $f(n) = 5n - 1$, restricted to the inputs $n = 1, 2, 3, \dots$. That's why the graph is a row of dots rather than a solid line.`),
    activity("linear-graph", { title: "A sequence on a line", params: { m: 2, b: 1 } }),
    callout("tip", "Try this", r`The line $y = 2x + 1$ passes through the terms of 3, 5, 7, 9, … at $x = 1, 2, 3, 4$. Which slider is the common difference? What would $a_0$ be, and where is it on the graph?`, "experiment"),
    callout("warning", "Off by one", r`The 10th term is the first term plus 9 steps, not 10. That's why the formula has $n - 1$. Many people write $a_n = a_1 + nd$ by mistake.`),
    callout("application", "Where this shows up", r`Stadium seating (each row has 2 more seats), a savings jar with a fixed weekly deposit, and a taxi meter's charges all form arithmetic sequences.`),
  ],
  questions: [
    num(1, r`What is the common difference of 12, 9, 6, 3, …?`, -3, {}, ["Subtract a term from the next one."], r`$9 - 12 = -3$.`),
    num(1, r`Find the next term of 2.5, 4, 5.5, 7, …`, 8.5, {}, ["The common difference is 1.5."], r`$7 + 1.5 = 8.5$.`),
    num(2, r`Find $a_{25}$ for $a_n = 3 + (n - 1)6$.`, 147, {}, ["Substitute n = 25."], r`$3 + 24 \cdot 6 = 147$.`),
    short(2, r`Write an explicit rule for 8, 13, 18, 23, … in the form a_n=…n+…`, ["a_n=5n+3", "an=5n+3", "a_n=3+5n"], [r`$a_n = 8 + (n - 1)5$.`, "Simplify."], r`$a_n = 8 + 5n - 5 = 5n + 3$.`),
    mc(2, r`Which sequence is arithmetic?`, ["1, 2, 4, 8, …", "3, 6, 9, 15, …", "−4, −1, 2, 5, …", "1, 4, 9, 16, …"], 2,
      ["Check that the differences are all equal."], r`$-4, -1, 2, 5$ has a constant difference of 3.`),
    num(2, r`Stadium rows: row 1 has 22 seats and each row has 3 more than the one before. How many seats are in row 15?`, 64, {}, [r`$a_{15} = 22 + 14 \cdot 3$.`], r`$22 + 42 = 64$ seats.`),
    num(3, r`In an arithmetic sequence, $a_4 = 10$ and $a_{10} = -8$. Find $a_1$.`, 19, {}, ["Six steps from term 4 to term 10.", r`$6d = -18$.`], r`$d = -3$ and $a_1 = a_4 - 3d = 10 + 9 = 19$.`, "review"),
    num(3, r`Which term of 5, 12, 19, 26, … equals 201?`, 29, {}, [r`Solve $5 + (n - 1)7 = 201$.`], r`$(n - 1)7 = 196$, so $n - 1 = 28$ and $n = 29$.`, "review"),
  ],
});
