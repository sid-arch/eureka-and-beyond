import { activity, callout, example, formula, lesson, mc, num, text } from "../lib.ts";
const r = String.raw;

export default lesson({
  slug: "quadratic-formula",
  title: "The quadratic formula and the discriminant",
  summary: "Solve any quadratic equation with the quadratic formula and use the discriminant to predict the number of real solutions.",
  minutes: 30,
  objectives: [
    "Write a quadratic equation in standard form and identify a, b and c.",
    "Solve quadratic equations using the quadratic formula.",
    "Use the discriminant to determine the number and type of solutions.",
  ],
  concepts: [{ slug: "quadratic-functions", name: "Quadratic functions", description: "Functions of the form ax² + bx + c whose graphs are parabolas.", subject: "subj_math" }],
  formulas: ["quadratic-formula", "discriminant"],
  blocks: [
    text(r`Factoring is quick when it works, but many quadratics don't factor nicely over the integers. The quadratic formula solves every equation of the form $ax^2 + bx + c = 0$ with $a \neq 0$. It comes from completing the square on the general equation.`),
    formula(r`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, "The quadratic formula", r`The $\pm$ produces two solutions: one with $+$ and one with $-$.`),
    callout("warning", "Standard form first", r`The equation must equal zero. For $2x^2 = 3x + 5$, rewrite it as $2x^2 - 3x - 5 = 0$ before reading off $a = 2$, $b = -3$, $c = -5$.`),
    example(r`Solve $2x^2 - 3x - 5 = 0$`, [
      [r`a = 2,\ b = -3,\ c = -5`, "Identify the coefficients, including signs."],
      [r`x = \frac{3 \pm \sqrt{9 - 4(2)(-5)}}{4}`, r`$-b = 3$ and $b^2 = 9$.`],
      [r`x = \frac{3 \pm \sqrt{49}}{4} = \frac{3 \pm 7}{4}`, "Simplify under the radical: 9 + 40 = 49."],
      [r`x = \frac{10}{4} = \tfrac{5}{2} \quad\text{or}\quad x = \frac{-4}{4} = -1`, "Take the + and − cases."],
    ], r`$2(\tfrac{5}{2})^2 - 3(\tfrac{5}{2}) - 5 = 12.5 - 7.5 - 5 = 0$ and $2(1) + 3 - 5 = 0$.`),
    formula(r`\Delta = b^2 - 4ac`, "The discriminant", r`$\Delta > 0$: two real solutions. $\Delta = 0$: one repeated real solution. $\Delta < 0$: no real solutions (two complex ones).`),
    text(r`The discriminant connects algebra to the graph. The solutions of $ax^2 + bx + c = 0$ are the x-intercepts of $y = ax^2 + bx + c$, so the discriminant tells you whether the parabola crosses the x-axis twice, touches it once, or misses it.`),
    example(r`Solve $x^2 + 4x + 1 = 0$ exactly`, [
      [r`x = \frac{-4 \pm \sqrt{16 - 4}}{2}`, "a = 1, b = 4, c = 1."],
      [r`x = \frac{-4 \pm \sqrt{12}}{2} = \frac{-4 \pm 2\sqrt{3}}{2}`, r`$\sqrt{12} = 2\sqrt{3}$.`],
      [r`x = -2 \pm \sqrt{3}`, "Divide every term by 2."],
    ], r`As decimals, $x \approx -0.268$ and $x \approx -3.732$.`),
    activity("vertex-explorer", { title: "See the discriminant on the graph" }),
    callout("tip", "Investigate", r`Make a parabola with two zeros, then slide its vertex until the zeros merge into one. What is $k$ at that moment? Keep going: when the graph no longer reaches the x-axis, the discriminant of the expanded form is negative.`, "experiment"),
    callout("application", "Where this shows up", r`A ball thrown upward from 2 m at 15 m/s has height $h = -4.9t^2 + 15t + 2$. Setting $h = 0$ and using the formula gives $t \approx 3.19$ s, when it hits the ground; the negative root is discarded because time can't be negative here.`),
  ],
  questions: [
    num(1, r`What is the discriminant of $x^2 - 6x + 9 = 0$?`, 0, {}, [r`$b^2 - 4ac$ with $a = 1, b = -6, c = 9$.`], r`$36 - 36 = 0$, so there is one repeated solution, $x = 3$.`),
    mc(1, r`How many real solutions does $3x^2 + 2x + 5 = 0$ have?`, ["0", "1", "2", "3"], 0, ["Compute the discriminant."], r`$\Delta = 4 - 60 = -56 < 0$, so there are no real solutions.`),
    num(2, r`Solve $x^2 + 2x - 15 = 0$. Enter the larger solution.`, 3, {}, [r`$\Delta = 4 + 60 = 64$.`], r`$x = \frac{-2 \pm 8}{2}$, giving $3$ and $-5$. The larger is 3.`),
    num(2, r`Solve $2x^2 = 7x - 3$. Enter the smaller solution.`, 0.5, { tolerance: 0.001 }, ["First rewrite as 2x² − 7x + 3 = 0."], r`$x = \frac{7 \pm \sqrt{49 - 24}}{4} = \frac{7 \pm 5}{4}$, so $x = 3$ or $x = 0.5$.`),
    num(3, r`For what value of $k$ does $x^2 + kx + 16 = 0$ have exactly one solution, with $k > 0$?`, 8, {}, [r`Set the discriminant equal to 0: $k^2 - 64 = 0$.`], r`$k^2 = 64$, $k = \pm 8$; the positive value is 8, giving $(x + 4)^2 = 0$.`),
    num(3, r`A ball's height is $h = -4.9t^2 + 15t + 2$ (meters, seconds). When does it hit the ground? Round to two decimals.`, 3.19, { tolerance: 0.01, unit: "s" },
      ["Set h = 0 and use the quadratic formula with a = −4.9.", "Keep the positive time."], r`$t = \frac{-15 \pm \sqrt{225 + 39.2}}{-9.8} = \frac{-15 \pm 16.254}{-9.8}$. The positive root is $t = \frac{-31.254}{-9.8} \approx 3.19$ s.`, "review"),
  ],
});
