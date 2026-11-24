import { activity, callout, example, formula, lesson, mc, short, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "function-transformations",
  title: "Transformations of functions",
  summary: "Shift, reflect and stretch graphs by changing a function's formula, and predict the new graph from the change.",
  minutes: 35,
  objectives: [
    "Describe how f(x) + k, f(x − h), a·f(x) and f(bx) change the graph of f.",
    "Write the formula of a transformed function from a description or graph.",
    "Track key points through a sequence of transformations.",
  ],
  concepts: [{ slug: "function-transformations", name: "Function transformations", description: "Shifts, reflections and stretches of a graph produced by changing a function's formula.", subject: "subj_math" }],
  formulas: ["vertex-form"],
  blocks: [
    text(r`Transformations let you graph a whole family of functions by understanding one parent function well. If you know $f(x) = x^2$, you can sketch $2(x - 3)^2 + 1$ without plotting a table.`),
    formula(r`g(x) = a\,f\big(b(x - h)\big) + k`, "General transformation", r`$h$ shifts horizontally, $k$ shifts vertically, $a$ stretches or reflects vertically, $b$ stretches or reflects horizontally.`),
    text(r`Changes outside the function act on outputs ($y$-values) and behave the way they look: $f(x) + 3$ moves the graph up 3, and $2f(x)$ doubles every $y$-value. Changes inside act on inputs and behave in reverse: $f(x - 3)$ moves the graph right 3, and $f(2x)$ squeezes it horizontally by a factor of $\tfrac{1}{2}$.`),
    callout("tip", "Why inside changes run backwards", r`For $g(x) = f(x - 3)$, the output $g(5)$ equals $f(2)$. To get the same output $f$ gave at 2, $g$ needs an input 3 larger, so every point moves 3 to the right.`),
    example(r`Describe $g(x) = -\tfrac{1}{2}|x + 4| - 1$ relative to $f(x) = |x|$`, [
      [r`a = -\tfrac{1}{2},\ h = -4,\ k = -1`, r`Match to $a f(x - h) + k$; note $x + 4 = x - (-4)$.`],
      [r`\text{reflect, compress by } \tfrac{1}{2}`, "a < 0 reflects across the x-axis; |a| < 1 compresses vertically."],
      [r`\text{left } 4,\ \text{down } 1`, "The vertex moves from (0, 0) to (−4, −1)."],
    ]),
    example(r`Track the point $(2, 4)$ on $y = x^2$ under $y = 3(x + 1)^2 - 5$`, [
      [r`(2, 4) \to (1, 4)`, "x + 1 inside: shift left 1."],
      [r`(1, 4) \to (1, 12)`, "Multiply the y-value by 3."],
      [r`(1, 12) \to (1, 7)`, "Subtract 5."],
    ], r`Check: $3(1 + 1)^2 - 5 = 12 - 5 = 7$.`),
    callout("warning", "Order matters for y-values", r`Apply the stretch before the vertical shift: in $3f(x) - 5$, multiply by 3 first, then subtract 5. Doing it the other way gives the wrong point.`),
    activity("vertex-explorer", { title: "Transform y = x²" }),
    callout("tip", "Investigate", r`Make the graph of $y = x^2$ shifted left 3 and reflected. Then drag the gold point to make it twice as steep. Write the formula before checking the readout.`, "experiment"),
  ],
  questions: [
    mc(1, r`How is the graph of $y = f(x - 5)$ related to $y = f(x)$?`, ["Up 5", "Down 5", "Right 5", "Left 5"], 2, ["Inside changes act on x, in reverse."], r`Subtracting 5 inside shifts the graph 5 units right.`),
    mc(1, r`Which describes $y = -f(x)$?`, ["Reflection across the x-axis", "Reflection across the y-axis", "Shift down 1", "Horizontal stretch"], 0, ["The negative is outside, applied to outputs."],
      r`Every y-value changes sign, which reflects the graph across the x-axis.`),
    short(2, r`Write $g(x)$ for the graph of $f(x) = x^2$ shifted left 2 and up 7. Use the form g(x)=(x+?)^2+?`, ["g(x)=(x+2)^2+7", "(x+2)^2+7", "y=(x+2)^2+7"],
      ["Left 2 means replace x with x + 2."], r`$g(x) = (x + 2)^2 + 7$.`),
    short(2, r`The point $(3, 9)$ is on $y = x^2$. What point is on $y = 2(x - 1)^2 + 4$? Enter (x, y).`, ["(4,22)"],
      ["Shift right 1, then double the y-value, then add 4."], r`$(3, 9) \to (4, 9) \to (4, 18) \to (4, 22)$. Check: $2(3)^2 + 4 = 22$.`),
    mc(3, r`The graph of $y = \sqrt{x}$ is transformed to $y = \sqrt{-x} + 2$. Which point is on the new graph?`, ["(4, 4)", "(−4, 4)", "(4, 0)", "(−4, 0)"], 1,
      [r`$\sqrt{-x}$ reflects across the y-axis: $(4, 2)$ on $\sqrt{x}$ becomes $(-4, 2)$.`], r`$(4, 2) \to (-4, 2) \to (-4, 4)$. Check: $\sqrt{4} + 2 = 4$.`, "review"),
  ],
});
