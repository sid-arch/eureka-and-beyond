import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-linear-inequalities",
  title: "Solving linear inequalities",
  summary: "Solve multi-step linear inequalities, including variables on both sides, write solutions in set and interval notation, and recognize when every or no real number works.",
  minutes: 25,
  objectives: [
    "Solve multi-step inequalities, reversing the symbol when multiplying or dividing by a negative.",
    "Write solution sets with inequality, set-builder and interval notation, and graph them.",
    "Identify inequalities whose solution set is all real numbers or the empty set.",
  ],
  concepts: [
    { slug: "solving-inequalities", name: "Solving inequalities", description: "Finding all values that make an inequality true.", subject: "subj_math" },
    { slug: "interval-notation", name: "Interval notation", description: "Writing sets of real numbers as intervals using brackets and parentheses.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Multi-step inequalities are solved with the same moves as multi-step equations: distribute, combine like terms, collect variables on one side and isolate. The one extra rule is that multiplying or dividing both sides by a negative number reverses the inequality.`),
    def("Interval notation", r`A bracket $[\ ]$ includes an endpoint and a parenthesis $(\ )$ excludes it. Infinity always gets a parenthesis. $x \ge 3$ is $[3, \infty)$, $x < -1$ is $(-\infty, -1)$, and $-2 < x \le 5$ is $(-2, 5]$.`),
    example(r`Solve $5 - 3(x + 4) \ge 2x + 8$`, [
      [r`5 - 3x - 12 \ge 2x + 8`, "Distribute −3."],
      [r`-3x - 7 \ge 2x + 8`, "Combine like terms."],
      [r`-5x \ge 15`, "Subtract 2x and add 7 on both sides."],
      [r`x \le -3`, "Divide by −5 and reverse the symbol."],
    ], r`Interval: $(-\infty, -3]$. Test $x = -4$: $5 - 3(0) = 5$ and $2(-4) + 8 = 0$, and $5 \ge 0$ ✓. Test $x = 0$: $-7 \ge 8$ is false ✓.`),
    callout("tip", "Avoid reversing", r`You can often avoid dividing by a negative by collecting the variable on the side where its coefficient stays positive. In the example, adding $3x$ to both sides gives $-7 \ge 5x + 8$, then $-15 \ge 5x$, so $-3 \ge x$, which is the same answer.`),
    activity("inequality-line", { title: "Graph x ≤ −3", params: { rel: "≤", c: -3, mode: "single" } }),
    callout("tip", "Try this", r`Set the test value to $-3$, $-2.5$ and $-6$, and check each in the original inequality $5 - 3(x + 4) \ge 2x + 8$ by hand.`, "experiment"),
    example(r`Solve $2(x - 3) < 2x + 1$`, [
      [r`2x - 6 < 2x + 1`, ""],
      [r`-6 < 1`, "Subtracting 2x removes the variable entirely."],
      [r`\text{always true}`, "Every real number is a solution: (−∞, ∞)."],
    ]),
    example(r`Solve $4x + 3 > 4(x + 1)$`, [
      [r`4x + 3 > 4x + 4`, ""],
      [r`3 > 4`, "False, no matter what x is."],
      [r`\varnothing`, "No solution: the empty set."],
    ]),
    callout("warning", "Interval notation reads left to right", r`Write the smaller number first: $x > 4$ is $(4, \infty)$, not $(\infty, 4)$. And never put a bracket next to $\infty$, because infinity is not a number you can include.`),
    callout("application", "Where this shows up", r`"A rental van costs 40 dollars plus 0.25 dollars per mile; a truck costs 55 dollars plus 0.15 per mile. When is the truck cheaper?" $55 + 0.15m < 40 + 0.25m$ gives $m > 150$: for trips over 150 miles.`),
  ],
  questions: [
    short(1, r`Solve $3x - 4 > 11$.`, ["x>5"], ["Add 4, then divide by 3."], r`$3x > 15$, $x > 5$.`),
    short(2, r`Solve $-2(x + 1) \le 8$.`, ["x>=-5", "x≥-5"], ["Distribute or divide by −2 first.", "Remember to reverse the symbol."], r`$-2x - 2 \le 8$, $-2x \le 10$, $x \ge -5$.`),
    short(2, r`Solve $7 - x > 3x + 15$.`, ["x<-2"], ["Collect x on one side: 7 − 15 > 4x."], r`$-8 > 4x$, so $x < -2$.`),
    mc(2, r`Which interval notation represents $x \ge -4$?`, [r`$(-4, \infty)$`, r`$[-4, \infty)$`, r`$(-\infty, -4]$`, r`$[-4, \infty]$`], 1,
      ["Is −4 included?", "Infinity always gets a parenthesis."], r`$[-4, \infty)$.`),
    mc(2, r`Solve $3(x - 2) \ge 3x - 6$.`, ["x ≥ 0", "No solution", "All real numbers", "x ≥ 2"], 2,
      ["Distribute and simplify."], r`$3x - 6 \ge 3x - 6$ gives $0 \ge 0$, which is always true, so every real number is a solution.`),
    short(3, r`Solve $\frac{x}{4} - 1 < \frac{x}{2} + 2$.`, ["x>-12"], ["Multiply every term by 4 to clear fractions.", "x − 4 < 2x + 8."], r`$x - 4 < 2x + 8$ gives $-12 < x$, so $x > -12$.`),
    mc(3, r`Plan A costs 20 dollars per month plus 0.10 dollars per text. Plan B costs 35 dollars per month with unlimited texts. For how many texts is Plan B cheaper?`, ["More than 150", "Fewer than 150", "More than 350", "Exactly 150"], 0,
      [r`$35 < 20 + 0.10t$.`], r`$15 < 0.10t$, so $t > 150$ texts.`, "review"),
  ],
});
