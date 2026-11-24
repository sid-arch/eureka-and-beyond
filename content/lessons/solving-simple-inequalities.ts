import { activity, callout, def, example, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "solving-simple-inequalities",
  title: "Solving one-step and two-step inequalities",
  summary: "Solve inequalities with inverse operations, reverse the symbol when multiplying or dividing by a negative, and graph the solution set.",
  minutes: 25,
  objectives: [
    "Solve one- and two-step inequalities using inverse operations.",
    "Explain why multiplying or dividing both sides by a negative number reverses the inequality.",
    "Graph solution sets and interpret them in context, including whole-number answers.",
  ],
  concepts: [
    { slug: "solving-inequalities", name: "Solving inequalities", description: "Finding all values that make an inequality true.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Solving an inequality works almost exactly like solving an equation. You can add or subtract the same number on both sides, and you can multiply or divide both sides by the same positive number, and the inequality stays true.`),
    def("The one difference", r`When you multiply or divide both sides by a negative number, reverse the inequality symbol: $<$ becomes $>$, and $\le$ becomes $\ge$.`),
    text(r`Why? Start with a true statement, $2 < 5$. Multiply both sides by $-1$: you get $-2$ and $-5$. On the number line, $-2$ is to the right of $-5$, so $-2 > -5$. Multiplying by a negative reflects numbers across 0, which reverses their order.`),
    example(r`Solve $x - 8 \ge -3$`, [
      [r`x \ge -3 + 8`, "Add 8 to both sides."],
      [r`x \ge 5`, "Closed circle at 5, shade right."],
    ]),
    example(r`Solve $-4x < 20$`, [
      [r`\frac{-4x}{-4} > \frac{20}{-4}`, "Divide by −4 and reverse the symbol."],
      [r`x > -5`, ""],
    ], r`Check with a value that should work, $x = 0$: $-4(0) = 0 < 20$. ✓ Check one that shouldn't, $x = -6$: $24 < 20$ is false. ✓`),
    example(r`Solve $7 - \tfrac{x}{3} \le 9$`, [
      [r`-\tfrac{x}{3} \le 2`, "Subtract 7 from both sides."],
      [r`x \ge -6`, "Multiply by −3 and reverse the symbol."],
    ]),
    activity("inequality-line", { title: "Graph the solution x ≥ −6", params: { rel: "≥", c: -6, mode: "single" } }),
    callout("tip", "Try this", r`Move the test value to $-6$, then to $-7$, and substitute each into $7 - \frac{x}{3} \le 9$ yourself. Do your answers match the ✓ and ✗ marks?`, "experiment"),
    example(r`A phone plan costs 25 dollars plus 3 dollars per gigabyte. How many whole gigabytes can you use and keep the bill at most 50 dollars?`, [
      [r`25 + 3g \le 50`, "Write the inequality."],
      [r`3g \le 25 \Rightarrow g \le 8.\overline{3}`, ""],
      [r`g \le 8`, "Only whole gigabytes are billed, so the most is 8."],
    ], r`Check: $25 + 3(8) = 49 \le 50$ but $25 + 3(9) = 52 > 50$.`),
    callout("warning", "Reverse only for negative multipliers", r`In $-3 + x > 4$ the $-3$ is added, not multiplied, so no reversal: $x > 7$. And in $2x > -10$ you divide by positive 2, so $x > -5$, even though $-10$ is negative.`),
    callout("application", "Where this shows up", r`Budgets ("spend no more than"), grades ("what score do I need on the final?") and safety limits are naturally inequalities.`),
  ],
  questions: [
    short(1, r`Solve $x + 6 < 2$. Write the answer like x<…`, ["x<-4"], ["Subtract 6 from both sides."], r`$x < -4$.`),
    short(1, r`Solve $5x \ge 35$.`, ["x>=7", "x≥7"], ["Divide by a positive 5; no reversal."], r`$x \ge 7$.`),
    short(2, r`Solve $-3x > 12$.`, ["x<-4"], ["Divide by −3 and reverse the symbol."], r`$x < -4$.`),
    short(2, r`Solve $\frac{x}{-2} \le 5$.`, ["x>=-10", "x≥-10"], ["Multiply by −2 and reverse."], r`$x \ge -10$.`),
    short(2, r`Solve $4x - 9 > 11$.`, ["x>5"], ["Add 9, then divide by 4."], r`$4x > 20$, so $x > 5$.`),
    short(2, r`Solve $10 - 2x \ge 16$.`, ["x<=-3", "x≤-3"], ["Subtract 10: −2x ≥ 6.", "Divide by −2 and reverse."], r`$-2x \ge 6$, so $x \le -3$.`),
    mc(3, r`Sam has 40 dollars and wants to buy a 12-dollar shirt and some 7-dollar books. What is the greatest number of books he can buy?`, ["3", "4", "5", "6"], 1,
      [r`$12 + 7b \le 40$.`], r`$7b \le 28$, so $b \le 4$. He can buy at most 4 books.`),
    mc(3, r`Which graph matches the solution of $-5x + 1 < 16$?`, ["Open circle at −3, shading right", "Open circle at −3, shading left", "Closed circle at −3, shading right", "Open circle at 3, shading left"], 0,
      ["Subtract 1, then divide by −5 and reverse."], r`$-5x < 15$ gives $x > -3$: an open circle at $-3$ with shading to the right.`, "review"),
  ],
});
