import { activity, callout, def, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slope-and-rate-of-change",
  title: "Slope and rate of change",
  summary: "Measure how steep a line is as rise over run, find slope from two points, and interpret it as a rate of change.",
  minutes: 25,
  objectives: [
    "Find the slope of a line from a graph, a table or two points.",
    "Interpret slope as a rate of change with units.",
    "Describe lines with positive, negative, zero and undefined slope.",
  ],
  concepts: [{ slug: "slope", name: "Slope", description: "The ratio of vertical change to horizontal change between two points on a line.", subject: "subj_math" }],
  formulas: ["slope"],
  blocks: [
    text(r`Slope measures how much $y$ changes for each one-unit change in $x$. On a graph that is the steepness of the line: how far it rises (or falls) as you move one step to the right.`),
    def("Slope", r`For two points $(x_1, y_1)$ and $(x_2, y_2)$ on a non-vertical line, the slope is the change in $y$ divided by the change in $x$.`),
    formula(r`m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}`, "Slope formula", r`$\Delta$ (delta) means "change in". The two points can be taken in either order, as long as you use the same order on top and bottom.`),
    example(r`Find the slope through $(1, 3)$ and $(4, 9)$`, [
      [r`m = \frac{9 - 3}{4 - 1}`, "Subtract the y-values and the x-values in the same order."],
      [r`m = \frac{6}{3} = 2`, "y rises 2 units for every 1 unit to the right."],
    ]),
    example(r`Find the slope through $(-2, 5)$ and $(3, -5)$`, [
      [r`m = \frac{-5 - 5}{3 - (-2)}`, "Subtracting a negative x-value adds."],
      [r`m = \frac{-10}{5} = -2`, "A negative slope: the line falls from left to right."],
    ]),
    callout("note", "Four kinds of slope", r`Positive slope rises to the right; negative slope falls; a horizontal line has slope 0 because $\Delta y = 0$; a vertical line has undefined slope because $\Delta x = 0$ and we can't divide by zero.`),
    callout("application", "Slope as a rate", r`If a car's distance goes from 30 miles at 1 hour to 150 miles at 3 hours, the slope is $\frac{150 - 30}{3 - 1} = 60$ miles per hour. The units of slope are (units of $y$) per (unit of $x$).`),
    activity("linear-graph", { title: "Rise over run", params: { m: 2, b: 1 } }),
    callout("tip", "Investigate", r`Set $m = 0.5$, then $m = 2$, then $m = -2$. How does the triangle under the line change? What happens to the rise when the run is 1?`, "experiment"),
    activity("linear-graph", {
      title: "Walkthrough: what slope looks like",
      steps: [
        { title: "Slope 1", body: "With m = 1, every step right is one step up. The line makes a 45° angle with the axes.", params: { m: 1, b: 0 } },
        { title: "Steeper", body: "With m = 3, each step right rises 3. Larger slopes give steeper lines.", params: { m: 3, b: 0 } },
        { title: "Negative", body: "With m = −1.5, the line falls 1.5 for each step right.", params: { m: -1.5, b: 0 } },
        { title: "Zero", body: "With m = 0 the line is horizontal: y never changes.", params: { m: 0, b: 2 } },
      ],
    }, "watch"),
  ],
  questions: [
    num(1, r`Find the slope of the line through $(2, 1)$ and $(6, 9)$.`, 2, {}, ["Rise: 9 − 1. Run: 6 − 2."], r`$m = \frac{9 - 1}{6 - 2} = \frac{8}{4} = 2$.`),
    num(2, r`Find the slope of the line through $(-3, 4)$ and $(1, -4)$.`, -2, {}, [r`$\Delta x = 1 - (-3) = 4$.`], r`$m = \frac{-4 - 4}{1 - (-3)} = \frac{-8}{4} = -2$.`),
    mc(1, r`What is the slope of the line through $(5, 2)$ and $(5, 8)$?`, ["0", "6", "Undefined", "1"], 2,
      ["What is the change in x?"], r`$\Delta x = 0$, so the line is vertical and its slope is undefined.`),
    num(2, r`A plant is 4 cm tall on day 2 and 13 cm tall on day 5. What is its average growth rate in cm per day?`, 3, { unit: "cm/day" },
      ["Treat (day, height) as points."], r`$\frac{13 - 4}{5 - 2} = \frac{9}{3} = 3$ cm per day.`),
    num(3, r`The line through $(1, k)$ and $(4, 11)$ has slope 3. Find $k$.`, 2, {}, [r`Set up $\frac{11 - k}{4 - 1} = 3$.`], r`$11 - k = 9$, so $k = 2$.`, "review"),
  ],
});
