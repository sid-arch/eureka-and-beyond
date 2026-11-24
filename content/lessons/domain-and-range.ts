import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "domain-and-range",
  title: "Domain and range",
  summary: "Find the domain and range of functions from sets, graphs, equations and real situations, and write them in interval notation.",
  minutes: 25,
  objectives: [
    "Define domain and range and find them for a set of ordered pairs or a graph.",
    "Identify domain restrictions from equations: division by zero and even roots of negatives.",
    "Choose a reasonable domain and range for a real-world situation, including discrete domains.",
  ],
  concepts: [
    { slug: "domain-range", name: "Domain and range", description: "The set of possible inputs and the set of resulting outputs of a function.", subject: "subj_math" },
    { slug: "interval-notation", name: "Interval notation", description: "Writing sets of real numbers as intervals using brackets and parentheses.", subject: "subj_math" },
  ],
  blocks: [
    def("Domain", r`The set of all allowed inputs of a function.`),
    def("Range", r`The set of all outputs the function actually produces from its domain.`),
    example(r`Find the domain and range of $\{(-2, 5), (0, 3), (1, 5), (4, -1)\}$`, [
      [r`D = \{-2, 0, 1, 4\}`, "List the x-values."],
      [r`R = \{-1, 3, 5\}`, "List the y-values; write 5 only once."],
    ]),
    text(r`From a graph, the domain is the shadow the graph casts on the $x$-axis and the range is its shadow on the $y$-axis. Arrows mean the graph keeps going; closed dots are included endpoints and open dots are excluded.`),
    activity("vertex-explorer", { title: "Range of a parabola", params: { a: 1, h: 1, k: -3 } }),
    callout("tip", "Try this", r`Every parabola $y = a(x - h)^2 + k$ has domain all real numbers. Drag the vertex and watch: when it opens up, the range is $y \ge k$; when it opens down, $y \le k$. What determines which?`, "experiment"),
    example(r`Find the domain of $f(x) = \dfrac{5}{x - 3}$ and $g(x) = \sqrt{x + 4}$`, [
      [r`x - 3 \ne 0 \Rightarrow x \ne 3`, "Division by zero is undefined."],
      [r`D_f = (-\infty, 3) \cup (3, \infty)`, "Every real number except 3."],
      [r`x + 4 \ge 0 \Rightarrow x \ge -4`, "A square root of a negative is not a real number."],
      [r`D_g = [-4, \infty),\quad R_g = [0, \infty)`, "A principal square root is never negative."],
    ]),
    example(r`A theater sells tickets at 12 dollars each and has 250 seats. Revenue is $R(n) = 12n$. Give a reasonable domain and range.`, [
      [r`D = \{0, 1, 2, \dots, 250\}`, "You can't sell a fraction of a ticket or more than 250 tickets."],
      [r`R = \{0, 12, 24, \dots, 3000\}`, "Multiples of 12 from 0 to 12 · 250."],
    ], "The domain is discrete: separate whole numbers, not an interval. Its graph is a set of dots, not a solid line."),
    callout("warning", "Range is not just the y-values you see on a grid", r`For $y = x^2$, the window might show $y$ up to 10, but the range is $[0, \infty)$. Think about what the function can produce, not what the screen happens to show.`),
    callout("application", "Where this shows up", r`Every app input has a domain: an age field shouldn't accept $-3$, and a calculator returns an error for $\sqrt{-1}$ or $1 \div 0$ because those inputs are outside the domain.`),
  ],
  questions: [
    short(1, r`What is the domain of $\{(3, 7), (-1, 2), (5, 7)\}$? List the values smallest first, separated by commas.`, ["-1,3,5"], ["The domain is the set of x-values."], r`$\{-1, 3, 5\}$.`),
    short(1, r`What is the range of $\{(3, 7), (-1, 2), (5, 7)\}$? List the values smallest first.`, ["2,7"], ["List each y-value once."], r`$\{2, 7\}$.`),
    mc(2, r`What is the domain of $f(x) = \frac{1}{x + 6}$?`, ["All real numbers", r`$x \ne 6$`, r`$x \ne -6$`, r`$x > -6$`], 2,
      ["Which input makes the denominator zero?"], r`$x + 6 = 0$ when $x = -6$, so $x \ne -6$.`),
    mc(2, r`What is the domain of $g(x) = \sqrt{2x - 8}$?`, [r`$x \ge 4$`, r`$x \ge 8$`, r`$x > 4$`, "All real numbers"], 0,
      [r`Require $2x - 8 \ge 0$.`], r`$2x \ge 8$, so $x \ge 4$: $[4, \infty)$.`),
    mc(2, r`What is the range of $y = -(x - 2)^2 + 5$?`, [r`$y \ge 5$`, r`$y \le 5$`, r`$y \le 2$`, "All real numbers"], 1,
      ["Which way does the parabola open, and where is its vertex?"], r`It opens down with vertex $(2, 5)$, so the greatest output is 5: $(-\infty, 5]$.`),
    mc(3, r`A car's gas tank holds 15 gallons and the car gets 30 miles per gallon. For $d(g) = 30g$, miles driven using $g$ gallons, what is a reasonable domain?`, [r`$g \ge 0$`, r`$0 \le g \le 15$`, r`$0 \le g \le 450$`, r`$g = 15$`], 1,
      ["How much gas can the tank hold?"], r`The car can use between 0 and 15 gallons from a full tank, so $0 \le g \le 15$. The range is $0 \le d \le 450$.`, "review"),
    short(3, r`Write the domain of $f(x) = \frac{x}{x^2 - 9}$ by listing the excluded values, smaller first, separated by a comma.`, ["-3,3"], [r`$x^2 - 9 = 0$ when $x = \pm 3$.`], r`$x \ne -3$ and $x \ne 3$.`, "review"),
  ],
});
