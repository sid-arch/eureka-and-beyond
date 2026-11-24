import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "absolute-value-equations-inequalities",
  title: "Absolute value equations and inequalities",
  summary: "Solve |ax + b| = c and |ax + b| < c or > c by reading absolute value as distance, and handle cases with no solution.",
  minutes: 30,
  objectives: [
    "Interpret |x − a| as the distance between x and a on the number line.",
    "Solve absolute value equations by splitting into two linear equations, and check for extraneous cases.",
    "Solve absolute value inequalities as 'and' (less than) or 'or' (greater than) compound inequalities.",
  ],
  concepts: [
    { slug: "absolute-value", name: "Absolute value", description: "The distance of a number from zero on the number line.", subject: "subj_math" },
    { slug: "compound-inequalities", name: "Compound inequalities", description: "Two inequalities joined by 'and' or 'or'.", subject: "subj_math" },
  ],
  blocks: [
    text(r`$|x|$ is the distance from $x$ to 0, and more generally $|x - a|$ is the distance between $x$ and $a$. So $|x - 3| = 5$ asks, "Which numbers are 5 units from 3?" There are two: 8 and $-2$.`),
    def("Absolute value equation", r`For $c \ge 0$, $|A| = c$ means $A = c$ or $A = -c$. For $c < 0$, $|A| = c$ has no solution, because a distance can't be negative.`),
    example(r`Solve $|2x - 5| = 9$`, [
      [r`2x - 5 = 9 \quad \text{or} \quad 2x - 5 = -9`, "The quantity inside is 9 units from 0."],
      [r`2x = 14 \quad \text{or} \quad 2x = -4`, ""],
      [r`x = 7 \quad \text{or} \quad x = -2`, ""],
    ], r`Check: $|14 - 5| = 9$ ✓ and $|-4 - 5| = 9$ ✓.`),
    example(r`Solve $3|x + 1| - 4 = 11$`, [
      [r`3|x + 1| = 15 \Rightarrow |x + 1| = 5`, "Isolate the absolute value first."],
      [r`x + 1 = 5 \quad \text{or} \quad x + 1 = -5`, ""],
      [r`x = 4 \quad \text{or} \quad x = -6`, ""],
    ]),
    callout("warning", "Isolate before splitting", r`In $3|x + 1| - 4 = 11$, writing $3(x + 1) - 4 = \pm 11$ is wrong. Get the absolute value alone first. And if it equals a negative number, as in $|x + 1| = -2$, stop: there's no solution.`),
    def("Absolute value inequalities", r`For $c > 0$: $|A| < c$ means $-c < A < c$ (within $c$ of 0: an "and"). $|A| > c$ means $A < -c$ or $A > c$ (farther than $c$ from 0: an "or"). The same holds with $\le$ and $\ge$.`),
    example(r`Solve $|x - 4| \le 3$`, [
      [r`-3 \le x - 4 \le 3`, "Within 3 units of 4."],
      [r`1 \le x \le 7`, "Add 4 to every part."],
    ], "The solution is the interval [1, 7], centered at 4 with radius 3."),
    activity("inequality-line", { title: "Graph |x − 4| ≤ 3 as an 'and'", params: { rel: "≥", c: 1, mode: "and", rel2: "≤", c2: 7 } }),
    example(r`Solve $|2x + 1| > 7$`, [
      [r`2x + 1 < -7 \quad \text{or} \quad 2x + 1 > 7`, "Farther than 7 from 0."],
      [r`x < -4 \quad \text{or} \quad x > 3`, ""],
    ]),
    callout("tip", "Try this", r`Change the simulation to show $|2x + 1| > 7$: use "Or" with $x < -4$ and $x > 3$. Then test $x = 0$ in $|2x + 1|$ by hand: is it more than 7?`, "experiment"),
    callout("note", "Special cases", r`$|A| < -2$ has no solution. $|A| > -2$ is true for every real number, because an absolute value is always at least 0.`),
    callout("application", "Where this shows up", r`Manufacturing tolerance: a bolt must be 25 mm long within 0.2 mm, so $|L - 25| \le 0.2$, which means $24.8 \le L \le 25.2$. Polls report a margin of error in the same form.`),
  ],
  questions: [
    short(1, r`Solve $|x| = 6$. Enter both solutions separated by a comma, smaller first.`, ["-6,6"], ["Which numbers are 6 units from 0?"], r`$x = -6$ or $x = 6$.`),
    short(2, r`Solve $|x + 2| = 5$. Enter both solutions, smaller first.`, ["-7,3"], [r`$x + 2 = 5$ or $x + 2 = -5$.`], r`$x = 3$ or $x = -7$.`),
    short(2, r`Solve $2|x - 1| + 3 = 13$. Enter both solutions, smaller first.`, ["-4,6"], [r`Isolate: $|x - 1| = 5$.`], r`$x - 1 = \pm 5$, so $x = 6$ or $x = -4$.`),
    mc(2, r`How many solutions does $|3x - 7| + 5 = 2$ have?`, ["0", "1", "2", "Infinitely many"], 0,
      ["Isolate the absolute value."], r`$|3x - 7| = -3$ is impossible because absolute values are never negative. No solution.`),
    short(2, r`Solve $|x - 5| < 2$. Write it like a<x<b.`, ["3<x<7"], ["Within 2 units of 5."], r`$-2 < x - 5 < 2$, so $3 < x < 7$.`),
    mc(2, r`Solve $|x + 3| \ge 4$.`, [r`$-7 \le x \le 1$`, r`$x \le -7$ or $x \ge 1$`, r`$x \le -1$ or $x \ge 7$`, r`$x \ge 1$`], 1,
      ["Greater than means 'or'."], r`$x + 3 \le -4$ or $x + 3 \ge 4$, so $x \le -7$ or $x \ge 1$.`),
    mc(3, r`Which inequality describes all numbers within 0.5 of 12?`, [r`$|x - 0.5| \le 12$`, r`$|x - 12| \le 0.5$`, r`$|x + 12| \le 0.5$`, r`$|x - 12| \ge 0.5$`], 1,
      [r`$|x - a|$ is the distance from x to a.`], r`The distance from $x$ to 12 is at most 0.5: $|x - 12| \le 0.5$.`, "review"),
    short(3, r`Solve $|4 - 2x| \le 10$. Write it like a<=x<=b.`, ["-3<=x<=7", "-3≤x≤7"], ["−10 ≤ 4 − 2x ≤ 10.", "Subtract 4, divide by −2, reverse."], r`$-14 \le -2x \le 6$, so $7 \ge x \ge -3$: $-3 \le x \le 7$.`, "review"),
  ],
});
