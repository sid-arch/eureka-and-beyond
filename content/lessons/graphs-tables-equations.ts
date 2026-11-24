import { activity, callout, def, example, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "graphs-tables-equations",
  title: "Graphs, tables and equations",
  summary: "Move between verbal descriptions, tables, graphs and equations of a function, and read key features such as intercepts, increasing or decreasing intervals and maximums from a graph.",
  minutes: 25,
  objectives: [
    "Represent the same function as a description, a table, a graph and an equation.",
    "Read intercepts, intervals of increase and decrease, and maximum or minimum values from a graph.",
    "Decide which representation is most useful for a given question.",
  ],
  concepts: [
    { slug: "multiple-representations", name: "Tables, graphs and equations", description: "Three linked ways to show the same relationship between two variables.", subject: "subj_math" },
    { slug: "functions", name: "Functions", description: "Relations that assign exactly one output to each input.", subject: "subj_math" },
  ],
  blocks: [
    text(r`A function can be described four ways: in words, by a table, by a graph or by an equation. Each answers some questions quickly. An equation gives exact values, a table organizes specific inputs, and a graph shows the overall behavior at a glance.`),
    def("Key features of a graph", r`The $x$-intercepts (zeros) are where the graph crosses the $x$-axis ($f(x) = 0$). The $y$-intercept is $f(0)$. A function is increasing on an interval if the graph rises from left to right there, and decreasing if it falls. A maximum or minimum is a highest or lowest point.`),
    example(r`A drone rises 3 m per second from a 2-m platform for 5 seconds. Represent its height.`, [
      [r`\text{Equation: } h(t) = 2 + 3t,\ 0 \le t \le 5`, "Start plus rate times time, with a domain from the situation."],
      [r`\text{Table: } t = 0, 1, 2, 3, 4, 5 \to h = 2, 5, 8, 11, 14, 17`, ""],
      [r`\text{Graph: segment from } (0, 2) \text{ to } (5, 17)`, "A line segment, because the rate is constant and time is limited."],
    ]),
    activity("vertex-explorer", { title: "Read the key features", params: { a: -1, h: 2, k: 4 } }),
    callout("tip", "Try this", r`For this parabola, find the zeros, the vertex and where it increases. It rises until $x = 2$ and falls after. Drag the vertex below the x-axis: what happens to the zeros?`, "experiment"),
    example(r`Use $f(x) = -(x - 2)^2 + 4$`, [
      [r`f(0) = -4 + 4 = 0`, "y-intercept at (0, 0)."],
      [r`-(x - 2)^2 + 4 = 0 \Rightarrow x = 0 \text{ or } x = 4`, "Zeros: (x − 2)² = 4, so x − 2 = ±2."],
      [r`\text{max } 4 \text{ at } x = 2`, "Increasing for x < 2, decreasing for x > 2."],
    ]),
    callout("warning", "Connect points only when it makes sense", r`If the input can only be whole numbers (people, tickets, days), the graph is a set of separate dots. Connecting them suggests values like 2.5 tickets that don't exist.`),
    callout("application", "Where this shows up", r`Weather apps show a temperature graph for the day, a table for each hour, and the forecast in words. Reading the high, the low and when it warms up is reading key features of a function.`),
  ],
  questions: [
    num(1, r`For $f(x) = 6 - 2x$, what is the y-intercept (the value of $f(0)$)?`, 6, {}, ["Substitute x = 0."], r`$f(0) = 6$.`),
    num(1, r`For $f(x) = 6 - 2x$, what is the x-intercept?`, 3, {}, [r`Solve $6 - 2x = 0$.`], r`$x = 3$.`),
    mc(2, r`A table shows $x$: 0, 1, 2, 3 and $y$: 10, 7, 4, 1. Which equation matches?`, [r`$y = 3x + 10$`, r`$y = -3x + 10$`, r`$y = 10 - x$`, r`$y = -3x + 1$`], 1,
      ["What is y at x = 0, and how does y change each step?"], r`Start at 10 and decrease by 3: $y = -3x + 10$.`),
    mc(2, r`On which interval is $f(x) = (x + 1)^2 - 4$ decreasing?`, [r`$x > -1$`, r`$x < -1$`, r`$x < -4$`, r`$x > 4$`], 1,
      ["The parabola opens up with vertex (−1, −4)."], r`It falls until it reaches the vertex at $x = -1$, so it decreases for $x < -1$.`),
    short(2, r`Find the zeros of $g(x) = (x - 3)^2 - 9$. Enter both, smaller first.`, ["0,6"], [r`$(x - 3)^2 = 9$, so $x - 3 = \pm 3$.`], r`$x = 0$ or $x = 6$.`),
    mc(2, r`A store sells notebooks for 3 dollars each. Should the graph of cost versus number of notebooks be a solid line?`, ["Yes, because the rate is constant", "No, it should be separate points, because you can only buy whole notebooks", "No, it should be a curve", "Yes, starting at (0, 3)"], 1,
      ["Can you buy 2.5 notebooks?"], r`The domain is whole numbers, so the graph is a set of discrete points on the line $y = 3x$.`),
    num(3, r`The height of a ball is $h(t) = -5t^2 + 20t + 1$ meters. What is its maximum height? (The vertex is at $t = 2$.)`, 21, { unit: "m" }, ["Evaluate h(2)."], r`$h(2) = -20 + 40 + 1 = 21$ m.`, "review"),
  ],
});
