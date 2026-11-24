import { callout, def, example, formula, lesson, mc, num, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "standard-form-line",
  title: "Standard form of a linear equation",
  summary: "Write lines in standard form Ax + By = C, graph them quickly with intercepts, convert between forms, and recognize horizontal and vertical lines.",
  minutes: 25,
  objectives: [
    "Write a linear equation in standard form with integer coefficients.",
    "Find the x- and y-intercepts from standard form and use them to graph.",
    "Convert between standard and slope-intercept forms and handle horizontal and vertical lines.",
  ],
  concepts: [
    { slug: "standard-form", name: "Standard form of a line", description: "Ax + By = C with A and B not both zero.", subject: "subj_math" },
  ],
  formulas: ["standard-form-line", "slope-intercept-form"],
  blocks: [
    formula(r`Ax + By = C`, "Standard form", "A, B and C are usually integers with A ≥ 0, and A and B are not both 0."),
    text(r`Standard form is natural when two quantities share a total. If adult tickets cost 8 dollars, child tickets cost 5 dollars and a family spends 40 dollars, then $8a + 5c = 40$. It is also the only form that can describe a vertical line, such as $x = 3$ (here $A = 1$, $B = 0$).`),
    def("Intercept method", r`To graph $Ax + By = C$, set $y = 0$ to find the $x$-intercept and set $x = 0$ to find the $y$-intercept. Plot both and draw the line through them.`),
    example(r`Graph $3x - 4y = 12$ using intercepts`, [
      [r`y = 0: 3x = 12 \Rightarrow x = 4`, "x-intercept (4, 0)."],
      [r`x = 0: -4y = 12 \Rightarrow y = -3`, "y-intercept (0, −3)."],
      [r`m = \frac{-3 - 0}{0 - 4} = \tfrac{3}{4}`, "The slope is −A/B = −3/(−4) = 3/4."],
    ]),
    example(r`Write $y = -\tfrac{2}{3}x + 5$ in standard form`, [
      [r`3y = -2x + 15`, "Multiply every term by 3 to clear the fraction."],
      [r`2x + 3y = 15`, "Add 2x to both sides. A = 2 is positive."],
    ]),
    example(r`Write $4x + 2y = 10$ in slope-intercept form`, [
      [r`2y = -4x + 10`, "Subtract 4x."],
      [r`y = -2x + 5`, "Divide every term by 2."],
    ]),
    def("Horizontal and vertical lines", r`$y = k$ is horizontal with slope 0. $x = h$ is vertical and its slope is undefined. A vertical line is not a function of $x$.`),
    callout("warning", "Slope from standard form", r`The slope of $Ax + By = C$ is $-\frac{A}{B}$, not $\frac{A}{B}$ and not $A$. Rewriting in slope-intercept form is the safest way to check.`),
    callout("application", "Where this shows up", r`Budget lines: with 60 dollars to spend on 4-dollar notebooks ($n$) and 6-dollar binders ($b$), every affordable full-budget combination satisfies $4n + 6b = 60$. Its intercepts show the most of each item you could buy alone: 15 notebooks or 10 binders.`),
  ],
  questions: [
    num(1, r`What is the x-intercept of $5x + 2y = 20$?`, 4, {}, ["Set y = 0."], r`$5x = 20$, $x = 4$.`),
    num(1, r`What is the y-intercept of $5x + 2y = 20$?`, 10, {}, ["Set x = 0."], r`$2y = 20$, $y = 10$.`),
    num(2, r`What is the slope of $6x - 3y = 9$?`, 2, {}, [r`Solve for y: $-3y = -6x + 9$.`], r`$y = 2x - 3$, so the slope is 2. (Also $-\frac{A}{B} = -\frac{6}{-3} = 2$.)`),
    short(2, r`Write $y = \tfrac{3}{4}x - 2$ in standard form with integer coefficients and A > 0.`, ["3x-4y=8"], ["Multiply every term by 4.", "Move the x-term to the left side."], r`$4y = 3x - 8$, so $3x - 4y = 8$.`),
    mc(2, r`Which equation describes a vertical line through $(-2, 5)$?`, [r`$y = 5$`, r`$x = -2$`, r`$y = -2$`, r`$x = 5$`], 1,
      ["On a vertical line every point has the same x-coordinate."], r`$x = -2$.`),
    mc(2, r`What is the slope of $y = -7$?`, ["−7", "0", "Undefined", "1"], 1, ["It's a horizontal line."], r`A horizontal line has slope 0.`),
    num(3, r`Adult tickets cost 9 dollars and student tickets cost 6 dollars. A group spent 120 dollars and bought 8 adult tickets. How many student tickets did it buy?`, 8, {},
      [r`$9a + 6s = 120$ with $a = 8$.`], r`$72 + 6s = 120$, so $6s = 48$ and $s = 8$.`, "review"),
  ],
});
