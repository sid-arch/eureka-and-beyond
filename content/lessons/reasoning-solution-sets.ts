import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "reasoning-solution-sets",
  title: "Reasoning about solution sets",
  summary: "Analyze equations and inequalities with parameters, decide when they have one, none or infinitely many solutions, and describe solution sets precisely in set-builder and interval notation.",
  minutes: 30,
  objectives: [
    "Classify linear equations as having one solution, no solution, or infinitely many solutions, including equations with parameters.",
    "Find parameter values that produce a given number of solutions.",
    "Describe solution sets with set-builder notation, interval notation and unions or intersections.",
  ],
  concepts: [
    { slug: "solution-sets", name: "Solution sets", description: "The set of all values that make an equation or inequality true.", subject: "subj_math" },
    { slug: "interval-notation", name: "Interval notation", description: "Writing sets of real numbers as intervals using brackets and parentheses.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Every linear equation in one variable can be rearranged to the form $ax = b$. Then there are exactly three possibilities: if $a \ne 0$, there's one solution $x = \frac{b}{a}$; if $a = 0$ and $b = 0$, the equation is $0 = 0$ and every real number works; if $a = 0$ and $b \ne 0$, it's a false statement with no solution.`),
    def("Set-builder notation", r`$\{x \mid x > 3\}$ reads "the set of all $x$ such that $x > 3$." The empty set is $\varnothing$, and all real numbers is $\mathbb{R}$ or $(-\infty, \infty)$.`),
    example(r`For which values of $k$ does $kx + 4 = 3x + 4$ have exactly one solution?`, [
      [r`kx - 3x = 0 \Rightarrow (k - 3)x = 0`, "Collect x-terms and factor."],
      [r`k \ne 3: x = 0`, "One solution."],
      [r`k = 3: 0 = 0`, "Every real number is a solution."],
    ], "So exactly one solution for every k except 3. No value of k gives no solution here."),
    example(r`Find $a$ and $b$ so that $2(x + a) = bx - 6$ has infinitely many solutions`, [
      [r`2x + 2a = bx - 6`, ""],
      [r`b = 2 \text{ and } 2a = -6`, "The x-coefficients and the constants must both match."],
      [r`a = -3,\ b = 2`, ""],
    ]),
    example(r`Describe the solution set of $|x - 1| \ge 4$ in three ways`, [
      [r`x \le -3 \text{ or } x \ge 5`, "Inequality notation."],
      [r`\{x \mid x \le -3 \text{ or } x \ge 5\}`, "Set-builder notation."],
      [r`(-\infty, -3] \cup [5, \infty)`, "Interval notation."],
    ]),
    activity("inequality-line", { title: "Union of two rays", params: { rel: "≤", c: -3, mode: "or", rel2: "≥", c2: 5 } }),
    callout("tip", "Try this", r`Switch to "And." With these boundaries the solution set is empty. Change the boundaries so "and" gives a single point. Which relations make that possible?`, "experiment"),
    callout("warning", "Solving can create or lose solutions", r`Multiplying both sides by an expression that might be 0, or dividing by one, can change the solution set. That's why you check solutions and track restrictions.`),
    callout("application", "Where this shows up", r`Engineers specify tolerances as solution sets, programmers write input validation as unions and intersections of intervals, and the "no solution / infinitely many" analysis returns in systems of equations and matrices.`),
  ],
  questions: [
    mc(1, r`How many solutions does $5(x - 2) = 5x - 10$ have?`, ["None", "One", "Infinitely many", "Two"], 2, ["Simplify both sides."], r`Both sides are $5x - 10$, so every real number works.`),
    mc(2, r`How many solutions does $4x + 7 = 2(2x + 3)$ have?`, ["None", "One", "Infinitely many", "Two"], 0, ["Simplify the right side."], r`$4x + 7 = 4x + 6$ gives $7 = 6$, which is false: no solution.`),
    short(2, r`For what value of $k$ does $kx - 5 = 2x + 1$ have no solution?`, ["2", "k=2"], ["Collect x-terms: (k − 2)x = 6."], r`If $k = 2$, the equation becomes $0 = 6$, which has no solution.`),
    short(3, r`Find $c$ so that $3(x - 2) + c = 3x + 4$ has infinitely many solutions.`, ["10", "c=10"], [r`$3x - 6 + c = 3x + 4$.`], r`$-6 + c = 4$, so $c = 10$.`),
    mc(2, r`Which is the interval notation for $\{x \mid -2 < x \le 7\}$?`, [r`$[-2, 7)$`, r`$(-2, 7]$`, r`$(-2, 7)$`, r`$[-2, 7]$`], 1, ["Which endpoint is included?"], r`$(-2, 7]$.`),
    mc(3, r`What is the solution set of $x > 4$ and $x < 4$?`, [r`$\{4\}$`, r`$\varnothing$`, r`$\mathbb{R}$`, r`$(-\infty, 4) \cup (4, \infty)$`], 1, ["Can a number be both greater and less than 4?"], r`No number satisfies both, so the set is empty. (With "or," the answer would be every real number except 4.)`, "review"),
    short(3, r`For which value of $m$ does $mx + 3 \ge mx + 1$ hold? Answer "all" if it holds for every real m, or give the value.`, ["all"], [r`Subtract $mx$ from both sides.`], r`It reduces to $3 \ge 1$, which is always true, for every $m$ and every $x$.`, "review"),
  ],
});
