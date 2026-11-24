import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "tables-graphs-patterns",
  title: "Tables, graphs and patterns",
  summary: "Describe a pattern with a rule, show the same relationship as a table, a graph and an equation, and use one representation to make predictions.",
  minutes: 25,
  objectives: [
    "Identify independent and dependent variables in a situation.",
    "Write an equation from a table that grows by a constant amount.",
    "Graph a relationship from a table and use the graph or equation to predict values.",
  ],
  concepts: [
    { slug: "multiple-representations", name: "Tables, graphs and equations", description: "Three linked ways to show the same relationship between two variables.", subject: "subj_math" },
  ],
  blocks: [
    text(r`Suppose a pool has 40 liters of water and a hose adds 15 liters each minute. You can describe this in words, in a table, as points on a graph, or with an equation. Each view makes a different question easy.`),
    def("Independent and dependent variables", r`The independent variable is the input you choose or control (minutes, here). The dependent variable is the output that depends on it (liters). By convention the independent variable goes on the horizontal axis.`),
    example(r`Build a table and an equation for the pool`, [
      [r`\begin{array}{c|c|c|c|c} t \text{ (min)} & 0 & 1 & 2 & 3 \\ \hline V \text{ (L)} & 40 & 55 & 70 & 85 \end{array}`, "Start at 40 and add 15 each minute."],
      [r`V = 40 + 15t`, "The starting amount plus 15 for each minute."],
      [r`V(20) = 40 + 15(20) = 340 \text{ L}`, "The equation predicts far-away values without extending the table."],
    ]),
    text(r`When the outputs change by the same amount for each step of 1 in the input, the points lie on a straight line. That constant change is the rate of change, and it becomes the slope when you study linear functions.`),
    activity("linear-graph", { title: "See the pattern as a line", params: { m: 1.5, b: 4 } }),
    callout("tip", "Try this", r`Scaled down by 10, the pool is $y = 1.5x + 4$. Read off the y-values at $x = 0, 1, 2, 3$ and compare them with the table above, divided by 10. Which number in the equation sets where the line starts?`, "experiment"),
    example(r`Find a rule for the table $x$: 1, 2, 3, 4 and $y$: 2, 5, 8, 11`, [
      [r`\Delta y = 3 \text{ for each } \Delta x = 1`, "y goes up by 3 each time."],
      [r`y = 3x + b`, "The rule has the form 3x plus a starting value."],
      [r`2 = 3(1) + b \Rightarrow b = -1`, "Use any row to find b."],
      [r`y = 3x - 1`, "Check: 3(4) − 1 = 11. ✓"],
    ]),
    callout("warning", "Not every pattern is linear", r`The table $x$: 1, 2, 3, 4 with $y$: 2, 4, 8, 16 doubles each step instead of adding a fixed amount. Its points curve upward. Always check the differences before writing $y = mx + b$.`),
    callout("application", "Where this shows up", r`Taxi fares, phone plans, savings with regular deposits and the height of a stack of cups all follow "start + rate × steps." Spreadsheets build such tables automatically by filling a formula down a column.`),
  ],
  questions: [
    mc(1, r`A plant grows taller each week. Which is the independent variable?`, ["Height", "Number of weeks", "The plant", "The ruler"], 1,
      ["Which quantity do you choose, and which depends on it?"], r`Height depends on how many weeks have passed, so weeks is the independent variable.`),
    num(1, r`A pattern starts at 7 and adds 4 each step. What is the value at step 5, if step 0 is 7?`, 27, {}, ["7 + 4 · 5."], r`$7 + 4(5) = 27$.`),
    short(2, r`Write an equation for the table $x$: 0, 1, 2, 3 and $y$: 5, 9, 13, 17. Use the form y=…`, ["y=4x+5", "y=5+4x"], ["What is y when x = 0?", "By how much does y change each step?"], r`Start at 5 and add 4: $y = 4x + 5$.`),
    short(2, r`Write an equation for the table $x$: 1, 2, 3, 4 and $y$: 1, −1, −3, −5.`, ["y=-2x+3", "y=3-2x"], ["y decreases by 2 each step.", "Use (1, 1) to find b."], r`$y = -2x + b$ and $1 = -2 + b$, so $b = 3$: $y = -2x + 3$.`),
    num(2, r`A tank holds 500 gallons and drains 12 gallons per minute. How many gallons remain after 25 minutes?`, 200, { unit: "gal" }, [r`$V = 500 - 12t$.`], r`$500 - 12(25) = 500 - 300 = 200$ gallons.`),
    mc(2, r`Which table could be described by a linear rule?`, [
      r`$x$: 1, 2, 3, 4; $y$: 3, 6, 12, 24`, r`$x$: 1, 2, 3, 4; $y$: 10, 7, 4, 1`, r`$x$: 1, 2, 3, 4; $y$: 1, 4, 9, 16`, r`$x$: 1, 2, 3, 4; $y$: 2, 3, 5, 8`,
    ], 1, ["Look for a constant difference in y."], r`10, 7, 4, 1 decreases by 3 each step: $y = -3x + 13$. The others have changing differences.`),
    num(3, r`Using $V = 40 + 15t$ for the pool, after how many minutes will it hold 250 liters?`, 14, { unit: "min" }, [r`Solve $40 + 15t = 250$.`], r`$15t = 210$, so $t = 14$ minutes.`, "review"),
  ],
});
