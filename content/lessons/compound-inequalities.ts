import { activity, callout, def, example, lesson, mc, short } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "compound-inequalities",
  title: "Compound inequalities",
  summary: "Solve and graph 'and' and 'or' inequalities, including three-part inequalities, and describe their solutions as intersections and unions.",
  minutes: 25,
  objectives: [
    "Distinguish between 'and' (intersection) and 'or' (union) compound inequalities.",
    "Solve three-part inequalities by applying each step to all three parts.",
    "Graph compound inequalities and write them in interval notation, recognizing empty and all-real solution sets.",
  ],
  concepts: [
    { slug: "compound-inequalities", name: "Compound inequalities", description: "Two inequalities joined by 'and' or 'or'.", subject: "subj_math" },
    { slug: "interval-notation", name: "Interval notation", description: "Writing sets of real numbers as intervals using brackets and parentheses.", subject: "subj_math" },
  ],
  blocks: [
    def("And (intersection)", r`A value is a solution of "$A$ and $B$" if it satisfies both. On the number line, keep only the overlap. $x > -2$ and $x \le 3$ is often written as one three-part inequality, $-2 < x \le 3$, or $(-2, 3]$.`),
    def("Or (union)", r`A value is a solution of "$A$ or $B$" if it satisfies at least one. Keep everything either inequality shades. $x < -1$ or $x \ge 4$ is $(-\infty, -1) \cup [4, \infty)$.`),
    activity("inequality-line", { title: "And versus or", params: { rel: ">", c: -2, mode: "and", rel2: "≤", c2: 3 } }),
    callout("tip", "Try this", r`Switch the type between "And" and "Or" without changing the boundaries. Then make the first statement $x > 4$ and the second $x < 1$. What happens to the "and" solution, and why?`, "experiment"),
    example(r`Solve $-7 \le 2x - 3 < 5$`, [
      [r`-4 \le 2x < 8`, "Add 3 to all three parts."],
      [r`-2 \le x < 4`, "Divide all three parts by 2."],
    ], r`Interval: $[-2, 4)$. Check $x = -2$: $2(-2) - 3 = -7$, and $-7 \le -7$ ✓. Check $x = 4$: $5 < 5$ is false, so 4 is excluded ✓.`),
    example(r`Solve $1 < 5 - 2x \le 9$`, [
      [r`-4 < -2x \le 4`, "Subtract 5 from every part."],
      [r`2 > x \ge -2`, "Divide every part by −2 and reverse both symbols."],
      [r`-2 \le x < 2`, "Rewrite with the smaller number on the left: [−2, 2)."],
    ]),
    example(r`Solve $3x + 1 < -8$ or $4 - x \le 1$`, [
      [r`3x < -9 \Rightarrow x < -3`, "Solve the first inequality."],
      [r`-x \le -3 \Rightarrow x \ge 3`, "Solve the second (reverse when dividing by −1)."],
      [r`(-\infty, -3) \cup [3, \infty)`, "Union of the two rays."],
    ]),
    callout("warning", "Empty and full solution sets", r`"$x < 1$ and $x > 4$" has no solution: no number is both. "$x > 1$ or $x < 4$" includes every real number. A three-part inequality like $5 < x < 2$ is never true, so don't write one.`),
    callout("application", "Where this shows up", r`Healthy ranges are "and" statements: a normal body temperature is about $36.1 \le T \le 37.2$ °C. Warnings are often "or" statements: a sensor alarms if the pressure is below 20 or above 35.`),
  ],
  questions: [
    short(1, r`Solve $-3 < x + 4 < 6$. Write it like a<x<b.`, ["-7<x<2"], ["Subtract 4 from all three parts."], r`$-7 < x < 2$.`),
    short(2, r`Solve $-6 \le 3x \le 12$.`, ["-2<=x<=4", "-2≤x≤4"], ["Divide every part by 3."], r`$-2 \le x \le 4$.`),
    short(2, r`Solve $-5 < 1 - 2x < 7$.`, ["-3<x<3"], ["Subtract 1: −6 < −2x < 6.", "Divide by −2 and reverse both symbols."], r`$3 > x > -3$, which is $-3 < x < 3$.`),
    mc(2, r`Which is the solution of $x - 2 < -5$ or $2x \ge 8$?`, [r`$-3 < x \le 4$`, r`$x < -3$ or $x \ge 4$`, r`$x < -7$ or $x \ge 4$`, r`No solution`], 1,
      ["Solve each inequality separately."], r`$x < -3$ or $x \ge 4$.`),
    mc(2, r`What is the solution of $x \ge 5$ and $x < 2$?`, [r`$2 < x \le 5$`, "All real numbers", "No solution", r`$x < 2$`], 2,
      ["Can a number be at least 5 and less than 2?"], r`No number satisfies both, so the solution set is empty.`),
    mc(2, r`Which interval represents $-1 < x \le 6$?`, [r`$[-1, 6)$`, r`$(-1, 6]$`, r`$(-1, 6)$`, r`$[-1, 6]$`], 1,
      ["Which endpoint is included?"], r`$-1$ is excluded (parenthesis) and 6 is included (bracket): $(-1, 6]$.`),
    short(3, r`A thermostat keeps a room between 68°F and 74°F inclusive. Write a compound inequality for the temperature t, like a<=t<=b.`, ["68<=t<=74", "68≤t≤74"], ["Inclusive means the endpoints are allowed."], r`$68 \le t \le 74$.`, "review"),
    short(3, r`Solve $\frac{x + 1}{3} \le 2$ and $x - 4 > -9$. Write it like a<x<=b.`, ["-5<x<=5"], ["First: x + 1 ≤ 6.", "Second: x > −5."], r`$x \le 5$ and $x > -5$: $-5 < x \le 5$.`, "review"),
  ],
});
