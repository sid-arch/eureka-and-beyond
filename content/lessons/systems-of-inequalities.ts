import { activity, callout, def, example, lesson, mc, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "systems-of-inequalities",
  title: "Systems of linear inequalities",
  summary: "Graph linear inequalities in two variables as half-planes, find the solution region of a system, and use it to model constraints.",
  minutes: 30,
  objectives: [
    "Graph a linear inequality in two variables with a solid or dashed boundary and the correct shading.",
    "Graph a system of inequalities and identify points in its solution region.",
    "Write a system of inequalities from a real situation with constraints.",
  ],
  concepts: [
    { slug: "linear-inequalities-2var", name: "Linear inequalities in two variables", description: "Inequalities whose solutions form a half-plane bounded by a line.", subject: "subj_math" },
  ],
  blocks: [
    def("Linear inequality in two variables", r`An inequality such as $y > 2x - 1$ or $3x + 4y \le 12$. Its solutions are all the points on one side of the boundary line, a half-plane.`),
    text(r`To graph: draw the boundary line, solid if the symbol is $\le$ or $\ge$ (points on the line count) or dashed if it is $<$ or $>$. Then shade the side that contains solutions. In slope-intercept form, $y >$ or $y \ge$ means shade above and $y <$ or $y \le$ means shade below. You can always check with a test point such as $(0, 0)$.`),
    example(r`Graph $3x + 4y \le 12$`, [
      [r`y \le -\tfrac{3}{4}x + 3`, "Solve for y."],
      [r`\text{solid line, slope } -\tfrac{3}{4},\ y\text{-intercept } 3`, "≤ means the line is included."],
      [r`(0, 0): 0 \le 12 \text{ true}`, "Test point: shade the side containing the origin, below the line."],
    ]),
    callout("warning", "Dividing by a negative", r`$-2y > 6x - 8$ becomes $y < -3x + 4$. Dividing by $-2$ reverses the symbol, which flips the shading from above to below.`),
    def("System of inequalities", r`Its solutions are the points that satisfy every inequality: the region where all the shadings overlap.`),
    activity("systems-graph", { title: "Overlap of two half-planes", params: { m1: 1, b1: -2, m2: -0.5, b2: 4, s1: "above", s2: "below" } }),
    callout("tip", "Try this", r`The graph shows $y \ge x - 2$ and $y \le -\frac{1}{2}x + 4$. The doubly shaded wedge is the solution region. Is $(0, 0)$ in it? Check both inequalities by hand. Then flip one shading and see how the region changes.`, "experiment"),
    example(r`A club sells shirts (12 dollars profit) and hats (8 dollars profit). It can make at most 50 items and wants at least 480 dollars profit. Write the system.`, [
      [r`s + h \le 50`, "Production limit."],
      [r`12s + 8h \ge 480`, "Profit goal."],
      [r`s \ge 0,\ h \ge 0`, "You can't make negative items."],
    ], r`$(30, 15)$ works: $45 \le 50$ and $360 + 120 = 480 \ge 480$. $(20, 20)$ does not: profit is only 400 dollars.`),
    callout("note", "Boundaries and corners", r`A point on a dashed boundary is not a solution. The corners of a solution region, where boundary lines meet, become important in linear programming, where you find the best combination under constraints.`),
    callout("application", "Where this shows up", r`Diet plans (at least so much protein, at most so many calories), budgets, factory schedules and shipping limits are systems of inequalities. Any point in the region is a workable plan.`),
  ],
  questions: [
    mc(1, r`Which point is a solution of $y > 2x + 1$?`, [r`$(0, 0)$`, r`$(1, 3)$`, r`$(-1, 2)$`, r`$(2, 4)$`], 2,
      ["Substitute and check whether y is greater than 2x + 1."], r`$(-1, 2)$: $2 > 2(-1) + 1 = -1$ ✓. $(1, 3)$ gives $3 > 3$, which is false.`),
    mc(2, r`How should $y \le -x + 3$ be graphed?`, ["Dashed line, shade above", "Solid line, shade above", "Solid line, shade below", "Dashed line, shade below"], 2,
      ["≤ means the boundary is included.", "y less than means below."], r`Solid line (≤) with shading below.`),
    mc(2, r`Which inequality has a dashed boundary and shading above the line?`, [r`$y \ge 3x$`, r`$y > 3x$`, r`$y < 3x$`, r`$y \le 3x$`], 1, ["Strict inequality means dashed."], r`$y > 3x$.`),
    mc(2, r`Which point is in the solution region of $y \ge x - 2$ and $y \le -\frac{1}{2}x + 4$?`, [r`$(0, 5)$`, r`$(6, 0)$`, r`$(2, 1)$`, r`$(-4, -7)$`], 2,
      ["Check each point in both inequalities."], r`$(2, 1)$: $1 \ge 0$ ✓ and $1 \le 3$ ✓. $(0, 5)$ fails the second, $(6, 0)$ fails the first, and $(-4, -7)$ fails the first.`),
    mc(2, r`Rewrite $-3y < 6x + 9$ in slope-intercept form.`, [r`$y < -2x - 3$`, r`$y > -2x - 3$`, r`$y > 2x + 3$`, r`$y < 2x + 3$`], 1,
      ["Divide every term by −3 and reverse the symbol."], r`$y > -2x - 3$.`),
    mc(3, r`You have at most 40 dollars to spend on 5-dollar movie tickets (m) and 2-dollar snacks (s), and you want at least 3 tickets. Which system models this?`, [
      r`$5m + 2s \le 40,\ m \ge 3,\ s \ge 0$`, r`$5m + 2s \ge 40,\ m \le 3$`, r`$m + s \le 40,\ m \ge 3$`, r`$2m + 5s \le 40,\ m \ge 3,\ s \ge 0$`,
    ], 0, ["Total cost is 5m + 2s.", "At most means ≤."], r`$5m + 2s \le 40$, $m \ge 3$ and $s \ge 0$.`, "review"),
  ],
});
