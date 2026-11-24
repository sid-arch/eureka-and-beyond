import { activity, callout, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "slope-intercept-form",
  title: "Slope-intercept form",
  summary: "Write, read and graph lines in the form y = mx + b, and build linear models from a starting value and a rate.",
  minutes: 25,
  objectives: [
    "Identify the slope and y-intercept from y = mx + b.",
    "Graph a line from its slope-intercept equation.",
    "Write the equation of a line from a slope and a point, or from two points.",
  ],
  concepts: [{ slug: "linear-functions", name: "Linear functions", description: "Functions with a constant rate of change, whose graphs are straight lines.", subject: "subj_math" }],
  formulas: ["slope-intercept-form", "point-slope-form"],
  blocks: [
    formula(r`y = mx + b`, "Slope-intercept form", r`$m$ is the slope and $b$ is the y-intercept, the y-value where the line crosses the y-axis (where $x = 0$).`),
    text(r`This form tells a story: start at $b$ and change by $m$ for every unit of $x$. To graph $y = 2x - 3$, plot the intercept $(0, -3)$, then move right 1 and up 2 to $(1, -1)$, and draw the line through those points.`),
    example(r`Write the equation of the line with slope $-\tfrac{1}{2}$ through $(4, 1)$`, [
      [r`1 = -\tfrac{1}{2}(4) + b`, "Substitute the slope and the point into y = mx + b."],
      [r`1 = -2 + b`, "Multiply."],
      [r`b = 3`, "Add 2 to both sides."],
      [r`y = -\tfrac{1}{2}x + 3`, "Write the equation."],
    ], r`At $x = 4$: $-2 + 3 = 1$. The point is on the line.`),
    example(r`Write the equation of the line through $(1, 5)$ and $(3, 11)$`, [
      [r`m = \frac{11 - 5}{3 - 1} = 3`, "Find the slope first."],
      [r`5 = 3(1) + b \Rightarrow b = 2`, "Use either point to find b."],
      [r`y = 3x + 2`, "Write the equation."],
    ]),
    callout("application", "Linear models", r`A pool holds 500 gallons and drains at 25 gallons per minute. The amount left is $V = -25t + 500$. The intercept 500 is the starting amount, the slope $-25$ is the rate, and setting $V = 0$ gives $t = 20$ minutes to empty.`),
    callout("warning", "Read the form carefully", r`In $y = 4 - 3x$, the slope is $-3$, not 4. Rewrite it as $y = -3x + 4$ to see $m$ and $b$ clearly.`),
    activity("linear-graph", { title: "Change m and b", params: { m: -0.5, b: 3 } }),
    callout("tip", "Investigate", r`Keep $m = 2$ and change $b$. What stays the same? Now keep $b = 1$ and change $m$. Which point never moves?`, "experiment"),
  ],
  questions: [
    mc(1, r`What are the slope and y-intercept of $y = 4 - 3x$?`, ["m = 4, b = −3", "m = −3, b = 4", "m = 3, b = 4", "m = −3, b = −4"], 1,
      [r`Rewrite as $y = -3x + 4$.`], r`$y = -3x + 4$, so $m = -3$ and $b = 4$.`),
    num(1, r`The line $y = 2x - 7$ passes through $(5, y)$. Find $y$.`, 3, {}, ["Substitute x = 5."], r`$y = 2(5) - 7 = 3$.`),
    short(2, r`Write the equation of the line with slope 2 through $(3, 1)$, in the form y = mx + b.`, ["y=2x-5", "y=-5+2x"],
      [r`Substitute: $1 = 2(3) + b$.`], r`$1 = 6 + b$, so $b = -5$ and $y = 2x - 5$.`),
    short(2, r`Write the equation of the line through $(0, 4)$ and $(2, 0)$, in the form y = mx + b.`, ["y=-2x+4", "y=4-2x"],
      ["(0, 4) is the y-intercept.", "Slope = (0 − 4)/(2 − 0)."], r`$b = 4$ and $m = \frac{0 - 4}{2 - 0} = -2$, so $y = -2x + 4$.`),
    num(3, r`A candle is 30 cm tall and burns 1.5 cm per hour. After how many hours is it 12 cm tall?`, 12, { unit: "h" },
      [r`Model: $h = -1.5t + 30$.`], r`$12 = -1.5t + 30 \Rightarrow 1.5t = 18 \Rightarrow t = 12$ hours.`, "review"),
  ],
});
