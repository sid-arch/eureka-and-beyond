import { callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "piecewise-step-functions",
  title: "Piecewise and step functions",
  summary: "Evaluate, graph and write piecewise-defined functions, including absolute value as a piecewise function and step functions such as the floor function and postage rates.",
  minutes: 30,
  objectives: [
    "Evaluate a piecewise function by choosing the correct rule for each input.",
    "Graph piecewise functions with correct open and closed endpoints.",
    "Write piecewise and step functions that model real situations.",
  ],
  concepts: [
    { slug: "piecewise-functions", name: "Piecewise functions", description: "Functions defined by different rules on different parts of their domain.", subject: "subj_math" },
  ],
  blocks: [
    def("Piecewise function", r`A function that uses different rules on different intervals of its domain, for example $f(x) = \begin{cases} x + 2, & x < 1 \\ 4 - x, & x \ge 1 \end{cases}$. The intervals must not overlap, so each input still has exactly one output.`),
    example(r`Evaluate $f(-3)$, $f(1)$ and $f(5)$ for the function above`, [
      [r`f(-3) = -3 + 2 = -1`, "−3 < 1: use the first rule."],
      [r`f(1) = 4 - 1 = 3`, "1 ≥ 1: use the second rule."],
      [r`f(5) = 4 - 5 = -1`, ""],
    ]),
    text(r`To graph, draw each rule only over its own interval. At a boundary, use a closed dot if the endpoint belongs to that piece and an open dot if it does not. Here the first piece approaches $(1, 3)$ with an open dot, and the second piece starts at $(1, 3)$ with a closed dot. The two pieces happen to meet, so the graph has no break.`),
    callout("note", "Absolute value is piecewise", r`$|x| = \begin{cases} -x, & x < 0 \\ x, & x \ge 0 \end{cases}$. That explains its V shape: two rays with slopes $-1$ and $1$.`),
    def("Step function", r`A piecewise function that is constant on each interval, so its graph looks like stairs. The greatest-integer (floor) function $\lfloor x \rfloor$ gives the greatest integer less than or equal to $x$: $\lfloor 3.7 \rfloor = 3$, $\lfloor -1.2 \rfloor = -2$.`),
    example(r`Parking costs 4 dollars for the first hour or less, plus 3 dollars for each additional hour or part of an hour, up to 16 dollars a day`, [
      [r`0 < t \le 1: C = 4`, ""],
      [r`1 < t \le 2: C = 7,\quad 2 < t \le 3: C = 10`, "Each new partial hour adds 3 dollars."],
      [r`C(2.25) = 10`, "2 hours 15 minutes is in the third hour."],
      [r`3 < t \le 4: C = 13;\quad t > 4: C = 16`, "The 5th hour brings the charge to 16 dollars, the daily maximum, so it never goes higher."],
    ], "On a graph, each step has an open dot on the left and a closed dot on the right."),
    callout("warning", "Check the boundary", r`Most errors happen exactly at the boundary. For $x = 1$ above, read the conditions carefully: $x < 1$ excludes 1, and $x \ge 1$ includes it.`),
    callout("application", "Where this shows up", r`Tax brackets, shipping rates, phone plans with data caps, and overtime pay (regular rate up to 40 hours, 1.5 times after) are all piecewise functions.`),
  ],
  questions: [
    num(1, r`For $g(x) = \begin{cases} 2x, & x \le 3 \\ x + 10, & x > 3 \end{cases}$, find $g(3)$.`, 6, {}, ["3 ≤ 3, so use the first rule."], r`$g(3) = 2(3) = 6$.`),
    num(1, r`For the same $g$, find $g(4)$.`, 14, {}, ["4 > 3."], r`$g(4) = 4 + 10 = 14$.`),
    num(2, r`Evaluate $\lfloor -2.5 \rfloor$.`, -3, {}, ["The greatest integer less than or equal to −2.5."], r`On the number line, the integers below $-2.5$ are $-3, -4, \dots$; the greatest is $-3$.`),
    mc(2, r`For $h(x) = \begin{cases} x^2, & x < 0 \\ 5, & 0 \le x < 2 \\ 7 - x, & x \ge 2 \end{cases}$, what is $h(2)$?`, ["4", "5", "7", "9"], 1, ["Which interval contains 2?"], r`$2 \ge 2$, so $h(2) = 7 - 2 = 5$. (It happens to match the middle piece's value, but the third rule applies.)`),
    num(2, r`A worker earns 18 dollars per hour for the first 40 hours and 27 dollars per hour after that. What does she earn for 46 hours?`, 882, { unit: "dollars" }, [r`$40 \cdot 18 + 6 \cdot 27$.`], r`$720 + 162 = 882$ dollars.`),
    num(3, r`Using the parking rates in the lesson, how much does it cost to park for 3 hours 40 minutes?`, 13, { unit: "dollars" }, ["3 hours 40 minutes is in the 4th hour."], r`$4 + 3 \cdot 3 = 13$ dollars.`, "review"),
    short(3, r`Write $f(x) = |x - 2|$ as a piecewise function. Enter the rule for $x < 2$ in the form y=….`, ["y=2-x", "y=-x+2", "y=-(x-2)"], ["For x < 2, x − 2 is negative."], r`For $x < 2$, $|x - 2| = -(x - 2) = 2 - x$; for $x \ge 2$, it is $x - 2$.`, "review"),
  ],
});
